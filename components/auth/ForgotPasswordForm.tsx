"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        setError("We couldn't find an account with that email.");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="w-full text-center">
        <div className="w-20 h-20 bg-[#6bff8f] neo-border flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-[#006e2f]" />
        </div>
        <h2 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] mb-3">Check Your Email</h2>
        <p className="font-body-md text-base text-[#434655] mb-8 leading-relaxed">
          We've sent instructions to reset your password to <strong>{email}</strong>.
        </p>
        <Link 
          href="/login"
          className="inline-flex w-full h-14 bg-[#2563eb] text-white neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none font-headline-lg text-xl uppercase font-black tracking-wider items-center justify-center cursor-pointer transition-all"
        >
          Back to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <Link 
        href="/login" 
        className="inline-flex items-center gap-2 bg-white neo-border px-4 py-2 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
      >
        <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Login
      </Link>

      <div className="mb-6 pb-4 border-b-2 border-[#1a1c1c]">
        <h2 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] tracking-tight mb-2">Forgot Password</h2>
        <p className="font-body-md text-base text-[#434655]">Enter your email and we'll help you get back into your account.</p>
      </div>

      {error && (
        <div className="bg-[#ffdad6] neo-border text-[#93000a] p-4 mb-6 flex items-start gap-3">
          <AlertCircle className="w-6 h-6 text-[#ba1a1a] shrink-0 mt-0.5" />
          <p className="font-bold text-sm leading-snug">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="font-label-caps text-xs font-bold uppercase text-[#1a1c1c]">
            Email address
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

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 mt-2 bg-[#2563eb] text-white neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none font-headline-lg text-xl uppercase font-black tracking-wider transition-all disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Sending Reset Link...</span>
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </div>
  );
}
