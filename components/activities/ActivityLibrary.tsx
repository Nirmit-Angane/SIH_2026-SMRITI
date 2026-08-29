"use client";

import Link from "next/link";
import { ACTIVITIES } from "@/lib/activities";
import { Clock, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";

const BG_COLORS = [
  "bg-[#dbe1ff]",
  "bg-[#6bff8f]",
  "bg-[#ffe083]",
  "bg-[#ffdad6]"
];

export function ActivityLibrary() {
  const { t } = useLanguage();

  return (
    <section className="w-full mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ACTIVITIES.map((activity, i) => {
          const Icon = activity.icon;
          const bg = BG_COLORS[i % BG_COLORS.length];
          return (
            <Link 
              key={activity.id}
              href={activity.href}
              className={`block h-full ${bg} neo-border neo-shadow transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 group`}
            >
              <div className="flex flex-col h-full justify-between gap-6">
                
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-white neo-border flex items-center justify-center shrink-0 text-[#1a1c1c]">
                    <Icon className="w-8 h-8 stroke-[2.5]" />
                  </div>
                  <div>
                    <h3 className="font-headline-lg text-2xl sm:text-3xl font-black uppercase text-[#1a1c1c] mb-1">
                      {t(`activities.${activity.id}.title`) || activity.title}
                    </h3>
                    <p className="font-body-md text-base text-[#434655]">
                      {t(`activities.${activity.id}.desc`) || activity.desc}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t-[2px] border-[#1a1c1c]">
                  <div className="flex items-center gap-1.5 font-label-caps text-xs text-[#1a1c1c] font-bold uppercase">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{t("common.mins", { count: "5" }) || "~5 Mins"}</span>
                  </div>
                  
                  <span className="font-label-caps text-xs font-bold uppercase bg-[#1a1c1c] text-white px-3 py-1.5 neo-border inline-flex items-center gap-1 group-hover:bg-[#004ac6] transition-colors">
                    {t(`common.${activity.cta.toLowerCase().replace(/ /g, "")}`) || activity.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
                
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
