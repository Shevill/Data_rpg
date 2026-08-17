QUESTS.push(
// ---- SQL ----
{
  id:'sql1', trackId:'sql', title:'SELECT основы', emoji:'📝', isBoss:false,
  steps:[
    { title:'Теория: базовый SELECT', xp:10, type:'theory',
      description:'SQL — язык запросов к реляционным базам данных.\n\nБазовая структура:\nSELECT колонки\nFROM таблица\nWHERE условие\nORDER BY колонка [ASC|DESC]\nLIMIT n\n\nПорядок выполнения (важно!):\nFROM → WHERE → SELECT → ORDER BY → LIMIT\n\nОператоры WHERE:\n• = , != , < , > , <= , >=\n• BETWEEN a AND b\n• IN (val1, val2, val3)\n• LIKE \'pattern%\' (% — любые символы)\n• IS NULL / IS NOT NULL\n• AND, OR, NOT\n\nПолезные функции:\n• UPPER(), LOWER(), LENGTH()\n• ROUND(x, n), ABS(x)\n• COALESCE(a, b) — первое не-NULL\n• CAST(x AS INT)\n• DATE(), YEAR(), MONTH()\n\nАлиасы: SELECT salary * 12 AS annual_salary',
      code:null },
    { title:'Код: CREATE TABLE и запросы', xp:15, type:'code',
      description:'Открой любой SQL-клиент (DBeaver, pgAdmin, SQLite, или онлайн sqliteonline.com).',
      code:`-- Создаём таблицу (SQLite/PostgreSQL)
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
ORDER BY annual_salary DESC;` },
    { title:'Задача: 5 запросов', xp:20, type:'task',
      description:'На таблице employees напиши запросы:\n1. Все сотрудники без менеджера (manager_id IS NULL)\n2. Сотрудники из Analytics или ML с зарплатой между 90000 и 140000\n3. Имена, начинающиеся на A или B (используй LIKE)\n4. Топ-3 самых высокооплачиваемых сотрудников\n5. Сотрудники, нанятые в 2022 году',
      code:null },
    { title:'Recall: основы SELECT', xp:10, type:'recall',
      description:'За 2 минуты:\n1. В каком порядке SQL выполняет FROM, WHERE, SELECT?\n2. Чем LIKE \'%text%\' отличается от = \'text\'?\n3. Что вернёт COALESCE(NULL, NULL, 42, 10)?\n4. Зачем нужны алиасы (AS)?',
      code:null }
  ]
},
{
  id:'sql2', trackId:'sql', title:'GROUP BY и агрегации', emoji:'📊', isBoss:false,
  steps:[
    { title:'Теория: GROUP BY и HAVING', xp:10, type:'theory',
      description:'GROUP BY группирует строки по значению колонки, агрегатные функции считают по группе.\n\nАгрегатные функции:\n• COUNT(*) — количество строк\n• COUNT(col) — количество не-NULL значений\n• SUM(col), AVG(col)\n• MIN(col), MAX(col)\n• STRING_AGG(col, \',\') — конкатенация строк\n\nСтруктура:\nSELECT department, COUNT(*), AVG(salary)\nFROM employees\nGROUP BY department\nHAVING AVG(salary) > 100000\nORDER BY AVG(salary) DESC\n\nВажно:\n• WHERE фильтрует ДО агрегации (по строкам)\n• HAVING фильтрует ПОСЛЕ агрегации (по группам)\n• В SELECT можно только: колонки из GROUP BY + агрегатные функции\n\nПорядок выполнения:\nFROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY',
      code:null },
    { title:'Код: агрегации по отделам', xp:15, type:'code',
      description:'Используй таблицу employees из предыдущего квеста:',
      code:`-- Статистика по отделам
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

-- HAVING: только отделы с > 1 сотрудником
SELECT
    department,
    COUNT(*) AS cnt,
    AVG(salary) AS avg_sal
FROM employees
GROUP BY department
HAVING COUNT(*) > 1
ORDER BY cnt DESC;

-- Комбо WHERE + GROUP BY + HAVING
SELECT
    department,
    COUNT(*) AS senior_count
FROM employees
WHERE hire_date < '2023-01-01'
GROUP BY department
HAVING COUNT(*) >= 2;` },
    { title:'Задача: аналитика зарплат', xp:20, type:'task',
      description:'На таблице employees:\n1. Средняя зарплата по каждому отделу, отсортированная по убыванию\n2. Отделы где суммарный фонд оплаты труда > 200000\n3. Сколько сотрудников нанято в каждый год\n4. Найди отдел с максимальным разрывом между max и min зарплатой\n5. Посчитай долю каждого отдела в общем фонде',
      code:null },
    { title:'Recall: GROUP BY и HAVING', xp:10, type:'recall',
      description:'За 2 минуты:\n1. В чём разница WHERE и HAVING?\n2. Что будет если написать SELECT name, AVG(salary) FROM employees GROUP BY department?\n3. COUNT(*) vs COUNT(col) — в чём разница?\n4. Порядок: FROM, WHERE, GROUP BY, HAVING, SELECT, ORDER BY — верно?',
      code:null }
  ]
},
{
  id:'sql3', trackId:'sql', title:'JOIN типы', emoji:'🔗', isBoss:false,
  steps:[
    { title:'Теория: виды JOIN', xp:10, type:'theory',
      description:'JOIN соединяет строки из двух таблиц по условию.\n\nТипы:\n• INNER JOIN — только строки с совпадением в обеих таблицах\n• LEFT JOIN — все строки из левой + совпадения из правой (NULL если нет)\n• RIGHT JOIN — все из правой + совпадения из левой\n• FULL OUTER JOIN — все из обеих таблиц\n• CROSS JOIN — декартово произведение\n• SELF JOIN — таблица с самой собой\n\nСинтаксис:\nSELECT a.col, b.col\nFROM table_a a\nJOIN table_b b ON a.id = b.a_id\n\nЧастые ошибки:\n• Дублирование строк при JOIN на не-уникальный ключ\n• NULL в условии JOIN (NULL != NULL в SQL!)\n• Не указывать алиасы при одинаковых именах колонок\n\nSELF JOIN — полезен для иерархий:\nSELECT e.name, m.name AS manager\nFROM employees e\nLEFT JOIN employees m ON e.manager_id = m.id',
      code:null },
    { title:'Код: INNER, LEFT, SELF JOIN', xp:15, type:'code',
      description:'Создай вторую таблицу и попрактикуй JOIN:',
      code:`CREATE TABLE departments (
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

-- LEFT JOIN: все сотрудники
SELECT e.name, e.department, d.full_name, d.budget
FROM employees e
LEFT JOIN departments d ON e.department = d.id;

-- SELF JOIN: сотрудник + менеджер
SELECT
    e.name AS employee,
    e.salary,
    m.name AS manager,
    m.salary AS manager_salary
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;` },
    { title:'Задача: сложные JOIN', xp:20, type:'task',
      description:'1. Найди все отделы из departments, в которых НЕТ ни одного сотрудника (LEFT JOIN + WHERE IS NULL)\n2. Для каждого сотрудника покажи: имя, зарплату, бюджет отдела и долю зарплаты в бюджете\n3. SELF JOIN: найди все пары (сотрудник, коллега) из одного отдела\n4. Покажи сотрудников, чья зарплата выше средней по их отделу',
      code:null },
    { title:'Recall: JOIN типы', xp:10, type:'recall',
      description:'За 2 минуты:\n1. Что вернёт LEFT JOIN когда нет совпадения в правой таблице?\n2. В чём опасность JOIN на не-уникальный ключ?\n3. Как найти строки в левой таблице, которых нет в правой?\n4. Зачем нужен SELF JOIN — приведи пример из жизни?',
      code:null }
  ]
},
{
  id:'sql4', trackId:'sql', title:'Оконные функции', emoji:'🪟', isBoss:false,
  steps:[
    { title:'Теория: Window Functions', xp:10, type:'theory',
      description:'Оконные функции вычисляют значение для каждой строки с учётом \'окна\' строк.\n\nСинтаксис:\nFUNCTION() OVER (\n    PARTITION BY col\n    ORDER BY col\n    ROWS/RANGE ...\n)\n\nРанжирующие:\n• ROW_NUMBER() — уникальный номер строки\n• RANK() — ранг (одинаковые → одинаковый ранг, следующий пропущен)\n• DENSE_RANK() — ранг без пропусков\n• NTILE(n) — разбивка на n квантилей\n\nАгрегатные в окне:\n• SUM(salary) OVER (PARTITION BY dept) — сумма по отделу для каждой строки\n• AVG(salary) OVER () — среднее по всей таблице\n\nСмещение:\n• LAG(col, n) — значение n строк назад\n• LEAD(col, n) — значение n строк вперёд\n• FIRST_VALUE(col) — первое значение в окне\n• LAST_VALUE(col) — последнее',
      code:null },
    { title:'Код: оконные функции', xp:15, type:'code',
      description:'Практика оконных функций на employees:',
      code:`-- ROW_NUMBER, RANK, DENSE_RANK
SELECT
    name, department, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
    RANK()       OVER (ORDER BY salary DESC) AS rank,
    DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- PARTITION BY: ранг внутри отдела
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

-- Накопительный итог (running total)
SELECT
    name, hire_date, salary,
    SUM(salary) OVER (ORDER BY hire_date) AS running_total
FROM employees
ORDER BY hire_date;` },
    { title:'Задача: оконные задачи', xp:20, type:'task',
      description:'1. Для каждого сотрудника: его зарплата, средняя по отделу, и процентиль NTILE(4)\n2. Найди топ-1 по зарплате в каждом отделе (используй RANK() в подзапросе/CTE)\n3. Создай таблицу monthly_sales(month, amount) с 12 месяцами. Посчитай:\n   - скользящее среднее за 3 месяца (ROWS BETWEEN 2 PRECEDING AND CURRENT ROW)\n   - рост к прошлому месяцу в % через LAG()\n4. Перепиши запрос из п.2 через CTE (WITH clause)',
      code:null },
    { title:'Recall: оконные функции', xp:10, type:'recall',
      description:'За 2 минуты:\n1. В чём разница RANK() и DENSE_RANK()?\n2. Чем оконная функция отличается от GROUP BY?\n3. Что такое PARTITION BY?\n4. Как получить \'значение предыдущей строки\' в SQL?',
      code:null }
  ]
},
{
  id:'sql5', trackId:'sql', title:'Аналитический отчёт', emoji:'⚔️', isBoss:true,
  steps:[
    { title:'Теория: полный SQL стек', xp:50, type:'theory',
      description:'⚔️ ФИНАЛЬНЫЙ БОСС SQL\n\nЧто нужно знать:\n• Полный стек SQL: SELECT + WHERE + GROUP BY + HAVING + JOIN + Window Functions + CTE\n• CTE (Common Table Expressions): WITH name AS (query) SELECT ... FROM name\n• Подзапросы: в WHERE, FROM, SELECT\n• Оптимизация: индексы, избегание SELECT *, осмысленные JOIN\n\nПодсказок в коде не будет.\n\nПолучи датасет: Kaggle → \'Superstore Sales\' или любые реальные рабочие данные с числовыми метриками.',
      code:null },
    { title:'Код: полный аналитический отчёт', xp:60, type:'code',
      description:'🚫 Подсказок нет. Напиши полный аналитический отчёт:\n\nТребования:\n1. Минимум 3 таблицы (или 1 таблица с self-join)\n2. Использовать: JOIN, GROUP BY, HAVING, хотя бы 1 оконную функцию\n3. Найти топ-5 по какой-то метрике в каждой категории\n4. Посчитать долю каждой категории от общего\n5. Динамику (рост/падение) через LAG\n6. Оформить через CTE для читаемости',
      code:null },
    { title:'Задача: cohort analysis', xp:60, type:'task',
      description:'🚫 Без подсказок:\n\n1. Cohort analysis — сгруппируй клиентов по \'первому периоду\' и проследи активность\n2. Funnel — если есть воронка — посчитай конверсию на каждом шаге\n3. Напиши 3 вывода по данным в виде комментариев — бизнес-интерпретация\n4. Какие индексы добавил бы для ускорения этих запросов?',
      code:null },
    { title:'Recall: продвинутый SQL', xp:30, type:'recall',
      description:'За 5 минут без подглядывания:\n1. Что такое CTE и зачем он нужен?\n2. Как работает LAG() — напиши пример\n3. Когда использовать подзапрос в FROM vs в WHERE?\n4. Что такое cohort analysis и зачем он нужен в аналитике?',
      code:null }
  ]
},
{id:'sql-p1',trackId:'sql',practice:true,emoji:'⚡',title:'Фильтрация данных',steps:[
  {title:'Паттерны WHERE',xp:15,type:'code',description:'Изучи паттерны фильтрации — запусти каждый блок',code:`-- Сравнения и BETWEEN
SELECT name, salary FROM users WHERE salary > 80000;
SELECT name, salary FROM users WHERE salary BETWEEN 70000 AND 100000;

-- IN — список значений
SELECT name, city FROM users WHERE city IN ('London', 'Berlin');

-- LIKE: % = любые символы, _ = один символ
SELECT name FROM users WHERE name LIKE 'A%';
SELECT name FROM users WHERE name LIKE '_o%';

-- AND / OR / NOT
SELECT name, salary, city
FROM users
WHERE salary > 85000 AND city != 'Paris';`}
 ,{title:'Задача: WHERE фильтры',xp:20,type:'task',description:`Таблицы: users(id,name,age,city,salary,dept_id,join_date), departments(id,name,budget)\n1. Все пользователи старше 30 из Лондона\n2. Пользователи с зарплатой от 80000 до 110000 (BETWEEN)\n3. Города London, Berlin или Paris (IN)\n4. Имена начинающиеся на A или C (два LIKE через OR)\n5. Топ-3 самых высокооплачиваемых (ORDER BY + LIMIT)`,code:null}
 ,{title:'ORDER BY + LIMIT',xp:15,type:'code',description:'Сортировка, ограничение, пагинация',code:`-- ORDER BY нескольким колонкам
SELECT name, city, salary FROM users
ORDER BY city ASC, salary DESC;

-- LIMIT + OFFSET (пагинация)
SELECT name, salary FROM users
ORDER BY salary DESC
LIMIT 5 OFFSET 5;  -- страница 2

-- DISTINCT
SELECT DISTINCT city FROM users ORDER BY city;

-- COUNT строк с фильтром
SELECT COUNT(*) as total, AVG(salary) as avg_sal FROM users WHERE salary > 80000;`}
 ,{title:'Задача: сортировка',xp:20,type:'task',description:`1. 5 самых молодых пользователей (имя, возраст, город)\n2. Топ-5 заказов по сумме (orders.amount) — выведи product и amount\n3. Уникальные города пользователей в алфавитном порядке\n4. Страница 3 пользователей по 4 записи (сортировка по id)`,code:null}
]},
{id:'sql-p2',trackId:'sql',practice:true,emoji:'⚡',title:'Агрегации и подзапросы',steps:[
  {title:'GROUP BY + HAVING',xp:15,type:'code',description:'Группировка и агрегатные функции',code:`-- COUNT, SUM, AVG, MIN, MAX
SELECT dept_id,
       COUNT(*)      AS cnt,
       AVG(salary)   AS avg_sal,
       MAX(salary)   AS max_sal,
       MIN(salary)   AS min_sal
FROM users
GROUP BY dept_id;

-- JOIN + GROUP BY — имена департаментов
SELECT d.name, COUNT(u.id) AS employees, ROUND(AVG(u.salary),2) AS avg_salary
FROM departments d
LEFT JOIN users u ON u.dept_id = d.id
GROUP BY d.id, d.name
ORDER BY avg_salary DESC;

-- HAVING — фильтр после группировки
SELECT dept_id, AVG(salary) AS avg_sal
FROM users
GROUP BY dept_id
HAVING avg_sal > 85000;`}
 ,{title:'Задача: агрегации',xp:20,type:'task',description:`1. Количество пользователей в каждом городе (ORDER BY count DESC)\n2. Средняя зарплата по департаментам — покажи название департамента (JOIN)\n3. Общая сумма заказов (orders.amount) по каждому продукту\n4. Департаменты где средняя зарплата > 85000 (HAVING)\n5. Город с максимальным средним возрастом пользователей`,code:null}
 ,{title:'Подзапросы + CTE',xp:15,type:'code',description:'Вложенные запросы и Common Table Expressions',code:`-- Подзапрос в WHERE
SELECT name, salary FROM users
WHERE salary > (SELECT AVG(salary) FROM users);

-- Подзапрос в FROM
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
ORDER BY ds.avg_sal DESC;`}
 ,{title:'Задача: подзапросы',xp:20,type:'task',description:`1. Пользователи с зарплатой выше средней по всей компании\n2. Продукт с максимальной суммой продаж (подзапрос или CTE)\n3. CTE: средняя зарплата по городам — отфильтруй города где avg > 85000\n4. Пользователи чья зарплата выше средней в их же департаменте (коррелированный подзапрос)`,code:null}
]},
{id:'sql-p3',trackId:'sql',practice:true,emoji:'⚡',title:'Оконные функции: практика',steps:[
  {title:'RANK + PARTITION',xp:15,type:'code',description:'Ранжирование внутри групп',code:`-- ROW_NUMBER, RANK, DENSE_RANK
SELECT name, salary, dept_id,
  ROW_NUMBER() OVER (ORDER BY salary DESC)                          AS row_num,
  RANK()       OVER (ORDER BY salary DESC)                          AS rank,
  DENSE_RANK() OVER (ORDER BY salary DESC)                          AS dense_rank
FROM users;

-- PARTITION BY — ранг внутри группы
SELECT name, dept_id, salary,
  RANK() OVER (PARTITION BY dept_id ORDER BY salary DESC) AS dept_rank
FROM users;

-- Накопительная сумма
SELECT name, salary,
  SUM(salary) OVER (ORDER BY id) AS running_total
FROM users;`}
 ,{title:'Задача: RANK',xp:20,type:'task',description:`1. Ранжируй пользователей по зарплате внутри каждого города (PARTITION BY city)\n2. Найди #1 по зарплате в каждом департаменте (вложенный запрос по dept_rank=1)\n3. Накопительная сумма заказов по дате (orders, SUM OVER ORDER BY order_date)\n4. Процент зарплаты от суммы зарплат своего департамента (ROUND(salary*100.0/SUM(salary) OVER (PARTITION BY dept_id),1))`,code:null}
 ,{title:'LAG / LEAD',xp:15,type:'code',description:'Сравнение со соседними строками',code:`-- LAG: значение предыдущей строки
SELECT name, salary,
  LAG(salary)  OVER (ORDER BY salary) AS prev_salary,
  LEAD(salary) OVER (ORDER BY salary) AS next_salary,
  salary - LAG(salary) OVER (ORDER BY salary) AS gap_from_prev
FROM users;

-- LAG с PARTITION
SELECT user_id, order_date, amount,
  LAG(amount) OVER (PARTITION BY user_id ORDER BY order_date) AS prev_order
FROM orders
LIMIT 20;

-- FIRST_VALUE
SELECT name, dept_id, salary,
  FIRST_VALUE(salary) OVER (PARTITION BY dept_id ORDER BY salary DESC) AS top_salary_in_dept
FROM users;`}
 ,{title:'Задача: LAG/LEAD',xp:20,type:'task',description:`1. Для каждого пользователя: его зарплата и зарплата предыдущего (по id) — разница\n2. Для каждого заказа: предыдущий заказ того же пользователя (LAG PARTITION BY user_id)\n3. Найди пользователей чья зарплата на 15000+ больше предыдущего в сортировке по salary\n4. Разница между максимальной зарплатой в департаменте и каждым сотрудником (FIRST_VALUE)`,code:null}
]}

// PYTHON PRACTICE
);
