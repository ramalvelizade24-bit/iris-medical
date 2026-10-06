(()=>{
const banner=document.querySelector('.iris-hero-banner');if(!banner)return;
banner.classList.add('is-eye-slide');
const imagePaths=['hero-examination.png','hero-diagnostics.png','hero-contact-eye.png'];
const visuals=imagePaths.map((path,index)=>{const visual=document.createElement('img');visual.className='hero-product-visual'+(index<2?' hero-doctor-visual':'');visual.src=new URL('../public/instagram/'+path,document.currentScript.src).href;visual.alt='';visual.setAttribute('aria-hidden','true');visual.style.opacity=index===0?'1':'0';banner.prepend(visual);return visual});
const copy=banner.querySelector('.iris-hero-copy');
const texts=[
 ['Göz sağlamlığında etibarlı tərəfdaşınız','Oftalmologiya üçün müasir diaqnostik cihazlar, cərrahi avadanlıq və steril sərf materialları.'],
 ['Dəqiq diaqnostika üçün müasir həllər','Göz müayinəsi üçün cihaz və avadanlıqları kataloqumuzda kəşf edin.'],
 ['Cərrahiyyə üçün etibarlı seçim','Oftalmoloji cərrahi alətlər və sərf materialları — Iris Medical ilə tanış olun.']
];
let current=0,paused=false;
const controls=document.createElement('div');controls.className='hero-slider-controls';
const dots=texts.map((_,index)=>{const button=document.createElement('button');button.type='button';button.className='hero-slider-dot';button.setAttribute('aria-label','Slayd '+(index+1));button.addEventListener('click',()=>show(index));controls.append(button);return button});
const pause=document.createElement('button');pause.type='button';pause.className='hero-slider-pause';pause.textContent='Ⅱ';pause.setAttribute('aria-label','Slaydları dayandır');pause.setAttribute('aria-pressed','false');pause.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'▶':'Ⅱ';pause.setAttribute('aria-pressed',String(paused));pause.setAttribute('aria-label',paused?'Slaydları davam etdir':'Slaydları dayandır')});controls.append(pause);banner.append(controls);
function show(index){current=index;const imageIndex=current;banner.classList.toggle('is-doctor-slide',imageIndex<2);visuals.forEach((visual,i)=>visual.style.opacity=i===imageIndex?'1':'0');dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current)));translate();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)copy.animate([{opacity:.25},{opacity:1}],{duration:650,easing:'ease-out'})}
function translate(){const t=window.irisTranslate||((s)=>s);copy.querySelector('h1').textContent=t(texts[current][0]);copy.querySelector('p:not(.iris-hero-label)').textContent=t(texts[current][1])}
document.addEventListener('iris-language-change',translate);show(0);
setInterval(()=>{if(paused||document.hidden||!banner.getClientRects().length||matchMedia('(prefers-reduced-motion: reduce)').matches)return;show((current+1)%texts.length)},5000);
})();
