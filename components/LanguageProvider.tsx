"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { locales } from "@/lib/i18n/locales";
import { LANGUAGES, LanguageMetadata } from "@/lib/i18n/config";

interface LanguageContextType {
  language: string;
  setLanguage: (code: string) => Promise<void>;
  t: (key: string, params?: Record<string, string>) => string;
  metadata: LanguageMetadata;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getNestedValue(obj: any, path: string): string | undefined {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { profile, updateProfile } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState<string>("en");

  // Load initial language from localStorage or default to en
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("smriti_language");
      if (saved) {
        setCurrentLanguage(saved);
      }
    }
  }, []);

  // Sync with profile language if available
  useEffect(() => {
    if (profile?.language) {
      let code = profile.language.toLowerCase().trim();
      const nameMap: Record<string, string> = {
        english: "en",
        hindi: "hi",
        assamese: "as",
        bengali: "bn",
        manipuri: "mni",
        meitei: "mni",
        khasi: "kha",
        mizo: "lus",
        nagamese: "nag",
        nepali: "ne",
        kokborok: "kok",
        garo: "garo",
        adi: "adi",
        nyishi: "njo",
        sikkimese: "sip",
        lepcha: "lep"
      };
      
      const normalizedCode = nameMap[code] || code;
      
      setCurrentLanguage(normalizedCode);
      if (typeof window !== "undefined") {
        localStorage.setItem("smriti_language", normalizedCode);
      }
    }
  }, [profile?.language]);

  const setLanguage = async (code: string) => {
    setCurrentLanguage(code);
    if (typeof window !== "undefined") {
      localStorage.setItem("smriti_language", code);
    }
    if (profile) {
      try {
        await updateProfile({ language: code });
      } catch (e) {
        console.warn("Profile update language notice:", e);
      }
    }
  };

  const t = useMemo(() => {
    const metadata = LANGUAGES[currentLanguage] || LANGUAGES.en;
    const dictionary = (metadata.supported && locales[currentLanguage]) ? locales[currentLanguage] : locales.en;

    return (key: string, params?: Record<string, string>): string => {
      let text = getNestedValue(dictionary, key);
      
      if (!text && currentLanguage !== "en") {
        text = getNestedValue(locales.en, key);
      }

      if (!text) {
        return key;
      }

      if (params) {
        return Object.entries(params).reduce(
          (acc, [k, v]) => acc.replace(new RegExp(`{{${k}}}`, 'g'), v),
          text
        );
      }
      return text;
    };
  }, [currentLanguage]);

  const metadata = LANGUAGES[currentLanguage] || LANGUAGES.en;

  return (
    <LanguageContext.Provider value={{ language: currentLanguage, setLanguage, t, metadata }}>
      <div dir={metadata.direction} className="w-full h-full min-h-screen">
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
