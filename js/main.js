State.load();
State.updateStreak();
(()=>{
  const btn=document.getElementById('lang-btn');
  if(btn){
    btn.textContent=_lang==='ru'?'EN':'RU';
    btn.addEventListener('click',()=>setLang(_lang==='ru'?'en':'ru'));
  }
})();
try{render();}catch(e){document.getElementById('app').innerHTML=`<div style="padding:20px;color:#f87171;font-family:monospace;font-size:13px;white-space:pre-wrap">Render error: ${e.message}\n${e.stack}</div>`;}
