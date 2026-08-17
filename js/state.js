// ============================================================
// STATE
// ============================================================
const LEVEL_THRESHOLDS = Array.from({length:50},(_,i)=>i*500);

const State={
  xp:0,level:1,streak:0,lastActivity:null,questProgress:{},
  load(){
    this.xp=parseInt(localStorage.getItem('mlrpg_xp')||'0');
    this.level=parseInt(localStorage.getItem('mlrpg_level')||'1');
    this.streak=parseInt(localStorage.getItem('mlrpg_streak')||'0');
    this.lastActivity=localStorage.getItem('mlrpg_last_activity')||null;
    try{this.questProgress=JSON.parse(localStorage.getItem('mlrpg_quest_progress')||'{}')}catch{this.questProgress={}}
  },
  save(){
    localStorage.setItem('mlrpg_xp',String(this.xp));
    localStorage.setItem('mlrpg_level',String(this.level));
    localStorage.setItem('mlrpg_streak',String(this.streak));
    localStorage.setItem('mlrpg_last_activity',this.lastActivity||'');
    localStorage.setItem('mlrpg_quest_progress',JSON.stringify(this.questProgress));
  },
  updateStreak(){
    const today=new Date().toISOString().slice(0,10);
    if(!this.lastActivity){this.streak=1;}
    else{
      const diff=Math.floor((new Date(today)-new Date(this.lastActivity))/86400000);
      if(diff===0)return;
      if(diff===1)this.streak+=1;
      else this.streak=1;
    }
    this.lastActivity=today;this.save();
  },
  streakMultiplier(){
    if(this.streak>=14)return 1.5;
    if(this.streak>=7)return 1.2;
    return 1.0;
  },
  earnXP(base){
    const gained=Math.round(base*this.streakMultiplier());
    this.xp+=gained;
    let lv=1;
    for(let i=1;i<LEVEL_THRESHOLDS.length;i++){if(this.xp>=LEVEL_THRESHOLDS[i])lv=i+1;else break;}
    const leveledUp=lv>this.level;
    this.level=lv;
    this.lastActivity=new Date().toISOString().slice(0,10);
    this.save();
    return{gained,leveledUp};
  },
  xpForLevel(){
    const idx=this.level-1;
    const start=LEVEL_THRESHOLDS[idx]||0;
    const end=LEVEL_THRESHOLDS[idx+1]||start+500;
    return{start,end,progress:this.xp-start,total:end-start};
  },
  getQP(id){
    if(!this.questProgress[id])this.questProgress[id]={steps:[false,false,false,false],completed:false,reviewDueDate:null,reviewInterval:1,reviewCount:0,mastered:false,approved:{},taskChecks:{}};
    if(!this.questProgress[id].approved)this.questProgress[id].approved={};
    if(!this.questProgress[id].taskChecks)this.questProgress[id].taskChecks={};
    return this.questProgress[id];
  },
  isApproved(questId,stepIdx){return!!(this.questProgress[questId]?.approved?.[stepIdx]);},
  setApproved(questId,stepIdx){const qp=this.getQP(questId);qp.approved[stepIdx]=true;this.save();},
  getTaskChecks(questId,stepIdx){return this.getQP(questId).taskChecks[stepIdx]||[];},
  setTaskCheck(questId,stepIdx,itemIdx){
    const qp=this.getQP(questId);
    if(!qp.taskChecks[stepIdx])qp.taskChecks[stepIdx]=[];
    qp.taskChecks[stepIdx][itemIdx]=true;
    this.save();
  },
  allTaskChecked(questId,stepIdx,total){
    const c=this.getQP(questId).taskChecks[stepIdx]||[];
    for(let i=0;i<total;i++)if(!c[i])return false;
    return true;
  },
  completeStep(questId,stepIdx,xpAmount){
    const qp=this.getQP(questId);
    if(qp.steps[stepIdx])return{gained:0,leveledUp:false};
    qp.steps[stepIdx]=true;
    if(qp.steps.every(Boolean)){
      qp.completed=true;
      const d=new Date();d.setDate(d.getDate()+1);
      qp.reviewDueDate=d.toISOString().slice(0,10);
      qp.reviewInterval=1;
    }
    this.save();
    return this.earnXP(xpAmount);
  },
  completeReview(questId,remembered){
    const qp=this.getQP(questId);
    const result=this.earnXP(remembered?15:5);
    if(remembered){
      qp.reviewCount+=1;
      qp.reviewInterval=Math.min(qp.reviewInterval*2,30);
      if(qp.reviewCount>=6){qp.mastered=true;qp.reviewDueDate=null;}
      else{const d=new Date();d.setDate(d.getDate()+qp.reviewInterval);qp.reviewDueDate=d.toISOString().slice(0,10);}
    }else{
      qp.reviewInterval=1;
      const d=new Date();d.setDate(d.getDate()+1);qp.reviewDueDate=d.toISOString().slice(0,10);
    }
    this.save();return result;
  },
  reviewDue(){
    const today=new Date().toISOString().slice(0,10);
    return QUESTS.filter(q=>{const qp=this.questProgress[q.id];return qp&&qp.completed&&!qp.mastered&&qp.reviewDueDate&&qp.reviewDueDate<=today;});
  },
  isTrackUnlocked(trackId){ return true; },
  trackProgress(trackId){
    const qs=QUESTS.filter(q=>q.trackId===trackId);
    const done=qs.filter(q=>this.getQP(q.id).completed).length;
    return{done,total:qs.length,pct:Math.round(done/qs.length*100)};
  }
};
