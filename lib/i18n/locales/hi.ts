import { TranslationType } from "./en";

export const hi: TranslationType = {
  common: {
    comingSoon: "जल्द आ रहा है",
    save: "सहेजें",
    cancel: "रद्द करें",
    remove: "हटाएं",
    edit: "संपादित करें",
    delete: "मिटाएं",
    add: "जोड़ें",
    loading: "लोड हो रहा है...",
    saving: "सहेजा जा रहा है...",
    pleaseWait: "कृपया प्रतीक्षा करें...",
    continue: "जारी रखें",
    start: "शुरू करें",
    play: "खेलें",
    startStory: "कहानी शुरू करें",
    back: "पीछे",
    next: "अगला",
    finish: "समाप्त",
    close: "बंद करें",
    tryAgain: "पुनः प्रयास करें",
    playAgain: "फिर से खेलें",
    enabled: "सक्रिय",
    disabled: "निष्क्रिय",
    on: "चालू",
    off: "बंद",
    mins: "~{{count}} मिनट",
    completed: "पूर्ण",
    inProgress: "प्रगति पर",
    goalMet: "लक्ष्य पूरा",
    markDone: "पूर्ण चिह्नित करें",
    taken: "ले लिया ✓",
    addGlass: "+ गिलास जोड़ें",
    glassesToday: "आज {{current}} / {{max}} गिलास"
  },
  nav: {
    home: "होम",
    activities: "गतिविधियां",
    family: "परिवार",
    profile: "प्रोफ़ाइल"
  },
  auth: {
    login: "लॉग इन करें",
    signup: "साइन अप करें",
    email: "ईमेल पता",
    password: "पासवर्ड",
    continueWithGoogle: "Google के साथ जारी रखें",
    noAccount: "खाता नहीं है?",
    haveAccount: "क्या आपके पास पहले से खाता है?",
    forgotPassword: "पासवर्ड भूल गए?"
  },
  home: {
    greeting: "सुप्रभात, {{name}}।",
    subtitle: "आइए एक साथ एक सौम्य क्षण बिताएं।",
    todaysActivity: "आज की गतिविधि",
    readyMessage: "आपके लिए एक सौम्य गतिविधि तैयार है।",
    startActivity: "गतिविधि शुरू करें",
    whatToDo: "आप क्या करना चाहेंगे?",
    talkToSmriti: "स्मृति से बात करें",
    startTalking: "बात करना शुरू करें",
    todaysPlan: "आज की योजना",
    morningMedicine: "सुबह की दवा",
    medicineDesc: "नाश्ते और गर्म पानी के साथ लें।",
    hydrationCheck: "पानी पीने की जांच",
    dailyWalk: "दैनिक टहलना",
    walkDesc: "20 मिनट बगीचे या बरामदे में सौम्य टहलना।",
    walkCompleted: "✓ टहलना पूरा हुआ",
    markCompleted: "पूर्ण चिह्नित करें"
  },
  activities: {
    title: "गतिविधियां",
    subtitle: "याद रखने, ध्यान देने और जुड़ने के लिए एक सौम्य क्षण निकालें।",
    family: {
      title: "परिवार और मित्र",
      desc: "परिचित चेहरों और नामों को पहचानें।"
    },
    memory: {
      title: "मेमोरी कार्ड",
      desc: "परिचित चित्रों का मिलान करें और याद रखें।"
    },
    changes: {
      title: "क्या बदला?",
      desc: "ध्यान से देखें और अंतर पहचानें।"
    },
    tetris: {
      title: "टेट्रिस",
      desc: "गिरती आकृतियों की एक शांत, सौम्य पहेली।"
    },
    story: {
      title: "कहानी का समय",
      desc: "एक परिचित कहानी सुनें और एक साथ यादें ताज़ा करें।"
    },
    journey: {
      title: "आपकी गतिविधि यात्रा",
      desc: "हर दिन थोड़ा समय एक सार्थक आदत बन सकता है।",
      thisWeek: "इस सप्ताह"
    }
  },
  family: {
    yourPeople: "आपके अपने लोग",
    peopleDesc: "आपके करीबी लोग और अनमोल यादें।",
    memoriesTogether: "साथ बिताए लम्हें",
    addMemory: "नई याद जोड़ें",
    addPerson: "व्यक्ति जोड़ें"
  },
  profile: {
    title: "प्रोफ़ाइल",
    subtitle: "आपका स्मृति व्यक्तिगत स्थान",
    editProfile: "प्रोफ़ाइल संपादित करें",
    saveChanges: "परिवर्तन सहेजें",
    experience: {
      title: "भाषा और क्षेत्रीय अनुभव",
      region: "क्षेत्र और सांस्कृतिक थीम",
      regionDesc: "सांस्कृतिक खेल, व्यंजन और पारंपरिक कला शैलियों को अनुकूलित करता है",
      language: "भाषा चयन",
      languageDesc: "लिखित पाठ भाषा",
      chooseLanguage: "कहानियों, गतिविधियों और संवाद के लिए प्राथमिक भाषा चुनें।",
      recommended: "आपके क्षेत्र के लिए अनुशंसित",
      voiceGuidance: "ध्वनि मार्गदर्शन",
      voiceGuidanceDesc: "निर्देशों और कहानियों को स्वचालित रूप से बोलकर सुनाता है",
      voiceNotAvailable: "ध्वनि मार्गदर्शन वर्तमान में {{fallback}} में उपलब्ध है।",
      regionChanged: "आपका क्षेत्र बदल गया है।",
      languagePrompt: "{{language}} आमतौर पर {{region}} में उपयोग की जाती है।",
      wouldYouLikeToSwitch: "क्या आप {{language}} का उपयोग करना चाहेंगे?",
      keepLanguage: "{{language}} रखें",
      switchLanguage: "{{language}} पर बदलें"
    },
    accessibility: {
      title: "दृश्य और सुगमता नियंत्रण",
      textSize: "पाठ का आकार",
      textSizeDesc: "सुविधाजनक रूप से पढ़ने के लिए शब्दों को बड़ा करें",
      standard: "मानक (डिफ़ॉल्ट)",
      large: "बड़ा (वरिष्ठ अनुकूल)",
      extraLarge: "अतिरिक्त बड़ा (उच्च दृश्यता)",
      highContrast: "उच्च कंट्रास्ट बॉर्डर",
      highContrastDesc: "स्पष्ट और तेज 4px बॉर्डर",
      reducedMotion: "धीमी गति",
      reducedMotionDesc: "संवेदनशील आंखों के लिए एनिमेशन बंद करें"
    },
    activities: {
      title: "गतिविधि प्राथमिकताएं",
      preferredTitle: "पसंदीदा गतिविधियां",
      preferredDesc: "दैनिक दिनचर्या के लिए अपनी पसंदीदा गतिविधियों का चयन करें",
      dailyMoment: "सौम्य दैनिक क्षण",
      dailyMomentDesc: "स्वचालित दैनिक स्मरण प्राप्त करें",
      daily: "दैनिक सौम्य गतिविधि",
      dailyDesc: "प्रत्येक दिन एक सरल गतिविधि की सिफारिश करें",
      preferences: "गतिविधि प्राथमिकताएं",
      preferencesDesc: "चुनें कि आपको क्या सबसे अधिक पसंद है"
    },
    family: {
      title: "परिवार और स्मृति चक्र",
      countDesc: "{{faces}} चेहरे • {{memories}} यादें",
      manageDesc: "पारिवारिक फ़ोटो, कहानियाँ और वॉयस यादें प्रबंधित करें"
    },
    privacy: {
      title: "गोपनीयता और डिवाइस संग्रहण",
      localStorage: "100% निजी स्थानीय संग्रहण",
      localStorageDesc: "आपकी पारिवारिक तस्वीरें और यादें आपके डिवाइस पर सुरक्षित रहती हैं।",
      resetBank: "स्थानीय मेमोरी बैंक रीसेट करें",
      resetDesc: "स्थानीय फ़ोटो और गतिविधि रिकॉर्ड मिटाएं",
      clearData: "डेटा मिटाएं",
      confirmTitle: "स्थानीय डेटा मिटाएं?",
      confirmDesc: "यह इस ब्राउज़र से सभी संग्रहीत पारिवारिक फ़ोटो, यादें और स्कोर स्थायी रूप से हटा देगा।",
      yesDelete: "हाँ, मिटाएं",
      dataCleared: "स्थानीय मेमोरी डेटा सफलतापूर्वक मिटा दिया गया।"
    },
    account: {
      title: "खाता विवरण",
      signedInAs: "साइन इन किया गया",
      active: "सक्रिय",
      guestUser: "स्थानीय अतिथि उपयोगकर्ता",
      signOut: "खाते से साइन आउट करें",
      confirmTitle: "साइन आउट करें?",
      confirmDesc: "आप अपने ईमेल और पासवर्ड से कभी भी वापस लॉग इन कर सकते हैं।",
      stay: "रहें",
      signOutConfirm: "क्या आप वाकई साइन आउट करना चाहते हैं?"
    }
  },
  caregiver: {
    returnToElder: "बुजुर्ग दृश्य पर लौटें",
    cognitivePlay: "संज्ञानात्मक खेल",
    gamesCompleted: "आज पूरे किए गए खेल",
    recognition: "पहचान सटीकता",
    avgAccuracy: "सत्र की औसत सटीकता",
    memoryCircle: "स्मृति चक्र",
    facesMemories: "{{faces}} चेहरे • {{memories}} यादें",
    recentLog: "हाल की गतिविधि लॉग",
    liveSync: "लाइव सिंक",
    noActivities: "आज अभी तक कोई गतिविधि दर्ज नहीं की गई है।",
    region: "क्षेत्र: {{region}}",
    totalSessions: "कुल सत्र: {{count}}",
    activityStatus: "गतिविधि स्थिति",
    readyForActivity: "गतिविधि के लिए तैयार",
    startCognitiveGame: "संज्ञानात्मक खेल शुरू करें",
    quickCall: "{{name}} को त्वरित कॉल करें"
  },
  games: {
    familyRecognition: {
      introTitle: "आइए परिचित चेहरों को याद करें।",
      introDesc: "आराम से देखें और जिस व्यक्ति को आप पहचानते हैं उसे चुनें।",
      begin: "शुरू करें",
      whoIsThis: "यह कौन हैं?",
      correctFeedback: "बिल्कुल सही! आपने {{name}} को पहचान लिया।",
      incorrectFeedback: "कोई बात नहीं। यह {{name}} हैं — आपके {{relation}}।",
      continue: "जारी रखें",
      wellDone: "बहुत अच्छा, {{name}}।",
      resultDesc: "आपने आज परिचित चेहरों के साथ कुछ पल बिताए।",
      score: "{{total}} में से {{correct}} पहचाने गए",
      everyMoment: "हर पल अनमोल है।",
      finish: "समाप्त",
      emptyTitle: "आइए पहले परिवार के कुछ चेहरे जोड़ें।",
      emptyDesc: "कम से कम 3 परिवार के सदस्यों की फ़ोटो जोड़ें।",
      goToFamily: "परिवार पर जाएं",
      loading: "परिचित चेहरे तैयार हो रहे हैं...",
      error: "पारिवारिक यादें लोड नहीं हो सकीं।",
      tryAgain: "पुनः प्रयास करें"
    },
    memoryCards: {
      findMatching: "मिलते-जुलते चित्र खोजें।",
      wellDone: "बहुत बढ़िया!",
      tryAgain: "कोई बात नहीं, दूसरा प्रयास करें।",
      whatRemember: "आपको क्या याद रहा?",
      introTitle: "मेमोरी कार्ड",
      introDesc: "आइए परिचित चित्रों को देखें और जोड़ियों का मिलान करें।",
      begin: "शुरू करें",
      correctMatch: "बिल्कुल सही।",
      finishedTitle: "यह एक प्यारा पल था।",
      finishedDesc: "शानदार प्रयास।",
      score: "{{pairs}} जोड़ियां याद रहीं",
      playAgain: "फिर से खेलें",
      backToActivities: "गतिविधियों पर वापस जाएं",
      emptyTitle: "पारिवारिक फ़ोटो जोड़कर इसे और व्यक्तिगत बनाएं।",
      goToFamily: "परिवार पर जाएं",
      loading: "परिचित चित्र एकत्रित किए जा रहे हैं..."
    },
    tetris: {
      instructions: "आकृतियों को सही स्थान पर रखें।",
      begin: "शुरू करें",
      completed: "बहुत अच्छा किया।",
      completionMsg: "आपने {{lines}} पंक्तियाँ पूरी कीं।",
      pause: "रोकें",
      resume: "पुनः शुरू",
      loading: "तैयार हो रहा है...",
      title: "टेट्रिस",
      introDesc: "गिरती आकृतियों की एक शांत पहेली।",
      error: "कुछ गड़बड़ हो गई।",
      tryAgain: "पुनः प्रयास करें",
      playAgain: "फिर से खेलें",
      backToActivities: "गतिविधियों पर वापस जाएं",
      rotate: "घुमाएँ",
      left: "बाएँ",
      right: "दाएँ",
      drop: "नीचे गिराएँ"
    },
    storyTime: {
      instructions: "एक परिचित कहानी सुनें।",
      begin: "शुरू करें",
      completed: "कहानी समाप्त हुई।",
      loading: "आपके लिए कहानी तैयार हो रही है...",
      title: "कहानी का समय",
      introDesc: "सिर्फ आपके लिए एक छोटी, परिचित कहानी।",
      error: "कहानी तैयार नहीं हो सकी।",
      tryAgain: "पुनः प्रयास करें",
      playAgain: "फिर से सुनें",
      newStory: "नई कहानी",
      backToActivities: "गतिविधियों पर वापस जाएं",
      play: "चलाएं",
      pause: "रोकें",
      noAudio: "कहानी तैयार है, लेकिन ऑडियो अभी उपलब्ध नहीं है।",
      readStory: "कहानी पढ़ें"
    }
  }
};
