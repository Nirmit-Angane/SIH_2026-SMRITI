"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { ArrowLeft, LayoutGrid } from "lucide-react";
import Link from "next/link";

interface GameIntroProps {
  onBegin: () => void;
  difficulty: "beginner" | "moderate" | "advanced";
  cardCount: number;
}

export function GameIntro({ onBegin, difficulty, cardCount }: GameIntroProps) {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto px-4 text-center"
    >
      <div className="bg-smriti-surface border border-smriti-border rounded-[32px] p-8 md:p-12 shadow-sm w-full relative">
        <Link 
          href="/activities"
          className="absolute top-6 left-6 text-smriti-muted hover:text-smriti-text transition-colors touch-target flex items-center justify-center p-2 rounded-full hover:bg-smriti-bg"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        
        <div className="w-20 h-20 bg-smriti-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto mt-6">
          <LayoutGrid className="w-10 h-10 text-smriti-primary/70" />
        </div>
        
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-4">
            {t("games.memoryCards.introTitle") || "Memory Cards"}
          </h1>
          <p className="text-xl text-smriti-muted font-medium mb-8">
            {t("games.memoryCards.introDesc") || "Let's look at some familiar pictures and find the matching pairs."}
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm font-bold text-smriti-muted">
            <span className="bg-smriti-bg px-4 py-2 rounded-full border border-smriti-border/50">
              {cardCount} cards
            </span>
            <span className="bg-smriti-bg px-4 py-2 rounded-full border border-smriti-border/50 capitalize">
              {difficulty}
            </span>
            <span className="bg-smriti-bg px-4 py-2 rounded-full border border-smriti-border/50">
              Family & Region
            </span>
          </div>
        </div>

        <button 
          onClick={onBegin}
          className="bg-smriti-primary text-white px-10 py-4 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-md touch-target w-full md:w-auto"
        >
          {t("games.memoryCards.begin") || "Begin"}
        </button>
      </div>
    </motion.div>
  );
}
