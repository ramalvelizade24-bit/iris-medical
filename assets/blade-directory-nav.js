(()=>{
 const keys={'Micro Incision Blade':'micro','Appa Blade':'appa','Appa Glide':'glide','Appa Blade Navigator':'navigator','Appa Blade Samurai-Edge':'samurai'};
 const go=group=>{const url=new URL('ophthalmic-blades.html',location.href);url.searchParams.set('lang',document.documentElement.lang||'az');if(group)url.searchParams.set('group',group);window.top.location.href=url.href;};
 document.addEventListener('click',e=>{
  const top=e.target.closest('.ophthalmic-accordion .accordion-trigger');
  const sub=e.target.closest('[data-ophthalmic-category]');
  const heading=e.target.closest('.catalog-all-group h3');
  if(top||(heading&&heading.dataset.bladeLink==='true')||(sub&&keys[sub.dataset.ophthalmicCategory])){e.preventDefault();e.stopImmediatePropagation();go(sub?keys[sub.dataset.ophthalmicCategory]:null);}
 },true);
 for(const h of document.querySelectorAll('.catalog-all-group h3'))if(h.textContent==='Oftalmik bıçaqlar'){h.dataset.bladeLink='true';h.tabIndex=0;h.setAttribute('role','link');h.style.cursor='pointer';h.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go();}});}
 const title=document.querySelector('.ophthalmic-accordion .accordion-trigger span');if(title)title.textContent='Oftalmik bıçaqlar';
})();
