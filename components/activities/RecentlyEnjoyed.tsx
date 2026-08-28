"use client";

import { motion } from "framer-motion";
import { ACTIVITIES } from "@/lib/activities";
import Link from "next/link";

export function RecentlyEnjoyed() {
  // Use static placeholder data
  const recent = [
    { ...ACTIVITIES[0], time: "Yesterday" },
    { ...ACTIVITIES[3], time: "2 days ago" },
    { ...ACTIVITIES[1], time: "3 days ago" },
  ];

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 mb-16"
    >
      <h3 className="text-xl font-bold text-smriti-text mb-6">
        Recently enjoyed
      </h3>
      
      <div className="flex flex-col gap-4">
        {recent.map((item, index) => {
          const Icon = item.icon;
          return (
            <Link
              key={index}
              href={item.href}
              className="flex items-center justify-between p-4 bg-smriti-surface border border-smriti-border rounded-2xl hover:border-smriti-primary/40 hover:bg-smriti-primary/5 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-smriti-primary/10 flex items-center justify-center text-smriti-primary shrink-0">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-smriti-text group-hover:text-smriti-primary transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm font-medium text-smriti-muted">
                    {item.time}
                  </p>
                </div>
              </div>
              <span className="text-smriti-primary font-bold pr-2 opacity-0 group-hover:opacity-100 transition-opacity">
                Play again →
              </span>
            </Link>
          );
        })}
      </div>
    </motion.section>
  );
}
