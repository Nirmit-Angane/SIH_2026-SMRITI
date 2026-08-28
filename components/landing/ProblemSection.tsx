"use client";

import { motion } from "framer-motion";
import { BrainCircuit, Clock, Users } from "lucide-react";

export default function ProblemSection() {
  const cards = [
    {
      icon: BrainCircuit,
      title: "Memory Difficulties",
      description: "Remembering names, places and recent moments can become difficult.",
      color: "bg-smriti-accent/10 text-smriti-accent",
    },
    {
      icon: Clock,
      title: "Daily Routines",
      description: "Medicines, hydration and appointments can be easy to forget.",
      color: "bg-smriti-primary/10 text-smriti-primary",
    },
    {
      icon: Users,
      title: "Social Connection",
      description: "Family involvement and familiar memories can make activities more meaningful.",
      color: "bg-smriti-accent/10 text-smriti-accent",
    }
  ];

  return (
    <section className="py-24 bg-smriti-bg relative overflow-hidden" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-smriti-text mb-6">
            Memory support should feel personal.
          </h2>
          <p className="text-xl text-smriti-muted">
            We understand that memory decline is challenging. Smriti is built to provide gentle, dignified support for the everyday moments that matter most.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-white p-8 rounded-[24px] shadow-sm hover:shadow-md transition-all hover:-translate-y-1 border border-smriti-primary/5"
            >
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${card.color.split(' ')[0]}`}>
                <card.icon className={`w-8 h-8 ${card.color.split(' ')[1]}`} />
              </div>
              <h3 className="text-2xl font-bold text-smriti-text mb-4">{card.title}</h3>
              <p className="text-lg text-smriti-muted leading-relaxed">
                {card.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
