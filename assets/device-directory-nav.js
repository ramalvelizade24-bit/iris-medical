(()=>{
 const go=()=>{const url=new URL('devices.html',location.href);url.searchParams.set('lang',document.documentElement.lang||'az');if(window.irisOpenCatalogDirectory)window.irisOpenCatalogDirectory(url.href);else window.top.location.href=url.href;};
 const summary=document.querySelector('.devices-accordion>summary');
 if(summary){const span=summary.querySelector('span');const link=document.createElement('a');link.className='device-section-link';link.href='devices.html';link.textContent=span.textContent;link.style.cssText='color:inherit;text-decoration:none;flex:1';span.replaceWith(link);summary.parentElement.open=false;}
 document.addEventListener('click',e=>{if(e.target.closest('.device-section-link,[data-section-choice="Cihazlar"]')){e.preventDefault();e.stopImmediatePropagation();go();}},true);
})();
