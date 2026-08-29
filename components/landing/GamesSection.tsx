"use client";

import { motion } from "framer-motion";
import { Users, Layers, Eye, BookOpen, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GamesSection() {
  const games = [
    {
      title: "Family Recognition",
      description: "Recognize familiar faces, relations, and voices from your curated memory bank.",
      icon: Users,
      bg: "bg-[#dbe1ff]",
      text: "text-[#00174b]",
      link: "/activities/family-recognition"
    },
    {
      title: "Regional Memory Match",
      description: "Match traditional regional tea, handicrafts, cuisine, and cultural icons.",
      icon: Layers,
      bg: "bg-[#6bff8f]",
      text: "text-[#002109]",
      link: "/activities/memory-cards"
    },
    {
      title: "AI Story Memory",
      description: "Listen to culturally adaptive folk stories and recall key characters and events.",
      icon: BookOpen,
      bg: "bg-[#ffe083]",
      text: "text-[#231b00]",
      link: "/activities/story-memory"
    },
    {
      title: "Daily Cognitive Check-in",
      description: "Track morning mood, hydration, walks, and gentle mindful routines.",
      icon: Eye,
      bg: "bg-[#ffdad6]",
      text: "text-[#93000a]",
      link: "/dashboard"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-[#f9f9f8] border-t-[4px] border-[#1a1c1c]" id="games">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display-lg text-3xl sm:text-4xl md:text-5xl font-black text-[#1a1c1c] uppercase tracking-tight mb-4">
            Small Activities. <span className="text-[#004ac6]">Meaningful Play.</span>
          </h2>
          <p className="font-body-lg text-lg sm:text-xl text-[#434655]">
            Gentle cognitive activities designed around familiarity, culture, and positive reinforcement.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {games.map((game, index) => (
            <Link
              key={index}
              href={game.link}
              className={`p-8 neo-border neo-shadow ${game.bg} transition-all hover:translate-x-[4px] hover:translate-y-[4px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between group`}
            >
              <div>
                <div className="w-16 h-16 rounded-full bg-white neo-border flex items-center justify-center mb-6 text-[#1a1c1c]">
                  <game.icon className="w-8 h-8 stroke-[2.5]" />
                </div>
                
                <h3 className={`font-headline-lg text-2xl sm:text-3xl font-black uppercase mb-3 ${game.text}`}>
                  {game.title}
                </h3>
                <p className={`font-body-md text-base sm:text-lg font-medium leading-relaxed ${game.text}`}>
                  {game.description}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t-[3px] border-[#1a1c1c] flex items-center justify-between">
                <span className="font-label-bold text-sm uppercase text-[#1a1c1c]">Play Activity</span>
                <ArrowRight className="w-5 h-5 text-[#1a1c1c] transform group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
