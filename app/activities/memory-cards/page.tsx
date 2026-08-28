import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { MemoryCardsActivity } from "@/components/activities/memory-cards/MemoryCardsActivity";

export default function MemoryCardsPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="pt-6 md:pt-10 flex flex-col items-center">
          <MemoryCardsActivity />
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
}
