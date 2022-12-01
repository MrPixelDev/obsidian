# React: разрабатываем кастомный useEffect

[Блог компании Timeweb Cloud](https://habr.com/ru/company/timeweb/blog/)[Разработка веб-сайтов*](https://habr.com/ru/hub/webdev/)[JavaScript*](https://habr.com/ru/hub/javascript/)[ReactJS*](https://habr.com/ru/hub/reactjs/)

![](https://habrastorage.org/r/w1560/webt/jc/hw/st/jchwst6a3nwlxlscnmuw5tdhmry.png)  

  
Привет, друзья!

  

В данной статье мы с вами разработаем кастомный хук, функционал которого будет аналогичен функционалу встроенного хука `useEffect`, за исключением того, что наш `useEffect` будет повторно выполняться только при изменении его зависимостей любого типа (неважно, примитивы это или объекты).

  

Предполагается, что вы хорошо знакомы с тем, как работает хук `useEffect`, а также с тем, когда и почему происходит повторный рендеринг `React-компонентов`. Если нет, вот парочка ссылок:

  

-   [официальная документация по useEffect](https://ru.reactjs.org/docs/hooks-effect.html);
-   [Продвинутые хуки в React: все о useEffect](https://habr.com/ru/company/rshb/blog/687364/);
-   [React: полное руководство по повторному рендерингу](https://habr.com/ru/company/timeweb/blog/684718/).

  

Этого должно быть достаточно для понимания того, о чем мы будем говорить. В дальнейшем будет приведено еще несколько ссылок для более глубокого погружения в тему.

  

Код проекта, с которым мы будем работать, можно найти [здесь](https://github.com/harryheman/Blog-Posts/tree/master/react-use-deep-effect).

  

Начнем с примера.

  

## Проблема

  

Предположим, что у нас имеется такой компонент:

  

```
type Props = {
  count: number;
  object: Record<string, any>;
};

const Component = ({ count, object }: Props) => {
  useEffect(() => {
    console.log("effect");
  }, [object]);

  return <div>Count: {count}</div>;
};
```

  

Этот компонент принимает 2 пропа:

  

-   `count` — значение счетчика (число);
-   `object` — объект.

  

Данный компонент рендерит значение счетчика и запускает эффект при первом рендеринге и при каждом изменении объекта-пропа. В эффекте в консоль инструментов разработчика в браузере выводится сообщение `effect`.

  

Допустим, что этот компонент используется следующим образом:

  

```
function App() {
  // состояние значения счетчика
  const [count, setCount] = useState(0);

  // метод для увеличения значения счетчика
  const increaseCount = () => {
    setCount(count + 1);
  };

  // какой-то объект
  const object = { some: "value" };

  return (
    <>
      <button onClick={increaseCount}>Increase count</button>
      <Component count={count} object={object} />
    </>
  );
}
```

  

Вопрос: будет ли эффект в `Component` выполняться при изменении значения счетчика? Первое, что приходит на ум: эффект не зависит от значения счетчика, а значение объекта не меняется, поэтому эффект выполняться не будет. Давайте это проверим.

  

_Обратите внимание_: в строгом режиме при разработке хуки вызываются дважды. Для чистоты эксперимента строгий режим лучше отключить:

  

```
// вместо
<React.StrictMode>
  <App />
</React.StrictMode>

// делаем так
<>
  <App />
</>
```

  

Запускаем приложения, открываем консоль и 2 раза нажимаем кнопку для увеличения значения счетчика:

  
![](https://habrastorage.org/r/w1560/webt/jj/wn/uu/jjwnuu13m4cyigvwfax-qawqh30.png)  

  

  

Что мы видим? Мы видим 3 сообщения `effect`. Это означает, что эффект в `Component` выполняется при каждом изменении значения счетчика! Но почему?

  

Все просто: в компоненте `App` при каждом рендеринге (изменении значения счетчика — изменение состояния компонента, влекущее его повторный рендеринг) создается новый объект `object`, который передается `Component` в качестве пропа. Объекты, в отличие от примитивов, сравниваются не по значениям, а по ссылкам на выделенную для них область в памяти. Новый объект — новая ссылка на область памяти. Поэтому в данном случае при сравнении объектов всегда возвращается `false`, и эффект перезапускается.

  

Как можно решить данную проблему? Существует несколько способов.

  

## Решения

  

### 1. Распаковка объекта

  

Первое, что можно сделать — это разложить объект на примитивы с помощью [синтаксиса spread](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Operators/Spread_syntax) (`...`):

  

```
// в данном случае это
<Component count={count} {...object} />
// аналогично этому
<Component count={count} some='value' />
```

  

Это потребует внесения следующих изменений в `Component`:

  

```
type Props = {
  count: number;
  // !
  some: string;
};

const Component = ({ count, some }: Props) => {
  useEffect(() => {
    console.log("effect");
    // !
  }, [some]);

  return <div>Count: {count}</div>;
};
```

  

Поскольку теперь значением зависимости эффекта является строка `value`, которая не меняется, эффект при изменении значения счетчика повторно не выполняется, в чем можно убедиться, повторив эксперимент:

  
![](https://habrastorage.org/r/w1560/webt/gf/mt/hx/gfmthx83_z74ezsmiuutho0fvgi.png)  

  

  

Кажется, что задача успешно решена, и можно на этом закончить, но такое решение подходит только для небольших и одномерных объектов. Мы должны точно знать, какие свойства имеет объект, определить тип каждого свойства, не забыть указать нужное свойство в качестве зависимости эффекта и т.д. Если наш объект будет выглядеть так:

  

```
const object = {
  some: {
    nested: 'value'
  }
}
```

  

То при его распаковке значением пропа будет `{ nested: 'value' }` (объект), и решение работать не будет. Это определенно не тот результат, к которому мы стремились, поэтому двигаемся дальше.

  

### 2. Стрингификация

  

Следующее, что приходит на ум — а почему бы не конвертировать объекты в строки? Тогда сравниваться будут уже не объекты, а примитивы. У нас для этого даже есть специальный встроенный метод — [JSON.stringify](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).

  

Это потребует внесения следующих изменений в `Component`:

  

```
type Props = {
  count: number;
  // !
  object: Record<string, any>;
};

const Component = ({ count, object }: Props) => {
  useEffect(() => {
    console.log("effect");
    // !
  }, [JSON.stringify(object)]);

  return <div>Count: {count}</div>;
};
```

  

_Обратите внимание_: в качестве пропа `Component` снова передается объект.

  

В данном случае результатом стрингификации будет строка `{"some":"value"}`. Поскольку эта строка будет прежней при изменении значения счетчика, эффект повторно выполняться не будет (повторите эксперимент самостоятельно — результат должен быть аналогичен предыдущему).

  

Теперь-то задача решена и можно успокоиться? — спросите вы. Не совсем. Основная проблема использования `JSON.stringify()`, впрочем, как и [JSON.parse()](https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) состоит в том, что данные операции выполняются очень медленно. [Вот один из многих топиков на StackOverflow](https://stackoverflow.com/questions/45513821/json-stringify-is-very-slow-for-large-objects), где обсуждается эта проблема. Чем больше и сложнее объект, тем медленнее его стрингификация и парсинг. В нашем случае `JSON.stringify` будет вызываться при каждом рендеринге `Component`. Таким образом, данное решение также не является панацеей. Двигаемся дальше.

  

_Обратите внимание_: существуют специальные `npm-пакеты` для быстрой стрингификации объектов, например, [fast-json-stable-stringify](https://github.com/epoberezkin/fast-json-stable-stringify), но зачем нам в проекте сторонние библиотеки, если можно обойтись без них?

  

### 3. Мемоизация

  

Какие еще инструменты предоставляет `React` для обеспечения стабильности объектов? Одним из таких инструментов является хук [useMemo](https://ru.reactjs.org/docs/hooks-reference.html#usememo).

  

Попробуем мемоизировать объект до его передачи в качестве пропа `Component`. Это потребует внесения следующих изменений в `App`:

  

```
const object = useMemo(() => ({ some: "value" }), []);
```

  

Данное решение работает (повторите эксперимент самостоятельно), но у него также имеются некоторые недостатки:

  

-   необходимость предварительной мемоизации объекта;
-   выделение дополнительной памяти для мемоизации;
-   необходимость корректного определения массива зависимостей `useMemo`, при изменении которых значение объекта будет вычисляться повторно;
-   необходимость соблюдения [правил использования хуков](https://ru.reactjs.org/docs/hooks-rules.html);
-   в том числе, возможность использования только в функциональных компонентах и хуках и т.д.

  

Слишком много ограничений. Такой вариант нам не подходит. Что же делать? Реализовать кастомный `useEffect`.

  

## 4. Хук

  

Подумаем о том, каким требованиям должен удовлетворять наш хук.

  

-   Хук, как и `useEffect`, должен принимать функцию обратного вызова и массив зависимостей.
-   При первоначальном рендеринге коллбек должен выполняться без каких-либо ограничений.
-   При втором и последующих рендерингах предыдущие и новые зависимости должны сравниваться между собой с помощью специальной функции.
-   Предыдущие зависимости должны каким-то образом сохраняться между рендерингами.
-   При втором и последующих рендерингах коллбек должен вызываться только при "реальном" изменении зависимостей.

  

Начнем с функции для сравнения зависимостей.

  

Классическим вариантом является использование функции [isEqual](https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L11531) из библиотеки [Lodash](https://lodash.com/). Существует отдельный `npm-пакет` — [lodash.isequal](https://www.npmjs.com/package/lodash.isequal), но мы не хотим устанавливать дополнительные зависимости, поэтому реализуем эту функцию самостоятельно:

  

```
function areEqual(a: any, b: any): boolean {
  // сравниваем примитивы
  if (a === b) return true;

  // сравниваем объекты `Date`
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();

  // определяем наличие аргументов, а также то, что они являются объектами
  if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
    return a === b;

  // сравниваем прототипы
  if (a.prototype !== b.prototype) return false;

  // получаем ключи первого объекта
  const keys = Object.keys(a);

  // сравниваем длину (количество) ключей объектов
  if (keys.length !== Object.keys(b).length) return false;

  // рекурсия по каждому ключу
  return keys.every((k) => areEqual(a[k], b[k]));
}
```

  

Если хотите, можете самостоятельно сравнить скорость выполнения `areEqual()` и `JSON.stringify()`. Вы увидите, что `areEqual()` гораздо быстрее, особенно в случае больших и сложных объектов.

  

Реализуем кастомный хук для хранения предыдущих зависимостей:

  

```
// https://usehooks.com/usePrevious/
function usePrevious(v: any) {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = v;
  }, [v]);

  return ref.current;
}
```

  

Придумаем название основному хуку. `useEffect` сравнивает зависимости поверхностно (shallow). Мы проводит глубокое (deep) сравнение. Почему бы не назвать хук `useDeepEffect`? Приступаем к его реализации:

  

```
// хук принимает функцию обратного вызова и массив зависимостей
function useDeepEffect(cb: (...args: any[]) => void, deps: any[]) {
  // todo
}
```

  

Сохраняем зависимости:

  

```
const prevDeps = usePrevious(deps);
```

  

Определяем иммутабельную переменную для индикатора первоначального рендеринга:

  

```
const firstRender = useRef(true);
```

  

Определяем состояние для индикатора необходимости повторного вызова коллбека:

  

```
const [needUpdate, setNeedUpdate] = useState({});
```

  

В данном случае мы используем технику принудительного ререндеринга компонента по причине изменения его состояния:

  

```
const [, forceUpdate] = useState({})

useEffect(() => {
  forceUpdate({})
}, [])
```

  

В этом случае компонент будет принудительно подвергнут повторному рендерингу.

  

Определяем эффект для сравнения зависимостей и обновления соответствующего индикатора при необходимости:

  

```
useEffect(() => {
  // при первоначальном рендеринге ничего не делаем
  if (firstRender.current) {
    firstRender.current = false;
    return;
  }

  // если хотя бы одна новая зависимость отличается от предыдущей
  for (const i in deps) {
    if (!areEqual(deps[i], prevDeps[i])) {
      // обновляем индикатор
      setNeedUpdate({});
      // и выходим из цикла
      break;
    }
  }
  // оригинальный массив зависимостей
}, deps);
```

  

Наконец, определяем эффект для выполнения коллбека:

  

```
useEffect(cb, [needUpdate]);
```

  

_Обратите внимание_: все операции можно выполнять в одном `useEffect`, но мы будем придерживаться принципа единственной ответственности (single responsibility).

  

Также _обратите внимание_, что функцию `areEqual` можно применять только в отношении объектов, но, кажется, что это будет экономией на спичках.

  

Полный код хука `useDeepEffect` вместе с функцией сравнения и хуком `usePrevious`:

  

```
import { useEffect, useRef, useState } from "react";

export function areEqual(a: any, b: any): boolean {
  if (a === b) return true;

  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();

  if (!a || !b || (typeof a !== "object" && typeof b !== "object"))
    return a === b;

  if (a.prototype !== b.prototype) return false;

  const keys = Object.keys(a);

  if (keys.length !== Object.keys(b).length) return false;

  return keys.every((k) => areEqual(a[k], b[k]));
}

function usePrevious(v: any) {
  const ref = useRef<any>();

  useEffect(() => {
    ref.current = v;
  }, [v]);

  return ref.current;
}

function useDeepEffect(cb: (...args: any[]) => void, deps: any[]) {
  const prevDeps = usePrevious(deps);
  const firstRender = useRef(true);
  const [needUpdate, setNeedUpdate] = useState({});

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    for (const i in deps) {
      if (!areEqual(deps[i], prevDeps[i])) {
        setNeedUpdate({});
        break;
      }
    }
  }, deps);

  useEffect(cb, [needUpdate]);
}

export default useDeepEffect;
```

  

Вносим следующие изменения в `Component`:

  

```
const Component = ({ count, object }: Props) => {
  // !
  useDeepEffect(() => {
    console.log("effect");
  }, [object]);

  return <div>Count: {count}</div>;
};
```

  

Повторяем эксперимент:

  
![](https://habrastorage.org/r/w1560/webt/gf/mt/hx/gfmthx83_z74ezsmiuutho0fvgi.png)  

  

  

Как видим, при изменении значения счетчика эффект повторно не вызывается.

  

Будет ли это работать в случае вложенного объекта:

  

```
const object = {
  some: {
    nested: "value",
  },
};
```

  

Результат аналогичен предыдущему.

  

Добавим `count` в `object`:

  

```
const object = { some: "value", count };
```

  

Теперь эффект запускается при каждом изменении значения счетчика:

  
![](https://habrastorage.org/r/w1560/webt/xm/yb/6p/xmyb6piiwdqs08_41di-pgzhzck.png)  

  

  

Такой же результат мы получим, если уберем `count` из `object`, но укажем `count` в качестве зависимости `useDeepEffect`:

  

```
const object = { some: "value" };

useDeepEffect(() => {
  console.log("effect");
}, [object, count]);
```

  

Что если мы добавим в `object` функцию `increaseCount`?

  

```
const object = { some: "value", increaseCount };
```

  
![](https://habrastorage.org/r/w1560/webt/xm/yb/6p/xmyb6piiwdqs08_41di-pgzhzck.png)  

  

  

Эффект выполняется при каждом изменении значения счетчика. Точнее, при каждом рендеринге `App` создается новая функция `increaseCount` — новый особый (!) объект. При сравнении таких объектов функция `areEqual` всегда возвращает `false`.

  

Решить данную проблему можно посредством мемоизации `increaseCount()` с помощью хука [useCallback](https://ru.reactjs.org/docs/hooks-reference.html#usecallback):

  

```
const increaseCount = useCallback(() => {
  // обратите внимание: `setCount(count + 1)` в данном случае работать не будет!
  setCount((count) => count + 1);
}, []);
```

  

Последний момент, на который хотелось бы обратить ваше внимание: передача объекта в качестве пропа всегда приводит к повторному рендерингу компонента:

  

```
type Props = {
  // !
  count?: number;
  object: Record<string, any>;
};

const Component = ({ count, object }: Props) => {
  // сообщение о рендеринге компонента
  console.log("render");

  useDeepEffect(() => {
    // console.log("effect");
  }, [object]);

  // return <div>Count: {count}</div>;
  return null;
};

function App() {
  const [count, setCount] = useState(0);

  const increaseCount = () => {
    setCount((count) => count + 1);
  }

  const object = { some: "value" };

  return (
    <>
      <button onClick={increaseCount}>Increase count</button>
      <div>Count: {count}</div>
      <Component object={object} />
    </>
  );
}
```

  

Теперь `Component` в качестве пропа передается только `object`. Будет ли он рендериться при изменении значения счетчика?

  
![](https://habrastorage.org/r/w1560/webt/nr/lp/hj/nrlphjxt7tarqjgayzdwwvafcy0.png)  

  

  

Как видим, именно это и происходит. Но почему? Все просто: рендеринг родительского компонента (`App`) влечет безусловный рендеринг всех его потомков.

  

Сам по себе повторный рендеринг не является проблемой до тех пор, пока речь не идет о каких-то сложных вычислениях или обновлении `DOM`. Однако, при желании, данную проблему можно решить с помощью компонента высшего порядка (Higher Order Component — HOC) [React.memo](https://ru.reactjs.org/docs/react-api.html#reactmemo). Но просто обернуть в него `Component` недостаточно:

  

```
const Component = React.memo(({ count, object }: Props) => {
  console.log("render");

  useDeepEffect(() => {
    // console.log("effect");
  }, [object]);

  // return <div>Count: {count}</div>;
  return null;
});
```

  

В данном случае `Component` все равно будет повторно рендериться при каждом рендеринге `App`. Почему? Потому что `React.memo()` сравнивает пропы поверхностно: с примитивами все хорошо, а при сравнении (немемоизированных) объектов (`object`) всегда возвращается `false`.

  

В качестве второго опционального параметра `React.memo()` принимает функцию сравнения предыдущих и новых (следующих) пропов. Предыдущие и новые пропы — это объекты:

  

```
const Component = React.memo(({ count, object }: Props) => {
  console.log("render");

  return null;
  // !
}, showProps);

function showProps(prevProps: Props, nextProps: Props) {
  console.log("Previous props", prevProps);
  console.log("Next props", nextProps);

  // для удовлетворения контракту
  return prevProps.object.some === nextProps.object.some;
}
```

  
![](https://habrastorage.org/r/w1560/webt/gy/ey/ca/gyeycaq7zyyllgy_hcb0qgkwumi.png)  

  

  

Следовательно, нам необходимо сравнивать объекты. Здесь нам на помощь снова приходит функция `areEqual`:

  

```
const Component = React.memo(({ count, object }: Props) => {
  console.log("render");

  return null;
  // !
}, areEqual);
```

  
![](https://habrastorage.org/r/w1560/webt/75/ml/j7/75mlj7qwwkwumxrulxgvlqnluia.png)  

  

  

Как видим, `Component` больше не подвергается ререндерингу при повторном рендеринге `App`.

  

В данном случае это также предотвратит повторный запуск эффекта.

  

Поиграть с кодом можно здесь:

  

  

Пожалуй, это все, чем я хотел поделиться с вами в этой статье. Надеюсь, вы узнали что-то новое и не зря потратили время. Благодарю за внимание и happy coding!