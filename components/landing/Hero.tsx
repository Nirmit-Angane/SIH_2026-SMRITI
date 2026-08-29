"use client";

import Link from "next/link";
import { Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden bg-[#f9f9f8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left: Text Content */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <h1 className="font-display-lg text-4xl sm:text-5xl lg:text-[4rem] text-[#1a1c1c] leading-[1.05] font-black uppercase tracking-tight">
              Culturally Adaptive AI
            </h1>
            
            <p className="font-body-lg text-lg sm:text-xl text-[#434655] leading-relaxed">
              Smriti learns your family&apos;s heritage, stories, and nuances to provide contextual, meaningful cognitive interactions.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <Link 
                href="/signup" 
                className="bg-[#ffe083] text-[#231b00] neo-border neo-shadow neo-shadow-hover neo-shadow-active font-label-bold text-base uppercase px-8 py-4 transition-all text-center"
              >
                Start Now
              </Link>
              <Link 
                href="/dashboard" 
                className="bg-white text-[#1a1c1c] neo-border neo-shadow neo-shadow-hover neo-shadow-active font-label-bold text-base uppercase px-8 py-4 transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-5 h-5 fill-current" />
                Demo
              </Link>
            </div>
          </div>
          
          {/* Right: Neobrutalist Visual Frame */}
          <div className="lg:col-span-6 w-full h-[340px] sm:h-[400px] lg:h-[420px] neo-border neo-shadow bg-[#6bff8f] relative overflow-hidden flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src="https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=1000&auto=format&fit=crop" 
              alt="Elder and family sharing a warm moment"
              className="object-cover w-full h-full absolute inset-0 mix-blend-multiply opacity-80 filter grayscale hover:grayscale-0 transition-all duration-700" 
            />
            <div className="relative z-10 font-display-lg text-2xl sm:text-3xl text-white mix-blend-difference uppercase bg-[#006e2f] px-6 py-2.5 neo-border rotate-[-5deg] tracking-wide">
              Meet Smriti
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
