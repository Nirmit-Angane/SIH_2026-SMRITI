"use client";

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import dynamic from 'next/dynamic';

const VoiceChat = dynamic(
  () => import("@/components/assistant/VoiceChat").then((mod) => mod.VoiceChat),
  { ssr: false }
);

export default function VoicePage() {
  return (
    <ProtectedRoute>
      <VoiceChat />
    </ProtectedRoute>
  );
}
