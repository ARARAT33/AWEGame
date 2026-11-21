const CACHE='awegame-shell-v2';
const SHELL=['./','./index.html','./games.js','./awe-platform.css','./awe-platform.js','./browser-runtime/style.css'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;event.respondWith(caches.match(req).then(cached=>cached||fetch(req).then(response=>{if(response.ok&&response.type==='basic'){const copy=response.clone();caches.open(CACHE).then(cache=>cache.put(req,copy))}return response}).catch(()=>cached||Response.error())))});
