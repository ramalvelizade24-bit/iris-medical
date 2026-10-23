(()=>{
 const panel=document.getElementById('category-panel');if(!panel)return;
 const svg='<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
 const icon=()=>{const el=document.createElement('span');el.className='accordion-chevron unified-category-chevron';el.setAttribute('aria-hidden','true');el.innerHTML=svg;return el;};
 for(const summary of panel.querySelectorAll('details>summary')){
  const previous=summary.querySelector(':scope>.accordion-chevron,:scope>[aria-hidden="true"]');
  if(previous)previous.replaceWith(icon());else summary.append(icon());
 }
 for(const button of panel.querySelectorAll('.accordion-trigger')){button.classList.add('unified-category-toggle');button.replaceChildren(icon());}
})();