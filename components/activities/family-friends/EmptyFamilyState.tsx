"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export function EmptyFamilyState() {
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
          <Users className="w-12 h-12 text-smriti-primary/60" />
        </div>
        
        <h2 className="text-3xl font-extrabold text-smriti-text mb-4">
          {t("games.familyRecognition.emptyTitle") || "Let's add a few more familiar faces first."}
        </h2>
        
        <p className="text-xl text-smriti-muted font-medium max-w-md mx-auto mb-10">
          {t("games.familyRecognition.emptyDesc") || "Add at least 3 family members with photos so we can create a gentle recognition activity."}
        </p>

        <Link 
          href="/family"
          className="inline-flex items-center justify-center gap-3 bg-smriti-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-smriti-primary/90 transition-colors touch-target"
        >
          {t("games.familyRecognition.goToFamily") || "Go to Family"}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </motion.div>
  );
}
