"use client";

import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";

export function HomeGreeting() {
  const { profile } = useAuth();
  const { t } = useLanguage();
  // Fallback to "friend" if name isn't loaded yet
  const name = profile?.name || "friend";

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-10 text-center md:text-left"
    >
      <h1 className="text-4xl md:text-5xl font-extrabold text-smriti-text mb-4">
        {t("home.greeting", { name }) || `Good morning, ${name}.`}
      </h1>
      <p className="text-xl md:text-2xl text-smriti-muted font-medium">
        {t("home.subtitle") || "Let's take a gentle moment together."}
      </p>
    </motion.section>
  );
}
