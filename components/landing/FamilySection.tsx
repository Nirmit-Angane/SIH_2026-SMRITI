"use client";

import { motion } from "framer-motion";

export default function FamilySection() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* Decorative large organic shape */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-smriti-primary/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-8 border-white shadow-xl overflow-hidden mx-auto mb-8 relative">
             {/* Note: Using a placeholder avatar, in real prod this would be a warm family photo */}
             <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop" alt="Elderly person smiling" className="w-full h-full object-cover" />
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-smriti-text mb-8 leading-tight"
        >
          Technology should <span className="text-smriti-primary">bring people closer.</span>
        </motion.h2>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-xl md:text-2xl text-smriti-muted mb-6 leading-relaxed max-w-2xl mx-auto"
        >
          From a familiar face to a familiar story, Smriti turns everyday memories into opportunities for connection.
        </motion.p>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg font-bold text-smriti-accent tracking-wide uppercase"
        >
          Made for moments shared between generations.
        </motion.p>

      </div>
    </section>
  );
}
