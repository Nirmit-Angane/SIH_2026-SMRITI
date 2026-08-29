"use client";

import { memo } from "react";
import { Cell } from "./TetrisActivity";

interface TetrisBoardProps {
  board: Cell[][];
}

export const TetrisBoard = memo(function TetrisBoard({ board }: TetrisBoardProps) {
  return (
    <div className="bg-[#f4f4f3] neo-border neo-shadow p-2 w-[180px] sm:w-[210px] aspect-[1/2] shrink-0">
      <div 
        className="w-full h-full grid gap-[1px] bg-[#1a1c1c] p-[1px]"
        style={{
          gridTemplateColumns: `repeat(${board[0].length}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${board.length}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`w-full h-full transition-colors ${
                cell !== 0 ? `${cell} border border-black/30` : 'bg-white'
              }`}
            />
          ))
        )}
      </div>
    </div>
  );
});
