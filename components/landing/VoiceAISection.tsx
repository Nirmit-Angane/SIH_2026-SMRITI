"use client";

import { motion } from "framer-motion";
import { Mic, Check, BookOpen } from "lucide-react";

export default function VoiceAISection() {
  return (
    <section className="py-16 md:py-24 bg-[#2563eb] text-white border-t-[4px] border-[#1a1c1c] overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-black mb-4 text-white uppercase tracking-tight">
            Just Speak Naturally.
          </h2>
          <p className="font-body-lg text-lg sm:text-xl text-[#eeefff]">
            A quiet assistant that listens carefully, helping you navigate your day and recall memories without pressing small buttons.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: UI Mockup matching game_ai_story_memory reference */}
          <div className="bg-white text-[#1a1c1c] p-8 neo-border neo-shadow">
            <div className="flex items-center gap-3 mb-6 border-b-[3px] border-[#1a1c1c] pb-4">
              <BookOpen className="w-6 h-6 text-[#004ac6]" />
              <h3 className="font-headline-lg text-xl sm:text-2xl font-black uppercase">Today&apos;s Story</h3>
            </div>
            
            <p className="font-body-lg text-lg sm:text-xl leading-relaxed mb-8 text-[#434655]">
              &ldquo;It was a warm evening in Guwahati, during the Rongali Bihu festival, when grandfather brought home the brass xorai...&rdquo;
            </p>
            
            <div className="bg-[#f9f9f8] neo-border p-6 flex flex-col items-center justify-center gap-4">
              <div className="w-20 h-20 bg-[#dbe1ff] rounded-full flex items-center justify-center text-[#00174b] neo-border animate-pulse">
                <Mic className="w-10 h-10 stroke-[2.5]" />
              </div>
              <p className="font-headline-lg font-black text-xl uppercase tracking-wider text-[#1a1c1c]">Listening...</p>
              <div className="flex gap-2">
                <div className="w-3.5 h-3.5 bg-[#ba1a1a] rounded-full border-2 border-black animate-bounce" style={{ animationDelay: "0s" }}></div>
                <div className="w-3.5 h-3.5 bg-[#ffe083] rounded-full border-2 border-black animate-bounce" style={{ animationDelay: "0.15s" }}></div>
                <div className="w-3.5 h-3.5 bg-[#6bff8f] rounded-full border-2 border-black animate-bounce" style={{ animationDelay: "0.3s" }}></div>
              </div>
            </div>
          </div>

          {/* Right: Features in Neobrutalist containers */}
          <div className="flex flex-col gap-6 font-body-md">
            {[
              {
                title: "Voice-First Interaction",
                desc: "No complex navigation needed. Speak naturally to play a game, record a memory, or hear your daily schedule.",
              },
              {
                title: "Regional Dialect Support",
                desc: "Understands Assamese, Hindi, Bengali, Manipuri, and English with authentic regional pronunciation.",
              },
              {
                title: "Gentle Memory Retention",
                desc: "Mention family members and milestones during conversation, and Smriti securely weaves them into future activities.",
              }
            ].map((feature, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-sm p-6 neo-border neo-shadow-sm flex gap-4 text-white">
                <div className="w-10 h-10 rounded-full bg-[#6bff8f] text-[#002109] neo-border flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 stroke-[3]" />
                </div>
                <div>
                  <h4 className="font-headline-lg text-xl font-bold uppercase mb-1">{feature.title}</h4>
                  <p className="text-white/90 text-base sm:text-lg leading-relaxed">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
