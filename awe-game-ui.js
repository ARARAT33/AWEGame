(()=>{'use strict';
if(document.querySelector('.awe-game-utility'))return;
const bar=document.createElement('nav');bar.className='awe-game-utility';bar.setAttribute('aria-label','AWE Play game controls');
bar.innerHTML='<a href="../index.html" aria-label="Return to AWEGame library"><span class="awe-mark">a</span><span>AWE PLAY</span></a><span class="awe-separator" aria-hidden="true"></span><button type="button" class="awe-fullscreen" aria-label="Toggle fullscreen" title="Toggle fullscreen">⛶</button>';
document.body.appendChild(bar);
const button=bar.querySelector('.awe-fullscreen');
button.addEventListener('click',async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen?.();else await document.exitFullscreen?.()}catch(error){button.title='Fullscreen is not available in this browser';}});
document.addEventListener('fullscreenchange',()=>{button.textContent=document.fullscreenElement?'⤢':'⛶';button.setAttribute('aria-label',document.fullscreenElement?'Exit fullscreen':'Enter fullscreen')});
})();