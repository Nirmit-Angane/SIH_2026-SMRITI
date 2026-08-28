"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { ArrowDown, ArrowLeft, ArrowRight, RotateCw } from "lucide-react";

interface TetrisControlsProps {
  moveLeft: () => void;
  moveRight: () => void;
  moveDown: () => void;
  rotate: () => void;
  disabled: boolean;
}

export function TetrisControls({ moveLeft, moveRight, moveDown, rotate, disabled }: TetrisControlsProps) {
  const { t } = useLanguage();

  const btnClass = "flex-1 aspect-square bg-smriti-surface border-2 border-smriti-border rounded-2xl flex flex-col items-center justify-center gap-1 active:bg-smriti-primary/10 touch-target transition-colors shadow-sm text-smriti-text";

  return (
    <div className="grid grid-cols-4 gap-2 w-full max-w-[300px] mt-6 md:hidden">
      <button 
        className={btnClass} 
        onClick={(e) => { e.preventDefault(); moveLeft(); }}
        disabled={disabled}
        aria-label={t("games.tetris.left") || "Left"}
      >
        <ArrowLeft className="w-6 h-6 text-smriti-primary" />
        <span className="text-xs font-bold">{t("games.tetris.left") || "Left"}</span>
      </button>
      
      <button 
        className={btnClass} 
        onClick={(e) => { e.preventDefault(); rotate(); }}
        disabled={disabled}
        aria-label={t("games.tetris.rotate") || "Rotate"}
      >
        <RotateCw className="w-6 h-6 text-smriti-primary" />
        <span className="text-xs font-bold">{t("games.tetris.rotate") || "Rotate"}</span>
      </button>

      <button 
        className={btnClass} 
        onClick={(e) => { e.preventDefault(); moveRight(); }}
        disabled={disabled}
        aria-label={t("games.tetris.right") || "Right"}
      >
        <ArrowRight className="w-6 h-6 text-smriti-primary" />
        <span className="text-xs font-bold">{t("games.tetris.right") || "Right"}</span>
      </button>

      <button 
        className={btnClass} 
        onClick={(e) => { e.preventDefault(); moveDown(); }}
        disabled={disabled}
        aria-label={t("games.tetris.drop") || "Drop"}
      >
        <ArrowDown className="w-6 h-6 text-smriti-primary" />
        <span className="text-xs font-bold">{t("games.tetris.drop") || "Drop"}</span>
      </button>
    </div>
  );
}
