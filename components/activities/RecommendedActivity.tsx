"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { ACTIVITIES } from "@/lib/activities";

export function RecommendedActivity() {
  const recommended = ACTIVITIES[0];

  return (
    <section className="w-full mb-10">
      <div className="bg-[#2563eb] text-white neo-border neo-shadow p-6 sm:p-10 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-1.5 bg-[#ffe083] text-[#231b00] neo-border px-3 py-1 font-label-caps text-xs font-bold uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Today's Recommended Focus</span>
          </div>
          <h3 className="font-display-lg text-3xl sm:text-4xl font-black uppercase tracking-tight mb-2">
            {recommended.title}
          </h3>
          <p className="font-body-md text-base sm:text-lg text-white/90">
            Let's spend a gentle moment recognizing loved ones and familiar memories.
          </p>
        </div>
        
        <Link 
          href={recommended.href}
          className="inline-flex items-center justify-center gap-3 bg-[#ffe083] text-[#231b00] px-8 py-4 neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none font-headline-lg text-lg uppercase font-black tracking-wider transition-all shrink-0"
        >
          <span>Start Now</span>
          <ArrowRight className="w-5 h-5 stroke-[2.5]" />
        </Link>
      </div>
    </section>
  );
}
