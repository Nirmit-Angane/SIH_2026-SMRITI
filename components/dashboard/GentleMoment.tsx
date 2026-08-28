"use client";

import { motion } from "framer-motion";

export function GentleMoment() {
  return (
    <motion.section 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.8 }}
      className="text-center py-16 mt-8 border-t border-smriti-border/30"
    >
      <h3 className="text-xl font-bold text-smriti-text/70 mb-2">A gentle moment</h3>
      <p className="text-lg text-smriti-muted italic">Take your time. There is no rush.</p>
    </motion.section>
  );
}
