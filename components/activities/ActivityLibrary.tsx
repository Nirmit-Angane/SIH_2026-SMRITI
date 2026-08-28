"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ACTIVITIES } from "@/lib/activities";
import { Clock } from "lucide-react";

export function ActivityLibrary() {
  return (
    <section className="w-full max-w-4xl mx-auto px-4 mb-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {ACTIVITIES.map((activity, i) => {
          const Icon = activity.icon;
          return (
            <motion.div 
              key={activity.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i, ease: "easeOut" }}
            >
              <Link 
                href={activity.href}
                className="block h-full bg-smriti-surface border-2 border-smriti-border rounded-[24px] p-6 hover:border-smriti-primary hover:shadow-xl hover:shadow-smriti-primary/10 transition-all duration-300 group"
              >
                <div className="flex flex-col h-full justify-between gap-6">
                  
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 bg-smriti-primary/10 text-smriti-primary group-hover:scale-105 transition-transform">
                      <Icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-smriti-text mb-1 group-hover:text-smriti-primary transition-colors">
                        {activity.title}
                      </h3>
                      <p className="text-lg text-smriti-text/80 leading-snug">
                        {activity.desc}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-smriti-border/50">
                    <div className="flex items-center gap-2 text-smriti-muted font-medium">
                      <Clock className="w-4 h-4" />
                      <span>About 5 minutes</span>
                    </div>
                    
                    <span className="font-bold text-smriti-primary text-lg group-hover:underline">
                      {activity.cta}
                    </span>
                  </div>
                  
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
