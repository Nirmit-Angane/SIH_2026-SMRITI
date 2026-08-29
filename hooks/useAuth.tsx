"use client";

import { useState, useEffect, createContext, useContext } from 'react';
import { onAuthStateChanged, User, signOut as firebaseSignOut } from 'firebase/auth';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';

export interface PatientProfile {
  name: string;
  region: string;
  supportLevel: string;
  language: string;
  usageContext: string;
  onboardingCompleted: boolean;
  accessibility?: {
    textSize: "standard" | "large" | "extraLarge";
    highContrast: boolean;
    reducedMotion: boolean;
    voiceGuidance: boolean;
  };
  preferences?: {
    preferredActivities: string[];
    dailyActivity: boolean;
  };
}

interface AuthContextType {
  user: User | null;
  profile: PatientProfile | null;
  loading: boolean;
  logout: () => Promise<void>;
  updateProfile: (updates: Partial<PatientProfile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  logout: async () => {},
  updateProfile: async () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<PatientProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    let unsubscribeSnapshot: () => void;

    const unsubscribeAuth = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        if (typeof window !== "undefined") {
          localStorage.setItem("smriti_user_active", "true");
        }

        // Listen to user profile from Firestore in real-time
        const docRef = doc(db, "users", firebaseUser.uid);
        unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as Partial<PatientProfile>;
            const isCompleted = data.onboardingCompleted === true;
            
            const fullProfile: PatientProfile = {
              name: data.name || firebaseUser.displayName || "User",
              region: data.region || "Assam",
              supportLevel: data.supportLevel || "gentle",
              language: data.language || "en",
              usageContext: data.usageContext || "home",
              onboardingCompleted: isCompleted,
              accessibility: data.accessibility || {
                textSize: "standard",
                highContrast: false,
                reducedMotion: false,
                voiceGuidance: true
              },
              preferences: data.preferences
            };
            setProfile(fullProfile);
            if (typeof window !== "undefined") {
              if (isCompleted) {
                localStorage.setItem("smriti_onboarding_completed", "true");
              } else {
                localStorage.removeItem("smriti_onboarding_completed");
              }
            }
          } else {
            // Document doesn't exist yet (brand new registration in progress)
            const defaultProf: PatientProfile = {
              name: firebaseUser.displayName || "User",
              region: "Assam",
              supportLevel: "gentle",
              language: "en",
              usageContext: "home",
              onboardingCompleted: false
            };
            setProfile(defaultProf);
            if (typeof window !== "undefined") {
              localStorage.removeItem("smriti_onboarding_completed");
            }
          }
          setLoading(false);
        }, (error) => {
          console.error("Error fetching user profile snapshot:", error);
          const defaultProf: PatientProfile = {
            name: firebaseUser.displayName || "User",
            region: "Assam",
            supportLevel: "gentle",
            language: "en",
            usageContext: "home",
            onboardingCompleted: true
          };
          setProfile(defaultProf);
          setLoading(false);
        });
      } else {
        setProfile(null);
        if (unsubscribeSnapshot) unsubscribeSnapshot();
        setLoading(false);
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) unsubscribeSnapshot();
    };
  }, []);

  const logout = async () => {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem("smriti_user_active");
        localStorage.removeItem("smriti_onboarding_completed");
      }
      await firebaseSignOut(auth);
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const updateProfile = async (updates: Partial<PatientProfile>) => {
    if (!user) return;
    try {
      const docRef = doc(db, "users", user.uid);
      await updateDoc(docRef, updates);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ user, profile, loading, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
