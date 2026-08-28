"use client";

import { useState, useCallback, useEffect } from "react";
import { useLanguage } from "@/components/LanguageProvider";
import { GameStartScreen } from "./GameStartScreen";
import { GameCompletion } from "./GameCompletion";
import { TetrisBoard } from "./TetrisBoard";
import { TetrisControls } from "./TetrisControls";
import { useInterval } from "@/hooks/useInterval";
import { motion } from "framer-motion";
import { db } from "@/lib/db/dexie";
import { useAuth } from "@/hooks/useAuth";

// Types
export type Cell = string | 0;

interface Tetromino {
  shape: number[][];
  color: string;
}

// Constants
const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

// SMRITI Tetrominoes
const TETROMINOES: { [key: string]: Tetromino } = {
  I: { shape: [[1, 1, 1, 1]], color: "bg-smriti-primary" },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: "bg-smriti-secondary" },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: "bg-smriti-accent" },
  O: { shape: [[1, 1], [1, 1]], color: "bg-[#eab308]" }, // Yellow-ish
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: "bg-[#22c55e]" }, // Green
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: "bg-[#a855f7]" }, // Purple
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: "bg-[#ef4444]" }  // Red
};

const randomTetromino = () => {
  const keys = Object.keys(TETROMINOES);
  const randKey = keys[Math.floor(Math.random() * keys.length)];
  return TETROMINOES[randKey];
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
  const NORMAL_DROP_TIME = 800; // Calm, slow pace
  const FAST_DROP_TIME = 100; // Still reasonable when holding down

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
    playerState: { pos: { x: number; y: number }; tetromino: number[][] },
    boardState: Cell[][],
    moveX: number,
    moveY: number
  ) => {
    for (let y = 0; y < playerState.tetromino.length; y += 1) {
      for (let x = 0; x < playerState.tetromino[y].length; x += 1) {
        // Check that we're on an actual Tetromino cell
        if (playerState.tetromino[y][x] !== 0) {
          if (
            // Check movement is inside game area bounds (y)
            !boardState[y + playerState.pos.y + moveY] ||
            // Check movement is inside game area bounds (x)
            boardState[y + playerState.pos.y + moveY][x + playerState.pos.x + moveX] === undefined ||
            // Check that cell isn't set to clear
            boardState[y + playerState.pos.y + moveY][x + playerState.pos.x + moveX] !== 0
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const updatePlayerPos = ({ x, y, collided }: { x: number; y: number; collided: boolean }) => {
    setPlayer(prev => ({
      ...prev,
      pos: { x: (prev.pos.x += x), y: (prev.pos.y += y) },
    }));

    if (collided) {
      setDropTime(null); // Pause drop while locking
      
      setBoard(prev => {
        const newBoard = prev.map(row => [...row]);
        player.tetromino.forEach((row, y) => {
          row.forEach((value, x) => {
            if (value !== 0) {
              const bY = y + player.pos.y;
              const bX = x + player.pos.x;
              // Add bounds check just in case
              if (bY >= 0 && bY < BOARD_HEIGHT && bX >= 0 && bX < BOARD_WIDTH) {
                  newBoard[bY][bX] = player.color;
              }
            }
          });
        });

        // Clear lines
        const sweepLines = (board: Cell[][]) => {
          return board.reduce((acc: Cell[][], row) => {
            // If row contains no 0s, it's a full line
            if (row.findIndex(cell => cell === 0) === -1) {
              setLines(prev => prev + 1);
              acc.unshift(new Array(BOARD_WIDTH).fill(0));
              return acc;
            }
            acc.push(row);
            return acc;
          }, []);
        };

        const clearedBoard = sweepLines(newBoard);
        
        // Elder-friendly: Instead of game over, if board is full (blocks in top row), 
        // we just celebrate their effort and end the session gently.
        let boardFull = false;
        for (let i = 0; i < BOARD_WIDTH; i++) {
          if (clearedBoard[0][i] !== 0) {
            boardFull = true;
            break;
          }
        }

        if (boardFull) {
          handleGameCompletion();
        } else {
          resetPlayer();
          setDropTime(NORMAL_DROP_TIME);
        }
        
        return clearedBoard;
      });
    }
  };

  const movePlayer = (dir: number) => {
    if (!checkCollision(player, board, dir, 0)) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const drop = () => {
    if (!checkCollision(player, board, 0, 1)) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  const rotatePlayer = () => {
    const clonedPlayer = JSON.parse(JSON.stringify(player));
    // Transpose and reverse
    clonedPlayer.tetromino = clonedPlayer.tetromino[0].map((_: any, index: number) =>
      clonedPlayer.tetromino.map((row: any) => row[index]).reverse()
    );

    // Wall kick logic (basic)
    const pos = clonedPlayer.pos.x;
    let offset = 1;
    while (checkCollision(clonedPlayer, board, 0, 0)) {
      clonedPlayer.pos.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > clonedPlayer.tetromino[0].length) {
        clonedPlayer.pos.x = pos; // Revert
        return;
      }
    }
    setPlayer(clonedPlayer);
  };

  // Keyboard controls
  const move = useCallback((e: KeyboardEvent) => {
    if (gameState !== "playing") return;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      movePlayer(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      movePlayer(1);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      drop();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      rotatePlayer();
    }
  }, [gameState, player, board]);

  useEffect(() => {
    document.addEventListener("keydown", move);
    return () => {
      document.removeEventListener("keydown", move);
    };
  }, [move]);

  useInterval(() => {
    drop();
  }, dropTime);

  const handleGameCompletion = async () => {
    setGameState("completed");
    setDropTime(null);
    try {
      await db.gameSessions.add({
        elderId: 1, // MVP default
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

  // Render logic
  // We composite the player on top of the board for rendering only
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
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="w-full max-w-5xl mx-auto px-4 py-2 md:py-6 flex flex-col items-center"
    >
      <div className="w-full max-w-[300px] flex justify-between items-center mb-4 px-2">
        <span className="text-xl font-bold text-smriti-text">
          {t("games.tetris.title") || "Tetris"}
        </span>
        <span className="text-sm font-bold text-smriti-primary bg-smriti-primary/10 px-4 py-2 rounded-full">
          Lines: {lines}
        </span>
      </div>

      <TetrisBoard board={renderBoard()} />

      <TetrisControls 
        moveLeft={() => movePlayer(-1)}
        moveRight={() => movePlayer(1)}
        moveDown={() => drop()}
        rotate={() => rotatePlayer()}
        disabled={gameState !== "playing"}
      />
    </motion.div>
  );
}
