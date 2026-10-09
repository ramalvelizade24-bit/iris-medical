(()=>{
 const keys={'Micro Incision Blade':'micro','Appa Blade':'appa','Appa Glide':'glide','Appa Blade Navigator':'navigator','Appa Blade Samurai-Edge':'samurai'};
 const go=group=>{const url=new URL('ophthalmic-blades.html',location.href);url.searchParams.set('lang',document.documentElement.lang||'az');if(group)url.searchParams.set('group',group);window.top.location.href=url.href;};
 document.addEventListener('click',e=>{
  const top=e.target.closest('.blade-section-link');
  const sub=e.target.closest('[data-ophthalmic-category]');
  const heading=e.target.closest('.catalog-all-group h3');
  if(top||(heading&&heading.dataset.bladeLink==='true')||(sub&&keys[sub.dataset.ophthalmicCategory])){e.preventDefault();e.stopImmediatePropagation();go(sub?keys[sub.dataset.ophthalmicCategory]:null);}
 },true);
 for(const h of document.querySelectorAll('.catalog-all-group h3'))if(h.textContent==='Oftalmik bıçaqlar'){h.dataset.bladeLink='true';h.tabIndex=0;h.setAttribute('role','link');h.style.cursor='pointer';h.addEventListener('keydown',e=>{if(e.key==='Enter'){e.preventDefault();go();}});}
 const toggle=document.querySelector('.ophthalmic-accordion .accordion-trigger');
 if(toggle){
  const link=document.createElement('a');link.className='blade-section-link';link.textContent='Oftalmik bıçaqlar';link.href='ophthalmic-blades.html';
  link.style.cssText='display:inline-block;width:calc(100% - 48px);box-sizing:border-box;padding:12px 8px;color:inherit;text-decoration:none;font-weight:700;vertical-align:middle';
  toggle.before(link);toggle.querySelector('span')?.remove();
  toggle.style.cssText='display:inline-flex;width:44px;min-height:44px;align-items:center;justify-content:center;vertical-align:middle';
  toggle.setAttribute('aria-label','Oftalmik bıçaqlar');
  const list=toggle.nextElementSibling;list.id='blade-category-list';toggle.setAttribute('aria-controls',list.id);list.hidden=false;toggle.setAttribute('aria-expanded','true');
  if(!list.querySelector('[data-ophthalmic-category="Micro Incision Blade"]')){const micro=document.createElement('button');micro.type='button';micro.dataset.ophthalmicCategory='Micro Incision Blade';micro.textContent='Mikrokəsik bıçaqları';list.prepend(micro);}
 }
})();
