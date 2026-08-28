import AuthLayout from "@/components/auth/AuthLayout";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function ForgotPasswordPage() {
  return (
    <ProtectedRoute requireAuth={false}>
      <AuthLayout>
        <ForgotPasswordForm />
      </AuthLayout>
    </ProtectedRoute>
  );
}
