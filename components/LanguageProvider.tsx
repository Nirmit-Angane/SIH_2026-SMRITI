"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import { locales, TranslationType } from "@/lib/i18n/locales";
import { LANGUAGES, LanguageMetadata } from "@/lib/i18n/config";

interface LanguageContextType {
  language: string;
  setLanguage: (code: string) => Promise<void>;
  t: (key: string, params?: Record<string, string>) => string;
  metadata: LanguageMetadata;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Helper to get nested value by dot notation
function getNestedValue(obj: any, path: string): string | undefined {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const { profile, updateProfile } = useAuth();
  const [currentLanguage, setCurrentLanguage] = useState("en");

  // Sync with profile language if available
  useEffect(() => {
    if (profile?.language) {
      // Handle legacy "English" / "Hindi" values
      if (profile.language === "English") setCurrentLanguage("en");
      else if (profile.language === "Hindi") setCurrentLanguage("hi");
      else setCurrentLanguage(profile.language);
    }
  }, [profile?.language]);

  const setLanguage = async (code: string) => {
    setCurrentLanguage(code);
    if (profile) {
      await updateProfile({ language: code });
    }
  };

  const t = useMemo(() => {
    // If language is not strictly supported yet (e.g. 'as'), fallback to english for the UI text,
    // but the system still knows the language preference is 'as'.
    const metadata = LANGUAGES[currentLanguage] || LANGUAGES.en;
    const dictionary = (metadata.supported && locales[currentLanguage]) ? locales[currentLanguage] : locales.en;

    return (key: string, params?: Record<string, string>): string => {
      let text = getNestedValue(dictionary, key);
      
      // Fallback to english if key is missing in the target language
      if (!text && currentLanguage !== "en") {
        text = getNestedValue(locales.en, key);
      }

      if (!text) {
        console.warn(`Translation key missing: ${key}`);
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
      {/* We set the dir attribute on a wrapper for RTL support if needed */}
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
