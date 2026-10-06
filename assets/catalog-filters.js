(()=>{
const panel=document.querySelector('#category-panel'),search=document.querySelector('#search'),trigger=document.querySelector('#category-trigger'),label=document.querySelector('#category-label');
if(!panel)return;
const cards=[...document.querySelectorAll('.card')];
const norm=s=>String(s||'').toLocaleLowerCase().normalize('NFKD').replace(/\p{M}/gu,'').replace(/&|\band\b/g,' ').replace(/dialators/g,'dilators').replace(/[^\p{L}\p{N}]+/gu,' ').trim().replace(/ +/g,' ');
const types={'ophthalmicCategory':'Oftalmik Bıçaklar','surgicalCategory':'Cerrahi Aletler','deviceCategory':'Cihazlar','categoryChoice':'Ophtalmic Series'};
function match(button,card){if(button.hasAttribute('data-section-choice'))return !button.dataset.sectionChoice||button.dataset.sectionChoice===card.dataset.section;for(const [key,section]of Object.entries(types))if(button.dataset[key]!==undefined)return card.dataset.section===section&&norm(card.dataset.category).includes(norm(button.dataset[key]));return false}
const choices=[...panel.querySelectorAll('button:not(.accordion-trigger)')];
for(const b of choices){const count=cards.filter(c=>match(b,c)).length;if(!count){b.remove();continue}const name=document.createElement('span');name.textContent=b.dataset.sectionChoice===''?'Bütün məhsullar':b.textContent.trim();b.replaceChildren(name);const badge=document.createElement('small');badge.className='filter-count';badge.setAttribute('data-no-translate','');badge.textContent=count;b.append(badge);b.setAttribute('aria-pressed','false')}
for(const group of panel.querySelectorAll('details,.ophthalmic-accordion'))if(!group.querySelector('button:not(.accordion-trigger)'))group.remove();
let selected=panel.querySelector('[data-section-choice=""]');
const status=document.createElement('p');status.className='catalog-result-count';status.setAttribute('role','status');status.setAttribute('data-no-translate','');
const empty=document.createElement('p');empty.className='catalog-empty';empty.setAttribute('data-no-translate','');
const reset=document.createElement('button');reset.type='button';reset.className='catalog-reset';reset.setAttribute('data-no-translate','');
document.querySelector('.product-area').prepend(status);document.querySelector('.grid').after(empty);search.after(reset);
const copy={az:['Filtrləri sıfırla','məhsul','Məhsul tapılmadı. Axtarışı və ya kateqoriyanı dəyişin.','Kateqoriyalar'],en:['Reset filters','products','No products found. Change your search or category.','Categories'],ru:['Сбросить фильтры','товаров','Товары не найдены. Измените поиск или категорию.','Категории'],tr:['Filtreleri sıfırla','ürün','Ürün bulunamadı. Aramayı veya kategoriyi değiştirin.','Kategoriler']};
label.setAttribute('data-no-translate','');
function apply(){const q=norm(search.value);let count=0;for(const card of cards){const text=norm(card.dataset.name+' '+card.dataset.category+' '+card.textContent);card.hidden=!(match(selected,card)&&(!q||q.split(' ').every(word=>text.includes(word))));if(!card.hidden)count++}const words=copy[document.documentElement.lang]||copy.az;status.textContent=count+' '+words[1];empty.textContent=words[2];empty.hidden=count>0;reset.textContent=words[0];label.textContent=words[3];reset.hidden=!search.value&&selected?.dataset.sectionChoice==='';for(const b of panel.querySelectorAll('button:not(.accordion-trigger)')){const active=b===selected;b.classList.toggle('is-selected',active);b.setAttribute('aria-pressed',String(active))}requestAnimationFrame(()=>parent.postMessage({type:'madhu-catalog-height',height:Math.max(1000,Math.ceil(document.querySelector('.shell').getBoundingClientRect().height+24))},'*'))}
panel.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.classList.contains('accordion-trigger')){const p=b.nextElementSibling;p.hidden=!p.hidden;b.setAttribute('aria-expanded',String(!p.hidden));return}selected=b;apply();if(matchMedia('(max-width:700px)').matches){panel.hidden=true;trigger.setAttribute('aria-expanded','false')}});
trigger.setAttribute('aria-controls','category-panel');trigger.setAttribute('aria-expanded','false');panel.hidden=true;
trigger.addEventListener('click',()=>{panel.hidden=!panel.hidden;trigger.setAttribute('aria-expanded',String(!panel.hidden))});
search.setAttribute('aria-label','Məhsul axtar...');search.addEventListener('input',apply);
reset.addEventListener('click',()=>{search.value='';selected=panel.querySelector('[data-section-choice=""]');apply();search.focus()});
document.addEventListener('iris-language-change',apply);apply();
new ResizeObserver(()=>parent.postMessage({type:'madhu-catalog-height',height:Math.max(1000,Math.ceil(document.querySelector('.shell').getBoundingClientRect().height+24))},'*')).observe(document.querySelector('.shell'));
})();
