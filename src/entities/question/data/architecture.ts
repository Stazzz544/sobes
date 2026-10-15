import type { Question } from '../model/types';

const GURU = 'https://refactoring.guru/design-patterns';
const WIKI = 'https://en.wikipedia.org/wiki';
const FSD = 'https://feature-sliced.design/docs/reference';

export const ARCHITECTURE_QUESTIONS: Question[] = [
  {
    id: 'arch-principles-srp-001',
    topic: 'architecture',
    tags: ['arch-principles'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Компонент `UserProfile` сам загружает данные, форматирует даты, валидирует форму и рисует разметку. Какой принцип нарушен в первую очередь?',
      en: 'The `UserProfile` component fetches data, formats dates, validates a form and renders markup all by itself. Which principle is violated first?',
    },
    options: [
      { text: { ru: 'Единственной ответственности (SRP)', en: 'Single responsibility (SRP)' } },
      { text: { ru: 'Подстановки Барбары Лисков (LSP)', en: 'Liskov substitution (LSP)' } },
      { text: { ru: 'Разделения интерфейсов (ISP)', en: 'Interface segregation (ISP)' } },
      { text: { ru: 'DRY', en: 'DRY' } },
      { text: { ru: 'Ни один: компонент так и должен работать', en: 'None: that’s how a component should work' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**SRP**: у модуля должна быть одна причина для изменения. Здесь их четыре — API, формат дат, правила формы, вёрстка, — и правка любой задевает остальное. Разбивают так: загрузка — в хук или модель, форматирование — в утилиту, валидация — в схему, а компонент только рисует.',
          en: '**SRP**: a module should have one reason to change. Here there are four — the API, date format, form rules, markup — and touching any affects the rest. Split it: fetching goes to a hook or model, formatting to a utility, validation to a schema, and the component only renders.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Single-responsibility principle', url: `${WIKI}/Single-responsibility_principle` }],
  },
  {
    id: 'arch-principles-ocp-001',
    topic: 'architecture',
    tags: ['arch-principles', 'arch-patterns'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Чтобы добавить новый способ оплаты, приходится править `switch (method)` в пяти файлах. Как это исправить?',
      en: 'Adding a new payment method means editing `switch (method)` in five files. How do you fix that?',
    },
    options: [
      { text: { ru: 'Добавить `default`-ветку в каждый `switch`', en: 'Add a `default` branch to every `switch`' } },
      {
        text: {
          ru: 'Собрать поведение каждого способа в один объект с общим интерфейсом и выбирать его по ключу из реестра',
          en: 'Gather each method’s behavior into one object with a shared interface and pick it by key from a registry',
        },
      },
      { text: { ru: 'Заменить `switch` на цепочку `if/else`', en: 'Replace `switch` with an `if/else` chain' } },
      { text: { ru: 'Вынести все пять `switch` в один файл', en: 'Move all five `switch`es into one file' } },
      { text: { ru: 'Хранить способ оплаты числом вместо строки', en: 'Store the payment method as a number instead of a string' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Принцип открытости/закрытости**: код открыт для расширения и закрыт для изменения. Если каждый способ оплаты — объект `{ label, validate, pay }` в реестре, новый способ добавляется одной записью, а существующий код не трогают. Это паттерн **Стратегия**.',
          en: 'The **open/closed principle**: code is open for extension, closed for modification. If each payment method is a `{ label, validate, pay }` object in a registry, a new method is one more entry, and existing code stays untouched. That’s the **Strategy** pattern.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Open–closed principle', url: `${WIKI}/Open%E2%80%93closed_principle` },
      { title: 'Refactoring.Guru — Strategy', url: `${GURU}/strategy` },
    ],
  },
  {
    id: 'arch-principles-lsp-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-principles'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Функция `stretch` рассчитывает получить площадь 20. Что она вернёт для квадрата? Впишите число.',
      en: '`stretch` expects to get an area of 20. What does it return for a square? Type the number.',
    },
    code: {
      lang: 'js',
      source: `class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  setWidth(width) {
    this.width = width;
  }
  setHeight(height) {
    this.height = height;
  }
  area() {
    return this.width * this.height;
  }
}

class Square extends Rectangle {
  setWidth(size) {
    this.width = size;
    this.height = size;
  }
  setHeight(size) {
    this.width = size;
    this.height = size;
  }
}

function stretch(rectangle) {
  rectangle.setWidth(5);
  rectangle.setHeight(4);
  return rectangle.area();
}

console.log(stretch(new Square(2, 2)));`,
    },
    answers: ['16'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`setHeight(4)` у квадрата меняет и ширину, поэтому площадь 4 × 4 = 16. Наследник нарушил ожидания кода, написанного для родителя, — это нарушение **принципа подстановки Лисков**: объект подкласса должен работать везде, где работает базовый класс. Решение — не наследовать квадрат от прямоугольника, а сделать обе фигуры независимыми реализациями интерфейса с `area()`.',
          en: 'A square’s `setHeight(4)` also changes the width, so the area is 4 × 4 = 16. The subclass broke the expectations of code written for the parent — a violation of the **Liskov substitution principle**: a subclass object must work wherever the base class works. The fix is not to derive a square from a rectangle but to make both independent implementations of an interface with `area()`.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Liskov substitution principle', url: `${WIKI}/Liskov_substitution_principle` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-principles-wrong-abstraction-001',
    topic: 'architecture',
    tags: ['arch-principles'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Две похожие функции из разных фич когда-то объединили по DRY. Теперь у общей функции шесть флагов, и каждая правка ломает чужую фичу. Что делать?',
      en: 'Two similar functions from different features were once merged for DRY. Now the shared function has six flags, and every change breaks another feature. What should you do?',
    },
    options: [
      { text: { ru: 'Добавить седьмой флаг для нового случая', en: 'Add a seventh flag for the new case' } },
      {
        text: {
          ru: 'Вернуть код обратно в места вызова и заново выделить общее, если оно действительно появится',
          en: 'Inline the code back into the call sites and extract what’s shared again only if it truly emerges',
        },
      },
      { text: { ru: 'Переписать функцию на классах с наследованием', en: 'Rewrite the function with classes and inheritance' } },
      { text: { ru: 'Покрыть функцию комментариями', en: 'Cover the function with comments' } },
      { text: { ru: 'Запретить менять эту функцию', en: 'Forbid changing this function' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '«Дублирование намного дешевле неправильной абстракции» (Сэнди Мец). Похожий код в разных фичах часто меняется по разным причинам, и общая функция с флагами связывает несвязанное. Лекарство — встроить код обратно, дать каждой фиче свою версию и выделить общее заново, когда станет ясно, что именно общее.',
          en: '“Duplication is far cheaper than the wrong abstraction” (Sandi Metz). Similar code in different features often changes for different reasons, and a shared function with flags couples unrelated things. The cure is to inline it back, give each feature its own version, and extract again once it’s clear what is truly shared.',
        },
      },
    ],
    sources: [{ title: 'Sandi Metz — The Wrong Abstraction', url: 'https://sandimetz.com/blog/2016/1/20/the-wrong-abstraction' }],
  },
  {
    id: 'arch-principles-yagni-001',
    topic: 'architecture',
    tags: ['arch-principles'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Для одной страницы настроек разработчик пишет систему плагинов «на будущее». Какой принцип он нарушает?',
      en: 'For a single settings page a developer builds a plugin system “for the future”. Which principle are they violating?',
    },
    options: [
      { text: { ru: 'YAGNI', en: 'YAGNI' } },
      { text: { ru: 'LSP', en: 'LSP' } },
      { text: { ru: 'DRY', en: 'DRY' } },
      { text: { ru: 'Закон Деметры', en: 'Law of Demeter' } },
      { text: { ru: 'Никакой — гибкость всегда полезна', en: 'None — flexibility is always useful' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**YAGNI** — «вам это не понадобится»: не строят возможности, пока в них нет реальной нужды. Догадки о будущем часто не сбываются, а сложность приходится поддерживать уже сейчас. Когда второй и третий случай появятся, станет видно, какая гибкость действительно нужна.',
          en: '**YAGNI** — “you aren’t gonna need it”: don’t build capabilities until there’s a real need. Guesses about the future often miss, while the complexity must be maintained right now. Once the second and third cases appear, it’ll be clear what flexibility is actually needed.',
        },
      },
    ],
    sources: [{ title: 'Martin Fowler — Yagni', url: 'https://martinfowler.com/bliki/Yagni.html' }],
  },
  {
    id: 'arch-patterns-observer-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-patterns'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `function createStore(initial) {
  let state = initial;
  const listeners = new Set();
  return {
    get: () => state,
    set(next) {
      state = next;
      listeners.forEach((listener) => listener(state));
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
  };
}

const store = createStore(0);
const log = [];
const unsubscribe = store.subscribe((value) => log.push(value));

store.set(1);
store.set(2);
unsubscribe();
store.set(3);

console.log(log.join(','));`,
    },
    answers: ['1,2'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это паттерн **Наблюдатель**: стор хранит подписчиков и уведомляет их об изменениях, ничего о них не зная. `subscribe` возвращает функцию отписки — после неё третье изменение в лог не попало. На этой идее построены EventEmitter, сторы Redux и Zustand, `addEventListener`.',
          en: 'This is the **Observer** pattern: the store keeps subscribers and notifies them of changes without knowing anything about them. `subscribe` returns an unsubscribe function — after it, the third change doesn’t reach the log. EventEmitter, Redux and Zustand stores, and `addEventListener` all build on this idea.',
        },
      },
    ],
    sources: [{ title: 'Refactoring.Guru — Observer', url: `${GURU}/observer` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-patterns-adapter-001',
    topic: 'architecture',
    tags: ['arch-patterns', 'arch-data'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'API отдаёт `{ first_name, last_name, created_at }`, а интерфейс ждёт `{ fullName, createdAt: Date }`. Функция на границе с API превращает одно в другое. Как называется паттерн?',
      en: 'The API returns `{ first_name, last_name, created_at }`, while the UI expects `{ fullName, createdAt: Date }`. A function at the API boundary converts one into the other. What’s the pattern?',
    },
    options: [
      { text: { ru: 'Адаптер', en: 'Adapter' } },
      { text: { ru: 'Синглтон', en: 'Singleton' } },
      { text: { ru: 'Наблюдатель', en: 'Observer' } },
      { text: { ru: 'Фабрика', en: 'Factory' } },
      { text: { ru: 'Итератор', en: 'Iterator' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Адаптер** приводит чужой интерфейс к тому, который ждёт ваш код. Преобразование в одном месте на границе с API защищает интерфейс: если бэкенд переименует поле, правка будет одна, а не в двадцати компонентах. Тот же приём применяют к сторонним SDK.',
          en: 'An **Adapter** converts a foreign interface into the one your code expects. One conversion at the API boundary protects the UI: if the backend renames a field, there’s one fix, not twenty components. The same trick applies to third-party SDKs.',
        },
      },
    ],
    sources: [{ title: 'Refactoring.Guru — Adapter', url: `${GURU}/adapter` }],
  },
  {
    id: 'arch-patterns-facade-001',
    topic: 'architecture',
    tags: ['arch-patterns'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В приложении три системы аналитики. Компоненты вызывают одну функцию `analytics.track(event)`, а она уже обращается ко всем трём SDK. Что это за паттерн?',
      en: 'The app has three analytics systems. Components call one `analytics.track(event)` function, which talks to all three SDKs. Which pattern is this?',
    },
    options: [
      { text: { ru: 'Декоратор', en: 'Decorator' } },
      { text: { ru: 'Фасад', en: 'Facade' } },
      { text: { ru: 'Стратегия', en: 'Strategy' } },
      { text: { ru: 'Прототип', en: 'Prototype' } },
      { text: { ru: 'Строитель', en: 'Builder' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Фасад** даёт простой интерфейс к сложной подсистеме. Компоненты не знают про три SDK, их инициализацию и форматы событий; сменить или отключить систему можно в одном месте. Адаптер меняет форму одного интерфейса, а фасад упрощает работу с несколькими.',
          en: 'A **Facade** offers a simple interface to a complex subsystem. Components don’t know about three SDKs, their setup and event formats; a system can be swapped or disabled in one place. An adapter reshapes one interface, while a facade simplifies working with several.',
        },
      },
    ],
    sources: [{ title: 'Refactoring.Guru — Facade', url: `${GURU}/facade` }],
  },
  {
    id: 'arch-patterns-decorator-001',
    kind: 'output',
    topic: 'architecture',
    tags: ['arch-patterns'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет код? Впишите ответ.', en: 'What will this code log? Type the answer.' },
    code: {
      lang: 'js',
      source: `function withRetry(fn, attempts) {
  return async (...args) => {
    for (let attempt = 1; ; attempt++) {
      try {
        return await fn(...args);
      } catch (error) {
        if (attempt === attempts) {
          throw error;
        }
      }
    }
  };
}

let calls = 0;
const flaky = async () => {
  calls++;
  if (calls < 3) {
    throw new Error('network');
  }
  return 'ok';
};

withRetry(flaky, 5)().then((result) => console.log(result, calls));`,
    },
    answers: ['ok 3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Первые два вызова падают, третий возвращает `ok` — всего 3 вызова. `withRetry` — паттерн **Декоратор**: оборачивает функцию, добавляя поведение (повторы), и сохраняет её интерфейс. Так же устроены `withLogging`, `debounce`, `memoize` и HOC в React — декораторы можно комбинировать.',
          en: 'The first two calls fail, the third returns `ok` — 3 calls in total. `withRetry` is the **Decorator** pattern: it wraps a function, adding behavior (retries) while keeping its interface. `withLogging`, `debounce`, `memoize` and React HOCs work the same way — decorators compose.',
        },
      },
    ],
    sources: [{ title: 'Refactoring.Guru — Decorator', url: `${GURU}/decorator` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'arch-patterns-singleton-ssr-001',
    topic: 'architecture',
    tags: ['arch-patterns', 'arch-dependencies'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Модуль экспортирует `export const cache = new Map()`, куда кладутся данные текущего пользователя. Чем это опасно при серверном рендеринге?',
      en: 'A module exports `export const cache = new Map()` holding the current user’s data. Why is that dangerous with server-side rendering?',
    },
    options: [
      { text: { ru: 'Ничем: на сервере каждый запрос получает свои модули', en: 'Not at all: each request gets its own modules on the server' } },
      {
        text: {
          ru: 'Модуль один на весь процесс сервера — данные одного пользователя увидят другие',
          en: 'The module is shared by the whole server process — one user’s data leaks to others',
        },
      },
      { text: { ru: '`Map` нельзя использовать на сервере', en: '`Map` can’t be used on the server' } },
      { text: { ru: 'Модуль будет выполняться заново на каждый запрос и терять кеш', en: 'The module re-runs per request and loses the cache' } },
      { text: { ru: 'Опасно только в режиме разработки', en: 'It’s dangerous only in development' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Модуль выполняется один раз, и его состояние — по сути **синглтон**. В браузере это одна вкладка одного пользователя, а на сервере один процесс обслуживает всех: данные из модульной переменной утекут в чужие ответы. Поэтому на сервере сторы и клиенты запросов создают на каждый запрос — так советует, например, документация TanStack Query.',
          en: 'A module runs once, so its state is effectively a **singleton**. In the browser that’s one tab of one user, but on the server one process serves everyone: data in a module variable leaks into other users’ responses. So on the server, stores and query clients are created per request — as the TanStack Query docs recommend, for example.',
        },
      },
    ],
    sources: [
      { title: 'Refactoring.Guru — Singleton', url: `${GURU}/singleton` },
      { title: 'TanStack Query — Server Rendering', url: 'https://tanstack.com/query/latest/docs/framework/react/guides/ssr' },
    ],
  },
  {
    id: 'arch-frontend-fsd-imports-001',
    topic: 'architecture',
    tags: ['arch-frontend'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Проект на Feature-Sliced Design. Какой импорт нарушает правила слоёв?',
      en: 'A Feature-Sliced Design project. Which import breaks the layer rules?',
    },
    options: [
      { code: "// features/auth/ui/login-form.tsx\nimport { Button } from '@/shared/ui';" },
      { code: "// widgets/header/ui/header.tsx\nimport { LogoutButton } from '@/features/auth';" },
      { code: "// entities/user/model/store.ts\nimport { loginFx } from '@/features/auth';" },
      { code: "// pages/profile/ui/page.tsx\nimport { UserCard } from '@/entities/user';" },
      { code: "// app/providers.tsx\nimport { ProfilePage } from '@/pages/profile';" },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Слои FSD снизу вверх: `shared` → `entities` → `features` → `widgets` → `pages` → `app`. Модуль может импортировать только из слоёв **ниже** себя. `entities` ниже `features`, поэтому сущность не должна знать про фичу авторизации — иначе появляется зависимость снизу вверх и риск циклов. Слайсы одного слоя тоже не импортируют друг друга.',
          en: 'FSD layers bottom-up: `shared` → `entities` → `features` → `widgets` → `pages` → `app`. A module may import only from layers **below** it. `entities` is below `features`, so an entity mustn’t know about the auth feature — that creates an upward dependency and a risk of cycles. Slices of the same layer don’t import each other either.',
        },
      },
    ],
    sources: [{ title: 'Feature-Sliced Design — Layers', url: `${FSD}/layers` }],
  },
  {
    id: 'arch-frontend-public-api-001',
    topic: 'architecture',
    tags: ['arch-frontend'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Зачем у модуля файл `index.ts`, через который его импортируют другие части приложения?',
      en: 'Why does a module have an `index.ts` that other parts of the app import through?',
    },
    code: {
      lang: 'ts',
      source: `// ❌ import { $user } from '@/entities/user/model/internal/store';
// ✅ import { $user } from '@/entities/user';`,
    },
    options: [
      { text: { ru: 'Так быстрее работает сборка', en: 'It makes the build faster' } },
      {
        text: {
          ru: 'Это публичный API: снаружи видно только экспортированное, а внутреннюю структуру можно менять свободно',
          en: 'It’s the public API: only exports are visible outside, and the internal structure can change freely',
        },
      },
      { text: { ru: 'Без `index.ts` TypeScript не найдёт модуль', en: 'TypeScript can’t find the module without `index.ts`' } },
      { text: { ru: 'Это нужно только для тестов', en: 'It’s only needed for tests' } },
      { text: { ru: 'Чтобы модуль загружался лениво', en: 'To make the module lazy-load' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Публичный API** модуля — договор с остальным кодом. Глубокие импорты привязывают потребителей к внутренним файлам: переименовали папку — сломались десятки мест. Через `index.ts` наружу отдают только то, что предназначено для использования, а внутренности можно перекладывать без последствий. Линтер (например, `eslint-plugin-boundaries`) запрещает обходить его.',
          en: 'A module’s **public API** is a contract with the rest of the code. Deep imports tie consumers to internal files: rename a folder and dozens of places break. Through `index.ts` only what’s meant for use is exposed, and internals can be rearranged freely. A linter (say, `eslint-plugin-boundaries`) forbids bypassing it.',
        },
      },
    ],
    sources: [{ title: 'Feature-Sliced Design — Public API', url: `${FSD}/public-api` }],
  },
  {
    id: 'arch-frontend-cycles-001',
    topic: 'architecture',
    tags: ['arch-frontend', 'arch-dependencies'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: '`a.js` импортирует `b.js`, а `b.js` импортирует `a.js` и при загрузке читает `export const a`. Что произойдёт при запуске `a.js`?',
      en: '`a.js` imports `b.js`, and `b.js` imports `a.js` and reads `export const a` while loading. What happens when `a.js` runs?',
    },
    code: {
      lang: 'js',
      source: `// a.js
import { b } from './b.js';
export const a = 'a';

// b.js
import { a } from './a.js';
console.log(a);
export const b = 'b';`,
    },
    options: [
      { text: { ru: 'Выведется `a`', en: 'It logs `a`' } },
      { text: { ru: 'Выведется `undefined`', en: 'It logs `undefined`' } },
      { text: { ru: '`ReferenceError`: `b.js` выполняется раньше, чем `a` объявлена', en: '`ReferenceError`: `b.js` runs before `a` is declared' } },
      { text: { ru: 'Модули зациклятся и повесят процесс', en: 'The modules loop forever and hang the process' } },
      { text: { ru: 'Сборщик сам переставит импорты', en: 'The bundler reorders imports by itself' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Цикл не бесконечен: каждый модуль выполняется один раз. Но `a.js` ждёт `b.js`, и `b.js` выполняется первым — когда он читает `a`, та ещё в «мёртвой зоне» и бросает `ReferenceError`. В CommonJS вместо ошибки будет недозаполненный `exports`. Циклы — признак размытых границ: общий код выносят в третий модуль ниже обоих.',
          en: 'The cycle isn’t infinite: each module runs once. But `a.js` waits for `b.js`, so `b.js` runs first — when it reads `a`, the binding is still in the temporal dead zone and throws `ReferenceError`. In CommonJS you’d get a half-filled `exports` instead. Cycles signal blurry boundaries: move shared code into a third module below both.',
        },
      },
    ],
    sources: [{ title: 'MDN — JavaScript modules: cyclic imports', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules#cyclic_imports' }],
  },
  {
    id: 'arch-frontend-colocation-001',
    topic: 'architecture',
    tags: ['arch-frontend'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Почему раскладка по типам файлов — `components/`, `hooks/`, `utils/`, `api/` — плохо масштабируется?',
      en: 'Why does organizing by file type — `components/`, `hooks/`, `utils/`, `api/` — scale poorly?',
    },
    options: [
      { text: { ru: 'Сборщик медленнее находит файлы в таких папках', en: 'The bundler finds files in such folders more slowly' } },
      {
        text: {
          ru: 'Код одной фичи разбросан по всему проекту: любая правка задевает много папок, а удалить фичу целиком трудно',
          en: 'One feature’s code is spread across the project: any change touches many folders, and removing a feature is hard',
        },
      },
      { text: { ru: 'React запрещает хуки в отдельной папке', en: 'React forbids hooks in a separate folder' } },
      { text: { ru: 'Такие папки нельзя покрыть тестами', en: 'Such folders can’t be tested' } },
      { text: { ru: 'Масштабируется отлично, это лучший вариант', en: 'It scales great, it’s the best option' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Принцип **colocation**: то, что меняется вместе, лежит рядом. В маленьком проекте раскладка по типам удобна, но с ростом в `components/` оказываются сотни несвязанных файлов, и [[cohesion|связность]] модулей падает. Группировка по фичам (как в FSD) держит компонент, хук, API и стили фичи в одной папке.',
          en: 'The **colocation** principle: what changes together lives together. In a small project grouping by type is handy, but as it grows `components/` fills with hundreds of unrelated files, and [[cohesion|cohesion]] drops. Grouping by feature (as in FSD) keeps a feature’s component, hook, API and styles in one folder.',
        },
      },
    ],
    sources: [
      { title: 'Kent C. Dodds — Colocation', url: 'https://kentcdodds.com/blog/colocation' },
      { title: 'Feature-Sliced Design — Slices and segments', url: `${FSD}/slices-segments` },
    ],
  },
  {
    id: 'arch-dependencies-di-001',
    topic: 'architecture',
    tags: ['arch-dependencies'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какую версию функции проще протестировать без настоящей сети?',
      en: 'Which version of the function is easier to test without a real network?',
    },
    options: [
      { code: "async function loadOrders() {\n  const client = new HttpClient('https://api.shop');\n  return client.get('/orders');\n}" },
      { code: "async function loadOrders(client) {\n  return client.get('/orders');\n}" },
      { code: "async function loadOrders() {\n  return fetch('https://api.shop/orders').then((r) => r.json());\n}" },
      { code: "async function loadOrders() {\n  return window.api.get('/orders');\n}" },
      { code: "async function loadOrders() {\n  const { HttpClient } = await import('./http');\n  return new HttpClient().get('/orders');\n}" },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Внедрение зависимостей**: функция не создаёт клиента сама, а получает его снаружи. В тесте передают заглушку `{ get: async () => [...] }` — без моков модулей и глобальных переменных. Остальные варианты жёстко связаны с конкретной реализацией или глобальным состоянием.',
          en: '**Dependency injection**: the function doesn’t create the client itself but receives it from outside. A test passes a stub `{ get: async () => [...] }` — no module mocks or globals. The other options are tightly coupled to a specific implementation or global state.',
        },
      },
    ],
    sources: [{ title: 'Martin Fowler — Inversion of Control Containers and the Dependency Injection pattern', url: 'https://martinfowler.com/articles/injection.html' }],
  },
  {
    id: 'arch-dependencies-coupling-001',
    topic: 'architecture',
    tags: ['arch-dependencies'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'К чему стремятся в хорошей архитектуре?',
      en: 'What does good architecture aim for?',
    },
    options: [
      { text: { ru: 'Высокая связанность (coupling), низкая связность (cohesion)', en: 'High coupling, low cohesion' } },
      { text: { ru: 'Низкая связанность (coupling), высокая связность (cohesion)', en: 'Low coupling, high cohesion' } },
      { text: { ru: 'Высокие обе', en: 'Both high' } },
      { text: { ru: 'Низкие обе', en: 'Both low' } },
      { text: { ru: 'Это не важно, если есть тесты', en: 'It doesn’t matter if there are tests' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Связность (cohesion)** — насколько части модуля относятся к одной задаче: высокая значит, что модуль делает одно дело. **Связанность (coupling)** — насколько модули зависят друг от друга: низкая значит, что модуль можно менять, не трогая соседей. Вместе это и даёт код, который легко менять по частям.',
          en: '**Cohesion** is how much a module’s parts belong to one task: high means the module does one thing. **Coupling** is how much modules depend on each other: low means a module can change without touching its neighbors. Together they make code that’s easy to change piece by piece.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Coupling', url: `${WIKI}/Coupling_(computer_programming)` },
      { title: 'Wikipedia — Cohesion', url: `${WIKI}/Cohesion_(computer_science)` },
    ],
  },
  {
    id: 'arch-dependencies-dip-001',
    topic: 'architecture',
    tags: ['arch-dependencies', 'arch-principles'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Модули заказов вызывают `axios` напрямую в 30 местах, а теперь нужно перейти на `fetch` и добавить общие заголовки. Как это сделать по принципу инверсии зависимостей?',
      en: 'Order modules call `axios` directly in 30 places, and now you need to switch to `fetch` and add shared headers. How do you do it per the dependency inversion principle?',
    },
    options: [
      { text: { ru: 'Найти и заменить `axios` на `fetch` во всех 30 местах', en: 'Find-and-replace `axios` with `fetch` in all 30 places' } },
      {
        text: {
          ru: 'Описать свой интерфейс `HttpClient`, модули зависят только от него, а реализацию на `fetch` подключают в одном месте',
          en: 'Define your own `HttpClient` interface, have modules depend only on it, and wire the `fetch` implementation in one place',
        },
      },
      { text: { ru: 'Сделать `axios` глобальной переменной', en: 'Make `axios` a global variable' } },
      { text: { ru: 'Оставить `axios` и `fetch` вперемешку', en: 'Keep `axios` and `fetch` mixed' } },
      { text: { ru: 'Скопировать заголовки в каждый вызов', en: 'Copy the headers into every call' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Инверсия зависимостей**: модули верхнего уровня зависят от абстракции, а не от конкретной библиотеки. Свой `HttpClient` с методами `get`/`post` описывает то, что нужно приложению; реализация на `axios` или `fetch` — деталь, которую меняют в одном месте вместе с заголовками, обработкой ошибок и ретраями.',
          en: '**Dependency inversion**: high-level modules depend on an abstraction, not a concrete library. Your own `HttpClient` with `get`/`post` describes what the app needs; the `axios` or `fetch` implementation is a detail changed in one place along with headers, error handling and retries.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Dependency inversion principle', url: `${WIKI}/Dependency_inversion_principle` }],
  },
  {
    id: 'arch-scale-monorepo-001',
    topic: 'architecture',
    tags: ['arch-scale'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Что даёт монорепозиторий с несколькими приложениями и общими библиотеками и какая у него главная цена?',
      en: 'What does a monorepo with several apps and shared libraries give you, and what’s its main cost?',
    },
    options: [
      {
        text: {
          ru: 'Атомарные изменения сразу в библиотеке и всех её потребителях; цена — без кеша и «affected»-сборок CI начинает собирать всё',
          en: 'Atomic changes to a library and all its consumers at once; the cost is that without caching and “affected” builds CI rebuilds everything',
        },
      },
      { text: { ru: 'Каждое приложение получает свою версию библиотеки; цена — больше папок', en: 'Each app gets its own library version; the cost is more folders' } },
      { text: { ru: 'Независимые деплои без общей сборки; цена — нет', en: 'Independent deploys with no shared build; no cost' } },
      { text: { ru: 'Меньший размер бандла; цена — медленный `git clone`', en: 'A smaller bundle; the cost is a slow `git clone`' } },
      { text: { ru: 'Монорепо нужен только для бэкенда', en: 'A monorepo is only for backends' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В монорепо поменять общий компонент и все места его использования можно одним коммитом и одним ревью, а инструменты и правила едины. Цена — масштаб: без графа зависимостей и кеша задач (Nx, Turborepo) каждая сборка проверяет всё. Поэтому CI запускает задачи только для затронутых проектов.',
          en: 'In a monorepo a shared component and all its usages change in one commit and one review, and tooling and rules are shared. The cost is scale: without a dependency graph and task caching (Nx, Turborepo) every build checks everything. So CI runs tasks only for affected projects.',
        },
      },
    ],
    sources: [
      { title: 'monorepo.tools', url: 'https://monorepo.tools/' },
      { title: 'Turborepo — Caching', url: 'https://turborepo.dev/docs/crafting-your-repository/caching' },
    ],
  },
  {
    id: 'arch-scale-microfrontends-001',
    topic: 'architecture',
    tags: ['arch-scale'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Когда микрофронтенды оправданы?',
      en: 'When are micro-frontends justified?',
    },
    options: [
      { text: { ru: 'Всегда: они делают любое приложение быстрее', en: 'Always: they make any app faster' } },
      { text: { ru: 'Когда команда из трёх человек хочет попробовать новый фреймворк', en: 'When a team of three wants to try a new framework' } },
      {
        text: {
          ru: 'Когда много независимых команд должны выкатывать свои части продукта отдельно друг от друга',
          en: 'When many independent teams need to ship their parts of the product separately',
        },
      },
      { text: { ru: 'Когда в проекте больше 100 компонентов', en: 'When the project has over 100 components' } },
      { text: { ru: 'Когда нужен SSR', en: 'When you need SSR' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Микрофронтенды решают **организационную** задачу: независимые релизы автономных команд. Платят за это дублированием зависимостей и размером бандла, сложной сборкой и общей навигацией, риском визуальной несогласованности. Маленькой команде обычно хватает модульного монолита с чёткими границами.',
          en: 'Micro-frontends solve an **organizational** problem: independent releases by autonomous teams. The price is duplicated dependencies and bundle size, complex builds and shared navigation, and the risk of visual inconsistency. A small team is usually better off with a modular monolith with clear boundaries.',
        },
      },
    ],
    sources: [{ title: 'Martin Fowler — Micro Frontends', url: 'https://martinfowler.com/articles/micro-frontends.html' }],
  },
  {
    id: 'arch-scale-tokens-001',
    topic: 'architecture',
    tags: ['arch-scale'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Почему в дизайн-системе цвет кнопки задают токеном `--color-danger`, а не значением `#ED6F78`?',
      en: 'Why does a design system set a button color with a `--color-danger` token rather than `#ED6F78`?',
    },
    options: [
      { text: { ru: 'CSS-переменные работают быстрее hex', en: 'CSS variables are faster than hex' } },
      {
        text: {
          ru: 'Токен описывает смысл: тему, бренд или оттенок меняют в одном месте, а компоненты остаются как есть',
          en: 'A token describes meaning: a theme, brand or shade changes in one place while components stay as they are',
        },
      },
      { text: { ru: 'Hex-цвета не поддерживаются в тёмной теме', en: 'Hex colors aren’t supported in dark theme' } },
      { text: { ru: 'Так требует стандарт HTML', en: 'The HTML standard requires it' } },
      { text: { ru: 'Чтобы цвет нельзя было переопределить', en: 'So the color can’t be overridden' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Дизайн-токены** — именованные решения дизайна: цвета, отступы, радиусы. Семантическое имя (`danger`, `surface`, `text-secondary`) говорит, зачем цвет, а не какой он. Тёмная тема или ребрендинг меняют значения токенов, и сотни компонентов подхватывают их без правок; хардкод-цвета пришлось бы искать по всему коду.',
          en: '**Design tokens** are named design decisions: colors, spacing, radii. A semantic name (`danger`, `surface`, `text-secondary`) says why a color is used, not what it is. A dark theme or rebrand changes token values, and hundreds of components pick them up untouched; hardcoded colors would have to be hunted down across the code.',
        },
      },
    ],
    sources: [{ title: 'Design Tokens Community Group', url: 'https://www.designtokens.org/' }],
  },
  {
    id: 'arch-data-validation-001',
    topic: 'architecture',
    tags: ['arch-data'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Зачем проверять ответ API схемой (например, zod) прямо при получении, если бэкенд «и так присылает правильно»?',
      en: 'Why validate an API response with a schema (say, zod) right on receipt if the backend “sends correct data anyway”?',
    },
    options: [
      { text: { ru: 'Чтобы запросы шли быстрее', en: 'To make requests faster' } },
      {
        text: {
          ru: 'Изменение контракта упадёт понятной ошибкой на границе, а не `undefined` где-то глубоко в интерфейсе',
          en: 'A contract change fails with a clear error at the boundary, not as `undefined` somewhere deep in the UI',
        },
      },
      { text: { ru: 'Без схемы TypeScript не скомпилирует код', en: 'TypeScript won’t compile without a schema' } },
      { text: { ru: 'Это защищает от XSS', en: 'It protects against XSS' } },
      { text: { ru: 'Схема уменьшает размер ответа', en: 'A schema shrinks the response size' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Типы TypeScript исчезают после сборки и ничего не проверяют во время работы. Если бэкенд переименует поле или пришлёт `null`, без проверки ошибка всплывёт далеко от причины — в рендере, в форматировании. Схема на границе ловит это сразу, даёт точное сообщение и служит единым источником типов.',
          en: 'TypeScript types vanish after the build and check nothing at runtime. If the backend renames a field or sends `null`, without validation the error surfaces far from the cause — in rendering or formatting. A schema at the boundary catches it immediately, gives a precise message and serves as a single source of types.',
        },
      },
    ],
    sources: [{ title: 'Zod', url: 'https://zod.dev/' }],
  },
  {
    id: 'arch-data-bff-001',
    topic: 'architecture',
    tags: ['arch-data', 'arch-scale'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Мобильному приложению для одного экрана нужно 6 запросов к разным микросервисам. Что такое BFF и как он помогает?',
      en: 'A mobile app needs 6 requests to different microservices for one screen. What is a BFF and how does it help?',
    },
    options: [
      { text: { ru: 'Библиотека кеширования на клиенте', en: 'A client-side caching library' } },
      {
        text: {
          ru: 'Отдельный бэкенд под конкретный клиент: собирает данные из сервисов и отдаёт экрану ровно то, что ему нужно, одним запросом',
          en: 'A separate backend for a specific client: it gathers data from services and returns exactly what the screen needs in one request',
        },
      },
      { text: { ru: 'Формат сериализации вместо JSON', en: 'A serialization format instead of JSON' } },
      { text: { ru: 'Балансировщик нагрузки', en: 'A load balancer' } },
      { text: { ru: 'Способ хранить токены', en: 'A way to store tokens' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Backend for Frontend** — серверный слой, принадлежащий команде клиента. Он объединяет запросы, отбрасывает лишние поля и меняет форму данных под экран, поэтому клиенту хватает одного запроса через медленную мобильную сеть. У веба и мобильного приложения могут быть разные BFF. Next.js с Route Handlers и Server Components часто играет эту роль.',
          en: 'A **Backend for Frontend** is a server layer owned by the client team. It merges requests, drops extra fields and reshapes data for the screen, so the client needs one request over a slow mobile network. Web and mobile can have separate BFFs. Next.js with Route Handlers and Server Components often plays this role.',
        },
      },
    ],
    sources: [{ title: 'Sam Newman — Backends For Frontends', url: 'https://samnewman.io/patterns/architectural/bff/' }],
  },
];
