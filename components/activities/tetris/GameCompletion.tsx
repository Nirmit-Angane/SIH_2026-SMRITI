"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { LayoutGrid, ArrowRight } from "lucide-react";
import Link from "next/link";

interface GameCompletionProps {
  linesCleared: number;
  onPlayAgain: () => void;
}

export function GameCompletion({ linesCleared, onPlayAgain }: GameCompletionProps) {
  const { t } = useLanguage();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto px-4 text-center"
    >
      <div className="bg-smriti-surface border border-smriti-border rounded-[32px] p-8 md:p-12 shadow-sm w-full">
        
        <div className="w-24 h-24 bg-smriti-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
          <LayoutGrid className="w-12 h-12 text-smriti-primary/60" />
        </div>
        
        <h2 className="text-3xl font-extrabold text-smriti-text mb-4">
          {t("games.tetris.completed") || "Well done."}
        </h2>
        
        <div className="bg-smriti-bg rounded-2xl py-6 px-8 mb-10 border border-smriti-border/50 mt-6">
          <p className="text-2xl font-bold text-smriti-text">
            {t("games.tetris.completionMsg", { lines: linesCleared.toString() }) || `You cleared ${linesCleared} lines.`}
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link 
            href="/activities"
            className="inline-flex items-center justify-center bg-smriti-surface border-2 border-smriti-border text-smriti-text px-8 py-4 rounded-full font-bold text-lg hover:bg-smriti-primary/5 hover:border-smriti-primary/30 transition-colors touch-target"
          >
            {t("games.tetris.backToActivities") || "Back to Activities"}
          </Link>
          
          <button 
            onClick={onPlayAgain}
            className="inline-flex items-center justify-center gap-2 bg-smriti-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-smriti-primary/90 transition-colors touch-target"
          >
            {t("games.tetris.playAgain") || "Play Again"}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
