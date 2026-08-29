"use client";

import { useState } from "react";
import { Pill, Droplets, Footprints, Check } from "lucide-react";

export function TodaysPlanGrid() {
  const [medicineDone, setMedicineDone] = useState(false);
  const [glasses, setGlasses] = useState(4);
  const maxGlasses = 6;
  const [walkDone, setWalkDone] = useState(false);

  const addGlass = () => {
    if (glasses < maxGlasses) {
      setGlasses(glasses + 1);
    }
  };

  return (
    <section className="w-full mb-12">
      <h2 className="font-display-lg text-2xl sm:text-3xl font-black text-[#1a1c1c] mb-6 uppercase border-b-[4px] border-[#1a1c1c] pb-2 inline-block tracking-tight">
        Today&apos;s Plan
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Card 1: Medicine Card */}
        <div className="bg-[#e2e2e2] border-[4px] border-[#1a1c1c] p-6 sm:p-8 neo-shadow flex flex-col items-start transition-all hover:translate-x-[2px] hover:translate-y-[2px] relative overflow-hidden group">
          <div className={`absolute top-0 right-0 px-3 py-1 border-b-[4px] border-l-[4px] border-[#1a1c1c] font-label-caps text-xs font-bold uppercase ${
            medicineDone ? "bg-[#00FF41] text-[#002109]" : "bg-[#00FF41] text-[#002109]"
          }`}>
            {medicineDone ? "Completed" : "8:00 AM"}
          </div>

          <div className="w-14 h-14 bg-white neo-border flex items-center justify-center mb-4 text-[#004ac6] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Pill className="w-8 h-8 stroke-[2.5]" />
          </div>

          <h3 className="font-display-lg text-2xl font-black uppercase text-[#1a1c1c] mb-2">
            Morning Medicine
          </h3>
          <p className="font-body-md text-sm sm:text-base text-[#434655] mb-6">
            Take with breakfast & warm water.
          </p>

          <button 
            type="button"
            onClick={() => setMedicineDone(!medicineDone)}
            className={`mt-auto w-full py-3 neo-border font-label-caps text-xs sm:text-sm font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
              medicineDone 
                ? "bg-[#6bff8f] text-[#002109] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" 
                : "bg-[#004ac6] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none"
            }`}
          >
            {medicineDone ? (
              <>
                <Check className="w-4 h-4 stroke-[3]" />
                <span>Taken ✓</span>
              </>
            ) : (
              <span>Mark Done</span>
            )}
          </button>
        </div>

        {/* Card 2: Hydration Card */}
        <div className="bg-[#e2e2e2] border-[4px] border-[#1a1c1c] p-6 sm:p-8 neo-shadow flex flex-col items-start transition-all hover:translate-x-[2px] hover:translate-y-[2px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-[#FFD700] px-3 py-1 border-b-[4px] border-l-[4px] border-[#1a1c1c] font-label-caps text-xs font-bold uppercase text-[#231b00]">
            {glasses >= maxGlasses ? "Goal Met" : "In Progress"}
          </div>

          <div className="w-14 h-14 bg-white neo-border flex items-center justify-center mb-4 text-[#2563eb] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Droplets className="w-8 h-8 stroke-[2.5]" />
          </div>

          <h3 className="font-display-lg text-2xl font-black uppercase text-[#1a1c1c] mb-2">
            Hydration Check
          </h3>

          {/* Progress Bar */}
          <div className="w-full bg-white neo-border h-7 mb-2 relative overflow-hidden">
            <div 
              className="bg-[#2563eb] h-full border-r-[3px] border-[#1a1c1c] transition-all duration-300"
              style={{ width: `${(glasses / maxGlasses) * 100}%` }}
            />
          </div>

          <p className="font-body-md text-sm sm:text-base text-[#434655] mb-6 font-bold">
            {glasses} / {maxGlasses} glasses today
          </p>

          <button 
            type="button"
            onClick={addGlass}
            disabled={glasses >= maxGlasses}
            className="mt-auto w-full bg-white text-[#1a1c1c] neo-border px-6 py-3 font-label-caps text-xs sm:text-sm uppercase font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#f4f4f3] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all disabled:opacity-60 cursor-pointer"
          >
            {glasses >= maxGlasses ? "✓ Completed" : "+ Add Glass"}
          </button>
        </div>

        {/* Card 3: Daily Walk Card */}
        <div className="bg-[#e2e2e2] border-[4px] border-[#1a1c1c] p-6 sm:p-8 neo-shadow flex flex-col items-start transition-all hover:translate-x-[2px] hover:translate-y-[2px] relative overflow-hidden group">
          <div className="absolute top-0 right-0 bg-[#c3c6d7] px-3 py-1 border-b-[4px] border-l-[4px] border-[#1a1c1c] font-label-caps text-xs font-bold uppercase text-[#1a1c1c]">
            {walkDone ? "Done" : "10:30 AM"}
          </div>

          <div className="w-14 h-14 bg-white neo-border flex items-center justify-center mb-4 text-[#006e16] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Footprints className="w-8 h-8 stroke-[2.5]" />
          </div>

          <h3 className="font-display-lg text-2xl font-black uppercase text-[#1a1c1c] mb-2">
            Daily Walk
          </h3>
          <p className="font-body-md text-sm sm:text-base text-[#434655] mb-6">
            20 mins gentle garden or veranda walk.
          </p>

          <button 
            type="button"
            onClick={() => setWalkDone(!walkDone)}
            className={`mt-auto w-full py-3 neo-border font-label-caps text-xs sm:text-sm font-bold uppercase transition-all flex items-center justify-center gap-2 cursor-pointer ${
              walkDone
                ? "bg-[#6bff8f] text-[#002109] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white text-[#1a1c1c] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#f4f4f3] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none"
            }`}
          >
            {walkDone ? "✓ Walk Completed" : "Mark Completed"}
          </button>
        </div>

      </div>
    </section>
  );
}
