"use client";

import { Play } from "lucide-react";
import Link from "next/link";
import { ACTIVITIES } from "@/lib/activities";
import { useLanguage } from "@/components/LanguageProvider";

export function TodaysGentleMoment() {
  const recommended = ACTIVITIES[0];
  const { t } = useLanguage();

  return (
    <section className="w-full mb-12">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-headline-lg text-2xl sm:text-3xl font-black text-[#1a1c1c] uppercase border-b-[4px] border-[#1a1c1c] pb-1 inline-block">
          Today&apos;s Activity
        </h2>
      </div>

      <div className="bg-[#dbe1ff] neo-border neo-shadow flex flex-col md:flex-row overflow-hidden transition-all hover:translate-x-[2px] hover:translate-y-[2px]">
        {/* Left: Content */}
        <div className="p-6 sm:p-8 md:p-10 flex flex-col items-start justify-center flex-1">
          <div className="bg-[#00FF41] neo-border px-3.5 py-1 font-label-caps text-xs text-[#000000] font-bold uppercase mb-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Cognitive Exercise
          </div>

          <h3 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl font-black text-[#1a1c1c] uppercase mb-3 tracking-tight">
            {t(`activities.${recommended.id}.title`) || recommended.title}
          </h3>

          <p className="font-body-lg text-base sm:text-lg text-[#00174b] max-w-xl mb-8 font-medium">
            {t(`activities.${recommended.id}.desc`) || recommended.desc}
          </p>

          <Link
            href={recommended.href}
            className="bg-[#2563eb] text-white neo-border neo-shadow neo-shadow-hover neo-shadow-active px-8 py-4 font-headline-lg text-xl sm:text-2xl font-black uppercase tracking-wider inline-flex items-center gap-3 transition-all"
          >
            <span>Start Game</span>
            <Play className="w-6 h-6 fill-current" />
          </Link>
        </div>

        {/* Right: Retro Graphic Frame matching elder_dashboard reference */}
        <div className="bg-[#FFD700] md:w-2/5 p-6 flex items-center justify-center border-t-[4px] md:border-t-0 md:border-l-[4px] border-[#1a1c1c]">
          <div className="w-full max-w-[260px] aspect-square bg-white neo-border neo-shadow p-3 rotate-[-3deg] hover:rotate-0 transition-transform duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop" 
              alt="Memory activity preview"
              className="w-full h-full object-cover neo-border-2"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
