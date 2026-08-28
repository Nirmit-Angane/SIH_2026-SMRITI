"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { Loader2 } from "lucide-react";

export function StoryLoading() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto px-4 text-center"
    >
      <div className="flex flex-col items-center justify-center">
        <motion.div
          animate={shouldReduceMotion ? {} : { rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 text-smriti-primary mb-6" />
        </motion.div>
        
        <h2 className="text-2xl font-bold text-smriti-text">
          {t("games.storyTime.loading") || "आपके लिए कहानी तैयार की जा रही है..."}
        </h2>
      </div>
    </motion.div>
  );
}
