"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";

export function ActivityFocusLayout({ children, title }: { children: React.ReactNode, title: string }) {
  return (
    <div className="min-h-screen bg-smriti-bg flex flex-col font-sans selection:bg-smriti-primary/20 relative overflow-hidden">
      
      {/* Immersive regional background pattern layer for Focus Mode (stronger opacity than Dashboard) */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.05] z-0 bg-[url('/patterns/regional-base.png')] bg-repeat mix-blend-multiply"></div>

      {/* Focus Mode Header (minimal) */}
      <header className="relative z-50 flex items-center justify-between p-6 md:p-8">
        <h1 className="text-2xl font-bold text-smriti-primary uppercase tracking-widest">{title}</h1>
        
        <Link 
          href="/activities"
          className="flex items-center gap-2 bg-smriti-surface border-2 border-smriti-border px-6 py-3 rounded-full hover:border-smriti-primary/50 transition-colors touch-target group"
        >
          <span className="text-lg font-bold text-smriti-text">Exit</span>
          <X className="w-6 h-6 text-smriti-muted group-hover:text-smriti-primary transition-colors" />
        </Link>
      </header>

      {/* Focused Content Area */}
      <main className="flex-grow relative z-10 w-full flex flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-4xl"
        >
          {children}
        </motion.div>
      </main>

    </div>
  );
}
