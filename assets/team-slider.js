(()=>{
const section=document.querySelector('#team'),track=section?.querySelector('.iris-team-grid');if(!track)return;
const cards=[...track.children];track.tabIndex=0;track.setAttribute('aria-labelledby','team-heading');
function step(){return cards[0].getBoundingClientRect().width+parseFloat(getComputedStyle(track).gap||0)}
function move(direction){track.scrollBy({left:direction*step(),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});
let touching=false,lastInteraction=0;
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
for(const card of cards)card.querySelector('img').draggable=false;
let drag=null,dragged=false;
track.addEventListener('pointerdown',e=>{
 if(e.pointerType!=='mouse'||e.button!==0)return;
 drag={id:e.pointerId,x:e.clientX,left:track.scrollLeft,delta:0};dragged=false;
});
track.addEventListener('pointermove',e=>{
 if(!drag||e.pointerId!==drag.id)return;
 const delta=e.clientX-drag.x;
 drag.delta=delta;
 if(!dragged&&Math.abs(delta)<5)return;
 if(!dragged){dragged=true;track.classList.add('is-dragging');track.setPointerCapture(e.pointerId)}
 e.preventDefault();track.scrollLeft=drag.left-Math.max(-step(),Math.min(step(),delta));
});
function finishDrag(e){
 if(!drag||e.pointerId!==drag.id)return;
 const wasDragged=dragged,start=drag.left,delta=drag.delta;drag=null;track.classList.remove('is-dragging');
 if(track.hasPointerCapture(e.pointerId))track.releasePointerCapture(e.pointerId);
 if(wasDragged){const direction=Math.abs(delta)>=40?(delta<0?1:-1):0;const max=Math.max(0,track.scrollWidth-track.clientWidth);track.scrollTo({left:Math.max(0,Math.min(max,start+direction*step())),behavior:reducedMotion.matches?'instant':'smooth'})}
}
window.addEventListener('pointerup',finishDrag);window.addEventListener('pointercancel',finishDrag);
track.addEventListener('lostpointercapture',finishDrag);
track.addEventListener('click',e=>{if(dragged){e.preventDefault();e.stopPropagation();dragged=false}},true);
section.addEventListener('pointerdown',()=>{touching=true;lastInteraction=Date.now()});
window.addEventListener('pointerup',()=>{if(touching){touching=false;lastInteraction=Date.now()}});
window.addEventListener('pointercancel',()=>{touching=false;lastInteraction=Date.now()});
section.addEventListener('keydown',()=>lastInteraction=Date.now());
section.addEventListener('wheel',()=>lastInteraction=Date.now(),{passive:true});
let visible=false;new IntersectionObserver(entries=>{visible=entries[0].isIntersecting},{threshold:.1}).observe(track);
setInterval(()=>{
 if(document.hidden||!visible||touching||reducedMotion.matches||Date.now()-lastInteraction<6000)return;
 const max=track.scrollWidth-track.clientWidth;if(max<=2)return;
 const next=track.scrollLeft>=max-2?0:Math.min(max,(Math.round(track.scrollLeft/step())+1)*step());
 track.scrollTo({left:next,behavior:'smooth'});
},4000);
})();
