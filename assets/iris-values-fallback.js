(()=>{
 let started=false;
 function fallback(){
  if(started)return;started=true;
  const old=document.getElementById('gl');
  const canvas=document.createElement('canvas');canvas.id='gl';old.replaceWith(canvas);
  const ctx=canvas.getContext('2d');if(!ctx)return;
  for(const id of ['fade','bt','bb','grain'])document.getElementById(id).style.display='none';
  const stage=document.getElementById('stage');
  const lang=new URLSearchParams(location.search).get('lang')||'az';
  const texts={az:['NƏYƏ GÖRƏ','Etibarlılıq','İnnovasiya','Müştəriyönümlülük','Keyfiyyət'],ru:['ПОЧЕМУ','Надёжность','Инновации','Забота о клиенте','Качество'],en:['WHY','Reliability','Innovation','Customer focus','Quality'],tr:['NEDEN','Güvenilirlik','İnovasyon','Müşteri odaklılık','Kalite']}[lang]||['NƏYƏ GÖRƏ','Etibarlılıq','İnnovasiya','Müştəriyönümlülük','Keyfiyyət'];
  stage.innerHTML='<div style="position:absolute;inset:auto 5% 12%;text-align:center"><div id="fallback-kick" style="color:#e8c36a;letter-spacing:.2em;margin-bottom:16px"></div><div id="fallback-title" style="font:bold clamp(24px,5vw,64px) system-ui;color:#f3d27f"></div></div>';
  const title=document.getElementById('fallback-title'),kick=document.getElementById('fallback-kick');
  const dots=Array.from({length:1400},()=>({a:Math.random()*Math.PI*2,r:.33+Math.random()*.67,s:Math.random()}));
  let start=performance.now(),paused=false,pauseAt=0;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const toggle=()=>{paused=!paused;if(paused)pauseAt=performance.now();else start+=performance.now()-pauseAt;};
  addEventListener('pointerdown',toggle);
  addEventListener('keydown',e=>{if(e.code==='Space'){e.preventDefault();toggle();}if(e.key.toLowerCase()==='r'){start=performance.now();paused=false;}});
  function render(now){
   requestAnimationFrame(render);if(paused)return;
   const w=innerWidth,h=innerHeight,dpr=Math.min(devicePixelRatio||1,2);
   if(canvas.width!==Math.round(w*dpr)||canvas.height!==Math.round(h*dpr)){canvas.width=Math.round(w*dpr);canvas.height=Math.round(h*dpr);}
   ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle='#03060d';ctx.fillRect(0,0,w,h);
   const t=reduced?0:(now-start)/1000,phase=Math.floor(t/3.4)%6;
   kick.textContent=phase===0?texts[0]:phase===5?'IRIS MEDICAL':String(phase).padStart(2,'0')+' / 04';
   title.textContent=phase===0||phase===5?'İris Medical':texts[phase];
   const radius=Math.min(w*.32,h*.29);
   for(const p of dots){const a=p.a+t*.12,r=radius*p.r;ctx.fillStyle=`rgba(${Math.round(45+p.s*65)},${Math.round(160+p.s*80)},255,${.3+p.s*.65})`;ctx.beginPath();ctx.arc(w/2+Math.cos(a)*r,h*.39+Math.sin(a)*r*(.8+.15*Math.sin(t*.3)),.6+p.s,0,Math.PI*2);ctx.fill();}
   document.getElementById('prog').style.width=((t%20.4)/20.4*100)+'%';
  }
  requestAnimationFrame(render);
 }
 window.addEventListener('error',fallback);
 // Check support before the original scene attempts to start.
 try{const probe=document.createElement('canvas');if(!probe.getContext('webgl2')&&!probe.getContext('webgl'))addEventListener('DOMContentLoaded',fallback);}catch{addEventListener('DOMContentLoaded',fallback);}
})();
