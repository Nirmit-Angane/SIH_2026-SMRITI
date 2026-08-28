import { db, FamilyMember } from "@/lib/db/dexie";

// Helper to compress image before saving to DB
export async function compressImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Max dimensions to ensure face is recognizable but file is small
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to WebP for better compression if supported, else JPEG
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error("Canvas to Blob failed"));
            }
          },
          "image/jpeg",
          0.85
        );
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
}

// Data Layer functions
export const familyStorage = {
  
  async addFamilyMember(memberData: Omit<FamilyMember, "id" | "createdAt" | "elderId">, elderId: number = 1): Promise<number> {
    const member: FamilyMember = {
      ...memberData,
      elderId,
      createdAt: new Date().toISOString(),
    };
    // Dexie returns the autoincremented ID
    const id = await db.familyMembers.add(member);
    return id as number;
  },

  async updateFamilyMember(id: number, changes: Partial<Omit<FamilyMember, "id" | "createdAt" | "elderId">>): Promise<number> {
    return await db.familyMembers.update(id, changes);
  },

  async deleteFamilyMember(id: number): Promise<void> {
    return await db.familyMembers.delete(id);
  },

  // Note: We don't necessarily need a getFamilyMembers here because 
  // UI components will use `useLiveQuery(() => db.familyMembers.where({ elderId }).toArray())` 
  // for automatic reactivity, but it's good to have for non-reactive needs.
  async getFamilyMembers(elderId: number = 1): Promise<FamilyMember[]> {
    return await db.familyMembers.where({ elderId }).toArray();
  }
};
