"use client";

import { motion } from "framer-motion";
import { Plus } from "lucide-react";

interface AddMemoryCTAProps {
  onAddClick: () => void;
}

export function AddMemoryCTA({ onAddClick }: AddMemoryCTAProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 mb-16"
    >
      <button 
        onClick={onAddClick}
        className="w-full flex items-center justify-center gap-3 bg-smriti-primary/10 border-2 border-dashed border-smriti-primary/30 text-smriti-primary p-6 rounded-[24px] hover:bg-smriti-primary/15 transition-colors font-bold text-lg touch-target"
      >
        <Plus className="w-6 h-6" />
        Add a new memory
      </button>
    </motion.section>
  );
}
