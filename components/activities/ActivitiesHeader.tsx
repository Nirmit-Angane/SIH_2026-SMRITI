"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export function ActivitiesHeader() {
  const { t } = useLanguage();
  return (
    <motion.section 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 mb-8"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-smriti-text mb-3">{t("activities.title") || "Activities"}</h1>
      <p className="text-xl md:text-2xl text-smriti-muted font-medium">{t("activities.subtitle") || "Take a gentle moment to remember, notice, and connect."}</p>
    </motion.section>
  );
}
