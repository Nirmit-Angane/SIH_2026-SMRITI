"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { ACTIVITIES } from "@/lib/activities";
import { useLanguage } from "@/components/LanguageProvider";

export function TodaysGentleMoment() {
  const recommended = ACTIVITIES[0];
  const { t } = useLanguage();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-12"
    >
      <div className="bg-smriti-primary/5 border border-smriti-primary/20 rounded-3xl p-6 md:p-8 relative overflow-hidden group hover:bg-smriti-primary/10 transition-colors duration-500">
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-smriti-primary" />
            <h2 className="text-sm font-bold text-smriti-primary uppercase tracking-widest">
              {t("home.todaysActivity") || "Today's Gentle Moment"}
            </h2>
          </div>
          
          <h3 className="text-2xl md:text-3xl font-extrabold text-smriti-text mb-3">
            {t(`activities.${recommended.id}.title`) || recommended.title}
          </h3>
          
          <p className="text-lg text-smriti-text/80 mb-6">
            {t(`activities.${recommended.id}.desc`) || recommended.desc}
          </p>
          
          <Link 
            href={recommended.href}
            className="inline-flex items-center gap-2 text-smriti-primary font-bold text-lg hover:underline touch-target"
          >
            {t(`common.${recommended.cta.toLowerCase().replace(/ /g, "")}`) || recommended.cta} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
