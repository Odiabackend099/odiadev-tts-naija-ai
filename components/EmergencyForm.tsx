'use client';
import React,{useState,useEffect} from 'react';
type ReportPayload={app_id:string;type:string;description:string;location_text?:string;lat?:number;lng?:number;phone?:string;};
export default function EmergencyForm(){
  const [type,setType]=useState('medical');const [description,setDescription]=useState('');
  const [locationText,setLocationText]=useState('');const [submitting,setSubmitting]=useState(false);const [confirmAudioUrl,setConfirmAudioUrl]=useState<string|null>(null);
  useEffect(()=>{if(!('serviceWorker'in navigator))return;navigator.serviceWorker.ready.then(()=>{})},[]);
  async function submitReport(){const payload:ReportPayload={app_id:'crossai-ng',type,description,location_text:locationText};
    setSubmitting(true);setConfirmAudioUrl(null);
    try{const res=await fetch('/api/report',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
      if(!res.ok){try{if(navigator.serviceWorker&&navigator.serviceWorker.controller){navigator.serviceWorker.controller.postMessage({type:'QUEUE_REPORT',payload});alert('Network issue. Queued and will auto-send.')}else{alert('Failed to submit and could not queue.')}}catch{};return;}
      const tts=await fetch('/api/tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:'We don receive your report. Help dey come now now. Stay safe.'})});
      if(tts.ok){const b=await tts.blob();setConfirmAudioUrl(URL.createObjectURL(b));}
      setDescription('');setLocationText('');}
    catch(e:any){alert('Error: '+e.message)} finally{setSubmitting(false)}}
  return(<div className='card'><h3>Report Emergency</h3>
    <div className='grid'><div><label>Type</label>
      <select className='input' value={type} onChange={e=>setType(e.target.value)}>
        <option value='medical'>Medical</option><option value='fire'>Fire</option><option value='security'>Security</option>
        <option value='flood'>Flood</option><option value='accident'>Accident</option><option value='other'>Other</option>
      </select></div><div><label>Location (text)</label>
      <input className='input' value={locationText} onChange={e=>setLocationText(e.target.value)} placeholder='e.g., Ajah bus stop, Lekki' /></div></div>
    <div style={{marginTop:12}}><label>Description</label><textarea className='input' rows={4} value={description} onChange={e=>setDescription(e.target.value)} placeholder='What happened?' /></div>
    <div className='row' style={{marginTop:12}}><button className='btn' onClick={submitReport} disabled={submitting}>{submitting?'Sending...':'Send report'}</button></div>
    {confirmAudioUrl&&(<div style={{marginTop:12}}><audio controls src={confirmAudioUrl}/></div>)}</div>);
}
