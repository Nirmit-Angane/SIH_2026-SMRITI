"use client";

import { User as UserIcon, Edit3 } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";

interface ProfileHeaderProps {
  onEditClick: () => void;
}

export function ProfileHeader({ onEditClick }: ProfileHeaderProps) {
  const { profile } = useAuth();
  const { t } = useLanguage();

  return (
    <section className="w-full max-w-3xl mx-auto mb-8 flex flex-col items-center text-center">
      
      {/* Avatar Container */}
      <div className="w-24 h-24 bg-[#dbe1ff] neo-border neo-shadow flex items-center justify-center mb-4 overflow-hidden">
        <UserIcon className="w-12 h-12 text-[#00174b]" />
      </div>
      
      <h1 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] tracking-tight mb-1">
        {profile?.name || t("common.loading") || "User Profile"}
      </h1>
      <p className="font-body-md text-base text-[#434655] mb-4">
        {t("profile.subtitle") || "Your personalized SMRITI settings, language, and preferences"}
      </p>

      <button 
        onClick={onEditClick}
        className="px-6 py-2.5 bg-white text-[#1a1c1c] neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all font-label-caps text-xs sm:text-sm font-bold uppercase flex items-center gap-2 cursor-pointer"
      >
        <Edit3 className="w-4 h-4 stroke-[2.5]" />
        <span>{t("profile.editProfile") || "Edit Profile Info"}</span>
      </button>
    </section>
  );
}
