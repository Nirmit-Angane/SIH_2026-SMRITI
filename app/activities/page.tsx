"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ActivitiesHeader } from "@/components/activities/ActivitiesHeader";
import { RecommendedActivity } from "@/components/activities/RecommendedActivity";
import { ActivityCategories } from "@/components/activities/ActivityCategories";
import { ActivityLibrary } from "@/components/activities/ActivityLibrary";
import { RecentlyEnjoyed } from "@/components/activities/RecentlyEnjoyed";
import { ActivityJourney } from "@/components/activities/ActivityJourney";

export default function ActivitiesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="pt-6 md:pt-10 flex flex-col items-center">
          <ActivitiesHeader />
          <RecommendedActivity />
          <ActivityCategories />
          <ActivityLibrary />
          <RecentlyEnjoyed />
          <ActivityJourney />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
