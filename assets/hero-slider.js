(()=>{
const banner=document.querySelector('.iris-hero-banner');if(!banner)return;
const copy=banner.querySelector('.iris-hero-copy'),heading=copy.querySelector('h1'),description=copy.querySelector('p:not(.iris-hero-label)');
const slides=[
 ['Göz sağlamlığında etibarlı tərəfdaşınız','Oftalmologiya üçün müasir diaqnostik cihazlar, cərrahi avadanlıq və steril sərf materialları.'],
 ['Dəqiq diaqnostika üçün müasir həllər','Göz müayinəsi üçün cihaz və avadanlıqları kataloqumuzda kəşf edin.'],
 ['Cərrahiyyə üçün etibarlı seçim','Oftalmoloji cərrahi alətlər və sərf materialları — Iris Medical ilə tanış olun.']
];
let current=0,hover=false,startX=null;
const reduce=matchMedia('(prefers-reduced-motion: reduce)');
const backgrounds=['hero-waves.svg','hero-waves-2.svg','hero-waves-3.svg'].map((file,i)=>{const layer=document.createElement('div');layer.className='hero-background';layer.style.backgroundImage=`url("${new URL(file,document.currentScript.src).href}")`;layer.setAttribute('aria-hidden','true');banner.prepend(layer);return layer});
const controls=document.createElement('div');controls.className='hero-slider-controls';controls.setAttribute('aria-label','Banner slaydları');
const dots=slides.map((s,i)=>{const b=document.createElement('button');b.type='button';b.className='hero-slider-dot';b.setAttribute('aria-label',`${i+1}. ${s[0]}`);b.addEventListener('click',()=>show(i));controls.append(b);return b});
const pause=document.createElement('button');pause.type='button';pause.className='hero-slider-pause';let paused=reduce.matches;function pauseLabel(){pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-label',paused?'Slaydları davam etdir':'Slaydları dayandır');pause.setAttribute('aria-pressed',String(paused))}pause.addEventListener('click',()=>{paused=!paused;pauseLabel()});pauseLabel();controls.append(pause);banner.append(controls);
function show(i){current=(i+slides.length)%slides.length;heading.textContent=slides[current][0];description.textContent=slides[current][1];backgrounds.forEach((layer,n)=>layer.classList.toggle('is-active',n===current));dots.forEach((b,n)=>b.setAttribute('aria-pressed',String(n===current)));if(!reduce.matches)copy.animate([{opacity:.2,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}],{duration:550,easing:'ease-out'})}
banner.addEventListener('mouseenter',()=>hover=true);banner.addEventListener('mouseleave',()=>hover=false);
banner.addEventListener('touchstart',e=>{startX=e.touches[0].clientX},{passive:true});banner.addEventListener('touchend',e=>{if(startX!==null){const dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)>50)show(current+(dx<0?1:-1));startX=null}},{passive:true});
setInterval(()=>{if(!paused&&!document.hidden&&!banner.contains(document.activeElement)&&banner.getClientRects().length)show(current+1)},4000);show(0);
})();
