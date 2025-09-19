import { NextResponse } from 'next/server';
import { z } from 'zod';
import { supabaseAdmin } from '@/lib/supabaseServer';
import { sign } from '@/lib/hmac';
export const dynamic = 'force-dynamic';
const ReportSchema=z.object({app_id:z.string().min(1),type:z.string().min(1),description:z.string().min(1),location_text:z.string().optional(),lat:z.number().optional(),lng:z.number().optional(),phone:z.string().optional(),});
export async function POST(req: Request){try{const json=await req.json();const payload=ReportSchema.parse(json);
const sb=supabaseAdmin();const { data, error } = await sb.from('emergency_reports').insert({app_id:payload.app_id,type:payload.type,description:payload.description,location_text:payload.location_text||null,lat:payload.lat??null,lng:payload.lng??null,phone:payload.phone||null,source:'pwa',status:'new',}).select('id, created_at').single();if(error) throw error;
const url=process.env.N8N_WEBHOOK_URL;if(url){const body=JSON.stringify({event:'NEW_REPORT',report:{id:data.id,...payload}});const hmac=sign(body,process.env.N8N_HMAC_SECRET);try{await fetch(url,{method:'POST',headers:{'Content-Type':'application/json','X-Signature':hmac},body})}catch{}}
return NextResponse.json({ok:true,id:data.id,created_at:data.created_at})}catch(e:any){return NextResponse.json({ok:false,error:e.message},{status:400})}}
