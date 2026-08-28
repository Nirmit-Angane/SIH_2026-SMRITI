import Dexie, { Table } from 'dexie';

export interface ElderProfile {
  id?: number;
  displayName: string;
  region: string;
  uiLanguage: string;
  voiceLanguage: string;
  preferences: string; // JSON string
  createdAt: string;
}

export interface FamilyMember {
  id?: number;
  elderId: number;
  name: string;
  relationship: string;
  photoBlob: Blob | null;
  memoryNote?: string;
  useInGames: boolean;
  createdAt: string;
}

export interface GameSession {
  id?: number;
  elderId: number;
  gameType: string;
  region: string;
  difficulty: number;
  score: number;
  accuracy: number;
  responseTime: number;
  retries: number;
  completedAt: string;
}

export interface Reminder {
  id?: number;
  elderId: number;
  type: string;
  title: string;
  schedule: string;
  enabled: boolean;
  completedAt?: string;
}

export interface CulturalItem {
  id?: number;
  region: string;
  category: string;
  nameByLanguage: string; // JSON string
  imagePath: string;
  verified: boolean;
  active: boolean;
}

export interface StorySession {
  id?: number;
  elderId: number;
  theme: string;
  language: string;
  story: string;
  question: string;
  acceptedAnswers: string; // JSON array string
  userAnswer?: string;
  result?: string;
  createdAt: string;
}

export interface Memory {
  id?: number;
  elderId: number;
  title: string;
  year: string;
  photoBlob: Blob | null;
  description?: string;
  personIds?: number[]; // IDs of FamilyMembers
  createdAt: string;
}

export class CognitiveCompanionDB extends Dexie {
  elderProfiles!: Table<ElderProfile>;
  familyMembers!: Table<FamilyMember>;
  gameSessions!: Table<GameSession>;
  reminders!: Table<Reminder>;
  culturalItems!: Table<CulturalItem>;
  storySessions!: Table<StorySession>;
  memories!: Table<Memory>;

  constructor() {
    super('CognitiveCompanionDB');
    this.version(2).stores({
      elderProfiles: '++id, region',
      familyMembers: '++id, elderId, useInGames',
      gameSessions: '++id, elderId, gameType',
      reminders: '++id, elderId, type',
      culturalItems: '++id, region, category',
      storySessions: '++id, elderId, theme',
      memories: '++id, elderId, year'
    });
  }
}

export const db = new CognitiveCompanionDB();
