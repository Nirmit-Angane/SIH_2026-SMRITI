"use client";

import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, Memory } from "@/lib/db/dexie";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { StoryLanding } from "./StoryLanding";
import { StoryLoading } from "./StoryLoading";
import { StoryPlayer } from "./StoryPlayer";
import { StoryCompletion } from "./StoryCompletion";
import { AnimatePresence } from "framer-motion";
import { STORY_LANGUAGES } from "@/lib/constants/languages";

type StoryState = "landing" | "loading" | "error" | "playing" | "completed";

interface StoryData {
  title: string;
  story: string;
  theme: string;
  estimatedDuration: string;
  isOriginal?: boolean;
  language?: string;
  langId?: string;
}

export function StoryActivity() {
  const { profile } = useAuth();
  const { language: systemLang } = useLanguage();
  const elderId = 1;

  const allFamily = useLiveQuery(() => db.familyMembers.where({ elderId }).toArray(), [elderId]);
  const allMemories = useLiveQuery(() => db.memories.where({ elderId }).toArray(), [elderId]);

  const [gameState, setGameState] = useState<StoryState>("landing");
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [activeLangId, setActiveLangId] = useState<string>(systemLang === "hi" ? "hi" : "en");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      if (audioUrl && audioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const startStory = async (selectedMemory?: Memory, mode: "original" | "ai" = "ai", targetLangId?: string) => {
    const langToUse = targetLangId || activeLangId || (systemLang === "hi" ? "hi" : "en");
    setActiveLangId(langToUse);

    // 1. If Original Mode is chosen, play exact user's written memory with zero AI alteration
    if (mode === "original" && selectedMemory) {
      const originalText = [
        selectedMemory.title,
        selectedMemory.year ? `Year ${selectedMemory.year}.` : "",
        selectedMemory.description || ""
      ].filter(Boolean).join(" — ");

      const targetLangObj = STORY_LANGUAGES.find(l => l.id === langToUse) || STORY_LANGUAGES[3];

      setStoryData({
        title: selectedMemory.title + (selectedMemory.year ? ` (${selectedMemory.year})` : ""),
        story: originalText,
        theme: "Original User Memory",
        estimatedDuration: "Exact Memory",
        isOriginal: true,
        language: targetLangObj.name,
        langId: targetLangObj.id
      });
      setGameState("playing");
      return;
    }

    // 2. Otherwise, generate vivid AI adaptation in chosen language
    setGameState("loading");
    setErrorMessage("");
    if (audioUrl && audioUrl.startsWith('blob:')) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    try {
      const context = {
        patientName: profile?.name || "Elder",
        region: profile?.region || "Northeast India",
        language: langToUse,
        targetLangId: langToUse,
        selectedMemory: selectedMemory ? {
          title: selectedMemory.title,
          year: selectedMemory.year,
          description: selectedMemory.description || "",
        } : undefined,
        familyMembers: allFamily?.map(f => ({ name: f.name, relation: f.relationship })) || [],
        memories: allMemories?.map(m => ({ 
          title: m.title, 
          year: m.year,
          description: m.description || ""
        })) || [],
      };

      const storyRes = await fetch("/api/story/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context })
      });

      if (!storyRes.ok) throw new Error("Failed to generate story");
      const generatedData: StoryData = await storyRes.json();
      setStoryData({
        ...generatedData,
        isOriginal: false,
        langId: langToUse
      });

      setGameState("playing");

    } catch (e) {
      console.error(e);
      setErrorMessage("We couldn't prepare the story right now. Please try again.");
      setGameState("error");
    }
  };

  const handleTranslate = async (targetLangId: string) => {
    if (!storyData) return;
    try {
      const res = await fetch("/api/story/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: storyData.title,
          story: storyData.story,
          targetLanguage: targetLangId
        })
      });

      if (res.ok) {
        const translated = await res.json();
        const targetLangObj = STORY_LANGUAGES.find(l => l.id === targetLangId) || STORY_LANGUAGES[3];
        setStoryData({
          ...storyData,
          title: translated.title || storyData.title,
          story: translated.story || storyData.story,
          language: targetLangObj.name,
          langId: targetLangObj.id
        });
        setActiveLangId(targetLangId);
      }
    } catch (e) {
      console.error("Live story translation error:", e);
    }
  };

  const handleFinish = async () => {
    setGameState("completed");
    try {
      await db.gameSessions.add({
        elderId,
        gameType: "story-time",
        region: profile?.region || "unknown",
        difficulty: 1,
        score: 100,
        accuracy: 100,
        responseTime: 0,
        retries: 0,
        completedAt: new Date().toISOString()
      });
    } catch (e) {
      console.error("Failed to save session", e);
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        {gameState === "landing" && (
          <StoryLanding 
            key="landing" 
            onBegin={(mem, mode, targetLang) => startStory(mem, mode, targetLang)} 
          />
        )}
        
        {gameState === "loading" && (
          <StoryLoading key="loading" />
        )}

        {gameState === "error" && (
          <div key="error" className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <p className="text-xl text-[#ba1a1a] font-bold mb-4">{errorMessage}</p>
            <button 
              onClick={() => startStory(undefined, "ai", activeLangId)} 
              className="bg-[#2563eb] text-white px-6 py-3 neo-border neo-shadow font-headline-lg uppercase font-bold"
            >
              Try Again
            </button>
          </div>
        )}

        {gameState === "playing" && storyData && (
          <StoryPlayer 
            key="playing"
            title={storyData.title}
            story={storyData.story}
            audioUrl={audioUrl}
            estimatedDuration={storyData.estimatedDuration}
            theme={storyData.theme}
            isOriginal={storyData.isOriginal}
            currentLanguage={storyData.langId || activeLangId}
            onTranslate={handleTranslate}
            onFinish={handleFinish}
          />
        )}

        {gameState === "completed" && (
          <StoryCompletion 
            key="completed"
            onPlayAgain={() => setGameState("playing")}
            onNewStory={() => setGameState("landing")}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
