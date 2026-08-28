"use client";

import { useAuth } from "@/hooks/useAuth";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export function GreetingSection() {
  const { profile } = useAuth();
  const { t } = useLanguage();
  
  // Extract first name or fallback safely
  const firstName = profile?.name ? profile.name.split(" ")[0] : "there";
  
  // Determine if we need extra-large typography for high support levels
  const isGentleSupport = profile?.supportLevel === "more-support";

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="text-center pt-8 pb-10"
    >
      <h1 className={`${isGentleSupport ? 'text-5xl md:text-6xl' : 'text-4xl md:text-5xl'} font-extrabold text-smriti-text mb-4 tracking-tight`}>
        {t("home.greeting", { name: firstName }) || `Good morning, ${firstName}.`}
      </h1>
      <p className="text-xl md:text-2xl text-smriti-muted font-medium">
        {t("home.subtitle") || "Let's take a gentle moment together."}
      </p>
    </motion.section>
  );
}
