const MONSTERS = {
  python: { emoji: '🐍', name: 'Shadow Serpent',  sub: 'Shadow Dungeon  •  Rank B' },
  sql:    { emoji: '💀', name: 'Data Wraith',      sub: 'Bone Dungeon  •  Rank B'  },
  ds:     { emoji: '🔮', name: 'Stats Phantom',    sub: 'Crystal Dungeon  •  Rank A' },
  ml:     { emoji: '🤖', name: 'Neural Golem',     sub: 'Iron Dungeon  •  Rank A'  },
  cv:     { emoji: '👁️', name: 'The Watcher',     sub: 'Abyss Dungeon  •  Rank S' },
};
const BOSS_MONSTER = { emoji: '👹', name: '⚔ DUNGEON BOSS ⚔', sub: 'S-Rank Gate  •  FINAL' };

function renderMonsterPanel(quest, qp) {
  const mon = quest.isBoss ? BOSS_MONSTER : (MONSTERS[quest.trackId] || MONSTERS.ml);
  const track = TRACKS.find(t => t.id === quest.trackId);
  const color = track ? track.color : '#8b5cf6';
  const total = quest.steps.length;
  const done = qp.steps.filter(Boolean).length;
  const remaining = total - done;
  const hpPct = total > 0 ? Math.round((remaining / total) * 100) : 0;
  const defeated = remaining === 0;

  return `<div class="monster-arena${quest.isBoss ? ' boss-arena' : ''}" id="monster-arena" style="--mon-color:${color}">
  <div class="monster-name">${mon.name}</div>
  <div class="monster-sub">${mon.sub}</div>
  <div class="monster-figure${quest.isBoss ? ' boss-figure' : ''}${defeated ? ' defeated' : ''}" id="monster-figure">${mon.emoji}</div>
  <div class="monster-hp-row">
    <div class="monster-hp-lbl">HP</div>
    <div class="monster-hp-track"><div class="monster-hp-fill" id="monster-hp-fill" style="width:${hpPct}%"></div></div>
    <div class="monster-hp-num" id="monster-hp-num">${remaining}/${total}</div>
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
