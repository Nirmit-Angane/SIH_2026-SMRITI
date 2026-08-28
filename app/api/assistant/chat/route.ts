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

    const systemPrompt = `You are SMRITI, a gentle, patient, and warm voice assistant for an elderly person in India's North Eastern Region.
Respond to the user's spoken words gently and respectfully in Hindi.
Follow these strict rules:
- Your response MUST be in Hindi text (Devanagari script).
- Keep it extremely short (maximum 1 to 2 sentences) because it will be spoken out loud.
- Never use medical jargon, diagnose, or give medical advice.
- Be extremely warm, comforting, and polite (use 'आप' instead of 'तुम').
- If the user asks who you are, say you are SMRITI, their digital companion.
- If context about their family or region is provided, use it naturally if relevant.

Context about user:
${JSON.stringify(context, null, 2)}

Only output valid JSON in the exact following structure with no markdown or extra text:
{
  "response": "Your Hindi response here"
}`;

    // Format previous history
    const formattedHistory = history.map((msg: any) => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.role === 'assistant' ? `{ "response": "${msg.content}" }` : `User said: "${msg.content}"`
    }));

    const userPrompt = `User said: "${transcript}"`;

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
          ...formattedHistory,
          { role: "user", content: userPrompt }
        ],
        temperature: 0.6,
        response_format: { type: "json_object" }
      })
    });

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
