(()=>{
const content=window.IRIS_SOCIAL_CONTENT||{};
const mainPartners=[
 {image:'assets/partners-home/prime-national-hospital.png',alt:'Prime National Hospital'},
 {image:'assets/partners-home/avrasiya-hospital.png',alt:'Avrasiya Hospital'},
 {image:'assets/partners-home/amt-klinika.png',alt:'AMT Klinika'},
 {image:'assets/partners-home/funda-hospital.png',alt:'Funda Hospital'},
 {image:'assets/partners-home/kepez-hospital.png',alt:'Kəpəz Hospital'},
 {image:'assets/partners-home/batigoz.webp',alt:'Batıgöz'}
];
for(const key of ['instagram','partners']){
 const section=document.getElementById('home-'+key),track=section.querySelector('.carousel-track');
 const items=key==='partners'?mainPartners:(content[key]||[]);
 for(const item of items){const a=document.createElement(item.url?'a':'div');a.className='social-slide'+(key==='partners'?' partner-slide':'');if(item.url){a.href=item.url;a.target='_blank';a.rel='noopener'}const image=document.createElement('img');image.src=item.image;image.alt=item.alt||'';image.loading='lazy';a.append(image);track.append(a)}
 if(!track.children.length&&key==='instagram'){
  for(let i=0;i<3;i++){
   const placeholder=document.createElement('div');
   placeholder.className='social-slide instagram-placeholder';
   placeholder.setAttribute('aria-label','Instagram — foto tezliklə əlavə olunacaq');
   placeholder.innerHTML='<span class="instagram-placeholder-icon" aria-hidden="true"><svg viewBox="0 0 48 48" fill="none"><rect x="6" y="6" width="36" height="36" rx="10"/><circle cx="24" cy="24" r="9"/><circle cx="35" cy="13" r="2" fill="currentColor" stroke="none"/></svg></span><span>Instagram</span>';
   track.append(placeholder);
  }
 }else if(!track.children.length)section.dataset.empty='true';
}
document.querySelectorAll('[data-partners-copy]').forEach(section=>{
 const track=section.querySelector('.carousel-track');
 for(const item of content.partners||[]){const a=document.createElement(item.url?'a':'div');a.className='social-slide partner-slide';if(item.url){a.href=item.url;a.target='_blank';a.rel='noopener'}const image=document.createElement('img');image.src=item.image;image.alt=item.alt||'';image.loading='lazy';a.append(image);track.append(a)}
 if(!track.children.length)section.dataset.empty='true';
});
const instagram=document.querySelector('#home-instagram .iris-carousel');
if(instagram){
 const track=instagram.querySelector('.carousel-track');
 const cards=[...track.querySelectorAll('a.social-slide')];
 const activate=card=>cards.forEach(item=>item.classList.toggle('is-expanded',item===card));
 cards.forEach(card=>{
  const label=document.createElement('span');label.className='instagram-card-caption';
  const title=document.createElement('strong');title.textContent=card.querySelector('img').alt.replace(/^Iris Medical\s*—\s*/,'');
  const more=document.createElement('span');more.className='instagram-card-more';more.textContent='Instagram-da baxın →';
  label.append(title,more);card.append(label);
  card.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')activate(card)});
  card.addEventListener('focus',()=>activate(card));
  let touch=false;
  card.addEventListener('pointerdown',event=>{touch=event.pointerType==='touch'||event.pointerType==='pen'});
  card.addEventListener('click',event=>{
   if((touch||matchMedia('(hover: none)').matches)&&!card.classList.contains('is-expanded')){event.preventDefault();activate(card)}
   touch=false;
  });
 });
 track.addEventListener('pointerleave',event=>{if(event.pointerType==='mouse'&&!track.contains(document.activeElement))activate(null)});
 track.addEventListener('focusout',event=>{if(!track.contains(event.relatedTarget))activate(null)});
 track.addEventListener('keydown',event=>{if(event.key==='Escape'){activate(null);track.focus()}});
 instagram.querySelectorAll('.carousel-arrow').forEach(button=>button.hidden=true);
}
document.querySelectorAll('[data-carousel]').forEach(carousel=>{
 if(carousel.closest('#home-instagram'))return;
 const track=carousel.querySelector('.carousel-track'),prev=carousel.querySelector('[data-prev]'),next=carousel.querySelector('[data-next]');
 for(const [button,points] of [[prev,'15 5 8 12 15 19'],[next,'9 5 16 12 9 19']])button.innerHTML=`<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="${points}"/></svg>`;
 function update(){prev.disabled=track.scrollLeft<2;next.disabled=track.scrollLeft+track.clientWidth>=track.scrollWidth-2}
 function move(direction){const card=track.firstElementChild;if(card)track.scrollBy({left:direction*(card.getBoundingClientRect().width+22),behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'})}
 let paused=false;
 carousel.addEventListener('mouseenter',()=>{paused=true});
 carousel.addEventListener('mouseleave',()=>{paused=false});
 carousel.addEventListener('touchstart',()=>{paused=true},{passive:true});
 carousel.addEventListener('touchend',()=>{paused=false},{passive:true});
 carousel.addEventListener('touchcancel',()=>{paused=false},{passive:true});
 setInterval(()=>{
  if(paused||document.hidden||carousel.contains(document.activeElement)||!track.clientWidth||matchMedia('(prefers-reduced-motion: reduce)').matches||track.scrollWidth<=track.clientWidth+2)return;
  if(track.scrollLeft+track.clientWidth>=track.scrollWidth-2)track.scrollTo({left:0,behavior:'smooth'});
  else move(1);
 },4000);
 prev.addEventListener('click',()=>move(-1));next.addEventListener('click',()=>move(1));track.addEventListener('scroll',update,{passive:true});track.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();move(e.key==='ArrowRight'?1:-1)}});new ResizeObserver(update).observe(track);update();
});
})();
