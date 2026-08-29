"use client";

import { useAuth } from "@/hooks/useAuth";
import { useLanguage } from "@/components/LanguageProvider";

export function HomeGreeting() {
  const { profile } = useAuth();
  const { t } = useLanguage();
  const name = profile?.name || "Friend";

  return (
    <header className="w-full mb-8 text-left">
      <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-6xl text-[#1a1c1c] uppercase font-black tracking-tight mb-2">
        Good Morning, {name}!
      </h1>
      <p className="font-body-lg text-lg sm:text-xl text-[#434655]">
        Here is your daily care overview.
      </p>
    </header>
  );
}
