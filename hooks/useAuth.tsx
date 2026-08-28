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
        // Listen to user profile from Firestore in real-time
        const docRef = doc(db, "users", firebaseUser.uid);
        unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data() as PatientProfile;
            setProfile(data);
            if (data.onboardingCompleted) {
              localStorage.setItem("smriti_onboarding_completed", "true");
            }
          } else {
            // Check localStorage as a fallback in case they completed it but we can't read it
            if (localStorage.getItem("smriti_onboarding_completed") === "true") {
              setProfile({ onboardingCompleted: true } as PatientProfile);
            } else {
              setProfile(null);
            }
          }
          setLoading(false);
        }, (error) => {
          console.error("Error fetching user profile snapshot:", error);
          // Fallback to localStorage if rules are broken!
          if (localStorage.getItem("smriti_onboarding_completed") === "true") {
            setProfile({ onboardingCompleted: true } as PatientProfile);
          } else {
            setProfile(null);
          }
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
      // The local profile state will automatically update via onSnapshot
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
