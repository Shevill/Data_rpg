QUESTS.push(
// ---- PYTHON ----
{
  id:'py1', trackId:'python', title:'Синтаксис и типы', emoji:'🔤', isBoss:false,
  steps:[
    { title:'Теория: типы и операторы', xp:10, type:'theory',
      description:'Python — интерпретируемый язык с динамической типизацией.\n\nОсновные типы:\n• int — целые числа: 42, -7\n• float — дробные: 3.14\n• str — строки: \'hello\', "world"\n• bool — True / False\n• None — отсутствие значения\n\nПроверка типа: type(x)\nПриведение: int(\'42\'), str(3.14), float(\'3.14\')\n\nОператоры:\n• Арифметика: + - * / // % **\n• Сравнение: == != < > <= >=\n• Логика: and, or, not\n• Принадлежность: in, not in\n\nСтроки — неизменяемые. Методы: .upper(), .lower(), .strip(), .split(), .join(), f-строки: f\'Hello, {name}!\'',
      code:null },
    { title:'Код: набери руками', xp:15, type:'code',
      description:'Набери руками, не копируй:',
      code:`# Типы и операции
x = 42
name = "Alice"
pi = 3.14
is_analyst = True

print(type(x))          # <class 'int'>
print(f"Hello, {name}! x={x}, pi={pi:.2f}")

# Строковые операции
text = "  Data Science  "
print(text.strip().lower())   # "data science"
words = "sql,python,ml".split(",")
print(" | ".join(words))       # "sql | python | ml"

# Условия
if x > 10 and is_analyst:
    print("Senior analyst")
elif x > 0:
    print("Junior")
else:
    print("Something went wrong")` },
    { title:'Задача: функция describe(x)', xp:20, type:'task',
      description:'Напиши функцию describe(x), которая:\n1. Определяет тип переменной через type()\n2. Если str — выводит длину и первый символ\n3. Если int/float — выводит квадрат числа\n4. Если bool — выводит противоположное значение\n\nПроверь на: 42, 3.14, \'Python\', True, None',
      code:null },
    { title:'Recall: без подглядывания', xp:10, type:'recall',
      description:'За 2 минуты без подглядывания:\n1. Чем int отличается от float?\n2. Что вернёт type(\'hello\')?\n3. Как создать f-строку с переменной name?\n4. Что такое None?',
      code:null }
  ]
},
{
  id:'py2', trackId:'python', title:'Списки и кортежи', emoji:'📋', isBoss:false,
  steps:[
    { title:'Теория: list и tuple', xp:10, type:'theory',
      description:'list — изменяемая упорядоченная коллекция:\ndata = [1, 2, 3, \'four\', True]\n\nКлючевые методы:\n• .append(x) — добавить в конец O(1)\n• .insert(i, x) — вставить по индексу O(n)\n• .pop() / .pop(i) — удалить последний / по индексу\n• .remove(x) — удалить первое вхождение\n• .sort() — сортировка in-place\n• sorted(lst) — возвращает новый список\n• len(lst) — длина\n• lst[i] — индекс (с 0), lst[-1] — последний\n• lst[1:3] — срез\n\ntuple — неизменяемый список:\npoint = (10, 20)\n\nКогда tuple вместо list:\n• Координаты, RGB, константы — нельзя случайно изменить\n• Чуть быстрее и меньше памяти\n• Можно использовать как ключ dict (list нельзя!)\n\nList comprehension:\n[x**2 for x in range(10) if x % 2 == 0]',
      code:null },
    { title:'Код: работа со списком', xp:15, type:'code',
      description:'Набери руками:',
      code:`# Работа со списком
numbers = [3, 1, 4, 1, 5, 9, 2, 6, 5, 3]

# Базовые операции
print(f"Length: {len(numbers)}")
print(f"First: {numbers[0]}, last: {numbers[-1]}")
print(f"Slice [2:5]: {numbers[2:5]}")

# Изменение
numbers.append(7)
numbers.insert(0, 0)
numbers.pop()

# Сортировка
print(sorted(numbers))         # новый список
numbers.sort(reverse=True)     # in-place
print(numbers)

# List comprehension
squares = [x**2 for x in range(1, 6)]
evens   = [x for x in numbers if x % 2 == 0]
print(squares, evens)

# Tuple
point = (10, 20)
x, y = point  # распаковка
print(f"x={x}, y={y}")` },
    { title:'Задача: случайные числа', xp:20, type:'task',
      description:'1. Создай список из 10 случайных чисел (random.randint)\n2. Найди среднее без numpy (sum / len)\n3. Удали все числа меньше среднего\n4. Отсортируй по убыванию\n5. Через list comprehension создай список квадратов оставшихся\n6. Запиши результаты на каждом шаге',
      code:null },
    { title:'Recall: list vs tuple', xp:10, type:'recall',
      description:'За 2 минуты:\n1. Чем list отличается от tuple?\n2. Что такое list comprehension — напиши пример\n3. В чём разница .sort() и sorted()?\n4. Почему tuple можно использовать как ключ dict, а list нельзя?',
      code:null }
  ]
},
{
  id:'py3', trackId:'python', title:'Словари и множества', emoji:'🗂️', isBoss:false,
  steps:[
    { title:'Теория: dict и set', xp:10, type:'theory',
      description:'dict — хэш-таблица. Ключ → значение, поиск O(1).\n\nКак работает хэш-таблица:\n1. hash(key) вычисляет целое число\n2. Число определяет \'ячейку\' в массиве\n3. При коллизии — цепочки или открытая адресация\nРезультат: поиск, вставка, удаление = O(1) в среднем\n\nСоздание:\nuser = {\'name\': \'Alice\', \'age\': 30}\nd = dict(name=\'Alice\', age=30)\n\nОперации:\n• d[key] — получить (KeyError если нет)\n• d.get(key, default) — безопасно\n• d[key] = val — установить\n• del d[key] — удалить\n• key in d — проверка O(1)\n• d.keys(), d.values(), d.items()\n\nset — неупорядоченное множество уникальных значений:\ns = {1, 2, 3}\nОперации: | (объединение), & (пересечение), - (разность), in — O(1)\n\nDict comprehension:\n{k: v**2 for k, v in d.items()}',
      code:null },
    { title:'Код: счётчик слов', xp:15, type:'code',
      description:'Набери руками:',
      code:`# Dict — счётчик слов
text = "python sql python ml python sql data"
word_count = {}
for word in text.split():
    word_count[word] = word_count.get(word, 0) + 1
print(word_count)
# → {'python': 3, 'sql': 2, 'ml': 1, 'data': 1}

# Более питонически:
from collections import Counter
print(Counter(text.split()))

# Dict comprehension
squared = {k: v**2 for k, v in {'a': 1, 'b': 2, 'c': 3}.items()}
print(squared)

# Set — уникальные значения
skills_1 = {'python', 'sql', 'excel', 'tableau'}
skills_2 = {'python', 'ml', 'sql', 'pytorch'}

print("Common:", skills_1 & skills_2)
print("All:", skills_1 | skills_2)
print("Only in first:", skills_1 - skills_2)

# Проверка принадлежности O(1)
print('python' in skills_1)  # True` },
    { title:'Задача: group_by функция', xp:20, type:'task',
      description:'1. Возьми список из 20+ строк\n2. Подсчитай частоту каждого значения через dict\n3. Найди топ-3 по частоте\n4. Создай set уникальных значений и сравни len со списком\n5. Напиши функцию group_by(lst, key_fn) — группирует список по ключу (как SQL GROUP BY)\n   Пример: group_by([1,2,3,4,5], lambda x: \'even\' if x%2==0 else \'odd\')',
      code:null },
    { title:'Recall: хэш-таблица', xp:10, type:'recall',
      description:'За 2 минуты:\n1. Почему поиск в dict занимает O(1)?\n2. Чем отличается d[key] от d.get(key)?\n3. Когда использовать set вместо list?\n4. Что такое хэш-коллизия?',
      code:null }
  ]
},
{
  id:'py4', trackId:'python', title:'Функции и замыкания', emoji:'⚙️', isBoss:false,
  steps:[
    { title:'Теория: функции и замыкания', xp:10, type:'theory',
      description:'Функция — переиспользуемый блок кода.\n\nОбъявление:\ndef greet(name, greeting=\'Hello\'):\n    return f\'{greeting}, {name}!\'\n\nАргументы:\n• позиционные: f(1, 2)\n• именованные: f(b=2, a=1)\n• *args — переменное кол-во позиционных\n• **kwargs — переменное кол-во именованных\n\nlambda — анонимная функция:\ndouble = lambda x: x * 2\nsorted(data, key=lambda x: x[\'age\'])\n\nОбласть видимости (LEGB):\nLocal → Enclosing → Global → Built-in\n\nЗамыкание — функция помнит переменные из внешней области:\ndef make_multiplier(n):\n    def multiply(x):\n        return x * n  # n \'захвачена\' из внешней функции\n    return multiply\n\ndouble = make_multiplier(2)\nprint(double(5))  # 10\n\nДекораторы — функции, оборачивающие другие функции.',
      code:null },
    { title:'Код: аргументы и замыкание', xp:15, type:'code',
      description:'Набери руками:',
      code:`# Базовая функция с дефолтом
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

# *args и **kwargs
def log(*args, **kwargs):
    prefix = kwargs.get('prefix', 'INFO')
    print(f"[{prefix}]", *args)

log("Request", "done")
log("Error", prefix="ERROR")

# Lambda + sorted
users = [{'name': 'Alice', 'age': 25}, {'name': 'Bob', 'age': 20}, {'name': 'Carol', 'age': 30}]
by_age = sorted(users, key=lambda u: u['age'])
print([u['name'] for u in by_age])

# Замыкание
def make_counter(start=0):
    count = [start]
    def increment(step=1):
        count[0] += step
        return count[0]
    return increment

counter = make_counter()
print(counter())    # 1
print(counter(5))   # 6` },
    { title:'Задача: moving_average и @timer', xp:20, type:'task',
      description:'1. Напиши функцию moving_average(data, window) — скользящее среднее\n   Пример: moving_average([1,2,3,4,5], 3) → [2.0, 3.0, 4.0]\n2. Напиши декоратор @timer, который измеряет время выполнения функции\n   import time; используй time.time() до и после вызова\n3. Используй @timer на своей функции moving_average\n4. Напиши функцию compose(f, g) → возвращает функцию h(x) = f(g(x))',
      code:null },
    { title:'Recall: замыкания и LEGB', xp:10, type:'recall',
      description:'За 2 минуты:\n1. Что такое замыкание — напиши мини-пример\n2. Чем *args отличается от **kwargs?\n3. Что такое LEGB в Python?\n4. Зачем нужны декораторы?',
      code:null }
  ]
},
{
  id:'py5', trackId:'python', title:'ООП основы', emoji:'🏗️', isBoss:false,
  steps:[
    { title:'Теория: классы и наследование', xp:10, type:'theory',
      description:'ООП — парадигма, где код организован вокруг объектов.\n\nКласс — шаблон. Объект — экземпляр класса.\n\nclass Dog:\n    species = \'Canis familiaris\'  # атрибут класса\n    \n    def __init__(self, name, age):  # конструктор\n        self.name = name   # атрибут экземпляра\n        self.age = age\n    \n    def bark(self):        # метод\n        return f\'{self.name} говорит: Гав!\'\n    \n    def __repr__(self):    # строковое представление\n        return f\'Dog({self.name!r}, {self.age})\'\n\nНаследование:\nclass GuideDog(Dog):\n    def __init__(self, name, age, owner):\n        super().__init__(name, age)  # вызов родителя\n        self.owner = owner\n\nИнкапсуляция: _protected, __private\nПолиморфизм: разные классы — один интерфейс\n\n4 принципа: Абстракция, Инкапсуляция, Наследование, Полиморфизм',
      code:null },
    { title:'Код: класс Dataset', xp:15, type:'code',
      description:'Набери руками — класс для аналитики:',
      code:`class Dataset:
    def __init__(self, name, data):
        self.name = name
        self._data = data      # protected
        self._stats = None     # кэш статистики

    def __len__(self):
        return len(self._data)

    def __repr__(self):
        return f"Dataset('{self.name}', n={len(self)})"

    @property
    def stats(self):
        if self._stats is None:  # вычисляем один раз
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
print(positive.stats)` },
    { title:'Задача: класс MLModel', xp:20, type:'task',
      description:'Создай класс MLModel:\n• Атрибуты: name, predictions=[], actuals=[]\n• Метод add_prediction(predicted, actual)\n• Метод accuracy() — доля верных предсказаний\n• Метод mae() — средняя абсолютная ошибка\n• Метод __repr__\n\nСоздай подкласс ClassificationModel с методом confusion_matrix() — возвращает dict {TP, FP, TN, FN}\n\nПроверь на 10+ примерах.',
      code:null },
    { title:'Recall: ООП концепции', xp:10, type:'recall',
      description:'За 2 минуты:\n1. Что такое __init__ и зачем self?\n2. Чем атрибут класса отличается от атрибута экземпляра?\n3. Что делает super()?\n4. Что такое @property?',
      code:null }
  ]
},
{
  id:'py6', trackId:'python', title:'Алгоритмы: O(n), сортировки, поиск', emoji:'⚔️', isBoss:true,
  steps:[
    { title:'Теория: сложность алгоритмов', xp:50, type:'theory',
      description:'⚔️ ФИНАЛЬНЫЙ БОСС: Алгоритмы\n\nСложность алгоритма — как растёт время с ростом данных:\n• O(1) — константа: dict lookup, list[i]\n• O(log n) — логарифм: бинарный поиск\n• O(n) — линейный: проход по списку\n• O(n log n) — хороший: TimSort, merge sort\n• O(n²) — квадратичный: вложенный цикл, пузырьковая сортировка\n• O(2ⁿ) — экспоненциальный: перебор всех подмножеств\n\nПочему важно:\n• n=1000: O(n)=1000 операций, O(n²)=1,000,000 операций\n• n=1,000,000: разница между O(n log n) и O(n²) — секунды vs часы\n\nАлгоритмы сортировки:\n• Bubble sort O(n²) — учебный, не используй в продакшене\n• Merge sort O(n log n) — стабильный, рекурсивный\n• Python sorted() — TimSort O(n log n), лучший в среднем\n\nПоиск:\n• Линейный O(n) — проход по списку\n• Бинарный O(log n) — только в ОТСОРТИРОВАННОМ списке\n\nПрактически: используй встроенные алгоритмы Python. Понимание O(n) нужно чтобы не писать случайно O(n²).',
      code:null },
    { title:'Код: реализуй сам', xp:60, type:'code',
      description:'🚫 Подсказок нет. Реализуй сам:\n\n1. Bubble sort (для понимания)\n2. Merge sort рекурсивно\n3. Binary search\n4. Замерь время (time.time()) для n=100, 1000, 10000\n   и сравни bubble_sort vs sorted() vs merge_sort',
      code:null },
    { title:'Задача: O(n) vs O(n²)', xp:60, type:'task',
      description:'🚫 Без подсказок:\n\n1. Найди в списке из 10000 элементов все пары (i,j) где data[i]+data[j]==target\n   ПЕРВОЕ РЕШЕНИЕ: наивное O(n²) — два вложенных цикла\n   ВТОРОЕ РЕШЕНИЕ: O(n) через set — для каждого x проверь (target-x) in seen\n2. Замерь время обоих решений\n3. Объясни разницу\n4. Реализуй функцию find_duplicates(lst) за O(n) используя Counter',
      code:null },
    { title:'Recall: алгоритмическое мышление', xp:30, type:'recall',
      description:'За 5 минут без подглядывания:\n1. Что такое O(n log n) — объясни словами\n2. Почему dict.get(key) быстрее чем поиск в list?\n3. В каких условиях работает бинарный поиск?\n4. Назови 3 структуры данных и их O-сложность для поиска',
      code:null }
  ]
},
{id:'py-p1',trackId:'python',practice:true,emoji:'⚡',title:'Comprehensions и lambda',steps:[
  {title:'List / dict / set comprehensions',xp:15,type:'code',description:'Питонический компактный стиль',code:`# List comprehension
squares  = [x**2 for x in range(10)]
evens    = [x for x in range(20) if x % 2 == 0]
flat     = [x for row in [[1,2],[3,4],[5,6]] for x in row]

# Dict comprehension
lengths  = {w: len(w) for w in ['python','data','science']}
inverted = {v: k for k, v in {'a':1,'b':2,'c':3}.items()}

# Set comprehension
uniq_len = {len(w) for w in ['hello','world','python','code']}

# Generator (ленивый — не хранит список)
total = sum(x**2 for x in range(1_000_000))

print(squares)
print(evens)
print(lengths)
print(uniq_len)
print(total)`}
 ,{title:'Задача: comprehensions',xp:20,type:'task',description:`Реши в одну строку через comprehension или generator.\n1. Кубы нечётных чисел от 1 до 19\n2. Словарь {число: "чётное"/"нечётное"} для чисел 1-10\n3. Множество уникальных букв фразы "data science" (без пробелов)\n4. Сумма квадратов чисел делящихся на 3 в диапазоне 1-100 (generator)`,code:null}
 ,{title:'lambda, map, filter, zip',xp:15,type:'code',description:'Функциональные инструменты',code:`# lambda
double = lambda x: x * 2
clamp  = lambda x, lo, hi: max(lo, min(hi, x))

# map
nums    = [1, 2, 3, 4, 5]
squared = list(map(lambda x: x**2, nums))

# filter
evens   = list(filter(lambda x: x % 2 == 0, nums))

# zip — попарное объединение
names  = ['Alice','Bob','Charlie']
scores = [85, 92, 78]
paired = dict(zip(names, scores))
print(paired)

# sorted с ключом
data = [{'name':'Bob','age':30},{'name':'Alice','age':25},{'name':'Eve','age':27}]
by_age = sorted(data, key=lambda d: d['age'])
print(by_age)`}
 ,{title:'Задача: functional',xp:20,type:'task',description:`1. map: список температур в Цельсиях → Фаренгейт (F = C*9/5 + 32) — входные данные придумай сам\n2. filter: из списка слов оставь только длиннее 4 букв\n3. zip: объедини [1,2,3] и ['a','b','c'] в словарь {1:'a', 2:'b', 3:'c'}\n4. sorted с двумя ключами: сначала по длине строки, при равной длине — алфавитно`,code:null}
]},
{id:'py-p2',trackId:'python',practice:true,emoji:'⚡',title:'Строки, datetime, collections',steps:[
  {title:'Строковые методы',xp:15,type:'code',description:'Методы строк, f-строки, форматирование',code:`text = "  Hello, Data Science World!  "

# Базовые методы
print(text.strip())
print(text.lower())
print(text.replace(',', '').replace('!', ''))

# Split / join
words = text.strip().split()
print('-'.join(words))

# Поиск
print('Science' in text)
print(text.find('Data'))          # индекс или -1
print(text.count('l'))
print(text.strip().startswith('Hello'))

# f-строки
name, score, pi = 'Alice', 95.6789, 3.14159
print(f'{name}: {score:.1f}%')
print(f'{name:>10} | {score:08.2f}')  # выравнивание
print(f'{"="*30}')
print(f'Pi = {pi:.4f}')`}
 ,{title:'Задача: строки',xp:20,type:'task',description:`1. Из строки "2024-03-15" извлеки год, месяц, день через split — выведи "15 марта 2024"\n2. Функция is_palindrome(s) → bool (игнор регистр и пробелы)\n3. Подсчёт частоты слов: из любого текста верни dict {слово: кол-во}, lowercase, без знаков препинания\n4. f-string таблица: выведи 5 строк формата: имя (15 символов, левое выравнивание) | зарплата (10 символов, правое, с запятыми)`,code:null}
 ,{title:'datetime + collections',xp:15,type:'code',description:'Даты и полезные типы данных',code:`from datetime import datetime, timedelta
from collections import Counter, defaultdict

# datetime
now      = datetime.now()
birthday = datetime(1993, 5, 15)
age      = (now - birthday).days // 365
deadline = now + timedelta(days=30)
print(f'Возраст: {age}')
print(f'Дедлайн: {deadline.strftime("%d.%m.%Y")}')
print(f'День недели: {now.strftime("%A")}')

# Counter
words = ['apple','banana','apple','cherry','banana','apple']
cnt   = Counter(words)
print(cnt.most_common(2))  # топ-2

# defaultdict — без KeyError
groups = defaultdict(list)
data   = [('Alice','Eng'),('Bob','HR'),('Carol','Eng'),('Dave','HR')]
for name, dept in data:
    groups[dept].append(name)
print(dict(groups))`}
 ,{title:'Задача: datetime + collections',xp:20,type:'task',description:`1. Дней до Нового года (1 января следующего года) — используй datetime\n2. Counter из списка оценок [5,4,3,5,4,5,3,2,5] — топ-2 и сколько раз встречаются\n3. defaultdict: сгруппируй слова по первой букве из любого списка слов\n4. Разница в днях между датами '2024-01-15' и '2024-11-30' через strptime`,code:null}
]}

// DS PRACTICE
);
