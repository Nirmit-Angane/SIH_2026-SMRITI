import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { TetrisActivity } from "@/components/activities/tetris/TetrisActivity";

export default function TetrisPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="pt-6 md:pt-10 flex flex-col items-center">
          <TetrisActivity />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
