"use client";

import { motion } from "framer-motion";
import { Users, Layers, Eye, BookOpen } from "lucide-react";

export default function GamesSection() {
  const games = [
    {
      title: "Family Member Recognition",
      description: "Recognize familiar faces and relationships from your personal memory bank.",
      icon: Users,
      color: "bg-red-50 text-red-600",
      border: "border-red-100",
      delay: 0
    },
    {
      title: "Regional Memory Match",
      description: "Match familiar objects, foods and cultural imagery from your region.",
      icon: Layers,
      color: "bg-emerald-50 text-emerald-600",
      border: "border-emerald-100",
      delay: 0.1
    },
    {
      title: "What Changed?",
      description: "Observe a familiar scene and notice what changed after a few seconds.",
      icon: Eye,
      color: "bg-blue-50 text-blue-600",
      border: "border-blue-100",
      delay: 0.2
    },
    {
      title: "Story Memory",
      description: "Listen to a short familiar story and answer a simple question.",
      icon: BookOpen,
      color: "bg-amber-50 text-amber-600",
      border: "border-amber-100",
      delay: 0.3
    }
  ];

  return (
    <section className="py-24 bg-white" id="games">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-smriti-text mb-6">
            Small activities. <span className="text-smriti-primary">Meaningful engagement.</span>
          </h2>
          <p className="text-xl text-smriti-muted">
            Gentle cognitive activities designed around familiarity rather than frustrating challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {games.map((game, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: game.delay }}
              className={`p-8 rounded-[32px] border-2 ${game.border} bg-white shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-2 group cursor-default`}
            >
              <div className="flex flex-col h-full">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${game.color} group-hover:scale-110 transition-transform duration-300`}>
                  <game.icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-smriti-text mb-3">{game.title}</h3>
                <p className="text-lg text-smriti-muted leading-relaxed">
                  {game.description}
                </p>
                
                <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-smriti-primary font-semibold">Preview Activity</span>
                  <div className="w-8 h-8 rounded-full bg-smriti-primary/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-smriti-primary"></div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
