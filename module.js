import {createHash} from 'node:crypto';
import {F,R,S,C,rows,byId,required,changed,immutable,unique,summary} from './core/rules.js';
const same=(a,b)=>JSON.stringify(a)===JSON.stringify(b),pick=(r,ks)=>Object.fromEntries(ks.map(k=>[k,r[k]]));
export const hash=x=>createHash('sha256').update(JSON.stringify(x)).digest('hex');
const uuid=x=>typeof x==='string'&&/^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/.test(x);
const code=x=>typeof x==='string'&&/^[A-Z][A-Z0-9_-]{0,39}$/.test(x);
const account=x=>typeof x==='string'&&/^[a-zA-Z0-9_.-]{3,80}$/.test(x);
const text=(x,max=8000)=>typeof x==='string'&&x.trim().length>0&&x.length<=max;
const time=x=>typeof x==='string'&&Number.isFinite(Date.parse(x))&&new Date(Date.parse(x)).toISOString()===x;
const positive=x=>Number.isSafeInteger(x)&&x>0;
const listKeys=['id','code','title','descriptionRu','descriptionKk','version'];
const requirementKeys=['id','code','position','textRu','textKk'];
const documentKeys=['id','title','language','body','owner','at'];
const findingKeys=['id','worksheet','requirementCode','verdict','start','end','secondStart','secondEnd','note','quotes','version','owner','at'];
const offsets=['start','end','secondStart','secondEnd'];
const sealed=(s,id)=>rows(s,'reports').some(r=>r.worksheet===id);
const used=(s,k)=>['documents','worksheets','reports'].some(c=>rows(s,c).some(r=>r.requestKey===k));
export function checklistFor(s,id){
 const c=byId(s,'checklists',id);required(!c.archived,'Список требований в архиве.');
 const requirements=rows(s,'requirements').filter(r=>r.checklist===id&&!r.archived).sort((a,b)=>a.position-b.position||a.code.localeCompare(b.code)).map(r=>pick(r,requirementKeys));
 const snapshot={...pick(c,listKeys),requirements};checkSnapshot(snapshot);return {snapshot,digest:hash(snapshot)};
}
export function checkSnapshot(p){
 required(p&&uuid(p.id)&&code(p.code)&&text(p.title)&&text(p.descriptionRu)&&text(p.descriptionKk)&&positive(p.version),'Нужны код, название и оба описания RU/KK.');
 required(Array.isArray(p.requirements)&&p.requirements.length>=1&&p.requirements.length<=12,'Публикация: 1–12 требований.');
 const ids=new Set(),codes=new Set(),positions=new Set();let position=0;
 for(const r of p.requirements){required(uuid(r.id)&&!ids.has(r.id)&&code(r.code)&&!codes.has(r.code)&&Number.isInteger(r.position)&&r.position>=1&&r.position<=20&&!positions.has(r.position)&&r.position>position&&text(r.textRu)&&text(r.textKk),'Разные коды/позиции 1–20 и оба текста каждого требования обязательны.');ids.add(r.id);codes.add(r.code);positions.add(r.position);position=r.position;}
 return p;
}
// Offsets are zero-based UTF-16 units. Do not split a surrogate pair.
export function span(body,start,end){
 required(typeof start==='string'&&typeof end==='string'&&/^(0|[1-9]\d{0,4})$/.test(start)&&/^(0|[1-9]\d{0,4})$/.test(end),'Границы цитаты: целые канонические позиции от 0.');
 const a=Number(start),b=Number(end),boundary=i=>!(i>0&&i<body.length&&/[\uD800-\uDBFF]/.test(body[i-1])&&/[\uDC00-\uDFFF]/.test(body[i]));
 required(a<b&&b<=body.length&&boundary(a)&&boundary(b),'Цитата вне текста, пуста или разрезает Unicode-пару.');
 const quote=body.slice(a,b);required(quote.trim().length>0,'Цитата состоит только из пробелов.');return {start:a,end:b,text:quote};
}
export function findingQuotes(body,r){
 required(['supported','missing','conflicting'].includes(r.verdict)&&text(r.note),'Выберите отметку и запишите основание.');
 if(r.verdict==='missing'){required(offsets.every(k=>r[k]===''),'У отметки «Не найдено» не должно быть границ цитат.');return [];}
 const first=span(body,r.start,r.end);
 if(r.verdict==='supported'){required(r.secondStart===''&&r.secondEnd==='','Одна опора: вторая цитата должна быть пустой.');return [first];}
 const second=span(body,r.secondStart,r.secondEnd);required(first.end<=second.start,'Две конфликтующие цитаты должны идти по порядку и не пересекаться.');return [first,second];
}
export function reportFor(s,id){
 const w=byId(s,'worksheets',id);required(!w.archived&&!sealed(s,id),'Проверка закрыта или отчёт уже записан.');
 const findings=w.checklistSnapshot.requirements.map(req=>{const f=rows(s,'findings').find(f=>f.worksheet===id&&f.requirementCode===req.code);required(f,'Заполните каждое требование, включая явное «Не найдено»: '+req.code+'.');return {requirement:req,finding:pick(f,findingKeys)};});
 const counts={supported:findings.filter(x=>x.finding.verdict==='supported').length,missing:findings.filter(x=>x.finding.verdict==='missing').length,conflicting:findings.filter(x=>x.finding.verdict==='conflicting').length};
 const report={status:counts.missing||counts.conflicting?'needs_evidence':'complete',counts,document:w.documentSnapshot,checklist:w.checklistSnapshot,findings};return {report,digest:hash(report)};
}
export default {
 slug:'dalel-check',title:'DalelCheck',reference:15,description:'Ручная сверка синтетического текста: опубликованные требования, точные цитаты и полный неизменный отчёт.',limitations:'Только вымышленные тексты · Общая область сотрудников · Отметки человека, без AI и проверки смысла',
 collections:[
  C('checklists','Списки требований',[F('code','Код списка'),F('title','Название'),F('descriptionRu','Описание RU','textarea',{required:false}),F('descriptionKk','Описание KK','textarea',{required:false})],{writeRole:'admin',addLabel:'Создать список',description:'Admin готовит оба описания. Неполный черновик разрешён.'}),
  C('requirements','Требования',[R('checklist','Список','checklists'),F('code','Код требования'),F('position','Позиция','integer',{min:1,max:20}),F('textRu','Требование RU','textarea',{required:false}),F('textKk','Требование KK','textarea',{required:false})],{writeRole:'admin',addLabel:'Добавить требование',description:'Для публикации: 1–12 разных кодов и позиций, оба текста. Архив состава повышает версию списка.'}),
  C('publications','Публикации',[R('checklist','Список','checklists')],{writeRole:'admin',addLabel:'Проверить и опубликовать',description:'Точный снимок списка и упорядоченных требований; повтор версии запрещён.'}),
  C('documents','Тексты',[F('title','Название текста'),S('language','Язык текста',[['ru','Русский'],['kk','Қазақша']]),F('body','Вымышленный текст','textarea',{maxLength:12000}),F('requestKey','Ключ действия')],{addLabel:'Сохранить текст',description:'Неизменный синтетический текст до 12000 UTF-16 единиц после обрезки краёв. Без нормализации и перевода.'}),
  C('worksheets','Проверки',[R('publication','Публикация','publications'),R('document','Текст','documents'),F('requestKey','Ключ действия')],{addLabel:'Начать проверку',description:'Автор выбирает сохранённый текст и опубликованные требования. Оба снимка фиксируются.'}),
  C('findings','Отметки',[R('worksheet','Проверка','worksheets'),F('requirementCode','Код требования'),S('verdict','Ручная отметка',[['supported','Опора в тексте'],['missing','Не найдено'],['conflicting','Конфликт двух цитат']]),...offsets.map(k=>F(k,k,'text',{required:false})),F('note','Основание отметки','textarea')],{addLabel:'Открыть проверку',description:'Только автор проверки. Один вывод на требование; сервер извлекает точные цитаты. После отчёта отметки заморожены.'}),
  C('reports','Отчёты',[R('worksheet','Проверка','worksheets'),F('note','Основание закрытия','textarea'),F('requestKey','Ключ действия')],{addLabel:'Открыть проверку',description:'Автор один раз явно закрывает полную проверку. complete = все ручные отметки «Опора», не гарантия правильности.'})
 ],
 preview(s,input){if(input.mode==='checklist')return checklistFor(s,input.checklist);required(input.mode==='report','Неизвестный просмотр.');return reportFor(s,input.worksheet);},
 normalizeRow(key,row,s,old,actor,ctx){
  const at=new Date(ctx.now).toISOString();
  if(key==='checklists')return {...row,version:old?old.version+(Object.keys(row).some(k=>row[k]!==old[k])?1:0):1};
  if(key==='requirements'){required(!old||row.checklist===old.checklist,'Требование не переносится в другой список.');const p=byId(s,'checklists',row.checklist);required(!p.archived,'Список в архиве.');if(!old||Object.keys(row).some(k=>row[k]!==old[k]))p.version++;return row;}
  if(key==='publications'){required(!old,'Публикация неизменна.');const p=checklistFor(s,row.checklist);return {...row,...p,checklistVersion:p.snapshot.version,owner:actor.name,at};}
  if(key==='findings'){
   const w=byId(s,'worksheets',row.worksheet);required(!old||row.worksheet===old.worksheet&&row.requirementCode===old.requirementCode,'Отметка не переносится.');required(actor.name===w.owner&&!w.archived&&!sealed(s,w.id),'Только автор незакрытой проверки меняет отметки.');required(w.checklistSnapshot.requirements.some(r=>r.code===row.requirementCode),'Требование отсутствует в снимке.');required(at>=w.at&&(!old||at>=old.at),'Серверное время раньше проверки или отметки.');
   return {...row,quotes:findingQuotes(w.documentSnapshot.body,row),owner:actor.name,at,version:old?old.version+1:1};
  }
  required(!old,'Текст, проверка и отчёт неизменны.');required(uuid(row.requestKey)&&!used(s,row.requestKey),'Нужен новый, не использованный UUID.');
  if(key==='documents')return {...row,owner:actor.name,at};
  if(key==='worksheets'){
   const p=byId(s,'publications',row.publication),d=byId(s,'documents',row.document);required(!p.archived&&!byId(s,'checklists',p.checklist).archived&&!d.archived,'Публикация, список или текст в архиве.');required(at>=p.at&&at>=d.at,'Серверное время раньше источников.');
   return {...row,checklistSnapshot:p.snapshot,documentSnapshot:pick(d,documentKeys),publicationDigest:p.digest,owner:actor.name,at};
  }
  const w=byId(s,'worksheets',row.worksheet);required(actor.name===w.owner,'Отчёт записывает только автор проверки.');const result=reportFor(s,w.id);required(at>=w.at&&result.report.findings.every(x=>at>=x.finding.at),'Серверное время раньше проверки или отметок.');return {...row,...result,owner:actor.name,at};
 },
 validate(s,before,command){
  if(command.operation==='archive'){
   required(!['findings','reports'].includes(command.collection),'Отметки и отчёты не скрываются архивом.');
   if(command.collection==='requirements'){const old=changed(before,'requirements',command.id);if(old&&!old.archived){const p=byId(s,'checklists',old.checklist);required(!p.archived,'Список в архиве.');p.version++;}}
  }
  unique(rows(s,'checklists'),'code','Код списка');
  for(const p of rows(s,'checklists'))required(code(p.code)&&text(p.title)&&positive(p.version),'Неверный список.');
  const codes=new Set(),positions=new Set();for(const r of rows(s,'requirements')){byId(s,'checklists',r.checklist);required(code(r.code)&&Number.isInteger(r.position)&&r.position>=1&&r.position<=20,'Неверное требование.');if(!r.archived){const k=r.checklist+':'+r.code,v=r.checklist+':'+r.position;required(!codes.has(k)&&!positions.has(v),'Повтор кода или позиции требования.');codes.add(k);positions.add(v);}}
  const versions=new Set(),keys=new Set();for(const p of rows(s,'publications')){const parent=byId(s,'checklists',p.checklist),v=p.checklist+':'+p.checklistVersion;checkSnapshot(p.snapshot);required(p.snapshot.id===parent.id&&p.checklistVersion===p.snapshot.version&&p.checklistVersion<=parent.version&&p.digest===hash(p.snapshot)&&!versions.has(v)&&account(p.owner)&&time(p.at)&&p.owner===p.createdBy&&p.at===p.createdAt,'Неверная или повторная публикация.');versions.add(v);immutable(changed(before,'publications',p.id),p,['checklist','snapshot','digest','checklistVersion','owner','at']);}
  for(const c of ['documents','worksheets','reports'])for(const r of rows(s,c)){required(uuid(r.requestKey)&&!keys.has(r.requestKey)&&account(r.owner)&&time(r.at)&&r.createdAt===r.at&&r.createdBy===r.owner,'Неверный UUID, автор или время.');keys.add(r.requestKey);}
  for(const d of rows(s,'documents')){required(text(d.title)&&text(d.body,12000)&&d.body===d.body.trim()&&['ru','kk'].includes(d.language),'Неверный текст.');immutable(changed(before,'documents',d.id),d,[...documentKeys,'requestKey']);}
  for(const w of rows(s,'worksheets')){const p=byId(s,'publications',w.publication),d=byId(s,'documents',w.document);required(same(w.checklistSnapshot,p.snapshot)&&same(w.documentSnapshot,pick(d,documentKeys))&&w.publicationDigest===p.digest&&w.at>=p.at&&w.at>=d.at,'Нарушен снимок проверки.');immutable(changed(before,'worksheets',w.id),w,['publication','document','requestKey','checklistSnapshot','documentSnapshot','publicationDigest','owner','at']);}
  const found=new Set();for(const f of rows(s,'findings')){const w=byId(s,'worksheets',f.worksheet),k=w.id+':'+f.requirementCode;required(!f.archived&&!found.has(k)&&w.checklistSnapshot.requirements.some(r=>r.code===f.requirementCode)&&same(f.quotes,findingQuotes(w.documentSnapshot.body,f))&&f.owner===w.owner&&f.createdBy===f.owner&&positive(f.version)&&time(f.at)&&f.at>=w.at,'Неверная отметка.');found.add(k);const old=changed(before,'findings',f.id);if(old&&rows(before,'reports').some(r=>r.worksheet===w.id))immutable(old,f,findingKeys);}
  const reported=new Set();for(const r of rows(s,'reports')){const w=byId(s,'worksheets',r.worksheet);const draft={...s,worksheets:rows(s,'worksheets').map(x=>x.id===w.id?{...x,archived:false}:x),reports:[]},expected=reportFor(draft,w.id);required(!reported.has(w.id)&&!r.archived&&r.owner===w.owner&&r.at>=w.at&&r.report.findings.every(x=>r.at>=x.finding.at)&&same(r.report,expected.report)&&r.digest===expected.digest&&text(r.note),'Нарушен полный отчёт.');reported.add(w.id);immutable(changed(before,'reports',r.id),r,['worksheet','note','requestKey','report','digest','owner','at']);}
 },
 summarize(s){return summary('Ручные полные отчёты',...rows(s,'reports').map(r=>r.report.status+' · '+r.report.counts.supported+'/'+r.report.findings.length+' опор · '+r.owner));}
};
