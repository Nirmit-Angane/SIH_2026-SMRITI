import AuthLayout from "@/components/auth/AuthLayout";
import { SignupForm } from "@/components/auth/SignupForm";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

export default function SignupPage() {
  return (
    <ProtectedRoute requireAuth={false}>
      <AuthLayout reverse={true}>
        <SignupForm />
      </AuthLayout>
    </ProtectedRoute>
  );
}
