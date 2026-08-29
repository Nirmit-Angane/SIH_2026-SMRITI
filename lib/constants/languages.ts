export interface StoryLanguage {
  id: string;
  name: string;
  nativeName: string;
  script: string;
  ttsLangCode: "hi-IN" | "en-IN" | "en-US";
  flag?: string;
}

export const STORY_LANGUAGES: StoryLanguage[] = [
  { 
    id: "as", 
    name: "Assamese", 
    nativeName: "অসমীয়া", 
    script: "Assamese (অসমীয়া লিপি)", 
    ttsLangCode: "en-IN" 
  },
  { 
    id: "bn", 
    name: "Bengali", 
    nativeName: "বাংলা", 
    script: "Bengali (বাংলা লিপি)", 
    ttsLangCode: "en-IN" 
  },
  { 
    id: "hi", 
    name: "Hindi", 
    nativeName: "हिन्दी", 
    script: "Devanagari (देवनागरी)", 
    ttsLangCode: "hi-IN" 
  },
  { 
    id: "en", 
    name: "English", 
    nativeName: "English", 
    script: "English (Latin)", 
    ttsLangCode: "en-US" 
  },
  { 
    id: "mni", 
    name: "Manipuri", 
    nativeName: "মৈতৈলোন্ / Manipuri", 
    script: "Manipuri / Meiteilon", 
    ttsLangCode: "en-IN" 
  },
  { 
    id: "kha", 
    name: "Khasi", 
    nativeName: "Ka Ktien Khasi", 
    script: "Khasi (Latin)", 
    ttsLangCode: "en-IN" 
  },
  { 
    id: "lus", 
    name: "Mizo", 
    nativeName: "Mizo ṭawng", 
    script: "Mizo (Latin)", 
    ttsLangCode: "en-IN" 
  },
  { 
    id: "nag", 
    name: "Nagamese", 
    nativeName: "Nagamese", 
    script: "Nagamese Creole (Latin)", 
    ttsLangCode: "en-IN" 
  },
  { 
    id: "ne", 
    name: "Nepali", 
    nativeName: "नेपाली", 
    script: "Nepali (देवनागरी)", 
    ttsLangCode: "hi-IN" 
  },
  { 
    id: "trp", 
    name: "Kokborok", 
    nativeName: "Kokborok", 
    script: "Kokborok (Latin/Bengali)", 
    ttsLangCode: "en-IN" 
  },
];
