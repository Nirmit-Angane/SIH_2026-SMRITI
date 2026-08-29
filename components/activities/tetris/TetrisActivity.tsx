"use client";

import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { GameStartScreen } from "./GameStartScreen";
import { GameCompletion } from "./GameCompletion";
import { TetrisBoard } from "./TetrisBoard";
import { TetrisControls } from "./TetrisControls";
import { useInterval } from "@/hooks/useInterval";
import { db } from "@/lib/db/dexie";
import { useAuth } from "@/hooks/useAuth";
import { ArrowLeft, RotateCcw } from "lucide-react";
import Link from "next/link";

// Types
export type Cell = string | 0;

interface Tetromino {
  shape: number[][];
  color: string;
}

// Constants
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

// Standard Tetris NxN bounding boxes for perfect rotation geometry
const TETROMINOES: { [key: string]: Tetromino } = {
  I: {
    shape: [
      [0, 0, 0, 0],
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ],
    color: "bg-[#2563eb]"
  },
  J: {
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "bg-[#795548]"
  },
  L: {
    shape: [
      [0, 0, 1],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "bg-[#ffe083]"
  },
  O: {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "bg-[#ffb4ab]"
  },
  S: {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    color: "bg-[#6bff8f]"
  },
  T: {
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 0, 0],
    ],
    color: "bg-[#dbe1ff]"
  },
  Z: {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    color: "bg-[#ba1a1a]"
  }
};

const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOES[randKey];
};

// True 90-degree clockwise matrix rotation function
const rotateMatrix = (matrix: number[][]): number[][] => {
  const N = matrix.length;
  const result: number[][] = Array.from({ length: N }, () => Array(N).fill(0));
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      result[c][N - 1 - r] = matrix[r][c];
    }
  }
  return result;
};

const createEmptyBoard = () =>
  Array.from(Array(BOARD_HEIGHT), () => Array(BOARD_WIDTH).fill(0));

export function TetrisActivity() {
  const { t } = useLanguage();
  const { profile } = useAuth();
  
  const [gameState, setGameState] = useState<"start" | "playing" | "completed">("start");
  const [board, setBoard] = useState<Cell[][]>(createEmptyBoard());
  const [player, setPlayer] = useState({
    pos: { x: 0, y: 0 },
    tetromino: TETROMINOES["I"].shape,
    color: TETROMINOES["I"].color,
  });
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [lines, setLines] = useState(0);

  // Elder-friendly constants
  const NORMAL_DROP_TIME = 850; // Calm, slow pace

  const startGame = () => {
    setBoard(createEmptyBoard());
    setDropTime(NORMAL_DROP_TIME);
    resetPlayer();
    setLines(0);
    setGameState("playing");
  };

  const resetPlayer = useCallback(() => {
    const nextTetromino = randomTetromino();
    setPlayer({
      pos: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(nextTetromino.shape[0].length / 2), y: 0 },
      tetromino: nextTetromino.shape,
      color: nextTetromino.color,
    });
  }, []);

  const checkCollision = (
    playerPos: { x: number; y: number },
    pieceShape: number[][]
  ) => {
    for (let y = 0; y < pieceShape.length; y += 1) {
      for (let x = 0; x < pieceShape[y].length; x += 1) {
        if (pieceShape[y][x] !== 0) {
          const boardX = x + playerPos.x;
          const boardY = y + playerPos.y;

          // Check walls
          if (boardX < 0 || boardX >= BOARD_WIDTH || boardY >= BOARD_HEIGHT) {
            return true;
          }

          // Check collision with locked pieces (only if inside board from top)
          if (boardY >= 0 && board[boardY][boardX] !== 0) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const movePlayer = (dir: number) => {
    if (!checkCollision({ x: player.pos.x + dir, y: player.pos.y }, player.tetromino)) {
      setPlayer(prev => ({
        ...prev,
        pos: { ...prev.pos, x: prev.pos.x + dir },
      }));
    }
  };

  const rotatePlayer = () => {
    // Square 'O' does not need rotation
    if (player.tetromino.length === 2) return;

    const rotatedShape = rotateMatrix(player.tetromino);
    const originalX = player.pos.x;
    
    // Wall kick offsets: try current, +1, -1, +2, -2
    const kicks = [0, 1, -1, 2, -2];
    for (const offset of kicks) {
      if (!checkCollision({ x: originalX + offset, y: player.pos.y }, rotatedShape)) {
        setPlayer(prev => ({
          ...prev,
          pos: { ...prev.pos, x: originalX + offset },
          tetromino: rotatedShape,
        }));
        return;
      }
    }
  };

  const sweepRows = (newBoard: Cell[][]) => {
    let rowsCleared = 0;
    const sweptBoard = newBoard.reduce((ack, row) => {
      if (row.indexOf(0) === -1) {
        rowsCleared += 1;
        ack.unshift(new Array(BOARD_WIDTH).fill(0));
        return ack;
      }
      ack.push(row);
      return ack;
    }, [] as Cell[][]);

    if (rowsCleared > 0) {
      setLines(prev => prev + rowsCleared);
    }
    return sweptBoard;
  };

  const drop = () => {
    if (!checkCollision({ x: player.pos.x, y: player.pos.y + 1 }, player.tetromino)) {
      setPlayer(prev => ({
        ...prev,
        pos: { ...prev.pos, y: prev.pos.y + 1 },
      }));
    } else {
      // Check if locked near top (game over)
      if (player.pos.y <= 0) {
        setGameState("completed");
        setDropTime(null);
        handleGameComplete();
        return;
      }
      const newBoard = board.map(row => [...row]);
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const bY = y + player.pos.y;
            const bX = x + player.pos.x;
            if (bY >= 0 && bY < BOARD_HEIGHT && bX >= 0 && bX < BOARD_WIDTH) {
              newBoard[bY][bX] = player.color;
            }
          }
        });
      });
      setBoard(sweepRows(newBoard));
      resetPlayer();
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== "playing") return;
      if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
        e.preventDefault();
        movePlayer(-1);
      } else if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
        e.preventDefault();
        movePlayer(1);
      } else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
        e.preventDefault();
        drop();
      } else if (e.key === "ArrowUp" || e.key.toLowerCase() === "w" || e.key === " ") {
        e.preventDefault();
        rotatePlayer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [gameState, player, board]);

  const handleGameComplete = async () => {
    try {
      await db.gameSessions.add({
        elderId: 1,
        gameType: "tetris",
        region: profile?.region || "unknown",
        difficulty: 1,
        score: lines * 10,
        accuracy: 100,
        responseTime: 0,
        retries: 0,
        completedAt: new Date().toISOString()
      });
    } catch(e) {
      console.error(e);
    }
  };

  const renderBoard = () => {
    const displayBoard = board.map(row => [...row]);
    if (gameState === "playing") {
      player.tetromino.forEach((row, y) => {
        row.forEach((value, x) => {
          if (value !== 0) {
            const bY = y + player.pos.y;
            const bX = x + player.pos.x;
            if (bY >= 0 && bY < BOARD_HEIGHT && bX >= 0 && bX < BOARD_WIDTH) {
              displayBoard[bY][bX] = player.color;
            }
          }
        });
      });
    }
    return displayBoard;
  };

  if (gameState === "start") {
    return <GameStartScreen onBegin={startGame} />;
  }

  if (gameState === "completed") {
    return <GameCompletion linesCleared={lines} onPlayAgain={startGame} />;
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-2 flex flex-col items-center">
      
      {/* Top Bar Back Button */}
      <div className="w-full flex items-center justify-between mb-3 px-2">
        <Link 
          href="/activities"
          className="inline-flex items-center gap-2 bg-white neo-border px-3.5 py-1.5 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Activities
        </Link>

        <button
          onClick={startGame}
          className="inline-flex items-center gap-1.5 bg-white neo-border px-3 py-1.5 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5 stroke-[2.5]" /> Restart
        </button>
      </div>

      {/* Screen-Fitted 2-Column Game Area */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start justify-center gap-4 sm:gap-6 w-full px-2">
        
        {/* Left Column: Tetris Board */}
        <div className="flex flex-col items-center">
          <TetrisBoard board={renderBoard()} />
        </div>

        {/* Right Column: Score Banner + Controls + Touchpad */}
        <div className="flex flex-col items-center sm:items-start gap-3 w-full max-w-[280px]">
          
          {/* Status Header */}
          <div className="w-full bg-[#2563eb] text-white neo-border neo-shadow-sm p-3 flex justify-between items-center">
            <span className="font-display-lg text-base font-black uppercase tracking-tight">
              {t("games.tetris.title") || "Mind Puzzle"}
            </span>
            <span className="bg-[#6bff8f] text-[#002109] font-label-caps text-xs font-bold px-2.5 py-0.5 neo-border uppercase">
              Lines: {lines}
            </span>
          </div>

          {/* Controls & Touchpad */}
          <TetrisControls 
            moveLeft={() => movePlayer(-1)}
            moveRight={() => movePlayer(1)}
            moveDown={() => drop()}
            rotate={() => rotatePlayer()}
            disabled={gameState !== "playing"}
          />
        </div>

      </div>
    </div>
  );
}
