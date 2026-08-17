// ============================================================
// TASK STEP — per-item editor + checklist
// ============================================================
function parseTaskItems(desc){
  const items=[];
  for(const line of desc.split('\n')){
    const m=line.match(/^(\d+)\.\s*(.+)/);
    if(m)items.push({num:parseInt(m[1]),text:m[2].trim()});
  }
  return items;
}

function taskItemCellHtml(questId,stepIdx,idx,isSql){
  if(isSql){
    return`<div class="sql-cells"><div class="sql-cell">
      <div class="sql-cell-bar">
        <span class="sql-cell-label">SQL ${idx+1}</span>
        <button class="btn btn-ghost btn-sm" style="color:#fcd34d;font-size:12px;padding:3px 10px" onclick="runSqlCell(this)">▶ Run</button>
      </div>
      <textarea id="tcode-${questId}-${stepIdx}-${idx}" class="code-editor" spellcheck="false" onkeydown="edTab(event)" style="min-height:60px"></textarea>
      <div class="run-output" style="display:none;margin-top:4px"></div>
    </div></div>`;
  }
  return`<div class="py-cells"><div class="py-cell">
    <div class="py-cell-bar">
      <span class="py-cell-label">In [${idx+1}]</span>
      <button class="btn btn-ghost btn-sm" style="color:#fcd34d;font-size:12px;padding:3px 10px" onclick="runPyCell(this)">▶ Run</button>
    </div>
    <textarea id="tcode-${questId}-${stepIdx}-${idx}" class="code-editor" spellcheck="false" onkeydown="edTab(event)" style="min-height:70px"></textarea>
    <div class="run-output" style="display:none;margin-top:0"></div>
  </div></div>`;
}

function renderTaskStep(step,questId,stepIdx,quest){
  const isSql=quest.trackId==='sql';
  const accent=isSql?'#10b981':'#3b82f6';
  const desc=getStepDesc(quest,stepIdx);
  const items=parseTaskItems(desc);
  const checks=State.getTaskChecks(questId,stepIdx);

  // no numbered items → fallback to old single AI block
  if(!items.length){
    return`<div style="font-size:13px;line-height:1.7;color:#94a3b8;white-space:pre-wrap;margin-bottom:10px">${desc}</div>`+taskAIBlock(questId,stepIdx);
  }

  const preamble=desc.split(/\n\d+\./)[0].trim();

  const itemsHtml=items.map((item,idx)=>{
    const done=!!(checks[idx]);
    return`<div style="margin-bottom:14px">
      <div style="font-size:12px;font-weight:600;color:#e2e8f0;margin-bottom:6px;padding:6px 10px;background:rgba(255,255,255,0.04);border-left:3px solid ${accent};border-radius:0 6px 6px 0">${item.num}. ${item.text}</div>
      ${taskItemCellHtml(questId,stepIdx,idx,isSql)}
      <button class="btn btn-ghost btn-sm" style="margin-top:6px;width:100%;color:#a78bfa;border-color:rgba(139,92,246,0.2);${done?'opacity:0.45':''}" onclick="checkTaskItem('${questId}',${stepIdx},${idx})">${t('itemVerify')} ${item.num}${done?' ✓':''}</button>
      <div id="itemout-${questId}-${stepIdx}-${idx}" class="ai-out" style="display:none"></div>
    </div>`;
  }).join('');

  const checklistHtml=`<div style="margin-top:4px;padding:10px 12px;background:rgba(0,0,0,0.2);border-radius:10px">
    <div style="font-size:10px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">${t('progress')} ${checks.filter(Boolean).length}/${items.length}</div>
    ${items.map((item,idx)=>{
      const done=!!(checks[idx]);
      return`<div id="check-${questId}-${stepIdx}-${idx}" style="display:flex;align-items:center;gap:8px;padding:3px 0">
        <span style="width:16px;height:16px;border-radius:4px;border:1px solid ${done?'#22c55e':'rgba(255,255,255,0.15)'};background:${done?'#22c55e':'transparent'};display:inline-flex;align-items:center;justify-content:center;font-size:10px;color:#fff;flex-shrink:0">${done?'✓':''}</span>
        <span style="font-size:12px;color:${done?'#6ee7b7':'#64748b'}">${item.num}. ${item.text}</span>
      </div>`;
    }).join('')}
  </div>
  ${taskDatasetBlock(quest.trackId)}`;

  return(preamble?`<div style="font-size:13px;line-height:1.7;color:#94a3b8;white-space:pre-wrap;margin-bottom:12px">${preamble}</div>`:'')
    +itemsHtml+checklistHtml;
}

async function checkTaskItem(questId,stepIdx,itemIdx){
  const quest=QUESTS.find(q=>q.id===questId);
  const step=quest?.steps[stepIdx];
  const items=parseTaskItems(getStepDesc(quest,stepIdx));
  const itemText=items[itemIdx]?.text||'';
  const ta=document.getElementById(`tcode-${questId}-${stepIdx}-${itemIdx}`);
  const code=(ta?.value||'').trim();
  if(!code){alert(t('noCodeAlert'));return;}
  const runOut=ta?.closest('.sql-cell,.py-cell')?.querySelector('.run-output');
  const result=(runOut&&runOut.textContent||'').slice(0,400);
  const out=document.getElementById(`itemout-${questId}-${stepIdx}-${itemIdx}`);
  out.style.display='block';out.className='ai-out';out.textContent=t('aiItemChecking');
  try{
    const resp=await fetch('https://api.groq.com/openai/v1/chat/completions',{
      method:'POST',
      headers:{'Authorization':'Bearer '+getGroqKey(),'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'llama-3.3-70b-versatile',max_tokens:200,temperature:0.2,
        messages:[{role:'user',content:_lang==='en'
          ?`You are a Data Science mentor. Check one specific task item.

Item: ${itemText}

Student code:
${code}
${result?'\nOutput:\n'+result:''}

Reply: 1-2 sentences. Last line only: ACCEPTED or RETRY`
          :`Ты ментор по Data Science. Проверь один конкретный пункт задания.

Пункт: ${itemText}

Код студента:
${code}
${result?'\nРезультат:\n'+result:''}

Ответ: 1-2 предложения. Последняя строка — только: ПРИНЯТО или ПОВТОРИТЬ`}]
      })
    });
    const data=await resp.json();
    const txt=data.choices?.[0]?.message?.content||'Нет ответа';
    out.textContent=txt;
    const ok=txt.toUpperCase().includes('ПРИНЯТО')||txt.toUpperCase().includes('ACCEPTED');
    out.className='ai-out '+(ok?'approved':'rejected');
    if(ok){
      State.setTaskCheck(questId,stepIdx,itemIdx);
      // update checkbox
      const row=document.getElementById(`check-${questId}-${stepIdx}-${itemIdx}`);
      if(row){
        const box=row.querySelector('span:first-child');
        const lbl=row.querySelector('span:last-child');
        if(box){box.style.background='#22c55e';box.style.borderColor='#22c55e';box.textContent='✓';}
        if(lbl)lbl.style.color='#6ee7b7';
      }
      // update progress label
      const prog=document.querySelector(`#check-${questId}-${stepIdx}-0`)?.closest('div[style*="padding:10px"]')?.querySelector('div:first-child');
      if(prog){const c=State.getTaskChecks(questId,stepIdx).filter(Boolean).length;prog.textContent=`Прогресс — ${c}/${items.length}`;}
      // check btn style
      const btn=out.previousElementSibling;
      if(btn&&btn.tagName==='BUTTON'){btn.style.opacity='0.45';btn.textContent=btn.textContent.replace(' ✓','')+' ✓';}
      // enable Done if all checked
      if(State.allTaskChecked(questId,stepIdx,items.length)){
        const doneBtn=document.getElementById(`done-${questId}-${stepIdx}`);
        if(doneBtn){
          doneBtn.removeAttribute('disabled');
          doneBtn.style.opacity='1';doneBtn.style.cursor='pointer';
          doneBtn.onclick=()=>doStep(questId,stepIdx,step.xp);
        }
      }
    }
  }catch(e){out.textContent='✗ '+e.message;out.className='ai-out rejected';}
}

function taskDatasetBlock(trackId){
  const dsets=DATASETS[trackId]||[];
  if(!dsets.length)return'';
  return`<details style="margin-bottom:10px">
    <summary style="cursor:pointer;font-size:11px;font-weight:700;color:#60a5fa;text-transform:uppercase;letter-spacing:1px;list-style:none;display:flex;align-items:center;gap:6px;user-select:none">
      <span>▶</span>📦 Датасеты для задания
    </summary>
    <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px">
      ${dsets.map(d=>`<a href="${d.url}" target="_blank" rel="noopener" style="display:block;padding:8px 10px;background:rgba(59,130,246,0.07);border:1px solid rgba(59,130,246,0.18);border-radius:8px;text-decoration:none">
        <div style="color:#93c5fd;font-size:12px;font-weight:600">${d.name} ↗</div>
        <div style="color:#475569;font-size:11px;margin-top:2px">${d.desc}</div>
      </a>`).join('')}
    </div>
  </details>`;
}

function taskAIBlock(questId,stepIdx){
  const quest=QUESTS.find(q=>q.id===questId);
  const trackId=quest?.trackId||'';
  return`<div style="margin-top:12px;border-top:1px solid rgba(255,255,255,0.07);padding-top:12px">
    ${taskDatasetBlock(trackId)}
    <div style="font-size:11px;font-weight:700;color:#a78bfa;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">${t('aiCheck')}</div>
    <textarea id="ata-${questId}-${stepIdx}" class="recall-voice-ta" placeholder="${t('aiPlaceholder')}"></textarea>
    <div style="display:flex;gap:7px;margin-top:6px">
      <button id="rbtn-${questId}-${stepIdx}" class="btn btn-ghost btn-sm" style="color:#a78bfa;border-color:rgba(139,92,246,0.25)" onclick="toggleRecording('${questId}',${stepIdx})">${t('aiRecord')}</button>
      <button class="btn btn-ghost btn-sm btn-full" style="color:#60a5fa;border-color:rgba(59,130,246,0.25)" onclick="evaluateTask('${questId}',${stepIdx})">${t('aiVerify')}</button>
    </div>
    <div id="aeval-${questId}-${stepIdx}" class="ai-out" style="display:none"></div>
  </div>`;
}

function toggleRecallAns(btn){
  const ans=btn.closest('.recall-q').querySelector('.recall-ans');
  const vis=ans.style.display==='block';
  ans.style.display=vis?'none':'block';
  btn.textContent=vis?t('showAnswer'):t('hideAnswer');
}

function startVoice(questId,stepIdx){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){alert(t('voiceChromeAlert'));return;}
  const btn=document.getElementById(`vbtn-${questId}-${stepIdx}`);
  const ta=document.getElementById(`vta-${questId}-${stepIdx}`);
  const rec=new SR();
  rec.lang=_lang==='en'?'en-US':'ru-RU';rec.continuous=false;rec.interimResults=false;
  if(btn)btn.textContent=t('voiceListening');
  rec.onresult=e=>{
    const transcript=e.results[0][0].transcript;
    if(ta)ta.value=(ta.value?ta.value+'\n':'')+transcript;
    if(btn)btn.textContent=t('voiceBtn');
  };
  rec.onerror=()=>{if(btn)btn.textContent=t('voiceBtn');};
  rec.start();
}

async function checkWithAI(questId,stepIdx){
  let key=localStorage.getItem('mlrpg_api_key');
  if(!key){
    key=prompt('Claude API ключ (хранится в localStorage, не отправляется никуда кроме api.anthropic.com):');
    if(!key)return;
    localStorage.setItem('mlrpg_api_key',key.trim());
  }
  const ta=document.getElementById(`vta-${questId}-${stepIdx}`);
  const answer=(ta?.value||'').trim();
  if(!answer){alert('Сначала введи ответ голосом или текстом');return;}
  const quest=QUESTS.find(q=>q.id===questId);
  const step=quest?.steps[stepIdx];
  const out=document.getElementById(`aiout-${questId}-${stepIdx}`);
  if(!out)return;
  out.style.display='block';out.textContent=t('checkingAnswer');
  try{
    const resp=await fetch('https://api.anthropic.com/v1/messages',{
      method:'POST',
      headers:{'x-api-key':key,'anthropic-version':'2023-06-01','content-type':'application/json','anthropic-dangerous-direct-browser-access':'true'},
      body:JSON.stringify({
        model:'claude-haiku-4-5-20251001',max_tokens:350,
        messages:[{role:'user',content:`Ты оцениваешь ответ студента по Data Science/ML.\n\nВопросы:\n${step.description}\n\nОтвет студента:\n${answer}\n\nОцени кратко: что верно ✓, что пропущено или неточно ✗. Итог одной строкой: Отлично / Хорошо / Нужно повторить. До 120 слов.`}]
      })
    });
    const data=await resp.json();
    out.textContent=data.content?.[0]?.text||JSON.stringify(data);
  }catch(e){out.textContent='✗ '+e.message;}
}

function renderRecallStep(step,questId,stepIdx,qId){
  const answers=RECALL_ANSWERS[qId]||[];
  const quest=QUESTS.find(q=>q.id===qId);
  const desc=quest?getStepDesc(quest,stepIdx):step.description;
  const lines=desc.split('\n');
  const intro=escHtml(lines[0]);
  const questions=lines.filter(l=>/^\d+\./.test(l.trim()));
  const hasSpeech=!!(window.SpeechRecognition||window.webkitSpeechRecognition);
  return`
    <div style="font-size:12px;color:#94a3b8;margin-bottom:10px">${intro}</div>
    ${questions.map((q,qi)=>`
    <div class="recall-q">
      <div class="recall-q-row">
        <span class="recall-q-num">${qi+1}.</span>
        <span class="recall-q-text">${escHtml(q.replace(/^\d+\.\s*/,''))}</span>
        <button class="recall-toggle" onclick="toggleRecallAns(this)">${t('showAnswer')}</button>
      </div>
      <div class="recall-ans">${answers[qi]?escHtml(answers[qi]):`<span style="color:#475569">${_lang==='en'?'coming soon':'скоро добавим'}</span>`}</div>
    </div>`).join('')}
    <div style="display:flex;gap:8px;margin-top:10px">
      <button id="vbtn-${questId}-${stepIdx}" class="btn btn-ghost btn-sm" style="color:#a78bfa;border-color:rgba(139,92,246,0.25)" onclick="startVoice('${questId}',${stepIdx})">${hasSpeech?t('voiceBtn'):t('voiceChrome')}</button>
      <button class="btn btn-ghost btn-sm" style="color:#60a5fa;border-color:rgba(59,130,246,0.25)" onclick="checkWithAI('${questId}',${stepIdx})">${t('aiRecallCheck')}</button>
    </div>
    <textarea id="vta-${questId}-${stepIdx}" class="recall-voice-ta" placeholder="${t('aiPlaceholder')}"></textarea>
    <div id="aiout-${questId}-${stepIdx}" class="ai-out"></div>`;
}

function _sqlCellHtml(n){
  return`<div class="sql-cell">
    <div class="sql-cell-bar">
      <span class="sql-cell-label">SQL ${n}</span>
      <button class="btn btn-ghost btn-sm" style="color:#fcd34d;font-size:12px;padding:3px 10px" onclick="runSqlCell(this)">▶ Run</button>
      <button class="btn btn-ghost btn-sm" style="color:#475569;font-size:11px;padding:3px 7px" onclick="delSqlCell(this)">✕</button>
    </div>
    <textarea class="code-editor" spellcheck="false" onkeydown="edTab(event)" style="min-height:72px"></textarea>
    <div class="run-output" style="display:none;margin-top:0"></div>
  </div>`;
}

function addSqlCell(containerId){
  const c=document.getElementById(containerId);
  if(!c)return;
  const n=c.querySelectorAll('.sql-cell').length+1;
  c.insertAdjacentHTML('beforeend',_sqlCellHtml(n));
  c.lastElementChild.querySelector('textarea').focus();
}

function delSqlCell(btn){
  const cell=btn.closest('.sql-cell');
  const container=cell.parentElement;
  if(container.querySelectorAll('.sql-cell').length>1){
    cell.remove();
    container.querySelectorAll('.sql-cell-label').forEach((el,i)=>el.textContent='SQL '+(i+1));
  }
}

async function runSqlCell(btn){
  const cell=btn.closest('.sql-cell');
  const ta=cell.querySelector('textarea');
  const out=cell.querySelector('.run-output');
  if(!ta||!out)return;
  out.style.display='block';
  out.className='run-output loading';
  out.innerHTML='⏳ Запускаю...';
  try{
    const db=await ensureSQL();
    const results=db.exec(ta.value.trim());
    if(!results.length){out.className='run-output ok';out.textContent='✓ Выполнено (нет строк)';return;}
    const{columns,values}=results[0];
    out.className='run-output';out.style.padding='0';
    out.innerHTML=`<div style="overflow:auto;padding:8px 10px"><table class="sql-table"><thead><tr>${columns.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${values.slice(0,200).map(r=>`<tr>${r.map(v=>`<td>${v??'NULL'}</td>`).join('')}</tr>`).join('')}</tbody></table>${values.length>200?`<div style="color:#64748b;font-size:10px;margin-top:4px">${values.length} строк, показано 200</div>`:''}</div>`;
  }catch(e){
    out.className='run-output err';
    out.textContent='✗ '+String(e.message||e).split('\n').slice(0,6).join('\n');
  }
}

async function runCode(questId,stepIdx,trackId){
  const ta=document.getElementById('ed-'+questId+'-'+stepIdx);
  const out=document.getElementById('out-'+questId+'-'+stepIdx);
  if(!ta||!out)return;
  out.style.display='block';
  out.className='run-output loading';
  out.innerHTML='⏳ Запускаю...';
  const code=ta.value;
  try{
    if(trackId==='sql'){
      out.textContent='⏳ Загружаю SQL движок...';
      const db=await ensureSQL();
      const results=db.exec(code);
      if(!results.length){out.className='run-output ok';out.textContent='✓ Выполнено (0 строк)';return;}
      const {columns,values}=results[0];
      const rows=values.slice(0,200);
      out.className='run-output';
      out.style.padding='0';
      out.innerHTML=`<div style="overflow:auto;padding:8px"><table class="sql-table"><thead><tr>${columns.map(c=>`<th>${c}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(v=>`<td>${v??'NULL'}</td>`).join('')}</tr>`).join('')}</tbody></table>${values.length>200?`<div style="color:#64748b;font-size:10px;margin-top:4px">Показано 200 из ${values.length} строк</div>`:''}</div>`;
    }else{
      out.textContent='⏳ Загружаю Python (первый раз ~15с, потом мгновенно)...';
      const py=await ensurePyodide();
      let stdout='';
      py.setStdout({batched:s=>{stdout+=s+'\n';}});
      py.setStderr({batched:s=>{stdout+='⚠ '+s+'\n';}});
      await py.runPythonAsync(code);
      out.className='run-output ok';
      out.textContent=stdout||'✓ Выполнено (нет вывода)';
    }
  }catch(e){
    out.className='run-output err';
    out.textContent='✗ '+String(e.message||e).split('\n').slice(0,8).join('\n');
  }
}
