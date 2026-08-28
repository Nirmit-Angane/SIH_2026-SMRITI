"use client";

import { motion } from "framer-motion";
import { User2, Plus, Users, UserCircle2 } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FamilyMember } from "@/lib/db/dexie";
import { useState, useEffect } from "react";
import { AddPersonModal } from "@/components/family/AddPersonModal";
import { useLanguage } from "@/components/LanguageProvider";

export function FamiliarPeopleGrid() {
  const { t } = useLanguage();
  const elderId = 1; // Default for now
  
  // Reactively fetch family members from IndexedDB
  const people = useLiveQuery(() => db.familyMembers.where({ elderId }).toArray(), [elderId]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<FamilyMember | null>(null);
  const [objectUrls, setObjectUrls] = useState<Record<number, string>>({});

  // Generate ObjectURLs for blobs
  useEffect(() => {
    if (!people) return;
    
    const newUrls: Record<number, string> = {};
    people.forEach(p => {
      if (p.id && p.photoBlob) {
        newUrls[p.id] = URL.createObjectURL(p.photoBlob);
      }
    });
    
    setObjectUrls(newUrls);
    
    return () => {
      // Cleanup URLs to prevent memory leaks
      Object.values(newUrls).forEach(url => URL.revokeObjectURL(url));
    };
  }, [people]);

  const handleAddClick = () => {
    setSelectedPerson(null);
    setIsModalOpen(true);
  };

  const handleEditClick = (person: FamilyMember) => {
    setSelectedPerson(person);
    setIsModalOpen(true);
  };

  return (
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 mb-16 relative"
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-smriti-text hidden md:block">Your familiar faces</h2>
        
        {/* Floating Add Button for Mobile, Standard for Desktop */}
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-2 bg-smriti-primary text-white px-6 py-3 rounded-full font-bold shadow-md hover:scale-105 active:scale-95 transition-all touch-target mx-auto md:mx-0"
        >
          <Plus className="w-5 h-5" />
          {t("family.addPerson") || "Add someone"}
        </button>
      </div>

      {people === undefined ? (
        // Loading State
        <div className="flex justify-center p-12">
          <div className="w-12 h-12 border-4 border-smriti-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : people.length === 0 ? (
        // Empty State
        <div className="bg-smriti-surface border-2 border-dashed border-smriti-border rounded-[32px] p-12 text-center flex flex-col items-center justify-center">
          <div className="w-24 h-24 bg-smriti-primary/10 rounded-full flex items-center justify-center mb-6">
            <Users className="w-12 h-12 text-smriti-primary/60" />
          </div>
          <h3 className="text-2xl font-bold text-smriti-text mb-2">{t("family.yourPeople") || "Your people"}</h3>
          <p className="text-lg text-smriti-muted max-w-md mx-auto mb-8 font-medium">
            Add familiar faces so SMRITI can help create meaningful memory activities.
          </p>
          <button 
            onClick={handleAddClick}
            className="flex items-center gap-2 bg-smriti-primary/10 text-smriti-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-smriti-primary/20 transition-colors touch-target"
          >
            <Plus className="w-6 h-6" />
            {t("family.addPerson") || "Add someone"}
          </button>
        </div>
      ) : (
        // Grid State
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {people.map((person) => (
            <motion.div 
              key={person.id}
              onClick={() => handleEditClick(person)}
              whileHover={{ scale: 1.03 }}
              className="flex flex-col items-center p-4 bg-smriti-surface border border-smriti-border rounded-[24px] shadow-sm cursor-pointer hover:border-smriti-primary/50 transition-all group"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-smriti-primary/5 mb-4 flex items-center justify-center overflow-hidden border-2 border-transparent group-hover:border-smriti-primary/30 transition-all">
                {person.id && objectUrls[person.id] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={objectUrls[person.id]} alt={person.name} className="w-full h-full object-cover" />
                ) : (
                  <UserCircle2 className="w-14 h-14 text-smriti-primary/40" />
                )}
              </div>
              <h3 className="text-xl font-bold text-smriti-text text-center group-hover:text-smriti-primary transition-colors">{person.name}</h3>
              <p className="text-sm font-medium text-smriti-muted text-center">{person.relationship}</p>
              
              <div className="mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold text-smriti-primary uppercase tracking-wider bg-smriti-primary/10 px-3 py-1 rounded-full">{t("common.edit") || "Edit"}</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal is mounted here */}
      <AddPersonModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        existingPerson={selectedPerson}
      />
    </motion.section>
  );
}
