QUESTS.push(
// ---- A/B TESTS ----
{
  id:'ab1', trackId:'ab', title:'ЦПТ и нормальное распределение', emoji:'🔔', isBoss:false,
  steps:[
    { title:'Теория: ЦПТ', xp:10, type:'theory',
      description:'Центральная предельная теорема (ЦПТ) — фундамент A/B тестирования.\n\nЦПТ: при достаточно большом n выборочное среднее X̄ распределено нормально:\nX̄ ~ N(μ, σ²/n)\n\nСтандартная ошибка среднего:\nSE = σ / √n\n\nДля долей (конверсий):\nSE = √(p(1-p)/n)\n\nПравило 3 сигм:\n• 68% данных в [μ-σ, μ+σ]\n• 95% в [μ-1.96σ, μ+1.96σ]\n• 99.7% в [μ-3σ, μ+3σ]\n\nZ-оценка (стандартизация):\nz = (X̄ - μ) / SE\n\nКлючевое: ЦПТ говорит о распределении ВЫБОРОЧНЫХ СРЕДНИХ, не самих данных. Даже если исходные данные скошены — средние выборок стремятся к нормальному распределению при n ≥ 30.',
      code:null },
    { title:'Код: симуляция ЦПТ', xp:15, type:'code',
      description:'Наблюдаем ЦПТ: как средние нормализуются независимо от исходного распределения',
      code:`import numpy as np

np.random.seed(42)

# Скошенное распределение (не нормальное)
population = np.random.exponential(scale=10, size=100_000)
print(f"Популяция (экспоненциальная):")
print(f"  mean={population.mean():.2f}, std={population.std():.2f}")
print(f"  min={population.min():.2f}, max={population.max():.2f}")
print()

# ЦПТ: средние выборок → нормальное при росте n
print("n    | mean_of_means | sim_SE | theor_SE")
print("-" * 44)
for n in [5, 15, 30, 100]:
    sample_means = [np.random.choice(population, n).mean() for _ in range(2000)]
    sm = np.array(sample_means)
    theo_se = population.std() / n**0.5
    print(f"n={n:3d}: {sm.mean():11.3f} | {sm.std():6.4f} | {theo_se:6.4f}")

# SE для долей (конверсий)
print()
print("SE для долей p=0.12:")
for n in [100, 500, 1000, 5000]:
    se = (0.12 * 0.88 / n)**0.5
    print(f"  n={n:5d}: SE={se:.4f}")`},
    { title:'Задача: ЦПТ расчёты', xp:20, type:'task',
      description:`1. Конверсия p=0.08, n=2000 — вычисли SE → 0.006|0.0061\n2. np.random.seed(0): 10000 выборок по n=40 из Uniform(0,1) — SE выборочных средних ≈ → 0.045|0.046|0.0456\n3. SE уменьшился вдвое. Во сколько раз вырос n? → 4\n4. z-оценка: X̄=52, μ=50, σ=8, n=64 → 2.0`,
      code:null },
    { title:'Recall: ЦПТ', xp:10, type:'recall',
      description:'За 2 минуты:\n1. Что утверждает ЦПТ о выборочных средних?\n2. Как SE зависит от n? Если n увеличить в 4 раза — SE как изменится?\n3. Формула SE для долей\n4. Зачем ЦПТ нужна для A/B тестов?',
      code:null }
  ]
},
{
  id:'ab2', trackId:'ab', title:'Доверительные интервалы', emoji:'📏', isBoss:false,
  steps:[
    { title:'Теория: доверительные интервалы', xp:10, type:'theory',
      description:'Доверительный интервал (ДИ) — диапазон значений, который с заданной вероятностью содержит истинный параметр.\n\n95% ДИ для доли:\nCI = p̂ ± z * SE\nгде SE = √(p̂(1-p̂)/n)\n\nZ-критические значения:\n• 90% ДИ: z = 1.645\n• 95% ДИ: z = 1.960\n• 99% ДИ: z = 2.576\n\nЧасто путают:\n✓ ВЕРНО: "95% таких интервалов содержат истинный параметр"\n✗ НЕВЕРНО: "истинный параметр с 95% вероятностью в этом интервале"\nИстинный параметр фиксирован — он либо в интервале, либо нет.\n\nШирина ДИ зависит от:\n• n — чем больше, тем уже (пропорционально 1/√n)\n• σ — чем больше разброс, тем шире\n• Уровень доверия — 99% шире 95%\n\nПрактическое правило:\nЕсли 95% ДИ разницы двух групп не включает 0 → эффект статистически значим на уровне α=0.05.',
      code:null },
    { title:'Код: расчёт ДИ', xp:15, type:'code',
      description:'Считаем доверительные интервалы — без scipy, только math:',
      code:`import numpy as np
from math import sqrt

Z = {0.90: 1.645, 0.95: 1.960, 0.99: 2.576}

def ci_proportion(p_hat, n, confidence=0.95):
    z = Z[confidence]
    se = sqrt(p_hat * (1 - p_hat) / n)
    return (round(p_hat - z*se, 4), round(p_hat + z*se, 4))

def ci_mean(sample, confidence=0.95):
    n = len(sample)
    z = Z[confidence]
    se = np.std(sample, ddof=1) / sqrt(n)
    m = np.mean(sample)
    return (round(m - z*se, 2), round(m + z*se, 2))

# A/B тест: кнопка "Оформить заказ"
p_hat, n = 0.12, 500
print(f"Конверсия: p̂={p_hat}, n={n}")
for conf in [0.90, 0.95, 0.99]:
    lo, hi = ci_proportion(p_hat, n, conf)
    print(f"  {conf:.0%} ДИ: ({lo}, {hi}), ширина={hi-lo:.4f}")

# Как n влияет на ширину
print("\\nЗависимость ширины 95% ДИ от n:")
for n in [50, 200, 500, 2000]:
    lo, hi = ci_proportion(0.12, n)
    print(f"  n={n:5d}: ({lo:.4f}, {hi:.4f}), ширина={hi-lo:.4f}")

# ДИ для среднего чека
np.random.seed(42)
checks = np.random.normal(1500, 400, 200)
lo, hi = ci_mean(checks)
print(f"\\nСредний чек: {checks.mean():.1f} руб.")
print(f"95% ДИ: ({lo}, {hi})")`},
    { title:'Задача: ДИ', xp:20, type:'task',
      description:`1. p̂=0.15, n=400: нижняя граница 95% ДИ → 0.115|0.1150\n2. p̂=0.15, n=1600: нижняя граница 95% ДИ → 0.1325|0.132\n3. Почему интервал при n=1600 вдвое уже чем при n=400? → 4|вчетверо|четыре\n4. 95% ДИ конверсии = (0.09, 0.13). Значимо ли отличие от 0.10? → нет|не значимо|нет оснований`,
      code:null },
    { title:'Recall: ДИ', xp:10, type:'recall',
      description:'За 2 минуты:\n1. Что ПРАВИЛЬНО означает "95% доверительный интервал"?\n2. Z-значения для 90%, 95%, 99% ДИ — назови наизусть\n3. Как изменится ширина ДИ если n увеличить в 4 раза?\n4. ДИ = (0.08, 0.14). Включает ли 0 (нулевой эффект)?',
      code:null }
  ]
},
{
  id:'ab3', trackId:'ab', title:'Проверка гипотез', emoji:'🎯', isBoss:false,
  steps:[
    { title:'Теория: гипотезы и ошибки', xp:10, type:'theory',
      description:'Проверка гипотез — формальный метод принятия решений на основе данных.\n\nH₀ (нулевая): нет эффекта (p_B = p_A)\nH₁ (альтернативная): есть эффект (p_B ≠ p_A)\n\np-value — вероятность получить такой или более экстремальный результат, если H₀ верна. Если p < α → отвергаем H₀.\n\nОшибки принятия решений:\n┌──────────────────┬──────────────┬──────────────┐\n│                  │ H₀ верна     │ H₀ ложна     │\n├──────────────────┼──────────────┼──────────────┤\n│ Отвергли H₀      │ Ошибка I рода│ ✓ Верно      │\n│                  │ α = 0.05     │ Мощность=1-β │\n├──────────────────┼──────────────┼──────────────┤\n│ Не отвергли H₀   │ ✓ Верно      │ Ошибка II рода│\n│                  │              │ β            │\n└──────────────────┴──────────────┴──────────────┘\n\nα (альфа) = P(ошибка I рода) = ложная тревога = 0.05\nβ (бета) = P(ошибка II рода) = пропустили эффект\nМощность = 1 - β = P(обнаружить реальный эффект)\n\nМножественное тестирование: при k тестах P(хоть 1 ложная тревога) = 1-(1-α)^k\nПоправка Бонферрони: α\' = α/k',
      code:null },
    { title:'Код: z-тест для долей', xp:15, type:'code',
      description:'Двухвыборочный z-тест для долей — реализуем с нуля:',
      code:`import numpy as np
from math import erf, sqrt

def norm_cdf(x):
    return (1 + erf(x / sqrt(2))) / 2

def two_prop_ztest(n_a, conv_a, n_b, conv_b):
    p_a = conv_a / n_a
    p_b = conv_b / n_b
    p_pool = (conv_a + conv_b) / (n_a + n_b)
    se = sqrt(p_pool * (1 - p_pool) * (1/n_a + 1/n_b))
    z = (p_b - p_a) / se
    p_value = 2 * (1 - norm_cdf(abs(z)))
    return dict(p_a=round(p_a,4), p_b=round(p_b,4),
                delta=round(p_b-p_a,4),
                uplift=round((p_b-p_a)/p_a*100,1),
                z=round(z,3), p_value=round(p_value,4))

# A/B тест: редизайн страницы оплаты
result = two_prop_ztest(n_a=2000, conv_a=200,  # контроль 10%
                        n_b=2000, conv_b=250)   # тест 12.5%
print("Результаты:")
for k, v in result.items():
    print(f"  {k}: {v}")

alpha = 0.05
sig = result['p_value'] < alpha
print(f"\\nЗначимо при α={alpha}:", "ДА — отвергаем H₀" if sig else "НЕТ")

# Множественное тестирование
print("\\nМножественное тестирование:")
for k in [1, 3, 5, 10]:
    fwer = 1 - (1-alpha)**k
    print(f"  k={k:2d} тестов: P(ложная тревога) = {fwer:.3f}")`},
    { title:'Задача: гипотезы', xp:20, type:'task',
      description:`1. Контроль n=3000 conv=330, тест n=3000 conv=390: вычисли p_value → 0.017|0.0172|0.016\n2. p_value < 0.05? → да|yes|true\n3. P(хоть 1 ложная тревога при 3 независимых тестах с α=0.05) → 0.142|0.143|14%\n4. Тест остановили досрочно когда увидели p=0.03. Почему это ошибка? → ошибка I|false positive|peeking|множественное`,
      code:null },
    { title:'Recall: гипотезы', xp:10, type:'recall',
      description:'За 2 минуты:\n1. Строгое определение p-value\n2. Ошибки I и II рода — в чём разница, что страшнее для бизнеса?\n3. Почему нельзя смотреть результаты до окончания теста?\n4. Что такое поправка Бонферрони и когда нужна?',
      code:null }
  ]
},
{
  id:'ab4', trackId:'ab', title:'Дизайн A/B теста', emoji:'🔬', isBoss:false,
  steps:[
    { title:'Теория: мощность и размер выборки', xp:10, type:'theory',
      description:'Дизайн теста определяет его способность найти реальный эффект.\n\n4 параметра связаны: знание 3 → вычислим 4-й:\n• α — уровень значимости (обычно 0.05)\n• β — P(ошибка II рода)\n• Мощность = 1 - β (стандарт: 0.80, лучше: 0.90)\n• MDE — минимальный обнаруживаемый эффект\n\nФормула n на группу (двусторонний z-тест):\nn = (z_α/2 + z_β)² × [p_a(1-p_a) + p_b(1-p_b)] / δ²\nгде δ = MDE (абсолютная разница долей)\n\nZ-значения:\n• z_α/2 при α=0.05 → 1.96\n• z_β при мощности 80% → 0.842\n• z_β при мощности 90% → 1.282\n\nЗависимости:\n• MDE ÷ 2 → n × 4 (обратная квадратичная)\n• Мощность 80% → 90% → n растёт ~34%\n• Снизить α → нужен бо́льший n\n\nПравила:\n1. Рассчитай n ДО запуска\n2. Не останавливай тест досрочно\n3. Один первичный KPI, guardrail-метрики — дополнительно',
      code:null },
    { title:'Код: расчёт размера выборки', xp:15, type:'code',
      description:'Планируем A/B тест правильно — расчёт n и анализ зависимостей:',
      code:`import numpy as np
from math import sqrt, ceil

Z = {0.80: 0.842, 0.90: 1.282, 0.95: 1.645, 0.975: 1.960}

def sample_size(p_base, mde, alpha=0.05, power=0.80):
    """Размер выборки на группу для двустороннего z-теста долей."""
    p_b = p_base + mde
    z_a = Z[1 - alpha/2]
    z_b = Z[power]
    n = (z_a + z_b)**2 * (p_base*(1-p_base) + p_b*(1-p_b)) / mde**2
    return int(ceil(n))

# Базовый случай
p_base, mde = 0.10, 0.02
n = sample_size(p_base, mde)
print(f"p_base={p_base:.0%}, MDE=+{mde:.0%}")
print(f"n на группу: {n:,} | всего: {n*2:,}")

# Влияние MDE на n (обратная квадратичная зависимость!)
print("\\nMDE → n на группу:")
for m in [0.005, 0.01, 0.02, 0.04]:
    nn = sample_size(0.10, m)
    print(f"  MDE={m:.1%}: {nn:>7,}")

# Влияние мощности
print("\\nМощность → n:")
for pw in [0.70, 0.80, 0.90]:
    nn = sample_size(0.10, 0.02, power=pw)
    print(f"  Мощность {pw:.0%}: {nn:>6,}")

# SRM-проверка: ожидаемое соотношение 50/50
def srm_check(n_control, n_treat):
    total = n_control + n_treat
    expected = total / 2
    chi2 = (n_control - expected)**2/expected + (n_treat - expected)**2/expected
    print(f"χ² = {chi2:.2f} ({'⚠ SRM!' if chi2 > 3.841 else '✓ ОК'})")

print("\\nSRM проверка:")
srm_check(4823, 5177)   # подозрительно
srm_check(5013, 4987)   # ОК`},
    { title:'Задача: дизайн', xp:20, type:'task',
      description:`1. sample_size(0.05, 0.01): n на группу при α=0.05, power=80% → 8157|8158\n2. MDE уменьши вдвое (с 1% до 0.5%) — n увеличится в сколько раз? → 4\n3. Трафик 2000/день, тест 7 дней, split 50/50 → 7000 на группу. Хватит при n=8157? → нет|no\n4. Мощность 90% вместо 80% при тех же p_base, MDE — n больше или меньше? → больше|more|выше`,
      code:null },
    { title:'Recall: дизайн', xp:10, type:'recall',
      description:'За 2 минуты:\n1. Что такое мощность теста и почему нельзя брать мощность 50%?\n2. Что такое MDE — кто его определяет и как?\n3. Почему нельзя досрочно останавливать тест?\n4. Что такое SRM и как его обнаружить?',
      code:null }
  ]
},
{
  id:'ab5', trackId:'ab', title:'Полный A/B тест', emoji:'⚔️', isBoss:true,
  steps:[
    { title:'Теория: полный цикл', xp:50, type:'theory',
      description:'⚔️ ФИНАЛЬНЫЙ БОСС A/B ТЕСТОВ\n\nПолный цикл A/B эксперимента:\n1. Бизнес-гипотеза → формализация H₀/H₁\n2. Выбор метрики (primary + guardrail)\n3. Расчёт n и длительности теста\n4. Рандомизация (unit of randomization!)\n5. AA-тест — проверка системы без изменений\n6. Запуск + мониторинг (SRM, guardrail)\n7. Анализ: z-тест, ДИ, uplift\n8. Принятие решения + rollout\n\nКлючевые ловушки:\n• Peeking — досрочная остановка при p<0.05 → ложные позитивы\n• SRM — нарушение рандомизации → недостоверные результаты\n• Novelty effect — пользователи реагируют на новизну\n• Network effects — контаминация групп\n• Multiple testing — тестируем 10 метрик, 1 случайно значима\n\nUnit of randomization:\nПользователь > Сессия > Устройство\nВажно: один пользователь всегда в одной группе!\n\nITT (Intention To Treat): анализируем всех назначенных в группу, даже не увидевших изменение.',
      code:null },
    { title:'Код: финальный анализ', xp:60, type:'code',
      description:'🚫 Без подсказок. Напиши полный анализ A/B теста — все шаги:',
      code:`import numpy as np
from math import sqrt, erf, ceil

# --- Вспомогательные функции ---
def norm_cdf(x): return (1 + erf(x / sqrt(2))) / 2

# --- Данные теста ---
# Кейс: редизайн страницы оформления заказа
# Гипотеза: новый UI → рост конверсии с ~8% до 10%+
np.random.seed(42)

n_control = 5000
n_treat   = 5000
# Симулируем: реальный эффект +1.4%
p_control = 0.082
p_treat   = 0.096

conv_control = int(n_control * p_control)
conv_treat   = int(n_treat   * p_treat)

print("=== A/B Тест: UI страницы оформления ===")
print(f"Контроль: {conv_control}/{n_control} = {conv_control/n_control:.1%}")
print(f"Тест:     {conv_treat}/{n_treat} = {conv_treat/n_treat:.1%}")
print()

# Твой код:
# 1. SRM check — ожидали 50/50?
# 2. Z-тест для двух пропорций
# 3. 95% ДИ для абсолютного uplift (разницы долей)
# 4. Относительный uplift в %
# 5. Вывод для бизнеса — запускать?`},
    { title:'Задача: A/B проект', xp:60, type:'task',
      description:'🚫 Без подсказок. Реальный или симулированный A/B тест:\n\n1. Опиши бизнес-гипотезу: что меняем, какая primary metric, какой guardrail\n2. Рассчитай нужный n — покажи расчёт с конкретными числами\n3. Проведи z-тест и вычисли p-value + 95% ДИ для разницы\n4. Проверь SRM через χ² тест\n5. Сформулируй вывод для бизнеса: запускать ли фичу и почему',
      code:null },
    { title:'Recall: A/B тесты', xp:30, type:'recall',
      description:'За 5 минут:\n1. Перечисли 7 шагов полного цикла A/B теста\n2. Что такое SRM и как критично?\n3. Ошибки I и II рода — конкретные примеры из e-commerce\n4. Объясни peeking — почему ломает тест и как избежать?',
      code:null }
  ]
},
{id:'ab-p1',trackId:'ab',practice:true,emoji:'⚡',title:'Практика расчётов',steps:[
  {title:'Статистические тесты',xp:15,type:'code',description:'Реализуем основные тесты с нуля',code:`import numpy as np
from math import sqrt, erf, ceil

def norm_cdf(x): return (1 + erf(x / sqrt(2))) / 2

Z = {0.80:0.842, 0.90:1.282, 0.95:1.645, 0.975:1.960}

def one_sample_ztest(data, mu0):
    n = len(data)
    z = (np.mean(data) - mu0) / (np.std(data, ddof=1) / n**0.5)
    return round(z, 3), round(2*(1-norm_cdf(abs(z))), 4)

def two_prop_ztest(n_a, conv_a, n_b, conv_b):
    p_a, p_b = conv_a/n_a, conv_b/n_b
    p_pool = (conv_a+conv_b)/(n_a+n_b)
    se = sqrt(p_pool*(1-p_pool)*(1/n_a+1/n_b))
    z = (p_b-p_a)/se
    return round(z,3), round(2*(1-norm_cdf(abs(z))),4)

def srm_chi2(n_control, n_treat):
    total = n_control + n_treat
    exp = total / 2
    return round((n_control-exp)**2/exp + (n_treat-exp)**2/exp, 3)

def sample_size(p_base, mde, alpha=0.05, power=0.80):
    p_b = p_base + mde
    n = (Z[1-alpha/2]+Z[power])**2*(p_base*(1-p_base)+p_b*(1-p_b))/mde**2
    return int(ceil(n))

# Тест 1: one-sample z-test
np.random.seed(42)
data = np.random.normal(105, 15, 100)
z, pv = one_sample_ztest(data, mu0=100)
print(f"One-sample: z={z}, p={pv}, значим={'да' if pv<0.05 else 'нет'}")

# Тест 2: two-prop z-test
z2, pv2 = two_prop_ztest(1000, 85, 1000, 110)
print(f"Two-prop:   z={z2}, p={pv2}, значим={'да' if pv2<0.05 else 'нет'}")

# SRM
chi2 = srm_chi2(4823, 5177)
print(f"SRM χ²={chi2}, ⚠ SRM={'да' if chi2>3.841 else 'нет'}")

# Sample size
n = sample_size(0.10, 0.02)
print(f"Sample size n={n}")`}
 ,{title:'Задача: тесты',xp:20,type:'task',description:`1. one_sample_ztest(seed(42), Normal(105,15), n=100, mu0=100): p < 0.05? → да|yes|true\n2. two_prop_ztest(1000,85,1000,110): p < 0.05? → нет|no|false\n3. srm_chi2(4823,5177): χ² > 3.841? → да|yes|true\n4. sample_size(0.10, 0.02) → 3840|3839|3841|3842`,code:null}
 ,{title:'Мощность: симуляция',xp:15,type:'code',description:'Сравниваем аналитику и симуляцию мощности',code:`import numpy as np
from math import sqrt, erf, ceil

def norm_cdf(x): return (1 + erf(x / sqrt(2))) / 2
Z = {0.80:0.842, 0.975:1.960}

def sample_size(p_a, mde, alpha=0.05, power=0.80):
    p_b = p_a + mde
    n = (Z[1-alpha/2]+Z[power])**2*(p_a*(1-p_a)+p_b*(1-p_b))/mde**2
    return int(ceil(n))

def simulate_power(p_a, p_b, n, alpha=0.05, n_sims=2000):
    np.random.seed(0)
    rejects = 0
    for _ in range(n_sims):
        ca = np.random.binomial(n, p_a)
        cb = np.random.binomial(n, p_b)
        p_pool = (ca+cb)/(2*n)
        if 0 < p_pool < 1:
            z = abs((cb/n-ca/n)/sqrt(p_pool*(1-p_pool)*2/n))
            if 2*(1-norm_cdf(z)) < alpha:
                rejects += 1
    return round(rejects/n_sims, 3)

p_a, mde = 0.10, 0.02
n = sample_size(p_a, mde)
print(f"Аналитический n={n} (целевая мощность 80%)")
emp = simulate_power(p_a, p_a+mde, n)
print(f"Симулированная мощность: {emp:.1%}")

print("\\nМощность при разных n:")
for test_n in [500, 1000, 2000, n]:
    pw = simulate_power(p_a, p_a+mde, test_n)
    print(f"  n={test_n:>5}: мощность={pw:.1%}")`}
 ,{title:'Задача: мощность',xp:20,type:'task',description:`1. simulate_power(0.10, 0.12, 3840, n_sims=2000): мощность близка к 80%? → да|yes|true|0.8\n2. simulate_power(0.10, 0.12, 500, n_sims=2000): мощность ниже 80%? → да|yes|true\n3. Мощность 50% означает что тест обнаруживает эффект → 50%|монетка|случайно\n4. MDE = минимальный эффект который хотим ГАРАНТИРОВАННО поймать. Кто его задаёт? → бизнес|product|менеджер`,code:null}
]}
);
