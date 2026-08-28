import { speechService } from "@/lib/speech/speechService";

export interface ScheduledReminder {
  id: number;
  type: "water" | "medicine" | "activity" | "checkin";
  title: string;
  body: string;
  hour: number;
  minute: number;
  repeatDaily?: boolean;
}

class NotificationService {
  private initialized = false;

  private async getLocalNotifications() {
    if (typeof window === "undefined") return null;
    try {
      const mod = await import("@capacitor/local-notifications");
      return mod.LocalNotifications;
    } catch {
      return null;
    }
  }

  async init() {
    if (this.initialized || typeof window === "undefined") return;

    try {
      const LocalNotifications = await this.getLocalNotifications();
      if (!LocalNotifications) return;

      // Create Android Notification Channels
      await LocalNotifications.createChannel({
        id: "hydration_channel",
        name: "Water & Hydration Reminders",
        description: "Gentle reminders to drink water throughout the day",
        importance: 4,
        visibility: 1,
        vibration: true,
      });

      await LocalNotifications.createChannel({
        id: "medicine_channel",
        name: "Medicine & Health Alerts",
        description: "Timely reminders to take prescribed medications",
        importance: 5,
        visibility: 1,
        vibration: true,
      });

      LocalNotifications.addListener("localNotificationActionPerformed", (notification) => {
        const title = notification.notification.title;
        const body = notification.notification.body;
        const extra = notification.notification.extra || {};
        this.speakAnnouncement(body || title, extra.lang || "en");
      });

      this.initialized = true;
    } catch (e) {
      console.warn("LocalNotifications init notice:", e);
    }
  }

  async requestPermission(): Promise<boolean> {
    try {
      const LocalNotifications = await this.getLocalNotifications();
      if (!LocalNotifications) {
        if (typeof window !== "undefined" && "Notification" in window) {
          const res = await window.Notification.requestPermission();
          return res === "granted";
        }
        return false;
      }
      const status = await LocalNotifications.requestPermissions();
      return status.display === "granted";
    } catch (e) {
      console.warn("Permission request error:", e);
      if (typeof window !== "undefined" && "Notification" in window) {
        const res = await window.Notification.requestPermission();
        return res === "granted";
      }
      return false;
    }
  }

  async checkPermission(): Promise<boolean> {
    try {
      const LocalNotifications = await this.getLocalNotifications();
      if (!LocalNotifications) {
        if (typeof window !== "undefined" && "Notification" in window) {
          return window.Notification.permission === "granted";
        }
        return false;
      }
      const status = await LocalNotifications.checkPermissions();
      return status.display === "granted";
    } catch {
      if (typeof window !== "undefined" && "Notification" in window) {
        return window.Notification.permission === "granted";
      }
      return false;
    }
  }

  // Schedule standard water reminders
  async scheduleDefaultWaterReminders(lang: string = "en") {
    await this.init();
    const hasPerm = await this.requestPermission();
    if (!hasPerm) return;

    const isHindi = lang === "hi";

    const waterTimes = isHindi
      ? [
          { id: 101, hour: 9, min: 0, text: "नमस्ते! सुबह का एक गिलास ताज़ा पानी पी लीजिए।" },
          { id: 102, hour: 11, min: 30, text: "पानी पीने का समय! अपने स्वास्थ्य के लिए थोड़ा पानी पी लें।" },
          { id: 103, hour: 14, min: 0, text: "दोपहर का पानी पीने का समय हो गया है।" },
          { id: 104, hour: 16, min: 30, text: "शाम को एक गिलास ताज़ा पानी अवश्य पिएं।" },
          { id: 105, hour: 19, min: 0, text: "रात के भोजन से पहले थोड़ा पानी पी लीजिए।" },
        ]
      : [
          { id: 101, hour: 9, min: 0, text: "Good morning! Time to drink a fresh glass of water." },
          { id: 102, hour: 11, min: 30, text: "Hydration time! Take a sip of water to stay energetic." },
          { id: 103, hour: 14, min: 0, text: "Afternoon water reminder: Please drink a glass of water." },
          { id: 104, hour: 16, min: 30, text: "Evening refresh! Have some water before tea." },
          { id: 105, hour: 19, min: 0, text: "Dinner time reminder: Remember to drink some water." },
        ];

    const LocalNotifications = await this.getLocalNotifications();
    if (!LocalNotifications) return;

    const notifications = waterTimes.map((item) => ({
      id: item.id,
      title: isHindi ? "💧 पानी पीने का समय" : "💧 Time to Drink Water",
      body: item.text,
      channelId: "hydration_channel",
      schedule: {
        on: {
          hour: item.hour,
          minute: item.min,
        },
        allowWhileIdle: true,
      },
      extra: {
        type: "water",
        speechText: item.text,
        lang,
      },
    }));

    try {
      await LocalNotifications.schedule({ notifications });
    } catch (e) {
      console.error("Failed to schedule water reminders:", e);
    }
  }

  // Schedule custom medicine reminder
  async scheduleMedicineReminder(
    id: number,
    medicineName: string,
    dosage: string,
    hour: number,
    minute: number,
    timing: "morning" | "afternoon" | "evening" | "night",
    lang: string = "en"
  ) {
    await this.init();
    const hasPerm = await this.requestPermission();
    if (!hasPerm) return;

    const isHindi = lang === "hi";

    const timeLabel = isHindi
      ? timing === "morning"
        ? "सुबह"
        : timing === "afternoon"
        ? "दोपहर"
        : timing === "evening"
        ? "शाम"
        : "रात"
      : timing === "morning"
      ? "Morning"
      : timing === "afternoon"
      ? "Afternoon"
      : timing === "evening"
      ? "Evening"
      : "Night";

    const speechText = isHindi
      ? `दवाई का समय! कृपया अपनी ${timeLabel} की दवाई ${medicineName} (${dosage}) ले लीजिए।`
      : `Medicine reminder: Please take your ${timeLabel} medication ${medicineName} (${dosage}).`;

    const LocalNotifications = await this.getLocalNotifications();
    if (!LocalNotifications) return;

    try {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: id,
            title: isHindi ? `💊 दवाई का समय (${medicineName})` : `💊 Medicine Reminder (${medicineName})`,
            body: isHindi ? `${timeLabel} की खुराक: ${dosage}` : `${timeLabel} Dosage: ${dosage}`,
            channelId: "medicine_channel",
            schedule: {
              on: {
                hour,
                minute,
              },
              allowWhileIdle: true,
            },
            extra: {
              type: "medicine",
              speechText,
              lang,
            },
          },
        ],
      });
    } catch (e) {
      console.error("Failed to schedule medicine reminder:", e);
    }
  }

  // Instant trigger for testing or one-time notification
  async triggerTestReminder(type: "water" | "medicine", lang: string = "en") {
    await this.init();
    await this.requestPermission();

    const isHindi = lang === "hi";

    const notif =
      type === "water"
        ? {
            id: 999,
            title: isHindi ? "💧 पानी पीने का समय" : "💧 Time to Drink Water",
            body: isHindi ? "नमस्ते! कृपया एक गिलास ताज़ा पानी पी लीजिए।" : "Hello! Please take a moment to drink a fresh glass of water.",
            channelId: "hydration_channel",
          }
        : {
            id: 998,
            title: isHindi ? "💊 दवाई का समय" : "💊 Medicine Reminder",
            body: isHindi ? "दवाई लेने का समय हो गया है।" : "It is time to take your scheduled medication.",
            channelId: "medicine_channel",
          };

    // 1. Play audible chime
    speechService.playNotificationChime();

    // 2. Trigger browser notification if available
    if (typeof window !== "undefined" && "Notification" in window && Notification.permission === "granted") {
      try {
        new Notification(notif.title, { body: notif.body });
      } catch (e) {
        console.warn("Web Notification notice:", e);
      }
    }

    // 3. Trigger native Capacitor notification if on Android
    try {
      const LocalNotifications = await this.getLocalNotifications();
      if (LocalNotifications) {
        await LocalNotifications.schedule({
          notifications: [
            {
              ...notif,
              schedule: { at: new Date(Date.now() + 1000) },
              extra: { lang },
            },
          ],
        });
      }
    } catch (e) {
      console.warn("Capacitor notification notice:", e);
    }

    // 4. Speak announcement aloud
    setTimeout(() => {
      this.speakAnnouncement(notif.body, lang);
    }, 500);
  }

  async cancelReminder(id: number) {
    try {
      const LocalNotifications = await this.getLocalNotifications();
      if (LocalNotifications) {
        await LocalNotifications.cancel({ notifications: [{ id }] });
      }
    } catch (e) {
      console.warn("Cancel reminder notice:", e);
    }
  }

  async speakAnnouncement(text: string, lang: string = "en") {
    try {
      await speechService.speak(text, lang);
    } catch (e) {
      console.warn("TTS announcement notice:", e);
    }
  }
}

export const notificationService = new NotificationService();
