import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase/config";

export const authService = {
  async signup(email: string, password: string, name: string, role: string) {
    if (!auth || !db) throw new Error("Firebase is not initialized");
    
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (e) {
      console.warn("Persistence set warning:", e);
    }

    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // 2. Create user profile in Firestore with onboardingCompleted = false
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role,
      region: "assam",
      language: "en",
      onboardingCompleted: false,
      accessibilityPreferences: {
        textSize: "standard",
        highContrast: false,
        reducedMotion: false,
        voiceGuidance: true
      },
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    if (typeof window !== "undefined") {
      localStorage.setItem("smriti_user_active", "true");
      localStorage.removeItem("smriti_onboarding_completed");
    }

    return userCredential;
  },

  async login(email: string, password: string) {
    if (!auth) throw new Error("Firebase is not initialized");
    
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (e) {
      console.warn("Persistence set warning:", e);
    }

    const res = await signInWithEmailAndPassword(auth, email, password);
    if (typeof window !== "undefined") {
      localStorage.setItem("smriti_user_active", "true");
    }
    return res;
  },

  async loginWithGoogle(role?: string) {
    if (!auth || !db) throw new Error("Firebase is not initialized");
    
    try {
      await setPersistence(auth, browserLocalPersistence);
    } catch (e) {
      console.warn("Persistence set warning:", e);
    }

    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Check if user document already exists
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) {
      // Create new profile with onboardingCompleted = false
      await setDoc(userDocRef, {
        name: user.displayName || "User",
        email: user.email,
        role: role || "Elderly User",
        region: "assam",
        language: "en",
        onboardingCompleted: false,
        accessibilityPreferences: {
          textSize: "standard",
          highContrast: false,
          reducedMotion: false,
          voiceGuidance: true
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      if (typeof window !== "undefined") {
        localStorage.removeItem("smriti_onboarding_completed");
      }
    }

    if (typeof window !== "undefined") {
      localStorage.setItem("smriti_user_active", "true");
    }
    
    return userCredential;
  },

  async resetPassword(email: string) {
    if (!auth) throw new Error("Firebase is not initialized");
    return await sendPasswordResetEmail(auth, email);
  },

  async logout() {
    if (typeof window !== "undefined") {
      localStorage.removeItem("smriti_user_active");
      localStorage.removeItem("smriti_onboarding_completed");
    }
    if (!auth) return;
    return await signOut(auth);
  }
};
