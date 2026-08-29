"use client";

import { Image as ImageIcon, Edit3, Calendar } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, Memory } from "@/lib/db/dexie";
import { useState, useEffect } from "react";

interface MemoryCollectionProps {
  onEditMemory: (memory: Memory) => void;
}

export function MemoryCollection({ onEditMemory }: MemoryCollectionProps) {
  const elderId = 1;
  const memories = useLiveQuery(() => db.memories.where({ elderId }).reverse().sortBy('year'), [elderId]);
  
  const [objectUrls, setObjectUrls] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!memories) return;
    
    const newUrls: Record<number, string> = {};
    memories.forEach(m => {
      if (m.id && m.photoBlob) {
        newUrls[m.id] = URL.createObjectURL(m.photoBlob);
      }
    });
    
    setObjectUrls(newUrls);
    
    return () => {
      Object.values(newUrls).forEach(url => URL.revokeObjectURL(url));
    };
  }, [memories]);

  if (!memories || memories.length === 0) return null;

  return (
    <section className="w-full mb-16">
      <h2 className="font-headline-lg text-2xl sm:text-3xl font-black text-[#1a1c1c] uppercase border-b-[4px] border-[#1a1c1c] pb-1 mb-6">
        Preserved Memories
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {memories.map((memory) => (
          <div 
            key={memory.id} 
            onClick={() => onEditMemory(memory)}
            className="bg-white neo-border neo-shadow flex flex-col cursor-pointer transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group overflow-hidden"
          >
            {/* Photo Container matching reference */}
            <div className="relative aspect-[16/10] bg-[#eeeeed] border-b-[4px] border-[#1a1c1c] overflow-hidden flex items-center justify-center">
              {memory.id && objectUrls[memory.id] ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={objectUrls[memory.id]} alt={memory.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <ImageIcon className="w-16 h-16 text-[#434655]/40" />
              )}
              <span className="absolute top-3 left-3 bg-[#6bff8f] text-[#002109] px-3 py-1 neo-border font-label-caps text-xs font-bold uppercase">
                {memory.year || "Memory"}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-6 flex flex-col justify-between flex-1">
              <div>
                <div className="flex items-center gap-2 text-xs font-label-bold text-[#434655] uppercase mb-1">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{memory.year || "Special Event"}</span>
                </div>

                <h3 className="font-display-lg text-2xl sm:text-3xl font-black uppercase text-[#1a1c1c] mb-2 group-hover:text-[#004ac6] transition-colors">
                  {memory.title}
                </h3>

                {memory.description && (
                  <p className="font-body-md text-base text-[#434655] line-clamp-2 mb-4">
                    {memory.description}
                  </p>
                )}
              </div>

              <div className="pt-4 border-t-[2px] border-[#1a1c1c] flex items-center justify-between font-label-bold text-xs uppercase text-[#2563eb]">
                <span className="flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5" /> Edit Memory
                </span>
                <span className="bg-[#dbe1ff] text-[#00174b] px-2.5 py-1 neo-border">
                  View Detail
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
