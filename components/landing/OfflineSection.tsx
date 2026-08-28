"use client";

import { motion } from "framer-motion";
import { Wifi, WifiOff, CloudSync, Smartphone } from "lucide-react";

export default function OfflineSection() {
  return (
    <section className="py-24 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-smriti-text mb-6">
            Designed with <span className="text-smriti-primary">real-world connectivity</span> in mind.
          </h2>
          <p className="text-xl text-smriti-muted">
            Targeting remote and rural environments means internet isn't always reliable. Core memories and game data remain available locally.
          </p>
        </div>

        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center text-green-500 shadow-sm border border-green-100">
              <Wifi className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-bold text-smriti-text">Online</h4>
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
              <CloudSync className="w-4 h-4" />
              Synced just now
            </div>
          </motion.div>

          <motion.div 
            animate={{ x: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="hidden md:flex text-smriti-primary/30"
          >
            →
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-24 h-24 rounded-2xl bg-smriti-bg flex items-center justify-center text-smriti-primary shadow-lg border border-smriti-primary/20 relative">
              <Smartphone className="w-12 h-12" />
              <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md">
                <WifiOff className="w-5 h-5 text-smriti-accent" />
              </div>
            </div>
            <h4 className="text-xl font-bold text-smriti-text">Local Device</h4>
            <div className="bg-smriti-accent/10 text-smriti-accent px-4 py-2 rounded-full text-sm font-medium text-center">
              Offline — Your memories <br/>are still available
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
