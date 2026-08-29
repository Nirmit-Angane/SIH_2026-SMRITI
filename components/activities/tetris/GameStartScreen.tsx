"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import Link from "next/link";

interface GameStartScreenProps {
  onBegin: () => void;
}

export function GameStartScreen({ onBegin }: GameStartScreenProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto py-4">
      
      {/* Top Navigation Back Button */}
      <div className="w-full flex items-center justify-start mb-6">
        <Link 
          href="/activities"
          className="inline-flex items-center gap-2 bg-white neo-border px-4 py-2 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Activities
        </Link>
      </div>

      <div className="bg-[#ffe083] neo-border neo-shadow p-8 sm:p-12 w-full text-center">
        
        <div className="w-20 h-20 bg-white neo-border flex items-center justify-center mb-6 mx-auto">
          <LayoutGrid className="w-10 h-10 text-[#735c00]" />
        </div>
        
        <div className="mb-8">
          <h1 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#231b00] mb-3 tracking-tight">
            {t("games.tetris.title") || "Mind Puzzle (Tetris)"}
          </h1>
          <p className="font-body-md text-base sm:text-lg text-[#4e3d00]">
            {t("games.tetris.introDesc") || "A calm, gentle puzzle of falling shapes to engage spatial orientation and focus."}
          </p>
        </div>

        <button 
          onClick={onBegin}
          className="bg-[#2563eb] text-white px-10 py-4 neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none font-headline-lg text-xl uppercase font-black tracking-wider transition-all w-full sm:w-auto cursor-pointer"
        >
          {t("games.tetris.begin") || "Start Puzzle"}
        </button>
      </div>
    </div>
  );
}
