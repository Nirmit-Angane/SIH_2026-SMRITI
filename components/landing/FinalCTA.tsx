"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function FinalCTA() {
  return (
    <section className="py-24 bg-white px-4 sm:px-6 lg:px-8">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto bg-smriti-primary rounded-[40px] p-10 md:p-16 lg:p-24 text-center relative overflow-hidden"
      >
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-smriti-accent/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>

        <div className="relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Make every memory <span className="text-smriti-accent">feel familiar.</span>
          </h2>
          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Explore a gentler way to support cognitive engagement, daily routines and family connection.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
            <Link href="/signup" className="flex items-center justify-center gap-2 bg-white text-smriti-primary px-10 py-5 rounded-full font-bold text-lg hover:bg-smriti-bg transition-all hover:-translate-y-1 shadow-lg">
              Get Started
              <ArrowRight className="w-6 h-6" />
            </Link>
            <Link href="/login" className="flex items-center justify-center gap-2 bg-smriti-primary text-white px-10 py-5 rounded-full font-bold text-lg hover:bg-opacity-80 border border-white/20 transition-all hover:-translate-y-1">
              Log In
            </Link>
          </div>
          
          <p className="text-white/60 font-medium">
            Designed for elderly users and their families.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
