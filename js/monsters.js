const MONSTERS = {
  python: { emoji: '🐍', name: 'Shadow Serpent',  sub: 'Shadow Dungeon  •  Rank B' },
  sql:    { emoji: '💀', name: 'Data Wraith',      sub: 'Bone Dungeon  •  Rank B'  },
  ds:     { emoji: '🔮', name: 'Stats Phantom',    sub: 'Crystal Dungeon  •  Rank A' },
  ml:     { emoji: '🤖', name: 'Neural Golem',     sub: 'Iron Dungeon  •  Rank A'  },
  cv:     { emoji: '👁️', name: 'The Watcher',     sub: 'Abyss Dungeon  •  Rank S' },
};

// xp of completed quest pending animation; consumed when track screen renders
let _monsterHit = 0;

function getTrackMonsterState(trackId) {
  const mainQs = QUESTS.filter(q => q.trackId === trackId && !q.practice);
  const total = mainQs.length;
  const done = mainQs.filter(q => State.getQP(q.id).completed).length;
  const boss = mainQs.find(q => q.isBoss);
  const defeated = boss ? State.getQP(boss.id).completed : false;
  return { total, remaining: total - done, pct: total > 0 ? Math.round((total - done) / total * 100) : 0, defeated };
}

function renderMonsterPanel(trackId) {
  const mon = MONSTERS[trackId] || MONSTERS.ml;
  const track = TRACKS.find(t => t.id === trackId);
  const color = track ? track.color : '#8b5cf6';
  const { total, remaining, pct, defeated } = getTrackMonsterState(trackId);

  return `<div class="monster-arena" id="monster-arena" style="--mon-color:${color}">
  <div class="monster-name">${mon.name}</div>
  <div class="monster-sub">${mon.sub}</div>
  <div class="monster-figure${defeated ? ' defeated' : ''}" id="monster-figure">${mon.emoji}</div>
  <div class="monster-hp-row">
    <div class="monster-hp-lbl">HP</div>
    <div class="monster-hp-track"><div class="monster-hp-fill" id="monster-hp-fill" style="width:${pct}%"></div></div>
    <div class="monster-hp-num">${remaining}/${total}</div>
  </div>
  ${defeated ? '<div class="monster-defeated-overlay"><div class="monster-defeated-txt">DEFEATED</div></div>' : ''}
</div>`;
}

function triggerAttack(xp) {
  const fig = document.getElementById('monster-figure');
  const arena = document.getElementById('monster-arena');
  if (!fig || !arena) return;

  fig.classList.remove('hit');
  void fig.offsetWidth;
  fig.classList.add('hit');

  const dmg = document.createElement('div');
  dmg.className = 'damage-float';
  dmg.textContent = `-${xp}`;
  arena.appendChild(dmg);
  setTimeout(() => dmg.remove(), 900);
}
