import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { StoryActivity } from "@/components/activities/story-time/StoryActivity";

export default function StoryTimePage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="pt-6 md:pt-10 flex flex-col items-center">
          <StoryActivity />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
