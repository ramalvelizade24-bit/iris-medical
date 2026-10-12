(()=>{
 const go=group=>{const url=new URL('ophthalmic-series.html',location.href);url.searchParams.set('lang',document.documentElement.lang||'az');if(group)url.searchParams.set('group',group);window.top.location.href=url.href;};
 const item=document.querySelector('[data-category-choice]'),details=item?.closest('details'),summary=details?.querySelector('summary');
 if(summary){const span=summary.querySelector('span');const link=document.createElement('a');link.className='series-section-link';link.href='ophthalmic-series.html';link.textContent=span.textContent;link.style.cssText='color:inherit;text-decoration:none;flex:1';span.replaceWith(link);details.open=false;}
 document.addEventListener('click',e=>{const title=e.target.closest('.series-section-link'),sub=e.target.closest('[data-category-choice]');if(title||sub){e.preventDefault();e.stopImmediatePropagation();go(sub?.dataset.categoryChoice);}},true);
})();
