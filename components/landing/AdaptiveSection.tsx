"use client";

import { motion } from "framer-motion";
import { Brain, HeartPulse, ShieldCheck, ArrowRight } from "lucide-react";

export default function AdaptiveSection() {
  return (
    <section className="py-24 bg-smriti-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-smriti-text mb-6">
            Adapts to the person, <span className="text-smriti-accent">not the other way around.</span>
          </h2>
          <p className="text-xl text-smriti-muted">
            Smriti adjusts activity complexity based on recent interaction. It never presents a clinical 'brain score' or induces performance anxiety.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center mb-6">
              <HeartPulse className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Comfortable Baseline</h3>
            <p className="text-smriti-muted text-lg">
              Activities always start at a gentle, comfortable level to build confidence and familiarity.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-smriti-surface p-8 rounded-[24px] shadow-sm border border-smriti-primary/20 flex flex-col items-center text-center relative"
          >
            {/* Arrows pointing between cards (desktop) */}
            <div className="hidden lg:block absolute top-1/2 -left-6 -translate-y-1/2 z-10">
              <ArrowRight className="w-8 h-8 text-smriti-primary/30" />
            </div>
            <div className="hidden lg:block absolute top-1/2 -right-6 -translate-y-1/2 z-10">
              <ArrowRight className="w-8 h-8 text-smriti-primary/30" />
            </div>

            <div className="w-16 h-16 rounded-full bg-smriti-primary/10 text-smriti-primary flex items-center justify-center mb-6">
              <Brain className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-smriti-primary">Adaptive Engine</h3>
            <ul className="text-smriti-primary/80 text-lg font-medium space-y-2 text-left w-full max-w-[200px] mx-auto">
              <li className="flex items-center gap-2"><span className="text-smriti-success">✓</span> Correct answers</li>
              <li className="flex items-center gap-2"><span className="text-smriti-primary">⏱</span> Response time</li>
              <li className="flex items-center gap-2"><span className="text-smriti-warning">ↁ</span> Attempts made</li>
              <li className="flex items-center gap-2"><span className="text-smriti-accent">↩</span> Skipped tasks</li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white p-8 rounded-[24px] shadow-sm border border-gray-100 flex flex-col items-center text-center"
          >
            <div className="w-16 h-16 rounded-full bg-green-50 text-green-500 flex items-center justify-center mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-4">Gentle Adjustments</h3>
            <p className="text-smriti-muted text-lg">
              Difficulty changes subtly behind the scenes. If a user struggles, the next activity becomes slightly gentler automatically.
            </p>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
