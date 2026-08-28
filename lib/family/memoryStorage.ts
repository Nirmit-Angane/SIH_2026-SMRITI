import { db, Memory } from "@/lib/db/dexie";
import { compressImage } from "./familyStorage";

export const memoryStorage = {
  
  async addMemory(memoryData: Omit<Memory, "id" | "createdAt" | "elderId">, elderId: number = 1): Promise<number> {
    const memory: Memory = {
      ...memoryData,
      elderId,
      createdAt: new Date().toISOString(),
    };
    const id = await db.memories.add(memory);
    return id as number;
  },

  async updateMemory(id: number, changes: Partial<Omit<Memory, "id" | "createdAt" | "elderId">>): Promise<number> {
    return await db.memories.update(id, changes);
  },

  async deleteMemory(id: number): Promise<void> {
    return await db.memories.delete(id);
  },

  async getMemories(elderId: number = 1): Promise<Memory[]> {
    // Return memories sorted by year descending
    const memories = await db.memories.where({ elderId }).toArray();
    return memories.sort((a, b) => parseInt(b.year || "0") - parseInt(a.year || "0"));
  }
};

export { compressImage };
