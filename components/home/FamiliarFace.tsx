"use client";

import Link from "next/link";
import { UserCircle2, UserPlus, Heart, ArrowRight } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FamilyMember } from "@/lib/db/dexie";
import { useState, useEffect, useMemo } from "react";
import { useLanguage } from "@/components/LanguageProvider";

export function FamiliarFace() {
  const { t } = useLanguage();
  const elderId = 1;

  const familyMembers = useLiveQuery(
    () => db.familyMembers.where({ elderId }).toArray(),
    [elderId]
  );

  const featuredPerson = useMemo<FamilyMember | null>(() => {
    if (!familyMembers || familyMembers.length === 0) return null;
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
    );
    return familyMembers[dayOfYear % familyMembers.length];
  }, [familyMembers]);

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

  if (familyMembers === undefined) {
    return (
      <section className="w-full mb-12 animate-pulse">
        <div className="h-6 w-48 bg-gray-300 mb-4" />
        <div className="h-28 bg-white neo-border" />
      </section>
    );
  }

  if (!featuredPerson) {
    return (
      <section className="w-full mb-12">
        <h3 className="font-headline-lg text-2xl sm:text-3xl font-black text-[#1a1c1c] uppercase mb-4 border-b-[4px] border-[#1a1c1c] pb-1 inline-block">
          Care Circle Spotlight
        </h3>
        
        <Link 
          href="/family" 
          className="block bg-[#ffe083] neo-border neo-shadow neo-shadow-hover p-6 group text-left transition-all"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white neo-border flex items-center justify-center shrink-0 text-[#231b00]">
                <Heart className="w-8 h-8 fill-current" />
              </div>
              <div>
                <h4 className="font-headline-lg text-xl sm:text-2xl font-black uppercase text-[#231b00]">No family members added yet</h4>
                <p className="font-body-md text-sm sm:text-base text-[#4e3d00]">Add photos, relations, and voices to see familiar faces here</p>
              </div>
            </div>
            
            <span className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563eb] text-white neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-label-caps uppercase text-sm shrink-0">
              <UserPlus className="w-4 h-4" />
              Add Family
            </span>
          </div>
        </Link>
      </section>
    );
  }

  return (
    <section className="w-full mb-12">
      <h3 className="font-headline-lg text-2xl sm:text-3xl font-black text-[#1a1c1c] uppercase mb-4 border-b-[4px] border-[#1a1c1c] pb-1 inline-block">
        Care Circle Spotlight
      </h3>
      
      <Link 
        href="/family" 
        className="block bg-white neo-border neo-shadow neo-shadow-hover p-6 group transition-all"
      >
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 bg-[#dbe1ff] neo-border flex items-center justify-center shrink-0 overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {photoUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img 
                src={photoUrl} 
                alt={featuredPerson.name} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <UserCircle2 className="w-14 h-14 text-[#00174b]" />
            )}
          </div>
          
          <div className="flex-grow min-w-0">
            <h4 className="font-display-lg text-2xl sm:text-3xl font-black uppercase text-[#1a1c1c] mb-1 truncate">
              {featuredPerson.name}
            </h4>
            <p className="font-body-md text-base sm:text-lg text-[#434655] mb-2 truncate">
              <span className="font-bold text-[#004ac6]">{featuredPerson.relationship}</span>
              {featuredPerson.memoryNote ? ` • "${featuredPerson.memoryNote}"` : ""}
            </p>
            <p className="font-label-bold text-sm uppercase text-[#2563eb] flex items-center gap-1 group-hover:underline">
              View Family Memory Gallery <ArrowRight className="w-4 h-4" />
            </p>
          </div>
        </div>
      </Link>
    </section>
  );
}
