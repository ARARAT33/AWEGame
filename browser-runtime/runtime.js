const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const keys = new Set();
const player = { x: 480, y: 270, angle: 0, speed: 0 };
let frame = 0;
let running = true;

function roundedRect(x,y,w,h,r,color){ctx.fillStyle=color;ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}
function draw(){
  if(!running)return;
  frame++;
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx.fillStyle="#152b2b";ctx.fillRect(0,0,960,540);
  // Stylized city blocks and roads.
  for(let y=0;y<540;y+=180)for(let x=0;x<960;x+=220){
    ctx.fillStyle="#203b37";ctx.fillRect(x+12,y+12,185,140);
    for(let wy=y+28;wy<y+130;wy+=28)for(let wx=x+28;wx<x+180;wx+=34){ctx.fillStyle="#34534a";ctx.fillRect(wx,wy,17,10);}
  }
  ctx.fillStyle="#29313c";ctx.fillRect(0,205,960,130);ctx.fillRect(405,0,150,540);
  ctx.strokeStyle="#68717b";ctx.lineWidth=2;ctx.setLineDash([22,20]);
  ctx.beginPath();ctx.moveTo(0,270);ctx.lineTo(960,270);ctx.moveTo(480,0);ctx.lineTo(480,540);ctx.stroke();ctx.setLineDash([]);
  // Input and simple vehicle physics.
  const forward=keys.has("w")||keys.has("arrowup"),back=keys.has("s")||keys.has("arrowdown");
  const left=keys.has("a")||keys.has("arrowleft"),right=keys.has("d")||keys.has("arrowright");
  player.speed+=(forward?.12:0)-(back?.10:0);player.speed*=.975;player.speed=Math.max(-2.8,Math.min(4.2,player.speed));
  player.angle+=(right?1:0)-(left?1:0);player.x+=Math.sin(player.angle*Math.PI/180)*player.speed;player.y-=Math.cos(player.angle*Math.PI/180)*player.speed;
  player.x=Math.max(18,Math.min(942,player.x));player.y=Math.max(18,Math.min(522,player.y));
  ctx.save();ctx.translate(player.x,player.y);ctx.rotate(player.angle*Math.PI/180);
  roundedRect(-13,-22,26,44,7,"#55d8e8");roundedRect(-9,-14,18,15,4,"#c9f7ff");roundedRect(-10,8,20,8,3,"#1c5367");
  ctx.fillStyle="#e8faff";ctx.fillRect(-10,-20,5,3);ctx.fillRect(5,-20,5,3);ctx.restore();
  ctx.fillStyle="#eaf4ff";ctx.font="bold 15px system-ui";ctx.fillText("AWE DRIVE",22,34);
  ctx.fillStyle="#a9bdc8";ctx.font="12px system-ui";ctx.fillText("Explore the city · WASD / arrows",22,54);
  ctx.fillStyle="#d7e8f2";ctx.fillText("SPEED  "+Math.round(Math.abs(player.speed)*24)+" km/h",22,78);
  requestAnimationFrame(draw);
}
window.addEventListener("keydown",e=>{const k=e.key.toLowerCase();if(["arrowup","arrowdown","arrowleft","arrowright"," "].includes(k))e.preventDefault();keys.add(k);});
window.addEventListener("keyup",e=>keys.delete(e.key.toLowerCase()));
document.querySelector("#restart").addEventListener("click",()=>{player.x=480;player.y=270;player.angle=0;player.speed=0;});
draw();

const graphics=document.querySelector("#graphics");
if("gpu" in navigator){graphics.textContent="WebGPU available";graphics.style.color="#70e7ae";}
else{graphics.textContent="Canvas fallback";graphics.style.color="#70e7ae";}
const wasm=document.querySelector("#wasm");
wasm.textContent=typeof WebAssembly==="object"?"Supported":"Unavailable";
wasm.style.color=typeof WebAssembly==="object"?"#70e7ae":"#ff9b9b";
const threads=document.querySelector("#threads");
const shared=typeof SharedArrayBuffer==="function" && crossOriginIsolated;
threads.textContent=shared?"Enabled":"Needs COOP/COEP";
threads.style.color=shared?"#70e7ae":"#f6c76c";

// Inspect and compile a user-selected WASM module locally; never upload it.
document.querySelector("#wasmFile").addEventListener("change",async event=>{
  const file=event.target.files?.[0];const out=document.querySelector("#moduleResult");
  if(!file)return;
  out.className="module-result";out.textContent="Compiling "+file.name+"…";
  try{
    if(!file.name.toLowerCase().endsWith(".wasm"))throw new Error("Please choose a .wasm file.");
    const bytes=await file.arrayBuffer();
    const module=await WebAssembly.compile(bytes);
    const imports=WebAssembly.Module.imports(module);
    const exports=WebAssembly.Module.exports(module);
    out.className="module-result good";
    out.textContent="Compiled successfully · "+(bytes.byteLength/1024).toFixed(1)+" KB · "+exports.length+" exports · "+imports.length+" imports. This prototype does not yet execute a full game ABI.";
  }catch(error){out.className="module-result bad";out.textContent="Could not compile module: "+error.message;}
});