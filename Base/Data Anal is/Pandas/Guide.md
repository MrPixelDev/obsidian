#pandas #numpy #pd #np

### Установка и импорт

Pandas легко установить через стандартный пакетный менеджер Python, используя команду `pip install pandas`.

После установки следует импортировать саму библиотеку. Поскольку Pandas строится на базе библиотеки NumPy — инструментария для работы с многомерными массивами — для удобства рекомендуется импортировать и её. Она также будет установлена автоматически в процессе установки Pandas.

```
import numpy as np
import pandas as pd
```

### Структуры хранения данных

Данные организованы в структурированные таблицы с индексами, что облегчает манипуляции с ними. Операции в Pandas оптимизированы для работы по столбцам — так во многих случаях производительность выше, чем в операциях по строкам.

Структур хранения данных в Pandas две — Series и DataFrame.

- **Series** — это одномерный массив данных с метками. Он может хранить различные типы данных, включая числа, строки и произвольные объекты Python. Каждому элементу в Series соответствует метка, доступ к которой можно получить через атрибут index.

```
series = pd.Series([1, 2, 3], index=["a", "b", "c"], dtype=np.uint8)
series
```

![pandas series](https://media.tproger.ru/user-uploads/75379/2023-09-29/1f5ef405-5abb-44e6-98ad-6a67046e4416.png)

Здесь и далее будет приводиться вывод в Jupyter Notebook

```
series.index
```

![pandas series index](https://media.tproger.ru/user-uploads/75379/2023-09-29/53d55769-eaee-4d0d-ad32-40b02d967fef.png)

  

Есть проводить аналогию со словарём `dict`, то индекс — это ключи словаря, а сам массив данных — значения, к которым можно получить доступ по ключу:

```
series["b"]  # Получаем доступ по метке, как по ключу в словаре
```

![pandas series](https://media.tproger.ru/user-uploads/75379/2023-09-29/f7917a52-b08a-44fa-8e98-2e1d592c241e.png)

- **DataFrame** — это двумерная структура данных, представляющая собой таблицу с метками для строк и столбцов. Каждый столбец в DataFrame является объектом типа Series. Вместе они формируют двумерную таблицу с общим индексом. В DataFrame присутствуют две оси индексации: index для строк и columns для столбцов. Метки столбцов — это их названия.

```
dataframe = pd.DataFrame([[1, "Ivan", 5.0], [2, "Sergey", 4.3], [3, "Dmitry", 4.5]], columns=["#", "Name", "Score"])
dataframe
```

![pandas dataframe](https://media.tproger.ru/user-uploads/75379/2023-09-29/33f75a6e-9243-43a1-8964-8e3f80d39fd0.png)

```
dataframe["Name"]  # Колонка — это объект Series
```

![pandas dataframe](https://media.tproger.ru/user-uploads/75379/2023-09-29/f8a22fa6-f280-457c-a344-046be9f2dec5.png)

```
dataframe["Name"].name  # У объекта Series есть собственное имя
```

![pandas dataframe](https://media.tproger.ru/user-uploads/75379/2023-09-29/3497e7c4-e212-4bfd-acbf-44970f0605f2.png)

### Операции чтения и записи данных

С помощью Pandas можно читать и записывать данные из различных источников: баз данных, файлов в форматах CSV, Excel, JSON и тому подобных. Для каждого типа данных существуют специализированные функции: `read_csv()`, `read_excel()` и другие вида `read_*()`.

```
titanic = pd.read_csv("titanic.csv")
titanic.head()
```

![pandas read csv](https://media.tproger.ru/user-uploads/75379/2023-09-29/8864e30e-9305-43d0-8834-c0c715020328.png)

Можно даже автоматически спарсить таблицу из веб-страницы, указав URL и порядковый номер таблицы:

```
from urllib.parse import quote
url = quote("https://ru.wikipedia.org/wiki/Таблица", safe=":/")  # Кодируем кириллицу
pd.read_html(url)[0]  # Берём первую таблицу из списка всех найденных на веб-странице
```

![pandas read](https://media.tproger.ru/user-uploads/75379/2023-09-29/b1196ed8-168a-45a9-bd6f-916ada1f7e1a.png)

Функции чтения принимают много параметров, так можно настраивать все необходимые опции, включая явное задание типов данных или соответствующих функций-конвертеров. Это позволяет предобработать данные или преобразовать их типы к более эффективным ещё на этапе чтения из источника.

Записать данные в файл так же просто, как и прочитать — используйте семейство методов `.to_*()`, например, `.to_excel()`:

```
titanic.to_excel("titanic.xlsx")
```

### Первичное исследование данных

После того как данные загружены из источника, следует получить общее представление о них.

Первые несколько строк датафрейма можно получить с помощью метода `.head()`, а последние — `.tail()`:

```
titanic.head(5)
```

![pandas head](https://media.tproger.ru/user-uploads/75379/2023-09-29/f95045e9-b8dd-4cb6-acdb-bc3ab58cb16e.png)

Тип данных `object` чаще всего соответствует строковым значениям:

```
titanic.dtypes
```

![pandas object](https://media.tproger.ru/user-uploads/75379/2023-09-29/938f4063-5a01-44d4-90b5-80819d5e2494.png)

Pandas позволяет автоматически подобрать наиболее эффективные представления с помощью метода `.convert_dtypes()`:

```
titanic.convert_dtypes().dtypes  # Строковые значения теперь представлены типом string, а не object
```

![pandas convert](https://media.tproger.ru/user-uploads/75379/2023-09-29/fe615267-8f08-4da3-95c9-a498cab68aa9.png)

Другой способ взглянуть на датафрейм — метод `.info()`. Он показывает количество строк, столбцов, их названия и типы, а также позволяет обнаружить столбцы с отсутствующими значениями.

```
titanic.info()
```

![pandas info](https://media.tproger.ru/user-uploads/75379/2023-09-29/c63e1088-d94b-46e0-a19d-4e5c8179c06d.png)

Например, в датасете 891 строка, однако количество ненулевых (non-null) значений в колонках Age, Cabin и Embarked меньше, значит, некоторые данные отсутствуют

Некоторую статистику по числовым столбцам можно собрать с помощью метода `.describe()`:

```
titanic.describe()
```

![pandas describe](https://media.tproger.ru/user-uploads/75379/2023-09-29/189eb3c1-a567-40e2-93d6-c55c13fd7e3e.png)

Количество различных значений можно посчитать с помощью `.value_counts()` — как для категориальных, так и для непрерывных данных:

```
titanic["Survived"].value_counts(normalize=True) # Какой процент пассажиров выжил?
```

![pandas value counts](https://media.tproger.ru/user-uploads/75379/2023-09-29/405ded22-841c-438f-95d9-1a12f63f8e23.png)

```
titanic["Pclass"].value_counts(dropna=False)  # Сколько пассажиров было в каждом классе?
```

![pandas value counts](https://media.tproger.ru/user-uploads/75379/2023-09-29/51fca715-95b4-47c5-a8eb-4a0948a23351.png)

### Индексирование

Операции обращения к элементам данных называются индексированием. 

В нашем датасете индексная колонка по умолчанию представлена целыми числами. Для наглядности в дальнейших примерах заменим индекс на колонку с именем пассажира:

```
titanic.set_index("Name", inplace=True)  # Производим изменения на месте — inplace
```

```
titanic.head()
```

![pandas head](https://media.tproger.ru/user-uploads/75379/2023-09-29/73a1ea10-fc13-4e68-8e4c-cedf1553cdaf.png)

Элементы индекса называются метками (лейблами):

```
titanic.index  # Это вертикальный индекс; для списка используйте titanic.index.tolist()
```

![pandas index](https://media.tproger.ru/user-uploads/75379/2023-10-05/729b0ada-67a2-4be7-9670-1ef36679734e.png)

Названия колонок — тоже метки:

```
titanic.columns  # Это горизонтальный индекс
```

![pandas columns](https://media.tproger.ru/user-uploads/75379/2023-10-05/e853da2b-8a67-44a2-b64f-de98ad850142.png)

К колонкам можно обращаться по их названиям:

```
titanic["Ticket"]
```

![pandas index](https://media.tproger.ru/user-uploads/75379/2023-09-29/ba41fd7d-7c26-4b00-bc89-21615012a164.png)

Если имя колонки удовлетворяет правилам именования переменных в Python и не совпадает с одним из уже существующих методов или атрибутов DataFrame, то к колонке можно обратиться как к атрибуту DataFrame:

```
titanic.Ticket;  # То же самое, что titanic["Ticket"]
```

Метод `.loc[]` есть и у Series, и у DataFrame. Он позволяет обращаться к данным по меткам:

```
titanic.loc["Heikkinen, Miss. Laina", "Ticket"]  # Метод объекта DataFrame
```

![pandas loc](https://media.tproger.ru/user-uploads/75379/2023-10-05/464fb431-65dd-4099-805e-b82c3d31d394.png)

```
titanic["Ticket"].loc["Heikkinen, Miss. Laina"]  # Метод объекта Series
```

![pandas loc](https://media.tproger.ru/user-uploads/75379/2023-10-05/4f009356-f5b9-4468-9548-f38fa97e5799.png)

```
titanic.loc["Heikkinen, Miss. Laina", ["Ticket", "Age"]]  # Можно выбрать несколько строк или колонок
```

![pandas loc](https://media.tproger.ru/user-uploads/75379/2023-09-29/fd955c8b-8002-4e61-910c-aaa802c940ea.png)

Метод `.iloc[]` работает аналогично, но вместо меток используются номера строк или столбцов:

```
titanic.iloc[2, 7]  # Нумерация начинается с нуля
```

![pandas iloc](https://media.tproger.ru/user-uploads/75379/2023-10-05/78eef922-9ee1-454f-ab74-15f747667d64.png)

```
titanic.iloc[0:3, 2:8]
```

![pandas iloc](https://media.tproger.ru/user-uploads/75379/2023-09-29/d095bf75-bfc0-4496-844d-dfc566ac653f.png)

С помощью `.at[]` можно обратиться к конкретной ячейке данных — как в Excel:

```
titanic.at["Heikkinen, Miss. Laina", "Ticket"]
```

![pandas at](https://media.tproger.ru/user-uploads/75379/2023-10-05/8a0765ea-9e12-446a-9fcb-053d6e327768.png)

При совершении операций над объектами DataFrame и Series Pandas пытается сопоставить элементы с одинаковыми индексами. Рассмотрим для примера последовательность Series с геометрической прогрессией, где каждый следующий элемент больше предыдущего в два раза:

```
series = pd.Series(2 ** np.arange(10))
series
```

![pandas series](https://media.tproger.ru/user-uploads/75379/2023-10-05/45c93d40-d9ad-4002-b5de-52643565bb7b.png)

Попытка попарно посчитать отношение следующего элемента к предыдущему приведёт к «странному» результату:

```
series[1:] / series[:-1]
```

![pandas series](https://media.tproger.ru/user-uploads/75379/2023-09-29/b1fd62c6-412f-483f-a65e-49a80677a6d1.png)

На самом деле мы хотели получить следующее:

```
series[1:] / series[:-1].values  # У массива .values уже нет индекса, и элементы сопоставляются просто последовательными парами
```

![pandas series](https://media.tproger.ru/user-uploads/75379/2023-09-29/9910ea69-a941-49a2-93db-5504ea086e8b.png)

### Объединение данных

Для объединения нескольких датафреймов можно использовать близкие по смыслу функции: `merge()`, `concat()` и `join()`. Вот несколько базовых примеров:

```
df1 = pd.DataFrame({"key": ["A", "B", "C", "D"], "value": [1, 2, 3, 4]})
df1
```

![pandas dataframe](https://media.tproger.ru/user-uploads/75379/2023-10-05/ac9e3aee-80c7-4687-9ba4-cfe828ed092e.png)

```
df2 = pd.DataFrame({"key": ["B", "D", "E", "F"], "value": [5, 6, 7, 8]})
df2
```

![pandas dataframe](https://media.tproger.ru/user-uploads/75379/2023-10-05/cfefd91d-ae8a-43d8-a5af-9f66e3db87d9.png)

```
pd.merge(df1, df2, on="key", how="inner")
```

![pandas merge](https://media.tproger.ru/user-uploads/75379/2023-09-29/a9cf6af0-88bc-4cef-97c8-08213a29c354.png)

```
pd.concat([df1, df2], axis=0, ignore_index=True)
```

![pandas concat](https://media.tproger.ru/user-uploads/75379/2023-09-29/115b83ac-9624-4d1e-9de4-b5cbaa3471b1.png)

```
df1.join(df2, how="inner", lsuffix="_1", rsuffix="_2")
```

![pandas join](https://media.tproger.ru/user-uploads/75379/2023-09-29/fe6f7fba-8f29-4c37-adc6-b771720a4a45.png)

### Агрегация данных

С помощью этих функций и методов можно взглянуть на данные в различных разрезах:

- `groupby()` — для группировки и агрегации данных с большой гибкостью;
- `pivot_table()` — для создания сводных таблиц с возможностью применения множественных агрегаций;
- `crosstab()` — для подсчёта частоты встречаемости категорий.

Рассчитаем средний возраст пассажиров с разбиением по полу:

```
titanic.groupby("Sex").Age.mean()
```

![pandas groupby](https://media.tproger.ru/user-uploads/75379/2023-10-05/770d1a18-9b39-4f26-9b1f-1df24a858583.png)

Построим сводную таблицу, рассчитав вероятность выживания в зависимости от пола и класса:

```
pd.pivot_table(titanic, values="Survived", index="Sex", columns="Pclass", aggfunc="mean")
```

![pandas pivot table](https://media.tproger.ru/user-uploads/75379/2023-10-05/6817cd49-09c5-490c-ae1b-2a9b2c85ccae.png)

Посчитаем, сколько человек каждого пола было в трёх классах кают:

```
pd.crosstab(titanic.Sex, titanic.Pclass)
```

![pandas crosstab](https://media.tproger.ru/user-uploads/75379/2023-10-05/17f13432-6dfe-4f32-a8ae-adb7caae565c.png)

### Групповые операции

При обработке данных новички часто используют циклы для итераций по строкам или ячейкам. Такой код выполняется медленно. Лучше использовать методы `.apply()`, `.map()`, `.transform()`, которые работают быстрее за счёт векторизации.

```
# Функция, которая в зависимости от возраста будет возвращать child/adult/senior
def categorize_age(age):
  if age < 18:
    return"child"
  if age < 60:
    return"adult"
  else:       
    return "senior"

# Создадим новую колонку, применив нашу функцию к существующей
titanic["Age_category"] = titanic["Age"].apply(categorize_age)
titanic[["Age", "Age_category"]].head()
```

![pandas titanic](https://media.tproger.ru/user-uploads/75379/2023-09-29/632480b8-9d93-4aa3-846a-3b684d99bc44.png)

Кстати, такое же разбиение на возрастные группы можно выполнить с помощью функции `pd.cut()`:

```
pd.cut(titanic.Age, bins=[0, 18, 60, titanic.Age.max()], labels=["child", "adult", "senior"]).head()
```

![pandas cut](https://media.tproger.ru/user-uploads/75379/2023-10-05/94d497dc-24e6-4aaa-ad98-dc31cc3dc572.png)

### Работа с пропущенными данными

В реальных датасетах часть данных может отсутствовать. В библиотеке Pandas эти пропуски обычно представлены как `NaN` (Not a Number) в ячейках DataFrame или Series. Чтобы с ними работать можно использовать ключевые методы:

- `.isna()` — идентифицирует отсутствующие значения и возвращает булевую маску, где True указывает на пропущенные данные;
- `.fillna()` — позволяет заполнить отсутствующие значения с помощью указанных значений или методов интерполяции;
- `.dropna()` — удаляет строки или столбцы, содержащие отсутствующие значения.

Метод `.isna()` есть как у DataFrame, так и у Series, а результатом его вызова будет булевая маска того же класса:

```
titanic.isna().head()
```

![pandas isna](https://media.tproger.ru/user-uploads/75379/2023-09-29/58cbb99a-ead0-44c7-aeca-ae6b1da07e24.png)

```
titanic.loc[titanic.Age.isna()]  # Найдём строки, в которых отсутствует возраст пассажира
```

![pandas isna](https://media.tproger.ru/user-uploads/75379/2023-10-05/bc169e6e-1c6f-4c5d-b3e7-0ed9d09349b6.png)

```
titanic.dropna(subset=["Age"], inplace=False) # Удалим строки, в которых отсутствует возраст пассажира
```

![pandas dropna](https://media.tproger.ru/user-uploads/75379/2023-10-05/3bc0e608-ff4e-40c7-9fe4-027dc8f83a39.png)

Если датасет небольшой, то удалять отсутствующие данные слишком расточительно. Лучше придумать, как заполнить недостающие значения.

Например, можно заменить их средними значениями в столбце:

```
titanic.loc[titanic.Age.isna(), "Age"] = titanic.Age.mean()
```

Или заполнить предыдущим, либо последующим значением:

```
titanic.Age.fillna(method="ffill", inplace=True)
```

> Методы генерации и заполнения отсутствующих значений называются импутингом. В библиотеке scikit-learn есть модуль sklearn.impute, в котором представлены несколько классов импутеров, основанных на различных алгоритмах.

### Визуализация данных

Pandas интегрирована с библиотекой Matplotlib — инструментом для создания двумерных и трёхмерных графических представлений данных. В Pandas можно либо явно использовать её функции для визуализации данных, либо применять встроенные методы, такие как `.plot()` и `.hist()`. Второй вариант облегчает построение графиков, автоматически определяя наилучший способ визуализации данных.

```
import matplotlib.pyplot as plt
titanic.loc[titanic.Sex == "male", "Age"].hist(bins=10);
```

![pandas matplotlib](https://media.tproger.ru/user-uploads/75379/2023-09-29/227b7a27-7bfb-483e-be4b-0ff976898e78.png)

То же самое можно сделать через прямой вызов функций matplotlib:

```
plt.hist(titanic[titanic.Sex == "male"].Age, bins=10);
plt.grid(True)
plt.title("Распределение пассажиров-мужчин по возрасту");
plt.xlabel("Возрастной диапазон");
plt.ylabel("Количество человек");
```

![pandas matplotlib](https://media.tproger.ru/user-uploads/75379/2023-09-29/0786f394-5ca6-49f1-a6f2-570d6a417236.png)

### Работа с временными рядами

Индексная колонка датафрейма представлена датой и временем, что позволяет индексировать данные по дате и времени, ресемплировать (осуществлять выборку с большей или с меньшей частотой), интерполировать отсутствующие данные, применять оконные функции.

Допустим, у нас есть статистика перевозки пассажиров некой авиакомпании. Сгенерируем эти данные по месяцам:

```
# Сгенерируем диапазон дат с частотой 1 месяц
date_rng = pd.date_range(start="1949-01-01", end="1960-12-01", freq="MS")

# Создадим соответствующий датафрейм
df = pd.DataFrame(date_rng, columns=["date"])

# Случайным образом сгенерируем колонку с числом пассажиров в каждом месяце
df["passengers"] = np.random.randint(100, 500, size=len(date_rng))

# Сделаем колонку с датами индексной
df.set_index("date", inplace=True)

df.head()
```

![pandas dataframe](https://media.tproger.ru/user-uploads/75379/2023-10-05/8c19db75-7e45-4750-b710-6a80b0aea421.png)

А теперь рассчитаем среднемесячное количество пассажиров по каждому году:

```
df_downsampled = df.resample("A").mean()
```

```
plt.figure(figsize=(10, 6))
plt.plot(df.index, df["passengers"], label="Исходные данные")
plt.plot(df_downsampled.index, df_downsampled["passengers"], label="Среднее по годам", linestyle="--")
plt.xlabel("Год")
plt.ylabel("Количество пассажиров")
plt.grid(True)
plt.legend()
plt.show()
```


## Как сделать работу с Pandas эффективнее

### Модификация данных на месте

Многие методы Pandas могут принимать флаг `inplace`, который в случае выставления значения `True` модифицирует данные на месте, а не создаёт новый объект. Если модифицировать исходные данные некритично, имеет смысл его использовать. Так не произойдёт аллокации дополнительной памяти:

```
titanic2 = titanic.dropna(subset=["Age"], inplace=False)  # По умолчанию создаётся копия датафрейма
```

```
titanic2 is titanic  # Действительно, у нас два разных датафрейма, то есть объём памяти удвоился
```

![pandas inplace](https://media.tproger.ru/user-uploads/75379/2023-10-09/4eed2276-5782-433f-86b1-e9343b21d6a8.png)

```
titanic.dropna(subset=["Age"], inplace=True)  # А так мы удаляем строки с отсутствующими данными прямо на месте
```

### View vs copy

В Pandas, как и в библиотеке Numpy, особое внимание уделяется оптимизации хранения данных в памяти и минимизации лишних аллокаций. Для этого используются «представление» (view) и «копирование» (copy) данных.

Представление — это ссылка или «окно» на исходные данные, через которое можно производить чтение и изменение. Так новые массивы данных в памяти не создаются. Следовательно, модификация данных через представление приведёт к изменению исходных данных.

На контрасте с этим, копирование данных означает аллокацию нового блока памяти и создание дублирующего объекта. Изменения в такой копии не затрагивают исходные данные. Однако чем больше копий, тем ниже производительность кода. В Pandas они часто создаются при выполнении операций срезов данных.

Чтобы определить является ли объект представлением или копией, можно использовать внутреннее свойство `._is_view`:

```
df = pd.DataFrame(np.arange(10, 90, 10).reshape(2, 4), index=["One","Two"], columns=["A", "B", "C", "D"])
df
```

![работа с библиотекой pandas](https://media.tproger.ru/user-uploads/75379/2023-10-10/db5c3d6b-42b8-4506-82ec-c258d1f0fdc5.png)

```
df.iloc[:, :3]
```

![работа с библиотекой pandas](https://media.tproger.ru/user-uploads/75379/2023-10-10/cd10ea97-38bd-4c9c-b3d4-8287efca9ad9.png)

```
df.iloc[:, :3]._is_view
```

![работа с библиотекой pandas](https://media.tproger.ru/user-uploads/75379/2023-10-10/956a1b57-ca91-4d6c-b042-64696f17ce28.png)

```
df.iloc[0:4, :]._is_view
```

![работа с библиотекой pandas](https://media.tproger.ru/user-uploads/75379/2023-10-10/ce9c35a0-73e5-46fb-ae5e-f816efebd78a.png)

```
df.loc[df["A"] == 10, :]
```

![работа с библиотекой pandas](https://media.tproger.ru/user-uploads/75379/2023-10-10/8eade752-6e04-41a0-ae72-251b8713882f.png)

```
df.loc[df["A"] == 10, :]._is_view
```

![работа с библиотекой pandas](https://media.tproger.ru/user-uploads/75379/2023-10-10/c80ddc09-dba6-40a0-b1a9-ee1ae4ef6e4a.png)

Так как сейчас в датафрейме df все колонки одного типа, Pandas оптимизирует их «под капотом», на уровне массивов Numpy. Но что будет, если изменить тип одной из колонок?

```
df.dtypes  # Было
```

![работа с библиотекой pandas](https://media.tproger.ru/user-uploads/75379/2023-10-10/7ddbc4e2-e003-40df-9ae3-95774af1156b.png)

```
df["A"] = df.A.astype(np.float32)

df.dtypes  # Стало
```

![работа с библиотекой pandas](https://media.tproger.ru/user-uploads/75379/2023-10-10/62c83e12-ab68-4fe0-8e8b-ae0d3e4bdeb8.png)

```
df.loc[df["A"] == 10, :]._is_view  # Теперь мы получаем не view, а неявную копию данных!
```

![работа с библиотекой pandas](https://media.tproger.ru/user-uploads/75379/2023-10-10/1b2e3779-3c2e-4648-a928-a4552aaafd05.png)

```
df.iloc[:, :3]._is_view  # Аналогично. Раньше получали view, сейчас — копию.
```

![работа с библиотекой pandas](https://media.tproger.ru/user-uploads/75379/2023-10-10/d3179d16-ea9c-4a37-aa1a-5c2faab2fa5c.png)

Можно сделать и явную копию:

```
df_copy = df.copy()
```

Тема views и copies в Pandas довольно сложная и понимание приходит с опытом. Если попытаться присвоить значения копии датафрейма там, где по мнению Pandas этого быть не должно, то появится предупреждение `SettingWithCopyWarning`:

```
df2 = df[["A"]]
df2["A"] = 0
```

![pandas SettingWithCopyWarning](https://media.tproger.ru/user-uploads/75379/2023-10-10/edd5e10f-dd10-426f-b6b1-6934f32627ce.png)

### Чтение и обработка данных частями

Если объём данных, читаемых из файла, больше объёма памяти на компьютере, а оптимизация типов данных при чтении не помогла, то бывает эффективно читать и обрабатывать данные по частям, используя параметр `chunksize`.

Прочитаем CSV-файл частями по несколько строк:

```
total_chunks = 0
total_rows = 0

chunk_size = 100  # Будем читать по 100 строк за цикл

for chunk in pd.read_csv("titanic.csv", chunksize=chunk_size):
    # Каждый chunk будет содержать chunk_size строк из CSV    
    total_rows += len(chunk)    
    total_chunks += 1
    print(f"Chunk {total_chunks}")
    # print(chunk.head())  # Для демонстрации можно напечатать первые 5 строк из каждого чанка    
    # print("-" * 50)

print(f"Processed {total_chunks} chunks with {total_rows} rows.")
```

![chunksize pandas это](https://media.tproger.ru/user-uploads/75379/2023-10-10/716ebe0f-8318-4a17-a4b6-9c024d6fb9e5.png)

Также можно использовать параметр `usecols`, чтобы загрузить только необходимые столбцы:

```
pd.read_csv("titanic.csv", usecols=["Name", "Sex", "Age", "Pclass", "Survived"], index_col="Name").head()
```

![chunksize pandas это](https://media.tproger.ru/user-uploads/75379/2023-10-10/854fe9c9-85c8-4386-b941-90d7e737327e.png)

### Чейнинг методов

Методы Pandas по умолчанию (если `inplace=False`) возвращают новый объект (DataFrame или Series). Так, несколько подряд идущих методов можно объединить в цепочку вызовов. Это позволяет избежать использования промежуточных переменных и может улучшить читаемость кода, но влечёт за собой копирование данных и лишние аллокации памяти на каждом шаге. Так что чейнинг эффективен, только если скорость или память не критичны:

```
result = (    
    titanic    
    .drop(columns=["PassengerId", "Survived", "Sex", "SibSp", "Parch", "Ticket", "Cabin"])  # Удалим лишние колонки    
    .dropna(subset=["Age", "Embarked"])  # Удалим строки, в которых отсутствуют возраст или город посадки    
    .loc[titanic["Fare"] > 10]  # Выберем тариф выше заданного порога    
    .groupby(["Embarked", "Pclass"])  # Сгруппируем по городу посадки и классу    
    .agg({"Age": "mean", "Fare": "mean"})  # Вычислим средний возраст и средний тариф    
    .reset_index()  # Сбросим индекс
)

result
```

![работа с библиотекой pandas](https://media.tproger.ru/user-uploads/75379/2023-10-10/7bd350bb-4fa3-45fd-b610-36d7ee20221e.png)

### Использование query

Метод `.query()` позволяет писать выражения в упрощённом виде, ссылаться на внешние переменные, использовать альтернативные бэкенды. Так запросы выполняются быстрее и эффективнее:

```
min_pclass = 2  # Переменная, на которую будем ссылаться

titanic.query("Sex == 'male' & Age > 50 & Pclass >= @min_pclass").head()
```

![pandas query](https://media.tproger.ru/user-uploads/75379/2023-10-10/b59c228e-67b6-45ed-9a11-c21fc488ed57.png)

## Что почитать о работе с Pandas

Даже если вы освоили азы работы с библиотекой, всегда найдётся, чему ещё поучиться. В этом вам помогут такие источники:

- [Документация](https://pandas.pydata.org/docs/) Pandas;
- Книга [«Python для сложных задач»](https://www.ozon.ru/product/python-dlya-slozhnyh-zadach-nauka-o-dannyh-i-mashinnoe-obuchenie-vander-plas-dzh-211433316/);
- Статьи на [Towards Data Science](https://towardsdatascience.com/search?q=pandas);
- Статьи на [Хабре](https://habr.com/ru/search/?q=pandas);
- Разборы и блокноты Jupyter на [Kaggle](https://www.kaggle.com/).

## Какие есть альтернативы

Мы уже упоминали, что Pandas не всегда может похвастаться своей эффективностью, например, в промышленных проектах. Поэтому следует присмотреться и к другим альтернативам. Вот инструменты, которые также помогают обрабатывать большие данные:

- **Pandas 2.0 —** новая версия, построенная на эффективном бэкенде Apache Arrow.
- **Polars —** альтернативная библиотека для более быстрой обработки данных. Написана на языке Rust и использует бэкенд Apache Arrow.
- **Dask —** похож на Pandas, но разработан для параллельных вычислений и больших наборов данных.
- **Modin —** использует тот же API, что и Pandas, но производительность у неё лучше за счёт параллелизма.
- **Vaex —** предназначен для работы с очень большими наборами данных, которые не умещаются в оперативную память. Особенно полезен для визуализации и исследования данных.
- **PySpark DataFrame —** библиотека для распределенных вычислений, часть экосистемы Apache Spark. Подходит для работы с очень большими наборами данных.
- **SQL databases —** базы данных, такие как SQLite, MySQL, PostgreSQL, предоставляют мощные средства для работы с табличными данными, хотя и требуют отдельного языка запросов (SQL).
![pandas matplotlib](https://media.tproger.ru/user-uploads/75379/2023-09-29/a15b759f-2d16-4762-978e-4b0bcfde8f29.png)

Применим скользящее окно и рассчитаем среднее количество пассажиров за последние 12 месяцев:

```
df_rolled = df.rolling(12).mean()
```

```
df_rolled.head(15)
```

![pandas rolling](https://media.tproger.ru/user-uploads/75379/2023-09-29/8967921f-bf00-4f24-b2ee-a6c619064edc.png)

В первых 11 строках по умолчанию появились значения NaN, так как количество проанализированных строк меньше размера окна. Это поведение можно изменить, задав параметр min_periods — минимальное количество строк, для которых определён результат:

```
df.rolling(12, min_periods=1).mean().head()
```

![pandas rolling](https://media.tproger.ru/user-uploads/75379/2023-09-29/75c63b26-a5b6-42ba-bb7a-db8f564c3544.png)
