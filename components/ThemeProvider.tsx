"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { profile } = useAuth();
  const pathname = usePathname();

  useEffect(() => {
    // Determine the region to apply
    let region = "";

    if (profile?.region) {
      region = profile.region;
    }

    // Always ensure data-region is set on the document root so CSS variables apply
    if (region) {
      document.documentElement.setAttribute('data-region', region);
    } else {
      document.documentElement.removeAttribute('data-region');
    }
    
    // Apply text size scaling
    if (profile?.accessibility?.textSize) {
      switch (profile.accessibility.textSize) {
        case "large":
          document.documentElement.style.fontSize = "112.5%"; // 18px base
          break;
        case "extraLarge":
          document.documentElement.style.fontSize = "125%"; // 20px base
          break;
        case "standard":
        default:
          document.documentElement.style.fontSize = "100%"; // 16px base
          break;
      }
    } else {
      document.documentElement.style.fontSize = "100%";
    }

    // Apply high contrast mode
    if (profile?.accessibility?.highContrast) {
      document.documentElement.setAttribute('data-high-contrast', 'true');
    } else {
      document.documentElement.removeAttribute('data-high-contrast');
    }
    
    // Add smooth transition class to body to make theme changes elegant
    document.body.classList.add("transition-colors", "duration-700");
  }, [profile?.region, profile?.accessibility?.textSize, profile?.accessibility?.highContrast, pathname]);

  return <>{children}</>;
}
