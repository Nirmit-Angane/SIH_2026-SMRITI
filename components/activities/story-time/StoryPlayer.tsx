"use client";

import { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Volume2, BookOpen, Check, ArrowLeft, UserCheck, Sparkles, Globe, Loader2 } from "lucide-react";
import { speechService } from "@/lib/speech/speechService";
import { STORY_LANGUAGES } from "@/lib/constants/languages";
import Link from "next/link";

interface StoryPlayerProps {
  title: string;
  story: string;
  audioUrl: string | null;
  estimatedDuration: string;
  theme: string;
  isOriginal?: boolean;
  currentLanguage?: string;
  onTranslate?: (targetLangId: string) => Promise<void>;
  onFinish: () => void;
}

export function StoryPlayer({ 
  title, 
  story, 
  estimatedDuration, 
  theme, 
  isOriginal, 
  currentLanguage = "en",
  onTranslate,
  onFinish 
}: StoryPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeLang, setActiveLang] = useState(currentLanguage);
  const [isTranslating, setIsTranslating] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  useEffect(() => {
    return () => {
      speechService.stop();
    };
  }, []);

  const speakStory = async () => {
    try {
      setIsPlaying(true);
      await speechService.speak(story, activeLang);
      setIsPlaying(false);
    } catch (e) {
      console.error("TTS Error", e);
      setIsPlaying(false);
    }
  };

  const togglePlay = async () => {
    if (isPlaying) {
      await speechService.stop();
      setIsPlaying(false);
    } else {
      speakStory();
    }
  };

  const replay = async () => {
    await speechService.stop();
    speakStory();
  };

  const handleLanguageChange = async (langId: string) => {
    if (langId === activeLang) {
      setShowLangMenu(false);
      return;
    }

    setShowLangMenu(false);
    await speechService.stop();
    setIsPlaying(false);

    if (onTranslate) {
      setIsTranslating(true);
      try {
        await onTranslate(langId);
        setActiveLang(langId);
      } catch (e) {
        console.error("Translation error", e);
      } finally {
        setIsTranslating(false);
      }
    } else {
      setActiveLang(langId);
    }
  };

  const currentLangObj = STORY_LANGUAGES.find(l => l.id === activeLang || l.name.toLowerCase() === activeLang.toLowerCase()) || STORY_LANGUAGES[3];

  return (
    <div className="w-full max-w-6xl mx-auto py-2 px-2 sm:px-4 flex flex-col justify-start">
      
      {/* Top Header Row */}
      <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-[#1a1c1c]">
        <Link 
          href="/activities"
          className="inline-flex items-center gap-2 bg-white neo-border px-3.5 py-1.5 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all self-start"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Activities
        </Link>

        {/* Translation Switcher & Badge */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Live Translation Dropdown Button */}
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              disabled={isTranslating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 font-label-caps text-xs font-bold uppercase neo-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-white text-[#1a1c1c] hover:bg-[#f4f4f3] transition-all cursor-pointer disabled:opacity-60"
            >
              {isTranslating ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-[#2563eb]" />
              ) : (
                <Globe className="w-3.5 h-3.5 text-[#004ac6]" />
              )}
              <span>{currentLangObj.name} ({currentLangObj.nativeName})</span>
              <span className="text-[10px]">▼</span>
            </button>

            {/* Language Selection Popover */}
            {showLangMenu && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-2 z-50 grid grid-cols-1 gap-1 max-h-80 overflow-y-auto">
                <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-[#737686] border-b border-[#1a1c1c]/10">
                  Translate Story To:
                </div>
                {STORY_LANGUAGES.map(lang => (
                  <button
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang.id)}
                    className={`w-full text-left px-3 py-1.5 font-label-caps text-xs uppercase font-bold flex items-center justify-between transition-colors ${
                      activeLang === lang.id ? "bg-[#2563eb] text-white" : "hover:bg-[#f4f4f3] text-[#1a1c1c]"
                    }`}
                  >
                    <span>{lang.name}</span>
                    <span className="text-[10px] opacity-75 font-normal">{lang.nativeName}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 font-label-caps text-xs font-bold uppercase neo-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-[#ffe083] text-[#231b00]">
            {isOriginal ? (
              <>
                <UserCheck className="w-3.5 h-3.5 stroke-[2.5]" />
                <span>Original Recorded Memory (No AI)</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>{theme} • {estimatedDuration}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Story Title Header */}
      <h1 className="font-display-lg text-2xl sm:text-3xl lg:text-4xl font-black uppercase text-[#1a1c1c] tracking-tight mb-4">
        {title}
      </h1>

      {/* 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 w-full items-stretch">
        
        {/* Left Column: Audio Narrator & Controls */}
        <div className="md:col-span-5 flex flex-col justify-between gap-4">
          
          <div className="bg-[#f9f9f8] neo-border neo-shadow p-5 sm:p-6 flex flex-col items-center justify-center text-center gap-3">
            <div className={`w-20 h-20 rounded-full neo-border flex items-center justify-center shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
              isOriginal ? "bg-[#ffe083] text-[#231b00]" : "bg-[#dbe1ff] text-[#00174b]"
            }`}>
              <Volume2 className={`w-10 h-10 ${isPlaying ? "animate-pulse" : ""}`} />
            </div>
            
            <p className="font-headline-lg font-black text-lg sm:text-xl uppercase tracking-wider text-[#1a1c1c]">
              {isTranslating 
                ? "Translating..." 
                : isPlaying 
                ? (activeLang === "hi" ? "Speaking in Hindi..." : "Speaking in English...") 
                : (activeLang === "hi" ? "Ready (Hindi Audio)" : "Ready (English Audio)")}
            </p>

            {/* 3 Bouncing Colored Dots */}
            <div className="flex gap-2 my-1">
              <div className={`w-3.5 h-3.5 bg-[#ba1a1a] rounded-full border-2 border-black ${isPlaying ? "animate-bounce" : ""}`} style={{ animationDelay: "0s" }}></div>
              <div className={`w-3.5 h-3.5 bg-[#ffe083] rounded-full border-2 border-black ${isPlaying ? "animate-bounce" : ""}`} style={{ animationDelay: "0.15s" }}></div>
              <div className={`w-3.5 h-3.5 bg-[#6bff8f] rounded-full border-2 border-black ${isPlaying ? "animate-bounce" : ""}`} style={{ animationDelay: "0.3s" }}></div>
            </div>

            {/* Player Action Buttons */}
            <div className="flex items-center gap-3 w-full justify-center mt-2">
              <button 
                onClick={replay}
                disabled={isTranslating}
                className="p-3.5 bg-white text-[#1a1c1c] neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] active:translate-y-[3px] active:translate-x-[3px] active:shadow-none transition-all cursor-pointer disabled:opacity-50"
                aria-label="Replay"
                title="Replay from start"
              >
                <RotateCcw className="w-5 h-5 stroke-[2.5]" />
              </button>
              
              <button 
                onClick={togglePlay}
                disabled={isTranslating}
                className="flex-1 max-w-[220px] py-3.5 px-4 bg-[#2563eb] text-white neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] active:translate-y-[3px] active:translate-x-[3px] active:shadow-none transition-all font-headline-lg text-base sm:text-lg uppercase font-black tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                <span>{isPlaying ? "Pause" : (activeLang === "hi" ? "Listen (Hindi)" : "Listen (English)")}</span>
              </button>
            </div>
          </div>

          {/* Finish Button */}
          <button 
            onClick={onFinish}
            className="w-full py-4 px-6 bg-[#6bff8f] text-[#002109] neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none font-headline-lg text-lg sm:text-xl uppercase font-black tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Check className="w-6 h-6 stroke-[3]" />
            <span>Finished</span>
          </button>

        </div>

        {/* Right Column: Story Text Box */}
        <div className="md:col-span-7 bg-[#f4f4f3] neo-border neo-shadow p-5 sm:p-7 flex flex-col justify-start relative">
          {isTranslating && (
            <div className="absolute inset-0 bg-white/80 backdrop-blur-xs flex items-center justify-center z-10">
              <div className="flex items-center gap-3 bg-white neo-border p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-headline-lg uppercase font-black">
                <Loader2 className="w-5 h-5 animate-spin text-[#2563eb]" />
                <span>Translating to {currentLangObj.name}...</span>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b-2 border-[#1a1c1c] text-[#1a1c1c] font-label-caps text-xs font-bold uppercase">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#004ac6]" />
              <span>{isOriginal ? "Original Memory Description" : "Story Narrative"}</span>
            </div>
            <span className="text-[#004ac6]">{currentLangObj.name}</span>
          </div>

          <p className="font-body-lg text-base sm:text-lg lg:text-xl leading-relaxed text-[#1a1c1c] whitespace-pre-wrap">
            {story}
          </p>
        </div>

      </div>

    </div>
  );
}
