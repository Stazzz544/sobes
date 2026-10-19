import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs';
const GIT = 'https://git-scm.com/docs';

export const WEB_QUESTIONS_9: Question[] = [
  {
    id: 'web-git-003',
    topic: 'web',
    tags: ['git'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Посреди работы над фичей нужно срочно переключиться на другую ветку, а коммитить незаконченное не хочется. Что сделать?',
      en: 'In the middle of a feature you must urgently switch to another branch, and you don’t want to commit unfinished work. What do you do?',
    },
    options: [
      { text: { ru: '`git reset --hard`', en: '`git reset --hard`' } },
      { text: { ru: '`git stash`, а после возвращения — `git stash pop`', en: '`git stash`, then `git stash pop` when you come back' } },
      { text: { ru: 'Удалить изменённые файлы', en: 'Delete the changed files' } },
      { text: { ru: '`git commit --amend`', en: '`git commit --amend`' } },
      { text: { ru: 'Переключиться: Git сам перенесёт изменения в другую ветку и забудет их здесь', en: 'Just switch: Git moves the changes to the other branch and forgets them here' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git stash` откладывает незакоммиченные изменения в отдельный стек и очищает рабочую папку — можно спокойно переключать ветку. `git stash pop` возвращает их обратно. Новые неотслеживаемые файлы по умолчанию не прячутся: для них есть `git stash -u`. `reset --hard` изменения просто уничтожит.',
          en: '`git stash` puts uncommitted changes onto a separate stack and cleans the working tree — you can switch branches safely. `git stash pop` brings them back. New untracked files aren’t stashed by default: use `git stash -u` for them. `reset --hard` would simply destroy the changes.',
        },
      },
    ],
    sources: [{ title: 'Git — git-stash', url: `${GIT}/git-stash` }],
  },
  {
    id: 'web-git-004',
    topic: 'web',
    tags: ['git'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Чем `git fetch` отличается от `git pull`?',
      en: 'How does `git fetch` differ from `git pull`?',
    },
    options: [
      { text: { ru: 'Ничем, это синонимы', en: 'No difference, they’re synonyms' } },
      {
        text: {
          ru: '`fetch` только скачивает новые коммиты в удалённые ветки (`origin/main`), а `pull` — это `fetch` плюс слияние или rebase в текущую ветку',
          en: '`fetch` only downloads new commits into remote-tracking branches (`origin/main`), while `pull` is `fetch` plus a merge or rebase into the current branch',
        },
      },
      { text: { ru: '`fetch` отправляет коммиты на сервер', en: '`fetch` sends commits to the server' } },
      { text: { ru: '`pull` работает только с тегами', en: '`pull` only works with tags' } },
      { text: { ru: '`fetch` удаляет локальные изменения', en: '`fetch` deletes local changes' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git fetch` безопасен: он обновляет только удалённые ветки вроде `origin/main` и не трогает вашу текущую ветку и рабочую папку. Посмотреть, что пришло, можно через `git log main..origin/main`. `git pull` сразу вливает изменения в текущую ветку — слиянием или rebase, в зависимости от настроек.',
          en: '`git fetch` is safe: it updates only remote-tracking branches like `origin/main` and doesn’t touch your current branch or working tree. See what arrived with `git log main..origin/main`. `git pull` immediately integrates the changes into the current branch — by merge or rebase, depending on settings.',
        },
      },
    ],
    sources: [{ title: 'Git — git-fetch', url: `${GIT}/git-fetch` }],
  },
  {
    id: 'web-git-005',
    topic: 'web',
    tags: ['git'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'При слиянии Git сообщил о конфликте в `header.tsx`. Как его разрешить?',
      en: 'During a merge Git reported a conflict in `header.tsx`. How do you resolve it?',
    },
    options: [
      { text: { ru: 'Удалить файл и закоммитить', en: 'Delete the file and commit' } },
      {
        text: {
          ru: 'Открыть файл, выбрать нужный вариант между маркерами `<<<<<<<`, `=======`, `>>>>>>>`, убрать маркеры, затем `git add` и завершить слияние коммитом',
          en: 'Open the file, pick the right version between the `<<<<<<<`, `=======`, `>>>>>>>` markers, remove the markers, then `git add` and finish the merge with a commit',
        },
      },
      { text: { ru: 'Запустить `git push --force`', en: 'Run `git push --force`' } },
      { text: { ru: 'Конфликт исчезнет сам при следующем `git pull`', en: 'The conflict disappears on the next `git pull`' } },
      { text: { ru: 'Переименовать ветку', en: 'Rename the branch' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Конфликт возникает, когда обе ветки изменили одни и те же строки, и Git не знает, какой вариант верный. Он вставляет в файл обе версии между маркерами. Нужно оставить правильный код (иногда — комбинацию), удалить маркеры, пометить файл решённым через `git add` и сделать коммит слияния. Передумали — `git merge --abort`.',
          en: 'A conflict happens when both branches changed the same lines and Git can’t tell which version is right. It writes both versions into the file between markers. Keep the correct code (sometimes a combination), delete the markers, mark the file resolved with `git add` and make the merge commit. Changed your mind — `git merge --abort`.',
        },
      },
    ],
    sources: [{ title: 'Git — Basic merge conflicts', url: 'https://git-scm.com/book/en/v2/Git-Branching-Basic-Branching-and-Merging' }],
  },
  {
    id: 'web-git-006',
    topic: 'web',
    tags: ['git'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Команда пишет сообщения коммитов по Conventional Commits. Какое подходит для исправления ошибки в форме входа?',
      en: 'The team follows Conventional Commits. Which message fits a login form bug fix?',
    },
    options: [
      { text: { ru: '`fixed stuff`', en: '`fixed stuff`' } },
      { text: { ru: '`fix(auth): handle empty password`', en: '`fix(auth): handle empty password`' } },
      { text: { ru: '`feat: fix login`', en: '`feat: fix login`' } },
      { text: { ru: '`AUTH FIX!!!`', en: '`AUTH FIX!!!`' } },
      { text: { ru: '`update login.tsx`', en: '`update login.tsx`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Формат `тип(область): описание`. Тип показывает характер изменения: `fix` — исправление, `feat` — новая возможность, `refactor`, `docs`, `test`, `chore`. По этим типам инструменты генерируют changelog и поднимают версию по semver: `fix` — патч, `feat` — минор, `BREAKING CHANGE` — мажор. Описание — что изменилось, а не «обновил файл».',
          en: 'The format is `type(scope): description`. The type shows the kind of change: `fix` is a bug fix, `feat` a new feature, plus `refactor`, `docs`, `test`, `chore`. Tools generate the changelog and bump semver from these types: `fix` → patch, `feat` → minor, `BREAKING CHANGE` → major. The description says what changed, not “updated a file”.',
        },
      },
    ],
    sources: [{ title: 'Conventional Commits', url: 'https://www.conventionalcommits.org/en/v1.0.0/' }],
  },
  {
    id: 'web-deploy-004',
    topic: 'web',
    tags: ['deploy'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Что такое preview-деплой (deploy preview)?',
      en: 'What is a deploy preview?',
    },
    options: [
      { text: { ru: 'Скриншот сайта для отчёта', en: 'A site screenshot for a report' } },
      {
        text: {
          ru: 'Отдельная временная версия сайта для каждого пулреквеста со своим адресом — для ревью и тестов до слияния',
          en: 'A separate temporary site version for each pull request at its own URL — for review and testing before merging',
        },
      },
      { text: { ru: 'Деплой в продакшен без тестов', en: 'A production deploy without tests' } },
      { text: { ru: 'Локальный запуск `npm run dev`', en: 'Running `npm run dev` locally' } },
      { text: { ru: 'Режим отладки в браузере', en: 'A browser debugging mode' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Хостинги вроде Vercel и Netlify и CI собирают каждый пулреквест и выкладывают его по отдельному адресу. Ревьюер, дизайнер или тестировщик открывают изменения в настоящем браузере до слияния, а e2e-тесты гоняются на живой сборке. После слияния или закрытия PR такой деплой удаляют.',
          en: 'Hosts like Vercel and Netlify, or CI, build every pull request and publish it at its own URL. A reviewer, designer or QA opens the changes in a real browser before merging, and e2e tests run against a live build. After the PR merges or closes, the deploy is removed.',
        },
      },
    ],
    sources: [{ title: 'Netlify — Deploy Previews', url: 'https://docs.netlify.com/site-deploys/deploy-previews/' }],
  },
  {
    id: 'web-deploy-005',
    topic: 'web',
    tags: ['deploy'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Почему `index.html` одностраничного приложения отдают с `Cache-Control: no-cache`, а `app.3f9a2c.js` — с `max-age=31536000, immutable`?',
      en: 'Why is an SPA’s `index.html` served with `Cache-Control: no-cache` and `app.3f9a2c.js` with `max-age=31536000, immutable`?',
    },
    options: [
      { text: { ru: 'Так требует стандарт HTML', en: 'The HTML standard requires it' } },
      {
        text: {
          ru: '`index.html` должен всегда указывать на свежие файлы, а файл с хэшем в имени под тем же именем никогда не меняется — его можно кешировать навсегда',
          en: '`index.html` must always point to the latest files, while a file with a hash in its name never changes under that name — it can be cached forever',
        },
      },
      { text: { ru: 'JS-файлы меньше HTML', en: 'JS files are smaller than HTML' } },
      { text: { ru: 'HTML нельзя сжимать', en: 'HTML can’t be compressed' } },
      { text: { ru: 'Это ускоряет только первую загрузку', en: 'It speeds up only the first load' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'После деплоя меняются имена файлов: новый код — новый хэш. `index.html` ссылается на актуальные имена, поэтому браузер должен каждый раз его перепроверять (`no-cache` разрешает хранить, но требует ревалидации). Файлы с хэшем под одним именем неизменны: их можно кешировать навсегда, а `immutable` избавляет даже от проверок при обновлении страницы.',
          en: 'After a deploy file names change: new code means a new hash. `index.html` references the current names, so the browser must revalidate it every time (`no-cache` allows storing but requires revalidation). Hashed files never change under one name: they can be cached forever, and `immutable` skips even the revalidation on page reload.',
        },
      },
    ],
    sources: [{ title: 'MDN — Cache-Control', url: `${MDN}/Web/HTTP/Reference/Headers/Cache-Control` }],
  },
  {
    id: 'web-deploy-006',
    topic: 'web',
    tags: ['deploy'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'После релиза фронтенда упали ключевые сценарии. Как откатиться быстрее и надёжнее всего?',
      en: 'After a frontend release key flows broke. What’s the fastest and safest way to roll back?',
    },
    options: [
      { text: { ru: 'Исправить баг прямо на сервере в собранных файлах', en: 'Fix the bug directly in the built files on the server' } },
      {
        text: {
          ru: 'Переключить трафик на предыдущую неизменную сборку: при атомарных деплоях каждая версия хранится целиком, откат — смена указателя',
          en: 'Switch traffic to the previous immutable build: with atomic deploys each version is stored whole, and a rollback is a pointer switch',
        },
      },
      { text: { ru: 'Пересобрать старую ветку и долить файлы поверх новых', en: 'Rebuild the old branch and copy files over the new ones' } },
      { text: { ru: 'Очистить кеш браузера у пользователей', en: 'Clear users’ browser caches' } },
      { text: { ru: 'Ждать следующего планового релиза', en: 'Wait for the next scheduled release' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'При **атомарном** деплое новая сборка выкладывается рядом со старой целиком, а затем трафик переключается одним действием. Поэтому откат — такое же переключение обратно, за секунды. Копирование файлов поверх старых даёт смесь версий: старый `index.html` может сослаться на уже удалённые чанки. Пересборка медленная и может дать другой результат.',
          en: 'With an **atomic** deploy the new build is uploaded whole next to the old one, and then traffic switches in one step. So a rollback is the same switch back, in seconds. Copying files over the old ones produces a mix of versions: an old `index.html` may reference chunks that are gone. Rebuilding is slow and may produce a different result.',
        },
      },
    ],
    sources: [{ title: 'Vercel — Instant Rollback', url: 'https://vercel.com/docs/instant-rollback' }],
  },
  {
    id: 'web-tooling-002',
    topic: 'web',
    tags: ['tooling'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Зачем в репозитории хранят `package-lock.json`?',
      en: 'Why is `package-lock.json` kept in the repository?',
    },
    options: [
      { text: { ru: 'Чтобы запретить установку пакетов', en: 'To forbid installing packages' } },
      {
        text: {
          ru: 'Он фиксирует точные версии всего дерева зависимостей: установка воспроизводима в CI и у коллег, а `npm ci` ставит ровно его',
          en: 'It pins exact versions of the whole dependency tree: installs are reproducible in CI and for teammates, and `npm ci` installs exactly it',
        },
      },
      { text: { ru: 'Он ускоряет работу приложения в браузере', en: 'It speeds up the app in the browser' } },
      { text: { ru: 'Он хранит пароли от npm', en: 'It stores npm passwords' } },
      { text: { ru: 'Он не нужен, если есть `package.json`', en: 'It’s unnecessary if `package.json` exists' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В `package.json` обычно стоят диапазоны (`^1.2.0`), и без lock-файла разные установки получат разные версии — «у меня работает». Lock-файл записывает точные версии и хэши всего дерева, включая транзитивные зависимости. `npm ci` ставит строго по нему и падает, если он не совпадает с `package.json`, — так и делают в CI.',
          en: '`package.json` usually has ranges (`^1.2.0`), and without a lock file different installs get different versions — “works on my machine”. The lock file records exact versions and hashes of the whole tree, transitive dependencies included. `npm ci` installs strictly from it and fails if it doesn’t match `package.json` — that’s what CI uses.',
        },
      },
    ],
    sources: [{ title: 'npm — package-lock.json', url: 'https://docs.npmjs.com/cli/v10/configuring-npm/package-lock-json' }],
  },
  {
    id: 'web-tooling-003',
    topic: 'web',
    tags: ['tooling'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Ошибка в продакшене указывает на `app.min.js:1:48213`. Что поможет увидеть исходный файл и строку?',
      en: 'A production error points to `app.min.js:1:48213`. What helps you see the original file and line?',
    },
    options: [
      { text: { ru: 'Отключить минификацию в продакшене', en: 'Disable minification in production' } },
      {
        text: {
          ru: 'Source map: она связывает собранный код с исходниками — DevTools и сервисы мониторинга показывают оригинальные файлы и строки',
          en: 'A source map: it maps built code to sources — DevTools and monitoring services show original files and lines',
        },
      },
      { text: { ru: 'Добавить `console.log` в каждую функцию', en: 'Add `console.log` to every function' } },
      { text: { ru: 'Перейти с ESM на CommonJS', en: 'Switch from ESM to CommonJS' } },
      { text: { ru: 'Это невозможно', en: 'It’s impossible' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сборщик минифицирует и склеивает код, и позиции в нём ничего не говорят. **Source map** — файл соответствий «позиция в бандле → файл и строка в исходниках». DevTools подхватывает его автоматически, а Sentry и подобные сервисы используют его, чтобы показать понятный стек. Карты часто загружают только в мониторинг и не публикуют, чтобы не раскрывать исходники.',
          en: 'The bundler minifies and concatenates code, so positions in it mean nothing. A **source map** is a mapping file “bundle position → source file and line”. DevTools picks it up automatically, and Sentry and similar services use it to show a readable stack. Maps are often uploaded only to monitoring and not published, to keep sources private.',
        },
      },
    ],
    sources: [{ title: 'MDN — Source map', url: `${MDN}/Glossary/Source_map` }],
  },
  {
    id: 'web-tooling-004',
    topic: 'web',
    tags: ['tooling'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Куда добавить линтер, тестовый раннер и сборщик в `package.json` библиотеки?',
      en: 'Where do a linter, test runner and bundler go in a library’s `package.json`?',
    },
    options: [
      { text: { ru: 'В `dependencies`', en: 'In `dependencies`' } },
      { text: { ru: 'В `devDependencies`: они нужны только для разработки и сборки, а пользователи библиотеки их не установят', en: 'In `devDependencies`: they’re needed only for development and builds, and library users won’t install them' } },
      { text: { ru: 'В `peerDependencies`', en: 'In `peerDependencies`' } },
      { text: { ru: 'В `scripts`', en: 'In `scripts`' } },
      { text: { ru: 'Никуда: их ставят глобально', en: 'Nowhere: install them globally' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`dependencies` нужны коду во время работы, и при установке библиотеки они ставятся вместе с ней. `devDependencies` — инструменты разработки: линтеры, тесты, сборщик, типы. Пользователь библиотеки их не получает, поэтому его `node_modules` не раздувается. Глобальная установка инструментов ломает воспроизводимость: у коллег окажутся другие версии.',
          en: '`dependencies` are needed by the code at runtime, and installing the library installs them too. `devDependencies` are development tools: linters, tests, the bundler, types. Library users don’t get them, so their `node_modules` doesn’t bloat. Installing tools globally breaks reproducibility: teammates end up with other versions.',
        },
      },
    ],
    sources: [{ title: 'npm — package.json: devDependencies', url: 'https://docs.npmjs.com/cli/v10/configuring-npm/package-json#devdependencies' }],
  },
  {
    id: 'web-storage-002',
    topic: 'web',
    tags: ['storage'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Что важно знать об API `localStorage`?',
      en: 'What’s important to know about the `localStorage` API?',
    },
    options: [
      { text: { ru: 'Хранит любые объекты и работает асинхронно', en: 'It stores any objects and works asynchronously' } },
      {
        text: {
          ru: 'Около 5 МБ на origin, хранит только строки (объекты — через `JSON.stringify`), API синхронный и блокирует главный поток',
          en: 'About 5 MB per origin, stores only strings (objects via `JSON.stringify`), and the API is synchronous, blocking the main thread',
        },
      },
      { text: { ru: 'Данные удаляются при закрытии вкладки', en: 'Data is removed when the tab closes' } },
      { text: { ru: 'Доступен из Service Worker', en: 'It’s available in a Service Worker' } },
      { text: { ru: 'Данные шифруются браузером и недоступны скриптам', en: 'The browser encrypts the data and scripts can’t read it' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`localStorage` хранит пары строк: `setItem("user", obj)` сохранит `"[object Object]"`, поэтому объекты сериализуют через `JSON`. Лимит — около 5 МБ на origin. Все вызовы синхронные: большие чтения и записи блокируют главный поток. Он недоступен в Service Worker и Web Worker, а любой скрипт на странице — в том числе внедрённый через XSS — может прочитать его содержимое.',
          en: '`localStorage` stores string pairs: `setItem("user", obj)` saves `"[object Object]"`, so objects are serialized with `JSON`. The limit is about 5 MB per origin. All calls are synchronous: large reads and writes block the main thread. It’s unavailable in Service Workers and Web Workers, and any script on the page — including one injected via XSS — can read its contents.',
        },
      },
    ],
    sources: [{ title: 'MDN — Window.localStorage', url: `${MDN}/Web/API/Window/localStorage` }],
  },
];
