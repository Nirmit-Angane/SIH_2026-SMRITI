"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { FamilyMember } from "@/lib/db/dexie";
import { useState, useEffect } from "react";
import { CheckCircle2, AlertCircle, ArrowRight, UserCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface FamilyQuestionProps {
  member: FamilyMember;
  options: FamilyMember[];
  onAnswer: (correct: boolean) => void;
  currentQuestionIndex: number;
  totalQuestions: number;
}

const BUTTON_COLORS = [
  { bg: "bg-[#2563eb]", text: "text-white" },
  { bg: "bg-[#6bff8f]", text: "text-[#002109]" },
  { bg: "bg-[#FFD700]", text: "text-[#231b00]" },
  { bg: "bg-[#ffdad6]", text: "text-[#93000a]" },
];

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
    setSelectedAnswer(null);
    setIsAnswered(false);
    
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
    <div className="w-full max-w-5xl mx-auto py-2 px-2 sm:px-4 flex flex-col justify-start">
      
      {/* Top Header Row with Back Button & Progress Badge */}
      <div className="w-full flex items-center justify-between gap-3 mb-4 pb-3 border-b-2 border-[#1a1c1c]">
        <Link 
          href="/activities"
          className="inline-flex items-center gap-2 bg-white neo-border px-3.5 py-1.5 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Activities
        </Link>

        <div className="flex items-center gap-3">
          <div className="bg-[#ffe083] neo-border px-3 py-1 font-label-caps text-xs font-bold text-[#231b00] uppercase">
            Daily Exercise
          </div>
          <div className="bg-[#ba1a1a] text-white px-3 py-1 neo-border font-label-caps text-xs font-bold uppercase">
            {currentQuestionIndex + 1} / {totalQuestions}
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center mb-4">
        <h1 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] tracking-tight">
          Who Is This?
        </h1>
      </div>

      {/* 2-Column Responsive Layout: Photo on Left, Answers on Right */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full items-center">
        
        {/* Left Column: Main Photo Frame */}
        <div className="md:col-span-5 flex justify-center">
          <div className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square bg-white neo-border neo-shadow p-3">
            <div className="w-full h-full bg-[#eeeeed] neo-border-2 overflow-hidden flex items-center justify-center">
              {photoUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={photoUrl} 
                  alt="Family Member" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <UserCircle2 className="w-24 h-24 text-[#434655]/50" />
              )}
            </div>
          </div>
        </div>

        {/* Right Column: 2x2 Answer Grid or Feedback */}
        <div className="md:col-span-7 flex flex-col justify-center">
          
          {/* Feedback State */}
          {isAnswered ? (
            <div className="w-full text-center">
              {selectedAnswer?.id === member.id ? (
                <div className="bg-[#6bff8f] text-[#002109] neo-border neo-shadow p-6 flex flex-col items-center gap-3">
                  <CheckCircle2 className="w-10 h-10 text-[#006e2f]" />
                  <p className="font-display-lg text-2xl uppercase font-black">
                    {t("games.familyRecognition.correctFeedback", { name: member.name }) || `That's right! This is ${member.name}.`}
                  </p>
                </div>
              ) : (
                <div className="bg-[#ffe083] text-[#231b00] neo-border neo-shadow p-6 flex flex-col items-center gap-3">
                  <AlertCircle className="w-10 h-10 text-[#735c00]" />
                  <p className="font-display-lg text-2xl uppercase font-black">
                    {t("games.familyRecognition.incorrectFeedback", { name: member.name, relation: member.relationship }) || `This is ${member.name} — your ${member.relationship}.`}
                  </p>
                </div>
              )}
              
              <button 
                onClick={handleContinue}
                className="mt-6 w-full py-4 bg-[#2563eb] text-white neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none font-headline-lg text-xl uppercase font-black tracking-wider transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t("games.familyRecognition.continue") || "Next Person"}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>
            </div>
          ) : (
            /* 2x2 Options Grid */
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {options.map((option, index) => {
                const color = BUTTON_COLORS[index % BUTTON_COLORS.length];
                return (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    className={`${color.bg} ${color.text} neo-border neo-shadow shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:translate-x-[1px] active:translate-y-[3px] active:translate-x-[3px] active:shadow-none p-5 sm:p-6 font-display-lg text-xl sm:text-2xl font-black uppercase text-center transition-all cursor-pointer`}
                  >
                    {option.name}
                  </button>
                );
              })}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
