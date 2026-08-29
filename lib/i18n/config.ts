export type RegionId = "assam" | "arunachal-pradesh" | "manipur" | "meghalaya" | "mizoram" | "nagaland" | "tripura" | "sikkim";

export interface LanguageMetadata {
  code: string;
  name: string;
  nativeName: string;
  direction: "ltr" | "rtl";
  supported: boolean;
  voiceInputSupported: boolean;
  ttsSupported: boolean;
  speechCode?: string; // e.g. hi-IN or en-IN
}

export const LANGUAGES: Record<string, LanguageMetadata> = {
  en: { code: "en", name: "English", nativeName: "English", direction: "ltr", supported: true, voiceInputSupported: true, ttsSupported: true, speechCode: "en-IN" },
  hi: { code: "hi", name: "Hindi", nativeName: "हिन्दी", direction: "ltr", supported: true, voiceInputSupported: true, ttsSupported: true, speechCode: "hi-IN" },
  as: { code: "as", name: "Assamese", nativeName: "অসমীয়া", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  bn: { code: "bn", name: "Bengali", nativeName: "বাংলা", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  kha: { code: "kha", name: "Khasi", nativeName: "Khasi", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  lus: { code: "lus", name: "Mizo", nativeName: "Mizo ṭawng", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  mni: { code: "mni", name: "Meitei", nativeName: "মৈতৈলোন", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  ne: { code: "ne", name: "Nepali", nativeName: "नेपाली", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "hi-IN" },
  nag: { code: "nag", name: "Nagamese", nativeName: "Nagamese", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  nagamese: { code: "nagamese", name: "Nagamese", nativeName: "Nagamese", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  kok: { code: "kok", name: "Kokborok", nativeName: "Kokborok", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  trp: { code: "trp", name: "Kokborok", nativeName: "Kokborok", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  adi: { code: "adi", name: "Adi", nativeName: "Adi", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  njo: { code: "njo", name: "Nyishi", nativeName: "Nyishi", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  garo: { code: "garo", name: "Garo", nativeName: "A·chik", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  sip: { code: "sip", name: "Sikkimese", nativeName: "འབྲས་ལྗོངས་སྐད་", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" },
  lep: { code: "lep", name: "Lepcha", nativeName: "ᰛᰩᰵᰛᰧᰵᰶ", direction: "ltr", supported: true, voiceInputSupported: false, ttsSupported: false, speechCode: "en-IN" }
};

export interface RegionLanguageConfig {
  recommended: string[];
  common: string[];
  fallback: string[];
}

export const REGION_LANGUAGE_CONFIG: Record<RegionId, RegionLanguageConfig> = {
  "arunachal-pradesh": {
    recommended: ["njo", "adi"],
    common: [],
    fallback: ["hi", "en"]
  },
  "assam": {
    recommended: ["as"],
    common: ["bn"],
    fallback: ["hi", "en"]
  },
  "meghalaya": {
    recommended: ["kha"],
    common: ["garo"],
    fallback: ["hi", "en"]
  },
  "nagaland": {
    recommended: ["en"],
    common: ["nagamese"],
    fallback: ["hi"]
  },
  "manipur": {
    recommended: ["mni"],
    common: [],
    fallback: ["hi", "en"]
  },
  "mizoram": {
    recommended: ["lus"],
    common: [],
    fallback: ["hi", "en"]
  },
  "tripura": {
    recommended: ["bn"],
    common: ["kok"],
    fallback: ["hi", "en"]
  },
  "sikkim": {
    recommended: ["ne"],
    common: ["sip", "lep"],
    fallback: ["hi", "en"]
  }
};
