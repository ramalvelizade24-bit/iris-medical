(()=>{
 const params=new URLSearchParams(location.search);
 if(params.get('group')!=='Cannula')return;
 const section=document.querySelector('[data-blade-group="Cannula"]');if(!section)return;
 const use=params.get('use');
 const valid=['reusable','disposable'].includes(use);
 const grid=section.querySelector('.blade-products');
 grid.hidden=!valid;
 if(valid)for(const card of grid.querySelectorAll('.card'))card.hidden=card.dataset.cannulaUse!==use;
 for(const link of section.querySelectorAll('.cannula-use-options a')){
  const url=new URL(link.href);url.searchParams.set('lang',params.get('lang')||document.documentElement.lang||'az');link.href=url.href;
  link.setAttribute('aria-current',url.searchParams.get('use')===use?'page':'false');
 }
})();
