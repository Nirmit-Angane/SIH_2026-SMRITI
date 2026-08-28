import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { transcript, context, history = [] } = await req.json();

    const apiKey = process.env.GROQ_API_KEY;
    
    if (!apiKey || apiKey === 'mock_groq_key') {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return NextResponse.json({
        response: "नमस्ते, मैं आपकी कैसे मदद कर सकती हूँ?"
      });
    }

    const isHindi = context?.language === "hi";

    const systemPrompt = isHindi
      ? `You are SMRITI, a gentle, patient, and warm voice assistant for an elderly person.
Respond to the user's spoken words gently, respectfully, and warmly in Hindi (Devanagari script).
Follow these strict rules:
- Your response MUST be in Hindi text (Devanagari script).
- Keep it concise (1 to 2 short sentences) because it will be spoken aloud to the elder.
- Never use medical jargon or provide clinical diagnosis.
- Be polite, caring and respectful (use 'आप').
- If context about family or memories is provided, reference it naturally.

Only output valid JSON in the exact following structure with no markdown:
{
  "response": "Your Hindi response here"
}`
      : `You are SMRITI, a gentle, patient, and warm voice companion for an elderly person.
Respond to the user's spoken words warmly, respectfully, and clearly in English.
Follow these strict rules:
- Your response MUST be in clear, simple English.
- Keep it concise (1 to 2 short, comforting sentences) because it will be spoken aloud to the elder.
- Never use medical jargon or clinical diagnosis.
- Be extremely polite, patient, and uplifting.
- If context about family or memories is provided, reference it naturally.

Only output valid JSON in the exact following structure with no markdown:
{
  "response": "Your English response here"
}`;

    // Format previous history
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.role === 'assistant' ? `{ "response": "${msg.content}" }` : `User said: "${msg.content}"`
    }));

    const userPrompt = `User said: "${transcript}"`;

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
          ...formattedHistory,
          { role: "user", content: userPrompt }
        ],
        temperature: 0.6,
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
            ...formattedHistory,
            { role: "user", content: userPrompt }
          ],
          temperature: 0.6,
          response_format: { type: "json_object" }
        })
      });
    }

    if (!response.ok) {
      throw new Error(`Groq API error: ${response.status}`);
    }

    const data = await response.json();
    const content = JSON.parse(data.choices[0].message.content);

    if (!content.response) {
      throw new Error("Invalid structure returned from Groq");
    }

    return NextResponse.json(content);

  } catch (error) {
    console.error("Assistant Chat Error:", error);
    return NextResponse.json(
      { error: "Failed to generate response" },
      { status: 500 }
    );
  }
}
