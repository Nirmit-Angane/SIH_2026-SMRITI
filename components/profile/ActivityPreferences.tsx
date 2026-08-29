"use client";

import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";
import { CheckSquare, Square, Sparkles } from "lucide-react";

export function ActivityPreferences() {
  const { profile, updateProfile } = useAuth();
  const { t } = useLanguage();
  
  if (!profile) return null;

  const ACTIVITY_CATEGORIES = [
    { id: "family", label: t("activities.family.title") || "Family & Friends" },
    { id: "memory_cards", label: t("activities.memory.title") || "Memory Cards" },
    { id: "story_time", label: t("activities.story.title") || "Story Time" },
    { id: "what_changed", label: t("activities.tetris.title") || "Mind Puzzle" },
  ];

  const preferredActivities = profile.preferences?.preferredActivities || [];

  const toggleCategory = async (id: string) => {
    let newPrefs;
    if (preferredActivities.includes(id)) {
      newPrefs = preferredActivities.filter(c => c !== id);
    } else {
      newPrefs = [...preferredActivities, id];
    }
    
    await updateProfile({ 
      preferences: { 
        ...profile.preferences, 
        preferredActivities: newPrefs,
        dailyActivity: profile.preferences?.dailyActivity ?? true,
      } 
    });
  };

  const toggleDailyActivity = async (enabled: boolean) => {
    await updateProfile({ 
      preferences: { 
        ...profile.preferences, 
        dailyActivity: enabled,
        preferredActivities: profile.preferences?.preferredActivities || [],
      } 
    });
  };

  return (
    <section className="w-full mb-6">
      <div className="pb-2 mb-3 border-b-2 border-[#1a1c1c]">
        <h2 className="font-display-lg text-xl sm:text-2xl font-black uppercase text-[#1a1c1c]">
          {t("profile.activities.title") || "Activity Preferences"}
        </h2>
      </div>

      <div className="bg-white neo-border neo-shadow p-5 sm:p-6 space-y-5">
        
        {/* Category Selection */}
        <div>
          <span className="block font-headline-lg text-base font-black uppercase text-[#1a1c1c] mb-1">
            {t("profile.activities.preferredTitle") || "Preferred Activities"}
          </span>
          <span className="block font-body-md text-xs sm:text-sm text-[#434655] mb-3">
            {t("profile.activities.preferredDesc") || "Select exercise types you enjoy most for your daily routine"}
          </span>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ACTIVITY_CATEGORIES.map(category => {
              const isChecked = preferredActivities.includes(category.id);
              return (
                <button
                  type="button"
                  key={category.id}
                  onClick={() => toggleCategory(category.id)}
                  className={`flex items-center gap-2.5 p-3 neo-border text-left transition-all cursor-pointer ${
                    isChecked
                      ? "bg-[#2563eb] text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]"
                      : "bg-[#f9f9f8] text-[#1a1c1c] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffe083]"
                  }`}
                >
                  {isChecked ? (
                    <CheckSquare className="w-4 h-4 text-white shrink-0 stroke-[2.5]" />
                  ) : (
                    <Square className="w-4 h-4 text-[#434655] shrink-0" />
                  )}
                  <span className="font-display-lg text-xs sm:text-sm font-black uppercase tracking-tight">
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Daily Recommended Moment Toggle */}
        <div className="pt-4 border-t-2 border-[#1a1c1c] flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1.5 mb-0.5">
              <Sparkles className="w-4 h-4 text-[#735c00]" />
              <span className="font-headline-lg text-sm sm:text-base font-black uppercase text-[#1a1c1c]">
                {t("profile.activities.dailyMoment") || "Gentle Daily Moment"}
              </span>
            </div>
            <span className="font-body-md text-xs text-[#434655]">
              {t("profile.activities.dailyMomentDesc") || "Get an automatic daily reminder"}
            </span>
          </div>

          <button
            type="button"
            onClick={() => toggleDailyActivity(!(profile.preferences?.dailyActivity ?? true))}
            className={`px-4 py-1.5 neo-border font-headline-lg text-xs uppercase font-black tracking-wider transition-all cursor-pointer ${
              (profile.preferences?.dailyActivity ?? true)
                ? "bg-[#6bff8f] text-[#002109] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                : "bg-[#ffdad6] text-[#ba1a1a] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            {(profile.preferences?.dailyActivity ?? true) ? (t("common.on") || "On") : (t("common.off") || "Off")}
          </button>
        </div>
        
      </div>
    </section>
  );
}
