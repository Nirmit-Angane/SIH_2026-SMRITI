import AuthLayout from "@/components/auth/AuthLayout";
import { LoginForm } from "@/components/auth/LoginForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function LoginPage() {
  return (
    <ProtectedRoute requireAuth={false}>
      <AuthLayout>
        <LoginForm />
      </AuthLayout>
    </ProtectedRoute>
  );
}
