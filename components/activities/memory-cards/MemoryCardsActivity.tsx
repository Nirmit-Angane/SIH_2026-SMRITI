"use client";

import { useState, useEffect, useRef } from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db, FamilyMember, Memory } from "@/lib/db/dexie";
import { useLanguage } from "@/components/LanguageProvider";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
import { getRegionalContent, CulturalCard } from "@/lib/regional/content";
import { GameIntro } from "./GameIntro";
import { GameResult } from "./GameResult";
import { MemoryCard, CardData } from "./MemoryCard";
import Link from "next/link";
import { ArrowRight, Image as ImageIcon } from "lucide-react";
import { motion } from "framer-motion";

type GameState = "loading" | "empty" | "intro" | "playing" | "result";
type Difficulty = "beginner" | "moderate" | "advanced";

export function MemoryCardsActivity() {
  const { t } = useLanguage();
  const { profile } = useAuth();
  
  // Use a default difficulty for MVP
  const [difficulty] = useState<Difficulty>("moderate");
  
  const elderId = 1; // Standardized for MVP

  const allFamily = useLiveQuery(() => db.familyMembers.where({ elderId }).toArray(), [elderId]);
  const allMemories = useLiveQuery(() => db.memories.where({ elderId }).toArray(), [elderId]);

  const [gameState, setGameState] = useState<GameState>("loading");
  const [cards, setCards] = useState<CardData[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [matchedIndices, setMatchedIndices] = useState<number[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  
  // Store generated object URLs to revoke them later
  const objectUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    if (allFamily === undefined || allMemories === undefined || !profile) {
      return;
    }

    const validFamily = allFamily.filter(m => m.photoBlob && m.useInGames !== false);
    
    // If no family photos, show empty state to encourage upload
    if (validFamily.length === 0) {
      setGameState("empty");
    } else {
      setGameState("intro");
    }
  }, [allFamily, allMemories, profile]);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const generateCardPool = () => {
    if (!profile || !allFamily) return;

    // Clear old URLs
    objectUrlsRef.current.forEach(url => URL.revokeObjectURL(url));
    objectUrlsRef.current = [];

    const validFamily = allFamily.filter(m => m.photoBlob && m.useInGames !== false);
    const validMemories = (allMemories || []).filter(m => m.photoBlob);
    const regionalCards = getRegionalContent(profile.region);

    let pairsNeeded = 4; // Moderate
    if (difficulty === "beginner") pairsNeeded = 2;
    if (difficulty === "advanced") pairsNeeded = 6;

    const selectedPairs: CardData[] = [];

    // Priority 1: Family
    const familyPool = [...validFamily].sort(() => Math.random() - 0.5);
    for (const member of familyPool) {
      if (selectedPairs.length >= pairsNeeded) break;
      const url = URL.createObjectURL(member.photoBlob!);
      objectUrlsRef.current.push(url);
      
      selectedPairs.push({
        id: `fam-${member.id}`,
        pairId: `fam-${member.id}`,
        imageUrl: url,
        caption: `${member.name} — ${member.relationship || "Family"}`
      });
    }

    // Priority 2: Memories
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

    // Priority 3: Regional Content (Fallback)
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

    // Duplicate to make pairs
    const gameDeck: CardData[] = [];
    selectedPairs.forEach((pair, index) => {
      gameDeck.push({ ...pair, id: `${pair.id}-A` });
      gameDeck.push({ ...pair, id: `${pair.id}-B` });
    });

    // Shuffle
    gameDeck.sort(() => Math.random() - 0.5);
    
    setCards(gameDeck);
    setFlippedIndices([]);
    setMatchedIndices([]);
    setFeedback(null);
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
        // Match!
        setFeedback(t("games.memoryCards.correctMatch") || "That's right.");
        setTimeout(() => {
          setMatchedIndices(prev => [...prev, firstIndex, secondIndex]);
          setFlippedIndices([]);
          setFeedback(null);
          setIsProcessing(false);
          
          // Check win condition
          if (matchedIndices.length + 2 === cards.length) {
            handleWin();
          }
        }, 1200);
      } else {
        // No match
        setFeedback(t("games.memoryCards.tryAgain") || "That's okay. Try another one.");
        setTimeout(() => {
          setFlippedIndices([]);
          setFeedback(null);
          setIsProcessing(false);
        }, 1500);
      }
    }
  };

  const handleWin = async () => {
    setGameState("result");
    
    // Save Result
    try {
      await db.gameSessions.add({
        elderId,
        gameType: "memory-cards",
        region: profile?.region || "unknown",
        difficulty: cards.length / 2, // pairs
        score: cards.length / 2,
        accuracy: 100, // naive accuracy for MVP
        responseTime: 0,
        retries: 0,
        completedAt: new Date().toISOString()
      });
    } catch(e) {
      console.error(e);
    }
  };

  if (gameState === "loading") {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-smriti-primary">
        <Loader2 className="w-12 h-12 animate-spin mb-4" />
        <p className="text-xl font-bold">{t("games.memoryCards.loading") || "Gathering familiar pictures..."}</p>
      </div>
    );
  }

  if (gameState === "empty") {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-2xl mx-auto px-4 text-center"
      >
        <div className="bg-smriti-surface border border-smriti-border rounded-[32px] p-8 md:p-12 shadow-sm w-full">
          <div className="w-24 h-24 bg-smriti-primary/10 rounded-full flex items-center justify-center mb-6 mx-auto">
            <ImageIcon className="w-12 h-12 text-smriti-primary/60" />
          </div>
          <h2 className="text-3xl font-extrabold text-smriti-text mb-4">
            {t("games.memoryCards.emptyTitle") || "Add a few family photos to make this activity more personal."}
          </h2>
          <Link 
            href="/family"
            className="mt-8 inline-flex items-center justify-center gap-3 bg-smriti-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-smriti-primary/90 transition-colors touch-target"
          >
            {t("games.memoryCards.goToFamily") || "Go to Family"}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>
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

  // PLAYING STATE
  const gridCols = cards.length <= 4 ? "grid-cols-2" : cards.length <= 8 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3 md:grid-cols-4";

  return (
    <motion.div 
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="w-full max-w-5xl mx-auto px-4 py-6"
    >
      <div className="w-full flex justify-between items-center mb-8 px-2">
        <span className="text-sm font-bold text-smriti-muted uppercase tracking-wider">
          {t("games.memoryCards.findMatching") || "Find the matching pictures."}
        </span>
        <span className="text-sm font-bold text-smriti-muted">
          {matchedIndices.length / 2} / {cards.length / 2}
        </span>
      </div>

      <div className={`grid ${gridCols} gap-4 md:gap-6`}>
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

      {feedback && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-smriti-surface border border-smriti-border shadow-lg rounded-full px-8 py-4 text-xl font-bold text-smriti-text z-50 whitespace-nowrap"
        >
          {feedback}
        </motion.div>
      )}
    </motion.div>
  );
}
