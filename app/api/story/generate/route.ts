import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { context } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey || apiKey === 'mock_groq_key') {
      // Return a mock response for development if no key is provided
      // Wait 1.5s to simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({
        title: "परिवार की यादें",
        story: "एक दिन परिवार साथ बैठा और पुरानी तस्वीरों को देखकर बातें करने लगा। वह एक बहुत ही शांत और सुंदर शाम थी। सभी के चेहरों पर मुस्कान थी।",
        theme: "family",
        estimatedDuration: "1 minute"
      });
    }

    const isHindi = context?.language === "hi";

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
  "story": "The hindi story text",
  "theme": "family | nature | everyday | regional",
  "estimatedDuration": "1 minute"
}`
      : `You are the Story Time assistant for SMRITI, a gentle memory-support companion for elderly users.
Generate a short, calming, uplifting story in English.
The story should:
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

    const userPrompt = `Generate a story using the following context:
${JSON.stringify(context, null, 2)}`;

    // Call Groq API with robust llama-3.3-70b-versatile or llama-3.1-8b-instant
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
      // Fallback model
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

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);

    // Validate structure
    if (!content.title || !content.story) {
      throw new Error("Invalid structure returned from Groq");
    }

    return NextResponse.json(content);

  } catch (error) {
    console.error("Story Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate story" },
      { status: 500 }
    );
  }
}
