"use client";

import { useState, useEffect } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/dexie";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { StoryLanding } from "./StoryLanding";
import { StoryLoading } from "./StoryLoading";
import { StoryPlayer } from "./StoryPlayer";
import { StoryCompletion } from "./StoryCompletion";
import { AnimatePresence } from "framer-motion";

type StoryState = "landing" | "loading" | "error" | "playing" | "completed";

interface StoryData {
  title: string;
  story: string;
  theme: string;
  estimatedDuration: string;
}

export function StoryActivity() {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const elderId = 1; // MVP standard

  const allFamily = useLiveQuery(() => db.familyMembers.where({ elderId }).toArray(), [elderId]);
  const allMemories = useLiveQuery(() => db.memories.where({ elderId }).toArray(), [elderId]);

  const [gameState, setGameState] = useState<StoryState>("landing");
  const [storyData, setStoryData] = useState<StoryData | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    return () => {
      if (audioUrl && audioUrl.startsWith('blob:')) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const generateStory = async () => {
    if (!profile) return;
    
    setGameState("loading");
    setErrorMessage("");
    if (audioUrl && audioUrl.startsWith('blob:')) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }

    try {
      // 1. Prepare Context
      const context = {
        patientName: profile.name,
        region: profile.region,
        language: "hi", // Forcing Hindi per requirements
        familyMembers: allFamily?.map(f => ({ name: f.name, relation: f.relationship })) || [],
        memories: allMemories?.map(m => ({ title: m.title, year: m.year })) || [],
      };

      // 2. Fetch Story from Groq
      const storyRes = await fetch("/api/story/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ context })
      });

      if (!storyRes.ok) throw new Error("Failed to generate story");
      const generatedData: StoryData = await storyRes.json();
      setStoryData(generatedData);

      // 3. TTS is now handled via Capacitor in StoryPlayer
      setGameState("playing");

    } catch (e) {
      console.error(e);
      setErrorMessage(t("games.storyTime.error") || "We couldn't prepare the story right now.");
      setGameState("error");
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
          <StoryLanding key="landing" onBegin={generateStory} />
        )}
        
        {gameState === "loading" && (
          <StoryLoading key="loading" />
        )}

        {gameState === "error" && (
          <div key="error" className="flex flex-col items-center justify-center min-h-[50vh] text-center">
            <p className="text-xl text-smriti-muted font-bold mb-4">{errorMessage}</p>
            <button onClick={generateStory} className="bg-smriti-primary text-white px-6 py-3 rounded-full font-bold">
              {t("games.storyTime.tryAgain") || "Try Again"}
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
            onFinish={handleFinish}
          />
        )}

        {gameState === "completed" && (
          <StoryCompletion 
            key="completed"
            onPlayAgain={() => setGameState("playing")}
            onNewStory={generateStory}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
