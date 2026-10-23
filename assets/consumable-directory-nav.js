(()=>{
 const routes={viscoelastic:{page:'viscoelastic-solutions.html',label:'Viskoelastik məhlullar'},silicone:{page:'silicone-oils.html',label:'Vitrektomiya məhsulları'}};
 const go=(page,group,use)=>{const url=new URL(page,location.href);url.searchParams.set('lang',document.documentElement.lang||'az');if(group)url.searchParams.set('group',group);if(use)url.searchParams.set('use',use);if(window.irisOpenCatalogDirectory)window.irisOpenCatalogDirectory(url.href);else window.top.location.href=url.href;};
 for(const [kind,route] of Object.entries(routes)){
  const button=document.querySelector('.'+kind+'-accordion>.accordion-trigger');if(!button)continue;
  const link=document.createElement('a');link.className='consumable-section-link';link.dataset.directory=route.page;link.href=route.page;link.textContent=route.label;
  link.style.cssText='display:inline-block;width:calc(100% - 48px);padding:12px 8px;box-sizing:border-box;color:inherit;text-decoration:none;font-weight:700;vertical-align:middle';button.before(link);
  button.textContent='⌄';button.style.cssText='display:inline-flex;width:44px;min-height:44px;align-items:center;justify-content:center;vertical-align:middle';button.setAttribute('aria-label',route.label);
 }
 const summary=document.querySelector('.cannula-accordion>summary');if(summary){const span=summary.querySelector('span'),link=document.createElement('a');link.className='cannula-section-link';link.href='surgical-instruments.html?group=Cannula';link.textContent='Kanyulalar';link.style.cssText='color:inherit;text-decoration:none';span.replaceWith(link);}
 document.addEventListener('click',e=>{
  const cataractTitle=e.target.closest('[data-cataract-directory]');
  if(cataractTitle){e.preventDefault();e.stopImmediatePropagation();go('cataract-consumables.html');return;}
  const cataract=e.target.closest('[data-cataract-group]');
  if(cataract){e.preventDefault();e.stopImmediatePropagation();go('cataract-consumables.html',cataract.dataset.cataractGroup);return;}
  const title=e.target.closest('.consumable-section-link'),cannula=e.target.closest('.cannula-section-link'),visco=e.target.closest('[data-viscoelastic-choice]'),silicone=e.target.closest('[data-silicone-group]'),pdms=e.target.closest('button[data-section-choice="Silikon yağları"]');
  if(!title&&!cannula&&!visco&&!silicone&&!pdms)return;
  e.preventDefault();e.stopImmediatePropagation();
  if(title)go(title.dataset.directory);else if(cannula)go('surgical-instruments.html','Cannula');else if(visco)go(routes.viscoelastic.page,visco.dataset.viscoelasticChoice);else go(routes.silicone.page,silicone?silicone.dataset.siliconeGroup:'PDMS');
 },true);
})();
