const node=(tag,text,cls)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(cls)e.className=cls;return e;};
const names={supported:'Опора в тексте',missing:'Не найдено',conflicting:'Конфликт двух цитат'};
const selected=new Map();
const action=(label,fn,cls='secondary')=>{const b=node('button',label,cls);b.type='button';b.onclick=fn;return b;};
const authored=(tag,text,lang,cls)=>{const e=node(tag,text,cls);e.lang=lang==='kk'?'kk':'ru';return e;};
export function productView(host,{active,values,state,onOpen}){
  if(!['worksheets','reports','documents','publications'].includes(active))return false;
  const list=node('div',undefined,'dossier-index');
  for(const row of values){
    const worksheet=active==='worksheets'?row:active==='reports'?state.data.worksheets.find(w=>w.id===row.worksheet):null;
    const sealed=worksheet&&state.data.reports.find(r=>r.worksheet===worksheet.id);
    const title=worksheet?worksheet.documentSnapshot.title:active==='documents'?row.title:row.snapshot.title;
    const code=worksheet?worksheet.checklistSnapshot.code+' / v'+worksheet.checklistSnapshot.version:active==='documents'?row.language.toUpperCase()+' / '+row.body.length+' UTF-16':row.snapshot.code+' / v'+row.checklistVersion;
    const section=node('article',undefined,'dossier-record');
    section.append(node('p',code,'eyebrow'),node('h2',title),node('p',(row.owner||worksheet?.owner)+(row.archived?' · Архив':''),'muted'));
    if(worksheet){const done=state.data.findings.filter(f=>f.worksheet===worksheet.id).length,total=worksheet.checklistSnapshot.requirements.length;section.append(node('p',sealed?'Отчёт сохранён · '+(sealed.report.status==='complete'?'все отметки «Опора»':'есть «Не найдено» или «Конфликт»'):done+' из '+total+' ручных отметок','dossier-state'));}
    else section.append(node('p',active==='documents'?'Неизменный синтетический источник':row.snapshot.requirements.length+' требований · точный опубликованный снимок','dossier-state'));
    section.append(action(worksheet?'Открыть досье':'Прочитать снимок',()=>onOpen(active,row),'primary'));list.append(section);
  }
  host.append(list);return true;
}

// Exact snapshot source and quote spans are displayed without HTML parsing or normalization.
export function dossierView(host,{worksheet:w,findings,saved,user,onEdit}){
  const workspace=node('section',undefined,'evidence-dossier');
  const rail=node('section',undefined,'requirement-rail'),source=node('section',undefined,'source-pane'),review=node('section',undefined,'finding-pane');
  rail.append(node('h2','Требования'),node('p',w.checklistSnapshot.code+' · v'+w.checklistSnapshot.version,'eyebrow'));
  source.append(node('h2','Зафиксированный источник'),node('p',w.documentSnapshot.language.toUpperCase()+' · '+w.documentSnapshot.body.length+' UTF-16 · без нормализации','source-meta'));
  const text=authored('pre',undefined,w.documentSnapshot.language,'source-body');text.tabIndex=0;text.setAttribute('aria-label','Полный неизменный текст; выделенные фрагменты относятся к выбранному требованию');source.append(text);
  const choices=[];
  function selectRequirement(requirement){
    selected.set(w.id,requirement.code);
    const finding=findings.find(f=>f.requirementCode===requirement.code);
    for(const {button,code} of choices)button.setAttribute('aria-pressed',String(code===requirement.code));
    text.replaceChildren();let offset=0;
    for(const quote of finding?.quotes || []){text.append(document.createTextNode(w.documentSnapshot.body.slice(offset,quote.start)));const mark=node('mark',w.documentSnapshot.body.slice(quote.start,quote.end));mark.title='UTF-16 ['+quote.start+', '+quote.end+')';text.append(mark);offset=quote.end;}
    text.append(document.createTextNode(w.documentSnapshot.body.slice(offset)));
    review.replaceChildren(node('p',requirement.code,'eyebrow'),node('h2','Требование и отметка'),authored('p',requirement.textRu,'ru','requirement-text'),authored('p',requirement.textKk,'kk','requirement-text'));
    if(finding){
      review.append(node('p',names[finding.verdict],'finding-verdict verdict-'+finding.verdict),node('p','v'+finding.version+' · '+finding.owner,'eyebrow'),authored('p',finding.note,w.documentSnapshot.language));
      for(const quote of finding.quotes){review.append(node('p','['+quote.start+', '+quote.end+') · точная цитата','quote-coordinate'),authored('blockquote',quote.text,w.documentSnapshot.language,'answer'));}
      if(finding.quotes.length)review.append(action('Показать цитату в источнике',()=>{const mark=text.querySelector('mark');if(mark){mark.scrollIntoView({block:'nearest',behavior:'instant'});text.focus({preventScroll:true});}},'secondary'));
      if(!finding.quotes.length)review.append(node('p','Отсутствие — ручная отметка автора. Автоматическая проверка смысла не выполнялась.','muted'));
    }else review.append(node('p','Отметка ещё не заполнена','finding-verdict verdict-pending'),node('p','Выделите фрагмент в исходном тексте через форму отметки либо явно укажите «Не найдено».','muted'));
    if(!saved&&!w.archived&&user.name===w.owner)review.append(action(finding?'Изменить отметку '+requirement.code:'Заполнить '+requirement.code,()=>onEdit(requirement.code,finding),'primary'));
    else review.append(node('p',saved?'Отчёт сохранён. Отметки заморожены.':w.archived?'Проверка в архиве. Досье доступно для чтения.':'Изменять отметки может только автор проверки.','review-lock'));
  }
  for(const requirement of w.checklistSnapshot.requirements){const finding=findings.find(f=>f.requirementCode===requirement.code);const button=action('',()=>selectRequirement(requirement),'requirement-choice');button.append(node('strong',requirement.code),authored('span',requirement.textRu,'ru'),node('small',finding?names[finding.verdict]:'Не заполнено'));rail.append(button);choices.push({button,code:requirement.code});}
  workspace.append(rail,source,review);host.append(workspace);
  selectRequirement(w.checklistSnapshot.requirements.find(r=>r.code===selected.get(w.id))||w.checklistSnapshot.requirements[0]);
}
