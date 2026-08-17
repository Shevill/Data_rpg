// ============================================================
// CODE RUNNER
// ============================================================
let _pyodide=null,_pyLoading=false,_sqlDB=null;

function edTab(e){
  if(e.key!=='Tab'){return}
  e.preventDefault();
  const ta=e.target,s=ta.selectionStart,end=ta.selectionEnd;
  ta.value=ta.value.substring(0,s)+'    '+ta.value.substring(end);
  ta.selectionStart=ta.selectionEnd=s+4;
}

function resetEditor(questId,stepIdx){
  const q=QUESTS.find(q=>q.id===questId);
  const ta=document.getElementById('ed-'+questId+'-'+stepIdx);
  if(ta&&q)ta.value=q.steps[stepIdx].code?q.steps[stepIdx].code:'';
  const out=document.getElementById('out-'+questId+'-'+stepIdx);
  if(out){out.style.display='none';out.textContent='';}
}

async function ensurePyodide(){
  if(_pyodide)return _pyodide;
  if(_pyLoading){while(_pyLoading)await new Promise(r=>setTimeout(r,150));return _pyodide;}
  _pyLoading=true;
  if(!window.loadPyodide){
    await new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';s.onload=res;s.onerror=rej;document.head.appendChild(s);});
  }
  _pyodide=await loadPyodide({indexURL:'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/'});
  // pre-load common packages
  await _pyodide.loadPackage(['numpy','micropip'],{messageCallback:()=>{}});
  _pyLoading=false;
  return _pyodide;
}

async function ensureSQL(){
  if(_sqlDB)return _sqlDB;
  if(!window.initSqlJs){
    await new Promise((res,rej)=>{const s=document.createElement('script');s.src='https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js';s.onload=res;s.onerror=rej;document.head.appendChild(s);});
  }
  const SQL=await initSqlJs({locateFile:f=>'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/'+f});
  _sqlDB=new SQL.Database();
  _sqlDB.run(`CREATE TABLE departments(id INTEGER PRIMARY KEY,name TEXT,budget REAL);
CREATE TABLE users(id INTEGER PRIMARY KEY,name TEXT,age INTEGER,city TEXT,salary REAL,dept_id INTEGER,join_date TEXT);
CREATE TABLE orders(id INTEGER PRIMARY KEY,user_id INTEGER,product TEXT,amount REAL,order_date TEXT,status TEXT);`);
  _sqlDB.run(`INSERT INTO departments VALUES(1,'Engineering',500000),(2,'Marketing',200000),(3,'Sales',350000),(4,'HR',150000),(5,'Analytics',280000)`);
  const names=['Alice Johnson','Bob Smith','Carol White','David Brown','Eve Davis','Frank Miller','Grace Wilson','Henry Moore','Iris Taylor','Jack Anderson','Karen Thomas','Leo Jackson','Mia Harris','Noah Martin','Olivia Garcia'];
  const cities=['London','Berlin','Paris','Amsterdam','Prague'];
  const salaries=[55000,62000,73000,78000,84000,88000,92000,95000,98000,105000,110000,120000,135000,150000,180000];
  const dates=['2016-09-10','2017-05-30','2018-07-14','2019-03-22','2019-08-20','2020-04-05','2020-11-25','2021-03-15','2021-10-30','2022-01-10','2022-06-18','2023-02-01','2023-08-15','2024-01-20','2024-06-01'];
  for(let i=0;i<15;i++){_sqlDB.run(`INSERT INTO users VALUES(${i+1},'${names[i]}',${22+i*2},'${cities[i%5]}',${salaries[i]},${(i%5)+1},'${dates[i]}')`);}
  const prods=['Laptop','Smartphone','Tablet','Headphones','Monitor','Keyboard','Mouse','Webcam'];
  const stats=['completed','pending','cancelled','refunded'];
  const amounts=[990,1490,2490,3990,5490,8990,12990,24990,49990,79990];
  for(let i=1;i<=60;i++){const uid=(i%15)+1,p=prods[i%8],a=amounts[i%10],d=`2024-${String((i%12)+1).padStart(2,'0')}-${String((i%28)+1).padStart(2,'0')}`,s=stats[i%4];_sqlDB.run(`INSERT INTO orders VALUES(${i},${uid},'${p}',${a},'${d}','${s}')`);}
  return _sqlDB;
}

function _pyCellHtml(n){
  return`<div class="py-cell">
    <div class="py-cell-bar">
      <span class="py-cell-label">In [${n}]</span>
      <button class="btn btn-ghost btn-sm" style="color:#fcd34d;font-size:12px;padding:3px 10px" onclick="runPyCell(this)">▶ Run</button>
      <button class="btn btn-ghost btn-sm" style="color:#475569;font-size:11px;padding:3px 7px" onclick="delPyCell(this)">✕</button>
    </div>
    <textarea class="code-editor" spellcheck="false" onkeydown="edTab(event)" style="min-height:80px"></textarea>
    <div class="run-output" style="display:none;margin-top:0"></div>
  </div>`;
}

function addPyCell(containerId){
  const c=document.getElementById(containerId);
  if(!c)return;
  const n=c.querySelectorAll('.py-cell').length+1;
  c.insertAdjacentHTML('beforeend',_pyCellHtml(n));
  c.lastElementChild.querySelector('textarea').focus();
}

function delPyCell(btn){
  const cell=btn.closest('.py-cell');
  const container=cell.parentElement;
  if(container.querySelectorAll('.py-cell').length>1)cell.remove();
}

let _pyExecCount=0;
async function runPyCell(btn){
  const cell=btn.closest('.py-cell');
  const ta=cell.querySelector('textarea');
  const out=cell.querySelector('.run-output');
  const label=cell.querySelector('.py-cell-label');
  if(!ta||!out)return;
  out.style.display='block';
  out.className='run-output loading';
  out.textContent='⏳ Загружаю Python (первый раз ~15с)...';
  if(label)label.textContent='In [*]';
  try{
    const py=await ensurePyodide();
    _pyExecCount++;
    let stdout='';
    py.setStdout({batched:s=>{stdout+=s+'\n';}});
    py.setStderr({batched:s=>{stdout+='⚠ '+s+'\n';}});
    await py.runPythonAsync(ta.value);
    out.className='run-output ok';
    out.textContent=stdout||'✓ Выполнено (нет вывода)';
    if(label)label.textContent=`In [${_pyExecCount}]`;
  }catch(e){
    out.className='run-output err';
    out.textContent='✗ '+String(e.message||e).split('\n').slice(0,8).join('\n');
    if(label)label.textContent=`In [!]`;
  }
}
