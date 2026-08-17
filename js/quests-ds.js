QUESTS.push(
// ---- DATA SCIENCE ----
{id:'ds1',trackId:'ds',title:'Статистика основы',emoji:'📐',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'Описательная статистика — первый шаг любого анализа.\n\nМеры центральной тенденции:\n• Mean (среднее) — чувствительно к выбросам\n• Median (медиана) — 50-й перцентиль, устойчива к выбросам\n• Mode (мода) — наиболее частое значение\n\nМеры разброса:\n• Variance σ² = Σ(x-μ)²/n\n• Std σ = √σ²\n• IQR = Q3 - Q1\n\nРаспределения:\n• Нормальное: симметричное, 68-95-99.7% в 1-2-3σ\n• Скошенное: mean > median (вправо)\n\nКорреляция Пирсона: r ∈ [-1,1]\n\np-value: вероятность получить такой результат при H₀. p < 0.05 → отвергаем H₀',code:null},
  {title:'Код',xp:15,type:'code',description:'Набери руками:',code:`import numpy as np\nimport scipy.stats as stats\nimport matplotlib.pyplot as plt\n\nnp.random.seed(42)\nnormal = np.random.normal(loc=50, scale=10, size=1000)\nskewed = np.random.exponential(scale=20, size=1000)\n\nfor data, name in [(normal,'Normal'),(skewed,'Skewed')]:\n    print(f"--- {name} ---")\n    print(f"  mean={data.mean():.2f}, median={np.median(data):.2f}")\n    print(f"  std={data.std():.2f}, IQR={np.percentile(data,75)-np.percentile(data,25):.2f}")\n    print(f"  skewness={stats.skew(data):.2f}")\n\n# t-тест\ngroup_a = np.random.normal(50, 10, 100)\ngroup_b = np.random.normal(55, 10, 100)\nt_stat, p_value = stats.ttest_ind(group_a, group_b)\nprint(f"\\nt-test: t={t_stat:.3f}, p={p_value:.4f}")\nprint("Отвергаем H₀" if p_value < 0.05 else "Не отвергаем H₀")`},
  {title:'Задача',xp:20,type:'task',description:'Возьми числовую колонку из реального датасета:\n1. Посчитай: mean, median, std, IQR, 5-й и 95-й перцентили\n2. Построй histogram + boxplot\n3. Найди выбросы через правило 1.5×IQR\n4. Разбей на 2 группы и проверь t-тестом\n5. Есть ли нормальное распределение? (shapiro-wilk)',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Когда медиана лучше среднего?\n2. Что такое p-value простыми словами?\n3. Что показывает стандартное отклонение?\n4. Какой r означает слабую обратную связь?',code:null}
]},
{id:'ds2',trackId:'ds',title:'pandas: трансформации',emoji:'🐼',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'pandas — главная библиотека Python для табличных данных.\n\nОсновные объекты:\n• Series — одномерный массив с индексом\n• DataFrame — таблица\n\nЗагрузка: pd.read_csv(), pd.read_excel(), pd.read_sql()\n\nИзучение: df.shape, df.dtypes, df.info(), df.describe(), df.head()\n\nФильтрация:\n• df[df["col"] > 100]\n• df.query("age > 25 and salary > 50000")\n• df.loc[mask, "col"] — по метке\n• df.iloc[0:5, 1:3] — по позиции\n\nГруппировка:\n• df.groupby("dept")["salary"].agg(["mean","count","sum"])\n• df.pivot_table(values, index, columns, aggfunc)\n\nПреобразования:\n• df.assign(ratio=lambda x: x["a"] / x["b"])\n• pd.to_datetime(), df["col"].str.upper()\n• df.fillna(val), df.dropna()',code:null},
  {title:'Код',xp:15,type:'code',description:'Набери руками:',code:`import pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\nn = 500\ndf = pd.DataFrame({\n    'user_id': range(1,n+1),\n    'age': np.random.randint(18,65,n),\n    'city': np.random.choice(['London','Berlin','Paris'],n),\n    'salary': np.random.exponential(60000,n).astype(int),\n    'churn': np.random.choice([0,1],n,p=[0.8,0.2])\n})\ndf.loc[df.sample(50).index,'salary'] = None\n\nprint(df.info())\nprint(df.describe())\n\n# fill missing values\ndf['salary'] = df['salary'].fillna(df['salary'].median())\n\n# filter\nlondon = df.query('city == "London" and salary > 80000')\nprint(f"London+high_salary: {len(london)}")\n\n# Группировка\nstats = df.groupby('city').agg(\n    users=('user_id','count'),\n    avg_salary=('salary','mean'),\n    churn_rate=('churn','mean')\n).round(2)\nprint(stats)\n\n# Новые признаки\ndf['salary_bin'] = pd.qcut(df['salary'],q=4,labels=['low','mid','high','top'])`},
  {title:'Задача',xp:20,type:'task',description:'Загрузи реальный CSV:\n1. df.info() + df.describe() — опиши датасет\n2. Найди и обработай пропуски (fillna/dropna — обоснуй)\n3. Создай минимум 3 новых признака через df.assign()\n4. groupby + agg: найди интересную закономерность\n5. pivot_table: сводная таблица\n6. Сохрани: df.to_csv("result.csv", index=False)',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Чем .loc отличается от .iloc?\n2. Что делает df.query()?\n3. В чём разница fillna и dropna?\n4. Как написать groupby с несколькими агрегатами?',code:null}
]},
{id:'ds3',trackId:'ds',title:'Визуализация',emoji:'🎨',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'Когда какой тип:\n• Гистограмма (hist) — распределение одной числовой переменной\n• Box plot — распределение + выбросы, сравнение групп\n• Scatter plot — связь двух числовых переменных\n• Line plot — временной ряд\n• Bar chart — сравнение категорий\n• Heatmap — корреляционная матрица\n\nПринципы:\n• Заголовок = ответ на вопрос ("Churn выше среди молодых")\n• Подписи осей всегда\n• Не больше 5-7 цветов\n\nБиблиотеки:\n• matplotlib — основа, полный контроль\n• seaborn — статистические графики\n• plotly — интерактивные',code:null},
  {title:'Код',xp:15,type:'code',description:'Набери руками:',code:`import pandas as pd, numpy as np\nimport matplotlib.pyplot as plt\nimport seaborn as sns\n\nnp.random.seed(42); n=300\ndf = pd.DataFrame({'age':np.random.randint(18,65,n),'salary':np.abs(np.random.normal(70000,25000,n)),'city':np.random.choice(['London','Berlin','Paris'],n),'churn':np.random.choice([0,1],n,p=[0.75,0.25])})\n\nfig,axes = plt.subplots(2,2,figsize=(14,10))\nfig.suptitle('Analytics Dashboard',fontsize=16,fontweight='bold')\n\n# 1. churn histogram\nfor c,col,lbl in [(0,'#3b82f6','Stayed'),(1,'#ef4444','Left')]:\n    axes[0,0].hist(df[df.churn==c].salary,bins=30,alpha=0.6,color=col,label=lbl)\naxes[0,0].set_title('Does churn grow with lower salary?'); axes[0,0].legend()\n\n# 2. Box plot\ndf.boxplot(column='age',by='city',ax=axes[0,1])\naxes[0,1].set_title('Age by city')\n\n# 3. Scatter\nfor c,col in [(0,'#3b82f6'),(1,'#ef4444')]:\n    s=df[df.churn==c]; axes[1,0].scatter(s.age,s.salary,alpha=0.4,color=col,s=15)\naxes[1,0].set(title='Age vs Salary',xlabel='Age',ylabel='Salary')\n\n# 4. Heatmap\nsns.heatmap(df[['age','salary','churn']].corr(),annot=True,fmt='.2f',cmap='coolwarm',ax=axes[1,1])\naxes[1,1].set_title('Correlations')\n\nplt.tight_layout(); plt.show()`},
  {title:'Задача',xp:20,type:'task',description:'На своём датасете создай отчёт из 6 графиков (2×3):\n1. Гистограмма основной метрики\n2. Box plot метрики по категории\n3. Scatter двух числовых\n4. Bar chart топ-10 значений категории\n5. Heatmap корреляций\n6. Line plot по времени (или любой дополнительный)\n\nКаждый заголовок = вывод ("X растёт с Y"), не просто "График X".',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Когда box plot лучше гистограммы?\n2. Что показывает heatmap корреляций?\n3. Как написать заголовок-вывод?\n4. Чем plotly отличается от matplotlib?',code:null}
]},
{id:'ds4',trackId:'ds',title:'EDA методология',emoji:'🔍',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'EDA (Exploratory Data Analysis) — систематическое исследование данных.\n\nШаги:\n1. Понять: shape, dtypes, источник, бизнес-контекст\n2. Качество: nulls, duplicates, невозможные значения\n3. Univariate: распределение каждой переменной\n4. Bivariate: связь пар переменных\n5. Multivariate: взаимодействия\n6. Выводы: что влияет на таргет?\n\nЧастые проблемы:\n• Data leakage — признак содержит инфо о таргете из будущего\n• Class imbalance — редкий класс\n• Collinearity — признаки сильно коррелируют\n• Distribution shift — train и test из разных периодов',code:null},
  {title:'Код',xp:15,type:'code',description:'Шаблон EDA:',code:`import pandas as pd, numpy as np\n\ndef run_eda(df, target_col):\n    print("="*50)\n    print(f"DATASET: {df.shape[0]} rows, {df.shape[1]} cols")\n    print("="*50)\n    null_pct = (df.isnull().sum()/len(df)*100).round(1)\n    info_df = pd.DataFrame({'dtype':df.dtypes,'null_%':null_pct,'nunique':df.nunique()})\n    print("\\n[NULLS]\\n", info_df[info_df['null_%']>0])\n    print(f"\\n[DUPLICATES]: {df.duplicated().sum()}")\n    print(f"\\n[TARGET '{target_col}']:\\n{df[target_col].value_counts(normalize=True).round(3)}")\n    num_cols = df.select_dtypes(include=np.number).columns.tolist()\n    if target_col in num_cols: num_cols.remove(target_col)\n    print(f"\\n[NUMERIC]\\n{df[num_cols].describe().T[['mean','std','min','max']].round(2)}")\n    if df[target_col].dtype in [np.float64,np.int64]:\n        corr = df[num_cols].corrwith(df[target_col]).abs().sort_values(ascending=False)\n        print(f"\\n[TOP CORRELATIONS]:\\n{corr.head(5)}")\n\n# Запусти: run_eda(df, 'churn')`},
  {title:'Задача',xp:20,type:'task',description:'Полный EDA на реальном датасете:\n1. Запусти run_eda(df, target)\n2. Bivariate: среднее числового признака по классам таргета\n3. Найди признак с наибольшей корреляцией с таргетом\n4. Найди признак с > 30% пропусков — как обработаешь?\n5. Найди два коррелирующих признака (> 0.8) — что с ними делать?\n6. Напиши 5 конкретных наблюдений',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Что такое data leakage?\n2. Почему class imbalance проблема?\n3. Что такое distribution shift?\n4. Первый шаг EDA после загрузки данных?',code:null}
]},
{id:'ds5',trackId:'ds',title:'EDA Проект',emoji:'⚔️',isBoss:true,steps:[
  {title:'Теория',xp:50,type:'theory',description:'⚔️ ФИНАЛЬНЫЙ БОСС DS\n\nПолный EDA-проект как аналитик.\n\nЧто оценивается:\n• Полнота: охвачены все переменные\n• Инсайты: конкретные наблюдения, не просто графики\n• Качество: данные очищены, проблемы выявлены\n• Презентабельность: заголовки-выводы\n\nДатасет: Kaggle (продажи, финансы, HR) или рабочие данные (обезличенные).\n\nПодсказок нет.',code:null},
  {title:'Код',xp:60,type:'code',description:'🚫 Без подсказок. Полный EDA:\n1. Загрузи и изучи (shape, dtypes, nulls, duplicates)\n2. Очисти данные\n3. Univariate: гистограммы числовых, value_counts категориальных\n4. Bivariate: scatter matrix, box plots\n5. Корреляционная матрица\n6. Связь с таргетом\n\nМинимум 10 графиков с осмысленными заголовками.',code:null},
  {title:'Задача',xp:60,type:'task',description:'🚫 Без подсказок. Аналитический вывод:\n1. Executive Summary: 5-7 предложений\n2. Топ-3 признака по важности для таргета\n3. Какие данные нужны дополнительно?\n4. Какую ML-модель предложишь как следующий шаг?\n5. Проблемы качества данных?',code:null},
  {title:'Recall',xp:30,type:'recall',description:'За 5 минут:\n1. Расскажи EDA команде — 2 минуты устно\n2. Самый неожиданный инсайт?\n3. Что сделал бы иначе?\n4. Готов к ML? Какие признаки возьмёшь?',code:null}
]},
{id:'ds-p1',trackId:'ds',practice:true,emoji:'⚡',title:'pandas: merge и transform',steps:[
  {title:'merge + pivot_table',xp:15,type:'code',description:'Объединение и сводные таблицы',code:`import pandas as pd
import numpy as np

orders = pd.DataFrame({
    'order_id':[1,2,3,4,5,6],
    'user_id':[1,2,1,3,2,1],
    'product':['Laptop','Phone','Tablet','Laptop','Phone','Tablet'],
    'amount':[1200,800,500,1200,800,500]
})
users = pd.DataFrame({
    'user_id':[1,2,3],
    'name':['Alice','Bob','Charlie'],
    'city':['London','Berlin','Paris']
})

# LEFT JOIN
merged = pd.merge(orders, users, on='user_id', how='left')
print(merged)

# groupby после merge
summary = merged.groupby('name').agg(
    total=('amount','sum'),
    cnt=('order_id','count'),
    avg=('amount','mean')
).round(2)
print(summary)

# pivot_table
pivot = orders.pivot_table(values='amount', index='product', aggfunc=['sum','count','mean'])
print(pivot)`}
 ,{title:'Задача: merge',xp:20,type:'task',description:`Создай два датафрейма (пользователи и заказы) минимум 5-10 строк.\n1. LEFT JOIN: все заказы с именами пользователей\n2. INNER JOIN: только заказы существующих пользователей (как отличается результат?)\n3. groupby + agg: топ-3 пользователя по суммарным покупкам\n4. pivot_table: средний чек по продукту и городу пользователя`,code:null}
 ,{title:'transform + apply',xp:15,type:'code',description:'Продвинутый groupby',code:`import pandas as pd

df = pd.DataFrame({
    'dept':  ['Eng','Eng','HR','HR','Sales','Sales'],
    'name':  ['Alice','Bob','Carol','Dave','Eve','Frank'],
    'salary':[90000,85000,70000,75000,80000,82000]
})

# transform: возвращает Series той же длины (не схлопывает)
df['dept_avg']   = df.groupby('dept')['salary'].transform('mean')
df['above_avg']  = df['salary'] > df['dept_avg']
df['salary_rank']= df.groupby('dept')['salary'].rank(ascending=False)
print(df)

# apply с функцией
def stats(g):
    return pd.Series({'min':g.min(),'max':g.max(),'range':g.max()-g.min()})

result = df.groupby('dept')['salary'].apply(stats)
print(result)`}
 ,{title:'Задача: transform',xp:20,type:'task',description:`Загрузи Titanic CSV или создай датафрейм 20+ строк с числовым и категориальным признаком.\n1. transform: добавь колонку со средним числовым признаком внутри каждой группы\n2. transform: нормализуй числовой признак (x - mean) / std внутри каждой группы\n3. apply: для каждой группы верни min, max, std, count\n4. rank: ранжируй строки по числовому признаку внутри группы`,code:null}
]},
{id:'ds-p2',trackId:'ds',practice:true,emoji:'⚡',title:'Статистика на практике',steps:[
  {title:'Scipy: тесты',xp:15,type:'code',description:'t-тест, нормальность, корреляция',code:`import numpy as np
from scipy import stats

np.random.seed(42)
group_a = np.random.normal(loc=75, scale=10, size=50)
group_b = np.random.normal(loc=82, scale=10, size=50)

# t-тест независимых выборок
t, p = stats.ttest_ind(group_a, group_b)
print(f't={t:.3f}, p={p:.4f}, значимо={p<0.05}')

# Shapiro-Wilk: нормальность
stat, p_norm = stats.shapiro(group_a)
print(f'Shapiro: stat={stat:.3f}, p={p_norm:.4f}, нормальное={p_norm>0.05}')

# Pearson корреляция
x = np.random.normal(0, 1, 100)
y = x * 1.5 + np.random.normal(0, 1, 100)
r, p_corr = stats.pearsonr(x, y)
print(f'Pearson r={r:.3f}, p={p_corr:.4f}')`}
 ,{title:'Задача: тесты',xp:20,type:'task',description:`1. Создай 2 группы с разными средними — t-тест — напиши вывод словами (разница значима?)\n2. Проверь нормальность через Shapiro-Wilk для данных из np.random.exponential — результат ожидаемый?\n3. Корреляция Пирсона между двумя признаками датасета (Titanic: Age и Fare) — интерпретируй\n4. Mann-Whitney U (scipy.stats.mannwhitneyu) — когда использовать вместо t-теста?`,code:null}
 ,{title:'Доверительные интервалы',xp:15,type:'code',description:'CI через scipy и bootstrap',code:`import numpy as np
from scipy import stats

np.random.seed(42)
sample = np.random.normal(loc=100, scale=15, size=50)

# Стандартный CI
ci = stats.t.interval(0.95, df=len(sample)-1,
                      loc=np.mean(sample), scale=stats.sem(sample))
print(f'Mean: {np.mean(sample):.2f}')
print(f'95% CI: ({ci[0]:.2f}, {ci[1]:.2f})')

# Bootstrap CI (для любой статистики)
def bootstrap_ci(data, stat_fn=np.mean, n=2000, ci=95):
    boots = [stat_fn(np.random.choice(data, len(data), replace=True)) for _ in range(n)]
    return np.percentile(boots, [(100-ci)/2, 100-(100-ci)/2])

low, high = bootstrap_ci(sample)
print(f'Bootstrap 95% CI: ({low:.2f}, {high:.2f})')

med_low, med_high = bootstrap_ci(sample, np.median)
print(f'Bootstrap CI медианы: ({med_low:.2f}, {med_high:.2f})')`}
 ,{title:'Задача: CI',xp:20,type:'task',description:`1. Для выборки Normal(200, 30) n=50 — вычисли 90%, 95%, 99% CI. Как меняется ширина?\n2. Bootstrap CI для медианы — сравни с CI для среднего на скошенных данных (np.random.exponential)\n3. Как меняется ширина 95% CI при n=30, 100, 500, 1000? Нарисуй график ширины vs n\n4. CI = (92.5, 107.5) для среднего балла — что это означает? Можешь ли сказать что истинное среднее = 100?`,code:null}
]}

// ML PRACTICE
);
