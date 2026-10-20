(()=>{
 const params=new URLSearchParams(location.search);
 if(params.get('group')!=='feather')return;
 const section=document.querySelector('[data-blade-group="feather"]');
 if(!section)return;
 const names={'slit':'Slit bıçaqları','slit-aluminum':'Alüminium tutacaqlı slit bıçaqları','crescent':'Aypara bıçaqları','crescent-aluminum':'Alüminium tutacaqlı aypara bıçaqları'};
 const type=params.get('type');
 const selected=Object.hasOwn(names,type);
 section.querySelector('[data-feather-overview]').hidden=selected;
 for(const grid of section.querySelectorAll('[data-feather-type]'))grid.hidden=!selected||grid.dataset.featherType!==type;
 section.querySelector('[data-feather-title]').textContent=selected?'Feather — '+names[type]:'Feather';
 if(selected){
  const back=document.querySelector('.blade-back');
  const url=new URL(back.href,location.href);
  url.searchParams.set('group','feather');
  url.searchParams.delete('type');
  url.searchParams.set('lang',params.get('lang')||document.documentElement.lang||'az');
  if(params.has('irisFrom'))url.searchParams.set('irisFrom',params.get('irisFrom'));
  back.href=url.href;back.textContent='← Feather';
 }
})();
