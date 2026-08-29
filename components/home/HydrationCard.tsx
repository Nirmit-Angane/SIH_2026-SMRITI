"use client";

import { useState, useEffect } from "react";
import { Droplet, Plus, Volume2 } from "lucide-react";
import { notificationService } from "@/lib/notifications/notificationService";
import { useLanguage } from "@/components/LanguageProvider";

export function HydrationCard() {
  const { language } = useLanguage();
  const [glasses, setGlasses] = useState(2);
  const maxGlasses = 6;

  const isHindi = language === "hi";

  useEffect(() => {
    const todayKey = `smriti_water_${new Date().toISOString().slice(0, 10)}`;
    const saved = localStorage.getItem(todayKey);
    if (saved) {
      setGlasses(parseInt(saved, 10));
    }
  }, []);

  const handleAddGlass = () => {
    if (glasses < maxGlasses) {
      const next = glasses + 1;
      setGlasses(next);
      const todayKey = `smriti_water_${new Date().toISOString().slice(0, 10)}`;
      localStorage.setItem(todayKey, next.toString());
      
      const text = isHindi ? "शाबाश! आपने पानी पी लिया।" : "Great job! You drank a glass of water.";
      notificationService.speakAnnouncement(text, language);
    }
  };

  const triggerTestSound = async () => {
    await notificationService.triggerTestReminder("water", language);
  };

  const progressPercent = Math.min(100, Math.round((glasses / maxGlasses) * 100));

  return (
    <div className="bg-[#eeeeed] neo-border neo-shadow p-6 sm:p-8 flex flex-col items-start relative overflow-hidden transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      
      {/* Top right status badge */}
      <div className="absolute top-0 right-0 bg-[#FFD700] px-3.5 py-1 border-b-[4px] border-l-[4px] border-[#1a1c1c] font-label-caps text-xs text-[#000000] font-bold uppercase">
        {glasses >= maxGlasses ? "Completed" : "In Progress"}
      </div>

      <div className="text-[#2563eb] mb-4">
        <Droplet className="w-12 h-12 fill-[#2563eb]" />
      </div>

      <h3 className="font-headline-lg text-2xl font-black text-[#1a1c1c] uppercase mb-2">
        {isHindi ? "पानी पीना" : "Hydration Check"}
      </h3>

      {/* Progress Bar with 4px border */}
      <div className="w-full bg-white neo-border h-8 mb-2 relative overflow-hidden">
        <div 
          className="bg-[#2563eb] h-full border-r-[4px] border-[#1a1c1c] transition-all duration-500"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <p className="font-body-md text-sm sm:text-base text-[#434655] font-medium mb-6">
        {isHindi ? `${maxGlasses} में से ${glasses} गिलास आज` : `${glasses}/${maxGlasses} glasses today`}
      </p>

      {/* Action button */}
      <button
        onClick={handleAddGlass}
        disabled={glasses >= maxGlasses}
        className="mt-auto bg-white text-[#1a1c1c] neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all py-3 px-6 font-label-caps uppercase w-full text-center font-bold flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Plus className="w-4 h-4" />
        <span>{isHindi ? "+ पानी पिया" : "+ Add Glass"}</span>
      </button>

      <button
        onClick={triggerTestSound}
        className="mt-3 text-xs font-label-bold uppercase text-[#004ac6] hover:underline flex items-center gap-1 self-center"
      >
        <Volume2 className="w-3.5 h-3.5" />
        <span>{isHindi ? "अलर्ट सुनें" : "Test Reminder"}</span>
      </button>
    </div>
  );
}
