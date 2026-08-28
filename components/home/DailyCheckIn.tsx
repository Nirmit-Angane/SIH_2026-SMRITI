"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const MOODS = [
  { id: "good", emoji: "😊", label: "Good" },
  { id: "okay", emoji: "🙂", label: "Okay" },
  { id: "calm", emoji: "😌", label: "Calm" },
  { id: "quiet", emoji: "😐", label: "Quiet" },
];

export function DailyCheckIn() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-12"
    >
      <h3 className="text-xl font-bold text-smriti-text mb-4 text-center md:text-left">
        How are you feeling today?
      </h3>
      
      <div className="flex flex-wrap gap-3 md:gap-4 justify-center md:justify-start">
        {MOODS.map((mood) => {
          const isSelected = selected === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => setSelected(mood.id)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all duration-300 touch-target
                ${isSelected 
                  ? 'bg-smriti-primary text-white shadow-md' 
                  : 'bg-smriti-surface border border-smriti-border hover:bg-smriti-primary/5 text-smriti-text'
                }`}
            >
              <span className="text-2xl">{mood.emoji}</span>
              <span className="font-bold text-lg">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </motion.section>
  );
}
