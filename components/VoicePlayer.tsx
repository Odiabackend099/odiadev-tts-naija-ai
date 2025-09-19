'use client';
import React,{useState} from 'react';
export default function VoicePlayer(){
  const [loading,setLoading]=useState(false);const [audioUrl,setAudioUrl]=useState<string|null>(null);
  const [text,setText]=useState('Your emergency report has been received. Stay safe; help is on the way.');
  async function speak(){setLoading(true);setAudioUrl(null);
    try{const res=await fetch('/api/tts',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text})});
      if(!res.ok) throw new Error('TTS failed');const blob=await res.blob();setAudioUrl(URL.createObjectURL(blob));}
    catch(e:any){alert('TTS error: '+e.message)} finally{setLoading(false)}}
  return(<div className='card'><h3>Test Voice</h3>
    <textarea className='input' rows={3} value={text} onChange={e=>setText(e.target.value)} />
    <div className='row'><button className='btn' onClick={speak} disabled={loading}>{loading?'Generating...':'Speak'}</button></div>
    {audioUrl&&<audio controls src={audioUrl}/>}</div>);
}
