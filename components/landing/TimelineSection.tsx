"use client";

import { motion } from "framer-motion";
import { Sun, Coffee, Moon, Pill, Droplets, Phone, Brain } from "lucide-react";

export default function TimelineSection() {
  const events = [
    { period: "MORNING", icon: Sun, color: "text-amber-500", bg: "bg-amber-50", items: [
      { name: "Wake up", icon: Sun },
      { name: "Water", icon: Droplets },
      { name: "Medicine", icon: Pill },
      { name: "Memory Activity", icon: Brain, highlight: true }
    ]},
    { period: "AFTERNOON", icon: Coffee, color: "text-orange-500", bg: "bg-orange-50", items: [
      { name: "Lunch", icon: Coffee },
      { name: "Family Call", icon: Phone },
      { name: "Rest", icon: Moon }
    ]},
    { period: "EVENING", icon: Moon, color: "text-indigo-500", bg: "bg-indigo-50", items: [
      { name: "Medicine", icon: Pill },
      { name: "Water", icon: Droplets },
      { name: "Family Time", icon: Phone, highlight: true }
    ]}
  ];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-smriti-text mb-6">
            Support the rhythm of <span className="text-smriti-primary">everyday life.</span>
          </h2>
          <p className="text-xl text-smriti-muted">
            Daily routines provide comfort. Smriti offers large, accessible reminders that integrate cognitive activities directly into the natural flow of the day.
          </p>
        </div>

        <div className="max-w-4xl mx-auto relative">
          {/* Vertical Line */}
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-1 bg-smriti-primary/10 -ml-[0.5px]"></div>
          
          <div className="space-y-12">
            {events.map((block, idx) => (
              <div key={idx} className={`relative flex flex-col md:flex-row items-start ${idx % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
                
                {/* Center Icon */}
                <div className="absolute left-0 md:left-1/2 -ml-[24px] mt-2 w-14 h-14 rounded-full bg-white border-4 border-smriti-primary/10 flex items-center justify-center z-10">
                  <block.icon className={`w-6 h-6 ${block.color}`} />
                </div>

                {/* Content */}
                <div className={`ml-16 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                  <motion.div 
                    initial={{ opacity: 0, x: idx % 2 === 0 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className={`bg-white p-8 rounded-3xl shadow-sm border border-gray-100 ${idx % 2 === 0 ? "" : "md:items-end"}`}
                  >
                    <h3 className={`text-xl font-bold tracking-widest mb-6 ${block.color}`}>{block.period}</h3>
                    
                    <div className="flex flex-col gap-4">
                      {block.items.map((item, i) => (
                        <div key={i} className={`flex items-center gap-4 ${idx % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${item.highlight ? "bg-smriti-primary text-white" : "bg-gray-100 text-smriti-muted"}`}>
                            <item.icon className="w-6 h-6" />
                          </div>
                          <span className={`text-xl font-bold ${item.highlight ? "text-smriti-primary" : "text-smriti-text"}`}>
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
