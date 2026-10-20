(()=>{
 const frame=document.querySelector('.iris-values-frame');if(!frame)return;
 function setLanguage(language){
  if(!['az','en','ru','tr'].includes(language))return;
  const url=new URL(frame.getAttribute('src'),location.href);
  if(url.searchParams.get('lang')===language)return;
  url.searchParams.set('lang',language);frame.src=url.href;
 }
 document.addEventListener('iris-language-change',e=>setLanguage(e.detail.language));
 setLanguage(new URLSearchParams(location.search).get('lang')||document.documentElement.lang||'az');
})();
