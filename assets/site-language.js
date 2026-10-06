(()=>{
 'use strict';
 const assetBase=new URL('.',document.currentScript.src);
 const supported=['az','en','ru','tr'];
 const normalize=s=>s.replace(/\s+/g,' ').trim();
 const nodes=new WeakMap(),attributes=new WeakMap(),searchNames=new WeakMap();
 let lang='az',version=0,scheduled=false;
 const loaded={az:Promise.resolve()},uiLabels={az:'Dil',en:'Language',ru:'Язык',tr:'Dil'};
 const query=new URL(location.href).searchParams.get('lang');
 let saved;try{saved=localStorage.getItem('iris-language')}catch{}
 const initial=supported.includes(query)?query:supported.includes(saved)?saved:'az';
 const originalTitle=document.title;
 const selector=document.createElement('select');selector.className='iris-language-select';selector.setAttribute('data-no-translate','');
 for(const code of supported){const option=document.createElement('option');option.value=code;option.textContent=code.toUpperCase();selector.append(option)}
 const host=document.querySelector('.header-inner,.iris-nav-inner');
 if(host&&window.self===window.top){const holder=document.createElement('div');holder.className='iris-language-control';holder.setAttribute('data-no-translate','');holder.append(selector);host.append(holder)}
 const skip=el=>!el||el.closest('script,style,textarea,code,pre,[data-no-translate],.iris-language-control');
 const reverse=new Map();
 function canonical(s){return reverse.get(normalize(s))||s}
 function t(s){
  s=canonical(s);if(lang==='az')return s;
  const key=normalize(s),dict=window.IRIS_LOCALES?.[lang]||{};
  if(dict[key])return dict[key];
  const numbered=key.match(/^(\d+\.\s+)(.+)$/);if(numbered)return numbered[1]+t(numbered[2]);
  const picture=key.match(/^(.*?) — şəkil (\d+)$/);if(picture)return t(picture[1])+' — '+({en:'image',ru:'фото',tr:'görsel'}[lang])+' '+picture[2];
  return s;
 }
 window.irisTranslate=t;
 window.irisOrderMessage=product=>({az:`Salam! ${product} məhsulunu sifariş etmək istəyirəm. Zəhmət olmasa, qiymət və mövcudluq barədə məlumat verin.`,en:`Hello! I would like to order ${product}. Please let me know the price and availability.`,ru:`Здравствуйте! Я хочу заказать ${product}. Сообщите, пожалуйста, цену и наличие.`,tr:`Merhaba! ${product} sipariş etmek istiyorum. Lütfen fiyat ve stok bilgisi verin.`}[lang]);
 function apply(){
  observer.disconnect();
  document.documentElement.lang=lang;document.title=t(originalTitle);selector.value=lang;selector.setAttribute('aria-label',uiLabels[lang]);
  const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT);let node;
  while(node=walker.nextNode()){
   if(skip(node.parentElement)||!normalize(node.nodeValue))continue;
   let state=nodes.get(node);if(!state||node.nodeValue!==state.output)state={original:canonical(node.nodeValue)};
   const translated=t(state.original);state.output=translated===state.original?state.original:state.original.replace(state.original.trim(),translated);nodes.set(node,state);
   if(node.parentElement.tagName==='OPTION'&&!node.parentElement.hasAttribute('value'))node.parentElement.setAttribute('value',state.original.trim());
   if(node.nodeValue!==state.output)node.nodeValue=state.output;
  }
  for(const el of document.querySelectorAll('[placeholder],[aria-label],[alt],[title]')){
   if(el.closest('script,style,code,pre,[data-no-translate],.iris-language-control'))continue;let state=attributes.get(el)||{};
   for(const name of ['placeholder','aria-label','alt','title']){if(!el.hasAttribute(name))continue;const value=el.getAttribute(name);if(!state[name]||state[name].output!==value)state[name]={original:value};state[name].output=t(state[name].original);el.setAttribute(name,state[name].output)}attributes.set(el,state);
  }
  for(const card of document.querySelectorAll('.card[data-name]')){if(!searchNames.has(card))searchNames.set(card,card.dataset.name);card.dataset.name=searchNames.get(card)+' '+(card.querySelector('h2')?.textContent||'').toLowerCase()}
  observer.observe(document.body,{childList:true,subtree:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','alt','title']});
 }
 const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;queueMicrotask(()=>{scheduled=false;apply()})});
 function load(code){if(loaded[code])return loaded[code];loaded[code]=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src=new URL('locales/'+code+'.js',assetBase);script.onload=()=>{for(const [source,value] of Object.entries(window.IRIS_LOCALES?.[code]||{})){if(source!==value&&!Object.hasOwn(window.IRIS_LOCALES[code],value))reverse.set(normalize(value),source)}resolve()};script.onerror=()=>{delete loaded[code];reject(Error('Language unavailable'))};document.head.append(script)});return loaded[code]}
 async function select(code,broadcast=true){if(!supported.includes(code))return;const current=++version;selector.disabled=true;try{await load(code);if(current!==version)return;lang=code;try{localStorage.setItem('iris-language',code)}catch{}try{const url=new URL(location.href);url.searchParams.set('lang',code);history.replaceState(history.state,'',url.href)}catch{}apply();document.dispatchEvent(new CustomEvent('iris-language-change',{detail:{language:lang}}));if(broadcast)for(const frame of document.querySelectorAll('iframe'))frame.contentWindow?.postMessage({type:'iris-language',language:code},'*')}catch{selector.value=lang}finally{if(current===version)selector.disabled=false}}
 selector.addEventListener('change',()=>select(selector.value));
 window.addEventListener('storage',e=>{if(e.key==='iris-language')select(e.newValue,false)});
 window.addEventListener('message',event=>{if(event.source===window.parent&&window.parent!==window&&event.data?.type==='iris-language')select(event.data.language,false);if(event.data?.type==='iris-language-ready'&&[...document.querySelectorAll('iframe')].some(f=>f.contentWindow===event.source))event.source.postMessage({type:'iris-language',language:lang},'*')});
 document.addEventListener('click',event=>{const a=event.target.closest('a[href]');if(!a)return;const raw=a.getAttribute('href');if(!raw||raw.startsWith('#'))return;const url=new URL(a.href);if(url.origin!==location.origin||!url.pathname.endsWith('.html'))return;url.searchParams.set('lang',lang);a.href=url.href},true);
 if(window.parent!==window)window.parent.postMessage({type:'iris-language-ready'},'*');
 select(initial);
})();
