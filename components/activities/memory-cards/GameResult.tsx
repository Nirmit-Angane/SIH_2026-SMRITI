"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { Sparkles, RotateCcw, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface GameResultProps {
  pairsFound: number;
  onPlayAgain: () => void;
}

export function GameResult({ pairsFound, onPlayAgain }: GameResultProps) {
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
          <Sparkles className="w-10 h-10 text-[#735c00]" />
        </div>
        
        <h2 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#231b00] mb-3 tracking-tight">
          {t("games.memoryCards.finishedTitle") || "Memory Match Complete!"}
        </h2>
        
        <p className="font-body-md text-base sm:text-lg text-[#4e3d00] mb-6">
          {t("games.memoryCards.finishedDesc") || "Wonderful effort remembering the pairs."}
        </p>

        <div className="bg-white neo-border p-6 mb-8">
          <p className="font-display-lg text-3xl font-black uppercase text-[#1a1c1c] mb-1">
            {pairsFound} Pairs Matched
          </p>
          <p className="font-label-caps text-xs uppercase font-bold text-[#434655]">
            Great Cognitive Workout!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/activities"
            className="inline-flex items-center justify-center bg-white text-[#1a1c1c] px-8 py-4 neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none font-headline-lg text-lg uppercase font-black tracking-wider transition-all"
          >
            {t("games.memoryCards.backToActivities") || "Back to Activities"}
          </Link>
          
          <button 
            onClick={onPlayAgain}
            className="inline-flex items-center justify-center gap-2 bg-[#2563eb] text-white px-8 py-4 neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none font-headline-lg text-lg uppercase font-black tracking-wider transition-all cursor-pointer"
          >
            <RotateCcw className="w-5 h-5 stroke-[2.5]" />
            <span>{t("games.memoryCards.playAgain") || "Play Again"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
