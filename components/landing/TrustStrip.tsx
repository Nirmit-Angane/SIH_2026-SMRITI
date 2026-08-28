"use client";

import { motion } from "framer-motion";
import { Brain, Heart, Mic, Map, Users, Smartphone } from "lucide-react";

export default function TrustStrip() {
  const features = [
    { icon: Brain, text: "Cognitive Activities" },
    { icon: Heart, text: "Personal Memories" },
    { icon: Mic, text: "Voice Assisted" },
    { icon: Map, text: "Regional Experiences" },
    { icon: Users, text: "Family Support" },
    { icon: Smartphone, text: "Simple & Accessible" },
  ];

  return (
    <section className="py-12 bg-white border-y border-smriti-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 md:justify-between items-center opacity-80">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center gap-3 text-smriti-text group"
            >
              <div className="w-12 h-12 rounded-full bg-smriti-bg flex items-center justify-center group-hover:bg-smriti-secondary/20 transition-colors">
                <feature.icon className="w-6 h-6 text-smriti-primary" />
              </div>
              <span className="font-semibold text-sm md:text-base text-center whitespace-nowrap">
                {feature.text}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
