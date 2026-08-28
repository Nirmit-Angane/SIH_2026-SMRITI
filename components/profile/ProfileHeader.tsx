"use client";

import { motion } from "framer-motion";
import { User as UserIcon } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";

interface ProfileHeaderProps {
  onEditClick: () => void;
}

export function ProfileHeader({ onEditClick }: ProfileHeaderProps) {
  const { profile } = useAuth();
  const { t } = useLanguage();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-8 flex flex-col items-center text-center"
    >
      <div className="w-24 h-24 rounded-full bg-smriti-primary/10 border-4 border-smriti-primary/20 flex items-center justify-center mb-4 overflow-hidden relative">
        <UserIcon className="w-12 h-12 text-smriti-primary/50" />
      </div>
      
      <h1 className="text-3xl font-extrabold text-smriti-text mb-1">
        {profile?.name || t("common.loading") || "Loading..."}
      </h1>
      <p className="text-lg text-smriti-muted font-medium mb-6">
        {t("profile.subtitle") || "Your SMRITI space"}
      </p>

      <button 
        onClick={onEditClick}
        className="px-8 py-3 bg-smriti-surface border border-smriti-border rounded-full font-bold text-smriti-text hover:bg-smriti-primary/10 transition-colors touch-target shadow-sm"
      >
        {t("profile.editProfile") || "Edit Profile"}
      </button>
    </motion.section>
  );
}
