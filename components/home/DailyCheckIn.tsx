"use client";

import { useState } from "react";

const MOODS = [
  { id: "good", emoji: "😊", label: "Good", bg: "bg-[#6bff8f] text-[#002109]" },
  { id: "okay", emoji: "🙂", label: "Okay", bg: "bg-[#dbe1ff] text-[#00174b]" },
  { id: "calm", emoji: "😌", label: "Calm", bg: "bg-[#ffe083] text-[#231b00]" },
  { id: "quiet", emoji: "😐", label: "Quiet", bg: "bg-[#ffdad6] text-[#93000a]" },
];

export function DailyCheckIn() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="w-full mb-12">
      <h3 className="font-headline-lg text-2xl sm:text-3xl font-black text-[#1a1c1c] uppercase mb-4 border-b-[4px] border-[#1a1c1c] pb-1 inline-block">
        How are you feeling today?
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-2">
        {MOODS.map((mood) => {
          const isSelected = selected === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => setSelected(mood.id)}
              className={`flex items-center justify-center gap-3 p-4 neo-border ${
                isSelected 
                  ? `${mood.bg} translate-x-[4px] translate-y-[4px] shadow-none` 
                  : "bg-white text-[#1a1c1c] neo-shadow-sm neo-shadow-hover neo-shadow-active"
              } transition-all`}
            >
              <span className="text-3xl">{mood.emoji}</span>
              <span className="font-headline-lg text-lg uppercase font-black">{mood.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
