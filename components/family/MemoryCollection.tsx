"use client";

import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, Memory } from "@/lib/db/dexie";
import { useState, useEffect } from "react";

interface MemoryCollectionProps {
  onEditMemory: (memory: Memory) => void;
}

export function MemoryCollection({ onEditMemory }: MemoryCollectionProps) {
  const elderId = 1; // Default
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
    <motion.section 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto px-4 mb-16"
    >
      <h2 className="text-2xl font-extrabold text-smriti-text mb-6">Memories together</h2>
      
      <div className="flex flex-col gap-6">
        {memories.map((memory) => (
          <div 
            key={memory.id} 
            onClick={() => onEditMemory(memory)}
            className="flex flex-col md:flex-row gap-6 p-4 md:p-6 bg-smriti-surface border border-smriti-border rounded-[24px] cursor-pointer hover:border-smriti-primary/50 transition-all group shadow-sm"
          >
            <div className="w-full md:w-64 h-48 bg-smriti-primary/5 rounded-[16px] flex items-center justify-center shrink-0 overflow-hidden border-2 border-transparent group-hover:border-smriti-primary/30 transition-all">
               {memory.id && objectUrls[memory.id] ? (
                 // eslint-disable-next-line @next/next/no-img-element
                 <img src={objectUrls[memory.id]} alt={memory.title} className="w-full h-full object-cover" />
               ) : (
                 <ImageIcon className="w-12 h-12 text-smriti-primary/30" />
               )}
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-bold text-smriti-text mb-2 group-hover:text-smriti-primary transition-colors">{memory.title}</h3>
              <p className="text-xl text-smriti-muted font-medium mb-3">{memory.year}</p>
              {memory.description && (
                <p className="text-smriti-text/80 line-clamp-3">{memory.description}</p>
              )}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-xs font-bold text-smriti-primary uppercase tracking-wider bg-smriti-primary/10 px-3 py-1 rounded-full">Edit Memory</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
