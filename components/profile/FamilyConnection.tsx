"use client";

import { motion } from "framer-motion";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/dexie";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FamilyConnection() {
  const familyCount = useLiveQuery(() => db.familyMembers.count()) || 0;

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-8"
    >
      <h2 className="text-xl font-bold text-smriti-text mb-4">Family & Care</h2>
      
      <Link 
        href="/family"
        className="block bg-smriti-surface border border-smriti-border rounded-3xl p-6 hover:border-smriti-primary/50 transition-colors shadow-sm group touch-target"
      >
        <div className="flex items-center justify-between">
          <div>
            <span className="block font-bold text-lg text-smriti-text group-hover:text-smriti-primary transition-colors">
              {familyCount === 1 ? "1 person added" : `${familyCount} people added`}
            </span>
            <span className="block text-sm text-smriti-muted mt-1">Manage familiar faces and memories</span>
          </div>
          <ArrowRight className="w-6 h-6 text-smriti-primary opacity-50 group-hover:opacity-100 transition-opacity group-hover:translate-x-1" />
        </div>
      </Link>
    </motion.section>
  );
}
