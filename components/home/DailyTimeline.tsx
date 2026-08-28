"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";

export function DailyTimeline() {
  const timeline = [
    { time: "Morning", title: "Family & Friends", completed: true },
    { time: "Afternoon", title: "Story Time", completed: false },
    { time: "Evening", title: "A family memory", completed: false },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-12"
    >
      <h3 className="text-xl font-bold text-smriti-text mb-6">
        Today's small moments
      </h3>
      
      <div className="flex flex-col gap-5">
        {timeline.map((item, index) => (
          <div key={index} className="flex items-start gap-4">
            <div className="mt-1">
              {item.completed ? (
                <CheckCircle2 className="w-6 h-6 text-smriti-primary" />
              ) : (
                <Circle className="w-6 h-6 text-smriti-border" />
              )}
            </div>
            <div>
              <p className={`text-sm font-bold uppercase tracking-wider mb-1 ${item.completed ? 'text-smriti-primary' : 'text-smriti-muted'}`}>
                {item.time}
              </p>
              <p className={`text-lg font-medium ${item.completed ? 'text-smriti-text' : 'text-smriti-text/70'}`}>
                {item.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
