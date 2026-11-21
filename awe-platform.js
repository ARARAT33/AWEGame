(()=>{'use strict';
const $=s=>document.querySelector(s), grid=$('#gameGrid'), search=$('#searchInput'), count=$('#gameCount');
if(!grid||!search)return;
const ARCHIVE_URL='https://raw.githubusercontent.com/ARARAT33/AWEArchiveDB/refs/heads/main/awegames.json';
const FAVORITES_KEY='awegame:favorites:v1', RECENT_KEY='awegame:recent:v1', THEME_KEY='awegame:theme:v1';
let archiveGames=[],activeFilter='all',sortMode='featured';
const safeRead=(key,fallback)=>{try{const v=JSON.parse(localStorage.getItem(key));return v??fallback}catch{return fallback}};
const getFavorites=()=>new Set(safeRead(FAVORITES_KEY,[]));
const getRecent=()=>safeRead(RECENT_KEY,[]);
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const normalizeArchive=item=>{if(!item||typeof item!=='object')return null;const title=String(item.title??item.tittle??'').trim(),description=String(item.description??'').trim(),elink=String(item.elink??'').trim();if(!title||!elink)return null;try{const u=new URL(elink,location.href);if(!['https:','http:'].includes(u.protocol))return null;return{title,description,elink:u.href,icon:'🎮',developer:'AWEArchiveDB',archive:true}}catch{return null}};
const local=Array.isArray(window.games)?window.games:[];
const all=()=>{const seen=new Set();return [...local,...archiveGames].filter(g=>{const k=g.elink||g.folder||g.title;if(!k||seen.has(k))return false;seen.add(k);return true}).map((g,i)=>({...g,id:g.elink||g.folder||g.title,category:categoryOf(g),order:i}))};
function categoryOf(g){const s=(g.title+' '+g.description).toLowerCase();if(/defender|shooter|racing|combat|action|reactor|cybercore/.test(s))return /reactor|strategy|management/.test(s)?'strategy':'action';if(/random|discover|link|explor/.test(s))return'discovery';return'calm'}
function target(g){if(g.elink)return g.elink;return g.folder?(g.folder.includes('/')?g.folder:'games/'+g.folder):'#'}
function card(g,i,compact=false){const fav=getFavorites().has(g.id);return `<article class="game-card" data-id="${esc(g.id)}" data-category="${g.category}">
<button class="favorite-button ${fav?'is-favorite':''}" data-favorite="${esc(g.id)}" aria-label="${fav?'Remove from':'Add to'} favorites" aria-pressed="${fav}">${fav?'♥':'♡'}</button>
<a class="game-art" href="${esc(target(g))}" aria-label="Play ${esc(g.title)}"><span class="game-art-number">${String(i+1).padStart(2,'0')} / AWE PLAY</span><span class="game-art-icon">${esc(g.icon||'🎮')}</span></a>
<div class="game-card-body"><div class="game-title-row"><strong class="game-title">${esc(g.title||'Untitled game')}</strong><span class="game-badge">${g.archive?'ARCHIVE':g.category.toUpperCase()}</span></div><p class="game-description">${esc(g.description||'A browser experience from the AWEGame collection.')}</p><span class="game-developer">BY ${esc(g.developer||'AWEGame')}</span><div class="game-card-footer"><span>${g.archive?'AWEArchiveDB':'AWEGame library'}</span><span class="game-open">Play ↗</span></div></div></article>`}
function render(){const q=search.value.trim().toLowerCase(),favorites=getFavorites();let items=all().filter(g=>{const text=[g.title,g.description,g.developer].join(' ').toLowerCase();return(!q||text.includes(q))&&(activeFilter==='all'||(activeFilter==='favorites'?favorites.has(g.id):g.category===activeFilter))});if(sortMode==='az')items.sort((a,b)=>a.title.localeCompare(b.title));if(sortMode==='za')items.sort((a,b)=>b.title.localeCompare(a.title));grid.innerHTML=items.map((g,i)=>card(g,i)).join('');count.textContent=items.length+' game'+(items.length===1?'':'s');$('#localCount').textContent=all().length+' playable experiences';$('#emptyState').hidden=items.length!==0;renderRecent()}
function renderRecent(){const host=$('#recentGrid'),recent=getRecent(),map=new Map(all().map(g=>[g.id,g]));const list=recent.map(id=>map.get(id)).filter(Boolean).slice(0,4);host.innerHTML=list.length?list.map((g,i)=>card(g,i,true)).join(''):'<div class="empty-library">Play a game and it will show up here.</div>';$('#recentNote').textContent=list.length?list.length+' recently played':'Your recent games appear here'}
function openTarget(g){try{const u=new URL(target(g),location.href);if(!['http:','https:'].includes(u.protocol))return;const recent=getRecent().filter(x=>x!==g.id);recent.unshift(g.id);localStorage.setItem(RECENT_KEY,JSON.stringify(recent.slice(0,12)));location.href=u.href}catch(err){console.warn('Unable to open game',err)}}
function toggleFavorite(id){const fav=getFavorites();fav.has(id)?fav.delete(id):fav.add(id);localStorage.setItem(FAVORITES_KEY,JSON.stringify([...fav]));render()}
grid.addEventListener('click',e=>{const fav=e.target.closest('[data-favorite]');if(fav){e.preventDefault();e.stopPropagation();toggleFavorite(fav.dataset.favorite);return}const cardEl=e.target.closest('.game-card');if(cardEl){const g=all().find(x=>x.id===cardEl.dataset.id);if(g){e.preventDefault();openTarget(g)}}});
$('#recentGrid').addEventListener('click',e=>{const fav=e.target.closest('[data-favorite]');if(fav){e.preventDefault();e.stopPropagation();toggleFavorite(fav.dataset.favorite);return}const c=e.target.closest('.game-card');if(c){const g=all().find(x=>x.id===c.dataset.id);if(g)openTarget(g)}});
search.addEventListener('input',render);$('#sortSelect').addEventListener('change',e=>{sortMode=e.target.value;render()});
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{activeFilter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>x.classList.toggle('selected',x===b));render()}));
document.querySelectorAll('[data-nav]').forEach(a=>a.addEventListener('click',()=>{document.querySelectorAll('[data-nav]').forEach(x=>x.classList.toggle('active',x===a));$('#sidebar').classList.remove('open')}));
$('#mobileMenu').addEventListener('click',()=>$('#sidebar').classList.toggle('open'));
const applyTheme=()=>document.body.classList.toggle('light-mode',localStorage.getItem(THEME_KEY)==='light');applyTheme();
$('#themeToggle').addEventListener('click',()=>{localStorage.setItem(THEME_KEY,document.body.classList.contains('light-mode')?'dark':'light');applyTheme()});
document.addEventListener('click',e=>{if(innerWidth<=820&&!e.target.closest('#sidebar')&&!e.target.closest('#mobileMenu'))$('#sidebar').classList.remove('open')});
document.addEventListener('keydown',e=>{if(e.key==='/'&&!['INPUT','TEXTAREA'].includes(document.activeElement.tagName)){e.preventDefault();search.focus()}if(e.key==='Escape'){search.blur();$('#sidebar').classList.remove('open')}});
render();
fetch(ARCHIVE_URL,{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Archive HTTP '+r.status);return r.json()}).then(payload=>{const entries=Array.isArray(payload)?payload:['games','awegames','items','data'].map(k=>payload?.[k]).find(Array.isArray)||[];archiveGames=entries.map(normalizeArchive).filter(Boolean);render()}).catch(err=>console.info('Archive unavailable; local games remain ready.',err));
if('serviceWorker'in navigator&&location.protocol.startsWith('http'))window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js').catch(err=>console.info('Offline support unavailable',err)));
})();