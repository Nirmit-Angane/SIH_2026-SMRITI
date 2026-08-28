import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
  UserCredential
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export const authService = {
  async signup(email: string, password: string, name: string, role: string) {
    if (!auth || !db) throw new Error("Firebase is not initialized");
    
    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // 2. Create user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role,
      region: null,
      language: null,
      accessibilityPreferences: {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    
    return userCredential;
  },

  async login(email: string, password: string) {
    if (!auth) throw new Error("Firebase is not initialized");
    return await signInWithEmailAndPassword(auth, email, password);
  },

  async loginWithGoogle(role?: string) {
    if (!auth || !db) throw new Error("Firebase is not initialized");
    
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;
    
    // Check if user document already exists
    const userDocRef = doc(db, "users", user.uid);
    const userDocSnap = await getDoc(userDocRef);
    
    if (!userDocSnap.exists()) {
      // Create new profile if it doesn't exist
      await setDoc(userDocRef, {
        name: user.displayName || "Unknown User",
        email: user.email,
        role: role || "Elderly User", // Default or provided role
        region: null,
        language: null,
        accessibilityPreferences: {},
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }
    
    return userCredential;
  },

  async resetPassword(email: string) {
    if (!auth) throw new Error("Firebase is not initialized");
    return await sendPasswordResetEmail(auth, email);
  },

  async logout() {
    if (!auth) throw new Error("Firebase is not initialized");
    return await signOut(auth);
  }
};
