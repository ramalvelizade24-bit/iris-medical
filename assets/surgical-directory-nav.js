(()=>{
 const go=key=>{const url=new URL('surgical-instruments.html',location.href);url.searchParams.set('lang',document.documentElement.lang||'az');if(key)url.searchParams.set('group',key);window.top.location.href=url.href;};
 const summary=document.querySelector('.surgical-accordion>summary');
 if(summary){const span=summary.querySelector('span');const link=document.createElement('a');link.href='surgical-instruments.html';link.className='surgical-section-link';link.textContent='Cərrahi alətlər';link.style.cssText='color:inherit;text-decoration:none;flex:1';span.replaceWith(link);}
 document.addEventListener('click',e=>{const link=e.target.closest('.surgical-section-link,.surgical-accordion>summary,[data-section-choice="Cerrahi Aletler"]'),item=e.target.closest('[data-surgical-category]');if(link||item){e.preventDefault();e.stopImmediatePropagation();go(item?.dataset.surgicalCategory);}},true);
 if(summary){summary.setAttribute('role','link');summary.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});const list=summary.parentElement;list.open=true;const arrow=summary.querySelector('.accordion-chevron');if(arrow)arrow.textContent='↗';}
 for(const h of document.querySelectorAll('.catalog-all-group h3'))if(h.textContent==='Cərrahi alətlər'){const a=document.createElement('a');a.className='surgical-section-link';a.href='surgical-instruments.html';a.textContent=h.textContent;a.style.cssText='color:inherit;text-decoration:none';h.replaceChildren(a);}
})();
