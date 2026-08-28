"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ActivityIntroProps {
  onBegin: () => void;
}

export function ActivityIntro({ onBegin }: ActivityIntroProps) {
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
        
        <div className="mt-8 mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-4">
            {t("games.familyRecognition.introTitle") || "Let's remember familiar faces."}
          </h1>
          <p className="text-xl md:text-2xl text-smriti-muted font-medium">
            {t("games.familyRecognition.introDesc") || "Take your time. Look at the faces and choose the person you recognize."}
          </p>
        </div>

        <button 
          onClick={onBegin}
          className="bg-smriti-primary text-white px-10 py-4 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-md touch-target w-full md:w-auto"
        >
          {t("games.familyRecognition.begin") || "Begin"}
        </button>
      </div>
    </motion.div>
  );
}
