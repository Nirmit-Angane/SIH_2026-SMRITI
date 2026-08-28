"use client";

import { memo } from "react";
import { Cell } from "./TetrisActivity";

interface TetrisBoardProps {
  board: Cell[][];
}

export const TetrisBoard = memo(function TetrisBoard({ board }: TetrisBoardProps) {
  return (
    <div className="bg-smriti-surface border-4 border-smriti-border rounded-xl p-2 w-full max-w-[300px] aspect-[1/2] shadow-inner">
      <div 
        className="w-full h-full grid gap-[1px]"
        style={{
          gridTemplateColumns: `repeat(${board[0].length}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${board.length}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`w-full h-full rounded-sm transition-colors ${
                cell !== 0 ? `${cell} shadow-sm border border-black/10` : 'bg-smriti-bg border border-smriti-border/30'
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
});
