"use client";

import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/dexie";

export function ActivityJourney() {
  const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  const { t } = useLanguage();
  const elderId = 1;

  // Real-time query of game sessions from IndexedDB
  const sessions = useLiveQuery(() => db.gameSessions.where({ elderId }).toArray(), [elderId]);

  // Compute completed days for the current week (Monday through Sunday)
  const now = new Date();
  const currentDayOfWeek = now.getDay(); // 0 = Sunday, 1 = Monday, ...
  // Convert JS Sunday=0 to Monday=0, Tuesday=1, ..., Sunday=6
  const normalizedTodayIndex = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;

  // Find start of current week (Monday)
  const monday = new Date(now);
  monday.setDate(now.getDate() - normalizedTodayIndex);
  monday.setHours(0, 0, 0, 0);

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  sunday.setHours(23, 59, 59, 999);

  // Array of 7 booleans for M, T, W, T, F, S, S
  const progress = [false, false, false, false, false, false, false];

  if (sessions) {
    sessions.forEach(session => {
      const sessionDate = new Date(session.completedAt);
      if (sessionDate >= monday && sessionDate <= sunday) {
        const sessionDay = sessionDate.getDay();
        const dayIdx = sessionDay === 0 ? 6 : sessionDay - 1;
        progress[dayIdx] = true;
      }
    });
  }

  const completedCount = progress.filter(Boolean).length;

  return (
    <section className="w-full mb-12">
      <div className="bg-[#f9f9f8] neo-border neo-shadow p-6 sm:p-8">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 pb-4 border-b-2 border-[#1a1c1c]">
          <div>
            <h2 className="font-headline-lg text-2xl font-black uppercase text-[#1a1c1c]">
              {t("activities.journey.title") || "Weekly Activity Journey"}
            </h2>
            <p className="font-body-md text-sm text-[#434655]">
              {t("activities.journey.desc") || "Daily gentle exercises help maintain focus and long-term memory."}
            </p>
          </div>
          <span className="bg-[#ffe083] text-[#231b00] font-label-caps text-xs font-bold px-3 py-1 neo-border uppercase self-start sm:self-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {completedCount} / 7 Completed
          </span>
        </div>

        <div className="mb-6">
          <div className="flex gap-3 sm:gap-4 items-center justify-between sm:justify-start">
            {days.map((day, i) => {
              const isToday = i === normalizedTodayIndex;
              return (
                <div key={i} className="flex flex-col items-center gap-2">
                  <div 
                    className={`w-10 h-10 neo-border-2 flex items-center justify-center font-bold text-sm transition-colors ${
                      progress[i] 
                        ? 'bg-[#6bff8f] text-[#002109] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]' 
                        : isToday
                        ? 'bg-[#ffe083] text-[#231b00] border-[#2563eb]'
                        : 'bg-white text-[#434655]'
                    }`}
                  >
                    {progress[i] ? <Check className="w-5 h-5 stroke-[3]" /> : day}
                  </div>
                  <span className={`font-label-caps text-xs font-bold ${isToday ? 'text-[#2563eb] underline' : 'text-[#1a1c1c]'}`}>
                    {day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t-2 border-[#1a1c1c]">
          <p className="font-body-md text-sm text-[#1a1c1c]">
            <strong>{completedCount} daily session{completedCount === 1 ? '' : 's'}</strong> completed this week
          </p>
          <Link 
            href="/activities/family-recognition"
            className="inline-flex items-center gap-2 font-label-caps text-xs font-bold uppercase text-[#2563eb] hover:underline"
          >
            <span>{t("common.continue") || "Continue Daily Goal"}</span>
            <ArrowRight className="w-4 h-4 stroke-[3]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
