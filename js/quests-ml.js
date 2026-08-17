QUESTS.push(
// ---- ML ----
{id:'ml1',trackId:'ml',title:'Что такое ML',emoji:'🤖',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'ML — подраздел ИИ, где модели учатся на данных без явного программирования правил.\n\nТри вида:\n• Supervised — есть метки (классификация, регрессия)\n• Unsupervised — нет меток (кластеризация)\n• Reinforcement — агент + среда\n\nКлючевые термины:\n• Feature — входная переменная X\n• Label/target — что предсказываем Y\n• Обучающая выборка — для обучения\n• Тестовая выборка — для оценки\n• Overfitting — запомнил обучение, плохо обобщает\n• Underfitting — модель слишком простая\n\nПрочитай: sklearn "Getting Started" (15 мин)',code:null},
  {title:'Код',xp:15,type:'code',description:'Набери руками:',code:`from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.tree import DecisionTreeClassifier\nfrom sklearn.metrics import accuracy_score\n\nX,y = load_iris(return_X_y=True)\nX_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42)\nmodel = DecisionTreeClassifier()\nmodel.fit(X_train,y_train)\npreds = model.predict(X_test)\nprint(f"Accuracy: {accuracy_score(y_test,preds):.2%}")`},
  {title:'Задача',xp:20,type:'task',description:'Возьми любой CSV с числовыми колонками.\n1. Загрузи через pandas\n2. Выбери 2-3 признака\n3. Обучи DecisionTreeClassifier\n4. Выведи accuracy\n5. Попробуй разные test_size и сравни результаты',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Чем supervised отличается от unsupervised?\n2. Что такое overfitting?\n3. Зачем нужна тестовая выборка?\n4. Что такое feature?',code:null}
]},
{id:'ml2',trackId:'ml',title:'Gradient Descent',emoji:'⛰️',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'Gradient Descent — алгоритм оптимизации. Ищет минимум функции потерь.\n\nФормула: w = w - lr × ∂L/∂w\n\n• lr (learning rate) — размер шага\n• ∂L/∂w — градиент (скорость роста ошибки по w)\n• Эпоха — один проход по данным\n• Batch GD — на всех данных\n• Stochastic GD — на 1 примере\n• Mini-batch — на батче\n\nПосмотри визуализацию gradient descent на YouTube (10 мин)',code:null},
  {title:'Код',xp:15,type:'code',description:'Набери руками:',code:`import numpy as np, matplotlib.pyplot as plt\n\nnp.random.seed(42)\nX = np.random.randn(100)\ny = 3*X + 2 + np.random.randn(100)*0.5\n\ndef gradient_descent(X,y,lr=0.01,epochs=200):\n    w,b = 0.0,0.0\n    losses = []\n    for _ in range(epochs):\n        y_pred = w*X+b\n        loss = np.mean((y_pred-y)**2)\n        losses.append(loss)\n        dw = 2*np.mean((y_pred-y)*X)\n        db = 2*np.mean(y_pred-y)\n        w -= lr*dw; b -= lr*db\n    return w,b,losses\n\nw,b,losses = gradient_descent(X,y)\nprint(f"w={w:.2f} (~3), b={b:.2f} (~2)")\nplt.plot(losses); plt.title("Loss"); plt.show()`},
  {title:'Задача',xp:20,type:'task',description:'Модифицируй код:\n1. Попробуй lr=0.1, 0.001, 1.0\n2. Нарисуй 3 кривые loss на одном графике\n3. Выведи финальные w и b для каждого lr\n4. Запиши: какой lr как себя ведёт?',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Что такое градиент в контексте обучения?\n2. Почему нельзя взять lr=100?\n3. Чем Batch GD отличается от Stochastic?',code:null}
]},
{id:'ml3',trackId:'ml',title:'Linear Regression',emoji:'📈',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'Линейная регрессия предсказывает непрерывное значение:\nŷ = w₁x₁ + w₂x₂ + ... + b\n\nОбучается минимизацией MSE.\n\nМетрики:\n• MAE — среднее |y-ŷ|, интерпретируемо\n• RMSE — √MSE, чувствительнее к выбросам\n• R² — доля объяснённой дисперсии (1 = идеально)\n\nПредположения: линейность, нормальность остатков.\nМультиколлинеарность ухудшает интерпретацию.',code:null},
  {title:'Код',xp:15,type:'code',description:'Набери руками:',code:`from sklearn.linear_model import LinearRegression\nfrom sklearn.metrics import mean_absolute_error,r2_score\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.datasets import fetch_california_housing\nimport pandas as pd\n\ndata = fetch_california_housing(as_frame=True)\nX,y = data.data,data.target\nX_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42)\n\nmodel = LinearRegression().fit(X_train,y_train)\npreds = model.predict(X_test)\nprint(f"MAE: {mean_absolute_error(y_test,preds):.3f}")\nprint(f"R²:  {r2_score(y_test,preds):.3f}")\n\ncoef_df = pd.Series(model.coef_,index=X.columns).sort_values()\nprint("Коэффициенты:\\n",coef_df)`},
  {title:'Задача',xp:20,type:'task',description:'Датасет с числовым таргетом (цена, зарплата):\n1. Удали выбросы (IQR)\n2. Нормализуй (StandardScaler)\n3. Обучи LinearRegression\n4. Выведи R² и MAE\n5. Scatter plot: predicted vs actual',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Чем MAE отличается от RMSE?\n2. Что значит R²=0.65?\n3. Почему мультиколлинеарность мешает?',code:null}
]},
{id:'ml4',trackId:'ml',title:'Logistic Regression',emoji:'🎯',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'Для классификации. Выход через сигмоиду:\nP(y=1) = 1/(1+e^(-z))\n\nМетрики:\n• Accuracy — плохо при дисбалансе!\n• Precision = TP/(TP+FP)\n• Recall = TP/(TP+FN)\n• F1 = 2·P·R/(P+R)\n• ROC-AUC — устойчив к дисбалансу\n\nПараметр C — обратный коэффициент регуляризации.\nМеньше C → сильнее регуляризация.',code:null},
  {title:'Код',xp:15,type:'code',description:'Набери руками:',code:`from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import classification_report,roc_auc_score,ConfusionMatrixDisplay\nfrom sklearn.datasets import load_breast_cancer\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import StandardScaler\nimport matplotlib.pyplot as plt\n\nX,y = load_breast_cancer(return_X_y=True)\nX_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42,stratify=y)\nscaler = StandardScaler()\nX_train = scaler.fit_transform(X_train)\nX_test  = scaler.transform(X_test)\n\nmodel = LogisticRegression(max_iter=1000).fit(X_train,y_train)\nprint(classification_report(y_test,model.predict(X_test)))\nprint(f"ROC-AUC: {roc_auc_score(y_test,model.predict_proba(X_test)[:,1]):.3f}")\nConfusionMatrixDisplay.from_estimator(model,X_test,y_test)\nplt.show()`},
  {title:'Задача',xp:20,type:'task',description:'Датасет с binary target (churn, spam, default):\n1. EDA: баланс классов\n2. LogisticRegression с разными C (0.01, 0.1, 1, 10)\n3. Для каждого C: F1 и ROC-AUC\n4. Выбери лучший C — обоснуй',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Почему accuracy плохая при дисбалансе?\n2. Когда важнее Recall, когда Precision?\n3. Что делает параметр C?',code:null}
]},
{id:'ml5',trackId:'ml',title:'Decision Trees',emoji:'🌳',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'Дерево делит пространство рекурсивными сплитами.\n\nКритерии сплита:\n• Gini: 1 - Σpᵢ²\n• Entropy: -Σpᵢlog₂(pᵢ)\n\nГиперпараметры:\n• max_depth — ключевой для борьбы с overfitting\n• min_samples_split, min_samples_leaf\n• max_features\n\nПлюсы: интерпретируемость, не нужна нормализация.\nМинусы: склонно к overfitting.',code:null},
  {title:'Код',xp:15,type:'code',description:'Набери руками:',code:`from sklearn.tree import DecisionTreeClassifier,plot_tree\nfrom sklearn.model_selection import train_test_split,cross_val_score\nfrom sklearn.datasets import load_wine\nimport matplotlib.pyplot as plt\n\nX,y = load_wine(return_X_y=True,as_frame=True)\nX_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42,stratify=y)\n\nfor depth in [None,3,5]:\n    model = DecisionTreeClassifier(max_depth=depth,random_state=42)\n    cv = cross_val_score(model,X_train,y_train,cv=5).mean()\n    model.fit(X_train,y_train)\n    print(f"depth={depth}: CV={cv:.3f}, test={model.score(X_test,y_test):.3f}")\n\nbest = DecisionTreeClassifier(max_depth=3,random_state=42).fit(X_train,y_train)\nplt.figure(figsize=(20,8))\nplot_tree(best,feature_names=X.columns,class_names=load_wine().target_names,filled=True,rounded=True)\nplt.show()`},
  {title:'Задача',xp:20,type:'task',description:'На своём датасете:\n1. Обучи DecisionTree с max_depth 1-15\n2. График: train_score vs val_score по глубине\n3. Найди точку overfitting (train >> val)\n4. Выбери оптимальный max_depth\n5. feature_importances — какой признак важнее всего?',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Как Gini помогает делать сплиты?\n2. Почему глубокое дерево переобучается?\n3. Почему деревьям не нужна нормализация?',code:null}
]},
{id:'ml6',trackId:'ml',title:'Random Forest',emoji:'🌲',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'Random Forest = ансамбль деревьев через Bagging.\n\n1. Bootstrap sample из N строк\n2. Обучаем дерево, используя √p признаков в каждом сплите\n3. Предсказание = majority vote или среднее\n\nПочему работает: деревья слабо коррелированы → ошибки усредняются.\n\nКлючевые параметры:\n• n_estimators — количество деревьев\n• max_features — "sqrt"\n• max_depth, min_samples_leaf\n• n_jobs=-1 — параллелизм\n• oob_score=True — оценка без отдельного val',code:null},
  {title:'Код',xp:15,type:'code',description:'Набери руками:',code:`from sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.datasets import load_breast_cancer\nimport pandas as pd, matplotlib.pyplot as plt\n\nX,y = load_breast_cancer(return_X_y=True,as_frame=True)\nX_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42,stratify=y)\n\nrf = RandomForestClassifier(n_estimators=200,oob_score=True,n_jobs=-1,random_state=42)\nrf.fit(X_train,y_train)\nprint(f"Test: {rf.score(X_test,y_test):.3f}, OOB: {rf.oob_score_:.3f}")\n\nfi = pd.Series(rf.feature_importances_,index=X.columns).sort_values(ascending=False)\nfi.head(10).plot(kind='bar',title='Top Feature Importances')\nplt.tight_layout(); plt.show()`},
  {title:'Задача',xp:20,type:'task',description:'На своём датасете:\n1. Сравни RF с n_estimators=10, 50, 100, 300 (CV-score + время)\n2. График: accuracy vs n_estimators\n3. RF vs DecisionTree (лучший) по CV-score\n4. Топ-5 важнейших признаков',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Что такое bagging?\n2. Почему ограничиваем max_features?\n3. Что такое OOB score?',code:null}
]},
{id:'ml7',trackId:'ml',title:'XGBoost / LightGBM',emoji:'⚡',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'Gradient Boosting строит ансамбль последовательно: каждое дерево учится на остатках предыдущего.\n\nXGBoost: регуляризация L1/L2, ранняя остановка.\nLightGBM: Leaf-wise рост → быстрее на больших данных.\n\nКлючевые параметры:\n• n_estimators + early_stopping_rounds!\n• learning_rate (0.01-0.3)\n• max_depth / num_leaves\n• subsample, colsample_bytree\n• reg_alpha, reg_lambda\n\nПрактика: всегда используй early_stopping!',code:null},
  {title:'Код',xp:15,type:'code',description:'pip install xgboost lightgbm, затем набери:',code:`import xgboost as xgb, lightgbm as lgb\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.metrics import roc_auc_score\nfrom sklearn.datasets import load_breast_cancer\n\nX,y = load_breast_cancer(return_X_y=True)\nX_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42,stratify=y)\nX_tr,X_val,y_tr,y_val = train_test_split(X_train,y_train,test_size=0.2,random_state=42)\n\nxgb_model = xgb.XGBClassifier(n_estimators=1000,learning_rate=0.05,max_depth=4,subsample=0.8,colsample_bytree=0.8,eval_metric='logloss',early_stopping_rounds=20,verbosity=0,random_state=42)\nxgb_model.fit(X_tr,y_tr,eval_set=[(X_val,y_val)],verbose=False)\nprint(f"XGB AUC: {roc_auc_score(y_test,xgb_model.predict_proba(X_test)[:,1]):.4f}, iter={xgb_model.best_iteration}")\n\nlgb_model = lgb.LGBMClassifier(n_estimators=1000,learning_rate=0.05,num_leaves=31,subsample=0.8,random_state=42,verbose=-1)\nlgb_model.fit(X_tr,y_tr,eval_set=[(X_val,y_val)],callbacks=[lgb.early_stopping(20,verbose=False)])\nprint(f"LGB AUC: {roc_auc_score(y_test,lgb_model.predict_proba(X_test)[:,1]):.4f}")`},
  {title:'Задача',xp:20,type:'task',description:'На своём датасете:\n1. Обучи LightGBM с early stopping\n2. Сравни с RF и LogReg по ROC-AUC\n3. Feature importance из LGB\n4. lr=0.01 vs lr=0.3 — как меняется best_iteration?\n5. Какая модель выиграла и почему?',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Чем boosting отличается от bagging?\n2. Зачем early_stopping?\n3. Почему LGB быстрее XGB на больших данных?',code:null}
]},
{id:'ml8',trackId:'ml',title:'Feature Engineering',emoji:'🔧',isBoss:false,steps:[
  {title:'Теория',xp:10,type:'theory',description:'Создание и преобразование признаков.\n\nНормализация:\n• StandardScaler — z-score\n• MinMaxScaler — 0..1\n• RobustScaler — устойчив к выбросам\n\nКодирование категорий:\n• OrdinalEncoder — есть порядок\n• OneHotEncoder — порядка нет\n• TargetEncoder — осторожно с leakage!\n\nНовые признаки:\n• pd.cut/qcut — бинаризация\n• log1p — для скошенных\n• groupby агрегаты — статистики по группе\n• datetime: час, день недели, месяц\n\nPipeline = нет leakage данных.',code:null},
  {title:'Код',xp:15,type:'code',description:'Набери руками:',code:`import pandas as pd, numpy as np\nfrom sklearn.pipeline import Pipeline\nfrom sklearn.compose import ColumnTransformer\nfrom sklearn.preprocessing import StandardScaler,OneHotEncoder\nfrom sklearn.impute import SimpleImputer\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.model_selection import cross_val_score\n\nnp.random.seed(42); n=500\ndf = pd.DataFrame({'age':np.random.randint(18,70,n).astype(float),'salary':np.random.exponential(50000,n),'city':np.random.choice(['Moscow','SPb','Kazan',None],n),'has_car':np.random.choice(['yes','no',None],n),'target':np.random.randint(0,2,n)})\ndf.loc[df.sample(50).index,'age'] = np.nan\n\nX = df.drop('target',axis=1); y = df['target']\nnum_pipe = Pipeline([('impute',SimpleImputer(strategy='median')),('scale',StandardScaler())])\ncat_pipe = Pipeline([('impute',SimpleImputer(strategy='most_frequent')),('ohe',OneHotEncoder(handle_unknown='ignore',sparse_output=False))])\npreprocessor = ColumnTransformer([('num',num_pipe,['age','salary']),('cat',cat_pipe,['city','has_car'])])\nfull_pipe = Pipeline([('prep',preprocessor),('model',RandomForestClassifier(n_estimators=100,random_state=42))])\n\nscores = cross_val_score(full_pipe,X,y,cv=5,scoring='roc_auc')\nprint(f"CV ROC-AUC: {scores.mean():.3f} ± {scores.std():.3f}")`},
  {title:'Задача',xp:20,type:'task',description:'На своём датасете:\n1. Pipeline с категориальными + числовыми колонками\n2. Минимум 2 новых признака (произведение, log1p, или из даты)\n3. CV-score до и после новых признаков\n4. Если есть группировки — groupby агрегат как признак\n5. Запиши: какие признаки улучшили модель?',code:null},
  {title:'Recall',xp:10,type:'recall',description:'За 2 минуты:\n1. Зачем Pipeline?\n2. Когда RobustScaler вместо StandardScaler?\n3. Что такое target leakage?',code:null}
]},
{id:'ml9',trackId:'ml',title:'Churn End-to-End',emoji:'⚔️',isBoss:true,steps:[
  {title:'Теория',xp:50,type:'theory',description:'⚔️ ФИНАЛЬНЫЙ БОСС ML\n\nChurn prediction — классический ML-проект аналитика.\n\nПолный pipeline: EDA → очистка → фичи → модель → метрики → выводы\n\nВажно:\n• Дисбаланс классов (~80/20) → stratify, F1/AUC\n• Test не трогаем до финала!\n• Business impact: верно классифицированный churner = сэкономленные деньги\n\nДатасет: Telco Customer Churn (Kaggle). Подсказок в коде нет.',code:null},
  {title:'Код',xp:60,type:'code',description:'🚫 Подсказок нет. Напиши весь pipeline:\n1. Загрузи датасет\n2. EDA: shape, dtypes, nulls, target distribution, 3+ наблюдения\n3. Очисти данные\n4. Feature engineering: 3+ новых признака\n5. Train/val/test split\n6. Pipeline с препроцессингом\n7. Обучи 3 модели: LogReg, RF, LGB\n\nУдачи.',code:null},
  {title:'Задача',xp:60,type:'task',description:'🚫 Без подсказок:\n1. Метрики каждой модели на val: Precision, Recall, F1, ROC-AUC\n2. Выбери лучшую — объясни\n3. Финальная оценка на TEST (один раз!)\n4. Confusion matrix\n5. Feature importance топ-10\n6. Бизнес-вывод: какой тип клиентов чаще уходит?',code:null},
  {title:'Recall',xp:30,type:'recall',description:'⚔️ Финальный экзамен за 5 минут:\n1. Шаги ML-проекта и зачем каждый?\n2. Почему выбрал именно эту метрику?\n3. Что сделал бы иначе?\n4. Что изучишь в CV?',code:null}
]},
{id:'ml-p1',trackId:'ml',practice:true,emoji:'⚡',title:'sklearn Pipeline',steps:[
  {title:'Pipeline основы',xp:15,type:'code',description:'Строим ML pipeline без data leakage',code:`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score

X, y = make_classification(n_samples=1000, n_features=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Pipeline: scaler.fit только на train — нет data leakage!
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  LogisticRegression(max_iter=1000))
])
pipe.fit(X_train, y_train)
print(f'Test accuracy: {pipe.score(X_test, y_test):.4f}')

# Cross-validation с Pipeline
cv_scores = cross_val_score(pipe, X, y, cv=5, scoring='f1')
print(f'CV F1: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}')`}
 ,{title:'Задача: Pipeline',xp:20,type:'task',description:`1. Pipeline: StandardScaler → LogisticRegression — accuracy на make_classification(weights=[0.7,0.3])\n2. Замени LogReg на RandomForestClassifier — сравни CV F1\n3. ColumnTransformer: числовые → StandardScaler, категориальные → OneHotEncoder (придумай датасет с обоими типами)\n4. Сохрани pipeline через joblib.dump и загрузи — убедись predict совпадают`,code:null}
 ,{title:'GridSearchCV',xp:15,type:'code',description:'Подбор гиперпараметров',code:`from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_classification
import numpy as np

X, y = make_classification(n_samples=600, n_features=10, random_state=42)

pipe = Pipeline([('sc', StandardScaler()), ('rf', RandomForestClassifier(random_state=42))])

# GridSearchCV — полный перебор
param_grid = {'rf__n_estimators':[50,100], 'rf__max_depth':[None,5,10]}
grid = GridSearchCV(pipe, param_grid, cv=3, scoring='f1', n_jobs=-1)
grid.fit(X, y)
print(f'Best params: {grid.best_params_}')
print(f'Best F1:     {grid.best_score_:.4f}')

# RandomizedSearchCV — случайная выборка
from scipy.stats import randint
param_dist = {'rf__n_estimators': randint(50,300), 'rf__max_depth': randint(3,20)}
rnd = RandomizedSearchCV(pipe, param_dist, n_iter=10, cv=3, scoring='f1', random_state=42)
rnd.fit(X, y)
print(f'Random best F1: {rnd.best_score_:.4f}')`}
 ,{title:'Задача: GridSearch',xp:20,type:'task',description:`1. GridSearch на LogisticRegression: C=[0.01,0.1,1,10], solver=['lbfgs','liblinear'] — лучшие params\n2. RandomizedSearchCV на RandomForest: n_iter=20 — сравни время с полным GridSearch\n3. График: CV F1 vs n_estimators (10,50,100,200,500) для RandomForest без GridSearch\n4. Сравни: Pipeline (scaler+model) в GridSearch vs модель без scaler — отличается best score?`,code:null}
]},
{id:'ml-p2',trackId:'ml',practice:true,emoji:'⚡',title:'Метрики и оценка моделей',steps:[
  {title:'Метрики классификации',xp:15,type:'code',description:'Все метрики + когда что использовать',code:`from sklearn.metrics import (accuracy_score, precision_score, recall_score,
    f1_score, roc_auc_score, confusion_matrix, classification_report)
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

# Дисбаланс классов — типичная ситуация
X, y = make_classification(n_samples=1000, n_features=10,
                           weights=[0.8, 0.2], random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
rf = RandomForestClassifier(random_state=42).fit(X_tr, y_tr)
y_pred = rf.predict(X_te)
y_prob = rf.predict_proba(X_te)[:,1]

print(f'Accuracy:  {accuracy_score(y_te, y_pred):.4f}  ← обманывает при дисбалансе!')
print(f'Precision: {precision_score(y_te, y_pred):.4f}')
print(f'Recall:    {recall_score(y_te, y_pred):.4f}')
print(f'F1:        {f1_score(y_te, y_pred):.4f}')
print(f'ROC-AUC:   {roc_auc_score(y_te, y_prob):.4f}')
print()
print(classification_report(y_te, y_pred))
print(confusion_matrix(y_te, y_pred))`}
 ,{title:'Задача: метрики',xp:20,type:'task',description:`Используй датасет с дисбалансом weights=[0.9,0.1].\n1. Обучи LogisticRegression — выведи все 5 метрик и объясни почему accuracy обманывает\n2. Измени порог: y_pred = (y_prob > 0.3) — как меняются precision/recall?\n3. Найди оптимальный порог при threshold = [0.2,0.3,0.4,0.5,0.6,0.7] — максимизируй F1\n4. Confusion matrix: посчитай FP и FN — какой тип ошибки хуже для fraud detection?`,code:null}
 ,{title:'Регрессионные метрики',xp:15,type:'code',description:'RMSE, MAE, R², MAPE',code:`from sklearn.metrics import mean_squared_error, mean_absolute_error, r2_score
from sklearn.linear_model import LinearRegression, Ridge, Lasso
from sklearn.datasets import make_regression
from sklearn.model_selection import train_test_split
import numpy as np

X, y = make_regression(n_samples=500, n_features=5, noise=30, random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)

for name, model in [('LinearReg', LinearRegression()),
                    ('Ridge a=10', Ridge(alpha=10)),
                    ('Lasso a=1',  Lasso(alpha=1))]:
    model.fit(X_tr, y_tr)
    yp = model.predict(X_te)
    rmse = mean_squared_error(y_te, yp)**0.5
    mae  = mean_absolute_error(y_te, yp)
    r2   = r2_score(y_te, yp)
    mape = np.mean(np.abs((y_te - yp) / (np.abs(y_te)+1e-8))) * 100
    print(f'{name:12}: RMSE={rmse:.1f}  MAE={mae:.1f}  R²={r2:.4f}  MAPE={mape:.1f}%')`}
 ,{title:'Задача: регрессия',xp:20,type:'task',description:`1. make_regression с noise=5 и noise=100 — как меняются RMSE и R²? Объясни разницу\n2. Scatter plot: predicted vs actual — что значит если точки далеко от диагонали y=x?\n3. Загрузи BostonHousing.csv — сравни RMSE для LinearReg, Ridge(α=1,10,100), Lasso(α=0.1,1)\n4. Когда MAE лучше RMSE? Когда RMSE лучше? Ответ проиллюстрируй данными с выбросами`,code:null}
]}

// CV PRACTICE
);
