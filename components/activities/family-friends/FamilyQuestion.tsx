"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";
import { FamilyMember } from "@/lib/db/dexie";
import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface FamilyQuestionProps {
  member: FamilyMember;
  options: FamilyMember[];
  onAnswer: (correct: boolean) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

export function FamilyQuestion({ 
  member, 
  options, 
  onAnswer,
  currentQuestionIndex,
  totalQuestions
}: FamilyQuestionProps) {
  const { t } = useLanguage();
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<FamilyMember | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    // Reset state for new question
    setSelectedAnswer(null);
    setIsAnswered(false);
    
    // Generate object URL for the photo
    if (member.photoBlob) {
      const url = URL.createObjectURL(member.photoBlob);
      setPhotoUrl(url);
      
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [member]);

  const handleOptionClick = (option: FamilyMember) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    setIsAnswered(true);
  };

  const handleContinue = () => {
    if (selectedAnswer) {
      onAnswer(selectedAnswer.id === member.id);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="flex flex-col items-center justify-start min-h-[70vh] w-full max-w-2xl mx-auto px-4 py-8"
    >
      {/* Top Bar / Progress */}
      <div className="w-full flex justify-between items-center mb-8 px-2">
        <span className="text-sm font-bold text-smriti-muted uppercase tracking-wider">
          {t("games.familyRecognition.whoIsThis") || "Who is this?"}
        </span>
        <span className="text-sm font-bold text-smriti-muted">
          {currentQuestionIndex + 1} / {totalQuestions}
        </span>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col items-center">
        {photoUrl && (
          <motion.div 
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-[32px] overflow-hidden border-4 border-smriti-primary/10 shadow-lg mb-10"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={photoUrl} 
              alt="Family Member" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Feedback Area (only visible after answering) */}
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mb-8 text-center"
          >
            {selectedAnswer?.id === member.id ? (
              <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-6 flex flex-col items-center gap-3">
                <CheckCircle2 className="w-10 h-10 text-green-600" />
                <p className="text-xl font-bold">
                  {t("games.familyRecognition.correctFeedback", { name: member.name }) || `That's right. You recognized ${member.name}.`}
                </p>
              </div>
            ) : (
              <div className="bg-orange-50 border border-orange-200 text-orange-800 rounded-2xl p-6 flex flex-col items-center gap-3">
                <AlertCircle className="w-10 h-10 text-orange-600" />
                <p className="text-xl font-bold">
                  {t("games.familyRecognition.incorrectFeedback", { name: member.name, relation: member.relationship }) || `That's okay. This is ${member.name} — your ${member.relationship}.`}
                </p>
              </div>
            )}
            
            <button 
              onClick={handleContinue}
              className="mt-6 bg-smriti-text text-smriti-bg px-10 py-4 rounded-full font-bold text-xl hover:scale-105 active:scale-95 transition-all shadow-md touch-target"
            >
              {t("games.familyRecognition.continue") || "Continue"}
            </button>
          </motion.div>
        )}

        {/* Answer Options */}
        {!isAnswered && (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
            {options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option)}
                className="bg-smriti-surface border-2 border-smriti-border p-6 rounded-2xl text-xl font-bold text-smriti-text hover:border-smriti-primary hover:bg-smriti-primary/5 transition-all touch-target text-center shadow-sm"
              >
                {option.name}
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
