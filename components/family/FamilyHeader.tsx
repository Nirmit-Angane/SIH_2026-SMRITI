"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export function FamilyHeader() {
  const { t } = useLanguage();
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <header className="w-full mb-10 text-left">
      <button 
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-2 bg-white neo-border px-4 py-2 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back
      </button>

      <div className="pb-4 border-b-[4px] border-[#1a1c1c]">
        <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl font-black uppercase text-[#1a1c1c] tracking-tight mb-2">
          {t("family.yourPeople") || "Family Memory Gallery"}
        </h1>
        <p className="font-body-lg text-base sm:text-lg text-[#434655]">
          {t("family.peopleDesc") || "Preserve special moments, people, and voices for daily cognitive connection."}
        </p>
      </div>
    </header>
  );
}
