"use client";

import { useState } from "react";

const CATEGORIES = ["All", "Remember", "Family", "Stories", "Notice", "Listen & Talk"];

export function ActivityCategories() {
  const [active, setActive] = useState("All");

  return (
    <section className="w-full mb-8">
      <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide">
        {CATEGORIES.map((category) => {
          const isActive = active === category;
          return (
            <button
              key={category}
              onClick={() => setActive(category)}
              className={`whitespace-nowrap px-5 py-2 font-label-caps text-xs uppercase font-bold transition-all shrink-0 cursor-pointer neo-border-2 ${
                isActive
                  ? 'bg-[#1a1c1c] text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'
                  : 'bg-white text-[#1a1c1c] hover:bg-[#f4f4f3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px]'
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </section>
  );
}
