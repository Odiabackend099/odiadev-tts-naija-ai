export const dynamic = 'force-dynamic';
async function getStatus(){const res=await fetch(`${process.env.PUBLIC_SITE_URL||''}/api/status`,{cache:'no-store'});try{return await res.json()}catch{return{ok:false}}}
export default async function StatusPage(){const status=await getStatus();return(<main><div className='card'><h2>System Status</h2><pre>{JSON.stringify(status,null,2)}</pre></div></main>)}
