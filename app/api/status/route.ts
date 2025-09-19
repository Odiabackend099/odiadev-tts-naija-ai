import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseServer';
export const dynamic = 'force-dynamic';
export async function GET(){try{const sb=supabaseAdmin();const { error } = await sb.from('health_check').select('now').limit(1);return NextResponse.json({ok:true,time:new Date().toISOString(),db:!error?'ok':'unknown'});}catch(e:any){return NextResponse.json({ok:false,error:e.message},{status:500});}}
