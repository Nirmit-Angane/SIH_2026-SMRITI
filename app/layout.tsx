import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import ThemeProvider from "@/components/ThemeProvider";
import AccessibilityProvider from "@/components/AccessibilityProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smriti | AI-Powered Memory Companion",
  description: "Remember. Connect. Engage. An AI-powered cognitive and memory assistance platform designed for elderly users and their families in the NER.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-smriti-bg text-smriti-text`}
      >
        <AuthProvider>
          <ThemeProvider>
            <AccessibilityProvider>
              <LanguageProvider>
                {children}
              </LanguageProvider>
            </AccessibilityProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
