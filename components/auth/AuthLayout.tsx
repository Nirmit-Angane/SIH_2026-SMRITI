"use client";

import { Leaf, Heart, Mic, Sparkles } from "lucide-react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CULTURAL_MESSAGES = [
  "Personalized memory activities, family connections, and gentle daily assistance—all in one place.",
  "Designed specifically to support the diverse communities of the North East.",
  "A calm, familiar space to reflect, engage, and connect with loved ones.",
  "Your personal companion for cognitive wellness and gentle moments."
];

export function AuthBrandPanel() {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % CULTURAL_MESSAGES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex w-1/2 bg-[#f9f9f8] flex-col justify-between p-12 relative overflow-hidden border-r-[4px] border-[#1a1c1c]">
      
      {/* Brand Header */}
      <div className="relative z-10">
        <Link href="/" className="flex items-center gap-3 mb-8 inline-flex group">
          <div className="w-12 h-12 bg-[#2563eb] neo-border flex items-center justify-center text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] group-hover:translate-x-[1px] group-hover:translate-y-[1px] transition-transform">
            <Leaf className="w-7 h-7 stroke-[2.5]" />
          </div>
          <span className="font-display-lg text-4xl font-black uppercase text-[#1a1c1c] tracking-tight">
            SMRITI
          </span>
        </Link>

        <div>
          <div className="inline-block bg-[#ffe083] neo-border px-3 py-1 font-label-caps text-xs font-bold uppercase text-[#231b00] mb-4">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#735c00]" /> Cognitive Memory Companion
            </span>
          </div>

          <h1 className="font-display-lg text-4xl md:text-5xl font-black uppercase text-[#1a1c1c] leading-[1.05] tracking-tight mb-4">
            Technology that <br /><span className="text-[#2563eb] bg-[#dbe1ff] px-2 border-2 border-[#1a1c1c] inline-block mt-1">feels familiar.</span>
          </h1>
          
          <div className="h-20">
            <AnimatePresence mode="wait">
              <motion.p 
                key={msgIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.4 }}
                className="font-body-lg text-lg text-[#434655] leading-snug max-w-md"
              >
                {CULTURAL_MESSAGES[msgIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Center Neobrutalist Visual Card */}
      <div className="relative z-10 flex-grow flex items-center justify-center my-6">
        <div className="w-full max-w-[380px] bg-[#ffe083] neo-border neo-shadow p-6 flex flex-col gap-4">
          
          <div className="flex items-center justify-between pb-3 border-b-2 border-[#1a1c1c]">
            <span className="font-label-caps text-xs font-bold uppercase text-[#231b00]">Daily Companion</span>
            <span className="w-3 h-3 bg-[#00FF41] rounded-full border border-black"></span>
          </div>

          {/* Family Memory Card */}
          <div className="w-full bg-white neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-[#ffdad6] neo-border flex items-center justify-center shrink-0 text-[#ba1a1a]">
              <Heart className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="text-left">
              <p className="font-headline-lg text-base font-black uppercase text-[#1a1c1c]">Family Memory</p>
              <p className="font-body-md text-xs text-[#434655] font-semibold">A beautiful day to connect.</p>
            </div>
          </div>

          {/* Voice Interaction Card with High Contrast */}
          <div className="w-full bg-[#2563eb] text-white neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-white text-[#2563eb] neo-border flex items-center justify-center shrink-0">
              <Mic className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div className="text-left flex-grow">
              <p className="font-headline-lg text-base font-black uppercase text-white tracking-wide">"Tell me a story..."</p>
              <p className="font-body-md text-xs text-white/90 font-semibold">Live Voice AI</p>
            </div>
          </div>

        </div>
      </div>

      {/* Footer text in visual panel */}
      <div className="relative z-10 pt-4 border-t-2 border-[#1a1c1c]">
        <p className="font-label-caps text-xs font-bold text-[#1a1c1c] uppercase tracking-wider">
          Designed for elderly users • Built for families
        </p>
      </div>
    </div>
  );
}

export default function AuthLayout({ 
  children, 
  reverse = false 
}: { 
  children: React.ReactNode,
  reverse?: boolean
}) {
  return (
    <div className={`min-h-screen flex ${reverse ? 'flex-row-reverse' : 'flex-row'} bg-[#f9f9f8]`}>
      <AuthBrandPanel />

      {/* Right Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto min-h-screen bg-[#f9f9f8]">

        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden p-6 border-b-[4px] border-[#1a1c1c] bg-white flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#2563eb] neo-border flex items-center justify-center text-white">
              <Leaf className="w-5 h-5 stroke-[2.5]" />
            </div>
            <span className="font-display-lg text-2xl font-black uppercase text-[#1a1c1c] tracking-tight">
              SMRITI
            </span>
          </Link>
        </div>

        <div className="flex-grow flex items-center justify-center p-6 sm:p-12 md:p-16 relative z-10">
          <div className="w-full max-w-[460px]">
            {children}
          </div>
        </div>

        {/* Auth Footer */}
        <div className="p-6 text-center border-t-2 border-[#1a1c1c] bg-white text-xs font-bold text-[#434655]">
          <p className="mb-2 font-label-caps uppercase">© {new Date().getFullYear()} Smriti. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 mb-2 font-label-caps uppercase text-xs">
            <Link href="#" className="hover:text-[#2563eb] underline">Privacy</Link>
            <Link href="#" className="hover:text-[#2563eb] underline">Terms</Link>
            <Link href="#" className="hover:text-[#2563eb] underline">Help</Link>
          </div>
          <p className="text-[11px] text-[#434655]/80 max-w-xs mx-auto">
            Smriti is a cognitive assistance platform, not a medical diagnostic tool.
          </p>
        </div>

      </div>
    </div>
  );
}
