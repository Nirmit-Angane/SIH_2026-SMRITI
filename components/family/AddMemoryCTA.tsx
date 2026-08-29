"use client";

import { Plus, Sparkles } from "lucide-react";

interface AddMemoryCTAProps {
  onAddClick: () => void;
}

export function AddMemoryCTA({ onAddClick }: AddMemoryCTAProps) {
  return (
    <section className="w-full mb-16">
      <button 
        onClick={onAddClick}
        className="w-full flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#ffe083] neo-border neo-shadow neo-shadow-hover neo-shadow-active text-[#231b00] p-6 sm:p-8 transition-all text-left"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-white neo-border flex items-center justify-center shrink-0">
            <Sparkles className="w-7 h-7 text-[#735c00]" />
          </div>
          <div>
            <h3 className="font-display-lg text-2xl font-black uppercase text-[#231b00]">
              Add New Memory
            </h3>
            <p className="font-body-md text-sm sm:text-base text-[#4e3d00]">
              Upload a photograph, tag the location, and preserve a timeless family story.
            </p>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 bg-[#2563eb] text-white px-6 py-3.5 neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-label-caps uppercase text-sm font-bold shrink-0">
          <Plus className="w-4 h-4" />
          <span>Upload Memory</span>
        </span>
      </button>
    </section>
  );
}
