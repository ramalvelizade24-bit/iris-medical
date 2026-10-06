(()=>{
const banner=document.querySelector('.iris-hero-banner');if(!banner)return;
banner.classList.add('is-eye-slide');
const imagePaths=['hero-examination.webp','hero-diagnostics.webp','hero-contact-eye.webp'];
const visuals=imagePaths.map((path,index)=>{const visual=index===0?banner.querySelector('.hero-product-visual')||document.createElement('img'):document.createElement('img');visual.className='hero-product-visual'+(index<2?' hero-doctor-visual':'');visual.decoding='async';visual.fetchPriority=index===0?'high':'low';visual.dataset.source=new URL('../public/instagram/'+path,document.currentScript.src).href;if(index===0)visual.src=visual.dataset.source;visual.alt='';visual.setAttribute('aria-hidden','true');visual.style.opacity=index===0?'1':'0';if(!visual.parentElement)banner.prepend(visual);return visual});
// Let the first photograph finish before requesting the remaining slides.
function warmSlide(index){if(index>=visuals.length)return;const visual=visuals[index];const next=()=>warmSlide(index+1);visual.addEventListener('load',next,{once:true});visual.addEventListener('error',next,{once:true});visual.src=visual.dataset.source}
if(visuals[0].complete&&visuals[0].naturalWidth)warmSlide(1);else{visuals[0].addEventListener('load',()=>warmSlide(1),{once:true});visuals[0].addEventListener('error',()=>warmSlide(1),{once:true})}
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
function show(index){if(index!==0&&(!visuals[index].complete||!visuals[index].naturalWidth))return;current=index;const imageIndex=current;banner.classList.toggle('is-doctor-slide',imageIndex<2);visuals.forEach((visual,i)=>visual.style.opacity=i===imageIndex?'1':'0');dots.forEach((dot,i)=>dot.setAttribute('aria-pressed',String(i===current)));translate();if(!matchMedia('(prefers-reduced-motion: reduce)').matches)copy.animate([{opacity:.25},{opacity:1}],{duration:650,easing:'ease-out'})}
function translate(){const t=window.irisTranslate||((s)=>s);copy.querySelector('h1').textContent=t(texts[current][0]);copy.querySelector('p:not(.iris-hero-label)').textContent=t(texts[current][1])}
document.addEventListener('iris-language-change',translate);show(0);
setInterval(()=>{if(paused||document.hidden||!banner.getClientRects().length||matchMedia('(prefers-reduced-motion: reduce)').matches)return;show((current+1)%texts.length)},5000);
})();
