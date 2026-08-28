"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
}

export default function ProtectedRoute({ children, requireAuth = true }: ProtectedRouteProps) {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (loading) return;

    const isAuthRoute = pathname === "/login" || pathname === "/signup" || pathname === "/forgot-password";
    const isOnboardingRoute = pathname === "/onboarding";

    if (requireAuth && !user) {
      // Redirect to login if user is not authenticated and tries to access protected route
      router.push("/login");
    } else if (user) {
      // If user is authenticated, check their onboarding status
      const hasCompletedOnboarding = profile?.onboardingCompleted;

      if (!hasCompletedOnboarding && !isOnboardingRoute) {
        // Force them to onboarding if they haven't finished it
        router.push("/onboarding");
      } else if (hasCompletedOnboarding && (isAuthRoute || isOnboardingRoute)) {
        // If they finished onboarding, keep them out of auth and onboarding routes
        router.push("/dashboard");
      }
    }
  }, [user, profile, loading, requireAuth, pathname, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-smriti-bg">
        <Loader2 className="w-10 h-10 animate-spin text-smriti-primary" />
      </div>
    );
  }

  // If requires auth but no user, don't render children
  if (requireAuth && !user) {
    return null;
  }

  return <>{children}</>;
}
