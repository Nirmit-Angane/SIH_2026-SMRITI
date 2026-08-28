"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

interface StoryCompletionProps {
  onPlayAgain: () => void;
  onNewStory: () => void;
}

export function StoryCompletion({ onPlayAgain, onNewStory }: StoryCompletionProps) {
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
          <BookOpen className="w-12 h-12 text-smriti-primary/60" />
        </div>
        
        <h2 className="text-3xl font-extrabold text-smriti-text mb-4">
          {t("games.storyTime.completed") || "कहानी पूरी हुई ❤️"}
        </h2>
        
        <p className="text-xl text-smriti-muted font-medium mb-10">
          आपने आज एक शांत पल बिताया।
        </p>

        <div className="flex flex-col gap-4 justify-center max-w-sm mx-auto">
          
          <button 
            onClick={onPlayAgain}
            className="inline-flex items-center justify-center gap-2 bg-smriti-surface border-2 border-smriti-border text-smriti-text px-8 py-4 rounded-full font-bold text-lg hover:bg-smriti-bg transition-colors touch-target w-full"
          >
            {t("games.storyTime.playAgain") || "फिर सुनें"}
          </button>

          <button 
            onClick={onNewStory}
            className="inline-flex items-center justify-center gap-2 bg-smriti-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-all shadow-md touch-target w-full"
          >
            {t("games.storyTime.newStory") || "नई कहानी"}
            <ArrowRight className="w-5 h-5" />
          </button>

          <Link 
            href="/activities"
            className="inline-flex items-center justify-center text-smriti-muted font-bold text-lg hover:text-smriti-text transition-colors mt-4 p-2"
          >
            {t("games.storyTime.backToActivities") || "गतिविधियों पर वापस जाएँ"}
          </Link>

        </div>
      </div>
    </motion.div>
  );
}
