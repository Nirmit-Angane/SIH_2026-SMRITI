"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ActivitiesHeader } from "@/components/activities/ActivitiesHeader";
import { RecommendedActivity } from "@/components/activities/RecommendedActivity";
import { ActivityLibrary } from "@/components/activities/ActivityLibrary";
import { RecentlyEnjoyed } from "@/components/activities/RecentlyEnjoyed";
import { ActivityJourney } from "@/components/activities/ActivityJourney";

export default function ActivitiesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="w-full max-w-6xl mx-auto flex flex-col">
          <ActivitiesHeader />
          <RecommendedActivity />
          <ActivityLibrary />
          
          {/* Responsive 2-column bottom section */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            <div className="lg:col-span-7">
              <ActivityJourney />
            </div>
            <div className="lg:col-span-5">
              <RecentlyEnjoyed />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
