// ============================================================
// GROQ — WHISPER + LLaMA
// ============================================================
const GROQ_KEY_DEFAULT='';
function getGroqKey(){return localStorage.getItem('mlrpg_groq_key')||GROQ_KEY_DEFAULT;}
function setGroqKeyPrompt(){
  const cur=localStorage.getItem('mlrpg_groq_key')||'';
  const key=prompt('Groq API ключ (gsk_...):\nПолучить бесплатно на console.groq.com'+(cur?'\n\nТекущий: '+cur.slice(0,8)+'...':''));
  if(key&&key.trim().startsWith('gsk_')){localStorage.setItem('mlrpg_groq_key',key.trim());alert('✓ Ключ сохранён!');}
  else if(key!==null){alert('Ключ должен начинаться с gsk_');}
}

// ============================================================
// LANGUAGE / i18n
// ============================================================
let _lang=localStorage.getItem('mlrpg_lang')||'ru';
function lang(){return _lang;}
function setLang(l){
  _lang=l;localStorage.setItem('mlrpg_lang',l);
  const btn=document.getElementById('lang-btn');
  if(btn)btn.textContent=l==='ru'?'EN':'RU';
  try{render();}catch(e){document.getElementById('app').innerHTML=`<div style="padding:20px;color:#f87171;font-family:monospace;font-size:13px;white-space:pre-wrap">Render error: ${e.message}\n${e.stack}</div>`;}
}
const UI={
ru:{
  back:'← Назад',questList:'К списку квестов →',toMain:'← Главная',
  done:'Готово ✓',skip:'пропустить →',reset:'Сбросить',
  step:'Шаг',of:'из',
  theory:'ТЕОРИЯ',code:'КОД',task:'ЗАДАЧА',recall:'ВСПОМНИ',
  completed:'Завершён',mastered:'✅ Освоен',review:'📚 повтор',
  steps:'шагов',boss:'⚔️ Финальный босс',practiceOnly:'Только практика, без теории',
  questDone:'Квест завершён!',reviewPlanned:'Повторение запланировано через 1 день',
  rerunCode:'↑ Раскрой любой шаг выше чтобы перезапустить код',
  currentQuest:'Текущий квест',allDone:'Все треки пройдены!',
  reviewToday:'Повторить сегодня',noReviewsToday:'Сегодня повторений нет',
  aiCheck:'🤖 AI Проверка — обязательно',
  aiPlaceholder:'Опиши что ты сделал, какой получился результат, что узнал нового...',
  aiRecord:'🎤 Запись',aiStop:'⏹ Стоп',aiTranscribing:'⏳ Транскрибирую...',
  aiVerify:'🤖 Проверить',aiChecking:'⏳ Проверяю через AI...',
  aiItemChecking:'⏳ Проверяю...',
  itemVerify:'🤖 Проверить пункт',
  showAnswer:'👁 Ответ',hideAnswer:'✕ Скрыть',
  voiceBtn:'🎤 Голос',voiceChrome:'🎤 (Chrome)',
  aiRecallCheck:'🤖 AI проверка',
  progress:'Прогресс —',
  resetConfirm:'Сбросить весь прогресс? Это нельзя отменить.',
  resetTitle:'Сброс прогресса',resetDesc:'XP, уровни, квесты, повторения — всё удалится',
  skipConfirm:'Пропустить проверку?',
  datasets:'📦 Датасеты для задания',
  reviewComplete:'Повторение завершено!',reviewGood:'Отличная работа! Память укреплена.',
  rememberBtn:'✓ Помню!',forgotBtn:'✗ Не помню',rememberXP:'+15 XP',forgotXP:'+5 XP',
  practiceHeader:'⚡ Дополнительная практика',
  recomOrder:'· рекомендуется по порядку',
  xpLabel:'XP',levelLabel:'Уровень',streakLabel:'Стрик',
  micUnavail:'Микрофон недоступен: ',noCodeAlert:'Напиши код для этого пункта',
  describeAlert:'Опиши что ты сделал — голосом или текстом',
  voiceChromeAlert:'Голосовой ввод: только Chrome/Edge',
  voiceListening:'🔴 Слушаю...',
  addSqlCell:'+ Добавить запрос',
  addPyCell:'+ Добавить ячейку',
  transcribeErr:'Транскрипция: ',
  checkingAI:'⏳ Проверяю через AI...',
  checkingAnswer:'⏳ Проверяю ответ...',
  transcribing:'⏳ Транскрибирую...',
},
en:{
  back:'← Back',questList:'To quest list →',toMain:'← Home',
  done:'Done ✓',skip:'skip →',reset:'Reset',
  step:'Step',of:'of',
  theory:'THEORY',code:'CODE',task:'TASK',recall:'RECALL',
  completed:'Completed',mastered:'✅ Mastered',review:'📚 review',
  steps:'steps',boss:'⚔️ Final boss',practiceOnly:'Practice only, no theory',
  questDone:'Quest complete!',reviewPlanned:'Review scheduled in 1 day',
  rerunCode:'↑ Expand any step above to rerun code',
  currentQuest:'Current Quest',allDone:'All tracks complete!',
  reviewToday:'Review today',noReviewsToday:'No reviews today',
  aiCheck:'🤖 AI Check — required',
  aiPlaceholder:'Describe what you did, the result you got, what you learned...',
  aiRecord:'🎤 Record',aiStop:'⏹ Stop',aiTranscribing:'⏳ Transcribing...',
  aiVerify:'🤖 Check',aiChecking:'⏳ Checking with AI...',
  aiItemChecking:'⏳ Checking...',
  itemVerify:'🤖 Check item',
  showAnswer:'👁 Answer',hideAnswer:'✕ Hide',
  voiceBtn:'🎤 Voice',voiceChrome:'🎤 (Chrome)',
  aiRecallCheck:'🤖 AI check',
  progress:'Progress —',
  resetConfirm:'Reset all progress? This cannot be undone.',
  resetTitle:'Reset Progress',resetDesc:'XP, levels, quests, reviews — everything will be deleted',
  skipConfirm:'Skip verification?',
  datasets:'📦 Datasets for this task',
  reviewComplete:'Review complete!',reviewGood:'Great work! Memory reinforced.',
  rememberBtn:'✓ Got it!',forgotBtn:'✗ Forgot',rememberXP:'+15 XP',forgotXP:'+5 XP',
  practiceHeader:'⚡ Extra Practice',
  recomOrder:'· recommended in order',
  xpLabel:'XP',levelLabel:'Level',streakLabel:'Streak',
  micUnavail:'Microphone unavailable: ',noCodeAlert:'Write code for this item first',
  describeAlert:'Describe what you did — by voice or text',
  voiceChromeAlert:'Voice input: Chrome/Edge only',
  voiceListening:'🔴 Listening...',
  addSqlCell:'+ Add query',
  addPyCell:'+ Add cell',
  transcribeErr:'Transcription error: ',
  checkingAI:'⏳ Checking with AI...',
  checkingAnswer:'⏳ Checking answer...',
  transcribing:'⏳ Transcribing...',
}};
function t(k){return UI[_lang]?.[k]||UI.ru[k]||k;}

function getQuestTitle(q){if(_lang==='en'&&QUESTS_EN[q.id]?.title)return QUESTS_EN[q.id].title;return q.title;}
function getStepTitle(q,i){if(_lang==='en'&&QUESTS_EN[q.id]?.steps?.[i]?.title)return QUESTS_EN[q.id].steps[i].title;return q.steps[i].title;}
function getStepDesc(q,i){if(_lang==='en'&&QUESTS_EN[q.id]?.steps?.[i]?.d)return QUESTS_EN[q.id].steps[i].d;return q.steps[i].description;}
function getStepCode(q,i){if(_lang==='en'&&QUESTS_EN[q.id]?.steps?.[i]?.c)return QUESTS_EN[q.id].steps[i].c;return q.steps[i].code;}
