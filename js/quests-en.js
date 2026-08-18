// QUESTS — ENGLISH TRANSLATIONS
// ============================================================
const QUESTS_EN={
py1:{title:'Syntax & Data Types',steps:[
  {title:'Theory',d:'Python types: int, float, str, bool, None. Operators: /, //, %, **. String slicing [start:stop:step]. f-strings format.'},
  {title:'Code',d:'Run the examples: variables, arithmetic, string operations, type conversion, f-strings.',c:`# Types and operations
x = 42
name = "Alice"
pi = 3.14
is_analyst = True

print(type(x))          # <class 'int'>
print(f"Hello, {name}! x={x}, pi={pi:.2f}")

# String operations
text = "  Data Science  "
print(text.strip().lower())   # "data science"
words = "sql,python,ml".split(",")
print(" | ".join(words))       # "sql | python | ml"

# Conditions
if x > 10 and is_analyst:
    print("Senior analyst")
elif x > 0:
    print("Junior")
else:
    print("Something went wrong")`},
  {title:'Task: describe() function',d:'Write describe(x) that:\n1. Prints type(x)\n2. If number: abs(x), x**2, round(x,2)\n3. If string: len(x), x.upper(), x[::-1]\n4. If list: len(x), min(x), max(x), sum(x)'},
  {title:'Recall',d:'1. Main Python data types?\n2. Difference between / and //?\n3. How does string slicing [1:4] work?\n4. Why use f-strings over concatenation?'}
]},
py2:{title:'Lists & Tuples',steps:[
  {title:'Theory',d:'list — mutable, tuple — immutable. list.sort() vs sorted(). List comprehensions. Unpacking.'},
  {title:'Code',d:'Run examples: create, index, slice, append, sort, comprehension, unpack.',c:`# Working with a list
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

# Basic operations
print(f"Length: {len(numbers)}")
print(f"First: {numbers[0]}, last: {numbers[-1]}")
print(f"Slice [2:5]: {numbers[2:5]}")

# Modification
numbers.append(7)
numbers.insert(0, 0)
numbers.pop()

# Sorting
print(sorted(numbers))         # new list
numbers.sort(reverse=True)     # in-place
print(numbers)

# List comprehension
squares = [x**2 for x in range(1, 6)]
evens   = [x for x in numbers if x % 2 == 0]
print(squares, evens)

# Tuple
point = (10, 20)
x, y = point  # unpacking
print(f"x={x}, y={y}")`},
  {title:'Task: random numbers',d:'1. Create list of 10 random floats between 0 and 1\n2. Sort ascending and descending\n3. Filter: only values > 0.5\n4. List comprehension: square each value, keep if > 0.3'},
  {title:'Recall',d:'1. list vs tuple — when to use each?\n2. list.sort() vs sorted() — difference?\n3. When to use list comprehension vs for loop?\n4. How does unpacking work: a, b = (1, 2)?'}
]},
py3:{title:'Dicts & Sets',steps:[
  {title:'Theory',d:'dict: key-value, O(1) lookup. set: unique values, O(1) membership. Hash tables explained.'},
  {title:'Code',d:'Run: dict create/get/update, defaultdict, Counter, set operations (|, &, -, ^).',c:`# Dict — word counter
text = "python sql python ml python sql data"
word_count = {}
for word in text.split():
    word_count[word] = word_count.get(word, 0) + 1
print(word_count)
# → {'python': 3, 'sql': 2, 'ml': 1, 'data': 1}

# More Pythonic:
from collections import Counter
print(Counter(text.split()))

# Dict comprehension
squared = {k: v**2 for k, v in {'a': 1, 'b': 2, 'c': 3}.items()}
print(squared)

# Set — unique values
skills_1 = {'python', 'sql', 'excel', 'tableau'}
skills_2 = {'python', 'ml', 'sql', 'pytorch'}

print("Common:", skills_1 & skills_2)
print("All:", skills_1 | skills_2)
print("Only in first:", skills_1 - skills_2)

# Membership check O(1)
print('python' in skills_1)  # True`},
  {title:'Task: group_by function',d:'Write group_by(data, key_fn) that:\n1. Takes a list and a function\n2. Returns dict: key → [items with that key]\n3. Example: group_by([1,2,3,4], lambda x: x%2) → {0:[2,4], 1:[1,3]}\n4. Use it to group people by first letter of name'},
  {title:'Recall',d:'1. dict.get(k, default) vs dict[k] — difference?\n2. When to use set vs list?\n3. Why is dict lookup O(1)?\n4. Counter vs defaultdict — when to use each?'}
]},
py4:{title:'Functions & Closures',steps:[
  {title:'Theory',d:'*args, **kwargs. Default arguments. Closures: inner function captures outer variable. Decorators: wrap a function.'},
  {title:'Code',d:'Run: functions with *args/**kwargs, closures (counter, make_multiplier), simple decorator (@timer).',c:`# Basic function with default argument
def calculate_stats(data, include_std=False):
    n = len(data)
    mean = sum(data) / n
    result = {'mean': mean, 'min': min(data), 'max': max(data)}
    if include_std:
        variance = sum((x - mean)**2 for x in data) / n
        result['std'] = variance ** 0.5
    return result

data = [2, 4, 6, 8, 10, 12]
print(calculate_stats(data))
print(calculate_stats(data, include_std=True))

# *args and **kwargs
def log(*args, **kwargs):
    prefix = kwargs.get('prefix', 'INFO')
    print(f"[{prefix}]", *args)

log("Request", "done")
log("Error", prefix="ERROR")

# Lambda + sorted
users = [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 20}, {'name': 'Carol', 'age': 30}]
by_age = sorted(users, key=lambda u: u['age'])
print([u['name'] for u in by_age])

# Closure
def make_counter(start=0):
    count = [start]
    def increment(step=1):
        count[0] += step
        return count[0]
    return increment

counter = make_counter()
print(counter())    # 1
print(counter(5))   # 6`},
  {title:'Task: moving_average + @timer',d:'1. moving_average(data, window) → list of rolling averages\n2. Test with data = [1,2,3,4,5,6,7,8,9,10], window=3\n3. @timer decorator: prints execution time of any function\n4. Apply @timer to moving_average and call with 1000 values'},
  {title:'Recall',d:'1. What is a closure? Give an example\n2. *args vs **kwargs — difference?\n3. How does a decorator work?\n4. Mutable default argument trap — what is it?'}
]},
py5:{title:'OOP Basics',steps:[
  {title:'Theory',d:'class, __init__, self. Inheritance. __str__, __repr__. @property. @classmethod.'},
  {title:'Code',d:'Run: create Animal/Dog classes, inheritance, override __str__, use @property.',c:`class Dataset:
    def __init__(self, name, data):
        self.name = name
        self._data = data      # protected
        self._stats = None     # stats cache

    def __len__(self):
        return len(self._data)

    def __repr__(self):
        return f"Dataset('{self.name}', n={len(self)})"

    @property
    def stats(self):
        if self._stats is None:  # computed once
            n = len(self._data)
            mean = sum(self._data) / n
            self._stats = {
                'n': n, 'mean': round(mean, 2),
                'min': min(self._data), 'max': max(self._data)
            }
        return self._stats

    def filter(self, predicate):
        filtered = [x for x in self._data if predicate(x)]
        return Dataset(f"{self.name}_filtered", filtered)


class TimeSeriesDataset(Dataset):
    def __init__(self, name, data, timestamps):
        super().__init__(name, data)
        self.timestamps = timestamps

    def latest(self, n=5):
        return list(zip(self.timestamps[-n:], self._data[-n:]))


ds = Dataset("sales", [10, 25, 5, 30, 15, 20])
print(ds)
print(ds.stats)
positive = ds.filter(lambda x: x > 15)
print(positive.stats)`},
  {title:'Task: MLModel class',d:'1. class MLModel with: name, version, accuracy attributes\n2. Method train(data) — prints "Training name v.version"\n3. Method predict(x) — returns x * accuracy\n4. __str__ showing all attributes\n5. Create 2 instances, compare accuracies'},
  {title:'Recall',d:'1. What does self mean in Python?\n2. Difference between class and instance attributes?\n3. When to use @property?\n4. How does inheritance work?'}
]},
py6:{title:'⚔️ BOSS: Algorithms',steps:[
  {title:'Theory',d:'Time complexity: O(1), O(n), O(n²), O(log n). Binary search. Sorting: bubble, merge, quick. Big-O in Python operations.'},
  {title:'Code',d:'Run: binary_search, bubble_sort, merge_sort, measure execution time for O(n) vs O(n²).'},
  {title:'Task: O(n) vs O(n²)',d:'1. Implement linear search O(n) and binary search O(log n)\n2. Measure time for n=100, 1000, 10000, 100000\n3. Plot time vs n for both\n4. Implement your own merge_sort and time it vs Python sorted()'},
  {title:'Recall',d:'1. O(1) vs O(n) vs O(n²) — explain with examples\n2. Why is binary search O(log n)?\n3. Python list.append() complexity?\n4. When is O(n²) acceptable?'}
]},
sql1:{title:'SELECT, WHERE, ORDER BY',steps:[
  {title:'Theory',d:'Basic SQL: SELECT, FROM, WHERE, ORDER BY, LIMIT, DISTINCT. Comparison operators, LIKE, IN, BETWEEN, IS NULL.'},
  {title:'Code',d:'Run: SELECT with filters, LIKE, IN, ORDER BY, LIMIT against the sample DB (users, orders, departments).',c:`-- Create table (SQLite/PostgreSQL)
CREATE TABLE employees (
    id INTEGER PRIMARY KEY,
    name TEXT,
    department TEXT,
    salary NUMERIC,
    hire_date DATE,
    manager_id INTEGER
);

INSERT INTO employees VALUES
(1, 'Alice',  'Analytics', 120000, '2022-03-15', NULL),
(2, 'Bob',    'Analytics', 95000,  '2023-01-10', 1),
(3, 'Carol',  'ML',        150000, '2021-06-01', NULL),
(4, 'David',  'ML',        130000, '2022-09-20', 3),
(5, 'Eve',    'Analytics', 85000,  '2023-07-05', 1),
(6, 'Frank',  'Product',   110000, '2022-11-30', NULL);

-- Query 1: analysts with salary > 90000
SELECT name, salary, hire_date
FROM employees
WHERE department = 'Analytics' AND salary > 90000
ORDER BY salary DESC;

-- Query 2: aliases
SELECT
    name,
    salary,
    salary * 12 AS annual_salary,
    ROUND(salary / 1000.0, 1) AS salary_k
FROM employees
WHERE hire_date >= '2022-01-01'
ORDER BY annual_salary DESC;`},
  {title:'Task: 5 queries',d:'Using users(id,name,age,city,salary,dept_id,join_date):\n1. All users from London ordered by salary DESC\n2. Users aged 25-35 (BETWEEN)\n3. Users in Engineering or Sales (JOIN with departments)\n4. Names starting with A or B (LIKE)\n5. Top 5 highest-paid (LIMIT)'},
  {title:'Recall',d:'1. WHERE vs HAVING — difference?\n2. LIKE syntax for "starts with A"?\n3. How does ORDER BY work with NULL values?\n4. What does DISTINCT do?'}
]},
sql2:{title:'GROUP BY & Aggregations',steps:[
  {title:'Theory',d:'COUNT, SUM, AVG, MIN, MAX. GROUP BY groups rows. HAVING filters groups. Aggregation happens after WHERE.'},
  {title:'Code',d:'Run: GROUP BY with COUNT/AVG, LEFT JOIN + GROUP BY, HAVING filter. See department statistics.',c:`-- Department statistics
SELECT
    department,
    COUNT(*) AS headcount,
    ROUND(AVG(salary), 0) AS avg_salary,
    MIN(salary) AS min_salary,
    MAX(salary) AS max_salary,
    SUM(salary) AS total_payroll
FROM employees
GROUP BY department
ORDER BY avg_salary DESC;

-- HAVING: departments with > 1 employee
SELECT
    department,
    COUNT(*) AS cnt,
    AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- Combo: WHERE + GROUP BY + HAVING
SELECT
    department,
    COUNT(*) AS senior_count
FROM employees
WHERE hire_date < '2023-01-01'
GROUP BY department
HAVING COUNT(*) >= 2;`},
  {title:'Task: salary analytics',d:'1. Number of employees per city (ORDER BY count DESC)\n2. Average salary per department (JOIN with departments table)\n3. Total order amount per product (orders table)\n4. Departments where average salary > 85000 (HAVING)\n5. City with the highest average age'},
  {title:'Recall',d:'1. ORDER of SQL clauses: SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY?\n2. Can you use WHERE after GROUP BY?\n3. COUNT(*) vs COUNT(column) — difference?\n4. LEFT JOIN vs INNER JOIN result difference?'}
]},
sql3:{title:'JOIN Types',steps:[
  {title:'Theory',d:'INNER, LEFT, RIGHT, FULL OUTER JOIN. Self JOIN. Multiple JOINs in one query.'},
  {title:'Code',d:'Run: all JOIN types on users/departments/orders, multi-table JOIN, check NULL results in LEFT JOIN.',c:`CREATE TABLE departments (
    id TEXT PRIMARY KEY,
    full_name TEXT,
    budget INTEGER,
    location TEXT
);

INSERT INTO departments VALUES
('Analytics', 'Data Analytics Team', 500000, 'Berlin'),
('ML', 'Machine Learning Team', 800000, 'London'),
('Product', 'Product Management', 300000, 'Berlin');

-- INNER JOIN
SELECT e.name, e.salary, d.full_name, d.location
FROM employees e
INNER JOIN departments d ON e.department = d.id
ORDER BY e.salary DESC;

-- LEFT JOIN: all employees
SELECT e.name, e.department, d.full_name, d.budget
FROM employees e
LEFT JOIN departments d ON e.department = d.id;

-- SELF JOIN: employee + manager
SELECT
    e.name AS employee,
    e.salary,
    m.name AS manager,
    m.salary AS manager_salary
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;`},
  {title:'Task: complex JOINs',d:'1. All users with their department name (even if no department)\n2. Departments with 0 users (LEFT JOIN + WHERE user IS NULL)\n3. Each user: their department + total orders count\n4. Users who placed orders in the last month (JOIN with orders)'},
  {title:'Recall',d:'1. When does INNER JOIN lose rows vs LEFT JOIN?\n2. How to find records that exist in one table but not another?\n3. What is a self JOIN?\n4. Performance: JOIN on indexed vs unindexed column?'}
]},
sql4:{title:'Window Functions',steps:[
  {title:'Theory',d:'RANK, ROW_NUMBER, DENSE_RANK, LAG, LEAD. PARTITION BY groups the window. SUM/AVG OVER for running totals.'},
  {title:'Code',d:'Run: RANK vs DENSE_RANK, PARTITION BY dept, running SUM, LAG for previous row comparison.',c:`-- ROW_NUMBER, RANK, DENSE_RANK
SELECT
    name, department, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
    RANK()       OVER (ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- PARTITION BY: rank within department
SELECT
    name, department, salary,
    RANK() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank,
    AVG(salary) OVER (PARTITION BY department) AS dept_avg,
    salary - AVG(salary) OVER (PARTITION BY department) AS diff_from_avg
FROM employees;

-- LAG/LEAD
SELECT
    name, hire_date, salary,
    LAG(salary)  OVER (PARTITION BY department ORDER BY hire_date) AS prev_salary,
    LEAD(salary) OVER (PARTITION BY department ORDER BY hire_date) AS next_salary
FROM employees;

-- Running total
SELECT
    name, hire_date, salary,
    SUM(salary) OVER (ORDER BY hire_date) AS running_total
FROM employees
ORDER BY hire_date;`},
  {title:'Task: window tasks',d:'1. Rank users by salary within each city (PARTITION BY city)\n2. Running total of orders by date\n3. Each user: salary vs department average (SUM OVER PARTITION)\n4. LAG: each user and the previous user\'s salary in salary-sort order'},
  {title:'Recall',d:'1. RANK vs DENSE_RANK — when differ?\n2. PARTITION BY vs GROUP BY difference?\n3. When to use LAG instead of a self JOIN?\n4. What does ROWS UNBOUNDED PRECEDING mean?'}
]},
sql5:{title:'⚔️ BOSS: Analytics Report',steps:[
  {title:'Theory',d:'End-to-end analytics: business question → SQL → insight. CTEs for readability. Subqueries. Query optimization thinking.'},
  {title:'Code',d:'Run the full cohort analysis example. Study the WITH clause (CTE), multi-step logic.'},
  {title:'Task: cohort analysis',d:'Full end-to-end SQL report:\n1. Monthly revenue by product (GROUP BY, SUM)\n2. Top 3 users by total spend (CTE + RANK)\n3. Month-over-month growth (LAG on monthly totals)\n4. User retention: joined in month X, ordered in month X+1\n5. Executive summary: 3 key business insights from the data'},
  {title:'Recall',d:'1. What is a CTE and when is it better than a subquery?\n2. How to calculate month-over-month change in SQL?\n3. What is cohort analysis?\n4. How would you optimize a slow GROUP BY query?'}
]},
ds1:{title:'Statistics: Distributions & Hypotheses',steps:[
  {title:'Theory',d:'Mean vs median (outliers!). p-value: probability result is random. Standard deviation = spread. Pearson r correlation.'},
  {title:'Code',d:'Run: compare mean/median on skewed data, compute p-value with scipy, plot histogram + boxplot.',c:`import numpy as np
import scipy.stats as stats
import matplotlib.pyplot as plt

np.random.seed(42)
normal = np.random.normal(loc=50, scale=10, size=1000)
skewed = np.random.exponential(scale=20, size=1000)

for data, name in [(normal,'Normal'),(skewed,'Skewed')]:
    print(f"--- {name} ---")
    print(f"  mean={data.mean():.2f}, median={np.median(data):.2f}")
    print(f"  std={data.std():.2f}, IQR={np.percentile(data,75)-np.percentile(data,25):.2f}")
    print(f"  skewness={stats.skew(data):.2f}")

# t-test
group_a = np.random.normal(50, 10, 100)
group_b = np.random.normal(55, 10, 100)
t_stat, p_value = stats.ttest_ind(group_a, group_b)
print(f"\\nt-test: t={t_stat:.3f}, p={p_value:.4f}")
print("Reject H₀" if p_value < 0.05 else "Fail to reject H₀")`},
  {title:'Task',d:'Using a numeric column from a real dataset:\n1. Compute: mean, median, std, IQR, 5th and 95th percentiles\n2. Histogram + boxplot\n3. Find outliers using 1.5×IQR rule\n4. Split into 2 groups and run t-test\n5. Normal distribution? (Shapiro-Wilk)'},
  {title:'Recall',d:'1. When is median better than mean?\n2. What does p-value mean in plain English?\n3. What does standard deviation show?\n4. What r value means weak negative correlation?'}
]},
ds2:{title:'pandas: Load, Filter, Group',steps:[
  {title:'Theory',d:'DataFrame vs Series. df.info(), df.describe(). Boolean indexing. groupby + agg. fillna vs dropna.'},
  {title:'Code',d:'Run: load CSV, filter rows, create features with assign(), groupby, pivot_table.',c:`import pandas as pd
import numpy as np

np.random.seed(42)
n = 500
df = pd.DataFrame({
    'user_id': range(1,n+1),
    'age': np.random.randint(18,65,n),
    'city': np.random.choice(['London','Berlin','Paris'],n),
    'salary': np.random.exponential(60000,n).astype(int),
    'churn': np.random.choice([0,1],n,p=[0.8,0.2])
})
df.loc[df.sample(50).index,'salary'] = None

print(df.info())
print(df.describe())

# fill missing values
df['salary'] = df['salary'].fillna(df['salary'].median())

# filter
london = df.query('city == "London" and salary > 80000')
print(f"London+high_salary: {len(london)}")

# Grouping
stats = df.groupby('city').agg(
    users=('user_id','count'),
    avg_salary=('salary','mean'),
    churn_rate=('churn','mean')
).round(2)
print(stats)

# New features
df['salary_bin'] = pd.qcut(df['salary'],q=4,labels=['low','mid','high','top'])`},
  {title:'Task',d:'Load a real CSV:\n1. df.info() + df.describe() — describe the dataset\n2. Find and handle missing values (justify fillna vs dropna)\n3. Create 3+ new features with df.assign()\n4. groupby + agg: find an interesting pattern\n5. pivot_table: summary table\n6. Save: df.to_csv("result.csv", index=False)'},
  {title:'Recall',d:'1. df.loc[] vs df.iloc[] — difference?\n2. groupby().transform() vs groupby().agg() — when to use each?\n3. How to handle missing values?\n4. What is a pivot table?'}
]},
ds3:{title:'Visualization: matplotlib & seaborn',steps:[
  {title:'Theory',d:'matplotlib: fig, ax. seaborn: statistical plots. When: histogram (distribution), boxplot (spread+outliers), scatter (correlation), heatmap (correlations).'},
  {title:'Code',d:'Run: histogram, boxplot, scatter, barplot, heatmap, line plot. 2×3 grid layout.'},
  {title:'Task',d:'Create a 6-chart report (2×3 grid):\n1. Histogram of main metric\n2. Boxplot by category\n3. Scatter of two numeric features\n4. Bar chart of top-10 category values\n5. Correlation heatmap\n6. Line plot over time\n\nEach title = insight ("X grows with Y"), not just "Chart of X"'},
  {title:'Recall',d:'1. When histogram vs boxplot?\n2. How to display correlation of 20 features at once?\n3. What does seaborn hue parameter do?\n4. plt.figure() vs plt.subplots() difference?'}
]},
ds4:{title:'EDA Methodology',steps:[
  {title:'Theory',d:'EDA steps: shape/types → missings → distributions → correlations → bivariate → target. run_eda() pattern.'},
  {title:'Code',d:'Run the full run_eda() function. Study each step of the pipeline.',c:`import pandas as pd, numpy as np

def run_eda(df, target_col):
    print("="*50)
    print(f"DATASET: {df.shape[0]} rows, {df.shape[1]} cols")
    print("="*50)
    null_pct = (df.isnull().sum()/len(df)*100).round(1)
    info_df = pd.DataFrame({'dtype':df.dtypes,'null_%':null_pct,'nunique':df.nunique()})
    print("\\n[NULLS]\\n", info_df[info_df['null_%']>0])
    print(f"\\n[DUPLICATES]: {df.duplicated().sum()}")
    print(f"\\n[TARGET '{target_col}']:\\n{df[target_col].value_counts(normalize=True).round(3)}")
    num_cols = df.select_dtypes(include=np.number).columns.tolist()
    if target_col in num_cols: num_cols.remove(target_col)
    print(f"\\n[NUMERIC]\\n{df[num_cols].describe().T[['mean','std','min','max']].round(2)}")
    if df[target_col].dtype in [np.float64,np.int64]:
        corr = df[num_cols].corrwith(df[target_col]).abs().sort_values(ascending=False)
        print(f"\\n[TOP CORRELATIONS]:\\n{corr.head(5)}")

# Run: run_eda(df, 'churn')`},
  {title:'Task',d:'Full EDA on a real dataset:\n1. Run run_eda(df, target)\n2. Bivariate: mean of numeric feature by target classes\n3. Feature with highest correlation to target\n4. Feature with >30% missing — how to handle?\n5. Two features with r>0.8 — what to do?\n6. Write 5 specific observations'},
  {title:'Recall',d:'1. EDA steps in order?\n2. Why look at target distribution first?\n3. How to detect multicollinearity?\n4. What does IQR = 0 mean?'}
]},
ds5:{title:'⚔️ BOSS: EDA Project',steps:[
  {title:'Theory',d:'No hints. Real dataset. Full EDA pipeline from load to business insights.'},
  {title:'Code',d:'No hints. Load, clean, explore. Use everything from DS1-DS4.'},
  {title:'Task',d:'No hints. Write an analytical report:\n1. Executive Summary: 5-7 sentences\n2. Top-3 features most important for target\n3. What additional data is needed?\n4. What ML model would you recommend next?\n5. Data quality issues found?'},
  {title:'Recall',d:'1. Name the full EDA pipeline\n2. How do you handle 3 types of missing values?\n3. What makes a good executive summary?\n4. Which ML model to start with and why?'}
]},
ml1:{title:'What is ML',steps:[
  {title:'Theory',d:'Supervised vs unsupervised vs reinforcement. Overfitting vs underfitting. Train/val/test split. Bias-variance tradeoff.'},
  {title:'Code',d:'Run: train/test split, fit a model, evaluate. See overfitting vs underfitting examples.'},
  {title:'Task',d:'Take any numeric CSV:\n1. Load with pandas\n2. Pick 2-3 features\n3. Train DecisionTreeClassifier\n4. Print accuracy\n5. Try different test_size values and compare'},
  {title:'Recall',d:'1. Supervised vs unsupervised — examples of each?\n2. What is overfitting?\n3. Why do we need a test set?\n4. Bias-variance tradeoff?'}
]},
ml2:{title:'Gradient Descent',steps:[
  {title:'Theory',d:'Loss function. Gradient = direction of steepest ascent. Learning rate: too high → diverge, too low → slow. Epochs.'},
  {title:'Code',d:'Run: implement gradient descent from scratch. Watch loss decrease over iterations.'},
  {title:'Task',d:'Modify the code:\n1. Try lr=0.1, 0.001, 1.0\n2. Plot 3 loss curves on one chart\n3. Print final w and b for each lr\n4. Note: how does each lr behave?'},
  {title:'Recall',d:'1. What does the gradient tell us?\n2. Why can learning rate be too large?\n3. What is a loss function?\n4. When to stop gradient descent?'}
]},
ml3:{title:'Linear Regression',steps:[
  {title:'Theory',d:'y = wX + b. MSE loss. Assumptions: linearity, no multicollinearity, homoscedasticity. R², RMSE.'},
  {title:'Code',d:'Run: sklearn LinearRegression, plot predicted vs actual, check R² and RMSE.',c:`from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error,r2_score
from sklearn.model_selection import train_test_split
from sklearn.datasets import fetch_california_housing
import pandas as pd

data = fetch_california_housing(as_frame=True)
X,y = data.data,data.target
X_train,X_test,y_train,y_test = train_test_split(X,y,test_size=0.2,random_state=42)

model = LinearRegression().fit(X_train,y_train)
preds = model.predict(X_test)
print(f"MAE: {mean_absolute_error(y_test,preds):.3f}")
print(f"R²:  {r2_score(y_test,preds):.3f}")

coef_df = pd.Series(model.coef_,index=X.columns).sort_values()
print("Coefficients:\\n",coef_df)`},
  {title:'Task',d:'Dataset with numeric target (price, salary):\n1. Remove outliers (IQR)\n2. Normalize (StandardScaler)\n3. Train LinearRegression\n4. Print R² and MAE\n5. Scatter: predicted vs actual'},
  {title:'Recall',d:'1. What does R² = 0.85 mean?\n2. When does Linear Regression fail?\n3. Why normalize features?\n4. RMSE vs MAE — when to prefer each?'}
]},
ml4:{title:'Logistic Regression',steps:[
  {title:'Theory',d:'Binary classification. Sigmoid maps to [0,1]. Decision boundary. C parameter (inverse regularization). Metrics: F1, ROC-AUC.'},
  {title:'Code',d:'Run: LogisticRegression, predict_proba, plot ROC curve, confusion matrix.'},
  {title:'Task',d:'Binary target dataset (churn, spam, default):\n1. EDA: class balance\n2. LogisticRegression with C=[0.01, 0.1, 1, 10]\n3. For each C: F1 and ROC-AUC\n4. Pick best C — justify'},
  {title:'Recall',d:'1. Logistic vs Linear Regression — key difference?\n2. What does the C parameter control?\n3. When is F1 better than accuracy?\n4. What is AUC-ROC?'}
]},
ml5:{title:'Decision Trees',steps:[
  {title:'Theory',d:'Split by information gain (Gini/entropy). Depth controls complexity. Deep tree = overfitting. Feature importance.'},
  {title:'Code',d:'Run: DecisionTreeClassifier, visualize tree, plot train vs val accuracy by depth.'},
  {title:'Task',d:'On your dataset:\n1. Train DecisionTree for max_depth 1-15\n2. Plot: train_score vs val_score by depth\n3. Find the overfitting point (train >> val)\n4. Pick optimal max_depth\n5. feature_importances_ — which feature is most important?'},
  {title:'Recall',d:'1. How does a decision tree split?\n2. What is Gini impurity?\n3. Why does max_depth control overfitting?\n4. Decision tree vs linear model — when to use each?'}
]},
ml6:{title:'Random Forest',steps:[
  {title:'Theory',d:'Bagging: train N trees on bootstrap samples. Each split considers random subset of features. Variance reduction. OOB score.'},
  {title:'Code',d:'Run: RandomForestClassifier, compare with single tree, plot feature importance.'},
  {title:'Task',d:'On your dataset:\n1. Compare RF with n_estimators=10,50,100,300 (CV-score + time)\n2. Plot: accuracy vs n_estimators\n3. RF vs best DecisionTree by CV-score\n4. Top-5 most important features'},
  {title:'Recall',d:'1. Why is RF better than a single tree?\n2. What is bagging?\n3. What is OOB score?\n4. RF vs Gradient Boosting — key difference?'}
]},
ml7:{title:'XGBoost / LightGBM',steps:[
  {title:'Theory',d:'Gradient boosting: sequential trees, each corrects previous errors. XGBoost: L1/L2 regularization. LightGBM: leaf-wise growth, faster.'},
  {title:'Code',d:'Run: LightGBM with early stopping, plot learning curve, feature importance.'},
  {title:'Task',d:'On your dataset:\n1. Train LightGBM with early stopping\n2. Compare with RF and LogReg by ROC-AUC\n3. Feature importance from LGB\n4. lr=0.01 vs lr=0.3 — how does best_iteration change?\n5. Which model won and why?'},
  {title:'Recall',d:'1. Boosting vs bagging — key difference?\n2. What is early stopping?\n3. LightGBM vs XGBoost — when to prefer each?\n4. Why can boosting overfit?'}
]},
ml8:{title:'Feature Engineering',steps:[
  {title:'Theory',d:'Categorical encoding (OHE, target encoding). Numeric: log1p, binning. Date features. Interaction features. Polynomial features.'},
  {title:'Code',d:'Run: Pipeline with ColumnTransformer, create interaction features, log transform, extract date components.'},
  {title:'Task',d:'On your dataset:\n1. Pipeline with categorical + numeric columns\n2. Create 2+ new features (product, log1p, or from date)\n3. CV-score before and after new features\n4. If grouping exists: groupby aggregates as features\n5. Note: which features improved the model?'},
  {title:'Recall',d:'1. When to use log transformation?\n2. OHE vs Label Encoding — when each?\n3. What is feature leakage?\n4. Why test features with cross-validation?'}
]},
ml9:{title:'⚔️ BOSS: Churn End-to-End',steps:[
  {title:'Theory',d:'No hints. Full ML project: load → EDA → feature engineering → 3+ models → evaluate → business conclusion.'},
  {title:'Code',d:'No hints. Build the full pipeline.'},
  {title:'Task',d:'No hints:\n1. Each model metrics on val: Precision, Recall, F1, ROC-AUC\n2. Choose best — justify\n3. Final score on TEST (once only!)\n4. Confusion matrix\n5. Feature importance top-10\n6. Business conclusion: which customer segment churns most?'},
  {title:'Recall',d:'1. Full ML project pipeline?\n2. Why evaluate on TEST only once?\n3. What is precision-recall tradeoff?\n4. How to explain model results to business stakeholders?'}
]},
cv1:{title:'Deep Learning & Neural Networks',steps:[
  {title:'Theory',d:'Neuron: weighted sum + activation. Layers: input → hidden → output. Backpropagation. ReLU, Softmax. Cross-entropy loss.'},
  {title:'Code',d:'Run: build a 3-layer MLP in PyTorch, training loop, evaluate accuracy on test.',c:`import torch
import torch.nn as nn

# Tensors
x = torch.tensor([1.0,2.0,3.0])
A = torch.randn(3,4); B = torch.randn(4,2)
C = A@B; print(f"A{A.shape}@B{B.shape}=C{C.shape}")

# Autodifferentiation + GD
w = torch.tensor(2.0,requires_grad=True)
b = torch.tensor(0.0,requires_grad=True)
x_data = torch.linspace(0,1,100)
y_data = 3*x_data+1+0.1*torch.randn(100)

for epoch in range(200):
    y_pred = w*x_data+b
    loss = ((y_pred-y_data)**2).mean()
    loss.backward()
    with torch.no_grad():
        w -= 0.1*w.grad; b -= 0.1*b.grad
    w.grad.zero_(); b.grad.zero_()

print(f"w={w.item():.3f} (~3), b={b.item():.3f} (~1)")`},
  {title:'Task',d:'Create NN for Iris via nn.Sequential:\nInput(4) → Linear(16) → ReLU → Linear(8) → ReLU → Linear(3)\n\n1. Training loop: forward → CrossEntropyLoss → backward → Adam.step()\n2. Train 100 epochs, print loss every 10\n3. Accuracy on test data\n\nfrom sklearn.datasets import load_iris'},
  {title:'Recall',d:'1. What does a neuron compute?\n2. Why ReLU instead of sigmoid?\n3. What is backpropagation?\n4. Why softmax for multiclass?'}
]},
cv2:{title:'PyTorch Basics',steps:[
  {title:'Theory',d:'Tensor operations. autograd: gradient tracking. DataLoader + Dataset. model.train() vs model.eval(). GPU with .cuda().'},
  {title:'Code',d:'Run: tensor creation, autograd example, DataLoader loop, move model to GPU.'},
  {title:'Task',d:'Build CNN for MNIST:\n1. Conv2d(1,32,3) → ReLU → MaxPool → Conv2d(32,64,3) → ReLU → Flatten → Linear(64*5*5, 10)\n2. Training loop with Adam, CrossEntropyLoss\n3. Test accuracy after 5 epochs\n4. Plot: training loss per epoch'},
  {title:'Recall',d:'1. What is autograd?\n2. Why model.eval() for inference?\n3. DataLoader vs Dataset difference?\n4. Why use GPU for deep learning?'}
]},
cv3:{title:'CNN: Convolutional Networks',steps:[
  {title:'Theory',d:'Convolution: filter slides over image, detects features. Pooling: downsample. Feature maps. Receptive field. Filters = learned features.'},
  {title:'Code',d:'Run: visualize conv filters, feature maps. Run CNN on MNIST, see accuracy.'},
  {title:'Task',d:'1. Add 3rd Conv layer with 128 filters\n2. Try CIFAR-10: from torchvision.datasets import CIFAR10 (3 RGB channels)\n3. Plot 5 misclassified examples\n4. Add LR scheduler: StepLR(optimizer, step_size=3, gamma=0.5)'},
  {title:'Recall',d:'1. What does a convolutional filter detect?\n2. Why MaxPooling?\n3. How many parameters in Conv2d(32,64,3)?\n4. Why deeper networks learn better features?'}
]},
cv4:{title:'Transfer Learning',steps:[
  {title:'Theory',d:'Pretrained on ImageNet (1.2M images). Freeze base layers, retrain head. Fine-tuning: unfreeze last layers. Feature extraction.'},
  {title:'Code',d:'Run: load ResNet18, freeze layers, replace head, train on small dataset. Compare accuracy.'},
  {title:'Task',d:'1. Unfreeze last 2 ResNet layers (model.layer4) — compare accuracy\n2. Try EfficientNet: torchvision.models.efficientnet_b0()\n3. Save and load model:\n   torch.save(model.state_dict(), "model.pth")\n   model.load_state_dict(torch.load("model.pth"))\n4. Write predict_image(model, image_path) → class name'},
  {title:'Recall',d:'1. Why transfer learning works?\n2. Freeze vs fine-tune — when each?\n3. ImageNet: how many classes?\n4. EfficientNet vs ResNet — key difference?'}
]},
cv5:{title:'Object Detection: YOLO',steps:[
  {title:'Theory',d:'Detection = classification + localization. Bounding box: [x,y,w,h,confidence]. YOLO: real-time, single pass. mAP metric.'},
  {title:'Code',d:'Run: YOLOv8 inference on image. See boxes, labels, confidence. Try different models (n/s/m).',c:`from ultralytics import YOLO

# Load YOLOv8n (nano — lightest)
model = YOLO('yolov8n.pt')  # downloads automatically

# Detection on test image
results = model('https://ultralytics.com/images/zidane.jpg')

result = results[0]
print(f"Objects found: {len(result.boxes)}")
for box in result.boxes:
    cls_id = int(box.cls)
    conf   = float(box.conf)
    label  = model.names[cls_id]
    coords = box.xyxy[0].tolist()
    print(f"  {label}: {conf:.2f}, bbox={[round(c) for c in coords]}")

result.show()   # shows image with boxes
# result.save('output.jpg')  # saves`},
  {title:'Task',d:'1. Run on webcam: model.predict(source=0, show=True)\n2. Compare yolov8n, yolov8s, yolov8m on speed and quality\n3. Count people per frame: result.boxes.cls (0=person in COCO)\n4. Save 10 frames with person'},
  {title:'Recall',d:'1. Detection vs classification — difference?\n2. What does confidence score mean?\n3. What is mAP?\n4. YOLO architecture key idea?'}
]},
// Practice quests
'sql-p1':{title:'Data Filtering Practice',steps:[
  {title:'WHERE Patterns',d:'Study filtering patterns — run each block.',c:`-- Comparisons and BETWEEN
SELECT name, salary FROM users WHERE salary > 80000;
SELECT name, salary FROM users WHERE salary BETWEEN 70000 AND 100000;

-- IN — list of values
SELECT name, city FROM users WHERE city IN ('London', 'Berlin');

-- LIKE: % = any chars, _ = one char
SELECT name FROM users WHERE name LIKE 'A%';
SELECT name FROM users WHERE name LIKE '_o%';

-- AND / OR / NOT
SELECT name, salary, city
FROM users
WHERE salary > 85000 AND city != 'Paris';`},
  {title:'Task: WHERE filters',d:'Tables: users(id,name,age,city,salary,dept_id,join_date), departments(id,name,budget)\n1. All users older than 30 from London\n2. Users with salary 80000-110000 (BETWEEN)\n3. Users from London, Berlin or Paris (IN)\n4. Names starting with A or C (LIKE + OR)\n5. Top 3 highest paid (ORDER BY + LIMIT)'},
  {title:'ORDER BY + LIMIT',d:'Study sorting and pagination — run each block.',c:`-- ORDER BY multiple columns
SELECT name, city, salary FROM users
ORDER BY city ASC, salary DESC;

-- LIMIT + OFFSET (pagination)
SELECT name, salary FROM users
ORDER BY salary DESC
LIMIT 5 OFFSET 5;  -- page 2

-- DISTINCT
SELECT DISTINCT city FROM users ORDER BY city;

-- COUNT rows with filter
SELECT COUNT(*) as total, AVG(salary) as avg_sal FROM users WHERE salary > 80000;`},
  {title:'Task: sorting',d:'1. 5 youngest users (name, age, city)\n2. Top 5 orders by amount (product, amount)\n3. Unique user cities in alphabetical order\n4. Page 3 of users, 4 per page (ORDER BY id)'}
]},
'sql-p2':{title:'Aggregations & Subqueries',steps:[
  {title:'GROUP BY + HAVING',d:'Study aggregation patterns — run each block.',c:`-- COUNT, SUM, AVG, MIN, MAX
SELECT dept_id,
       COUNT(*)      AS cnt,
       AVG(salary)   AS avg_sal,
       MAX(salary)   AS max_sal,
       MIN(salary)   AS min_sal
FROM users
GROUP BY dept_id;

-- JOIN + GROUP BY — department names
SELECT d.name, COUNT(u.id) AS employees, ROUND(AVG(u.salary),2) AS avg_salary
FROM departments d
LEFT JOIN users u ON u.dept_id = d.id
GROUP BY d.id, d.name
ORDER BY avg_salary DESC;

-- HAVING — filter after grouping
SELECT dept_id, AVG(salary) AS avg_sal
FROM users
GROUP BY dept_id
HAVING avg_sal > 85000;`},
  {title:'Task: aggregations',d:'1. Number of users per city (ORDER BY count DESC)\n2. Average salary per department (JOIN with departments)\n3. Total order amount per product\n4. Departments where average salary > 85000 (HAVING)\n5. City with highest average user age'},
  {title:'Subqueries + CTEs',d:'Study subqueries and WITH clause — run each block.',c:`-- Subquery in WHERE
SELECT name, salary FROM users
WHERE salary > (SELECT AVG(salary) FROM users);

-- Subquery in FROM
SELECT dept_id, avg_sal FROM (
  SELECT dept_id, AVG(salary) AS avg_sal FROM users GROUP BY dept_id
) sub WHERE avg_sal > 80000;

-- CTE (WITH)
WITH dept_stats AS (
  SELECT dept_id, AVG(salary) AS avg_sal, COUNT(*) AS cnt
  FROM users GROUP BY dept_id
)
SELECT d.name, ds.avg_sal, ds.cnt
FROM dept_stats ds
JOIN departments d ON d.id = ds.dept_id
ORDER BY ds.avg_sal DESC;`},
  {title:'Task: subqueries',d:'1. Users with salary above company-wide average\n2. Product with highest total sales (subquery or CTE)\n3. CTE: avg salary by city — filter where avg > 85000\n4. Users earning more than their own department average'}
]},
'sql-p3':{title:'Window Functions Practice',steps:[
  {title:'RANK + PARTITION',d:'Study ranking window functions — run each block.',c:`-- ROW_NUMBER, RANK, DENSE_RANK
SELECT name, salary, dept_id,
  ROW_NUMBER() OVER (ORDER BY salary DESC)                          AS row_num,
  RANK()       OVER (ORDER BY salary DESC)                          AS rank,
  DENSE_RANK() OVER (ORDER BY salary DESC)                          AS dense_rank
FROM users;

-- PARTITION BY — rank within group
SELECT name, dept_id, salary,
  RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank
FROM users;

-- Running total
SELECT name, salary,
  SUM(salary) OVER (ORDER BY id) AS running_total
FROM users;`},
  {title:'Task: RANK',d:'1. Rank users by salary within each city (PARTITION BY city)\n2. Find the #1 salary in each department (subquery where dept_rank=1)\n3. Running order total by date (SUM OVER ORDER BY order_date)\n4. Each user\'s salary as % of their department total'},
  {title:'LAG / LEAD',d:'Study row-comparison window functions — run each block.',c:`-- LAG: value of previous row
SELECT name, salary,
  LAG(salary)  OVER (ORDER BY salary) AS prev_salary,
  LEAD(salary) OVER (ORDER BY salary) AS next_salary,
  salary - LAG(salary) OVER (ORDER BY salary) AS gap_from_prev
FROM users;

-- LAG with PARTITION
SELECT user_id, order_date, amount,
  LAG(amount) OVER (PARTITION BY user_id ORDER BY order_date) AS prev_order
FROM orders
LIMIT 20;

-- FIRST_VALUE
SELECT name, dept_id, salary,
  FIRST_VALUE(salary) OVER (PARTITION BY dept_id ORDER BY salary DESC) AS top_salary_in_dept
FROM users;`},
  {title:'Task: LAG/LEAD',d:'1. Each user: their salary and the previous user\'s salary (by id) — difference\n2. For each order: previous order from same user (LAG PARTITION BY user_id)\n3. Users whose salary is 15000+ more than the previous in salary-sort\n4. Gap between max dept salary and each employee (FIRST_VALUE)'}
]},
'py-p1':{title:'Comprehensions & Lambda',steps:[
  {title:'List/Dict/Set Comprehensions',d:'Study compact Python style — run examples.',c:`# List comprehension
squares  = [x**2 for x in range(10)]
evens    = [x for x in range(20) if x % 2 == 0]
flat     = [x for row in [[1,2],[3,4],[5,6]] for x in row]

# Dict comprehension
lengths  = {w: len(w) for w in ['python','data','science']}
inverted = {v: k for k, v in {'a':1,'b':2,'c':3}.items()}

# Set comprehension
uniq_len = {len(w) for w in ['hello','world','python','code']}

# Generator (lazy — does not store a list)
total = sum(x**2 for x in range(1_000_000))

print(squares)
print(evens)
print(lengths)
print(uniq_len)
print(total)`},
  {title:'Task: comprehensions',d:'Solve in one line (comprehension or generator):\n1. Cubes of odd numbers 1-19\n2. Dict {number: "even"/"odd"} for numbers 1-10\n3. Set of unique letters in "data science" (no spaces)\n4. Sum of squares of multiples of 3 in range 1-100 (generator)'},
  {title:'lambda, map, filter, zip',d:'Study functional tools — run examples.',c:`# lambda
double = lambda x: x * 2
clamp  = lambda x, lo, hi: max(lo, min(hi, x))

# map
nums    = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, nums))

# filter
evens   = list(filter(lambda x: x % 2 == 0, nums))

# zip — pairwise pairing
names  = ['Alice','Bob','Charlie']
scores = [85, 92, 78]
paired = dict(zip(names, scores))
print(paired)

# sorted with a key
data = [{'name':'Bob','age':30},{'name':'Alice','age':25},{'name':'Eve','age':27}]
by_age = sorted(data, key=lambda d: d['age'])
print(by_age)`},
  {title:'Task: functional',d:'1. map: Celsius list → Fahrenheit (F = C*9/5 + 32)\n2. filter: keep only words longer than 4 letters\n3. zip: combine [1,2,3] and ["a","b","c"] into dict\n4. sorted with two keys: first by string length, then alphabetically'}
]},
'py-p2':{title:'Strings, datetime, collections',steps:[
  {title:'String Methods',d:'Study string methods and f-strings — run examples.',c:`text = "  Hello, Data Science World!  "

# Basic methods
print(text.strip())
print(text.lower())
print(text.replace(',', '').replace('!', ''))

# Split / join
words = text.strip().split()
print('-'.join(words))

# Search
print('Science' in text)
print(text.find('Data'))          # index or -1
print(text.count('l'))
print(text.strip().startswith('Hello'))

# f-strings
name, score, pi = 'Alice', 95.6789, 3.14159
print(f'{name}: {score:.1f}%')
print(f'{name:>10} | {score:08.2f}')  # alignment
print(f'{"="*30}')
print(f'Pi = {pi:.4f}')`},
  {title:'Task: strings',d:'1. From "2024-03-15" extract year, month, day via split — print "15 March 2024"\n2. is_palindrome(s) → bool (ignore case and spaces)\n3. Word frequency counter from any text → dict {word: count}, lowercase, no punctuation\n4. f-string table: 5 rows — name (left-aligned, 15 chars) | salary (right-aligned, 10 chars, with commas)'},
  {title:'datetime + collections',d:'Study datetime and collection types — run examples.',c:`from datetime import datetime, timedelta
from collections import Counter, defaultdict

# datetime
now      = datetime.now()
birthday = datetime(1993, 5, 15)
age      = (now - birthday).days // 365
deadline = now + timedelta(days=30)
print(f'Age: {age}')
print(f'Deadline: {deadline.strftime("%d.%m.%Y")}')
print(f'Weekday: {now.strftime("%A")}')

# Counter
words = ['apple','banana','apple','cherry','banana','apple']
cnt   = Counter(words)
print(cnt.most_common(2))  # top-2

# defaultdict — no KeyError
groups = defaultdict(list)
data   = [('Alice','Eng'),('Bob','HR'),('Carol','Eng'),('Dave','HR')]
for name, dept in data:
    groups[dept].append(name)
print(dict(groups))`},
  {title:'Task: datetime + collections',d:'1. Days until New Year (January 1 next year)\n2. Counter of grades [5,4,3,5,4,5,3,2,5] — top 2 and their counts\n3. defaultdict: group words by first letter from any word list\n4. Difference in days between "2024-01-15" and "2024-11-30" via strptime'}
]},
'ds-p1':{title:'pandas: merge & transform',steps:[
  {title:'merge + pivot_table',d:'Study DataFrame joins and pivot tables — run examples.',c:`import pandas as pd
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

# groupby after merge
summary = merged.groupby('name').agg(
    total=('amount','sum'),
    cnt=('order_id','count'),
    avg=('amount','mean')
).round(2)
print(summary)

# pivot_table
pivot = orders.pivot_table(values='amount', index='product', aggfunc=['sum','count','mean'])
print(pivot)`},
  {title:'Task: merge',d:'Create two DataFrames (users and orders, 5-10 rows each):\n1. LEFT JOIN: all orders with user names\n2. INNER JOIN: only orders from existing users (how does result differ?)\n3. groupby + agg: top 3 users by total purchases\n4. pivot_table: average order amount by product and user city'},
  {title:'transform + apply',d:'Study advanced groupby — run examples.',c:`import pandas as pd

df = pd.DataFrame({
    'dept':  ['Eng','Eng','HR','HR','Sales','Sales'],
    'name':  ['Alice','Bob','Carol','Dave','Eve','Frank'],
    'salary':[90000,85000,70000,75000,80000,82000]
})

# transform: returns Series of same length (does not collapse)
df['dept_avg']   = df.groupby('dept')['salary'].transform('mean')
df['above_avg']  = df['salary'] > df['dept_avg']
df['salary_rank']= df.groupby('dept')['salary'].rank(ascending=False)
print(df)

# apply with function
def stats(g):
    return pd.Series({'min':g.min(),'max':g.max(),'range':g.max()-g.min()})

result = df.groupby('dept')['salary'].apply(stats)
print(result)`},
  {title:'Task: transform',d:'Load Titanic CSV or create a 20+ row DataFrame with numeric and categorical columns:\n1. transform: add column with group mean of numeric feature\n2. transform: normalize numeric feature (x - mean)/std within each group\n3. apply: return min, max, std, count per group\n4. rank: rank rows by numeric feature within group'}
]},
'ds-p2':{title:'Statistics in Practice',steps:[
  {title:'Scipy Tests',d:'Study t-test, normality, correlation — run examples.',c:`import numpy as np
from scipy import stats

np.random.seed(42)
group_a = np.random.normal(loc=75, scale=10, size=50)
group_b = np.random.normal(loc=82, scale=10, size=50)

# Independent samples t-test
t, p = stats.ttest_ind(group_a, group_b)
print(f't={t:.3f}, p={p:.4f}, significant={p<0.05}')

# Shapiro-Wilk: normality
stat, p_norm = stats.shapiro(group_a)
print(f'Shapiro: stat={stat:.3f}, p={p_norm:.4f}, normal={p_norm>0.05}')

# Pearson correlation
x = np.random.normal(0, 1, 100)
y = x * 1.5 + np.random.normal(0, 1, 100)
r, p_corr = stats.pearsonr(x, y)
print(f'Pearson r={r:.3f}, p={p_corr:.4f}')`},
  {title:'Task: tests',d:'1. Create 2 groups with different means, t-test — write conclusion in words\n2. Check normality via Shapiro-Wilk for np.random.exponential data — expected result?\n3. Pearson correlation between two dataset features (Titanic: Age and Fare) — interpret\n4. Mann-Whitney U (scipy.stats.mannwhitneyu) — when to use instead of t-test?'},
  {title:'Confidence Intervals',d:'Study CI via scipy and bootstrap — run examples.',c:`import numpy as np
from scipy import stats

np.random.seed(42)
sample = np.random.normal(loc=100, scale=15, size=50)

# Standard CI
ci = stats.t.interval(0.95, df=len(sample)-1,
                      loc=np.mean(sample), scale=stats.sem(sample))
print(f'Mean: {np.mean(sample):.2f}')
print(f'95% CI: ({ci[0]:.2f}, {ci[1]:.2f})')

# Bootstrap CI (for any statistic)
def bootstrap_ci(data, stat_fn=np.mean, n=2000, ci=95):
    boots = [stat_fn(np.random.choice(data, len(data), replace=True)) for _ in range(n)]
    return np.percentile(boots, [(100-ci)/2, 100-(100-ci)/2])

low, high = bootstrap_ci(sample)
print(f'Bootstrap 95% CI: ({low:.2f}, {high:.2f})')

med_low, med_high = bootstrap_ci(sample, np.median)
print(f'Bootstrap CI for median: ({med_low:.2f}, {med_high:.2f})')`},
  {title:'Task: CI',d:'1. Normal(200,30) n=50 sample — compute 90%, 95%, 99% CI. How does width change?\n2. Bootstrap CI for median — compare with mean CI on skewed data (np.random.exponential)\n3. How does 95% CI width change for n=30, 100, 500, 1000? Plot width vs n\n4. CI = (92.5, 107.5) for mean score — what does this mean? Can you say true mean = 100?'}
]},
'ml-p1':{title:'sklearn Pipeline',steps:[
  {title:'Pipeline Basics',d:'Study ML pipeline without data leakage — run examples.',c:`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split, cross_val_score

X, y = make_classification(n_samples=1000, n_features=10, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Pipeline: scaler.fit only on train — no data leakage!
pipe = Pipeline([
    ('scaler', StandardScaler()),
    ('model',  LogisticRegression(max_iter=1000))
])
pipe.fit(X_train, y_train)
print(f'Test accuracy: {pipe.score(X_test, y_test):.4f}')

# Cross-validation with Pipeline
cv_scores = cross_val_score(pipe, X, y, cv=5, scoring='f1')
print(f'CV F1: {cv_scores.mean():.4f} ± {cv_scores.std():.4f}')`},
  {title:'Task: Pipeline',d:'1. Pipeline: StandardScaler → LogisticRegression — accuracy on make_classification(weights=[0.7,0.3])\n2. Replace LogReg with RandomForestClassifier — compare CV F1\n3. ColumnTransformer: numeric → StandardScaler, categorical → OneHotEncoder (create dataset with both)\n4. Save pipeline with joblib.dump and load — confirm predictions match'},
  {title:'GridSearchCV',d:'Study hyperparameter tuning — run examples.',c:`from sklearn.model_selection import GridSearchCV, RandomizedSearchCV
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_classification
import numpy as np

X, y = make_classification(n_samples=600, n_features=10, random_state=42)

pipe = Pipeline([('sc', StandardScaler()), ('rf', RandomForestClassifier(random_state=42))])

# GridSearchCV — full grid search
param_grid = {'rf__n_estimators':[50,100], 'rf__max_depth':[None,5,10]}
grid = GridSearchCV(pipe, param_grid, cv=3, scoring='f1', n_jobs=-1)
grid.fit(X, y)
print(f'Best params: {grid.best_params_}')
print(f'Best F1:     {grid.best_score_:.4f}')

# RandomizedSearchCV — random sample
from scipy.stats import randint
param_dist = {'rf__n_estimators': randint(50,300), 'rf__max_depth': randint(3,20)}
rnd = RandomizedSearchCV(pipe, param_dist, n_iter=10, cv=3, scoring='f1', random_state=42)
rnd.fit(X, y)
print(f'Random best F1: {rnd.best_score_:.4f}')`},
  {title:'Task: GridSearch',d:'1. GridSearch on LogisticRegression: C=[0.01,0.1,1,10], solver=[lbfgs,liblinear] — best params\n2. RandomizedSearchCV on RandomForest: n_iter=20 — compare time with full GridSearch\n3. Plot CV F1 vs n_estimators (10,50,100,200,500) for RandomForest\n4. Pipeline (scaler+model) in GridSearch vs no scaler — does best score differ?'}
]},
'ml-p2':{title:'Metrics & Model Evaluation',steps:[
  {title:'Classification Metrics',d:'Study all metrics with imbalanced data — run examples.',c:`from sklearn.metrics import (accuracy_score, precision_score, recall_score,
    f1_score, roc_auc_score, confusion_matrix, classification_report)
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_classification
from sklearn.model_selection import train_test_split

# Class imbalance — typical scenario
X, y = make_classification(n_samples=1000, n_features=10,
                           weights=[0.8, 0.2], random_state=42)
X_tr, X_te, y_tr, y_te = train_test_split(X, y, test_size=0.2, random_state=42)
rf = RandomForestClassifier(random_state=42).fit(X_tr, y_tr)
y_pred = rf.predict(X_te)
y_prob = rf.predict_proba(X_te)[:,1]

print(f'Accuracy:  {accuracy_score(y_te, y_pred):.4f}  ← misleading with imbalance!')
print(f'Precision: {precision_score(y_te, y_pred):.4f}')
print(f'Recall:    {recall_score(y_te, y_pred):.4f}')
print(f'F1:        {f1_score(y_te, y_pred):.4f}')
print(f'ROC-AUC:   {roc_auc_score(y_te, y_prob):.4f}')
print()
print(classification_report(y_te, y_pred))
print(confusion_matrix(y_te, y_pred))`},
  {title:'Task: metrics',d:'Use dataset with class imbalance weights=[0.9,0.1]:\n1. Train LogisticRegression — print all 5 metrics, explain why accuracy is misleading\n2. Change threshold: y_pred = (y_prob > 0.3) — how do precision/recall change?\n3. Find optimal threshold from [0.2,0.3,0.4,0.5,0.6,0.7] — maximize F1\n4. Confusion matrix: count FP and FN — which error type is worse for fraud detection?'},
  {title:'Regression Metrics',d:'Study RMSE, MAE, R², MAPE — run examples.'},
  {title:'Task: regression',d:'1. make_regression noise=5 vs noise=100 — how do RMSE and R² change? Explain\n2. Scatter predicted vs actual — what does it mean if points are far from y=x diagonal?\n3. Load BostonHousing.csv — compare RMSE for LinearReg, Ridge(α=1,10,100), Lasso(α=0.1,1)\n4. When is MAE better than RMSE? When RMSE better? Illustrate with outlier data'}
]},
'cv-p1':{title:'Augmentations & Inference',steps:[
  {title:'torchvision transforms',d:'Study augmentation pipeline for training vs validation — run examples.',c:`import torch
import torchvision.transforms as T
from torchvision.datasets import FakeData
from torch.utils.data import DataLoader

# Training — many augmentations
train_t = T.Compose([
    T.RandomHorizontalFlip(p=0.5),
    T.RandomRotation(degrees=15),
    T.RandomCrop(32, padding=4),
    T.ColorJitter(brightness=0.3, contrast=0.3, saturation=0.2),
    T.ToTensor(),
    T.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])

# Validation — normalization only (no random transforms!)
val_t = T.Compose([
    T.ToTensor(),
    T.Normalize([0.485,0.456,0.406],[0.229,0.224,0.225])
])

dataset = FakeData(size=64, image_size=(3,32,32), transform=train_t)
loader  = DataLoader(dataset, batch_size=16, shuffle=True)
X, y    = next(iter(loader))
print(f'Batch: {X.shape}, min={X.min():.3f}, max={X.max():.3f}')`},
  {title:'Task: augmentations',d:'1. Create transform pipeline with 5+ augmentations — explain why each one (what problem it addresses)\n2. Why does val_transform have no RandomFlip/Rotation? What happens if you add them?\n3. Write show_augmented(img_tensor, transform, n=6) — show n versions of same image\n4. Train CNN on MNIST without augmentations vs with (RandomRotation+RandomAffine) — different test accuracy?'},
  {title:'Inference Pipeline',d:'Study model save/load and prediction — run examples.',c:`import torch
import torch.nn as nn
from torchvision.models import resnet18

# Create and save
model = resnet18(weights=None)
model.fc = nn.Linear(512, 10)
torch.save(model.state_dict(), 'model.pth')

# Load
m2 = resnet18(weights=None)
m2.fc = nn.Linear(512, 10)
m2.load_state_dict(torch.load('model.pth', weights_only=True))
m2.eval()

# Inference on a single tensor
def predict_tensor(model, tensor):
    with torch.no_grad():
        out   = model(tensor.unsqueeze(0))
        probs = torch.softmax(out, dim=1)`},
  {title:'Task: inference',d:'1. Save and load a trained model — confirm predictions match before and after\n2. Write predict_image(model, image_path) → (class_idx, confidence) for a real file\n3. Batch inference: predict_batch(model, image_paths) — process list, return DataFrame\n4. Benchmark: single image vs batch of 32 — why is batch faster on GPU?'}
]},
// DS extensions
'ds6':{title:'Ranking & Time Series',steps:[
  {title:'Theory: ranking & time series',d:'df.rank() vs df.rank(method="dense"). Percentile rank: rank(pct=True). Group rank: groupby().rank(). Time series: DatetimeIndex, resample("ME"), rolling(n), pct_change(), shift(n).'},
  {title:'Code: rank & resample',d:'Run examples: df.rank(), groupby rank, pd.date_range, rolling mean.'},
  {title:'Task: ranking',d:'Use df with Alice/Bob/Carol/David/Eve/Frank and revenues.\n1. dept_rank==1: top per dept → Carol|David|Frank\n2. Percentile rank of Alice (revenue=120) → 0.67|0.667|0.6\n3. pd.date_range("2024-01", periods=12, freq="MS"): first and last → 2024-01|2024-12\n4. rolling(3).mean() on [10,20,30,40,50]: value at index=2 → 20.0|20'},
  {title:'Recall',d:'rank(dense) vs rank(min). resample meaning. shift for lag features. rolling for anomaly detection.'}
]},
'ds7':{title:'Regression Analysis',steps:[
  {title:'Theory: regression',d:'Linear regression: ŷ=β₀+β₁x. MAE vs RMSE vs R². Multicollinearity. Regularization: Ridge(L2)→shrink, Lasso(L1)→zero. Residuals should be random.'},
  {title:'Code: LinearRegression & regularization',d:'Compare LinearRegression, Ridge(alpha=1,10), Lasso on synthetic housing data.'},
  {title:'Task: regression',d:'Use Boston Housing or any numeric target dataset.\n1. LinearRegression R² and RMSE\n2. Best Ridge alpha on val\n3. Most important feature (largest |coef| after StandardScaler)\n4. Residuals plot — any pattern?'},
  {title:'Recall',d:'MAE vs RMSE tradeoffs. R²=0.72 meaning. Why regularize. Multicollinearity effects.'}
]},
// AB track
'ab1':{title:'CLT & Normal Distribution',steps:[
  {title:'Theory: CLT',d:'Central Limit Theorem: sample means X̄ ~ N(μ, σ²/n) as n grows. SE = σ/√n. For proportions: SE = √(p(1-p)/n). Z-score: z=(X̄-μ)/SE. 68-95-99.7 rule.'},
  {title:'Code: CLT simulation',d:'Simulate CLT: exponential population, show sample means normalize as n grows. SE matches theory.'},
  {title:'Task: CLT calculations',d:'1. p=0.08, n=2000: SE → 0.006|0.0061\n2. seed(0), 10000 samples n=40 from Uniform(0,1): SE of means → 0.045|0.046|0.0456\n3. SE halved — n increased by → 4\n4. z-score: X̄=52, μ=50, σ=8, n=64 → 2.0'},
  {title:'Recall',d:'CLT claim. SE vs n (quadratic). SE formula for proportions. Why CLT enables A/B tests.'}
]},
'ab2':{title:'Confidence Intervals',steps:[
  {title:'Theory: CI',d:'95% CI = p̂ ± 1.96·SE. Z values: 90%→1.645, 95%→1.96, 99%→2.576. Correct interpretation: 95% of such intervals contain the true parameter. Width ∝ 1/√n.'},
  {title:'Code: CI calculation',d:'ci_proportion(p_hat, n, confidence). Show width vs n. ci_mean for sample data.'},
  {title:'Task: CI',d:'1. p̂=0.15, n=400: lower bound of 95% CI → 0.115|0.1150\n2. p̂=0.15, n=1600: lower bound of 95% CI → 0.1325|0.132\n3. Why is n=1600 CI half as wide as n=400? → 4|four times\n4. 95% CI = (0.09, 0.13). Significant vs 0.10? → no|not significant'},
  {title:'Recall',d:'Correct CI interpretation. Z values for 90/95/99%. Width vs n. CI includes 0 meaning.'}
]},
'ab3':{title:'Hypothesis Testing',steps:[
  {title:'Theory: hypotheses & errors',d:'H₀ vs H₁. p-value = P(data|H₀). Type I error (α=false positive). Type II error (β=false negative). Power=1-β. Multiple testing: FWER=1-(1-α)^k. Bonferroni: α\'=α/k.'},
  {title:'Code: two-proportion z-test',d:'Implement two_prop_ztest from scratch. Show multiple testing FWER.'},
  {title:'Task: hypotheses',d:'1. Control n=3000 conv=330, treat n=3000 conv=390: p_value → 0.017|0.0172|0.016\n2. p_value < 0.05? → yes|да|true\n3. P(at least 1 false positive, 3 tests, α=0.05) → 0.142|0.143|14%\n4. Stopped test early when p=0.03 — why wrong? → type I|false positive|peeking'},
  {title:'Recall',d:'Strict p-value definition. Type I vs II — which worse in business. Peeking problem. Bonferroni correction.'}
]},
'ab4':{title:'Experiment Design',steps:[
  {title:'Theory: power & sample size',d:'4 linked parameters: α, β, power=1-β, MDE. n formula: (z_α/2+z_β)²·[p_a(1-p_a)+p_b(1-p_b)]/δ². MDE halved → n×4. Power 80→90% → n+34%.'},
  {title:'Code: sample size',d:'sample_size(p_base, mde, alpha, power). Show MDE vs n table. SRM chi2 check.'},
  {title:'Task: design',d:'1. sample_size(0.05, 0.01): n per group → 8157|8158\n2. MDE halved → n increases by → 4\n3. Traffic 2000/day, 7 days, 50/50 split → 7000/group. Enough for n=8157? → no|нет\n4. Power 90% vs 80%, same MDE — n bigger or smaller? → bigger|больше'},
  {title:'Recall',d:'Power 50% meaning. Who defines MDE. Why no early stopping. SRM detection.'}
]},
'ab5':{title:'Full A/B Test',steps:[
  {title:'Theory: full cycle',d:'7 steps: hypothesis → metric → sample size → randomization → AA test → launch+monitor → analysis → decision. Key pitfalls: peeking, SRM, novelty effect, network effects, multiple testing.'},
  {title:'Code: full analysis',d:'🚫 No hints. Write full A/B analysis: SRM check, z-test, CI for uplift, business decision.'},
  {title:'Task: A/B project',d:'No hints. Real or simulated test:\n1. Business hypothesis + primary metric + guardrail\n2. Calculate n — show steps\n3. Z-test: p-value + 95% CI for difference\n4. SRM check via chi-square\n5. Business conclusion: ship the feature?'},
  {title:'Recall',d:'7 steps of A/B cycle. SRM criticality. Type I/II errors in e-commerce. Peeking explained.'}
]},
'ab-p1':{title:'Stats Practice',steps:[
  {title:'Statistical tests',d:'one_sample_ztest, two_prop_ztest, srm_chi2, sample_size — all from scratch.'},
  {title:'Task: tests',d:'1. one_sample_ztest(seed(42), Normal(105,15), n=100, mu0=100): p<0.05? → yes|да|true\n2. two_prop_ztest(1000,85,1000,110): p<0.05? → no|нет|false\n3. srm_chi2(4823,5177): χ²>3.841? → yes|да|true\n4. sample_size(0.10, 0.02) → 3840|3839|3841|3842'},
  {title:'Power simulation',d:'simulate_power: empirical vs analytic n. Show power vs n table.'},
  {title:'Task: power',d:'1. simulate_power(0.10, 0.12, 3840, n_sims=2000): close to 80%? → yes|да|true|0.8\n2. simulate_power at n=500: below 80%? → yes|да|true\n3. Power 50% means: detects effect → 50%|coin flip|random\n4. Who sets the MDE? → business|product|бизнес'}
]}
};
