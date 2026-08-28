"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, AlertCircle } from "lucide-react";
import { PasswordInput } from "./PasswordInput";
import { AuthDivider } from "./AuthDivider";
import { SocialLoginButton } from "./SocialLoginButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase/config";
import { useLanguage } from "@/components/LanguageProvider";

export function LoginForm() {
  const router = useRouter();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Basic Validation
    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);

    try {
      // REAL FIREBASE LOGIN
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
      // Clean error messages instead of raw firebase errors
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("That email or password doesn't look right. Please try again.");
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-extrabold text-smriti-text mb-3">Welcome back</h2>
        <p className="text-lg text-smriti-muted">Sign in to continue to your SMRITI space.</p>
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
            {t("auth.email") || "Email address"}
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
            placeholder={t("auth.password") || "Enter your password"}
          />
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 cursor-pointer touch-target py-1">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 rounded border-gray-300 text-smriti-primary focus:ring-smriti-primary"
              />
              <span className="text-[16px] font-medium text-smriti-muted select-none">Remember me</span>
            </label>
            <Link 
              href="/forgot-password" 
              className="text-[16px] font-bold text-smriti-primary hover:text-smriti-primary transition-colors touch-target py-1"
            >
              {t("auth.forgotPassword") || "Forgot password?"}
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 mt-2 bg-smriti-primary text-white rounded-xl text-lg font-bold hover:bg-smriti-primary focus:outline-none focus:ring-4 focus:ring-smriti-primary/30 transition-all shadow-md shadow-smriti-primary/20 touch-target disabled:opacity-70 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              {t("common.loading") || "Logging in..."}
            </>
          ) : (
            t("auth.login") || "Log In"
          )}
        </button>
      </form>

      <AuthDivider />
      
      <SocialLoginButton />

      <p className="mt-10 text-center text-lg text-smriti-text font-medium">
        {t("auth.noAccount") || "Don't have an account?"}{" "}
        <Link href="/signup" className="text-smriti-primary font-bold hover:underline">
          {t("auth.signup") || "Create an account"}
        </Link>
      </p>
    </motion.div>
  );
}
