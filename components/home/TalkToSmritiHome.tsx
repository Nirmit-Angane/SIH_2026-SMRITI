"use client";

import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function TalkToSmritiHome() {
  const { t } = useLanguage();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-16"
    >
      <div className="bg-smriti-primary/10 border border-smriti-primary/20 rounded-[32px] p-8 text-center flex flex-col items-center justify-center transition-all">
        
        <h3 className="text-2xl font-bold text-smriti-text mb-2">
          {t("home.talkToSmriti") || "Talk to SMRITI"}
        </h3>
        
        <p className="text-lg text-smriti-text/80 mb-6">
          {t("home.startTalking") || "You can speak instead of typing."}
        </p>
        
        <Link 
          href="/voice"
          className="flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all shadow-md group bg-smriti-primary text-white hover:scale-105 active:scale-95"
        >
          <Mic className="w-6 h-6 group-hover:scale-110 transition-transform" />
          {t("home.startTalking") || "Start Talking"}
        </Link>
      </div>
    </motion.section>
  );
}
