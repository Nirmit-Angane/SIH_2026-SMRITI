"use client";

import { motion } from "framer-motion";
import { LogOut, Users, Lock, ChevronRight } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

export function AccountSection() {
  const { logout } = useAuth();

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-16"
    >
      <h3 className="text-lg font-bold text-smriti-text uppercase tracking-widest mb-4 px-2">
        Account & Family
      </h3>
      
      <div className="bg-smriti-surface border border-smriti-border rounded-[24px] overflow-hidden mb-6">
        <button className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-smriti-primary/5 transition-colors touch-target border-b border-smriti-border/50 group">
          <div className="flex items-center gap-4">
            <Users className="w-6 h-6 text-smriti-muted group-hover:text-smriti-primary" />
            <span className="text-xl font-bold text-smriti-text">Connected family</span>
          </div>
          <div className="flex items-center gap-2 text-smriti-muted">
            <span className="text-lg font-bold text-smriti-primary">2</span>
            <ChevronRight className="w-5 h-5 group-hover:text-smriti-primary transition-colors" />
          </div>
        </button>

        <button className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-smriti-primary/5 transition-colors touch-target group">
          <div className="flex items-center gap-4">
            <Lock className="w-6 h-6 text-smriti-muted group-hover:text-smriti-primary" />
            <span className="text-xl font-bold text-smriti-text">Privacy settings</span>
          </div>
          <ChevronRight className="w-5 h-5 text-smriti-muted group-hover:text-smriti-primary transition-colors" />
        </button>
      </div>

      <button 
        onClick={() => logout()}
        className="w-full flex items-center justify-center gap-3 p-5 rounded-[24px] text-red-600 font-bold text-lg hover:bg-red-50 transition-colors border-2 border-transparent hover:border-red-100 touch-target"
      >
        <LogOut className="w-5 h-5" />
        Sign out
      </button>
    </motion.section>
  );
}
