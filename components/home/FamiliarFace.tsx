"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { UserCircle2, UserPlus, Heart } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FamilyMember } from "@/lib/db/dexie";
import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export function FamiliarFace() {
  const { t } = useLanguage();
  const elderId = 1;

  // Reactively query real family members from IndexedDB
  const familyMembers = useLiveQuery(
    () => db.familyMembers.where({ elderId }).toArray(),
    [elderId]
  );

  // Pick a featured familiar face (rotates daily based on day of month)
  const featuredPerson = useMemo<FamilyMember | null>(() => {
    if (!familyMembers || familyMembers.length === 0) return null;
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    return familyMembers[dayOfYear % familyMembers.length];
  }, [familyMembers]);

  // Handle blob object URL for photo
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (featuredPerson?.photoBlob) {
      const url = URL.createObjectURL(featuredPerson.photoBlob);
      setPhotoUrl(url);
      return () => {
        URL.revokeObjectURL(url);
      };
    } else {
      setPhotoUrl(null);
    }
  }, [featuredPerson]);

  // Loading state
  if (familyMembers === undefined) {
    return (
      <section className="w-full max-w-2xl mx-auto px-4 mb-12 animate-pulse">
        <div className="h-6 w-48 bg-smriti-muted/20 rounded-full mb-4" />
        <div className="h-28 bg-smriti-surface border border-smriti-border rounded-3xl" />
      </section>
    );
  }

  // If no family members have been added yet
  if (!featuredPerson) {
    return (
      <motion.section 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
        className="w-full max-w-2xl mx-auto px-4 mb-12"
      >
        <h3 className="text-xl font-bold text-smriti-text mb-4">
          A familiar face for today
        </h3>
        
        <Link 
          href="/family" 
          className="block bg-smriti-surface border border-dashed border-smriti-primary/40 rounded-3xl p-6 hover:border-smriti-primary hover:bg-smriti-primary/5 transition-all touch-target group text-center"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-left">
              <div className="w-16 h-16 rounded-2xl bg-smriti-primary/10 flex items-center justify-center shrink-0 text-smriti-primary">
                <Heart className="w-8 h-8 opacity-70 group-hover:scale-110 transition-transform" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-smriti-text">No family members added yet</h4>
                <p className="text-sm text-smriti-muted">Add photos and relations to see familiar faces here</p>
              </div>
            </div>
            
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-smriti-primary text-white font-bold text-sm shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <UserPlus className="w-4 h-4" />
              Add Family
            </span>
          </div>
        </Link>
      </motion.section>
    );
  }

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      className="w-full max-w-2xl mx-auto px-4 mb-12"
    >
      <h3 className="text-xl font-bold text-smriti-text mb-4">
        A familiar face for today
      </h3>
      
      <Link 
        href="/family" 
        className="block bg-smriti-surface border border-smriti-border rounded-3xl p-4 md:p-6 hover:border-smriti-primary/40 hover:bg-smriti-primary/5 transition-colors touch-target group shadow-sm"
      >
        <div className="flex items-center gap-4 md:gap-6">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-smriti-primary/10 flex items-center justify-center shrink-0 overflow-hidden border border-smriti-border/50">
            {photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={photoUrl} 
                alt={featuredPerson.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <UserCircle2 className="w-12 h-12 text-smriti-primary opacity-60" />
            )}
          </div>
          
          <div className="flex-grow min-w-0">
            <h4 className="text-2xl font-bold text-smriti-text mb-1 truncate">
              {featuredPerson.name}
            </h4>
            <p className="text-lg text-smriti-muted mb-2 truncate">
              {featuredPerson.relationship}
              {featuredPerson.memoryNote ? ` • "${featuredPerson.memoryNote}"` : ""}
            </p>
            <p className="text-sm font-bold text-smriti-primary uppercase tracking-wider group-hover:underline flex items-center gap-1">
              See family & memories →
            </p>
          </div>
        </div>
      </Link>
    </motion.section>
  );
}
