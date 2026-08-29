"use client";

import { ACTIVITIES } from "@/lib/activities";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/dexie";

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffHours / 24);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `Today at ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  if (diffDays === 1) return "Yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;
  return date.toLocaleDateString();
}

const GAME_TYPE_MAP: Record<string, string> = {
  "family-friends": "/activities/family-recognition",
  "family_recognition": "/activities/family-recognition",
  "memory-cards": "/activities/memory-cards",
  "story-time": "/activities/story-memory",
  "story-memory": "/activities/story-memory",
  "tetris": "/activities/tetris",
  "what-changed": "/activities/tetris"
};

const COLORS = ["bg-[#dbe1ff]", "bg-[#ffe083]", "bg-[#6bff8f]", "bg-[#ffdad6]"];

export function RecentlyEnjoyed() {
  const elderId = 1;
  const sessions = useLiveQuery(() => db.gameSessions.where({ elderId }).reverse().sortBy("completedAt"), [elderId]);

  // If user has real game sessions, extract unique recent games
  let recentActivities: Array<{ title: string; href: string; time: string; color: string; icon: any }> = [];

  if (sessions && sessions.length > 0) {
    const seenTypes = new Set<string>();
    for (const s of sessions) {
      if (!seenTypes.has(s.gameType)) {
        seenTypes.add(s.gameType);
        const mappedHref = GAME_TYPE_MAP[s.gameType] || "/activities";
        const matchingActivity = ACTIVITIES.find(a => a.href === mappedHref) || ACTIVITIES[0];
        
        recentActivities.push({
          title: matchingActivity.title,
          href: mappedHref,
          time: formatRelativeTime(s.completedAt),
          color: COLORS[recentActivities.length % COLORS.length],
          icon: matchingActivity.icon
        });

        if (recentActivities.length >= 3) break;
      }
    }
  }

  // Fallback to top library activities if no sessions yet
  if (recentActivities.length === 0) {
    recentActivities = [
      { ...ACTIVITIES[0], time: "Ready to play", color: "bg-[#dbe1ff]" },
      { ...ACTIVITIES[1], time: "Ready to play", color: "bg-[#ffe083]" },
      { ...ACTIVITIES[2], time: "Ready to play", color: "bg-[#6bff8f]" },
    ];
  }

  return (
    <section className="w-full mb-16">
      <h3 className="font-headline-lg text-2xl font-black uppercase text-[#1a1c1c] mb-6 pb-2 border-b-2 border-[#1a1c1c]">
        Recently Enjoyed
      </h3>
      
      <div className="flex flex-col gap-4">
        {recentActivities.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className="flex items-center justify-between p-4 sm:p-5 bg-white neo-border neo-shadow-sm hover:translate-x-[2px] transition-transform group cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 neo-border flex items-center justify-center text-[#1a1c1c] ${item.color} shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                  <Icon className="w-6 h-6 stroke-[2.5]" />
                </div>
                <div>
                  <h4 className="font-headline-lg text-lg font-bold text-[#1a1c1c] uppercase group-hover:text-[#2563eb] transition-colors">
                    {item.title}
                  </h4>
                  <p className="font-body-md text-xs sm:text-sm text-[#434655] flex items-center gap-1 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.time}</span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 font-label-caps text-xs font-bold uppercase text-[#2563eb]">
                <span>Play Again</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
