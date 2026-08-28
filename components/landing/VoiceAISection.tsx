"use client";

import { motion } from "framer-motion";
import { Mic, Volume2, ArrowRight, Check, BookOpen } from "lucide-react";

export default function VoiceAISection() {
  return (
    <section className="py-24 bg-smriti-primary text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
          <path d="M0,50 Q25,30 50,50 T100,50" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5,5" />
          <path d="M0,60 Q25,40 50,60 T100,60" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Just speak naturally.
          </h2>
          <p className="text-xl text-white/80">
            A quiet assistant that listens carefully, helping you navigate your day and recall memories without pressing a button.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: UI Mockup */}
          <div className="bg-white text-smriti-text p-8 rounded-[32px] shadow-sm relative">
            <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
              <BookOpen className="w-6 h-6 text-smriti-primary" />
              <h3 className="font-bold text-xl">Today's Story</h3>
            </div>
            
            <p className="text-lg leading-relaxed mb-8">
              "It was a warm evening in Guwahati, during the Bihu festival..."
            </p>
            
            <div className="bg-smriti-bg rounded-2xl p-6 flex flex-col items-center justify-center gap-4 border border-smriti-border">
              <div className="w-16 h-16 bg-smriti-primary rounded-full flex items-center justify-center text-white shadow-md relative">
                <Mic className="w-8 h-8" />
                <div className="absolute -inset-2 bg-smriti-primary/20 rounded-full animate-ping"></div>
              </div>
              <p className="font-medium text-smriti-primary text-lg">Listening...</p>
            </div>
          </div>

          {/* Right: Features */}
          <div className="flex flex-col gap-8">
            {[
              {
                title: "Voice-First Interaction",
                desc: "No need to learn complex menus. Just speak to play a game, record a memory, or hear a reminder.",
              },
              {
                title: "Regional Language Support",
                desc: "Understands Assamese, Hindi, and English (more coming soon) with natural local accents.",
              },
              {
                title: "Remembers for You",
                desc: "Mention a family event during a game, and it quietly notes it down to remind you next time.",
              }
            ].map((feature, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                  <p className="text-white/80 text-lg leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
