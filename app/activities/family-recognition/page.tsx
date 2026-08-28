import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { FamilyFriendsActivity } from "@/components/activities/family-friends/FamilyFriendsActivity";

export default function FamilyRecognitionPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="pt-6 md:pt-10 flex flex-col items-center">
          <FamilyFriendsActivity />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
