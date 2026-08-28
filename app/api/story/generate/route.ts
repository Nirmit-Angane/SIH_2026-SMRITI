import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  let isHindi = false;
  try {
    const { context } = await req.json();
    isHindi = context?.language === "hi";
    const apiKey = process.env.GROQ_API_KEY;

    if (!apiKey || apiKey.trim() === '' || apiKey.includes('your_groq_api_key') || apiKey === 'mock_groq_key') {
      return NextResponse.json({
        title: isHindi ? "सुखद शाम की यादें" : "Memories of a Pleasant Evening",
        story: isHindi 
          ? "एक दिन परिवार साथ बैठा और पुरानी तस्वीरों को देखकर बातें करने लगा। वह एक बहुत ही शांत और सुंदर शाम थी। सभी के चेहरों पर खुशी और मुस्कान थी।"
          : "One peaceful evening, the family gathered in the garden with warm cups of tea. They looked through cherished photographs and shared fond childhood memories. The gentle breeze and happy laughter filled everyone with comfort and warmth.",
        theme: "family",
        estimatedDuration: "1 minute"
      });
    }

    const systemPrompt = isHindi
      ? `You are the Story Time assistant for SMRITI, a gentle memory-support application for elderly users.
Generate a short, calm and simple Hindi story.
The story should:
- be easy for an elderly person to understand
- use short sentences and warm, familiar tone
- avoid frightening events, violence, death-related themes, medical claims
- contain approximately 100-180 words in Hindi (Devanagari script)
- have a clear beginning, middle and gentle ending.

Respond ONLY with valid JSON in the exact following structure, with no markdown formatting or other text:
{
  "title": "Hindi title",
  "story": "The hindi story text in Devanagari script",
  "theme": "family | nature | everyday | regional",
  "estimatedDuration": "1 minute"
}`
      : `You are the Story Time assistant for SMRITI, a gentle memory-support companion for elderly users.
Generate a short, calming, uplifting story in ENGLISH.
The story should:
- be 100% in English language. Do NOT output any Hindi words or Devanagari script.
- be easy for a senior citizen to understand
- use simple, short sentences with a warm, nostalgic, peaceful tone
- avoid violence, medical diagnosis, stress, or scary topics
- contain approximately 100-160 words in English
- have a clear beginning, middle, and heartwarming ending.

Respond ONLY with valid JSON in the exact following structure, with no markdown formatting or other text:
{
  "title": "English title",
  "story": "The english story text",
  "theme": "family | nature | everyday | regional",
  "estimatedDuration": "1 minute"
}`;

    const userPrompt = `[LANGUAGE: ${isHindi ? "Hindi (Devanagari)" : "English"}] Generate a story using context:
${JSON.stringify(context, null, 2)}`;

    let response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt }
          ],
          temperature: 0.7,
          response_format: { type: "json_object" }
        })
      });
    }

    if (response.ok) {
      const data = await response.json();
      const content = JSON.parse(data.choices[0].message.content);
      if (content.title && content.story) {
        return NextResponse.json(content);
      }
    }

    return NextResponse.json({
      title: isHindi ? "सुखद शाम की यादें" : "Memories of a Pleasant Evening",
      story: isHindi 
        ? "एक दिन परिवार साथ बैठा और पुरानी तस्वीरों को देखकर बातें करने लगा। वह एक बहुत ही शांत और सुंदर शाम थी। सभी के चेहरों पर खुशी और मुस्कान थी।"
        : "One peaceful evening, the family gathered in the garden with warm cups of tea. They looked through cherished photographs and shared fond childhood memories. The gentle breeze and happy laughter filled everyone with comfort and warmth.",
      theme: "family",
      estimatedDuration: "1 minute"
    });

  } catch (error) {
    console.error("Story Generation Error:", error);
    return NextResponse.json({
      title: isHindi ? "सुखद शाम की यादें" : "Memories of a Pleasant Evening",
      story: isHindi 
        ? "एक दिन परिवार साथ बैठा और पुरानी तस्वीरों को देखकर बातें करने लगा। वह एक बहुत ही शांत और सुंदर शाम थी।"
        : "One peaceful evening, the family gathered with warm tea and looked through cherished photographs.",
      theme: "family",
      estimatedDuration: "1 minute"
    });
  }
}
