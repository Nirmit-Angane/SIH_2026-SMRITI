"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function TodaysActivity() {
  const { t } = useLanguage();
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 mb-10"
    >
      <div className="bg-smriti-primary/10 border-2 border-smriti-primary/20 rounded-[28px] p-8 md:p-10 relative overflow-hidden group">
        
        {/* Subtle decorative blob */}
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-smriti-primary/10 rounded-full blur-3xl group-hover:bg-smriti-primary/20 transition-all duration-700"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-smriti-primary" />
              <h2 className="text-xl font-bold text-smriti-primary uppercase tracking-wider">{t("home.todaysActivity") || "Today's Activity"}</h2>
            </div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-smriti-text mb-2">{t("home.readyMessage") || "A gentle activity is ready for you."}</h3>
            <p className="text-lg text-smriti-text/80">{t("activities.familyAndFriends.desc") || "Take a moment to engage your memory with familiar faces."}</p>
          </div>
          
          <Link 
            href="/activities/family-recognition"
            className="inline-flex items-center justify-center gap-3 bg-smriti-primary text-white px-8 py-5 rounded-2xl font-bold text-xl hover:bg-smriti-primary/90 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-smriti-primary/20 touch-target shrink-0"
          >
            {t("home.startActivity") || "Start Activity"}
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
