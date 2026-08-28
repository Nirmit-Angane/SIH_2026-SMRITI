import { en, TranslationType } from "./en";
import { hi } from "./hi";

// For unsupported languages, we'll cast `en` to keep types clean but at runtime we might use fallback
export const locales: Record<string, TranslationType> = {
  en,
  hi,
};

export type { TranslationType };
