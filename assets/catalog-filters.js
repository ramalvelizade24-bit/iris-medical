(()=>{
const panel=document.querySelector('#category-panel'),search=document.querySelector('#search'),trigger=document.querySelector('#category-trigger'),label=document.querySelector('#category-label');
if(!panel)return;
const cards=[...document.querySelectorAll('.card')];
const norm=s=>String(s||'').toLocaleLowerCase().normalize('NFKD').replace(/\p{M}/gu,'').replace(/&|\band\b/g,' ').replace(/dialators/g,'dilators').replace(/[^\p{L}\p{N}]+/gu,' ').trim().replace(/ +/g,' ');
const types={'ophthalmicCategory':'Oftalmik Bıçaklar','surgicalCategory':'Cerrahi Aletler','deviceCategory':'Cihazlar','categoryChoice':'Ophtalmic Series'};
function match(button,card){if(button.dataset.sectionChoice==='Silikon yağları')return card.dataset.section==='Silikon yağları'&&!card.dataset.siliconeGroup;if(button.dataset.viscoelasticChoice)return card.dataset.section==='Вискоэластические растворы'&&card.dataset.viscoelasticGroup===button.dataset.viscoelasticChoice;if(button.dataset.cannulaChoice)return card.dataset.category==='Cannula'&&card.dataset.cannulaUse===button.dataset.cannulaChoice;if(button.dataset.siliconeGroup)return card.dataset.section==='Silikon yağları'&&card.dataset.siliconeGroup===button.dataset.siliconeGroup;if(button.dataset.useChoice)return card.dataset.section==='Silikon yağları'&&card.dataset.use===button.dataset.useChoice;if(button.hasAttribute('data-section-choice'))return !button.dataset.sectionChoice||button.dataset.sectionChoice===card.dataset.section;for(const [key,section]of Object.entries(types))if(button.dataset[key]!==undefined)return card.dataset.section===section&&norm(card.dataset.category).includes(norm(button.dataset[key]));return false}
const choices=[...panel.querySelectorAll('button:not(.accordion-trigger)')];
for(const b of choices){const count=cards.filter(c=>match(b,c)).length;if(!count&&!b.dataset.useChoice){b.remove();continue}const name=document.createElement('span');name.textContent=b.dataset.sectionChoice===''?'Bütün məhsullar':b.textContent.trim();b.replaceChildren(name);b.setAttribute('aria-pressed','false')}
for(const group of panel.querySelectorAll('details,.ophthalmic-accordion'))if(!group.querySelector('button:not(.accordion-trigger)'))group.remove();
let selected=panel.querySelector('[data-section-choice=""]');
const status=document.createElement('p');status.className='catalog-result-count';status.setAttribute('role','status');status.setAttribute('data-no-translate','');
const empty=document.createElement('p');empty.className='catalog-empty';empty.setAttribute('data-no-translate','');
const reset=document.createElement('button');reset.type='button';reset.className='catalog-reset';reset.setAttribute('data-no-translate','');
document.querySelector('.product-area').prepend(status);document.querySelector('.grid').after(empty);search.after(reset);
const copy={az:['Filtrləri sıfırla','məhsul','Məhsul tapılmadı. Axtarışı və ya kateqoriyanı dəyişin.','Kateqoriyalar'],en:['Reset filters','products','No products found. Change your search or category.','Categories'],ru:['Сбросить фильтры','товаров','Товары не найдены. Измените поиск или категорию.','Категории'],tr:['Filtreleri sıfırla','ürün','Ürün bulunamadı. Aramayı veya kategoriyi değiştirin.','Kategoriler']};
label.setAttribute('data-no-translate','');
let page=1,lastFilter='',lastHeight=0,heightPending=false;
const pageSize=24;
const pager=document.createElement('nav');pager.className='catalog-pagination';pager.setAttribute('data-no-translate','');
const previous=document.createElement('button'),next=document.createElement('button'),pageLabel=document.createElement('span');
previous.type=next.type='button';pager.append(previous,pageLabel,next);document.querySelector('.grid').after(pager);
function reportHeight(){
 if(self===top||heightPending)return;heightPending=true;
 requestAnimationFrame(()=>{heightPending=false;const shell=document.querySelector('.shell');if(!shell.getClientRects().length)return;
 const height=Math.max(1000,Math.ceil(shell.getBoundingClientRect().height+24));
 if(height===lastHeight)return;lastHeight=height;parent.postMessage({type:'madhu-catalog-height',height},'*');});
}
function apply(){
 const q=norm(search.value),filter=q+'|'+choices.indexOf(selected);
 if(filter!==lastFilter){page=1;lastFilter=filter;}
 const matches=cards.filter(card=>match(selected,card)&&(!q||q.split(' ').every(word=>norm(card.dataset.name+' '+card.dataset.category+' '+card.textContent).includes(word))));
 const pages=Math.max(1,Math.ceil(matches.length/pageSize));page=Math.min(page,pages);
 const visible=new Set(matches.slice((page-1)*pageSize,page*pageSize));for(const card of cards)card.hidden=!visible.has(card);
 const language=document.documentElement.lang,words=copy[language]||copy.az;
 status.textContent=matches.length+' '+words[1];empty.textContent=words[2];empty.hidden=matches.length>0;
 reset.textContent=words[0];label.textContent=words[3];reset.hidden=!search.value&&selected?.dataset.sectionChoice==='';
 const labels=({az:['Əvvəlki','Növbəti','Səhifələr'],en:['Previous','Next','Pages'],ru:['Назад','Далее','Страницы'],tr:['Önceki','Sonraki','Sayfalar']})[language]||['Əvvəlki','Növbəti','Səhifələr'];
 previous.textContent=labels[0];next.textContent=labels[1];pager.setAttribute('aria-label',labels[2]);
 pageLabel.textContent=page+' / '+pages;previous.disabled=page===1;next.disabled=page===pages;pager.hidden=pages===1;
 for(const b of panel.querySelectorAll('button:not(.accordion-trigger)')){const active=b===selected;b.classList.toggle('is-selected',active);b.setAttribute('aria-pressed',String(active));}
 reportHeight();
}
previous.addEventListener('click',()=>{page--;apply();document.querySelector('.filters').scrollIntoView({block:'start'});});
next.addEventListener('click',()=>{page++;apply();document.querySelector('.filters').scrollIntoView({block:'start'});});
window.irisCatalogPage={get:()=>page,restore:value=>{page=Math.max(1,Number(value)||1);apply();}};

panel.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.classList.contains('accordion-trigger')){const p=b.nextElementSibling;p.hidden=!p.hidden;b.setAttribute('aria-expanded',String(!p.hidden));return}selected=b;apply();if(matchMedia('(max-width:700px)').matches){panel.hidden=true;trigger.setAttribute('aria-expanded','false')}});
trigger.setAttribute('aria-controls','category-panel');trigger.setAttribute('aria-expanded','false');panel.hidden=true;
trigger.addEventListener('click',()=>{panel.hidden=!panel.hidden;trigger.setAttribute('aria-expanded',String(!panel.hidden))});
search.setAttribute('aria-label','Məhsul axtar...');search.addEventListener('input',apply);
reset.addEventListener('click',()=>{search.value='';selected=panel.querySelector('[data-section-choice=""]');apply();search.focus()});
document.addEventListener('iris-language-change',apply);apply();
new ResizeObserver(reportHeight).observe(document.querySelector('.shell'));
})();
