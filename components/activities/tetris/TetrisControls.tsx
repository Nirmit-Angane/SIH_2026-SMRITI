"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { ArrowDown, ArrowLeft, ArrowRight, RotateCw, Hand } from "lucide-react";
import { useRef } from "react";

interface TetrisControlsProps {
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
  disabled: boolean;
}

export function TetrisControls({ moveLeft, moveRight, moveDown, rotate, disabled }: TetrisControlsProps) {
  const { t } = useLanguage();
  const touchStartRef = useRef<{ x: number; y: number; time: number } | null>(null);

  // Touchpad touch / pointer event handlers
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    if (disabled) return;
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;
    touchStartRef.current = { x: clientX, y: clientY, time: Date.now() };
  };

  const handleTouchEnd = (e: React.TouchEvent | React.MouseEvent) => {
    if (disabled || !touchStartRef.current) return;
    const clientX = "changedTouches" in e ? e.changedTouches[0].clientX : e.clientX;
    const clientY = "changedTouches" in e ? e.changedTouches[0].clientY : e.clientY;
    
    const deltaX = clientX - touchStartRef.current.x;
    const deltaY = clientY - touchStartRef.current.y;
    const deltaTime = Date.now() - touchStartRef.current.time;
    
    const threshold = 25; // Swipe distance threshold in pixels

    if (Math.abs(deltaX) > threshold && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX > 0) {
        moveRight();
      } else {
        moveLeft();
      }
    } else if (deltaY > threshold && Math.abs(deltaY) > Math.abs(deltaX)) {
      moveDown();
    } else if (deltaTime < 250 && Math.abs(deltaX) < 15 && Math.abs(deltaY) < 15) {
      // Short tap/click rotates
      rotate();
    }

    touchStartRef.current = null;
  };

  const btnClass = "h-14 sm:h-16 bg-white neo-border flex flex-col items-center justify-center gap-0.5 active:translate-y-[2px] active:translate-x-[2px] shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-none text-[#1a1c1c] cursor-pointer transition-all hover:bg-[#f4f4f3] disabled:opacity-50 select-none";

  return (
    <div className="flex flex-col gap-3 w-full max-w-sm">
      
      {/* 4 Large Tactile Buttons */}
      <div className="grid grid-cols-4 gap-2 w-full">
        <button 
          className={btnClass} 
          onClick={(e) => { e.preventDefault(); moveLeft(); }}
          disabled={disabled}
          title="Move Left"
        >
          <ArrowLeft className="w-6 h-6 stroke-[3] text-[#2563eb]" />
          <span className="font-label-caps text-[10px] font-bold uppercase">{t("games.tetris.left") || "Left"}</span>
        </button>
        
        <button 
          className={btnClass} 
          onClick={(e) => { e.preventDefault(); rotate(); }}
          disabled={disabled}
          title="Rotate Piece"
        >
          <RotateCw className="w-6 h-6 stroke-[3] text-[#ba1a1a]" />
          <span className="font-label-caps text-[10px] font-bold uppercase">{t("games.tetris.rotate") || "Rotate"}</span>
        </button>

        <button 
          className={btnClass} 
          onClick={(e) => { e.preventDefault(); moveRight(); }}
          disabled={disabled}
          title="Move Right"
        >
          <ArrowRight className="w-6 h-6 stroke-[3] text-[#2563eb]" />
          <span className="font-label-caps text-[10px] font-bold uppercase">{t("games.tetris.right") || "Right"}</span>
        </button>

        <button 
          className={btnClass} 
          onClick={(e) => { e.preventDefault(); moveDown(); }}
          disabled={disabled}
          title="Drop Down"
        >
          <ArrowDown className="w-6 h-6 stroke-[3] text-[#006e2f]" />
          <span className="font-label-caps text-[10px] font-bold uppercase">{t("games.tetris.drop") || "Drop"}</span>
        </button>
      </div>

      {/* Interactive Touchpad Gesture Area */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseUp={handleTouchEnd}
        className="w-full h-24 sm:h-28 bg-[#ffe083] neo-border neo-shadow-sm flex flex-col items-center justify-center p-3 cursor-grab active:cursor-grabbing select-none text-center hover:bg-[#ffd966] transition-colors"
      >
        <div className="flex items-center gap-1.5 font-label-caps text-xs font-bold uppercase text-[#231b00] mb-1">
          <Hand className="w-4 h-4 stroke-[2.5]" />
          <span>Touchpad & Gesture Zone</span>
        </div>
        <p className="font-body-md text-xs text-[#4e3d00] font-medium leading-tight">
          Swipe <strong>← / →</strong> to move • Swipe <strong>↓</strong> to drop • <strong>Tap</strong> to rotate
        </p>
      </div>

      {/* Keyboard Hint */}
      <div className="bg-[#f9f9f8] neo-border-2 p-2 text-center">
        <span className="font-label-caps text-[10px] font-bold uppercase text-[#434655]">
          Keys: ← → to Move • ↑ to Rotate • ↓ to Drop
        </span>
      </div>

    </div>
  );
}
