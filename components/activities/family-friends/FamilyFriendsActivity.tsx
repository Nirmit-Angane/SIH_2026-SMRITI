"use client";

import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FamilyMember } from "@/lib/db/dexie";
import { useLanguage } from "@/components/LanguageProvider";
import { Loader2 } from "lucide-react";
import { ActivityIntro } from "./ActivityIntro";
import { EmptyFamilyState } from "./EmptyFamilyState";
import { FamilyQuestion } from "./FamilyQuestion";
import { ActivityResult } from "./ActivityResult";

type ActivityState = "loading" | "intro" | "empty" | "playing" | "result";

export function FamilyFriendsActivity() {
  const { t } = useLanguage();
  const elderId = 1; // Standardize for now

  // 1. Load Family Members from IndexedDB
  const allMembers = useLiveQuery(() => db.familyMembers.where({ elderId }).toArray(), [elderId]);
  
  const [gameState, setGameState] = useState<ActivityState>("loading");
  
  // Game Session State
  const [usableMembers, setUsableMembers] = useState<FamilyMember[]>([]);
  const [questions, setQuestions] = useState<FamilyMember[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [currentOptions, setCurrentOptions] = useState<FamilyMember[]>([]);

  // Initialize Data
  useEffect(() => {
    if (allMembers === undefined) {
      setGameState("loading");
      return;
    }

    // Filter valid members (needs name and photo)
    const valid = allMembers.filter(m => m.name && m.photoBlob && m.useInGames !== false);
    
    if (valid.length < 3) {
      setGameState("empty");
    } else {
      setUsableMembers(valid);
      setGameState("intro");
    }
  }, [allMembers]);

  // Generate Questions when starting
  const handleBegin = () => {
    // Determine how many questions (max 5, or however many members we have if less)
    const totalQuestions = Math.min(5, usableMembers.length > 3 ? 5 : usableMembers.length);
    
    // We want to generate a sequence of targets
    const targetSequence: FamilyMember[] = [];
    
    // Simple logic: shuffle members and pick first N
    // To allow 5 questions from 3 members, we might need to repeat, but not consecutively.
    let available = [...usableMembers];
    
    for (let i = 0; i < totalQuestions; i++) {
      // Shuffle available
      available.sort(() => Math.random() - 0.5);
      
      // Pick one that isn't the immediate previous target
      let selectedIdx = 0;
      if (targetSequence.length > 0 && available[selectedIdx].id === targetSequence[targetSequence.length - 1].id) {
        selectedIdx = available.length > 1 ? 1 : 0; 
      }
      
      const target = available[selectedIdx];
      targetSequence.push(target);
      
      // Resupply available pool if needed for next iteration
      available = [...usableMembers];
    }
    
    setQuestions(targetSequence);
    setCurrentQuestionIndex(0);
    setCorrectCount(0);
    generateOptions(targetSequence[0], usableMembers);
    setGameState("playing");
  };

  const generateOptions = (target: FamilyMember, pool: FamilyMember[]) => {
    // Pick 3 options total (including correct one)
    const options = [target];
    
    const others = pool.filter(m => m.id !== target.id);
    // Shuffle others
    others.sort(() => Math.random() - 0.5);
    
    // Add up to 3 distractors
    options.push(...others.slice(0, 3));
    
    // Shuffle options
    options.sort(() => Math.random() - 0.5);
    setCurrentOptions(options);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setCorrectCount(prev => prev + 1);
    }
    
    // Move to next question or result
    if (currentQuestionIndex + 1 < questions.length) {
      const nextIndex = currentQuestionIndex + 1;
      setCurrentQuestionIndex(nextIndex);
      generateOptions(questions[nextIndex], usableMembers);
    } else {
      finishActivity(isCorrect ? correctCount + 1 : correctCount);
    }
  };

  const finishActivity = async (finalScore: number) => {
    setGameState("result");
    
    // Save to DB
    try {
      await db.gameSessions.add({
        elderId,
        gameType: "family-recognition",
        region: "current", // This should be fetched from profile, keeping simple
        difficulty: 1,
        score: finalScore,
        accuracy: (finalScore / questions.length) * 100,
        responseTime: 0,
        retries: 0,
        completedAt: new Date().toISOString()
      });
    } catch (e) {
      console.error("Failed to save game session", e);
    }
  };

  // Render logic
  if (gameState === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-smriti-primary">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-xl font-bold">{t("games.familyRecognition.loading") || "Getting familiar faces ready..."}</p>
      </div>
    );
  }

  if (gameState === "empty") {
    return <EmptyFamilyState />;
  }

  if (gameState === "intro") {
    return <ActivityIntro onBegin={handleBegin} />;
  }

  if (gameState === "result") {
    return <ActivityResult correctCount={correctCount} totalQuestions={questions.length} />;
  }

  if (gameState === "playing" && questions.length > 0) {
    return (
      <FamilyQuestion 
        key={`q-${currentQuestionIndex}`}
        member={questions[currentQuestionIndex]} 
        options={currentOptions}
        onAnswer={handleAnswer}
        currentQuestionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
      />
    );
  }

  return null;
}
