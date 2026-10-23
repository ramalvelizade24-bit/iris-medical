(()=>{
 const params=new URLSearchParams(location.search);if(params.get('group')!=='drapes')return;
 const type=params.get('pouch'),selected=['single','double'].includes(type),section=document.querySelector('[data-blade-group="drapes"]');if(!section)return;
 section.querySelector('[data-pouch-overview]').hidden=selected;
 section.querySelectorAll('[data-pouch]').forEach(grid=>grid.hidden=!selected||grid.dataset.pouch!==type);
 section.querySelector('h2').textContent=selected?'Steril göz örtükləri — '+(type==='single'?'Tək torbalı':'İki torbalı'):'Steril göz örtükləri';
 if(selected){const back=document.querySelector('.blade-back'),url=new URL('cataract-consumables.html',location.href);url.searchParams.set('group','drapes');url.searchParams.set('lang',params.get('lang')||document.documentElement.lang||'az');if(params.has('irisFrom'))url.searchParams.set('irisFrom',params.get('irisFrom'));back.href=url.href;back.textContent='← Steril göz örtükləri';}
})();