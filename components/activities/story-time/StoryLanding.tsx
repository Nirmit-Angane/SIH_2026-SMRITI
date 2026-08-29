"use client";

import { useState } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { ArrowLeft, BookOpen, Sparkles, Plus, UserCheck, Globe } from "lucide-react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db, Memory } from "@/lib/db/dexie";
import { STORY_LANGUAGES } from "@/lib/constants/languages";

interface StoryLandingProps {
  onBegin: (memory?: Memory, mode?: "original" | "ai", targetLangId?: string) => void;
}

export function StoryLanding({ onBegin }: StoryLandingProps) {
  const { language: currentLang } = useLanguage();
  const elderId = 1;
  const memories = useLiveQuery(() => db.memories.where({ elderId }).toArray(), [elderId]);

  const [selectedLang, setSelectedLang] = useState<string>(currentLang === "hi" ? "hi" : "en");

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-5xl mx-auto py-2 px-3 sm:px-4">
      
      {/* Top Navigation Back Button */}
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b-2 border-[#1a1c1c]">
        <Link 
          href="/activities"
          className="inline-flex items-center gap-2 bg-white neo-border px-3.5 py-1.5 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Activities
        </Link>

        <Link 
          href="/family"
          className="inline-flex items-center gap-1.5 bg-[#ffe083] text-[#231b00] neo-border px-3 py-1.5 font-label-caps text-xs uppercase font-bold hover:bg-[#ffd966] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add New Memory</span>
        </Link>
      </div>

      {/* Language Selector Strip */}
      <div className="w-full bg-white neo-border neo-shadow-sm p-4 mb-6">
        <div className="flex items-center gap-2 mb-2 pb-1 border-b border-[#1a1c1c]/10 text-[#1a1c1c] font-label-caps text-xs font-bold uppercase">
          <Globe className="w-4 h-4 text-[#004ac6]" />
          <span>Story Language / ভাষা / भाषा / ꯂꯣꯟ</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {STORY_LANGUAGES.map((lang) => {
            const isSelected = selectedLang === lang.id;
            return (
              <button
                key={lang.id}
                type="button"
                onClick={() => setSelectedLang(lang.id)}
                className={`px-3 py-1.5 neo-border font-label-caps text-xs font-bold uppercase transition-all flex items-center gap-1.5 cursor-pointer ${
                  isSelected 
                    ? "bg-[#2563eb] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]" 
                    : "bg-[#f9f9f8] text-[#1a1c1c] hover:bg-white hover:translate-x-[1px] hover:translate-y-[1px]"
                }`}
              >
                <span>{lang.name}</span>
                <span className="opacity-75 text-[10px]">({lang.nativeName})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Banner */}
      <div className="bg-[#2563eb] text-white neo-border neo-shadow p-6 sm:p-8 w-full text-center mb-6">
        <div className="w-16 h-16 bg-[#ffe083] text-[#231b00] neo-border flex items-center justify-center mb-3 mx-auto shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
          <BookOpen className="w-8 h-8" />
        </div>
        
        <h1 className="font-display-lg text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2">
          Story Memory & Heritage
        </h1>
        <p className="font-body-md text-sm sm:text-base text-white/90 max-w-xl mx-auto mb-4">
          Experience memories woven into authentic stories in {STORY_LANGUAGES.find(l => l.id === selectedLang)?.name || "English"}.
        </p>

        <button 
          onClick={() => onBegin(undefined, "ai", selectedLang)}
          className="bg-[#6bff8f] text-[#002109] px-8 py-3.5 neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] active:translate-y-[3px] active:translate-x-[3px] active:shadow-none font-headline-lg text-lg uppercase font-black tracking-wider transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-5 h-5" />
          <span>Generate {STORY_LANGUAGES.find(l => l.id === selectedLang)?.name} Story</span>
        </button>
      </div>

      {/* User's Specific Saved Memories List */}
      {memories && memories.length > 0 && (
        <div className="w-full">
          <div className="flex items-center justify-between mb-3 pb-1 border-b-2 border-[#1a1c1c]">
            <h2 className="font-headline-lg text-xl font-black uppercase text-[#1a1c1c]">
              Your Memory Bank Stories ({memories.length})
            </h2>
            <span className="font-label-caps text-xs text-[#434655] font-bold">
              Choose Original Voice or AI Story in {STORY_LANGUAGES.find(l => l.id === selectedLang)?.name}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {memories.map((mem) => (
              <div 
                key={mem.id}
                className="bg-white neo-border neo-shadow-sm p-4 sm:p-5 flex flex-col justify-between hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <h3 className="font-display-lg text-lg sm:text-xl font-black uppercase text-[#1a1c1c] truncate">
                      {mem.title}
                    </h3>
                    {mem.year && (
                      <span className="bg-[#ffe083] text-[#231b00] neo-border px-2 py-0.5 font-label-caps text-[10px] font-bold shrink-0">
                        {mem.year}
                      </span>
                    )}
                  </div>
                  {mem.description && (
                    <p className="font-body-md text-xs sm:text-sm text-[#434655] line-clamp-3 mb-4">
                      {mem.description}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-[#1a1c1c]/20">
                  {/* Option 1: Hear Original Memory (No AI) */}
                  <button
                    onClick={() => onBegin(mem, "original", selectedLang)}
                    className="w-full py-2.5 px-3 bg-[#ffe083] text-[#231b00] neo-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none font-headline-lg text-xs uppercase font-black tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <UserCheck className="w-4 h-4 stroke-[2.5]" />
                    <span>Hear Original (No AI)</span>
                  </button>

                  {/* Option 2: AI Story Adaptation */}
                  <button
                    onClick={() => onBegin(mem, "ai", selectedLang)}
                    className="w-full py-2.5 px-3 bg-[#2563eb] text-white neo-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none font-headline-lg text-xs uppercase font-black tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{STORY_LANGUAGES.find(l => l.id === selectedLang)?.name} Story Adaptation</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
