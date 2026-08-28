"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Volume2 } from "lucide-react";
import { notificationService } from "@/lib/notifications/notificationService";
import { useLanguage } from "@/components/LanguageProvider";

interface TimelineItemData {
  id: string;
  time: string;
  type: "medicine" | "water" | "story" | "family";
  titleEn: string;
  titleHi: string;
  speechEn: string;
  speechHi: string;
  completed: boolean;
}

export function DailyTimeline() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [items, setItems] = useState<TimelineItemData[]>([
    {
      id: "med-1",
      time: "09:00 AM",
      type: "medicine",
      titleEn: "Morning Blood Pressure Medicine",
      titleHi: "सुबह की दवाई (BP Medication)",
      speechEn: "Morning blood pressure medicine has been marked as taken.",
      speechHi: "सुबह की दवाई ली जा चुकी है।",
      completed: true,
    },
    {
      id: "water-1",
      time: "11:30 AM",
      type: "water",
      titleEn: "Fresh Glass of Water",
      titleHi: "ताज़ा पानी का गिलास",
      speechEn: "Please take a sip of fresh water.",
      speechHi: "कृपया एक गिलास ताज़ा पानी पी लीजिए।",
      completed: false,
    },
    {
      id: "story-1",
      time: "03:30 PM",
      type: "story",
      titleEn: "Story Time with SMRITI",
      titleHi: "SMRITI के साथ कहानी का समय",
      speechEn: "Time for a relaxing afternoon story with SMRITI.",
      speechHi: "दोपहर की शांत कहानी सुनने का समय।",
      completed: false,
    },
    {
      id: "med-2",
      time: "08:30 PM",
      type: "medicine",
      titleEn: "Evening Multivitamin & Care",
      titleHi: "रात की दवाई व देखभाल",
      speechEn: "Time to take your evening care medication after dinner.",
      speechHi: "रात के खाने के बाद की दवाई लेने का समय।",
      completed: false,
    },
  ]);

  const toggleItem = (id: string) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const nextState = !item.completed;
          if (nextState) {
            const title = isHindi ? item.titleHi : item.titleEn;
            const completionMsg = isHindi
              ? `${title} पूरा हो गया। बहुत बढ़िया!`
              : `${title} completed. Well done!`;
            notificationService.speakAnnouncement(completionMsg, language);
          }
          return { ...item, completed: nextState };
        }
        return item;
      })
    );
  };

  const handleReadSchedule = () => {
    const pending = items.filter((i) => !i.completed);
    if (pending.length === 0) {
      const allDone = isHindi
        ? "आज के सभी काम पूरे हो चुके हैं। आप बहुत अच्छा कर रहे हैं!"
        : "All daily tasks are complete for today. You are doing wonderful!";
      notificationService.speakAnnouncement(allDone, language);
    } else {
      const pendingNames = pending.map((p) => (isHindi ? p.titleHi : p.titleEn)).join(", ");
      const summary = isHindi
        ? `आज आपके मुख्य काम हैं: ${pendingNames}।`
        : `Your remaining activities today are: ${pendingNames}.`;
      notificationService.speakAnnouncement(summary, language);
    }
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl md:text-2xl font-bold text-smriti-text">
          {isHindi ? "आज की दिनचर्या" : "Today's Schedule & Reminders"}
        </h3>
        
        <button
          onClick={handleReadSchedule}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-smriti-primary/10 hover:bg-smriti-primary/20 text-smriti-primary text-sm font-bold transition-colors"
        >
          <Volume2 className="w-4 h-4" />
          <span>{isHindi ? "सुनाएं (Read Aloud)" : "Read Aloud"}</span>
        </button>
      </div>
      
      <div className="flex flex-col gap-3">
        {items.map((item) => {
          const title = isHindi ? item.titleHi : item.titleEn;
          const speech = isHindi ? item.speechHi : item.speechEn;

          return (
            <div 
              key={item.id} 
              onClick={() => toggleItem(item.id)}
              className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer touch-target ${
                item.completed 
                  ? "bg-white/60 border-emerald-200 text-smriti-text/60" 
                  : "bg-white border-smriti-border text-smriti-text shadow-sm hover:border-smriti-primary/40"
              }`}
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="shrink-0">
                  {item.completed ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-600 fill-emerald-100" />
                  ) : (
                    <Circle className="w-7 h-7 text-smriti-muted hover:text-smriti-primary transition-colors" />
                  )}
                </div>
                
                <div className="min-w-0">
                  <p className={`text-base md:text-lg font-bold truncate ${item.completed ? 'line-through text-smriti-muted' : 'text-smriti-text'}`}>
                    {title}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-smriti-primary bg-smriti-primary/10 px-2 py-0.5 rounded-md">
                      {item.time}
                    </span>
                    <span className="text-xs text-smriti-muted">
                      {item.type === "medicine" 
                        ? (isHindi ? "💊 दवाई" : "💊 Medicine") 
                        : item.type === "water" 
                        ? (isHindi ? "💧 पानी" : "💧 Water") 
                        : (isHindi ? "📖 दिनचर्या" : "📖 Routine")}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  notificationService.speakAnnouncement(speech, language);
                }}
                className="w-10 h-10 rounded-full hover:bg-smriti-primary/10 flex items-center justify-center text-smriti-primary shrink-0 transition-colors"
                title={isHindi ? "आवाज सुनें" : "Listen to reminder"}
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
}
