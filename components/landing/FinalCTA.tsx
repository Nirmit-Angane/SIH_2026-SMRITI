"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-16 md:py-24 bg-[#f9f9f8] px-4 sm:px-6 lg:px-8 border-t-[4px] border-[#1a1c1c]">
      <div className="max-w-6xl mx-auto bg-[#ffe083] neo-border neo-shadow p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#231b00] mb-4 uppercase tracking-tight leading-tight">
            Make Every Memory Feel Familiar.
          </h2>
          <p className="font-body-lg text-lg sm:text-xl md:text-2xl text-[#4e3d00] mb-8 leading-relaxed font-medium">
            A dignified, culturally rich way to support cognitive wellness, routine care, and enduring family connection.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              href="/signup" 
              className="inline-flex items-center justify-center gap-2 bg-[#2563eb] text-white neo-border neo-shadow neo-shadow-hover neo-shadow-active font-label-bold text-base uppercase px-10 py-5 transition-all"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              href="/dashboard" 
              className="inline-flex items-center justify-center gap-2 bg-white text-[#1a1c1c] neo-border neo-shadow neo-shadow-hover neo-shadow-active font-label-bold text-base uppercase px-10 py-5 transition-all"
            >
              Explore Demo
            </Link>
          </div>
          
          <p className="font-label-bold text-xs uppercase text-[#735c00] mt-8">
            Designed with love for elders and their families
          </p>
        </div>
      </div>
    </section>
  );
}
