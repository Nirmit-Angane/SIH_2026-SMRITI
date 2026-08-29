import { NextResponse } from 'next/server';
import { STORY_LANGUAGES } from '@/lib/constants/languages';

interface MemoryItem {
  title: string;
  year?: string;
  description?: string;
}

interface FamilyItem {
  name: string;
  relation: string;
}

interface StoryContext {
  patientName?: string;
  region?: string;
  language?: string;
  targetLangId?: string;
  selectedMemory?: MemoryItem;
  familyMembers?: FamilyItem[];
  memories?: MemoryItem[];
}

function generateDynamicFallback(context: StoryContext, targetLangName: string) {
  const memory = context.selectedMemory || (context.memories && context.memories.length > 0 ? context.memories[0] : null);
  const family = context.familyMembers || [];
  const familyMention = family.length > 0 ? family.map(f => `${f.name} (${f.relation})`).join(", ") : "";

  if (memory) {
    return {
      title: `${memory.title} ${memory.year ? `(${memory.year})` : ""}`,
      story: `Back in ${memory.year || "that memorable year"}, ${memory.title} was a day to remember. ${memory.description || "Everyone gathered together for the occasion."} ${familyMention ? `Joined by ${familyMention}, the day unfolded with lively conversations and shared moments.` : "Every detail of that day remains clear and cherished."}`.trim(),
      theme: "family",
      estimatedDuration: "1 minute",
      language: targetLangName
    };
  }

  return {
    title: "A Golden Afternoon Remembered",
    story: "Gentle sunlight filtered across the courtyard as a soft breeze rustled through the leaves. Familiar voices echoed with the comforting rhythm of home, tea in hand, and quiet stories that connect the past to the present.",
    theme: "nature",
    estimatedDuration: "1 minute",
    language: targetLangName
  };
}

const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
  "qwen/qwen3.6-27b"
];

export async function POST(req: Request) {
  let contextData: StoryContext = {};
  
  try {
    const { context } = await req.json();
    contextData = context || {};
    const apiKey = process.env.GROQ_API_KEY;

    // Resolve target language from 10 supported languages
    const langKey = (contextData.targetLangId || contextData.language || "en").toLowerCase();
    const targetLangObj = STORY_LANGUAGES.find(l => 
      l.id === langKey || 
      l.name.toLowerCase() === langKey ||
      l.nativeName.toLowerCase().includes(langKey)
    ) || STORY_LANGUAGES[3]; // Default English

    if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_groq_api_key') || apiKey === 'mock_groq_key') {
      return NextResponse.json(generateDynamicFallback(contextData, targetLangObj.name));
    }

    const memoryFocus = contextData.selectedMemory 
      ? `PRIMARY MEMORY TO BASE THE STORY ON:
Title: ${contextData.selectedMemory.title}
Year: ${contextData.selectedMemory.year || "Recent"}
Description / Details: ${contextData.selectedMemory.description || "A memorable life experience"}
Weave these exact details, actions, and settings naturally into vivid storytelling narrative in ${targetLangObj.name}.`
      : (contextData.memories && contextData.memories.length > 0)
      ? `USER'S REAL MEMORIES:
${JSON.stringify(contextData.memories, null, 2)}
Please pick one of these real memories and tell its authentic story vividly in ${targetLangObj.name}.`
      : `No specific memories provided. Create a natural, comforting cultural story in ${targetLangObj.name}.`;

    const systemPrompt = `You are an empathetic, vivid storyteller for SMRITI, a cognitive care application for Indian elders.
Generate a captivating, natural, and nostalgic story in ${targetLangObj.name} (${targetLangObj.script}).
CRITICAL INSTRUCTIONS:
- You MUST write the story title and prose 100% in ${targetLangObj.name} (${targetLangObj.script}).
- If ${targetLangObj.name} uses Assamese, Bengali, Devanagari (Hindi/Nepali), or Manipuri script, write in the authentic native script.
- If ${targetLangObj.name} uses Latin script (Khasi, Mizo, Nagamese, Kokborok, English), write in clean standard Latin script.
- Do NOT use repetitive robotic clichés. Instead, vividly describe the real people, actions, atmosphere, and sensory details from the user's memory.
- Keep the tone warm, comforting, and clear (90 to 140 words).
- Avoid medical terms, sadness, or stress.

You must respond ONLY in valid JSON format matching this structure:
{
  "title": "Story title in ${targetLangObj.name}",
  "story": "Story narrative in ${targetLangObj.name}",
  "theme": "family | nature | everyday | regional",
  "estimatedDuration": "1 minute",
  "language": "${targetLangObj.name}",
  "langId": "${targetLangObj.id}"
}`;

    const userPrompt = `Target Language: ${targetLangObj.name} (${targetLangObj.script})
Patient Name: ${contextData.patientName || "Elder"}
Region: ${contextData.region || "Northeast India"}
Family Members: ${JSON.stringify(contextData.familyMembers || [])}
${memoryFocus}`;

    for (const model of GROQ_MODELS) {
      try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            model,
            messages: [
              { role: "system", content: systemPrompt },
              { role: "user", content: userPrompt }
            ],
            temperature: 0.7,
            response_format: { type: "json_object" }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const content = JSON.parse(data.choices[0].message.content);
          if (content.title && content.story) {
            return NextResponse.json({
              ...content,
              language: targetLangObj.name,
              langId: targetLangObj.id
            });
          }
        }
      } catch (err) {
        console.warn(`Groq model ${model} failed, trying next...`, err);
      }
    }

    return NextResponse.json(generateDynamicFallback(contextData, targetLangObj.name));

  } catch (error) {
    console.error("Story Generation Error:", error);
    return NextResponse.json(generateDynamicFallback(contextData, "English"));
  }
}
