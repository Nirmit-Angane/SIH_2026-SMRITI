"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Leaf, Mic, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "@/lib/firebase/config";

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
  { id: "gentle", label: "Gentle Support", desc: "I sometimes need reminders or help remembering things." },
  { id: "regular", label: "Regular Support", desc: "I often need help with names, routines or remembering recent things." },
  { id: "more-support", label: "More Support", desc: "I usually need someone nearby to help me with activities." },
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
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<PatientProfile>({
    name: "",
    region: "",
    supportLevel: "",
    language: "",
    usageContext: "",
    onboardingCompleted: false,
  });
  const [isListening, setIsListening] = useState(false);

  // Apply regional theme to document root when region changes so everything previews correctly
  useEffect(() => {
    if (profile.region) {
      document.documentElement.setAttribute('data-region', profile.region);
    } else {
      document.documentElement.removeAttribute('data-region');
    }
  }, [profile.region]);

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
    const user = auth.currentUser;
    if (user) {
      try {
        await setDoc(doc(db, "users", user.uid), {
          ...profile,
          onboardingCompleted: true,
          updatedAt: new Date()
        }, { merge: true });
        
        // Ensure state updates before we redirect manually if needed
        localStorage.setItem("smriti_onboarding_completed", "true");
        setStep(6);
      } catch (error) {
        console.error("Error saving profile:", error);
        // FORCE the user to step 6 even if the database fails, so they aren't stuck forever.
        // We do this by creating a mock 'completed' state so ProtectedRoute ignores them.
        localStorage.setItem("smriti_onboarding_completed", "true");
        setStep(6); 
      }
    } else {
      localStorage.setItem("smriti_onboarding_completed", "true");
      setStep(6);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-3">What's your name?</h1>
              <p className="text-lg text-smriti-muted">We'll use this to make your SMRITI experience feel personal.</p>
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                value={profile.name}
                onChange={e => setProfile({...profile, name: e.target.value})}
                placeholder="Enter name (e.g. Anita)"
                className="w-full text-2xl p-6 rounded-2xl border-2 border-smriti-border bg-smriti-surface focus:border-smriti-primary focus:ring-4 focus:ring-smriti-primary/20 outline-none transition-all"
                autoFocus
              />
              <button 
                className={`absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl flex items-center justify-center transition-all ${isListening ? 'bg-smriti-primary text-white animate-pulse' : 'bg-smriti-bg text-smriti-primary hover:bg-smriti-primary/10'}`}
                onClick={() => setIsListening(!isListening)}
                title="Speak your name"
              >
                <Mic className="w-6 h-6" />
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 w-full max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-3">Where does your story feel at home?</h1>
              <p className="text-lg text-smriti-muted">Choose your region so SMRITI can use a familiar visual style, language, and stories.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {REGIONS.map(region => (
                <button
                  key={region.id}
                  onClick={() => setProfile({...profile, region: region.id as any})}
                  className={`relative overflow-hidden p-6 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-3 aspect-square
                    ${profile.region === region.id 
                      ? 'border-smriti-primary bg-smriti-primary/5 shadow-md scale-[1.02]' 
                      : 'border-smriti-border bg-white hover:border-smriti-primary/50 hover:bg-smriti-bg'}`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${profile.region === region.id ? 'bg-smriti-primary text-white' : 'bg-smriti-bg text-smriti-muted'}`}>
                    <Leaf className="w-6 h-6" />
                  </div>
                  <span className="font-bold text-smriti-text text-lg text-center leading-tight">{region.label}</span>
                  {profile.region === region.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-smriti-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 w-full max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-3">How much support feels comfortable?</h1>
              <p className="text-lg text-smriti-muted">This helps us choose activities that feel comfortable and manageable.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              {SUPPORT_LEVELS.map(level => (
                <button
                  key={level.id}
                  onClick={() => setProfile({...profile, supportLevel: level.id as any})}
                  className={`p-6 rounded-2xl border-2 transition-all text-left flex gap-4 items-start
                    ${profile.supportLevel === level.id 
                      ? 'border-smriti-primary bg-smriti-primary/5 shadow-md' 
                      : 'border-smriti-border bg-white hover:border-smriti-primary/50 hover:bg-smriti-bg'}`}
                >
                  <div className={`mt-1 w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center border-2 ${profile.supportLevel === level.id ? 'border-smriti-primary bg-smriti-primary' : 'border-smriti-muted bg-transparent'}`}>
                    {profile.supportLevel === level.id && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-smriti-text mb-1">{level.label}</h3>
                    <p className="text-smriti-muted text-lg leading-relaxed">{level.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        );

      case 4:
        const languages = LANGUAGES_BY_REGION[profile.region] || LANGUAGES_BY_REGION[""];
        return (
          <div className="space-y-6 w-full max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-3">What language feels most comfortable?</h1>
              <p className="text-lg text-smriti-muted">Choose the language you'd like SMRITI to use when possible.</p>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {languages.map(lang => (
                <button
                  key={lang}
                  onClick={() => setProfile({...profile, language: lang})}
                  className={`p-6 rounded-2xl border-2 transition-all text-center
                    ${profile.language === lang 
                      ? 'border-smriti-primary bg-smriti-primary/5 shadow-md' 
                      : 'border-smriti-border bg-white hover:border-smriti-primary/50 hover:bg-smriti-bg'}`}
                >
                  <span className="font-bold text-xl text-smriti-text">{lang}</span>
                </button>
              ))}
              <button
                onClick={() => setProfile({...profile, language: 'Other'})}
                className={`p-6 rounded-2xl border-2 transition-all text-center
                  ${profile.language === 'Other' 
                    ? 'border-smriti-primary bg-smriti-primary/5 shadow-md' 
                    : 'border-smriti-border bg-white hover:border-smriti-primary/50 hover:bg-smriti-bg'}`}
              >
                <span className="font-bold text-xl text-smriti-text">Other / Prefer English</span>
              </button>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 w-full max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-3">Who will usually use SMRITI?</h1>
              <p className="text-lg text-smriti-muted">This helps us personalize features and notifications.</p>
            </div>
            
            <div className="flex flex-col gap-4">
              {[
                { id: "self", icon: "👤", label: "Me" },
                { id: "family", icon: "👨‍👩‍👧", label: "With family" },
                { id: "caregiver", icon: "🤝", label: "With a caregiver" }
              ].map(ctx => (
                <button
                  key={ctx.id}
                  onClick={() => setProfile({...profile, usageContext: ctx.id as any})}
                  className={`p-6 rounded-2xl border-2 transition-all text-left flex gap-6 items-center
                    ${profile.usageContext === ctx.id 
                      ? 'border-smriti-primary bg-smriti-primary/5 shadow-md' 
                      : 'border-smriti-border bg-white hover:border-smriti-primary/50 hover:bg-smriti-bg'}`}
                >
                  <span className="text-4xl">{ctx.icon}</span>
                  <span className="font-bold text-2xl text-smriti-text">{ctx.label}</span>
                </button>
              ))}
            </div>
          </div>
        );

      case 6:
        return (
          <div className="w-full max-w-lg mx-auto text-center animate-in fade-in zoom-in-95 duration-700">
            <div className="w-24 h-24 bg-smriti-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner border border-smriti-primary/20">
              <Leaf className="w-12 h-12 text-smriti-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-smriti-text mb-4">
              Thank you, {profile.name.split(' ')[0]}.
            </h1>
            <p className="text-xl text-smriti-muted mb-12 leading-relaxed">
              We're preparing a more familiar SMRITI experience for you.
            </p>
            
            <Link 
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 bg-smriti-primary text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-opacity-90 transition-all shadow-lg shadow-smriti-primary/20"
            >
              Continue to SMRITI
              <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        );
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-smriti-bg flex flex-col font-sans selection:bg-smriti-primary/20 transition-colors duration-700">
        
        {/* Header & Progress */}
        {step < 6 && (
          <header className="p-6">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-smriti-primary flex items-center justify-center text-white shadow-sm">
                  <Leaf className="w-6 h-6" />
                </div>
                <span className="text-2xl font-extrabold text-smriti-text tracking-tight">SMRITI</span>
              </div>
              
              {/* Dots Progress */}
              <div className="flex gap-2">
                {[1,2,3,4,5].map(i => (
                  <div 
                    key={i} 
                    className={`h-2.5 rounded-full transition-all duration-500 ${step === i ? 'w-8 bg-smriti-primary' : step > i ? 'w-2.5 bg-smriti-primary/50' : 'w-2.5 bg-smriti-border'}`}
                  />
                ))}
              </div>
            </div>
          </header>
        )}

        {/* Main Content Area */}
        <main className="flex-grow flex items-center justify-center p-6 pb-32">
          {renderStepContent()}
        </main>

        {/* Footer Navigation */}
        {step < 6 && (
          <div className="fixed bottom-0 left-0 w-full bg-white/80 backdrop-blur-md border-t border-smriti-border p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-50">
            <div className="max-w-3xl mx-auto flex items-center justify-between">
              <button 
                onClick={handleBack}
                disabled={step === 1}
                className={`flex items-center gap-2 font-bold text-lg px-6 py-4 rounded-xl transition-all
                  ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-smriti-muted hover:bg-smriti-bg hover:text-smriti-text'}`}
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>

              <button
                onClick={step === 5 ? handleComplete : handleNext}
                disabled={!canContinue()}
                className={`flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg transition-all
                  ${!canContinue() 
                    ? 'bg-smriti-border text-smriti-muted cursor-not-allowed' 
                    : 'bg-smriti-primary text-white hover:scale-[1.02] hover:shadow-lg shadow-smriti-primary/20'}`}
              >
                {step === 5 ? 'Complete' : 'Continue'}
                {step < 5 && <ArrowRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
