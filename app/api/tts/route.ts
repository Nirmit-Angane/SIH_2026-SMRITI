import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, language } = await req.json();

    const piperUrl = process.env.PIPER_TTS_URL;
    
    if (!piperUrl || piperUrl === 'http://localhost:5000/tts') {
      // Return a simulated delay and an error string that forces fallback,
      // or we could return a mock base64 audio.
      // We will simulate a failure to force the "Audio unavailable, read instead" fallback.
      await new Promise(resolve => setTimeout(resolve, 800));
      return NextResponse.json(
        { error: "TTS Service Unavailable. Fallback to text reading." },
        { status: 503 }
      );
    }

    // Example payload for Piper HTTP server. 
    // Usually it takes `?text=...` in query or form data depending on setup.
    // Assuming a standard setup where you POST text:
    const url = new URL(piperUrl);
    url.searchParams.append('text', text);
    // Piper usually generates WAV
    
    const response = await fetch(url.toString(), {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`TTS API error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    
    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/wav',
        'Content-Length': audioBuffer.byteLength.toString()
      }
    });

  } catch (error) {
    console.error("TTS Generation Error:", error);
    return NextResponse.json(
      { error: "Failed to generate TTS audio" },
      { status: 500 }
    );
  }
}
