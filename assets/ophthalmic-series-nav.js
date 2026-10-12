(()=>{
 const go=group=>{const url=new URL('ophthalmic-series.html',location.href);url.searchParams.set('lang',document.documentElement.lang||'az');if(group)url.searchParams.set('group',group);window.top.location.href=url.href;};
 const item=document.querySelector('[data-category-choice]'),details=item?.closest('details'),summary=details?.querySelector('summary');
 if(summary){summary.classList.add('series-summary');summary.setAttribute('role','link');details.open=true;summary.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});}
 document.addEventListener('click',e=>{const title=e.target.closest('.series-summary'),sub=e.target.closest('[data-category-choice]');if(title||sub){e.preventDefault();e.stopImmediatePropagation();go(sub?.dataset.categoryChoice);}},true);
})();
