(()=>{
 const search=document.querySelector('#search');if(!search)return;
 const button=document.createElement('button');button.type='button';button.className='catalog-all-button';button.setAttribute('aria-expanded','false');button.setAttribute('aria-controls','catalog-all-menu');
 button.innerHTML='<span aria-hidden="true">☷</span> <span>Məhsul kataloqu</span>';
 const toolbar=document.createElement('div');toolbar.className='catalog-quick-actions';
 const searchToggle=document.createElement('button');searchToggle.type='button';searchToggle.className='catalog-search-toggle';searchToggle.setAttribute('aria-label','Məhsul axtar');searchToggle.setAttribute('aria-expanded','false');searchToggle.setAttribute('aria-controls','search');
 searchToggle.innerHTML='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/></svg>';
 search.before(toolbar);toolbar.append(button,searchToggle);search.hidden=!search.value;
 searchToggle.setAttribute('aria-expanded',String(!search.hidden));
 searchToggle.addEventListener('click',()=>{search.hidden=!search.hidden;searchToggle.setAttribute('aria-expanded',String(!search.hidden));if(!search.hidden)search.focus()});
 search.addEventListener('keydown',e=>{if(e.key==='Escape'){search.hidden=true;searchToggle.setAttribute('aria-expanded','false');searchToggle.focus()}});
 const menu=document.createElement('section');menu.id='catalog-all-menu';menu.className='catalog-all-menu';menu.hidden=true;menu.setAttribute('aria-label','Bütün məhsullar');
 const top=document.createElement('div');top.className='catalog-all-top';const heading=document.createElement('h2');heading.textContent='Məhsul kataloqu';const close=document.createElement('button');close.type='button';close.textContent='×';close.setAttribute('aria-label','Bağla');top.append(heading,close);
 const grid=document.createElement('div');grid.className='catalog-all-grid';menu.append(top,grid);document.querySelector('.product-area').prepend(menu);
 const groups=[['Cərrahi sistemlər',[]],['Oftalmoloji lazerlər',[]],['Diaqnostika və avadanlıq',[]],['Diaqnostik və cərrahi linzalar',[]],['Cərrahi alətlər',[]],['Oftalmik bıçaqlar',[]],['Məhlullar, qazlar və yağlar',[]],['Sərf materialları',[]]];
 for(const card of document.querySelectorAll('.grid .card')){
  const link=card.querySelector('.product-name');if(!link)continue;
  const section=card.dataset.section||'', text=(card.dataset.name+' '+card.dataset.category).toLowerCase();let group=7;
  if(section==='Cihazlar')group=/laser|lazer|yag|slt|amogh|jericho|microlase|cl-uvr|dynalase/.test(text)?1:/microscope|mikroskop|phaco|fako|galaxy|revel|rhexa|brilliant|truglow/.test(text)?0:2;
  else if(/Diagnostic.*Lenses/.test(section))group=3;
  else if(section==='Cerrahi Aletler')group=4;
  else if(section==='Oftalmik Bıçaklar')group=5;
  else if(/раствор|məhlul|qaz|yağ/i.test(section))group=6;
  groups[group][1].push(link);
 }
 for(const [name,links]of groups){if(!links.length)continue;const section=document.createElement('section');section.className='catalog-all-group';const h=document.createElement('h3');h.textContent=name;const list=document.createElement('div');list.className='catalog-all-links';list.tabIndex=0;list.setAttribute('role','region');list.setAttribute('aria-label',name);
  for(const link of links){const a=document.createElement('a');a.href=link.getAttribute('href');a.target='_top';a.textContent=link.textContent.trim();list.append(a);}section.append(h,list);grid.append(section);
 }
 function setOpen(open,restore=false){menu.hidden=!open;button.setAttribute('aria-expanded',String(open));if(open)close.focus({preventScroll:true});else if(restore)button.focus({preventScroll:true});}
 button.addEventListener('click',()=>setOpen(menu.hidden));close.addEventListener('click',()=>setOpen(false,true));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden)setOpen(false,true)});
 document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!button.contains(e.target))setOpen(false)});
})();
