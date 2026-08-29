"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Leaf, Mic, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase/config";
import { useAuth } from "@/hooks/useAuth";

type PatientProfile = {
  name: string;
  region: "assam" | "arunachal-pradesh" | "manipur" | "meghalaya" | "mizoram" | "nagaland" | "tripura" | "sikkim" | "";
  supportLevel: "gentle" | "regular" | "more-support" | "";
  language: string;
  usageContext: "self" | "family" | "caregiver" | "";
  onboardingCompleted: boolean;
};

export const REGIONS = [
  { id: "assam", label: "Assam" },
  { id: "arunachal-pradesh", label: "Arunachal Pradesh" },
  { id: "manipur", label: "Manipur" },
  { id: "meghalaya", label: "Meghalaya" },
  { id: "mizoram", label: "Mizoram" },
  { id: "nagaland", label: "Nagaland" },
  { id: "tripura", label: "Tripura" },
  { id: "sikkim", label: "Sikkim" },
];

const SUPPORT_LEVELS = [
  { id: "gentle", label: "Gentle Support", desc: "I sometimes need reminders or gentle cues." },
  { id: "regular", label: "Regular Support", desc: "I often need help with names, routines and stories." },
  { id: "more-support", label: "More Support", desc: "I usually need a family member or caregiver nearby." },
];

const LANGUAGES_BY_REGION: Record<string, string[]> = {
  "assam": ["Assamese", "Hindi", "English", "Bodo", "Bengali"],
  "arunachal-pradesh": ["English", "Hindi", "Nyishi", "Adi"],
  "manipur": ["Meitei", "English", "Hindi"],
  "meghalaya": ["Khasi", "Garo", "English", "Hindi"],
  "mizoram": ["Mizo", "English", "Hindi"],
  "nagaland": ["English", "Nagamese", "Hindi"],
  "tripura": ["Bengali", "Kokborok", "English", "Hindi"],
  "sikkim": ["Nepali", "English", "Hindi", "Sikkimese", "Lepcha"],
  "": ["English", "Hindi"]
};

export default function OnboardingPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<PatientProfile>({
    name: user?.displayName || "",
    region: "assam",
    supportLevel: "gentle",
    language: "English",
    usageContext: "self",
    onboardingCompleted: false,
  });
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    if (user?.displayName && !profile.name) {
      setProfile(p => ({ ...p, name: user.displayName || "" }));
    }
  }, [user, profile.name]);

  const handleNext = () => setStep(s => Math.min(s + 1, 6));
  const handleBack = () => setStep(s => Math.max(s - 1, 1));

  const canContinue = () => {
    if (step === 1) return profile.name.trim().length > 0;
    if (step === 2) return profile.region !== "";
    if (step === 3) return profile.supportLevel !== "";
    if (step === 4) return profile.language !== "";
    if (step === 5) return profile.usageContext !== "";
    return true;
  };

  const handleComplete = async () => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      try {
        await setDoc(doc(db, "users", currentUser.uid), {
          ...profile,
          onboardingCompleted: true,
          updatedAt: new Date()
        }, { merge: true });
        
        if (typeof window !== "undefined") {
          localStorage.setItem("smriti_onboarding_completed", "true");
        }
        setStep(6);
      } catch (error) {
        console.error("Error saving profile:", error);
        if (typeof window !== "undefined") {
          localStorage.setItem("smriti_onboarding_completed", "true");
        }
        setStep(6); 
      }
    } else {
      if (typeof window !== "undefined") {
        localStorage.setItem("smriti_onboarding_completed", "true");
      }
      setStep(6);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="w-full max-w-lg mx-auto bg-white neo-border neo-shadow p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] mb-2">
                What&apos;s your name?
              </h1>
              <p className="font-body-md text-base text-[#434655]">
                We&apos;ll use this to make your SMRITI experience personal and warm.
              </p>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                placeholder="Enter name (e.g. Anand)"
                className="w-full text-xl sm:text-2xl p-4 sm:p-5 neo-border bg-[#f9f9f8] text-[#1a1c1c] font-bold outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:bg-white"
                autoFocus
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="w-full max-w-3xl mx-auto bg-white neo-border neo-shadow p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] mb-2">
                Where does your story feel at home?
              </h1>
              <p className="font-body-md text-base text-[#434655]">
                Choose your cultural region for familiar pastimes, stories, and language nuances.
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {REGIONS.map(region => {
                const isSelected = profile.region === region.id;
                return (
                  <button
                    key={region.id}
                    onClick={() => setProfile({...profile, region: region.id as any})}
                    className={`p-4 neo-border transition-all flex flex-col items-center justify-center gap-2 aspect-square cursor-pointer ${
                      isSelected 
                        ? "bg-[#6bff8f] text-[#002109] translate-x-[2px] translate-y-[2px] shadow-none" 
                        : "bg-white text-[#1a1c1c] neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                    }`}
                  >
                    <span className="font-display-lg font-black text-base sm:text-lg text-center uppercase">
                      {region.label}
                    </span>
                    {isSelected && <Check className="w-5 h-5 stroke-[3] text-[#006e2f]" />}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="w-full max-w-xl mx-auto bg-white neo-border neo-shadow p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] mb-2">
                How much support feels comfortable?
              </h1>
              <p className="font-body-md text-base text-[#434655]">
                This tailors cognitive game speeds, hints, and guidance.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              {SUPPORT_LEVELS.map(level => {
                const isSelected = profile.supportLevel === level.id;
                return (
                  <button
                    key={level.id}
                    onClick={() => setProfile({...profile, supportLevel: level.id as any})}
                    className={`p-4 sm:p-5 neo-border transition-all text-left flex items-start gap-4 cursor-pointer ${
                      isSelected 
                        ? "bg-[#ffe083] text-[#231b00] translate-x-[2px] translate-y-[2px] shadow-none" 
                        : "bg-white text-[#1a1c1c] neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                    }`}
                  >
                    <div className="flex-grow">
                      <h3 className="font-display-lg font-black text-lg sm:text-xl uppercase mb-1">{level.label}</h3>
                      <p className="font-body-md text-xs sm:text-sm text-[#434655] font-medium">{level.desc}</p>
                    </div>
                    {isSelected && <Check className="w-5 h-5 stroke-[3] text-[#735c00] shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 4:
        const languages = LANGUAGES_BY_REGION[profile.region] || LANGUAGES_BY_REGION[""];
        return (
          <div className="w-full max-w-xl mx-auto bg-white neo-border neo-shadow p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] mb-2">
                Preferred Language
              </h1>
              <p className="font-body-md text-base text-[#434655]">
                Select the primary language you would like SMRITI to speak.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {languages.map(lang => {
                const isSelected = profile.language === lang;
                return (
                  <button
                    key={lang}
                    onClick={() => setProfile({...profile, language: lang})}
                    className={`p-4 neo-border transition-all text-center cursor-pointer ${
                      isSelected 
                        ? "bg-[#dbe1ff] text-[#00174b] translate-x-[2px] translate-y-[2px] shadow-none" 
                        : "bg-white text-[#1a1c1c] neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                    }`}
                  >
                    <span className="font-display-lg font-black text-base sm:text-lg uppercase">{lang}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 5:
        return (
          <div className="w-full max-w-xl mx-auto bg-white neo-border neo-shadow p-6 sm:p-8">
            <div className="text-center mb-6">
              <h1 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] mb-2">
                Who is using SMRITI?
              </h1>
              <p className="font-body-md text-base text-[#434655]">
                Helps us adapt prompts and voice tone.
              </p>
            </div>
            
            <div className="flex flex-col gap-3">
              {[
                { id: "self", icon: "👤", label: "Myself (Elder)" },
                { id: "family", icon: "👨‍👩‍👧", label: "With Family" },
                { id: "caregiver", icon: "🤝", label: "Caregiver Assisting" }
              ].map(ctx => {
                const isSelected = profile.usageContext === ctx.id;
                return (
                  <button
                    key={ctx.id}
                    onClick={() => setProfile({...profile, usageContext: ctx.id as any})}
                    className={`p-4 sm:p-5 neo-border transition-all text-left flex items-center gap-4 cursor-pointer ${
                      isSelected 
                        ? "bg-[#ffdad6] text-[#93000a] translate-x-[2px] translate-y-[2px] shadow-none" 
                        : "bg-white text-[#1a1c1c] neo-shadow-sm hover:translate-x-[1px] hover:translate-y-[1px]"
                    }`}
                  >
                    <span className="text-3xl">{ctx.icon}</span>
                    <span className="font-display-lg font-black text-lg uppercase flex-grow">{ctx.label}</span>
                    {isSelected && <Check className="w-5 h-5 stroke-[3] text-[#ba1a1a]" />}
                  </button>
                );
              })}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="w-full max-w-lg mx-auto bg-white neo-border neo-shadow p-8 text-center">
            <div className="w-20 h-20 bg-[#6bff8f] text-[#002109] neo-border flex items-center justify-center mx-auto mb-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
              <Check className="w-10 h-10 stroke-[3]" />
            </div>
            <h1 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] mb-2">
              Welcome, {profile.name}!
            </h1>
            <p className="font-body-md text-base sm:text-lg text-[#434655] mb-8">
              Your personalized cognitive care companion is ready.
            </p>
            
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-[#2563eb] text-white px-8 py-4 neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-display-lg text-xl uppercase font-black tracking-wider hover:translate-y-[2px] hover:translate-x-[2px] transition-all w-full"
            >
              <span>Go to Dashboard</span>
              <ArrowRight className="w-6 h-6 stroke-[3]" />
            </Link>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f9f8] flex flex-col font-body-md selection:bg-[#ffe083] selection:text-[#231b00]">
      
      {/* Header & Step Tracker */}
      {step < 6 && (
        <header className="p-4 sm:p-6 border-b-[4px] border-[#1a1c1c] bg-white sticky top-0 z-50">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="font-display-lg text-2xl sm:text-3xl font-black uppercase text-[#1a1c1c] tracking-tight">
              SMRITI SETUP
            </div>
            
            <div className="flex items-center gap-2">
              <span className="font-label-caps text-xs uppercase font-bold text-[#434655]">Step {step} of 5</span>
              <div className="flex gap-1.5">
                {[1,2,3,4,5].map(i => (
                  <div 
                    key={i} 
                    className={`h-3 rounded-sm neo-border transition-all duration-300 ${
                      step === i 
                        ? "w-6 bg-[#2563eb]" 
                        : step > i 
                        ? "w-3 bg-[#6bff8f]" 
                        : "w-3 bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="flex-grow flex items-center justify-center p-4 sm:p-6 pb-28">
        {renderStepContent()}
      </main>

      {/* Footer Actions */}
      {step < 6 && (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t-[4px] border-[#1a1c1c] p-4 z-50 shadow-[0_-4px_0px_0px_rgba(0,0,0,0.1)]">
          <div className="max-w-xl mx-auto flex items-center justify-between gap-4">
            <button 
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 font-label-caps text-xs sm:text-sm uppercase font-bold px-4 py-3 neo-border bg-white text-[#1a1c1c] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer ${
                step === 1 ? 'opacity-0 pointer-events-none' : 'hover:translate-x-[1px] hover:translate-y-[1px]'
              }`}
            >
              <ArrowLeft className="w-4 h-4 stroke-[3]" />
              <span>Back</span>
            </button>

            <button
              onClick={step === 5 ? handleComplete : handleNext}
              disabled={!canContinue()}
              className={`flex items-center gap-2 px-8 py-3.5 neo-border font-display-lg text-lg uppercase font-black tracking-wider transition-all cursor-pointer ${
                !canContinue() 
                  ? 'bg-[#dadad9] text-[#737686] opacity-60 cursor-not-allowed shadow-none' 
                  : 'bg-[#2563eb] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none'
              }`}
            >
              <span>{step === 5 ? 'Complete Setup' : 'Continue'}</span>
              {step < 5 && <ArrowRight className="w-5 h-5 stroke-[3]" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
