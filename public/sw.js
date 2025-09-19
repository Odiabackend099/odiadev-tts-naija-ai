const CACHE_NAME='crossai-cache-v1';const OFFLINE_URLS=['/','/manifest.json'];const BG_SYNC_TAG='emergency-retry';
self.addEventListener('install',e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(OFFLINE_URLS)).then(self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(self.clients.claim())});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;
  e.respondWith(caches.match(r).then(c=>c||fetch(r).then(res=>{const x=res.clone();caches.open(CACHE_NAME).then(cc=>cc.put(r,x));return res}).catch(()=>caches.match('/'))))});
self.addEventListener('sync',e=>{if(e.tag===BG_SYNC_TAG){e.waitUntil(processQueue())}});
async function processQueue(){const db=await openDB();const tx=db.transaction('queue','readwrite');const store=tx.objectStore('queue');let cur=await store.openCursor();
  while(cur){const it=cur.value;try{await fetch('/api/report',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(it.payload)});await store.delete(cur.primaryKey)}catch(e){};cur=await cur.continue()}
  await tx.done;db.close()}
function openDB(){return new Promise((res,rej)=>{const req=indexedDB.open('crossai-db',1);req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains('queue'))db.createObjectStore('queue',{keyPath:'id',autoIncrement:true})};
  req.onsuccess=()=>res(req.result);req.onerror=()=>rej(req.error)})}
self.addEventListener('message',async e=>{const{type,payload}=e.data||{};if(type==='QUEUE_REPORT'){const db=await openDB();const tx=db.transaction('queue','readwrite');tx.objectStore('queue').add({payload});await tx.done;db.close();
  if('sync'in self.registration){try{await self.registration.sync.register(BG_SYNC_TAG)}catch(e){}}}});
