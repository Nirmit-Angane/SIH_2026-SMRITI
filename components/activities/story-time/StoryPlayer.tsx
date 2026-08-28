"use client";

import { useState, useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { Play, Pause, RotateCcw, Volume2, BookOpen } from "lucide-react";
import { TextToSpeech } from '@capacitor-community/text-to-speech';

interface StoryPlayerProps {
  title: string;
  story: string;
  audioUrl: string | null;
  estimatedDuration: string;
  theme: string;
  onFinish: () => void;
}

export function StoryPlayer({ title, story, estimatedDuration, theme, onFinish }: StoryPlayerProps) {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    let isCancelled = false;
    
    const checkSupport = async () => {
      try {
        await TextToSpeech.getSupportedLanguages();
      } catch (e) {
        if (!isCancelled) setIsSupported(false);
      }
    };
    
    checkSupport();
    
    return () => {
      isCancelled = true;
      TextToSpeech.stop();
    };
  }, []);

  const speakStory = async () => {
    if (!isSupported) return;
    
    try {
      setIsPlaying(true);
      await TextToSpeech.speak({
        text: story,
        lang: 'hi-IN',
        rate: 0.9,
        pitch: 1.0,
        category: 'ambient',
      });
      // Speak promise resolves when finished
      setIsPlaying(false);
      setTimeout(onFinish, 1500);
    } catch (e) {
      console.error("TTS Error", e);
      setIsPlaying(false);
      setIsSupported(false);
    }
  };

  // Removed auto-play on mount to prevent browser autoplay policy errors.
  // The user must press Play manually.
  const togglePlay = async () => {
    if (!isSupported) return;
    
    if (isPlaying) {
      await TextToSpeech.stop();
      setIsPlaying(false);
    } else {
      speakStory();
    }
  };

  const replay = async () => {
    if (!isSupported) return;
    await TextToSpeech.stop();
    speakStory();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-col items-center w-full max-w-3xl mx-auto px-4 py-8"
    >
      <div className="bg-smriti-surface border border-smriti-border rounded-[32px] p-8 md:p-12 shadow-sm w-full">
        
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="text-sm font-bold text-smriti-primary bg-smriti-primary/10 px-4 py-2 rounded-full mb-4">
            {theme} • {estimatedDuration}
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-smriti-text">
            {title}
          </h2>
        </div>

        {isSupported ? (
          <div className="flex flex-col items-center mb-8">
            <motion.div 
              animate={isPlaying && !shouldReduceMotion ? { scale: [1, 1.05, 1], opacity: [0.8, 1, 0.8] } : {}}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="w-32 h-32 bg-smriti-primary/10 rounded-full flex items-center justify-center mb-8"
            >
              <Volume2 className={`w-16 h-16 ${isPlaying ? "text-smriti-primary" : "text-smriti-muted"}`} />
            </motion.div>
            
            {isPlaying && (
              <p className="text-smriti-primary font-medium mb-8 animate-pulse">
                {t("games.storyTime.loading") || "कहानी सुनाई जा रही है..."}
              </p>
            )}

            <div className="flex items-center gap-6">
              <button 
                onClick={replay}
                className="w-16 h-16 rounded-full border-2 border-smriti-border bg-smriti-surface flex items-center justify-center text-smriti-text hover:bg-smriti-bg touch-target transition-colors"
                aria-label="Replay"
              >
                <RotateCcw className="w-8 h-8" />
              </button>
              
              <button 
                onClick={togglePlay}
                className="w-24 h-24 rounded-full bg-smriti-primary flex items-center justify-center text-white hover:scale-105 active:scale-95 touch-target shadow-md transition-all"
                aria-label={isPlaying ? t("games.storyTime.pause") : t("games.storyTime.play")}
              >
                {isPlaying ? <Pause className="w-12 h-12" /> : <Play className="w-12 h-12 ml-2" />}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-2xl mb-8 flex items-start gap-3">
            <Volume2 className="w-6 h-6 shrink-0 mt-0.5" />
            <p className="font-medium text-lg">
              {t("games.storyTime.noAudio") || "The story is ready, but audio is currently unavailable."}
            </p>
          </div>
        )}

        <div className="mt-8 bg-smriti-bg rounded-3xl p-6 md:p-8 border border-smriti-border/30">
          <div className="flex items-center gap-3 mb-4 text-smriti-muted">
            <BookOpen className="w-6 h-6" />
            <span className="font-bold text-lg">{t("games.storyTime.readStory") || "कहानी पढ़ें"}</span>
          </div>
          <p className="text-xl md:text-2xl leading-relaxed text-smriti-text">
            {story}
          </p>
          
          <div className="mt-8 flex justify-center">
             <button 
               onClick={onFinish}
               className="bg-smriti-primary text-white px-8 py-4 rounded-full font-bold text-xl hover:scale-105 transition-all"
             >
               {t("games.storyTime.completed") || "Story complete"}
             </button>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
