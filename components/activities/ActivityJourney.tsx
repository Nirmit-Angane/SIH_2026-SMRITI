"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function ActivityJourney() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const { t } = useLanguage();
  
  // Static visual placeholder for progress as requested
  const progress = [true, true, true, false, false, false, false];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 mb-10"
    >
      <div className="bg-smriti-surface border border-smriti-border rounded-[24px] p-8 relative overflow-hidden">
        
        <h2 className="text-2xl font-extrabold text-smriti-text mb-2">{t("activities.journey.title") || "Your Activity Journey"}</h2>
        <p className="text-lg text-smriti-muted mb-8">{t("activities.journey.desc") || "A little time each day can become a meaningful routine."}</p>

        <div className="mb-6">
          <p className="text-sm font-bold text-smriti-text uppercase tracking-wider mb-4">{t("activities.journey.thisWeek") || "This Week"}</p>
          <div className="flex gap-4 md:gap-6 items-center">
            {days.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div 
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                    ${progress[i] 
                      ? 'bg-smriti-primary border-smriti-primary' 
                      : 'bg-transparent border-smriti-border/50'
                    }`}
                >
                  {/* Subtle inner dot for completed days */}
                  {progress[i] && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className={`text-sm font-bold ${progress[i] ? 'text-smriti-text' : 'text-smriti-muted'}`}>
                  {day}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-8">
          <p className="text-lg font-medium text-smriti-text">
            <strong className="font-extrabold">3</strong> gentle moments this week
          </p>
          <Link 
            href="/activities/family-recognition"
            className="inline-flex items-center gap-2 text-smriti-primary font-bold text-lg hover:underline touch-target"
          >
            {t("common.continue") || "Continue an activity"} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </motion.section>
  );
}
