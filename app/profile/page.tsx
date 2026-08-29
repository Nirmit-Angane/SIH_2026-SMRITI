"use client";

import { useState } from "react";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { EditProfileModal } from "@/components/profile/EditProfileModal";
import { ExperienceSettings } from "@/components/profile/ExperienceSettings";
import { AccessibilitySettings } from "@/components/profile/AccessibilitySettings";
import { ActivityPreferences } from "@/components/profile/ActivityPreferences";
import { FamilyConnection } from "@/components/profile/FamilyConnection";
import { PrivacySettings } from "@/components/profile/PrivacySettings";
import { AccountSettings } from "@/components/profile/AccountSettings";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilePage() {
  const { loading } = useAuth();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <ProtectedRoute>
      <DashboardLayout>
        {loading ? (
          <div className="pt-4 flex flex-col items-center animate-pulse">
            <div className="w-24 h-24 bg-[#dbe1ff] neo-border mb-4"></div>
            <div className="w-48 h-8 bg-white neo-border mb-8"></div>
            <div className="w-full max-w-5xl h-64 bg-white neo-border mb-8"></div>
          </div>
        ) : (
          <div className="w-full max-w-6xl mx-auto flex flex-col items-center">
            
            {/* Top Profile Header */}
            <ProfileHeader onEditClick={() => setIsEditModalOpen(true)} />
            
            {/* 2-Column Responsive Dashboard Layout: Fully utilizes wide screen space */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
              
              {/* Left Column: Language, Region, and Visual Accessibility Controls */}
              <div className="lg:col-span-7 flex flex-col gap-6">
                <ExperienceSettings />
                <AccessibilitySettings />
              </div>

              {/* Right Column: Activity Preferences, Family Circle, Privacy & Account */}
              <div className="lg:col-span-5 flex flex-col gap-6">
                <ActivityPreferences />
                <FamilyConnection />
                <PrivacySettings />
                <AccountSettings />
              </div>

            </div>
            
            {/* Edit Profile Modal */}
            <EditProfileModal 
              isOpen={isEditModalOpen}
              onClose={() => setIsEditModalOpen(false)}
            />
          </div>
        )}
      </DashboardLayout>
    </ProtectedRoute>
  );
}
