"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { ACTIVITIES } from "@/lib/activities";

export function RecommendedActivity() {
  // Currently defaulting to Family Recognition as recommended in the PRD
  const recommended = ACTIVITIES[0];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 mb-10"
    >
      <div className="bg-smriti-surface border-2 border-smriti-primary/20 rounded-[28px] p-8 md:p-10 relative overflow-hidden group shadow-sm">
        
        {/* Subtle decorative breathing pattern using regional primary color */}
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-20 -top-20 w-64 h-64 bg-smriti-primary/10 rounded-full blur-3xl"
        />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-smriti-primary" />
              <h2 className="text-sm md:text-base font-bold text-smriti-primary uppercase tracking-widest">
                Today's Gentle Activity
              </h2>
            </div>
            <h3 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-3 leading-tight">
              {recommended.title}
            </h3>
            <p className="text-lg md:text-xl text-smriti-text/80 mb-2">
              Let's spend a moment with familiar faces.
            </p>
          </div>
          
          <Link 
            href={recommended.href}
            className="inline-flex items-center justify-center gap-3 bg-smriti-primary text-white px-8 py-5 rounded-2xl font-bold text-xl hover:bg-smriti-primary/90 active:scale-[0.98] transition-all shadow-lg shadow-smriti-primary/20 touch-target shrink-0"
          >
            Start Activity
            <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </div>
    </motion.section>
  );
}
