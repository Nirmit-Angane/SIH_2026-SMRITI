"use client";

import Link from "next/link";
import { ACTIVITIES } from "@/lib/activities";
import { useLanguage } from "@/components/LanguageProvider";

export function RecommendedActivityHero() {
  const recommended = ACTIVITIES[0];
  const { t } = useLanguage();

  return (
    <section className="w-full mb-12">
      <h2 className="font-display-lg text-2xl sm:text-3xl font-black text-[#1a1c1c] mb-6 uppercase border-b-[4px] border-[#1a1c1c] pb-2 inline-block tracking-tight">
        Recommended Activity
      </h2>

      <div className="bg-[#dbe1ff] border-[4px] border-[#1a1c1c] neo-shadow flex flex-col md:flex-row overflow-hidden">
        
        {/* Left 50% Details */}
        <div className="md:w-1/2 p-6 sm:p-8 lg:p-12 flex flex-col justify-center border-b-[4px] md:border-b-0 md:border-r-[4px] border-[#1a1c1c]">
          <span className="inline-block bg-[#00FF41] border-[4px] border-[#1a1c1c] px-4 py-1 font-label-caps text-xs font-bold uppercase mb-4 self-start shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-[#000000]">
            Cognitive Exercise
          </span>

          <h3 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl mb-4 text-[#1a1c1c] font-black uppercase tracking-tight">
            {t(`activities.${recommended.id}.title`) || recommended.title}
          </h3>

          <p className="font-body-lg text-base sm:text-lg mb-8 text-[#00174b] font-medium leading-relaxed">
            Connect with loved ones while keeping your mind sharp. A fun daily activity customized for you.
          </p>

          <Link
            href={recommended.href}
            className="bg-[#2563eb] text-white border-[4px] border-[#1a1c1c] px-8 py-4 font-display-lg text-xl sm:text-2xl uppercase font-black tracking-wider shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[4px] hover:translate-x-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[8px] active:translate-x-[8px] active:shadow-none transition-all text-center w-full md:w-auto self-start"
          >
            START GAME
          </Link>
        </div>

        {/* Right 50% Sun Yellow Frame */}
        <div className="md:w-1/2 bg-[#FFD700] relative min-h-[300px] sm:min-h-[360px] flex items-center justify-center p-6 sm:p-8">
          <div className="w-full max-w-[340px] aspect-[4/3] border-[4px] border-[#1a1c1c] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] bg-white p-3 rotate-[-2deg] hover:rotate-0 transition-transform duration-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop" 
              alt="Family memory moment" 
              className="w-full h-full object-cover border-[2px] border-[#1a1c1c]"
            />
          </div>
        </div>

      </div>
    </section>
  );
}
