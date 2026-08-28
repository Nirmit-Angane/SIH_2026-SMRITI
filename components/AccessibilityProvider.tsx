"use client";

import { useAuth } from "@/hooks/useAuth";
import { MotionConfig } from "framer-motion";

export default function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();

  const reducedMotion = profile?.accessibility?.reducedMotion ? "always" : "user";

  return (
    <MotionConfig reducedMotion={reducedMotion}>
      {children}
    </MotionConfig>
  );
}
