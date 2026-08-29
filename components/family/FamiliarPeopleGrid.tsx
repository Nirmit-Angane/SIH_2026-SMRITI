"use client";

import { Plus, Users, UserCircle2, Edit3 } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FamilyMember } from "@/lib/db/dexie";
import { useState, useEffect } from "react";
import { AddPersonModal } from "@/components/family/AddPersonModal";
import { useLanguage } from "@/components/LanguageProvider";

export function FamiliarPeopleGrid() {
  const { t } = useLanguage();
  const elderId = 1;
  
  const people = useLiveQuery(() => db.familyMembers.where({ elderId }).toArray(), [elderId]);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<FamilyMember | null>(null);
  const [objectUrls, setObjectUrls] = useState<Record<number, string>>({});

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
    <section className="w-full mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-headline-lg text-xl sm:text-2xl font-black text-[#1a1c1c] uppercase border-b-[4px] border-[#1a1c1c] pb-1">
          Familiar Faces ({people?.length || 0})
        </h2>
        
        <button 
          onClick={handleAddClick}
          className="flex items-center gap-1.5 bg-[#2563eb] text-white px-4 py-2 neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] active:translate-y-[3px] active:translate-x-[3px] active:shadow-none transition-all font-label-caps uppercase text-xs font-bold cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>{t("family.addPerson") || "Add Person"}</span>
        </button>
      </div>

      {people === undefined ? (
        <div className="flex justify-center p-8">
          <div className="w-10 h-10 border-[4px] border-[#2563eb] border-t-transparent animate-spin"></div>
        </div>
      ) : people.length === 0 ? (
        <div className="bg-[#ffe083] neo-border neo-shadow p-6 sm:p-8 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-white neo-border flex items-center justify-center mb-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Users className="w-8 h-8 text-[#231b00]" />
          </div>
          <h3 className="font-display-lg text-xl font-black uppercase text-[#231b00] mb-1">No Family Members Added Yet</h3>
          <p className="font-body-md text-xs sm:text-sm text-[#4e3d00] max-w-sm mb-4">
            Add photos, names, and relationships so Smriti can create personalized cognitive memory games.
          </p>
          <button 
            onClick={handleAddClick}
            className="flex items-center gap-1.5 bg-[#2563eb] text-white px-6 py-3 neo-border shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-label-caps text-xs uppercase font-bold cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Add Someone Now</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4">
          {people.map((person) => (
            <div 
              key={person.id} 
              onClick={() => handleEditClick(person)}
              className="flex flex-col items-center p-3.5 sm:p-4 bg-white neo-border neo-shadow-sm transition-all hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-pointer group text-center relative"
            >
              {/* Photo Frame */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-[#dbe1ff] neo-border mb-3 flex items-center justify-center overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                {person.id && objectUrls[person.id] ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={objectUrls[person.id]} alt={person.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <UserCircle2 className="w-12 h-12 text-[#00174b]" />
                )}
              </div>
              
              <h3 className="font-display-lg text-base sm:text-lg font-black uppercase text-[#1a1c1c] mb-1 group-hover:text-[#004ac6] transition-colors truncate w-full">
                {person.name}
              </h3>
              <span className="bg-[#6bff8f] text-[#002109] text-[10px] font-label-bold px-2 py-0.5 neo-border uppercase mb-2">
                {person.relationship}
              </span>
              
              <div className="mt-auto pt-2 border-t border-[#1a1c1c] w-full flex items-center justify-center gap-1 text-[10px] font-label-bold uppercase text-[#434655] group-hover:text-[#004ac6]">
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal is mounted here */}
      <AddPersonModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        existingPerson={selectedPerson}
      />
    </section>
  );
}
