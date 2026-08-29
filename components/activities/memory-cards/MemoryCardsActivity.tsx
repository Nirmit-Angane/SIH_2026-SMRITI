"use client";

import { useState, useEffect, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/dexie";
import { useLanguage } from "@/components/LanguageProvider";
import { useAuth } from "@/hooks/useAuth";
import { getRegionalContent } from "@/lib/regional/content";
import { GameIntro } from "./GameIntro";
import { GameResult } from "./GameResult";
import { MemoryCard, CardData } from "./MemoryCard";
import Link from "next/link";
import { ArrowRight, RotateCcw, Clock, Sparkles, ArrowLeft } from "lucide-react";

type GameState = "loading" | "empty" | "intro" | "playing" | "result";
type Difficulty = "beginner" | "moderate" | "advanced";

export function MemoryCardsActivity() {
  const { t } = useLanguage();
  const { profile } = useAuth();
  
  const [difficulty] = useState<Difficulty>("moderate");
  const elderId = 1;

  const allFamily = useLiveQuery(() => db.familyMembers.where({ elderId }).toArray(), [elderId]);
  const allMemories = useLiveQuery(() => db.memories.where({ elderId }).toArray(), [elderId]);

  const [gameState, setGameState] = useState<GameState>("loading");
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [seconds, setSeconds] = useState(0);
  
  const objectUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    if (allFamily === undefined || allMemories === undefined || !profile) {
      return;
    }

    const validFamily = allFamily.filter(m => m.photoBlob && m.useInGames !== false);
    
    if (validFamily.length === 0 && (!allMemories || allMemories.length === 0)) {
      setGameState("empty");
    } else {
      setGameState("intro");
    }
  }, [allFamily, allMemories, profile]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (gameState === "playing") {
      timer = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameState]);

  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const generateCardPool = () => {
    if (!profile || !allFamily) return;

    objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];

    const validFamily = allFamily.filter(m => m.photoBlob && m.useInGames !== false);
    const validMemories = (allMemories || []).filter(m => m.photoBlob);
    const regionalCards = getRegionalContent(profile.region);

    let pairsNeeded = 4; // Moderate
    if (difficulty === "beginner") pairsNeeded = 2;
    if (difficulty === "advanced") pairsNeeded = 6;

    const selectedPairs: CardData[] = [];

    const familyPool = [...validFamily].sort(() => Math.random() - 0.5);
    for (const member of familyPool) {
      if (selectedPairs.length >= pairsNeeded) break;
      const url = URL.createObjectURL(member.photoBlob!);
      objectUrlsRef.current.push(url);
      
      selectedPairs.push({
        id: `fam-${member.id}`,
        pairId: `fam-${member.id}`,
        imageUrl: url,
        caption: `${member.name} (${member.relationship || "Family"})`
      });
    }

    const memoryPool = [...validMemories].sort(() => Math.random() - 0.5);
    for (const mem of memoryPool) {
      if (selectedPairs.length >= pairsNeeded) break;
      const url = URL.createObjectURL(mem.photoBlob!);
      objectUrlsRef.current.push(url);
      
      selectedPairs.push({
        id: `mem-${mem.id}`,
        pairId: `mem-${mem.id}`,
        imageUrl: url,
        caption: mem.title || "Familiar Memory"
      });
    }

    const regionalPool = [...regionalCards].sort(() => Math.random() - 0.5);
    for (const reg of regionalPool) {
      if (selectedPairs.length >= pairsNeeded) break;
      selectedPairs.push({
        id: `reg-${reg.id}`,
        pairId: `reg-${reg.id}`,
        imageUrl: reg.imageUrl,
        caption: reg.name
      });
    }

    const gameDeck: CardData[] = [];
    selectedPairs.forEach((pair) => {
      gameDeck.push({ ...pair, id: `${pair.id}-A` });
      gameDeck.push({ ...pair, id: `${pair.id}-B` });
    });

    gameDeck.sort(() => Math.random() - 0.5);
    
    setCards(gameDeck);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setFeedback(null);
    setSeconds(0);
    setGameState("playing");
  };

  const handleCardClick = (index: number) => {
    if (isProcessing || flippedIndices.includes(index) || matchedIndices.includes(index)) {
      return;
    }

    const newFlipped = [...flippedIndices, index];
    setFlippedIndices(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const [firstIndex, secondIndex] = newFlipped;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.pairId === secondCard.pairId) {
        setFeedback(t("games.memoryCards.correctMatch") || "That's right! A match!");
        setTimeout(() => {
          setMatchedIndices(prev => [...prev, firstIndex, secondIndex]);
          setFlippedIndices([]);
          setFeedback(null);
          setIsProcessing(false);
          
          if (matchedIndices.length + 2 === cards.length) {
            handleWin();
          }
        }, 1000);
      } else {
        setFeedback(t("games.memoryCards.tryAgain") || "Keep looking! Try another pair.");
        setTimeout(() => {
          setFlippedIndices([]);
          setFeedback(null);
          setIsProcessing(false);
        }, 1200);
      }
    }
  };

  const handleWin = async () => {
    setGameState("result");
    try {
      await db.gameSessions.add({
        elderId,
        gameType: "memory-cards",
        region: profile?.region || "unknown",
        difficulty: cards.length / 2,
        score: cards.length / 2,
        accuracy: 100,
        responseTime: seconds,
        retries: 0,
        completedAt: new Date().toISOString()
      });
    } catch(e) {
      console.error(e);
    }
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (gameState === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="w-12 h-12 border-[4px] border-[#2563eb] border-t-transparent animate-spin mb-4"></div>
        <p className="font-headline-lg text-xl uppercase font-black">{t("games.memoryCards.loading") || "Gathering familiar pictures..."}</p>
      </div>
    );
  }

  if (gameState === "empty") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto px-4 text-center">
        <div className="bg-[#ffe083] neo-border neo-shadow p-8 md:p-12 w-full">
          <div className="w-20 h-20 bg-white neo-border flex items-center justify-center mb-6 mx-auto">
            <Sparkles className="w-10 h-10 text-[#735c00]" />
          </div>
          <h2 className="font-display-lg text-3xl font-black uppercase text-[#231b00] mb-4">
            Add Family Photos
          </h2>
          <p className="font-body-md text-base sm:text-lg text-[#4e3d00] mb-8">
            Add pictures and stories to your memory bank to unlock personalized matching games!
          </p>
          <Link 
            href="/family"
            className="inline-flex items-center justify-center gap-3 bg-[#2563eb] text-white px-8 py-4 neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-label-caps text-sm uppercase font-bold"
          >
            <span>Go to Memory Bank</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  if (gameState === "intro") {
    let count = 8;
    if (difficulty === "beginner") count = 4;
    if (difficulty === "advanced") count = 12;

    return <GameIntro onBegin={generateCardPool} difficulty={difficulty} cardCount={count} />;
  }

  if (gameState === "result") {
    return <GameResult pairsFound={cards.length / 2} onPlayAgain={generateCardPool} />;
  }

  // PLAYING STATE matching game_regional_memory_premium_retro reference
  const gridCols = cards.length <= 4 ? "grid-cols-2" : cards.length <= 8 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3 sm:grid-cols-4";

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-4">
      
      {/* Top Bar Back Button */}
      <div className="w-full flex items-center justify-start mb-4">
        <Link 
          href="/activities"
          className="inline-flex items-center gap-2 bg-white neo-border px-4 py-2 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Activities
        </Link>
      </div>

      {/* Header Banner */}
      <div className="bg-[#2563eb] text-white neo-border neo-shadow p-4 sm:p-6 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <span className="bg-[#00FF41] text-[#000000] neo-border px-3 py-0.5 font-label-caps text-xs font-bold uppercase mb-1 inline-block">
            Culture & Heritage
          </span>
          <h1 className="font-display-lg text-2xl sm:text-3xl font-black uppercase tracking-tight">
            Regional Memory Match
          </h1>
        </div>

        {/* Status Chips */}
        <div className="flex items-center gap-3 font-label-caps text-xs sm:text-sm font-bold">
          <div className="bg-[#ffe083] text-[#231b00] neo-border px-4 py-2 flex items-center gap-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <Clock className="w-4 h-4" />
            <span>Time: {formatTime(seconds)}</span>
          </div>
          <div className="bg-[#6bff8f] text-[#002109] neo-border px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            Pairs: {matchedIndices.length / 2} / {cards.length / 2}
          </div>
        </div>
      </div>

      {/* 3D Flip Card Grid */}
      <div className={`grid ${gridCols} gap-4 sm:gap-6 mb-8`}>
        {cards.map((card, index) => (
          <MemoryCard 
            key={`${card.id}-${index}`}
            card={card}
            isFlipped={flippedIndices.includes(index)}
            isMatched={matchedIndices.includes(index)}
            onClick={() => handleCardClick(index)}
            disabled={isProcessing}
          />
        ))}
      </div>

      {/* Controls & Restart */}
      <div className="flex justify-center mt-6">
        <button
          onClick={generateCardPool}
          className="bg-[#ba1a1a] text-white px-8 py-3.5 neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none font-label-caps uppercase text-sm font-bold flex items-center gap-2 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart Game</span>
        </button>
      </div>

      {/* Feedback Toast */}
      {feedback && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-white text-[#1a1c1c] neo-border neo-shadow px-8 py-4 font-headline-lg text-xl uppercase font-black z-50 animate-bounce">
          {feedback}
        </div>
      )}
    </div>
  );
}
