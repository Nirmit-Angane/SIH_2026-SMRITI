"use client";

import { motion } from "framer-motion";
import { BookOpen, Mic, Gamepad2, RefreshCw, Database, User, Heart, Sparkles } from "lucide-react";

export default function PersonalMemorySection() {
  return (
    <section className="py-16 md:py-24 bg-[#f9f9f8]" id="features">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1c1c] uppercase tracking-tight mb-4">
            Built for Heritage & Cognition
          </h2>
          <p className="font-body-lg text-lg sm:text-xl text-[#434655]">
            Everything your family needs to preserve memories, engage in cognitive play, and stay connected.
          </p>
        </div>

        {/* 12-Column Bento Grid matching reference */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16">
          
          {/* Bento Card 1: Personal Memory Bank (col-span-8) */}
          <div className="col-span-1 md:col-span-8 neo-border neo-shadow bg-[#dbe1ff] p-6 sm:p-8 flex flex-col justify-between gap-6 relative overflow-hidden transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-start z-10">
              <h3 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-black text-[#00174b] uppercase">
                Personal Memory Bank
              </h3>
              <div className="bg-[#004ac6] text-white rounded-full p-3.5 neo-border shrink-0">
                <BookOpen className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>
            
            <p className="font-body-md text-base sm:text-lg text-[#00174b] z-10 max-w-xl font-medium">
              Securely store and recall family histories, favorite recipes, and pivotal life events for Smriti to reference seamlessly during daily interactions.
            </p>
            
            {/* Decorative background watermark */}
            <div className="absolute -bottom-8 -right-8 opacity-15 pointer-events-none transform rotate-12">
              <Database className="w-48 h-48 text-[#00174b]" />
            </div>
          </div>

          {/* Bento Card 2: Voice First (col-span-4) */}
          <div className="col-span-1 md:col-span-4 neo-border neo-shadow bg-[#ffe083] p-6 sm:p-8 flex flex-col justify-between gap-4 transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div>
              <div className="bg-[#735c00] text-white w-fit rounded-full p-3 neo-border mb-4">
                <Mic className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-headline-lg text-2xl sm:text-3xl font-black text-[#231b00] uppercase">
                Voice First
              </h3>
            </div>
            <p className="font-body-md text-base sm:text-lg text-[#231b00] font-medium">
              Natural, intuitive spoken interactions tailored to regional dialects and languages.
            </p>
          </div>

          {/* Bento Card 3: Regional Games (col-span-5) */}
          <div className="col-span-1 md:col-span-5 neo-border neo-shadow bg-[#6bff8f] p-6 sm:p-8 flex flex-col justify-between gap-4 transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div>
              <div className="bg-[#006e2f] text-white w-fit rounded-full p-3 neo-border mb-4">
                <Gamepad2 className="w-6 h-6 stroke-[2.5]" />
              </div>
              <h3 className="font-headline-lg text-2xl sm:text-3xl font-black text-[#002109] uppercase">
                Regional Games
              </h3>
            </div>
            <p className="font-body-md text-base sm:text-lg text-[#002109] font-medium">
              Cognitive exercises wrapped in culturally familiar pastimes, cuisine pairs, and traditional folklore.
            </p>
          </div>

          {/* Bento Card 4: Caregiver Sync (col-span-7) */}
          <div className="col-span-1 md:col-span-7 neo-border neo-shadow bg-[#ffdad6] p-6 sm:p-8 flex flex-col justify-between gap-6 relative overflow-hidden transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex justify-between items-start z-10">
              <h3 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl font-black text-[#93000a] uppercase">
                Caregiver Sync
              </h3>
              <div className="bg-[#ba1a1a] text-white rounded-full p-3.5 neo-border shrink-0">
                <RefreshCw className="w-6 h-6 stroke-[2.5]" />
              </div>
            </div>
            
            <p className="font-body-md text-base sm:text-lg text-[#93000a] z-10 max-w-xl font-medium">
              Keep the entire support circle updated with insights, routine reminders, and emotional well-being metrics derived from Smriti&apos;s interactions.
            </p>

            {/* Avatar Circle Stack */}
            <div className="flex items-center gap-2 z-10">
              <div className="h-12 w-12 rounded-full bg-white neo-border flex items-center justify-center -ml-2 first:ml-0 font-bold text-[#1a1c1c]">
                <User className="w-6 h-6 text-[#1a1c1c]" />
              </div>
              <div className="h-12 w-12 rounded-full bg-[#ffe083] neo-border flex items-center justify-center -ml-4 font-bold text-[#1a1c1c]">
                <Heart className="w-6 h-6 text-[#735c00]" />
              </div>
              <div className="h-12 w-12 rounded-full bg-[#6bff8f] neo-border flex items-center justify-center -ml-4 font-bold text-[#1a1c1c]">
                <Sparkles className="w-6 h-6 text-[#006e2f]" />
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
