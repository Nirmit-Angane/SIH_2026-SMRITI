"use client";

import { motion } from "framer-motion";
import { Mic } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function VoiceAssistantCard() {
  const { t } = useLanguage();
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 mb-6"
    >
      <div className="bg-white border-2 border-smriti-border rounded-[24px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group hover:border-smriti-primary hover:shadow-xl hover:shadow-smriti-primary/5 transition-all duration-300">
        
        {/* Subtle decorative waves */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-smriti-primary/5 to-transparent pointer-events-none group-hover:from-smriti-primary/10 transition-colors"></div>

        <div className="flex items-center gap-6 relative z-10 text-center md:text-left flex-col md:flex-row">
          <div className="w-20 h-20 rounded-full bg-smriti-primary/10 flex items-center justify-center shrink-0 border border-smriti-primary/20 shadow-inner">
            <Mic className="w-10 h-10 text-smriti-primary" />
          </div>
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-smriti-text mb-2">{t("home.talkToSmriti") || "Talk to SMRITI"}</h3>
            <p className="text-lg text-smriti-muted">You can speak to SMRITI instead of typing.</p>
          </div>
        </div>

        <Link 
          href="/voice"
          className="relative z-10 w-full md:w-auto inline-flex items-center justify-center bg-white border-2 border-smriti-primary text-smriti-primary px-8 py-4 rounded-2xl font-bold text-xl hover:bg-smriti-primary hover:text-white transition-all shadow-sm touch-target shrink-0 gap-3"
        >
          <Mic className="w-5 h-5" />
          {t("home.startTalking") || "Start Talking"}
        </Link>
      </div>
    </motion.section>
  );
}
