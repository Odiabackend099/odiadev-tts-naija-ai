import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
export async function POST(req: Request){try{const {text,voice_id,format}=await req.json();if(!text||typeof text!=='string'){return NextResponse.json({error:'text is required'},{status:400})}
const base=process.env.ODIA_TTS_BASE_URL;if(!base) return NextResponse.json({error:'TTS not configured'},{status:500});
const apiKey=process.env.ODIA_TTS_API_KEY||'';const vid=voice_id||process.env.ODIA_TTS_VOICE_ID_DEFAULT||'nigerian_female_1';const fmt=['mp3','wav','ogg'].includes(format)?format:(process.env.ODIA_TTS_FORMAT||'mp3');
const upstreamUrl=`${base.replace(/\/$/,'')}/v1/tts`;const u=await fetch(upstreamUrl,{method:'POST',headers:{'Content-Type':'application/json',...(apiKey?{'Authorization':`Bearer ${apiKey}`}:{})},body:JSON.stringify({text,voice_id:vid,format:fmt})});
if(!u.ok){const t=await u.text();return NextResponse.json({error:'TTS upstream failed',detail:t},{status:502})}
const ct=u.headers.get('content-type')||'audio/mpeg';const ab=await u.arrayBuffer();return new NextResponse(Buffer.from(ab),{status:200,headers:{'Content-Type':ct,'Cache-Control':'no-store'}})}catch(e:any){return NextResponse.json({error:e.message},{status:500})}}
