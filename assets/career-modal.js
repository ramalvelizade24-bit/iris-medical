(()=>{
const trigger=document.querySelector('.career-apply');if(!trigger)return;
const dialog=document.createElement('dialog');dialog.className='career-modal';dialog.setAttribute('aria-labelledby','career-modal-title');
dialog.innerHTML=`<button class="career-close" type="button" aria-label="Bağla">×</button><p class="career-modal-eyebrow">KARYERA MÜRACİƏTİ</p><h2 id="career-modal-title">İşə qəbul üçün müraciət</h2><form><label for="career-name">AD VƏ SOYAD *</label><input id="career-name" name="name" autocomplete="name" placeholder="Ad Soyad" required maxlength="150"><label for="career-email">E-POÇT *</label><input id="career-email" name="email" type="email" autocomplete="email" placeholder="email@example.com" required><label for="career-cv">CV (PDF, DOC, DOCX) *</label><div class="career-upload"><span id="career-file-label">Seçmək üçün klikləyin (.pdf, .doc, .docx)</span><input id="career-cv" name="cv" type="file" accept=".pdf,.doc,.docx" aria-describedby="career-file-label" required></div><p class="career-form-status" role="status">Onlayn göndərmə hələ aktiv deyil. Məlumatlarınız və faylınız göndərilmir.</p><button class="career-submit" type="submit" disabled>GÖNDƏR</button></form>`;
document.body.append(dialog);
const form=dialog.querySelector('form');
form.action='https://formsubmit.co/info@irismedical.az';
form.method='POST';
form.enctype='multipart/form-data';
form.acceptCharset='UTF-8';
const fileInput=dialog.querySelector('[type=file]');
fileInput.name='attachment';
const status=dialog.querySelector('.career-form-status');
status.textContent='CV: PDF, DOC və ya DOCX, maks. 10 MB. Adınız, e-poçtunuz və CV-niz FormSubmit vasitəsilə info@irismedical.az ünvanına göndəriləcək.';
dialog.querySelector('.career-submit').disabled=false;
for(const [name,value] of [['_subject','IRIS MEDICAL — Karyera müraciəti'],['_template','table']]){const input=document.createElement('input');input.type='hidden';input.name=name;input.value=value;form.append(input);}
trigger.addEventListener('click',e=>{e.preventDefault();dialog.showModal();document.body.classList.add('career-modal-open');});
const close=()=>dialog.close();dialog.querySelector('.career-close').addEventListener('click',close);
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}});
dialog.addEventListener('close',()=>{document.body.classList.remove('career-modal-open');trigger.focus();});
window.addEventListener('hashchange',()=>{if(dialog.open)close();});
const validFile=file=>file&&/\.(pdf|doc|docx)$/i.test(file.name)&&file.size>0&&file.size<=10000000;
form.addEventListener('submit',e=>{
if(!/^https?:$/.test(location.protocol)){e.preventDefault();status.textContent='Göndərmək üçün saytı GitHub Pages ünvanından açın. Lokal fayldan göndərmə mümkün deyil.';return;}
if(!validFile(fileInput.files[0])){e.preventDefault();fileInput.setCustomValidity('PDF, DOC və ya DOCX seçin (maks. 10 MB, boş olmayan fayl).');fileInput.reportValidity();}
});
fileInput.addEventListener('change',e=>{const file=e.target.files[0];const label=dialog.querySelector('#career-file-label');fileInput.setCustomValidity('');if(file&&!validFile(file)){e.target.value='';label.textContent='PDF, DOC və ya DOCX seçin (maks. 10 MB, boş olmayan fayl).';return;}label.textContent=file?file.name:'Seçmək üçün klikləyin (.pdf, .doc, .docx)';});
})();
