import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { text, lang } = await request.json();
    
    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    // For now, return a simple response
    // In production, this would integrate with your TTS service (ElevenLabs, etc.)
    const response = {
      text: `I heard: "${text}". Emergency services have been notified for your location. Help is on the way.`,
      audio_url: null // Will be populated when TTS service is integrated
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Voice API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'Voice API is running',
    endpoints: {
      POST: 'Send voice text for processing'
    }
  });
}
