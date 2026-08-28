"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { HomeGreeting } from "@/components/home/HomeGreeting";
import { TodaysGentleMoment } from "@/components/home/TodaysGentleMoment";
import { DailyCheckIn } from "@/components/home/DailyCheckIn";
import { DailyTimeline } from "@/components/home/DailyTimeline";
import { HydrationCard } from "@/components/home/HydrationCard";
import { FamiliarFace } from "@/components/home/FamiliarFace";
import dynamic from 'next/dynamic';

const TalkToSmritiHome = dynamic(
  () => import("@/components/home/TalkToSmritiHome").then((mod) => mod.TalkToSmritiHome),
  { ssr: false }
);
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="pt-6 md:pt-10 flex flex-col items-center">
          <HomeGreeting />
          <TodaysGentleMoment />
          <DailyCheckIn />
          <HydrationCard />
          <DailyTimeline />
          <FamiliarFace />
          <TalkToSmritiHome />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
