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
    <div className="hidden lg:flex w-1/2 bg-smriti-bg flex-col justify-between p-12 relative overflow-hidden border-r border-smriti-border/30">
      {/* Decorative Cultural Pattern Background */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'80\' height=\'80\' viewBox=\'0 0 80 80\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M40 0L80 40L40 80L0 40L40 0ZM40 20L60 40L40 60L20 40L40 20Z\' fill=\'%238B2F2F\' fill-opacity=\'1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")' }}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-smriti-surface/30 to-smriti-surface/80 pointer-events-none"></div>

      {/* Brand Header */}
      <motion.div 
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <Link href="/" className="flex items-center gap-2 mb-10 inline-flex">
          <div className="w-10 h-10 rounded-xl bg-smriti-primary flex items-center justify-center text-white shadow-md">
            <Leaf className="w-6 h-6" />
          </div>
          <span className="text-3xl font-extrabold text-smriti-text tracking-tight">
            SMRITI
          </span>
        </Link>

        <div>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            className="text-smriti-primary font-bold tracking-wide uppercase text-sm mb-4 flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" /> AI-Powered Cognitive & Memory Companion
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            className="text-4xl md:text-5xl font-extrabold text-smriti-text leading-tight mb-6"
          >
            Technology that <br /><span className="text-smriti-primary">feels familiar.</span>
          </motion.h1>
          
          <div className="h-24">
            <AnimatePresence mode="wait">
              <motion.p 
                key={msgIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.5 }}
                className="text-xl text-smriti-muted leading-relaxed max-w-md"
              >
                {CULTURAL_MESSAGES[msgIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Center Organic Illustration Concept (Calm Memory Book style) */}
      <div className="relative z-10 flex-grow flex items-center justify-center my-12">
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative w-full max-w-[400px] aspect-square"
        >
          {/* Subtle spinning aura */}
          <motion.div 
             animate={{ rotate: 360 }} 
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="absolute -inset-4 border border-smriti-primary/10 rounded-[3.5rem] border-dashed"
          />
          <div className="absolute inset-0 bg-[#FAF6F0] rounded-[3rem] shadow-sm border border-[#E8E2D5] flex flex-col items-center justify-center p-8 text-center overflow-hidden">
            <div className="relative z-10 w-full flex flex-col items-center gap-6">
              {/* Family Photo Card Concept */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                whileHover={{ y: -5 }}
                className="w-full bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 cursor-pointer"
              >
                <div className="w-14 h-14 bg-smriti-bg rounded-full flex items-center justify-center shrink-0 border border-smriti-primary/10">
                  <Heart className="w-6 h-6 text-smriti-primary" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-smriti-text">Family Memory</p>
                  <p className="text-xs text-smriti-muted">A beautiful day to connect.</p>
                </div>
              </motion.div>

              {/* Voice Interaction Concept */}
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                whileHover={{ y: -5 }}
                className="w-full bg-smriti-primary text-white p-4 rounded-2xl shadow-sm flex items-center gap-4 cursor-pointer"
              >
                <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center shrink-0 relative">
                  <motion.div 
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="absolute inset-0 bg-white rounded-full"
                  />
                  <Mic className="w-6 h-6 relative z-10" />
                </div>
                <div className="text-left flex-grow">
                  <p className="text-sm font-bold opacity-90">"Tell me a story..."</p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer text in visual panel */}
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        className="relative z-10"
      >
        <p className="text-sm font-bold text-smriti-primary/80 uppercase tracking-widest">
          Designed for elderly users • Built for families
        </p>
      </motion.div>
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
    <div className={`min-h-screen flex ${reverse ? 'flex-row-reverse' : 'flex-row'} bg-white font-sans selection:bg-smriti-primary/20`}>
      <AuthBrandPanel />

      {/* Right Form Container */}
      <div className="w-full lg:w-1/2 flex flex-col relative overflow-y-auto">

        {/* Mobile Header (Hidden on Desktop) */}
        <div className="lg:hidden p-6 border-b border-gray-100 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-smriti-primary flex items-center justify-center text-white">
              <Leaf className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-smriti-text tracking-tight">
              SMRITI
            </span>
          </Link>
        </div>

        <div className="flex-grow flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            className="w-full max-w-[440px]"
          >
            {children}
          </motion.div>
        </div>

        {/* Auth Footer */}
        <div className="p-6 text-center text-sm text-smriti-muted/70">
          <p className="mb-2">© {new Date().getFullYear()} Smriti. All rights reserved.</p>
          <div className="flex items-center justify-center gap-4 mb-4">
            <Link href="#" className="hover:text-smriti-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-smriti-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-smriti-primary transition-colors">Help</Link>
          </div>
          <p className="text-xs max-w-xs mx-auto">
            Smriti is a cognitive assistance platform, not a medical diagnostic tool.
          </p>
        </div>

      </div>
    </div>
  );
}
