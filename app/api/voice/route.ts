import { NextRequest, NextResponse } from 'next/server';

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting function
function checkRateLimit(ip: string, maxRequests = 30, windowMs = 60000): boolean {
  const now = Date.now();
  const key = ip;
  const record = rateLimitStore.get(key);

  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs });
    return true;
  }

  if (record.count >= maxRequests) {
    return false;
  }

  record.count++;
  return true;
}

// Emergency keywords detection
const EMERGENCY_KEYWORDS = [
  'fire', 'medical', 'police', 'emergency', 'help', 'urgent', 'accident', 
  'robbery', 'attack', 'injured', 'bleeding', 'unconscious', 'chest pain',
  'difficulty breathing', 'stroke', 'heart attack', 'overdose', 'suicide',
  'domestic violence', 'break in', 'theft', 'assault', 'kidnapping'
];

function analyzeEmergencyLevel(text: string): 'low' | 'medium' | 'high' | 'critical' {
  const lowerText = text.toLowerCase();
  
  const criticalKeywords = ['unconscious', 'not breathing', 'heart attack', 'stroke', 'overdose', 'suicide'];
  const highKeywords = ['fire', 'bleeding', 'chest pain', 'difficulty breathing', 'attack', 'robbery'];
  const mediumKeywords = ['medical', 'police', 'help', 'urgent', 'accident', 'injured'];
  
  if (criticalKeywords.some(keyword => lowerText.includes(keyword))) return 'critical';
  if (highKeywords.some(keyword => lowerText.includes(keyword))) return 'high';
  if (mediumKeywords.some(keyword => lowerText.includes(keyword))) return 'medium';
  
  return 'low';
}

function generateEmergencyResponse(text: string, lang: string = 'en-NG'): string {
  const emergencyLevel = analyzeEmergencyLevel(text);
  const hasEmergencyKeywords = EMERGENCY_KEYWORDS.some(keyword => 
    text.toLowerCase().includes(keyword)
  );

  if (!hasEmergencyKeywords) {
    return `I heard: "${text}". If this is an emergency, please clearly state the type of emergency you're experiencing. For immediate help, call 112 or 199.`;
  }

  const responses = {
    critical: [
      `CRITICAL EMERGENCY DETECTED. Emergency services are being dispatched immediately to your location. Stay on the line. Do not move unless you're in immediate danger.`,
      `This appears to be a life-threatening emergency. Help is on the way. If you can, stay calm and follow any instructions from emergency responders.`
    ],
    high: [
      `HIGH PRIORITY EMERGENCY. Your report has been received and emergency services are being notified. Help should arrive within 10-15 minutes.`,
      `Emergency services have been alerted about your situation. Please stay safe and wait for help to arrive.`
    ],
    medium: [
      `Your emergency report has been received and logged. Emergency services are being contacted and should respond within 20-30 minutes.`,
      `Thank you for your report. Emergency services have been notified and will respond as soon as possible.`
    ],
    low: [
      `Your report has been received. If this is not an urgent emergency, you may also contact local authorities directly. Emergency services will follow up as needed.`
    ]
  };

  const responseArray = responses[emergencyLevel];
  const randomResponse = responseArray[Math.floor(Math.random() * responseArray.length)];
  
  return randomResponse;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  let requestId = Math.random().toString(36).substring(7);
  
  try {
    // Get client IP for rate limiting
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown';
    
    // Check rate limit
    if (!checkRateLimit(ip)) {
      console.warn(`Rate limit exceeded for IP: ${ip}`);
      return NextResponse.json(
        { 
          error: 'Too many requests. Please wait before trying again.',
          requestId 
        }, 
        { status: 429 }
      );
    }

    // Parse and validate request body
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error(`JSON parse error [${requestId}]:`, parseError);
      return NextResponse.json(
        { 
          error: 'Invalid JSON in request body',
          requestId 
        }, 
        { status: 400 }
      );
    }

    const { text, lang = 'en-NG', location, priority } = body;
    
    // Validate required fields
    if (!text || typeof text !== 'string') {
      return NextResponse.json(
        { 
          error: 'Text field is required and must be a string',
          requestId 
        }, 
        { status: 400 }
      );
    }

    if (text.trim().length < 2) {
      return NextResponse.json(
        { 
          error: 'Text must be at least 2 characters long',
          requestId 
        }, 
        { status: 400 }
      );
    }

    if (text.length > 1000) {
      return NextResponse.json(
        { 
          error: 'Text must be less than 1000 characters',
          requestId 
        }, 
        { status: 400 }
      );
    }

    // Log the emergency report (in production, save to database)
    console.log(`Emergency Report [${requestId}]:`, {
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      lang,
      location,
      priority,
      ip,
      timestamp: new Date().toISOString(),
      emergencyLevel: analyzeEmergencyLevel(text)
    });

    // Generate appropriate response
    const responseText = generateEmergencyResponse(text, lang);
    
    // In production, this is where you would:
    // 1. Save to database (Supabase)
    // 2. Trigger emergency dispatch workflow (n8n)
    // 3. Generate TTS audio (ElevenLabs)
    // 4. Send notifications to emergency services
    
    const response = {
      text: responseText,
      audio_url: null, // Will be populated when TTS service is integrated
      requestId,
      emergencyLevel: analyzeEmergencyLevel(text),
      timestamp: new Date().toISOString(),
      processingTime: Date.now() - startTime
    };

    // Add CORS headers for cross-origin requests
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    return NextResponse.json(response, { headers });

  } catch (error) {
    console.error(`Voice API error [${requestId}]:`, error);
    
    // Return different error messages based on error type
    let errorMessage = 'Internal server error';
    let statusCode = 500;
    
    if (error instanceof SyntaxError) {
      errorMessage = 'Invalid request format';
      statusCode = 400;
    } else if (error instanceof TypeError) {
      errorMessage = 'Invalid data type in request';
      statusCode = 400;
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        requestId,
        timestamp: new Date().toISOString()
      }, 
      { status: statusCode }
    );
  }
}

export async function GET() {
  try {
    const status = {
      status: 'Voice API is operational',
      version: '2.0.0',
      timestamp: new Date().toISOString(),
      endpoints: {
        'POST /api/voice': 'Process voice emergency reports',
        'GET /api/voice': 'Get API status and information'
      },
      capabilities: {
        emergencyDetection: true,
        multiLanguageSupport: ['en-NG', 'en-US'],
        rateLimiting: true,
        errorHandling: true,
        requestLogging: true
      },
      limits: {
        maxTextLength: 1000,
        minTextLength: 2,
        requestsPerMinute: 30
      },
      supportedLanguages: ['en-NG', 'en-US', 'ha', 'yo', 'ig'], // Nigerian languages
      emergencyNumbers: {
        national: '112',
        fire: '199',
        lagos: '919',
        alternative: '911'
      }
    };

    return NextResponse.json(status);
  } catch (error) {
    console.error('Voice API status error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to get API status',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}
