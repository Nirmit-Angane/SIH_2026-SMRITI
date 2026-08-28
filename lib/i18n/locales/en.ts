export const en = {
  common: {
    comingSoon: "Coming soon",
    save: "Save",
    cancel: "Cancel",
    remove: "Remove",
    edit: "Edit",
    delete: "Delete",
    add: "Add",
    loading: "Loading...",
    saving: "Saving...",
    pleaseWait: "Please wait...",
    continue: "Continue",
    start: "Start",
    back: "Back",
    next: "Next",
    finish: "Finish",
    close: "Close"
  },
  nav: {
    home: "Home",
    activities: "Activities",
    family: "Family",
    profile: "Profile"
  },
  auth: {
    login: "Log In",
    signup: "Sign Up",
    email: "Email address",
    password: "Password",
    continueWithGoogle: "Continue with Google",
    noAccount: "Don't have an account?",
    haveAccount: "Already have an account?",
    forgotPassword: "Forgot password?"
  },
  home: {
    greeting: "Good morning, {{name}}.",
    subtitle: "Let's take a gentle moment together.",
    todaysActivity: "Today's Activity",
    readyMessage: "A gentle activity is ready for you.",
    startActivity: "Start Activity",
    whatToDo: "What would you like to do?",
    talkToSmriti: "Talk to SMRITI",
    startTalking: "Start Talking"
  },
  activities: {
    title: "Activities",
    subtitle: "Take a gentle moment to remember, notice, and connect.",
    family: {
      title: "Family & Friends",
      desc: "Recognize familiar faces and names."
    },
    memory: {
      title: "Memory Cards",
      desc: "Match familiar pictures and remember."
    },
    changes: {
      title: "What Changed?",
      desc: "Look carefully and notice what is different."
    },
    story: {
      title: "Story Time",
      desc: "Listen to a familiar story and remember together."
    },
    journey: {
      title: "Your Activity Journey",
      desc: "A little time each day can become a meaningful routine.",
      thisWeek: "This Week"
    }
  },
  family: {
    yourPeople: "Your People",
    peopleDesc: "People and memories that are close to you.",
    memoriesTogether: "Memories together",
    addMemory: "Add a new memory",
    addPerson: "Add person"
  },
  profile: {
    title: "Profile",
    subtitle: "Your SMRITI space",
    editProfile: "Edit Profile",
    saveChanges: "Save Changes",
    experience: {
      title: "Experience",
      region: "Region & Theme",
      regionDesc: "Changes colors and cultural patterns",
      language: "Language",
      languageDesc: "Written text language",
      chooseLanguage: "Choose a language that feels comfortable.",
      recommended: "Recommended for your region",
      voiceGuidance: "Voice Guidance",
      voiceGuidanceDesc: "Spoken instructions in activities",
      voiceNotAvailable: "Voice guidance is currently available in {{fallback}}.",
      regionChanged: "Your region has changed.",
      languagePrompt: "{{language}} is commonly used in {{region}}.",
      wouldYouLikeToSwitch: "Would you like to use {{language}}?",
      keepLanguage: "Keep {{language}}",
      switchLanguage: "Switch to {{language}}"
    },
    accessibility: {
      title: "Accessibility",
      textSize: "Text Size",
      textSizeDesc: "Make words larger and easier to read",
      highContrast: "High Contrast",
      highContrastDesc: "Make colors brighter and easier to see",
      reducedMotion: "Reduced Motion",
      reducedMotionDesc: "Disable interface animations"
    },
    activities: {
      title: "Activities",
      daily: "Daily Gentle Activity",
      dailyDesc: "Recommend one simple activity each day",
      preferences: "Activity Preferences",
      preferencesDesc: "Choose what you enjoy most"
    },
    privacy: {
      title: "Privacy & Data",
      clearData: "Clear local data",
      clearDataDesc: "Remove memories and photos from this device",
      dataCleared: "Data cleared successfully."
    },
    account: {
      title: "Account",
      signOut: "Sign Out",
      signOutConfirm: "Are you sure you want to sign out?"
    }
  },
  games: {
    familyRecognition: {
      introTitle: "Let's remember familiar faces.",
      introDesc: "Take your time. Look at the faces and choose the person you recognize.",
      begin: "Begin",
      whoIsThis: "Who is this?",
      correctFeedback: "That's right. You recognized {{name}}.",
      incorrectFeedback: "That's okay. This is {{name}} — your {{relation}}.",
      continue: "Continue",
      wellDone: "Well done, {{name}}.",
      resultDesc: "You spent a few moments with familiar faces today.",
      score: "{{correct}} of {{total}} recognized",
      everyMoment: "Every moment counts.",
      finish: "Finish",
      emptyTitle: "Let's add a few more familiar faces first.",
      emptyDesc: "Add at least 3 family members with photos so we can create a gentle recognition activity.",
      goToFamily: "Go to Family",
      loading: "Getting familiar faces ready...",
      error: "We couldn't load your family memories right now.",
      tryAgain: "Try Again"
    },
    memoryCards: {
      findMatching: "Find the matching pictures.",
      wellDone: "Well done!",
      tryAgain: "That's okay. Try another one.",
      whatRemember: "What did you remember?",
      introTitle: "Memory Cards",
      introDesc: "Let's look at some familiar pictures and find the matching pairs.",
      begin: "Begin",
      correctMatch: "That's right.",
      finishedTitle: "That was a lovely moment.",
      finishedDesc: "Wonderful effort.",
      score: "{{pairs}} familiar pairs remembered",
      playAgain: "Play Again",
      backToActivities: "Back to Activities",
      emptyTitle: "Add a few family photos to make this activity more personal.",
      goToFamily: "Go to Family",
      loading: "Gathering familiar pictures..."
    },
    tetris: {
      instructions: "Move the shapes into place.",
      begin: "Begin",
      completed: "Well done.",
      completionMsg: "You cleared {{lines}} lines.",
      pause: "Pause",
      resume: "Resume",
      loading: "Preparing...",
      title: "Tetris",
      introDesc: "A calm, gentle puzzle of falling shapes.",
      error: "Something went wrong.",
      tryAgain: "Try Again",
      playAgain: "Play Again",
      backToActivities: "Back to Activities",
      rotate: "Rotate",
      left: "Left",
      right: "Right",
      drop: "Drop"
    },
    storyTime: {
      instructions: "Listen to a familiar story.",
      begin: "Begin",
      completed: "Story complete.",
      loading: "Preparing a story for you...",
      title: "Story Time",
      introDesc: "A short, familiar story just for you.",
      error: "We couldn't prepare the story right now.",
      tryAgain: "Try Again",
      playAgain: "Listen Again",
      newStory: "New Story",
      backToActivities: "Back to Activities",
      play: "Play",
      pause: "Pause",
      noAudio: "The story is ready, but audio is currently unavailable.",
      readStory: "Read Story"
    }
  }
};

export type TranslationType = typeof en;
