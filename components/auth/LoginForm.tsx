"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2, AlertCircle, ArrowLeft } from "lucide-react";
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
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (err: any) {
      console.error(err);
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
    <div className="w-full">
      <div className="mb-6">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-white neo-border px-4 py-2 font-label-caps text-xs uppercase font-bold text-[#1a1c1c] hover:bg-[#f4f4f3] mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] transition-all"
        >
          <ArrowLeft className="w-4 h-4 stroke-[3]" /> Back to Home
        </Link>
        
        <div className="pb-4 border-b-2 border-[#1a1c1c]">
          <h2 className="font-display-lg text-3xl sm:text-4xl font-black uppercase text-[#1a1c1c] tracking-tight mb-2">
            Welcome Back
          </h2>
          <p className="font-body-md text-base text-[#434655]">
            Sign in to continue to your SMRITI space.
          </p>
        </div>
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
            {t("auth.email") || "Email address"}
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
            placeholder={t("auth.password") || "Enter your password"}
          />
          <div className="flex items-center justify-between mt-2">
            <label className="flex items-center gap-2 cursor-pointer py-1 select-none">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-5 h-5 neo-border-2 accent-[#2563eb]"
              />
              <span className="font-label-caps text-xs font-bold uppercase text-[#434655]">Remember me</span>
            </label>
            <Link 
              href="/forgot-password" 
              className="font-label-caps text-xs font-bold uppercase text-[#2563eb] hover:underline"
            >
              {t("auth.forgotPassword") || "Forgot password?"}
            </Link>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full h-14 mt-2 bg-[#2563eb] text-white neo-border shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] active:translate-y-[4px] active:translate-x-[4px] active:shadow-none font-headline-lg text-xl uppercase font-black tracking-wider transition-all disabled:opacity-70 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>{t("common.loading") || "Logging in..."}</span>
            </>
          ) : (
            t("auth.login") || "Log In"
          )}
        </button>
      </form>

      <AuthDivider />
      
      <SocialLoginButton />

      <p className="mt-8 text-center font-body-md text-base text-[#1a1c1c]">
        {t("auth.noAccount") || "Don't have an account?"}{" "}
        <Link href="/signup" className="font-headline-lg uppercase font-black text-[#2563eb] hover:underline ml-1">
          {t("auth.signup") || "Create an account"}
        </Link>
      </p>
    </div>
  );
}
