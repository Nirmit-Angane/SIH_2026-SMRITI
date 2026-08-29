"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

export interface CardData {
  id: string;
  pairId: string;
  imageUrl: string;
  caption: string;
}

interface MemoryCardProps {
  card: CardData;
  isFlipped: boolean;
  isMatched: boolean;
  onClick: () => void;
  disabled: boolean;
}

export function MemoryCard({ card, isFlipped, isMatched, onClick, disabled }: MemoryCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div 
      className="relative w-full aspect-[3/4] cursor-pointer group perspective-1000 select-none"
      onClick={() => {
        if (!disabled && !isFlipped && !isMatched) {
          onClick();
        }
      }}
    >
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ 
          rotateY: isFlipped || isMatched ? 180 : 0,
          scale: isMatched ? 1.02 : 1
        }}
        transition={{ 
          duration: reduceMotion ? 0 : 0.4,
          ease: "easeInOut"
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card (Yellow Neobrutalist card back with 4px border & 8px shadow) */}
        <div 
          className={`absolute inset-0 backface-hidden w-full h-full bg-[#ffe083] neo-border neo-shadow flex flex-col items-center justify-center p-4 transition-all group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]
            ${isFlipped || isMatched ? 'pointer-events-none' : ''}`}
        >
          <div className="w-12 h-12 rounded-full bg-white neo-border flex items-center justify-center text-[#735c00] mb-2">
            <Sparkles className="w-6 h-6 stroke-[2.5]" />
          </div>
          <span className="font-headline-lg text-sm sm:text-base uppercase font-black tracking-wider text-[#231b00]">
            Smriti
          </span>
        </div>

        {/* Back of card (Image reveal when flipped) */}
        <div 
          className={`absolute inset-0 backface-hidden w-full h-full bg-white neo-border overflow-hidden
            ${isMatched ? 'neo-shadow border-[#006e2f] ring-4 ring-[#6bff8f]' : 'neo-shadow'}`}
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={card.imageUrl} 
            alt={card.caption || "Memory"} 
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          {card.caption && (
            <div className="absolute bottom-0 inset-x-0 bg-[#1a1c1c]/90 text-white p-2 text-center">
              <span className="font-label-caps text-xs font-bold uppercase truncate block">
                {card.caption}
              </span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
