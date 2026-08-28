"use client";

import React, { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { RoleSelector } from "./RoleSelector";
import { SocialLoginButton } from "./SocialLoginButton";
import { AuthDivider } from "./AuthDivider";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const router = useRouter();
  
  // Stages: 1 (Role) -> 2 (Details)
  const [stage, setStage] = useState<1 | 2>(1);

  // Form State
  const [role, setRole] = useState("patient");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getPasswordStrength = () => {
    if (password.length === 0) return { label: "", color: "bg-gray-200" };
    if (password.length < 6) return { label: "Weak", color: "bg-red-400" };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return { label: "Strong", color: "bg-smriti-success" };
    return { label: "Medium", color: "bg-smriti-warning" };
  };
  const strength = getPasswordStrength();

  const handleNext = () => {
    setError(null);
    if (!role) return setError("Please select who will use SMRITI.");
    setStage(2);
  };

  const handleBack = () => {
    setError(null);
    setStage(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (stage === 1) return handleNext();

    setError(null);

    if (!name.trim()) return setError("Please enter your full name.");
    if (!email || !email.includes("@")) return setError("Please enter a valid email address.");
    if (password.length < 8) return setError("Password must be at least 8 characters.");
    if (password !== confirmPassword) return setError("Passwords do not match.");

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(auth!, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      
      // Navigate to onboarding to complete the profile
      router.push("/onboarding"); 
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else {
        setError("Something went wrong creating your account. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Animation variants
  const slideVariants = {
    hidden: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
    visible: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" as const } },
    exit: (direction: number) => ({ x: direction > 0 ? -50 : 50, opacity: 0, transition: { duration: 0.3 } })
  };

  return (
    <div className="w-full relative overflow-hidden min-h-[400px]">
      <AnimatePresence mode="wait" custom={stage === 1 ? -1 : 1}>
        {stage === 1 ? (
          <motion.div
            key="stage1"
            custom={-1}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-3">Create your SMRITI space</h2>
              <p className="text-lg text-smriti-muted">Set up a safe, calm space for memory activities and connection.</p>
            </div>

            <RoleSelector selectedRole={role} onChange={setRole} />

            <button
              type="button"
              onClick={handleNext}
              className="w-full h-14 mt-6 bg-smriti-primary text-white rounded-xl text-lg font-bold hover:bg-smriti-primary/90 transition-all shadow-md touch-target"
            >
              Continue
            </button>

            <AuthDivider />
            
            <SocialLoginButton role={role} />

            <p className="mt-8 text-center text-lg text-smriti-text font-medium">
              Already have an account?{" "}
              <Link href="/login" className="text-smriti-primary font-bold hover:underline">
                Log in
              </Link>
            </p>
          </motion.div>

        ) : (

          <motion.div
            key="stage2"
            custom={1}
            variants={slideVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-full"
          >
            <button 
              onClick={handleBack}
              type="button"
              className="flex items-center gap-2 text-smriti-muted hover:text-smriti-text mb-6 transition-colors font-medium touch-target"
            >
              <ArrowLeft className="w-5 h-5" /> Back
            </button>

            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-3">Just a few details</h2>
              <p className="text-lg text-smriti-muted">We need a bit of information to secure your account.</p>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                  animate={{ opacity: 1, height: "auto", marginBottom: 24 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  className="overflow-hidden"
                >
                  <div className="bg-red-50 border border-smriti-error/20 p-4 rounded-xl flex items-start gap-3">
                    <AlertCircle className="w-6 h-6 text-smriti-error shrink-0 mt-0.5" />
                    <p className="text-smriti-error font-medium text-[16px] leading-snug">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="text-[16px] font-semibold text-smriti-text">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-gray-50 text-lg focus:outline-none focus:ring-2 focus:ring-smriti-primary/50 focus:border-smriti-primary transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[16px] font-semibold text-smriti-text">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-14 px-4 rounded-xl border border-gray-200 bg-gray-50 text-lg focus:outline-none focus:ring-2 focus:ring-smriti-primary/50 focus:border-smriti-primary transition-all"
                  placeholder="name@example.com"
                />
              </div>

              <div className="flex flex-col gap-2">
                <PasswordInput
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                />
                {password.length > 0 && (
                  <div className="flex items-center justify-between mt-1 px-1">
                    <div className="flex gap-1 w-24">
                      <div className={`h-1.5 w-full rounded-full ${password.length > 0 ? strength.color : 'bg-gray-200'}`}></div>
                      <div className={`h-1.5 w-full rounded-full ${password.length >= 6 ? strength.color : 'bg-gray-200'}`}></div>
                      <div className={`h-1.5 w-full rounded-full ${strength.label === 'Strong' ? strength.color : 'bg-gray-200'}`}></div>
                    </div>
                    <span className="text-xs font-semibold text-smriti-muted">{strength.label}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-2">
                <PasswordInput
                  id="confirmPassword"
                  label="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Type it again"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full h-14 mt-4 bg-smriti-primary text-white rounded-xl text-lg font-bold hover:bg-smriti-primary focus:outline-none focus:ring-4 focus:ring-smriti-primary/30 transition-all shadow-md shadow-smriti-primary/20 touch-target disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-6 h-6 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Account"
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
