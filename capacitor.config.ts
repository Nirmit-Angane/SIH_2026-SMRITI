import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smriti.eldercompanion',
  appName: 'SMRITI',
  webDir: 'out',
  server: {
    // If you want live hot-reload or testing against Vercel, you can uncomment url
    // url: 'https://smriti-sih.vercel.app',
    androidScheme: 'https',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2500,
      launchAutoHide: true,
      backgroundColor: "#FBFDFE",
      androidSplashResourceName: "splash",
      androidScaleType: "CENTER_CROP",
      showSpinner: false,
      splashFullScreen: true,
      splashImmersive: true,
    },
    LocalNotifications: {
      smallIcon: "ic_launcher",
      iconColor: "#8B3A3A",
      sound: "beep.wav",
    },
  },
};

export default config;
