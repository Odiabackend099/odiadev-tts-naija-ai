import EmergencyForm from '@/components/EmergencyForm';
import VoicePlayer from '@/components/VoicePlayer';
export default function Page(){return(<main className='grid'><section><EmergencyForm />
<div style={{marginTop:16}} className='card'><h3>Offline help (Nigeria)</h3><p>If network no dey, call: <strong>112</strong>.</p></div>
</section><aside><VoicePlayer />
<div className='card' style={{marginTop:16}}><h3>How it works</h3><ol><li>Report emergency</li><li>We save to Supabase & notify</li><li>Voice confirm (ODIA TTS)</li></ol></div>
</aside></main>)}