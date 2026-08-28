"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import { useState } from "react";

export function AccessibilitySection() {
  const [largeText, setLargeText] = useState(true);
  const [highContrast, setHighContrast] = useState(false);
  const [voiceGuidance, setVoiceGuidance] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  const Toggle = ({ label, checked, onChange }: { label: string, checked: boolean, onChange: () => void }) => (
    <button 
      onClick={onChange}
      className="w-full flex items-center justify-between p-5 md:p-6 hover:bg-smriti-primary/5 transition-colors touch-target border-b border-smriti-border/50 last:border-0 group"
    >
      <span className="text-xl font-bold text-smriti-text">{label}</span>
      <div className="flex items-center gap-2">
        {checked ? (
          <Check className="w-7 h-7 text-smriti-primary" strokeWidth={3} />
        ) : (
          <Circle className="w-7 h-7 text-smriti-border group-hover:text-smriti-primary/50 transition-colors" />
        )}
      </div>
    </button>
  );

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-8"
    >
      <h3 className="text-lg font-bold text-smriti-text uppercase tracking-widest mb-4 px-2">
        Accessibility
      </h3>
      
      <div className="bg-smriti-surface border border-smriti-border rounded-[24px] overflow-hidden">
        <Toggle label="Large text" checked={largeText} onChange={() => setLargeText(!largeText)} />
        <Toggle label="High contrast" checked={highContrast} onChange={() => setHighContrast(!highContrast)} />
        <Toggle label="Voice guidance" checked={voiceGuidance} onChange={() => setVoiceGuidance(!voiceGuidance)} />
        <Toggle label="Reduced motion" checked={reducedMotion} onChange={() => setReducedMotion(!reducedMotion)} />
      </div>
    </motion.section>
  );
}
