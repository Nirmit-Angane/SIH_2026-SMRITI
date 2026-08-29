"use client";

import { useState } from "react";
import { Pill, Footprints, Volume2, Check, Clock } from "lucide-react";
import { notificationService } from "@/lib/notifications/notificationService";
import { useLanguage } from "@/components/LanguageProvider";

interface ScheduleCard {
  id: string;
  time: string;
  title: string;
  desc: string;
  tagColor: string;
  tagText: string;
  icon: typeof Pill;
  iconColor: string;
  completed: boolean;
}

export function DailyTimeline() {
  const { language } = useLanguage();
  const isHindi = language === "hi";

  const [cards, setCards] = useState<ScheduleCard[]>([
    {
      id: "med-1",
      time: "8:00 AM",
      title: isHindi ? "सुबह की दवाई" : "Morning Medicine",
      desc: isHindi ? "नाश्ते के साथ लें।" : "Take with breakfast.",
      tagColor: "bg-[#00FF41] text-[#000000]",
      tagText: "8:00 AM",
      icon: Pill,
      iconColor: "text-[#004ac6]",
      completed: true,
    },
    {
      id: "walk-1",
      time: "10:30 AM",
      title: isHindi ? "सुबह की सैर" : "Daily Walk",
      desc: isHindi ? "पार्क में 20 मिनट।" : "20 mins in the park.",
      tagColor: "bg-[#e2e2e2] text-[#1a1c1c]",
      tagText: "10:30 AM",
      icon: Footprints,
      iconColor: "text-[#006e2f]",
      completed: false,
    },
  ]);

  const toggleCard = (id: string) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const next = !c.completed;
          const msg = next 
            ? (isHindi ? `${c.title} पूरा हुआ। बहुत बढ़िया!` : `${c.title} completed. Well done!`)
            : (isHindi ? `${c.title} बाकी है।` : `${c.title} marked pending.`);
          notificationService.speakAnnouncement(msg, language);
          return { ...c, completed: next };
        }
        return c;
      })
    );
  };

  const handleReadSchedule = () => {
    const pending = cards.filter((i) => !i.completed);
    if (pending.length === 0) {
      const allDone = isHindi
        ? "आज के सभी काम पूरे हो चुके हैं। आप बहुत अच्छा कर रहे हैं!"
        : "All daily tasks are complete for today. You are doing wonderful!";
      notificationService.speakAnnouncement(allDone, language);
    } else {
      const pendingNames = pending.map((p) => p.title).join(", ");
      const summary = isHindi
        ? `आज आपके बाकी काम हैं: ${pendingNames}।`
        : `Your remaining activities today are: ${pendingNames}.`;
      notificationService.speakAnnouncement(summary, language);
    }
  };

  return (
    <div className="w-full mb-12">
      {/* Bento grid cards (Medicine & Walk) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              className="bg-[#eeeeed] neo-border neo-shadow p-6 sm:p-8 flex flex-col items-start relative overflow-hidden transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              {/* Corner Tag */}
              <div className={`absolute top-0 right-0 ${card.completed ? 'bg-[#00FF41] text-[#000000]' : card.tagColor} px-3.5 py-1 border-b-[4px] border-l-[4px] border-[#1a1c1c] font-label-caps text-xs font-bold uppercase`}>
                {card.completed ? "Done" : card.tagText}
              </div>

              <div className={`${card.iconColor} mb-4`}>
                <Icon className="w-12 h-12 stroke-[2.5]" />
              </div>

              <h3 className="font-headline-lg text-2xl font-black text-[#1a1c1c] uppercase mb-1">
                {card.title}
              </h3>
              <p className="font-body-md text-base text-[#434655] mb-6">
                {card.desc}
              </p>

              <div className="mt-auto w-full flex gap-2">
                <button
                  onClick={() => toggleCard(card.id)}
                  className={`flex-1 ${
                    card.completed 
                      ? "bg-[#6bff8f] text-[#002109]" 
                      : "bg-[#004ac6] text-white"
                  } neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none transition-all py-3 px-6 font-label-caps uppercase font-bold text-center flex items-center justify-center gap-2`}
                >
                  {card.completed ? <Check className="w-4 h-4" /> : null}
                  <span>{card.completed ? "Completed" : "Mark Done"}</span>
                </button>
                <button
                  onClick={() => {
                    const speech = `${card.title}. ${card.desc}`;
                    notificationService.speakAnnouncement(speech, language);
                  }}
                  className="p-3 bg-white text-[#1a1c1c] neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] transition-all"
                  title="Read Aloud"
                >
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Voice Schedule Bar */}
      <div className="flex items-center justify-between p-4 neo-border bg-white neo-shadow-sm">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-[#004ac6]" />
          <span className="font-label-bold text-sm uppercase text-[#1a1c1c]">
            {isHindi ? "दैनिक दिनचर्या और रिमाइंडर" : "Daily Schedule Summary"}
          </span>
        </div>
        <button
          onClick={handleReadSchedule}
          className="flex items-center gap-2 bg-[#ffe083] text-[#231b00] px-4 py-2 neo-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-label-bold text-xs uppercase hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        >
          <Volume2 className="w-4 h-4" />
          <span>{isHindi ? "सुनाएं" : "Read Aloud"}</span>
        </button>
      </div>
    </div>
  );
}
