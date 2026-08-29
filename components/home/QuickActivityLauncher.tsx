"use client";

import { ACTIVITIES } from "@/lib/activities";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const COLORS = [
  "bg-[#dbe1ff]",
  "bg-[#6bff8f]",
  "bg-[#ffe083]",
  "bg-[#ffdad6]"
];

export function QuickActivityLauncher() {
  return (
    <section className="w-full mb-6">
      <div className="bg-white neo-border neo-shadow p-5">
        <div className="flex items-center justify-between pb-2 mb-3 border-b-2 border-[#1a1c1c]">
          <h3 className="font-headline-lg text-base sm:text-lg font-black uppercase text-[#1a1c1c]">
            Quick Activities
          </h3>
          <Link 
            href="/activities" 
            className="font-label-caps text-xs font-bold text-[#2563eb] uppercase flex items-center gap-1 hover:underline"
          >
            All Activities <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {ACTIVITIES.map((act, i) => {
            const Icon = act.icon;
            const bg = COLORS[i % COLORS.length];
            return (
              <Link
                key={act.id}
                href={act.href}
                className="flex flex-col items-center text-center p-3 bg-[#f9f9f8] neo-border shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#ffe083] hover:translate-x-[1px] hover:translate-y-[1px] transition-all group"
              >
                <div className={`w-10 h-10 neo-border ${bg} flex items-center justify-center mb-2 shadow-[1.5px_1.5px_0px_0px_rgba(0,0,0,1)] group-hover:scale-105 transition-transform`}>
                  <Icon className="w-5 h-5 text-[#1a1c1c] stroke-[2.5]" />
                </div>
                <span className="font-display-lg text-xs font-black uppercase text-[#1a1c1c] line-clamp-1">
                  {act.title}
                </span>
                <span className="font-body-md text-[10px] text-[#434655] mt-0.5 line-clamp-1">
                  {act.desc}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
