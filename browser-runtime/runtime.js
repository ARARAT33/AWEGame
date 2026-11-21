const canvas=document.querySelector("#game");
const ctx=canvas.getContext("2d");
const keys=new Set();
const player={x:480,y:270,angle:0,speed:0};
let frame=0,playing=false,raf=0;
const $=s=>document.querySelector(s);
const clamp=(v,min,max)=>Math.max(min,Math.min(max,v));

function roundedRect(x,y,w,h,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
function drawCity(){
  ctx.fillStyle="#193329";ctx.fillRect(0,0,960,540);
  // Quiet neighborhood blocks with small gardens.
  for(let y=0;y<540;y+=180)for(let x=0;x<960;x+=220){
    ctx.fillStyle="#294437";ctx.fillRect(x+12,y+12,185,140);
    ctx.fillStyle="#314f3e";ctx.fillRect(x+23,y+23,162,118);
    for(let wy=y+31;wy<y+130;wy+=28)for(let wx=x+32;wx<x+180;wx+=34){ctx.fillStyle="#52694e";ctx.fillRect(wx,wy,17,10);}
    ctx.fillStyle="#6c8460";ctx.beginPath();ctx.arc(x+169,y+116,7,0,Math.PI*2);ctx.fill();
  }
  ctx.fillStyle="#303a36";ctx.fillRect(0,205,960,130);ctx.fillRect(405,0,150,540);
  ctx.strokeStyle="#a2ad91";ctx.globalAlpha=.6;ctx.lineWidth=2;ctx.setLineDash([22,20]);
  ctx.beginPath();ctx.moveTo(0,270);ctx.lineTo(960,270);ctx.moveTo(480,0);ctx.lineTo(480,540);ctx.stroke();ctx.setLineDash([]);ctx.globalAlpha=1;
}
function draw(){
  if(!playing)return;
  frame++;ctx.clearRect(0,0,canvas.width,canvas.height);drawCity();
  const forward=keys.has("w")||keys.has("arrowup"),back=keys.has("s")||keys.has("arrowdown");
  const left=keys.has("a")||keys.has("arrowleft"),right=keys.has("d")||keys.has("arrowright");
  player.speed+=(forward?.12:0)-(back?.1:0);player.speed*=.975;player.speed=clamp(player.speed,-2.8,4.2);
  if(Math.abs(player.speed)>.12)player.angle+=((right?1:0)-(left?1:0))*(player.speed>=0?1:-1)*Math.min(1,Math.abs(player.speed)/2)*2.2;
  player.x+=Math.sin(player.angle*Math.PI/180)*player.speed;player.y-=Math.cos(player.angle*Math.PI/180)*player.speed;
  player.x=clamp(player.x,18,942);player.y=clamp(player.y,18,522);
  ctx.save();ctx.translate(player.x,player.y);ctx.rotate(player.angle*Math.PI/180);
  roundedRect(-15,-24,30,48,7,"#a8d2ae");roundedRect(-10,-15,20,17,4,"#d9e9d6");roundedRect(-11,9,22,9,3,"#416b53");
  ctx.fillStyle="#f1e8c9";ctx.fillRect(-11,-22,6,3);ctx.fillRect(5,-22,6,3);ctx.restore();
  ctx.fillStyle="#eff3e9";ctx.font="700 15px system-ui";ctx.fillText("AWE DRIVE",22,34);
  ctx.fillStyle="#c2d0bd";ctx.font="12px system-ui";ctx.fillText("A quiet ride through the city",22,54);
  $("#speedReadout").textContent=Math.round(Math.abs(player.speed)*24)+" KM/H";
  raf=requestAnimationFrame(draw);
}
function start(){if(playing)return;playing=true;$("#gameOverlay").classList.add("hidden");draw();}
function stop(){playing=false;cancelAnimationFrame(raf);keys.clear();}
function reset(){player.x=480;player.y=270;player.angle=0;player.speed=0;$("#speedReadout").textContent="0 KM/H";if(playing){cancelAnimationFrame(raf);draw();}}
function launch(where){if(where==="drive"){document.querySelector("#runtime").scrollIntoView({behavior:"smooth"});start();}else{document.querySelector("#runtime").scrollIntoView({behavior:"smooth"});}}
$("#launchFeatured").addEventListener("click",()=>launch("drive"));
document.querySelectorAll("[data-launch]").forEach(el=>el.addEventListener("click",()=>launch(el.dataset.launch)));
$("#startGame").addEventListener("click",start);
$("#restart").addEventListener("click",()=>{reset();start();});
window.addEventListener("keydown",e=>{const k=e.key.toLowerCase();if(["arrowup","arrowdown","arrowleft","arrowright"," "].includes(k))e.preventDefault();keys.add(k);if(!playing&&["w","a","s","d","arrowup","arrowdown","arrowleft","arrowright"].includes(k))start();});
window.addEventListener("keyup",e=>keys.delete(e.key.toLowerCase()));
window.addEventListener("blur",()=>keys.clear());

const graphics=$("#graphics");
if(navigator.gpu){graphics.textContent="WebGPU ready";graphics.style.color="#b8d7bd";}else{graphics.textContent="Canvas fallback";graphics.style.color="#b8d7bd";}
const wasm=$("#wasm");wasm.textContent=typeof WebAssembly==="object"?"Supported":"Unavailable";wasm.style.color=typeof WebAssembly==="object"?"#b8d7bd":"#e49a91";
const threads=$("#threads");const shared=typeof SharedArrayBuffer==="function"&&crossOriginIsolated;threads.textContent=shared?"Enabled":"COOP / COEP needed";threads.style.color=shared?"#b8d7bd":"#d7c6a4";
$("#wasmFile").addEventListener("change",async e=>{const file=e.target.files?.[0],out=$("#moduleResult");if(!file)return;out.className="module-result";out.textContent="Compiling "+file.name+"…";try{if(!file.name.toLowerCase().endsWith(".wasm"))throw new Error("Choose a .wasm file.");const bytes=await file.arrayBuffer(),module=await WebAssembly.compile(bytes),imports=WebAssembly.Module.imports(module),exports=WebAssembly.Module.exports(module);out.className="module-result good";out.textContent="Compiled · "+(bytes.byteLength/1024).toFixed(1)+" KB · "+exports.length+" exports · "+imports.length+" imports. Game execution is not implemented yet.";}catch(err){out.className="module-result bad";out.textContent="Could not compile: "+err.message;}});

// Search and category filters share one simple view model.
let activeFilter="all";
const search=$("#gameSearch");
function filterCards(){const term=search.value.trim().toLowerCase();let visible=0;document.querySelectorAll(".experience-card").forEach(card=>{const matchesCategory=activeFilter==="all"||card.dataset.category===activeFilter;const matchesText=!term||card.dataset.search.includes(term)||card.innerText.toLowerCase().includes(term);card.hidden=!(matchesCategory&&matchesText);if(!card.hidden)visible++;});$("#emptyState").hidden=visible!==0;}
search.addEventListener("input",filterCards);
document.querySelectorAll("[data-filter]").forEach(btn=>btn.addEventListener("click",()=>{activeFilter=btn.dataset.filter;document.querySelectorAll("[data-filter]").forEach(b=>b.classList.toggle("selected",b===btn));filterCards();}));
document.querySelectorAll("[data-nav]").forEach(link=>link.addEventListener("click",()=>{document.querySelectorAll("[data-nav]").forEach(a=>a.classList.toggle("active",a===link));$("#sidebar").classList.remove("open");}));
$("#mobileMenu").addEventListener("click",()=>$("#sidebar").classList.toggle("open"));
$("#themeToggle").addEventListener("click",()=>document.body.classList.toggle("light"));
document.addEventListener("click",e=>{if(window.innerWidth<=820&&!e.target.closest("#sidebar")&&!e.target.closest("#mobileMenu"))$("#sidebar").classList.remove("open");});
