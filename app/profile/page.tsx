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
          <div className="pt-6 md:pt-10 flex flex-col items-center animate-pulse">
            <div className="w-24 h-24 bg-smriti-border rounded-full mb-4"></div>
            <div className="w-32 h-8 bg-smriti-border rounded-md mb-8"></div>
            <div className="w-full max-w-2xl h-48 bg-smriti-border rounded-3xl mb-8"></div>
            <div className="w-full max-w-2xl h-48 bg-smriti-border rounded-3xl mb-8"></div>
          </div>
        ) : (
          <div className="pt-6 md:pt-10 flex flex-col items-center">
            <ProfileHeader onEditClick={() => setIsEditModalOpen(true)} />
            
            <ExperienceSettings />
            <AccessibilitySettings />
            <ActivityPreferences />
            <FamilyConnection />
            <PrivacySettings />
            <AccountSettings />
            
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
