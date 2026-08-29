"use client";

import { useAuth } from "@/hooks/useAuth";
import { REGIONS } from "@/app/onboarding/page";
import { REGION_LANGUAGE_CONFIG, RegionId, LANGUAGES } from "@/lib/i18n/config";
import { useLanguage } from "@/components/LanguageProvider";
import { useState, useEffect } from "react";
import { Check, Globe, MapPin, Volume2 } from "lucide-react";

export function ExperienceSettings() {
  const { profile, updateProfile } = useAuth();
  const { language, setLanguage, t, metadata: currentLangMeta } = useLanguage();
  
  const [prevRegion, setPrevRegion] = useState<RegionId | null>(null);
  const [showRegionChangePrompt, setShowRegionChangePrompt] = useState(false);
  const [suggestedLanguage, setSuggestedLanguage] = useState<string | null>(null);
  
  useEffect(() => {
    if (profile?.region) {
      const current = profile.region as RegionId;
      if (prevRegion && prevRegion !== current) {
        const config = REGION_LANGUAGE_CONFIG[current];
        const recommended = config?.recommended?.[0];
        
        if (recommended && recommended !== language) {
          setSuggestedLanguage(recommended);
          setShowRegionChangePrompt(true);
        } else {
          setShowRegionChangePrompt(false);
        }
      }
      setPrevRegion(current);
    }
  }, [profile?.region]);

  if (!profile) return null;

  const currentRegion = profile.region as RegionId;
  const config = REGION_LANGUAGE_CONFIG[currentRegion] || REGION_LANGUAGE_CONFIG["assam"];
  
  const updateRegion = async (newRegion: string) => {
    await updateProfile({ region: newRegion });
  };

  const updateVoiceGuidance = async (enabled: boolean) => {
    await updateProfile({ 
      accessibility: { 
        ...profile.accessibility, 
        voiceGuidance: enabled,
        textSize: profile.accessibility?.textSize || "standard",
        highContrast: profile.accessibility?.highContrast ?? false,
        reducedMotion: profile.accessibility?.reducedMotion ?? false,
      } 
    });
  };

  const availableLanguages = [
    ...config.recommended,
    ...config.common,
    ...config.fallback
  ].filter((v, i, a) => a.indexOf(v) === i);

  const handleKeepLanguage = () => {
    setShowRegionChangePrompt(false);
  };

  const handleSwitchLanguage = async () => {
    if (suggestedLanguage) {
      await setLanguage(suggestedLanguage);
    }
    setShowRegionChangePrompt(false);
  };

  return (
    <section className="w-full max-w-3xl mx-auto mb-8">
      <div className="flex items-center justify-between pb-2 mb-4 border-b-2 border-[#1a1c1c]">
        <h2 className="font-display-lg text-2xl font-black uppercase text-[#1a1c1c]">
          {t("profile.experience.title") || "Language & Regional Experience"}
        </h2>
        <span className="bg-[#ffe083] text-[#231b00] neo-border px-3 py-1 font-label-caps text-xs font-bold uppercase">
          Active: {LANGUAGES[language]?.name || language}
        </span>
      </div>

      <div className="bg-white neo-border neo-shadow p-6 sm:p-8 space-y-6">
        
        {/* Language Selection Grid */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Globe className="w-5 h-5 text-[#2563eb] stroke-[2.5]" />
            <h3 className="font-display-lg text-xl font-black uppercase text-[#1a1c1c]">
              {t("profile.experience.language") || "Language Selection"}
            </h3>
          </div>
          <p className="font-body-md text-sm text-[#434655] mb-4">
            {t("profile.experience.chooseLanguage") || "Choose the primary language for stories, activities, and voice interactions."}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {availableLanguages.map(langCode => {
              const lang = LANGUAGES[langCode];
              if (!lang) return null;
              const isSelected = language === langCode;
              const isRecommended = config.recommended.includes(langCode);
              
              return (
                <button
                  key={langCode}
                  onClick={() => setLanguage(langCode)}
                  className={`flex flex-col justify-between p-4 neo-border text-left transition-all cursor-pointer ${
                    isSelected 
                      ? "bg-[#2563eb] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] translate-x-[1px] translate-y-[1px]" 
                      : "bg-[#f9f9f8] text-[#1a1c1c] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffe083] hover:translate-x-[1px] hover:translate-y-[1px]"
                  }`}
                >
                  <div className="flex items-center justify-between w-full mb-1">
                    <span className="font-display-lg text-lg font-black uppercase">
                      {lang.nativeName}
                    </span>
                    {isSelected && (
                      <div className="w-6 h-6 bg-white text-[#2563eb] neo-border flex items-center justify-center">
                        <Check size={16} strokeWidth={3} />
                      </div>
                    )}
                  </div>

                  <span className={`font-label-caps text-xs ${isSelected ? "text-white/80" : "text-[#434655]"}`}>
                    {lang.name}
                  </span>

                  {isRecommended && (
                    <span className={`font-label-caps text-[10px] font-bold uppercase mt-2 px-1.5 py-0.5 neo-border inline-block self-start ${
                      isSelected ? "bg-[#ffe083] text-[#231b00]" : "bg-[#dbe1ff] text-[#00174b]"
                    }`}>
                      Recommended
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Region & Cultural Theme */}
        <div className="pt-6 border-t-2 border-[#1a1c1c]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-5 h-5 text-[#ba1a1a] stroke-[2.5]" />
                <h3 className="font-display-lg text-lg font-black uppercase text-[#1a1c1c]">
                  {t("profile.experience.region") || "Region & Cultural Theme"}
                </h3>
              </div>
              <p className="font-body-md text-xs sm:text-sm text-[#434655]">
                {t("profile.experience.regionDesc") || "Adapts cultural games, recipes, and traditional art styles"}
              </p>
            </div>

            <select 
              value={profile.region || "assam"}
              onChange={(e) => updateRegion(e.target.value)}
              className="h-12 px-4 bg-white neo-border-2 font-display-lg text-sm uppercase font-bold text-[#1a1c1c] focus:outline-none focus:border-[#2563eb] cursor-pointer"
            >
              {REGIONS.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Voice Guidance Toggle */}
        <div className="pt-6 border-t-2 border-[#1a1c1c]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Volume2 className="w-5 h-5 text-[#006e2f] stroke-[2.5]" />
                <h3 className="font-display-lg text-lg font-black uppercase text-[#1a1c1c]">
                  {t("profile.experience.voiceGuidance") || "Spoken Voice Guidance"}
                </h3>
              </div>
              <p className="font-body-md text-xs sm:text-sm text-[#434655]">
                {t("profile.experience.voiceGuidanceDesc") || "Reads instructions and stories aloud automatically"}
              </p>
            </div>

            <button
              onClick={() => updateVoiceGuidance(!(profile.accessibility?.voiceGuidance ?? true))}
              className={`px-5 py-2 neo-border font-headline-lg text-xs uppercase font-black tracking-wider transition-all cursor-pointer ${
                (profile.accessibility?.voiceGuidance ?? true)
                  ? "bg-[#6bff8f] text-[#002109] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  : "bg-[#ffdad6] text-[#ba1a1a] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              }`}
            >
              {(profile.accessibility?.voiceGuidance ?? true) ? "Enabled" : "Disabled"}
            </button>
          </div>
        </div>
        
      </div>
    </section>
  );
}
