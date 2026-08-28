"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

export function PreferencesSection() {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-8"
    >
      <h3 className="text-lg font-bold text-smriti-text uppercase tracking-widest mb-4 px-2">
        My preferences
      </h3>
      
      <div className="bg-smriti-surface border border-smriti-border rounded-[24px] overflow-hidden">
        <button className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-smriti-primary/5 transition-colors touch-target border-b border-smriti-border/50 group">
          <span className="text-xl font-bold text-smriti-text">Language</span>
          <div className="flex items-center gap-2 text-smriti-muted group-hover:text-smriti-primary transition-colors">
            <span className="text-lg font-medium">English</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>
        
        <button className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-smriti-primary/5 transition-colors touch-target border-b border-smriti-border/50 group">
          <span className="text-xl font-bold text-smriti-text">Region</span>
          <div className="flex items-center gap-2 text-smriti-muted group-hover:text-smriti-primary transition-colors">
            <span className="text-lg font-medium">Assam</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>

        <button className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-smriti-primary/5 transition-colors touch-target group">
          <span className="text-xl font-bold text-smriti-text">Text size</span>
          <div className="flex items-center gap-2 text-smriti-muted group-hover:text-smriti-primary transition-colors">
            <span className="text-lg font-medium">Large</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </button>
      </div>
    </motion.section>
  );
}
