"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { HomeGreeting } from "@/components/home/HomeGreeting";
import { RecommendedActivityHero } from "@/components/dashboard/RecommendedActivityHero";
import { FamiliarFace } from "@/components/home/FamiliarFace";
import { TalkToSmritiHome } from "@/components/home/TalkToSmritiHome";
import { QuickActivityLauncher } from "@/components/home/QuickActivityLauncher";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
          
          {/* Greeting Header */}
          <HomeGreeting />

          {/* Recommended Cognitive Activity Hero */}
          <RecommendedActivityHero />

          {/* 2-Column Balanced Row: Care Spotlight & Voice Assistant */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-6">
              <FamiliarFace />
            </div>
            <div className="lg:col-span-6">
              <TalkToSmritiHome />
            </div>
          </div>

          {/* Quick Activities Hub */}
          <QuickActivityLauncher />

        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
