"use client";

import { motion } from "framer-motion";
import { Type, Mic, Hand, Volume2, Contrast, CircleDot } from "lucide-react";

export default function AccessibilitySection() {
  const features = [
    { icon: Type, title: "Large readable text" },
    { icon: Mic, title: "Voice assistance" },
    { icon: Hand, title: "Large touch targets" },
    { icon: Volume2, title: "Read aloud" },
    { icon: Contrast, title: "High contrast" },
    { icon: CircleDot, title: "No-pressure interaction" },
  ];

  return (
    <section className="py-24 bg-smriti-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-smriti-text mb-6">
            Simple by design.
          </h2>
          <p className="text-xl text-smriti-muted">
            Smriti is designed so an elderly user can understand the next action without needing to learn a complicated interface.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white p-6 lg:p-8 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center text-center gap-4 hover:border-smriti-primary/30 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-smriti-primary/5 flex items-center justify-center text-smriti-primary">
                <feature.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-smriti-text">{feature.title}</h3>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
