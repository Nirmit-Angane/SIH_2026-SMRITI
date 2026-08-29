"use client";

import { Mic } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export function TalkToSmritiHome() {
  const { t } = useLanguage();

  return (
    <section className="w-full mb-12">
      <div className="bg-[#6bff8f] neo-border neo-shadow p-8 sm:p-10 text-center flex flex-col items-center justify-center transition-all hover:translate-x-[2px] hover:translate-y-[2px]">
        <h3 className="font-display-lg text-3xl sm:text-4xl font-black text-[#002109] uppercase mb-2">
          {t("home.talkToSmriti") || "Talk to SMRITI"}
        </h3>
        
        <p className="font-body-md text-base sm:text-lg text-[#002109] max-w-md mb-6 font-medium">
          {t("home.startTalking") || "You can speak naturally instead of typing."}
        </p>
        
        <Link 
          href="/voice"
          className="inline-flex items-center gap-3 px-8 py-4 bg-[#006e2f] text-white neo-border neo-shadow neo-shadow-hover neo-shadow-active font-headline-lg text-xl uppercase font-black tracking-wider transition-all"
        >
          <Mic className="w-6 h-6 stroke-[3]" />
          <span>{t("home.startTalking") || "Start Talking"}</span>
        </Link>
      </div>
    </section>
  );
}
