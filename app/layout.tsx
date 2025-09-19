import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';
export const metadata: Metadata = { title:'CrossAI Emergency', description:'Voice-first emergency assistant', manifest:'/manifest.json', themeColor:'#0ea5e9' };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang='en'><body>
    <div className='container'>
      <header className='row' style={{justifyContent:'space-between',marginBottom:16}}>
        <h1 style={{margin:0}}>CrossAI Emergency</h1>
        <nav className='row'><Link href='/'>Home</Link><span style={{opacity:0.3}}> | </span><Link href='/status'>Status</Link></nav>
      </header>
      {children}
      <footer style={{opacity:0.6,marginTop:24}}><small>© {new Date().getFullYear()} Adaqua AI (ODIADEV)</small></footer>
    </div>
    <script dangerouslySetInnerHTML={{__html:`if('serviceWorker'in navigator){window.addEventListener('load',()=>{navigator.serviceWorker.register('/sw.js').catch(()=>{})})}`}} />
  </body></html>);
}
