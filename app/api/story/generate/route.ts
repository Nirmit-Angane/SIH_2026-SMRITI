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

    const systemPrompt = `You are the Story Time assistant for SMRITI, a gentle memory-support application for elderly users.
Generate a short, calm and simple Hindi story.
The story should:
- be easy for an elderly person to understand
- use short sentences
- have a warm and familiar tone
- avoid frightening events, violence, death-related themes, medical claims, diagnosis, anxiety-inducing situations
- contain no stereotypes
- use regional context respectfully
- use provided family information only when supplied
- never invent personal facts
- never claim generated events are real memories
- contain approximately 100-180 words
- use only Hindi narration
- have a clear beginning, middle and gentle ending.

The story should feel like a warm conversation with a familiar person, not like a children's fairy tale.

Respond ONLY with valid JSON in the exact following structure, with no markdown formatting or other text:
{
  "title": "Hindi title",
  "story": "The hindi story text",
  "theme": "family | nature | everyday | regional",
  "estimatedDuration": "X minutes"
}`;

    const userPrompt = `Generate a story using the following context:
${JSON.stringify(context, null, 2)}`;

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: "openai/gpt-oss-20b",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        temperature: 0.7,
        response_format: { type: "json_object" }
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);

    // Validate structure quickly
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
