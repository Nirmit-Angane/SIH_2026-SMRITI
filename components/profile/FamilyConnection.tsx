"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/dexie";
import Link from "next/link";
import { ArrowRight, Users } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

export function FamilyConnection() {
  const { t } = useLanguage();
  const familyCount = useLiveQuery(() => db.familyMembers.count()) || 0;
  const memoryCount = useLiveQuery(() => db.memories.count()) || 0;

  return (
    <section className="w-full mb-6">
      <div className="pb-2 mb-3 border-b-2 border-[#1a1c1c]">
        <h2 className="font-display-lg text-xl sm:text-2xl font-black uppercase text-[#1a1c1c]">
          {t("profile.family.title") || "Family & Memory Circle"}
        </h2>
      </div>
      
      <Link 
        href="/family"
        className="block bg-[#ffe083] neo-border neo-shadow p-5 hover:translate-x-[1px] hover:translate-y-[1px] transition-all group"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 bg-white neo-border flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Users className="w-6 h-6 text-[#231b00]" />
            </div>
            <div>
              <span className="block font-display-lg text-base sm:text-lg font-black uppercase text-[#231b00] group-hover:text-[#004ac6] transition-colors">
                {t("profile.family.countDesc", { faces: String(familyCount), memories: String(memoryCount) }) || `${familyCount} Faces • ${memoryCount} Memories`}
              </span>
              <span className="block font-body-md text-xs sm:text-sm text-[#4e3d00]">
                {t("profile.family.manageDesc") || "Manage family photos, stories, and voice memories"}
              </span>
            </div>
          </div>
          
          <div className="w-9 h-9 bg-white neo-border flex items-center justify-center shrink-0 group-hover:bg-[#2563eb] group-hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </div>
        </div>
      </Link>
    </section>
  );
}
