"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { REGIONS } from "@/app/onboarding/page";
import { REGION_LANGUAGE_CONFIG, RegionId, LANGUAGES } from "@/lib/i18n/config";
import { useLanguage } from "@/components/LanguageProvider";
import { useState, useEffect } from "react";
import { Check } from "lucide-react";

export function ExperienceSettings() {
  const { profile, updateProfile } = useAuth();
  const { language, setLanguage, t, metadata: currentLangMeta } = useLanguage();
  
  // Track previous region to detect changes
  const [prevRegion, setPrevRegion] = useState<RegionId | null>(null);
  const [showRegionChangePrompt, setShowRegionChangePrompt] = useState(false);
  const [suggestedLanguage, setSuggestedLanguage] = useState<string | null>(null);
  
  useEffect(() => {
    if (profile?.region) {
      const current = profile.region as RegionId;
      if (prevRegion && prevRegion !== current) {
        // Region changed! Check for new recommended language
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

  // Combine recommended and fallback languages for the dropdown
  const availableLanguages = [
    ...config.recommended,
    ...config.common,
    ...config.fallback
  ].filter((v, i, a) => a.indexOf(v) === i); // Unique

  const handleKeepLanguage = () => {
    setShowRegionChangePrompt(false);
  };

  const handleSwitchLanguage = async () => {
    if (suggestedLanguage) {
      await setLanguage(suggestedLanguage);
    }
    setShowRegionChangePrompt(false);
  };

  const isReducedMotion = profile.accessibility?.reducedMotion;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-8"
    >
      <h2 className="text-xl font-bold text-smriti-text mb-4">{t("profile.experience.title") || "Experience"}</h2>
      <div className="bg-smriti-surface border border-smriti-border rounded-3xl overflow-hidden shadow-sm">
        
        {/* Region */}
        <div className="p-6 border-b border-smriti-border/50">
          <label className="flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group">
            <div>
              <span className="block font-bold text-lg text-smriti-text group-hover:text-smriti-primary transition-colors">{t("profile.experience.region") || "Region & Theme"}</span>
              <span className="block text-sm text-smriti-muted mt-1">{t("profile.experience.regionDesc") || "Changes colors and cultural patterns"}</span>
            </div>
            <select 
              value={profile.region || "assam"}
              onChange={(e) => updateRegion(e.target.value)}
              className="px-4 py-3 bg-smriti-bg border-2 border-smriti-border rounded-xl font-bold text-smriti-text focus:outline-none focus:border-smriti-primary touch-target cursor-pointer appearance-none min-w-[140px]"
            >
              {REGIONS.map(r => (
                <option key={r.id} value={r.id}>{r.label}</option>
              ))}
            </select>
          </label>
        </div>

        {/* Region Change Prompt */}
        <AnimatePresence>
          {showRegionChangePrompt && suggestedLanguage && (
            <motion.div 
              initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              animate={isReducedMotion ? { opacity: 1 } : { opacity: 1, height: "auto" }}
              exit={isReducedMotion ? { opacity: 0 } : { opacity: 0, height: 0 }}
              className="px-6 py-4 bg-smriti-primary/10 border-b border-smriti-border/50"
            >
              <p className="font-bold text-smriti-text mb-1">{t("profile.experience.regionChanged") || "Your region has changed."}</p>
              <p className="text-sm text-smriti-muted mb-4">
                {t("profile.experience.languagePrompt", { 
                  language: LANGUAGES[suggestedLanguage]?.name || suggestedLanguage, 
                  region: REGIONS.find(r => r.id === currentRegion)?.label || currentRegion 
                }) || `${LANGUAGES[suggestedLanguage]?.name} is commonly used in this region.`}
                <br/>
                {t("profile.experience.wouldYouLikeToSwitch", {
                  language: LANGUAGES[suggestedLanguage]?.name || suggestedLanguage
                }) || `Would you like to use ${LANGUAGES[suggestedLanguage]?.name}?`}
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleSwitchLanguage}
                  className="px-4 py-2 bg-smriti-primary text-white rounded-xl font-bold active:scale-95 transition-transform text-sm"
                >
                  {t("profile.experience.switchLanguage", { language: LANGUAGES[suggestedLanguage]?.name || suggestedLanguage }) || `Switch to ${LANGUAGES[suggestedLanguage]?.name}`}
                </button>
                <button 
                  onClick={handleKeepLanguage}
                  className="px-4 py-2 bg-transparent border-2 border-smriti-border text-smriti-text rounded-xl font-bold hover:bg-smriti-border/30 active:scale-95 transition-all text-sm"
                >
                  {t("profile.experience.keepLanguage", { language: LANGUAGES[language]?.name || language }) || `Keep ${LANGUAGES[language]?.name}`}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Language */}
        <div className="p-6 border-b border-smriti-border/50">
          <div className="flex flex-col gap-4">
            <div>
              <span className="block font-bold text-lg text-smriti-text">{t("profile.experience.language") || "Language"}</span>
              <span className="block text-sm text-smriti-muted mt-1">{t("profile.experience.chooseLanguage") || "Choose a language that feels comfortable."}</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
              {availableLanguages.map(langCode => {
                const lang = LANGUAGES[langCode];
                if (!lang) return null;
                const isSelected = language === langCode;
                const isRecommended = config.recommended.includes(langCode);
                
                return (
                  <button
                    key={langCode}
                    onClick={() => setLanguage(langCode)}
                    className={`flex flex-col items-start text-left p-4 rounded-xl border-2 transition-all min-h-[80px] touch-target relative ${
                      isSelected 
                        ? "border-smriti-primary bg-smriti-primary/5" 
                        : "border-smriti-border bg-smriti-bg hover:border-smriti-primary/50"
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className={`font-bold text-lg ${isSelected ? "text-smriti-primary" : "text-smriti-text"}`}>
                        {lang.nativeName}
                        {lang.nativeName !== lang.name && ` (${lang.name})`}
                      </span>
                      {isSelected && (
                        <motion.div 
                          initial={isReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-smriti-primary"
                        >
                          <Check size={20} strokeWidth={3} />
                        </motion.div>
                      )}
                    </div>
                    {isRecommended && (
                      <span className="text-xs font-bold text-smriti-primary/80 mt-1 uppercase tracking-wider">
                        {t("profile.experience.recommended") || "Recommended for your region"}
                      </span>
                    )}
                    {!lang.supported && langCode !== "en" && langCode !== "hi" && (
                      <span className="text-xs text-smriti-muted mt-1">
                        {t("common.comingSoon") || "Coming soon"}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Voice Guidance */}
        <div className="p-6">
          <label className="flex items-center justify-between cursor-pointer group">
            <div className="pr-4">
              <span className="block font-bold text-lg text-smriti-text group-hover:text-smriti-primary transition-colors">{t("profile.experience.voiceGuidance") || "Voice Guidance"}</span>
              <span className="block text-sm text-smriti-muted mt-1">{t("profile.experience.voiceGuidanceDesc") || "Spoken instructions in activities"}</span>
              
              {/* Show fallback message if voice is on but TTS is not supported for current language */}
              {profile.accessibility?.voiceGuidance !== false && !currentLangMeta.ttsSupported && (
                <span className="block text-sm font-bold text-smriti-primary mt-2">
                  {t("profile.experience.voiceNotAvailable", { fallback: LANGUAGES.hi.name }) || `Voice guidance is currently available in ${LANGUAGES.hi.name}.`}
                </span>
              )}
            </div>
            <div className="relative">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={profile.accessibility?.voiceGuidance ?? true}
                onChange={(e) => updateVoiceGuidance(e.target.checked)}
              />
              <div className="w-14 h-8 bg-smriti-border/50 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-smriti-success"></div>
            </div>
          </label>
        </div>
        
      </div>
    </motion.section>
  );
}
