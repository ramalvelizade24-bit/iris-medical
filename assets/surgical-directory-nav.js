(()=>{
 const go=(key,use)=>{const url=new URL('surgical-instruments.html',location.href);url.searchParams.set('lang',document.documentElement.lang||'az');if(key)url.searchParams.set('group',key);if(use)url.searchParams.set('use',use);window.top.location.href=url.href;};
 const summary=document.querySelector('.surgical-accordion>summary');
 if(summary){summary.classList.add('surgical-main-summary');const span=summary.querySelector('span');const link=document.createElement('a');link.href='surgical-instruments.html';link.className='surgical-section-link';link.textContent='Cərrahi alətlər';link.style.cssText='color:inherit;text-decoration:none;flex:1';span.replaceWith(link);}
 document.addEventListener('click',e=>{const link=e.target.closest('.surgical-section-link,[data-section-choice="Cerrahi Aletler"]'),item=e.target.closest('[data-surgical-category]'),use=e.target.closest('[data-cannula-choice]');if(link||item||use){e.preventDefault();e.stopImmediatePropagation();go(use?'Cannula':item?.dataset.surgicalCategory,use?.dataset.cannulaChoice);}},true);
 if(summary){summary.parentElement.open=false;const arrow=summary.querySelector('.accordion-chevron');if(arrow)arrow.textContent='↓';}
 for(const h of document.querySelectorAll('.catalog-all-group h3'))if(h.textContent==='Cərrahi alətlər'){const a=document.createElement('a');a.className='surgical-section-link';a.href='surgical-instruments.html';a.textContent=h.textContent;a.style.cssText='color:inherit;text-decoration:none';h.replaceChildren(a);}
})();
