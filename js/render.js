// ============================================================
// NAVIGATION
// ============================================================
let screen='main',activeTrack=null,activeQuest=null,reviewQueue=[],reviewIdx=0;

function nav(s,opts={}){
  window.scrollTo(0,0);
  screen=s;
  if(opts.trackId!==undefined)activeTrack=opts.trackId;
  if(opts.questId!==undefined)activeQuest=opts.questId;
  if(s==='review'){reviewQueue=State.reviewDue();reviewIdx=0;}
  render();
}

function render(){
  const app=document.getElementById('app');
  if(screen==='main')app.innerHTML=renderMain();
  else if(screen==='track')app.innerHTML=renderTrack(activeTrack);
  else if(screen==='quest')app.innerHTML=renderQuest(activeQuest);
  else if(screen==='review')app.innerHTML=renderReview();
  if(screen==='track'&&_monsterHit){const xp=_monsterHit;_monsterHit=0;setTimeout(()=>triggerAttack(xp),80);}
}

// ============================================================
// RENDER: MAIN
// ============================================================
function renderMain(){
  const{progress,total}=State.xpForLevel();
  const pct=Math.min(100,Math.round(progress/total*100));
  const mult=State.streakMultiplier();
  const multTxt=mult>1?` <span style="color:#fbbf24">×${mult.toFixed(1)}</span>`:'';
  const due=State.reviewDue();

  const trackColors={python:'#3b82f6',sql:'#10b981',ds:'#f59e0b',ml:'#8b5cf6',cv:'#ef4444'};

  return`
<div style="padding-top:8px">
  <div style="display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:12px">
    <div style="font-size:13px;color:#475569;letter-spacing:2px;text-transform:uppercase">🥷 Data RPG</div>
    <button onclick="setGroqKeyPrompt()" style="background:${getGroqKey()?'rgba(16,185,129,0.15)':'rgba(239,68,68,0.15)'};border:1px solid ${getGroqKey()?'rgba(16,185,129,0.3)':'rgba(239,68,68,0.3)'};border-radius:8px;color:${getGroqKey()?'#6ee7b7':'#fca5a5'};font-size:11px;padding:3px 8px;cursor:pointer" title="Groq API ключ">🔑 ${getGroqKey()?'Groq ✓':'Groq ?'}</button>
  </div>

  <!-- Hero card -->
  <div class="card card-purple" style="margin-bottom:16px">
    <div style="display:flex;align-items:center;gap:12px;margin-bottom:10px">
      <div style="font-size:44px;line-height:1">🥷</div>
      <div style="flex:1">
        <div style="font-size:18px;font-weight:700;color:#fff;margin-bottom:4px">${getLevelTitle(State.level)}</div>
        <div style="display:flex;gap:6px;flex-wrap:wrap">
          <span class="badge badge-purple">${t('levelLabel')} ${State.level}</span>
          <span class="badge badge-amber">🔥 ${State.streak} ${_lang==='en'?'days':'дней'}${multTxt}</span>
          ${due.length>0?`<span class="badge badge-red" style="cursor:pointer" onclick="nav('review')">📚 ${due.length} на повтор</span>`:''}
        </div>
      </div>
    </div>
    <div class="xp-bar-wrap"><div class="xp-bar-fill" style="width:${pct}%"></div></div>
    <div style="display:flex;justify-content:space-between;margin-top:4px">
      <span style="font-size:11px;color:#64748b">${progress} / ${total} XP ${_lang==='en'?'to next level':'до след. уровня'}</span>
      <span style="font-size:11px;color:#a5b4fc">${_lang==='en'?'Total':'Всего'}: ${State.xp} XP</span>
    </div>
  </div>

  ${due.length>0?`
  <!-- Review section -->
  <div style="margin-bottom:8px;font-size:11px;font-weight:700;color:#ef4444;text-transform:uppercase;letter-spacing:1px">🔁 ${t('reviewToday')}</div>
  <div class="card" style="margin-bottom:16px;border-color:rgba(239,68,68,0.3);cursor:pointer" onclick="nav('review')">
    <div style="display:flex;align-items:center;gap:10px">
      <div style="font-size:28px">📚</div>
      <div style="flex:1">
        <div style="font-weight:600;color:#fff;margin-bottom:2px">${due.length} ${_lang==='en'?'topics to review':'тем ждут повторения'}</div>
        <div style="font-size:12px;color:#94a3b8">${due.map(q=>getQuestTitle(q)).slice(0,3).join(', ')}${due.length>3?'...':''}</div>
      </div>
      <button class="btn btn-red btn-sm">${_lang==='en'?'Start →':'Начать →'}</button>
    </div>
  </div>`:''}

  <!-- Tracks -->
  <div style="margin-bottom:8px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px">${_lang==='en'?'TRACKS':'ТРЕКИ'}</div>
  <div class="track-grid">
    ${TRACKS.map(tr=>{
      const unlocked=State.isTrackUnlocked(tr.id);
      const{done,total:tot,pct:p}=State.trackProgress(tr.id);
      const onclick=unlocked?`onclick="nav('track',{trackId:'${tr.id}'})"`:''
      return`<div class="track-card${unlocked?'':' locked'}" style="background:${unlocked?tr.color+'18':'rgba(255,255,255,0.03)'};border-color:${unlocked?tr.color+'40':'transparent'}" ${onclick}>
        <div class="track-emoji">${tr.emoji}</div>
        <div class="track-name" style="color:${unlocked?'#fff':'#475569'}">${tr.name}</div>
        <div class="track-sub">${_lang==='en'?tr.subtitleEn:tr.subtitle}</div>
        ${unlocked?`<div class="progress-bar"><div class="progress-fill" style="width:${p}%;background:${tr.color}"></div></div>
        <div class="track-prog" style="margin-top:4px;color:${tr.color}">${done}/${tot} ${t('steps')}</div>`:`<div class="track-prog">🔒 ${_lang==='en'?'Complete previous tracks':'Нужно завершить треки'}</div>`}
      </div>`;
    }).join('')}
  </div>

  <!-- Current quest -->
  ${(()=>{
    for(const tr of TRACKS){
      if(!State.isTrackUnlocked(tr.id))continue;
      const qs=QUESTS.filter(q=>q.trackId===tr.id);
      const active=qs.find(q=>!State.getQP(q.id).completed);
      if(active){
        const qp=State.getQP(active.id);
        const stepDots=active.steps.map((_,i)=>`<div style="width:20px;height:20px;border-radius:50%;background:${qp.steps[i]?'#22c55e':'rgba(255,255,255,0.12)'};display:flex;align-items:center;justify-content:center;font-size:10px;color:${qp.steps[i]?'#fff':'#475569'}">${qp.steps[i]?'✓':(i+1)}</div>`).join('');
        return`<div style="margin-bottom:8px;font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:1px">${t('currentQuest')}</div>
        <div class="card" style="cursor:pointer;border-color:${TRACKS.find(x=>x.id===active.trackId).color+'40'}" onclick="nav('quest',{questId:'${active.id}'})">
          <div style="display:flex;align-items:center;gap:10px">
            <div style="font-size:28px">${active.emoji}</div>
            <div style="flex:1">
              <div style="font-weight:600;color:#fff;margin-bottom:6px">${getQuestTitle(active)}</div>
              <div style="display:flex;gap:5px">${stepDots}</div>
            </div>
            <div style="color:#64748b;font-size:18px">›</div>
          </div>
        </div>`;
      }
    }
    return`<div class="card" style="text-align:center;padding:24px"><div style="font-size:32px">🏆</div><div style="color:#94a3b8;margin-top:8px">${t('allDone')}</div></div>`;
  })()}

  <div style="margin-top:24px;padding:14px;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);border-radius:12px;display:flex;align-items:center;gap:12px">
    <div style="flex:1">
      <div style="font-size:12px;font-weight:600;color:#fca5a5">${t('resetTitle')}</div>
      <div style="font-size:11px;color:#64748b;margin-top:2px">${t('resetDesc')}</div>
    </div>
    <button class="btn btn-red btn-sm" onclick="if(confirm(t('resetConfirm'))){localStorage.clear();location.reload()}">${t('reset')}</button>
  </div>
</div>`;
}

// ============================================================
// RENDER: TRACK
// ============================================================
function renderTrack(trackId){
  const track=TRACKS.find(t=>t.id===trackId);
  const qs=QUESTS.filter(q=>q.trackId===trackId);
  const{done,total}=State.trackProgress(trackId);
  const pct=Math.round(done/total*100);

  const firstIncomplete=qs.findIndex(q=>!State.getQP(q.id).completed);

  const statusIcon=(q,idx)=>{
    const qp=State.getQP(q.id);
    if(qp.completed)return{icon:'✓',bg:'rgba(34,197,94,0.2)',color:'#22c55e'};
    if(q.practice)return{icon:'⚡',bg:'rgba(245,158,11,0.08)',color:'#f59e0b'};
    if(idx===firstIncomplete)return{icon:'▶',bg:`${track.color}33`,color:track.color};
    if(firstIncomplete!==-1&&idx>firstIncomplete)return{icon:'🔒',bg:'rgba(255,255,255,0.04)',color:'#475569'};
    return{icon:'○',bg:'rgba(255,255,255,0.07)',color:'#94a3b8'};
  };

  return`
<div>
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
    <button class="btn btn-ghost btn-sm" onclick="nav('main')">${t('back')}</button>
    <div>
      <div style="font-size:18px;font-weight:700;color:#fff">${track.emoji} ${track.name}</div>
      <div style="font-size:12px;color:#64748b">${done}/${total} ${t('steps')} · ${pct}%</div>
    </div>
  </div>

  <div class="xp-bar-wrap" style="margin-bottom:16px">
    <div class="progress-fill" style="height:100%;width:${pct}%;border-radius:8px;background:${track.color}"></div>
  </div>

  ${renderMonsterPanel(trackId)}

  <div>
    ${qs.map((q,idx)=>{
      const{icon,bg,color}=statusIcon(q,idx);
      const qp=State.getQP(q.id);
      const locked=!q.practice&&firstIncomplete!==-1&&idx>firstIncomplete&&!qp.completed;
      const stepsDone=qp.steps.filter(Boolean).length;
      const totalXP=q.steps.reduce((s,st)=>s+st.xp,0);
      const prevQ=idx>0?qs[idx-1]:null;
      const practiceHeader=q.practice&&(!prevQ||!prevQ.practice)
        ?`<div style="font-size:10px;font-weight:700;color:#f59e0b;text-transform:uppercase;letter-spacing:1.5px;margin:20px 0 8px;padding:0 2px">${t('practiceHeader')}</div>`:'';
      return practiceHeader+`<div class="quest-item${q.isBoss?' card-red':''}" style="${q.isBoss?'border-color:rgba(239,68,68,0.3);':q.practice?'border-color:rgba(245,158,11,0.15);':''}margin-bottom:6px;cursor:pointer" onclick="nav('quest',{questId:'${q.id}'})">
        <div style="width:34px;height:34px;border-radius:50%;background:${bg};display:flex;align-items:center;justify-content:center;font-size:14px;color:${color};flex-shrink:0">${icon}</div>
        <div style="flex:1">
          <div style="font-weight:600;font-size:14px;color:#e2e8f0">${q.emoji} ${getQuestTitle(q)}${locked?` <span style="font-size:10px;color:#475569">${t('recomOrder')}</span>`:''}</div>
          <div style="font-size:11px;color:#64748b;margin-top:2px">
            ${qp.completed?t('completed')+(qp.mastered?' · '+t('mastered'):qp.reviewDueDate?` · ${t('review')} ${qp.reviewDueDate}`:'')
             :stepsDone>0?`${stepsDone}/${q.steps.length} ${t('steps')}`
             :q.isBoss?t('boss'):q.practice?t('practiceOnly'):`${q.steps.length} ${t('steps')}`}
          </div>
        </div>
        <div style="font-size:13px;font-weight:700;color:${qp.completed?'#22c55e':'#64748b'}">${totalXP} XP</div>
      </div>`;
    }).join('')}
  </div>
</div>`;
}

// ============================================================
// RENDER: QUEST WIZARD
// ============================================================
function renderQuest(questId){
  const quest=QUESTS.find(q=>q.id===questId);
  const qp=State.getQP(questId);
  const track=TRACKS.find(t=>t.id===quest.trackId);
  const stepLabels=['📖','💻','🎯','🧠'];
  const activeIdx=qp.steps.findIndex(s=>!s);
  const allDone=activeIdx===-1;

  return`
<div>
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
    <button class="btn btn-ghost btn-sm" onclick="nav('track',{trackId:'${quest.trackId}'})">← ${t('back').replace('← ','')}</button>
    <div style="flex:1">
      <div style="font-size:16px;font-weight:700;color:#fff">${quest.emoji} ${getQuestTitle(quest)}</div>
      ${quest.isBoss?'<span class="badge badge-red">⚔️ BOSS</span>':quest.practice?`<span class="badge badge-amber">⚡ ${_lang==='en'?'PRACTICE':'ПРАКТИКА'}</span>`:''}
    </div>
  </div>

  <!-- Step indicator -->
  <div style="display:flex;align-items:center;margin-bottom:20px;padding:0 4px">
    ${quest.steps.map((s,i)=>{
      const done=qp.steps[i];
      const active=i===activeIdx&&!allDone;
      const cls=done?'done':active?'active':'pending';
      const colors={done:'#22c55e',active:track.color,pending:'rgba(255,255,255,0.1)'};
      const tc={done:'#fff',active:'#fff',pending:'rgba(255,255,255,0.3)'};
      return(i>0?`<div style="flex:1;height:2px;background:${qp.steps[i-1]?'#22c55e':'rgba(255,255,255,0.1)'}"></div>`:'')
        +`<div style="width:34px;height:34px;border-radius:50%;background:${colors[cls]};display:flex;align-items:center;justify-content:center;font-size:14px;color:${tc[cls]};flex-shrink:0${active?`;box-shadow:0 0 0 3px ${track.color}40`:''}">${done?'✓':stepLabels[i]}</div>`;
    }).join('')}
  </div>

  ${quest.steps.map((step,i)=>{
    const isDone=qp.steps[i];
    const isActive=i===activeIdx&&!allDone;
    const isFuture=!isDone&&!isActive;
    const runnable=step.type==='code'||step.type==='task';
    const isSql=quest.trackId==='sql';
    const cellsId=`sqlcells-${questId}-${i}`;
    const editorBlock=runnable?(isSql?`
      <div id="${cellsId}" class="sql-cells">
        <div class="sql-cell">
          <div class="sql-cell-bar">
            <span class="sql-cell-label">SQL 1</span>
            <button class="btn btn-ghost btn-sm" style="color:#fcd34d;font-size:12px;padding:3px 10px" onclick="runSqlCell(this)">▶ Run</button>
            <button class="btn btn-ghost btn-sm" style="color:#475569;font-size:11px;padding:3px 7px" onclick="delSqlCell(this)">✕</button>
          </div>
          <textarea class="code-editor" spellcheck="false" onkeydown="edTab(event)" style="min-height:72px">${getStepCode(quest,i)?escHtml(getStepCode(quest,i)):''}</textarea>
          <div class="run-output" style="display:none;margin-top:4px"></div>
        </div>
      </div>
      <button class="btn btn-ghost btn-sm btn-full" style="color:#10b981;border-color:rgba(16,185,129,0.25);margin-top:6px" onclick="addSqlCell('${cellsId}')">${t('addSqlCell')}</button>`
:`
      <div id="pycells-${questId}-${i}" class="py-cells">
        <div class="py-cell">
          <div class="py-cell-bar">
            <span class="py-cell-label">In [1]</span>
            <button class="btn btn-ghost btn-sm" style="color:#fcd34d;font-size:12px;padding:3px 10px" onclick="runPyCell(this)">▶ Run</button>
            <button class="btn btn-ghost btn-sm" style="color:#475569;font-size:11px;padding:3px 7px" onclick="delPyCell(this)">✕</button>
          </div>
          <textarea class="code-editor" spellcheck="false" onkeydown="edTab(event)" style="min-height:80px">${getStepCode(quest,i)?escHtml(getStepCode(quest,i)):''}</textarea>
          <div class="run-output" style="display:none;margin-top:0"></div>
        </div>
      </div>
      <button class="btn btn-ghost btn-sm btn-full" style="color:#3b82f6;border-color:rgba(59,130,246,0.25);margin-top:6px" onclick="addPyCell('pycells-${questId}-${i}')">${t('addPyCell')}</button>`)
    :(()=>{const _c=getStepCode(quest,i);return _c?`<div style="background:rgba(0,0,0,0.45);border:1px solid rgba(255,255,255,0.08);border-radius:10px;padding:12px;font-family:'SF Mono','Fira Code',monospace;font-size:12px;line-height:1.6;color:#86efac;white-space:pre;overflow-x:auto;margin-bottom:8px">${escHtml(_c)}</div>`:'';})();

    if(isFuture){
      return`<div style="display:flex;align-items:center;gap:10px;padding:8px 12px;background:rgba(255,255,255,0.03);border-radius:10px;opacity:0.35;margin-bottom:6px">
        <span style="font-size:16px">${stepLabels[i]}</span>
        <span style="font-size:13px;color:#64748b;flex:1">${step.title}</span>
        <span style="font-size:11px;color:#475569">🔒 +${step.xp} XP</span>
      </div>`;
    }
    if(isDone){
      return`<details style="margin-bottom:8px;border-radius:12px;border:1px solid rgba(34,197,94,0.25);background:rgba(34,197,94,0.04);overflow:hidden">
        <summary style="padding:10px 14px;cursor:pointer;display:flex;align-items:center;gap:8px;list-style:none;-webkit-appearance:none;user-select:none">
          <span style="color:#22c55e;font-size:16px">✓</span>
          <span style="flex:1;font-size:13px;font-weight:600;color:#6ee7b7">${getStepTitle(quest,i)}</span>
          <span style="font-size:11px;color:#64748b">+${step.xp} XP · ${_lang==='en'?'expand to rerun':'нажми чтобы запустить снова'}</span>
        </summary>
        <div style="padding:0 14px 14px;border-top:1px solid rgba(34,197,94,0.15)">
          <div style="font-size:12px;line-height:1.6;color:#64748b;white-space:pre-wrap;margin:10px 0 8px">${getStepDesc(quest,i)}</div>
          ${editorBlock}
        </div>
      </details>`;
    }
    // isActive
    return`<div class="card" style="margin-bottom:10px;border-color:${track.color}40">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
        <span style="font-size:20px">${stepLabels[i]}</span>
        <div style="flex:1">
          <div style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px">${t('step')} ${i+1} ${t('of')} ${quest.steps.length}</div>
          <div style="font-size:15px;font-weight:700;color:#fff">${getStepTitle(quest,i)}</div>
        </div>
        <span class="badge badge-purple">+${step.xp} XP</span>
      </div>
      ${step.type==='recall'
        ?renderRecallStep(step,questId,i,quest.id)
        :step.type==='task'
          ?renderTaskStep(step,questId,i,quest)
          :`<div style="font-size:13px;line-height:1.7;color:#94a3b8;white-space:pre-wrap;margin-bottom:10px">${getStepDesc(quest,i)}</div>${editorBlock}`}
      <div style="margin-top:10px">
        ${(()=>{
          if(step.type!=='task')return`<button class="btn btn-primary btn-full" onclick="doStep('${questId}',${i},${step.xp})">${t('done')} +${step.xp} XP</button>`;
          const _items=parseTaskItems(getStepDesc(quest,i));
          const _done=_items.length?State.allTaskChecked(questId,i,_items.length):State.isApproved(questId,i);
          if(_done)return`<button class="btn btn-primary btn-full" onclick="doStep('${questId}',${i},${step.xp})">${t('done')} +${step.xp} XP</button>`;
          return`<button id="done-${questId}-${i}" class="btn btn-primary btn-full" style="opacity:0.35;cursor:not-allowed" disabled>${t('done')} +${step.xp} XP</button>
            <div style="text-align:center;margin-top:6px"><a href="#" style="font-size:11px;color:#475569" onclick="event.preventDefault();if(confirm(t('skipConfirm'))){doStep('${questId}',${i},${step.xp})}">${t('skip')}</a></div>`;
        })()}
      </div>
    </div>
    `;
  }).join('')}
  ${allDone?`
  <div class="card card-purple" style="text-align:center;padding:28px;margin-top:8px">
    <div style="font-size:44px;margin-bottom:10px">🏆</div>
    <div style="font-size:18px;font-weight:700;color:#fff;margin-bottom:6px">${t('questDone')}</div>
    <div style="color:#a5b4fc;margin-bottom:6px;font-size:13px">${t('reviewPlanned')}</div>
    <div style="font-size:12px;color:#64748b;margin-bottom:16px">${t('rerunCode')}</div>
    <button class="btn btn-primary btn-full" onclick="nav('track',{trackId:'${quest.trackId}'})">${t('questList')}</button>
  </div>`:''}
</div>`;
}

// ============================================================
// RENDER: REVIEW
// ============================================================
function renderReview(){
  if(reviewQueue.length===0||reviewIdx>=reviewQueue.length){
    return`<div style="padding-top:20px">
      <button class="btn btn-ghost btn-sm" style="margin-bottom:20px" onclick="nav('main')">${t('toMain')}</button>
      <div class="card" style="text-align:center;padding:40px">
        <div style="font-size:48px;margin-bottom:12px">🎉</div>
        <div style="font-size:20px;font-weight:700;color:#fff;margin-bottom:8px">${t('reviewComplete')}</div>
        <div style="color:#94a3b8;margin-bottom:20px">${t('reviewGood')}</div>
        <button class="btn btn-primary" onclick="nav('main')">${t('toMain')}</button>
      </div>
    </div>`;
  }
  const quest=reviewQueue[reviewIdx];
  const recallStep=quest.steps[3];
  const qp=State.getQP(quest.id);

  return`
<div style="padding-top:8px">
  <div style="display:flex;align-items:center;gap:10px;margin-bottom:16px">
    <button class="btn btn-ghost btn-sm" onclick="nav('main')">✕</button>
    <div style="flex:1;text-align:center;font-size:13px;color:#94a3b8">${reviewIdx+1} / ${reviewQueue.length}</div>
  </div>

  <div style="text-align:center;margin-bottom:20px">
    <span class="badge badge-purple" style="font-size:13px;padding:6px 14px">🔁 ${t('review')}</span>
    <div style="font-size:14px;color:#64748b;margin-top:8px">${qp.reviewInterval}d · ${qp.reviewCount}/6</div>
  </div>

  <div class="card" style="margin-bottom:16px;border-color:rgba(139,92,246,0.3)">
    <div style="display:flex;align-items:center;gap:8px;margin-bottom:12px">
      <span style="font-size:20px">${quest.emoji}</span>
      <div>
        <div style="font-size:11px;color:#64748b;text-transform:uppercase;letter-spacing:1px">🧠 ${t('recall')}</div>
        <div style="font-size:16px;font-weight:700;color:#fff">${getQuestTitle(quest)}</div>
      </div>
    </div>
    <div style="font-size:13px;line-height:1.7;color:#94a3b8;white-space:pre-wrap;margin-bottom:20px">${recallStep.description}</div>

    <div style="display:flex;gap:10px">
      <button class="btn btn-red btn-full" onclick="doReview('${quest.id}',false)">${t('forgotBtn')} <small style="opacity:0.7">${t('forgotXP')}</small></button>
      <button class="btn btn-green btn-full" onclick="doReview('${quest.id}',true)">${t('rememberBtn')} <small style="opacity:0.7">${t('rememberXP')}</small></button>
    </div>
  </div>
</div>`;
}

// ============================================================
// ACTIONS
// ============================================================
function escHtml(s){return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');}

function doStep(questId,stepIdx,xpAmount){
  const{gained,leveledUp}=State.completeStep(questId,stepIdx,xpAmount);
  showXP('+'+gained+' XP');
  const qp=State.getQP(questId);
  if(qp.completed){_monsterHit=gained;setTimeout(()=>{confetti();render();},500);}
  else setTimeout(render,500);
  if(leveledUp)setTimeout(()=>showLevelUp(State.level),1100);
}

function doReview(questId,remembered){
  const{gained}=State.completeReview(questId,remembered);
  showXP((remembered?'+':'')+gained+' XP');
  reviewIdx++;
  setTimeout(()=>{render();},600);
}

function showXP(text){
  const el=document.getElementById('xp-popup');
  el.textContent=text;
  el.style.opacity='1';
  el.style.transform='translate(-50%,-60%) scale(1.2)';
  setTimeout(()=>{el.style.opacity='0';el.style.transform='translate(-50%,-120%) scale(0.8)';},1000);
}

function confetti(){
  const colors=['#8b5cf6','#a78bfa','#22c55e','#fbbf24','#f472b6','#60a5fa'];
  const c=document.getElementById('confetti-container');
  for(let i=0;i<60;i++){
    const p=document.createElement('div');
    p.className='confetti-piece';
    p.style.cssText=`left:${Math.random()*100}vw;top:-10px;background:${colors[Math.floor(Math.random()*colors.length)]};animation-duration:${1.5+Math.random()*1.5}s;animation-delay:${Math.random()*0.4}s;transform:rotate(${Math.random()*360}deg)`;
    c.appendChild(p);
    setTimeout(()=>p.remove(),3000);
  }
}

function showLevelUp(level){
  const d=document.createElement('div');
  d.className='modal-overlay';
  d.innerHTML=`<div class="modal">
    <div style="font-size:52px;margin-bottom:10px">🎉</div>
    <div style="font-size:22px;font-weight:900;color:#fff;margin-bottom:6px">LEVEL UP!</div>
    <div style="font-size:34px;font-weight:700;color:#a78bfa;margin-bottom:16px">Уровень ${level}</div>
    ${level===4?'<div style="color:#fbbf24;margin-bottom:12px">📊 Data Science разблокирован!</div>':''}
    ${level===7?'<div style="color:#8b5cf6;margin-bottom:12px">🤖 Machine Learning разблокирован!</div>':''}
    ${level===11?'<div style="color:#ef4444;margin-bottom:12px">👁️ Computer Vision разблокирован!</div>':''}
    <button class="btn btn-primary" onclick="this.closest('.modal-overlay').remove()">Продолжить →</button>
  </div>`;
  document.body.appendChild(d);
  confetti();
}
