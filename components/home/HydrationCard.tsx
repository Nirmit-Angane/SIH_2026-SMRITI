"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Droplet, Plus, Bell, Volume2, Check } from "lucide-react";
import { notificationService } from "@/lib/notifications/notificationService";
import { useLanguage } from "@/components/LanguageProvider";

export function HydrationCard() {
  const { language } = useLanguage();
  const [glasses, setGlasses] = useState(2);
  const maxGlasses = 6;
  const [remindersEnabled, setRemindersEnabled] = useState(false);

  const isHindi = language === "hi";

  // Load from local storage for today
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
      
      // Voice affirmation
      const text = isHindi ? "शाबाश! आपने पानी पी लिया।" : "Great job! You drank a glass of water.";
      notificationService.speakAnnouncement(text, language);
    }
  };

  const toggleReminders = async () => {
    if (!remindersEnabled) {
      await notificationService.scheduleDefaultWaterReminders(language);
      setRemindersEnabled(true);
      const msg = isHindi ? "पानी पीने के रिमाइंडर चालू कर दिए गए हैं।" : "Water reminders have been turned on.";
      notificationService.speakAnnouncement(msg, language);
    } else {
      setRemindersEnabled(false);
    }
  };

  const triggerTestSound = async () => {
    await notificationService.triggerTestReminder("water", language);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-12"
    >
      <div className="bg-gradient-to-br from-blue-50/80 to-cyan-50/50 border border-blue-200/60 rounded-3xl p-6 md:p-8 shadow-sm">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600">
              <Droplet className="w-7 h-7 fill-blue-500/20" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-smriti-text">
                {isHindi ? "पानी पीने की आदत (Hydration)" : "Daily Water Intake"}
              </h3>
              <p className="text-sm text-smriti-muted font-medium">
                {isHindi ? `आज ${maxGlasses} में से ${glasses} गिलास पिए` : `${glasses} of ${maxGlasses} glasses completed today`}
              </p>
            </div>
          </div>

          <button
            onClick={toggleReminders}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-bold transition-all shadow-sm ${
              remindersEnabled
                ? "bg-blue-600 text-white"
                : "bg-white border border-blue-200 text-blue-700 hover:bg-blue-50"
            }`}
          >
            <Bell className="w-4 h-4" />
            {remindersEnabled 
              ? (isHindi ? "रिमाइंडर चालू हैं" : "Reminders ON") 
              : (isHindi ? "अलर्ट चालू करें" : "Turn ON Alert")}
          </button>
        </div>

        {/* Glasses Visual Pills */}
        <div className="grid grid-cols-6 gap-2 my-6">
          {Array.from({ length: maxGlasses }).map((_, i) => (
            <div
              key={i}
              className={`h-14 rounded-2xl border-2 flex flex-col items-center justify-center transition-all duration-300 ${
                i < glasses
                  ? "bg-blue-500 border-blue-600 text-white shadow-sm scale-100"
                  : "bg-white/80 border-blue-200 text-blue-300"
              }`}
            >
              {i < glasses ? (
                <Check className="w-6 h-6 stroke-[3]" />
              ) : (
                <Droplet className="w-5 h-5 opacity-40" />
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handleAddGlass}
            disabled={glasses >= maxGlasses}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-full text-base transition-transform active:scale-95 shadow-md disabled:opacity-50"
          >
            <Plus className="w-5 h-5" />
            <span>{isHindi ? "+ एक गिलास पानी पिया" : "+ Log 1 Glass of Water"}</span>
          </button>

          <button
            onClick={triggerTestSound}
            className="flex items-center gap-1.5 text-xs text-blue-700 hover:text-blue-900 font-bold underline px-2 py-1"
          >
            <Volume2 className="w-4 h-4" />
            <span>{isHindi ? "आवाज व अलर्ट टेस्ट करें" : "Test Sound & Alert"}</span>
          </button>
        </div>

      </div>
    </motion.section>
  );
}
