"use client";

import React, { useState } from "react";
import { PasswordInput } from "./PasswordInput";
import { RoleSelector } from "./RoleSelector";
import { SocialLoginButton } from "./SocialLoginButton";
import { AuthDivider } from "./AuthDivider";
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
    if (password.length < 6) return { label: "Weak", color: "bg-[#ba1a1a]" };
    if (password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password)) return { label: "Strong", color: "bg-[#006e2f]" };
    return { label: "Medium", color: "bg-[#cea700]" };
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

  return (
    <div className="w-full">
      {stage === 1 ? (
        <div className="w-full">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 bg-white neo-border px-4 py-2 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Home
          </Link>

          <div className="mb-6 pb-4 border-b-2 border-[#1a1c1c]">
            <h2 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] tracking-tight mb-2">
              Create Your Space
            </h2>
            <p className="font-body-md text-base text-[#434655]">
              Set up a safe, calm space for memory activities and connection.
            </p>
          </div>

          <RoleSelector selectedRole={role} onChange={setRole} />

          {/* 4th Button: Continue Button */}
          <button
            type="button"
            onClick={handleNext}
            className="w-full h-14 bg-[#2563eb] text-white neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none font-headline-lg text-xl uppercase font-black tracking-wider transition-all flex items-center justify-center cursor-pointer"
          >
            Continue
          </button>

          <AuthDivider />
          
          <SocialLoginButton role={role} />

          <p className="mt-8 text-center font-body-md text-base text-[#1a1c1c]">
            Already have an account?{" "}
            <Link href="/login" className="font-headline-lg uppercase font-black text-[#2563eb] hover:underline ml-1">
              Log in
            </Link>
          </p>
        </div>

      ) : (

        <div className="w-full">
          <button 
            onClick={handleBack}
            type="button"
            className="inline-flex items-center gap-2 bg-white neo-border px-4 py-2 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back
          </button>

          <div className="mb-6 pb-4 border-b-2 border-[#1a1c1c]">
            <h2 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] tracking-tight mb-2">
              Account Details
            </h2>
            <p className="font-body-md text-base text-[#434655]">
              Enter your information to secure your account.
            </p>
          </div>

          {error && (
            <div className="bg-[#ffdad6] neo-border text-[#93000a] p-4 mb-6 flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-[#ba1a1a] shrink-0 mt-0.5" />
              <p className="font-bold text-sm leading-snug">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="font-label-caps text-xs font-bold uppercase text-[#1a1c1c]">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-13 px-4 bg-white neo-border-2 font-body-md text-lg text-[#1a1c1c] focus:outline-none focus:bg-[#dbe1ff]/20 focus:border-[#2563eb]"
                placeholder="John Doe"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="font-label-caps text-xs font-bold uppercase text-[#1a1c1c]">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-13 px-4 bg-white neo-border-2 font-body-md text-lg text-[#1a1c1c] focus:outline-none focus:bg-[#dbe1ff]/20 focus:border-[#2563eb]"
                placeholder="name@example.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <PasswordInput
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
              />
              {password.length > 0 && (
                <div className="flex items-center justify-between mt-1 px-1">
                  <div className="flex gap-1.5 w-28">
                    <div className={`h-2 w-full neo-border-2 ${password.length > 0 ? strength.color : 'bg-gray-200'}`}></div>
                    <div className={`h-2 w-full neo-border-2 ${password.length >= 6 ? strength.color : 'bg-gray-200'}`}></div>
                    <div className={`h-2 w-full neo-border-2 ${strength.label === 'Strong' ? strength.color : 'bg-gray-200'}`}></div>
                  </div>
                  <span className="font-label-caps text-xs font-bold uppercase text-[#434655]">{strength.label}</span>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-1.5">
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
              className="w-full h-14 mt-2 bg-[#2563eb] text-white neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none font-headline-lg text-xl uppercase font-black tracking-wider transition-all disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
