import { NextResponse } from 'next/server';
import { STORY_LANGUAGES } from '@/lib/constants/languages';

const GROQ_MODELS = [
  "openai/gpt-oss-120b",
  "openai/gpt-oss-20b",
  "qwen/qwen3.8-27b",
  "qwen/qwen3.6-27b"
];

export async function POST(req: Request) {
  try {
    const { title, story, targetLanguage } = await req.json();
    const apiKey = process.env.GROQ_API_KEY;

    const langObj = STORY_LANGUAGES.find(l => 
      l.id === targetLanguage || 
      l.name.toLowerCase() === (targetLanguage || "").toLowerCase()
    ) || STORY_LANGUAGES[3]; // Default English

    if (!story || story.trim() === '') {
      return NextResponse.json({ error: "Story text is required" }, { status: 400 });
    }

    if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_groq_api_key') || apiKey === 'mock_groq_key') {
      return NextResponse.json({
        title: title || "Story",
        story: story,
        targetLanguage: langObj.name,
        targetLangId: langObj.id
      });
    }

    const systemPrompt = `You are a master cultural translator for SMRITI, a cognitive care app for Indian and Northeast elders.
Translate the provided story title and text into ${langObj.name} (${langObj.script}).
RULES:
- Preserve the exact meaning, warm emotional tone, and details of the original memory.
- Use natural, respectful ${langObj.name} vocabulary and phrasing suitable for an elder.
- If translating into Assamese, Bengali, Hindi, Manipuri, or Nepali, use their native authentic script.
- If translating into Khasi, Mizo, Nagamese, Kokborok, or English, use their authentic Latin/standard script.
- Output ONLY valid JSON in this exact structure:
{
  "title": "Translated Title in ${langObj.name}",
  "story": "Translated Story in ${langObj.name}",
  "targetLanguage": "${langObj.name}",
  "targetLangId": "${langObj.id}"
}`;

    const userPrompt = `Title: ${title}
Story to Translate:
${story}`;

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
            temperature: 0.3,
            response_format: { type: "json_object" }
          })
        });

        if (response.ok) {
          const data = await response.json();
          const content = JSON.parse(data.choices[0].message.content);
          if (content.story) {
            return NextResponse.json({
              title: content.title || title,
              story: content.story,
              targetLanguage: langObj.name,
              targetLangId: langObj.id
            });
          }
        }
      } catch (err) {
        console.warn(`Groq translation model ${model} failed, trying next...`, err);
      }
    }

    // Fallback
    return NextResponse.json({
      title: title || "Story",
      story: story,
      targetLanguage: langObj.name,
      targetLangId: langObj.id
    });

  } catch (error) {
    console.error("Story Translation Error:", error);
    return NextResponse.json({ error: "Failed to translate story" }, { status: 500 });
  }
}
