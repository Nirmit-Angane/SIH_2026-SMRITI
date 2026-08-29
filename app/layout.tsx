import type { Metadata } from "next";
import { Archivo_Narrow, Inter, Space_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/hooks/useAuth";
import ThemeProvider from "@/components/ThemeProvider";
import AccessibilityProvider from "@/components/AccessibilityProvider";
import { LanguageProvider } from "@/components/LanguageProvider";

const archivoNarrow = Archivo_Narrow({
  variable: "--font-archivo-narrow",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const spaceMono = Space_Mono({
  variable: "--font-space-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Smriti | Culturally Adaptive Cognitive Care",
  description: "Remember. Connect. Engage. An AI-powered cognitive and memory assistance platform designed for elderly users and their families.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body
        className={`${archivoNarrow.variable} ${inter.variable} ${spaceMono.variable} font-body-md antialiased min-h-screen bg-[#f9f9f8] text-[#1a1c1c] selection:bg-[#ffe083] selection:text-[#231b00]`}
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
