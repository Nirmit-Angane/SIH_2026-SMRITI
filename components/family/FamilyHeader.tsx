"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export function FamilyHeader() {
  const { t } = useLanguage();
  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 mb-10"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-smriti-text mb-3">{t("family.yourPeople") || "Your People"}</h1>
      <p className="text-xl md:text-2xl text-smriti-muted font-medium">{t("family.peopleDesc") || "People and memories that are close to you."}</p>
    </motion.section>
  );
}
