(()=>{
 const go=()=>{const url=new URL('devices.html',location.href);url.searchParams.set('lang',document.documentElement.lang||'az');window.top.location.href=url.href;};
 const summary=document.querySelector('.devices-accordion>summary');
 if(summary){summary.setAttribute('role','link');summary.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();go();}});summary.parentElement.open=true;}
 document.addEventListener('click',e=>{if(e.target.closest('.devices-accordion>summary,[data-section-choice="Cihazlar"]')){e.preventDefault();e.stopImmediatePropagation();go();}},true);
})();
