"use client";

import { motion, useReducedMotion } from "framer-motion";
import { LayoutGrid } from "lucide-react";

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
      className="relative w-full aspect-square md:aspect-[3/4] cursor-pointer touch-target group perspective-1000"
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
          scale: isMatched ? (reduceMotion ? 1 : 1.02) : 1
        }}
        transition={{ 
          duration: reduceMotion ? 0 : 0.5,
          ease: "easeInOut"
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front of card (hidden when flipped) */}
        <div 
          className={`absolute inset-0 backface-hidden w-full h-full rounded-2xl md:rounded-[32px] 
            border-2 md:border-4 border-smriti-border bg-smriti-surface
            flex items-center justify-center shadow-sm group-hover:border-smriti-primary/50 transition-colors
            ${isFlipped || isMatched ? 'pointer-events-none' : ''}`}
        >
          <LayoutGrid className="w-10 h-10 md:w-16 md:h-16 text-smriti-primary/30" />
        </div>

        {/* Back of card (the actual image, visible when flipped) */}
        <div 
          className={`absolute inset-0 backface-hidden w-full h-full rounded-2xl md:rounded-[32px] 
            overflow-hidden shadow-md
            ${isMatched ? 'border-4 border-smriti-success ring-4 ring-smriti-success/20' : 'border-2 md:border-4 border-smriti-primary/20'}`}
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={card.imageUrl} 
            alt={card.caption || "Memory"} 
            className="w-full h-full object-cover"
            draggable={false}
          />
          
          {/* Subtle matched overlay */}
          {isMatched && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="absolute inset-0 bg-smriti-success/10 flex items-end justify-center pb-4"
            >
              {card.caption && (
                <span className="bg-black/60 text-white px-3 py-1.5 rounded-full text-xs md:text-sm font-medium backdrop-blur-sm">
                  {card.caption}
                </span>
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
