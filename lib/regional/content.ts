export interface CulturalCard {
  id: string;
  region: string;
  category: "place" | "festival" | "culture";
  name: string;
  imageUrl: string;
}

// In a real application, these would be curated, approved, culturally accurate images.
// For this MVP, we use high-quality Unsplash placeholders that represent general concepts.
export const regionalContent: Record<string, CulturalCard[]> = {
  manipur: [
    { id: "mn-1", region: "manipur", category: "place", name: "Loktak Lake", imageUrl: "https://images.unsplash.com/photo-1542718107-164f895c3bbd?w=800&q=80" },
    { id: "mn-2", region: "manipur", category: "festival", name: "Yaoshang Festival", imageUrl: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=800&q=80" },
    { id: "mn-3", region: "manipur", category: "culture", name: "Traditional Dance", imageUrl: "https://images.unsplash.com/photo-1516053816503-45561b3699c2?w=800&q=80" },
    { id: "mn-4", region: "manipur", category: "place", name: "Kangla Fort", imageUrl: "https://images.unsplash.com/photo-1588636186411-e1293fb8b093?w=800&q=80" },
  ],
  assam: [
    { id: "as-1", region: "assam", category: "place", name: "Kaziranga National Park", imageUrl: "https://images.unsplash.com/photo-1581414440058-2929e0ddf8a3?w=800&q=80" },
    { id: "as-2", region: "assam", category: "festival", name: "Bihu Festival", imageUrl: "https://images.unsplash.com/photo-1623837946115-4cfde3e7a095?w=800&q=80" },
    { id: "as-3", region: "assam", category: "culture", name: "Assam Tea Garden", imageUrl: "https://images.unsplash.com/photo-1590161474945-8c01d4a04d2e?w=800&q=80" },
    { id: "as-4", region: "assam", category: "place", name: "Kamakhya Temple", imageUrl: "https://images.unsplash.com/photo-1601007788487-ebdfdf1775e1?w=800&q=80" },
  ],
  "arunachal-pradesh": [
    { id: "ap-1", region: "arunachal-pradesh", category: "place", name: "Tawang Monastery", imageUrl: "https://images.unsplash.com/photo-1604938676527-2c9cc08819d9?w=800&q=80" },
    { id: "ap-2", region: "arunachal-pradesh", category: "festival", name: "Losar Festival", imageUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80" },
    { id: "ap-3", region: "arunachal-pradesh", category: "culture", name: "Traditional Weaving", imageUrl: "https://images.unsplash.com/photo-1616422285623-14c1fa0b6f91?w=800&q=80" },
  ],
  meghalaya: [
    { id: "ml-1", region: "meghalaya", category: "place", name: "Living Root Bridges", imageUrl: "https://images.unsplash.com/photo-1582236371239-2ceab8c6f134?w=800&q=80" },
    { id: "ml-2", region: "meghalaya", category: "place", name: "Dawki River", imageUrl: "https://images.unsplash.com/photo-1588636186411-e1293fb8b093?w=800&q=80" },
    { id: "ml-3", region: "meghalaya", category: "culture", name: "Nongkrem Dance", imageUrl: "https://images.unsplash.com/photo-1516053816503-45561b3699c2?w=800&q=80" },
  ],
  mizoram: [
    { id: "mz-1", region: "mizoram", category: "place", name: "Aizawl Hills", imageUrl: "https://images.unsplash.com/photo-1542718107-164f895c3bbd?w=800&q=80" },
    { id: "mz-2", region: "mizoram", category: "festival", name: "Chapchar Kut", imageUrl: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=800&q=80" },
    { id: "mz-3", region: "mizoram", category: "culture", name: "Cheraw Dance", imageUrl: "https://images.unsplash.com/photo-1516053816503-45561b3699c2?w=800&q=80" },
  ],
  nagaland: [
    { id: "nl-1", region: "nagaland", category: "place", name: "Dzükou Valley", imageUrl: "https://images.unsplash.com/photo-1581414440058-2929e0ddf8a3?w=800&q=80" },
    { id: "nl-2", region: "nagaland", category: "festival", name: "Hornbill Festival", imageUrl: "https://images.unsplash.com/photo-1623837946115-4cfde3e7a095?w=800&q=80" },
    { id: "nl-3", region: "nagaland", category: "culture", name: "Naga Shawl", imageUrl: "https://images.unsplash.com/photo-1616422285623-14c1fa0b6f91?w=800&q=80" },
  ],
  tripura: [
    { id: "tr-1", region: "tripura", category: "place", name: "Ujjayanta Palace", imageUrl: "https://images.unsplash.com/photo-1601007788487-ebdfdf1775e1?w=800&q=80" },
    { id: "tr-2", region: "tripura", category: "place", name: "Neermahal", imageUrl: "https://images.unsplash.com/photo-1542718107-164f895c3bbd?w=800&q=80" },
    { id: "tr-3", region: "tripura", category: "festival", name: "Kharchi Puja", imageUrl: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?w=800&q=80" },
  ],
  sikkim: [
    { id: "sk-1", region: "sikkim", category: "place", name: "Kanchenjunga", imageUrl: "https://images.unsplash.com/photo-1582236371239-2ceab8c6f134?w=800&q=80" },
    { id: "sk-2", region: "sikkim", category: "place", name: "Tsomgo Lake", imageUrl: "https://images.unsplash.com/photo-1588636186411-e1293fb8b093?w=800&q=80" },
    { id: "sk-3", region: "sikkim", category: "culture", name: "Buddhism Prayer Flags", imageUrl: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?w=800&q=80" },
  ],
};

export function getRegionalContent(regionId: string): CulturalCard[] {
  return regionalContent[regionId] || regionalContent["assam"]; // Fallback to assam if not found
}
