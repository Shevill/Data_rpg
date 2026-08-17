const TRACKS = [
  { id:'python', name:'Python',           emoji:'🐍', color:'#3b82f6', subtitle:'Синтаксис · Структуры · Алгоритмы', subtitleEn:'Syntax · Data Structures · Algorithms', requires:[] },
  { id:'sql',    name:'SQL',              emoji:'🗄️', color:'#10b981', subtitle:'Запросы · JOINs · Оконные функции',  subtitleEn:'Queries · JOINs · Window Functions',      requires:[] },
  { id:'ds',     name:'Data Science',    emoji:'📊', color:'#f59e0b', subtitle:'Статистика · pandas · EDA',          subtitleEn:'Statistics · pandas · EDA',               requires:['python'], requiresCount:3 },
  { id:'ml',     name:'Machine Learning',emoji:'🤖', color:'#8b5cf6', subtitle:'sklearn · Деревья · Бустинг',       subtitleEn:'sklearn · Trees · Boosting',              requires:['ds'], requiresCount:5 },
  { id:'cv',     name:'Computer Vision', emoji:'👁️', color:'#ef4444', subtitle:'PyTorch · CNN · YOLO · Комар⚡',    subtitleEn:'PyTorch · CNN · YOLO · MosquitoLaser⚡',  requires:['ml'], requiresCount:9 },
];

const QUESTS = [];  // populated by track files


// ============================================================
// RECALL ANSWERS
// ============================================================
const RECALL_ANSWERS={
  py1:['Основные типы: int, float, str, bool, None. Проверка: type(x). Приведение: int("42"), str(3.14)','/ — дробное деление (7/2=3.5). // — целочисленное (7//2=3). % — остаток (7%2=1). ** — степень (2**8=256)','"hello"[1:4] → "ell". Срез [start:stop] берёт символы с индекса start до stop-1','f-строки вставляют переменные в строку без конкатенации: f"x={x}" вместо "x="+str(x)'],
  py2:['list — изменяемый (append/remove/sort). tuple — неизменяемый, быстрее, для координат, возврата нескольких значений из функции','list.sort() — in-place, меняет сам список, возвращает None. sorted() — возвращает новый список, оригинал не трогает','Когда логика сложная (вложенность, несколько условий) — лучше обычный for для читаемости. Comprehension = 1 простое выражение','Распаковка: a, b = (1, 2). Extended: x, *rest = [1,2,3,4] → x=1, rest=[2,3,4]. Для swap: a, b = b, a'],
  py3:['hash(key) вычисляет индекс в массиве напрямую → O(1). В list — перебор каждого элемента O(n)','d[key] — KeyError если ключа нет. d.get(key, default) — безопасно, возвращает default (None по умолчанию)','Когда нужна уникальность и быстрая проверка принадлежности. set не хранит порядок и дубликаты, in = O(1)','Два ключа дают одинаковый hash(). Python разрешает цепочками (chaining) или открытой адресацией'],
  py4:['Функция, которая помнит переменные из внешней области видимости после её завершения. make_multiplier(2) → функция с n=2 внутри','*args — переменное кол-во позиционных аргументов (tuple). **kwargs — именованных (dict). def f(*args, **kwargs)','Декораторы оборачивают функцию добавляя поведение без изменения её кода: @cache, @retry, @login_required','LEGB: Local → Enclosing → Global → Built-in. Python ищет переменную снизу вверх по этой цепочке'],
  py5:['__init__ — конструктор, вызывается при создании: obj = MyClass(). self — ссылка на конкретный экземпляр внутри метода','class B(A) — B наследует все методы A. Переопределение: написать метод с тем же именем в B (override)','Инкапсуляция — скрытие деталей реализации. _name — соглашение "protected". __name — манглинг (приватный, _Class__name)','Один и тот же метод работает по-разному у разных классов. dog.speak() → "Woof", cat.speak() → "Meow"'],
  py6:['O(n log n): алгоритм рекурсивно делит данные пополам (log n уровней), на каждом уровне обрабатывает n элементов — merge sort','В dict: hash(key) → прямой доступ к ячейке памяти O(1). В list: нужно перебрать все элементы O(n)','Бинарный поиск работает только на отсортированном массиве. На каждом шаге отбрасывает половину — O(log n)','dict/set: O(1) поиск. list: O(n) поиск, O(1) доступ по индексу. heapq: O(log n) push/pop. deque: O(1) с обоих концов'],
  sql1:['FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT','LIKE "%" — маска, % заменяет любые символы. = — точное совпадение. "A%" — начинается с A, "%@gmail%" — содержит','COALESCE возвращает первое не-NULL: COALESCE(NULL, NULL, 42, 10) → 42','Алиасы (AS): читаемость кода, переименование колонок/таблиц, обязательны для вычисляемых полей в ORDER BY'],
  sql2:['WHERE фильтрует строки ДО группировки (по отдельным строкам). HAVING фильтрует группы ПОСЛЕ агрегации','Ошибка: name не в GROUP BY и не в агрегатной функции. SQL не знает какое name вернуть — у группы их несколько','COUNT(*) — считает все строки включая NULL. COUNT(col) — только не-NULL значения в указанной колонке','Да, именно такой порядок выполнения. FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY'],
  sql3:['INNER JOIN — только строки с совпадением в обеих таблицах. LEFT JOIN — все из левой + NULL из правой если нет совпадения','NULL != NULL в SQL. JOIN по полю с NULL-значениями не даст совпадений — нужен IS NULL отдельно','Когда в правой таблице несколько строк совпадают с одной строкой левой — строка дублируется для каждого совпадения','SELF JOIN: таблица соединяется сама с собой. Полезен для иерархий (сотрудник+менеджер), поиска пар (A и B из одного города)'],
  sql4:['RANK: пропускает номера при ничьих (1,2,2,4). DENSE_RANK: не пропускает (1,2,2,3). ROW_NUMBER: всегда уникальный (1,2,3,4)','LAG(col, n) — значение на n строк назад. LEAD(col, n) — на n строк вперёд. Для вычисления изменений (продажи сегодня - вчера)','OVER() применяет функцию без GROUP BY, сохраняя все строки в результате. PARTITION BY — разбить на группы внутри окна','SUM(col) OVER (ORDER BY date) — нарастающий итог. AVG(col) OVER (PARTITION BY dept) — среднее отдела рядом с каждой строкой'],
  ds1:['При выбросах. Медиана не реагирует на экстремальные значения: 9 зарплат по 50к + 1 по 10М → среднее 1М, медиана 50к','Вероятность получить такой результат случайно, если нулевая гипотеза верна. p<0.05 → маловероятно случайно → отвергаем H₀','Средний разброс значений вокруг среднего. σ=10 при mean=50 → большинство данных в [40, 60]. 68-95-99.7% в 1-2-3σ','r ∈ [-0.3, -0.1]. Отрицательный = обратная связь (один растёт → другой падает). Близко к 0 = слабая сила связи'],
  ds2:['.loc — по меткам/именам (df.loc["row","col"]). .iloc — по позиции/числам (df.iloc[0,1]). После булевой маски — .loc','df.query("age > 25 and city == \'London\'") — фильтрация SQL-синтаксисом. Строчные ссылки на колонки без кавычек','fillna(val) — заполнить пропуски значением (медианой, 0, forward fill). dropna() — удалить строки/колонки с пропусками','df.groupby("col").agg(mean_sal=(\'salary\',\'mean\'), cnt=(\'id\',\'count\'), total=(\'val\',\'sum\')).round(2)'],
  ds3:['Box plot: медиана, IQR, выбросы — лучше для сравнения групп и нахождения выбросов. Гистограмма — форма одного распределения','Heatmap корреляций показывает попарные линейные связи всех числовых переменных: силу (0-1) и направление (+/-)','Заголовок = вывод: "Churn выше при низкой зарплате" а не "Зарплата и Churn". Читатель должен получить инсайт сразу','plotly — интерактивные (zoom, hover, фильтры в браузере). matplotlib — статичные, полный контроль стиля'],
  ds4:['Data leakage: признак содержит информацию о таргете из будущего. Модель "знает" ответ при обучении → отличные метрики, провал на проде','При дисбалансе 95/5: модель предсказывает всегда мажоритарный класс → accuracy 95%, но 0% recall для минорного. Нужны F1/AUC','Train и test из разных временных периодов или источников. Модель обучена на одном распределении, тестируется на другом','df.shape, df.dtypes, df.info(), df.isnull().sum() — структура, типы, пропуски. Потом df.describe() для числовых'],
  ds5:['EDA boss — самооценка','EDA boss — самооценка','EDA boss — самооценка','EDA boss — самооценка'],
  ml1:['Supervised: есть метки (y), учимся предсказывать. Unsupervised: нет меток, ищем структуру. Reinforcement: агент + среда + награда','Модель запомнила шум в обучающих данных, плохо обобщает на новые. train accuracy >> test accuracy','Тестовая выборка — данные которые модель не видела при обучении. Без неё нельзя честно оценить качество','Feature — входная переменная X (возраст, зарплата). Label/target — Y, что предсказываем (churn=0/1)'],
  ml2:['Градиент указывает направление наибольшего роста функции. GD идёт в обратном направлении — к минимуму','Слишком большой lr → перешагивает минимум, расходится. Слишком маленький → очень медленно сходится, застревает в локальном минимуме','Batch GD — на всех данных (точный, медленный). SGD — на 1 примере (шумно, быстро). Mini-batch — компромисс, стандарт'],
  ml3:['MAE: среднее |y-ŷ|, в единицах таргета, устойчив к выбросам. RMSE: √MSE, штрафует большие ошибки сильнее из-за квадрата','R²=0.65 → модель объясняет 65% дисперсии таргета. 35% вариации осталось необъяснённым','При мультиколлинеарности коэффициенты нестабильны и трудно интерпретировать значимость каждого признака'],
  ml4:['При дисбалансе 95/5: предсказывать всегда мажоритарный класс → accuracy 95%, но модель бесполезна','Recall важнее: диагностика (пропустить больного опаснее). Precision важнее: спам-фильтр (ложный позитив = потеря важного письма)','C — обратный коэффициент регуляризации. Маленький C → сильная регуляризация → более простая граница решения'],
  ml5:['Gini = 1-Σpᵢ² измеряет нечистоту узла. Сплит выбирается чтобы максимально разделить классы (минимизировать Gini)','Глубокое дерево запоминает шум обучающих данных. На тесте ошибается — это overfitting. max_depth ограничивает глубину','Деревья работают с порядком значений, не масштабом. Масштабирование не меняет порядок → результат тот же'],
  ml6:['Bagging = Bootstrap AGGregatING. Каждое дерево обучается на случайной подвыборке с возвращением (bootstrap sample)','Ограничиваем max_features чтобы деревья коррелировали меньше. Разные признаки → разные деревья → ошибки усредняются','OOB (Out-of-Bag): каждый пример не попал примерно в 37% деревьев → их можно использовать как val без отдельного split'],
  ml7:['Bagging (RF): деревья параллельно, независимо друг от друга. Boosting (XGB): последовательно — каждое учится на ошибках предыдущего','Early stopping останавливает обучение когда val-метрика перестаёт улучшаться. Нет overfitting, нет лишних итераций','LGB: leaf-wise рост (глубже в перспективных ветках). XGB: level-wise. Leaf-wise быстрее на больших датасетах'],
  ml8:['Pipeline гарантирует что scaler.fit() только на train. Без Pipeline — scaler видит test → утечка данных (data leakage)','RobustScaler использует медиану и IQR вместо mean/std → не чувствителен к выбросам в отличие от StandardScaler','Target leakage: признак содержит информацию о таргете из будущего или вычислен с использованием таргета'],
  ml9:['ML boss — самооценка','ML boss — самооценка','ML boss — самооценка','ML boss — самооценка'],
  cv1:['Backprop: вычислить ∂Loss/∂w для каждого веса через chain rule, идя от выхода к входу. Потом GD обновляет веса','ReLU = max(0,x): нет проблемы затухающего градиента (в отличие от sigmoid). Простой, быстрый, работает','requires_grad=True включает запись операций для autograd → PyTorch может вычислить градиент через backward()','PyTorch: низкоуровневый, гибкий, тензоры + autograd, исследования. sklearn: высокоуровневый, готовые алгоритмы, fit/predict'],
  cv2:['Conv2d: скользящий фильтр, один набор весов на всё изображение (weight sharing) — находит локальные паттерны','MaxPool2d уменьшает spatial размер в 2×, берёт максимум в окне → инвариантность к малым сдвигам + меньше параметров','Weight sharing: один фильтр применяется по всему изображению. Меньше параметров, лучше обобщение, перевод-инвариантность','BatchNorm нормализует активации по батчу → стабильнее обучение, можно использовать больший learning rate'],
  cv3:['ImageNet веса кодируют универсальные признаки (края→текстуры→части объектов). С малым датасетом учить с нуля невозможно','Замороженные слои не обновляются при backprop → учим только классификатор. Быстро, не разрушаем предобученные веса','Fine-tuning: размораживаем последние слои и доучиваем с маленьким lr на своих данных → адаптируем к новой задаче','Модель ожидает ту же нормализацию что при обучении на ImageNet: mean=[0.485,0.456,0.406], std=[0.229,0.224,0.225]'],
  cv4:['Classification: что изображено (один вектор вероятностей). Detection: что + где — bounding box + класс для каждого объекта','IoU = площадь_пересечения / площадь_объединения. 0 = нет пересечения, 1 = идеальное. Порог >0.5 обычно считается верным','NMS убирает дублирующиеся bounding boxes для одного объекта, оставляя только с наибольшим confidence score','You Only Look Once — один проход сети на всё изображение. Two-stage (R-CNN): сначала регионы, потом классификация — медленнее'],
  cv5:['CV boss — самооценка','CV boss — самооценка','CV boss — самооценка','CV boss — самооценка'],
};

const DATASETS={
  python:[
    {name:'Iris CSV',url:'https://raw.githubusercontent.com/mwaskom/seaborn-data/master/iris.csv',desc:'Прямая ссылка CSV · 150 строк · числовые + категория'},
    {name:'Tips (seaborn)',url:'https://raw.githubusercontent.com/mwaskom/seaborn-data/master/tips.csv',desc:'Чаевые в ресторане · 244 строки · хорош для groupby'},
  ],
  ds:[
    {name:'Titanic',url:'https://raw.githubusercontent.com/datasciencedojo/datasets/master/titanic.csv',desc:'891 строка · числовые + категориальные + пропуски · классика EDA'},
    {name:'Melbourne Housing',url:'https://raw.githubusercontent.com/selva86/datasets/master/housing.csv',desc:'Цены на жильё · числовые признаки · EDA + регрессия'},
    {name:'Wine Quality',url:'https://archive.ics.uci.edu/ml/machine-learning-databases/wine-quality/winequality-red.csv',desc:'Красное вино · 1599 строк · числовые · бинарная цель'},
  ],
  ml:[
    {name:'Telco Churn',url:'https://raw.githubusercontent.com/IBM/telco-customer-churn/master/data/Telco-Customer-Churn.csv',desc:'7043 строки · binary target Churn · идеально для ML1–BOSS'},
    {name:'Heart Disease',url:'https://raw.githubusercontent.com/selva86/datasets/master/heart.csv',desc:'303 строки · binary target · LogReg · Trees · RF'},
    {name:'Boston Housing',url:'https://raw.githubusercontent.com/selva86/datasets/master/BostonHousing.csv',desc:'506 строк · continuous target · Linear/Lasso Regression'},
  ],
  cv:[
    {name:'CIFAR-10 (torchvision)',url:'https://pytorch.org/vision/main/generated/torchvision.datasets.CIFAR10.html',desc:'Загрузка: torchvision.datasets.CIFAR10(root=".", download=True)'},
    {name:'Kaggle: Dogs vs Cats',url:'https://www.kaggle.com/datasets/salader/dogs-vs-cats',desc:'25 000 изображений · Transfer Learning · fine-tuning'},
  ],
  sql:[]
};

let _rec=null,_chunks=[];
async function toggleRecording(questId,stepIdx){
  const btn=document.getElementById(`rbtn-${questId}-${stepIdx}`);
  if(_rec&&_rec.state==='recording'){
    _rec.stop();
    if(btn){btn.textContent=t('transcribing');btn.disabled=true;}
    return;
  }
  try{
    const stream=await navigator.mediaDevices.getUserMedia({audio:true});
    _chunks=[];
    const mimeType=MediaRecorder.isTypeSupported('audio/webm;codecs=opus')?'audio/webm;codecs=opus':'audio/webm';
    _rec=new MediaRecorder(stream,{mimeType});
    _rec.ondataavailable=e=>e.data.size&&_chunks.push(e.data);
    _rec.onstop=async()=>{
      stream.getTracks().forEach(t=>t.stop());
      const blob=new Blob(_chunks,{type:'audio/webm'});
      await transcribeGroq(questId,stepIdx,blob);
      if(btn){btn.textContent='🎤 Запись';btn.disabled=false;}
    };
    _rec.start(250);
    if(btn)btn.textContent='⏹ Стоп';
  }catch(e){alert('Микрофон недоступен: '+e.message);}
}

async function transcribeGroq(questId,stepIdx,blob){
  const fd=new FormData();
  fd.append('file',blob,'rec.webm');
  fd.append('model','whisper-large-v3-turbo');
  fd.append('response_format','text');
  fd.append('language','ru');
  try{
    const resp=await fetch('https://api.groq.com/openai/v1/audio/transcriptions',{
      method:'POST',headers:{'Authorization':'Bearer '+getGroqKey()},body:fd
    });
    const text=await resp.text();
    const ta=document.getElementById(`ata-${questId}-${stepIdx}`);
    if(ta)ta.value=(ta.value?ta.value+'\n':'')+text.trim();
  }catch(e){alert(t('transcribeErr')+e.message);}
}

async function evaluateTask(questId,stepIdx){
  const quest=QUESTS.find(q=>q.id===questId);
  const step=quest?.steps[stepIdx];
  const ta=document.getElementById(`ata-${questId}-${stepIdx}`);
  const answer=(ta?.value||'').trim();
  if(!answer){alert(t('describeAlert'));return;}
  const out=document.getElementById(`aeval-${questId}-${stepIdx}`);
  const doneBtn=document.getElementById(`done-${questId}-${stepIdx}`);
  out.style.display='block';out.className='ai-out';out.textContent=t('checkingAI');
  try{
    const resp=await fetch('https://api.groq.com/openai/v1/chat/completions',{
      method:'POST',
      headers:{'Authorization':'Bearer '+getGroqKey(),'Content-Type':'application/json'},
      body:JSON.stringify({
        model:'llama-3.3-70b-versatile',max_tokens:400,temperature:0.2,
        messages:[{role:'user',content:_lang==='en'
          ?`You are a strict but fair Data Science mentor.

Task:
${getStepDesc(QUESTS.find(q=>q.id===questId),stepIdx)}

Student's description of what they did:
${answer}

Evaluate:
- Was the task completed?
- What is good?
- What is missing or incorrect?
- Final verdict on the last line: ACCEPTED or RETRY

Max 150 words. Reply in English.`
          :`Ты строгий но справедливый ментор по Data Science.

Задание:
${getStepDesc(QUESTS.find(q=>q.id===questId),stepIdx)}

Студент описывает что он сделал:
${answer}

Оцени:
- Суть задания выполнена?
- Что хорошо?
- Что пропущено или неточно?
- Вердикт на последней строке: ПРИНЯТО или ПОВТОРИТЬ

До 150 слов. Отвечай на русском.`}]
      })
    });
    const data=await resp.json();
    const txt=data.choices?.[0]?.message?.content||'Нет ответа от AI';
    out.textContent=txt;
    const approved=txt.toUpperCase().includes('ПРИНЯТО')||txt.toUpperCase().includes('ACCEPTED');
    if(approved){
      out.className='ai-out approved';
      State.setApproved(questId,stepIdx);
      if(doneBtn){doneBtn.disabled=false;doneBtn.style.opacity='1';doneBtn.style.background='';}
    }else{
      out.className='ai-out rejected';
    }
  }catch(e){out.textContent='✗ Ошибка: '+e.message;out.className='ai-out rejected';}
}
