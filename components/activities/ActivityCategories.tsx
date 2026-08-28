"use client";

import { useState } from "react";

const CATEGORIES = ["All", "Remember", "Family", "Stories", "Notice", "Listen & Talk"];

export function ActivityCategories() {
  const [active, setActive] = useState("All");

  return (
    <section className="w-full max-w-4xl mx-auto px-4 mb-8">
      <div className="flex gap-2 md:gap-3 overflow-x-auto pb-4 scrollbar-hide snap-x">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => setActive(category)}
            className={`whitespace-nowrap px-6 py-2.5 rounded-full font-bold text-lg transition-all snap-start shrink-0 touch-target
              ${active === category 
                ? 'bg-smriti-text text-smriti-bg shadow-md scale-105' 
                : 'bg-smriti-surface border border-smriti-border text-smriti-muted hover:text-smriti-text hover:border-smriti-primary/30 hover:bg-smriti-primary/5'
              }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}
