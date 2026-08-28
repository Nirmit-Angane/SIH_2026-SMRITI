"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle, CheckCircle2, ArrowLeft } from "lucide-react";
import { authService } from "@/services/authService";

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
      // MOCK RESET PASSWORD FOR UI PREVIEW (Firebase bypassed)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      if (err.code === "auth/user-not-found") {
        // For security, it's often better to not reveal if a user exists, but we'll keep it friendly here.
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
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full text-center"
      >
        <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-smriti-success" />
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-4">Check your email</h2>
        <p className="text-lg text-smriti-muted mb-8 leading-relaxed">
          We've sent instructions to reset your password to <strong>{email}</strong>.
        </p>
        <Link 
          href="/login"
          className="inline-flex w-full h-14 bg-smriti-primary text-white rounded-xl text-lg font-bold hover:bg-smriti-primary transition-all items-center justify-center touch-target"
        >
          Back to Login
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-8">
        <Link href="/login" className="inline-flex items-center gap-2 text-smriti-muted hover:text-smriti-primary transition-colors font-medium mb-6">
          <ArrowLeft className="w-5 h-5" /> Back
        </Link>
        <h2 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-3">Forgot your password?</h2>
        <p className="text-lg text-smriti-muted">No worries. Enter your email and we'll help you get back in.</p>
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

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 mt-4 bg-smriti-primary text-white rounded-xl text-lg font-bold hover:bg-smriti-primary focus:outline-none focus:ring-4 focus:ring-smriti-primary/30 transition-all shadow-md shadow-smriti-primary/20 touch-target disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              Sending...
            </>
          ) : (
            "Send Reset Link"
          )}
        </button>
      </form>
    </motion.div>
  );
}
