# Sobes — прогресс по фазам

План: `C:\Users\basileus\.claude\plans\polymorphic-napping-iverson.md`.

## Фаза 1 — каркас (13.10.2026)

Сделано:
- Проект на стеке OhMyGuide: Expo 54, RN 0.81.5, expo-router 6, Effector 23, AsyncStorage, Reanimated 4. Дополнительно: react-native-svg, expo-haptics, expo-clipboard, expo-localization, tsx (dev). i18next не используем — свой типизированный словарь.
- `src/shared`: config (STORAGE_KEYS `sobes_*`, размеры), storage, тема (базовые light/dark + акценты brand/javascript/typescript/react/web, контраст проверен), i18n (`useI18n`: `t`, `plural`, `text`), UI-кит (AppText, Button, Card, ProgressBar, SegmentedControl, Screen, EmptyState).
- `entities/topic` (конфиг тем, `$currentTopic` с персистом, SVG-логотипы, TopicCard, TopicSwitcher), `entities/settings` (язык/тема/длина сессии/вибро/ИИ-провайдер/онбординг, персист), `entities/question` (пока только `QuizMode`).
- Виджеты: onboarding, mode-picker, settings-panel.
- Навигация: онбординг за гардом `Stack.Protected`, табы Тренировка/Ошибки/Статистика/Настройки, заглушка `quiz`.

Проверено на эмуляторе Pixel_9_Pro_XL (debug-сборка `npx expo run:android --no-bundler` ~7 мин + `npx expo start`):
- онбординг (язык с устройства, переключение RU/EN, выбор темы) → табы; состояние переживает перезапуск;
- палитры TS (light), JS (light и dark): шапка, статус-бар, таб-бар, акценты; 360 dp (`wm density 597`) без обрезаний;
- `npm run type-check` зелёный.

Заметки на потом:
- Горизонтальному `ScrollView` внутри `Screen` нужен `flexGrow: 0`, иначе он растягивается по высоте.
- Пока грузится JS-бандл, виден нативный фон (светло-серый) с белыми иконками статус-бара — поправить сплэшем/фоном в фазе 5.
- Подписи в `SegmentedControl` короткие: на 360 dp влезает ~8 символов на сегмент из трёх.

## Фаза 2 — механика (13.10.2026)

Сделано:
- `entities/question`: тип `Question` (5 вариантов кортежем, `answer`, блоки разбора, источники, `verify`), словарь тегов `TAGS` (по ~12 на тему), **20 настоящих вопросов** (по 5 на тему, RU+EN) в `data/<topic>.ts`, UI: `QuestionView`, `OptionButton` (тряска при ошибке, пульс при верном), `ExplanationView`.
- `entities/progress`: `$questionStats`, `$answerLog` (≤3000), `$mistakeIds`, правило «2 верных подряд — закреплено» (`applyAnswer`), событие `mistakeResolved`, персист.
- `widgets/quiz-session`: `createQuizSessionModel` (очередь под режим, seeded-перемешивание вариантов, фазы answering/revealed/finished/empty, таймер собеседования 60 с/вопрос через patronum `interval`, вибро, тост «Закреплено»), экран с нижней панелью, автопрокрутка к разбору, итог с оценкой уровня.
- Виджеты: `question-review`, `mistakes-list` (бейдж на табе), `stats-dashboard` (плитки, слабые места → тренировка по тегу, активность 14 дней SVG, темы, сложность), `settings-panel` (+ длина тренировки, вибро, сброс, версия).
- Фичи: `ask-ai` (Perplexity → ChatGPT → Алиса → DeepSeek + «Другое приложение» через Share + копирование; промпт всегда в буфере), `report-question` (mailto, если задан `FEEDBACK_EMAIL`, иначе Share), `reset-progress`.
- `shared/ui`: `CodeBlock` (свой токенайзер JS/TS/JSX/CSS/HTML, копирование), `FormattedText` (`code`, **bold**), `Pill`, `Button size="compact"`.
- `scripts/verify-content.ts`: структура, `js-output` (запуск в Node), `ts-type` и `ts-check` (TS compiler API), контраст палитр, `--links`. Негативный тест: ломаешь вопрос — скрипт падает.

Проверено:
- `npm run type-check`, `npm run verify:content -- --links` (37 ссылок живые) — зелёные.
- Эмулятор 360 dp: онбординг → практика JS (неверно / «Не знаю» / разбор / подсветка вариантов), шторка ИИ, итог, ошибки (2 прохода «Работы над ошибками» → раздел пуст), статистика, собеседование React в dark с таймером и оценкой уровня, просмотр вопроса, пустой режим («Сложные» React).
- ИИ живьём: Perplexity `?q=` — без входа, сразу отвечает; ChatGPT `?q=` — без входа, вопрос в поле ввода; Алиса — без входа, `?text=` не работает (буфер); DeepSeek — нужен вход (буфер).

Не проверено: появление тоста «Закреплено» глазами (логика проверена — вопросы ушли из ошибок); светлая палитра Web и TS-сессия; ссылка `mailto` (почта не задана).

Решения / открытые вопросы:
- `FEEDBACK_EMAIL` и `SUPPORT_LINKS` в `src/shared/config/links.ts` пустые — нужны от пользователя. Экран «Поддержать» не сделан, пока нет ссылок.
- Вопрос выходит из ошибок после 2 верных подряд в любом режиме, не только в «Работе над ошибками».

Гочи окружения:
- Фоновые задачи Bash живут 30 мин по умолчанию — эмулятор и Metro запускать с `timeout: 7200000`.
- Эмулятор, запущенный с `-no-snapshot-save`, поднимается из старого снимка без установленного приложения; надёжнее `-no-snapshot-load`. Если эмулятор сразу закрывается — удалить устаревший `~/.android/avd/Pixel_9_Pro_XL.avd/multiinstance.lock`.
- `uiautomator dump` медленный (~10 с) и может съедать касания; при сбое `adb` старый `/sdcard/ui.xml` остаётся — удалять перед дампом. Варианты ниже экрана не видны в дампе — сначала прокрутка.
- Первое касание сразу после запуска приложения иногда теряется.
- В `node -e` под bash шаблонные строки с бэктиками ломаются — такие правки через Edit.

## Фаза 3 — контент (13.10.2026)

Сделано:
- **164 вопроса RU+EN**: JS 42 (12/20/10), TS 40 (13/15/12), React 40 (9/21/10), Web 42 (9/26/7) — junior/middle/senior. Файлы `data/<topic>.ts` + `<topic>-2..4.ts`.
- Машинно проверено 73: JS 34 (`js-output`, запуск в Node), TS 39 (`ts-type`/`ts-check`/`ts-error`/`ts-output` через компилятор). React и Web — концептуальные, утверждения сверены с react.dev / MDN / RFC / OWASP / web.dev; все 240 ссылок живые (`--links`).
- Отдельно руками: live binding ESM (два `.mjs`), Node 25 strip-only падает на `enum` (`ERR_UNSUPPORTED_TYPESCRIPT_SYNTAX`).
- `verify-content`: новые виды `ts-error`, `ts-output`; запрет кириллицы в вариантах-коде; регистр в коде значим; `npm run verify:content` теперь сначала гоняет type-check (tsx типы не проверяет — так пропустились 12 `caption` внутри `code`, исправлено).
- Тег `arrays` для JS. `docs/content-guidelines.md` — правила составления и проверки вопросов.
- `CodeBlock`: подпись рендерится через `FormattedText` (бэктики/жирный).

Проверено на эмуляторе: новые вопросы открываются (deep link при запущенном приложении), подписи к коду, блоки `ts`/`http`.

Известная проблема: холодный старт сразу по deep link `sobes://question/<id>` даёт пустой экран (обычный запуск и deep link в запущенное приложение работают). Пока deep links не используются; разобраться до уведомлений «вопрос дня».

## Фаза 4 — схемы и полировка (13.10.2026)

Сделано:
- Пошаговые анимированные схемы: блок `{ type: 'diagram', diagram: DiagramId }` в пояснении, данные — `data/diagrams.ts`, плеер — `entities/question/ui/diagram-player.tsx` (Назад / ▶ автопроигрывание 2,6 с / Далее, «Шаг N из M»). Два вида: `columns` (стек, очереди, консоль — элементы появляются/исчезают/сдвигаются через Reanimated layout-анимации) и `chain` (узлы сверху вниз, активный подсвечен).
- 7 схем: event-loop-basic, event-loop-async, prototype-chain, closure-counters, react-render-commit, critical-rendering-path, http-revalidation — подключены к 12 вопросам. `verify-content` проверяет схемы (≥2 шагов, подписи RU/EN, уникальные id, каждая используется).
- `shared/ui/IconButton` (48 dp).
- a11y: таймер собеседования озвучивает значение; в итоге сессии результат вопроса озвучивается текстом; карточки режимов озвучивают описание; сегменты 48 dp; зона нажатия копирования кода 48 dp.

Проверено на эмуляторе (360 dp): схема event loop в dark (React), цепочка прототипов в light (JS), вопрос в TS light и Web dark. По контрасту исправлены: дорожка «Консоль» и круглые кнопки плеера в dark.

Не проверено глазами: TS dark, Web light, React light внутри вопроса (контраст проверен скриптом). Тосты и TalkBack вживую не прогонялись.

## Сборка для запуска (13.10.2026)

- Код на GitHub: https://github.com/Stazzz544/sobes (ветка `main`; репозиторий публичный — пользователь создал его пустым).
- Release APK: `npm run build:apk` → `android/app/build/outputs/apk/release/sobes.apk` (43,8 МБ, arm64-v8a + armeabi-v7a, подписан debug-ключом). Копия — `dist/sobes.apk` (в `.gitignore`).
- ARM-only APK на x86_64-эмуляторе падает (`SoLoaderDSONotFoundError: libreactnative.so` — SoLoader ищет `lib/x86_64`); на ARM-телефонах библиотеки на месте. Для эмулятора — `npm run build:apk -- --emulator`. Release-бандл проверен x86_64-сборкой: онбординг, практика, разбор, автопроигрывание схемы — без падений.

## Иконка (13.10.2026)

- Иконка ≠ логотип. Иконка — символ без текста: скруглённая плитка-лицо (идея пользователя — двойное прочтение: лицо с улыбкой или комната, где человек сидит за монитором). Левый глаз — точка, правый — монитор на подставке с тёмным экраном и курсором-зрачком; улыбка. Палитра «лайм на чёрном»: плитка и курсор `#C8F31D`, черты и экран `#121417`, фон — градиент `#1C1F24 → #0B0C0E` (`android.adaptiveIcon.backgroundColor` = `#121417`). Фиолетовый пользователь отверг категорически; сравнивались также коралл+мята, мандарин, жёлтый, фуксия, крем+терракота, мята. Акцент приложения (`brand` в `colors.ts`, `#6D4AFF`) пока фиолетовый — не синхронизирован с иконкой. Нарисовано геометрией (`circle`/`rect`/`path`), шрифт не нужен; в монохроме черты вырезаны маской из плитки. Масштаб: ×1.14 в `icon.svg`, ×0.9 в `adaptive-foreground.svg` (угол плитки на r≈303 — внутри безопасной зоны r=313). Контурный вариант плитки отвергнут — тонкие линии в 40 px слабее заливки.
- Почему так (ревью 13.10): текст в иконке на 48dp не читается (`<>IT</>` ≈ 5sp), «Sobes» дублирует подпись лаунчера, сетка фона на целевом размере пропадает, чёрный+зелёный моноширинный — штамп «хакер-терминал». Символ `<▌/>` пользователь отверг — на «тесте полки» (сетка лаунчера с типовыми иконками dev-квизов `</>`, `{ }`, `>_`, `JS`, `?`, `Q&A`, `IT`) он сливается с конкурентами. Код — общее место категории, своё — эмоция собеседования; лицо единственное на полке и читается в 40 px. Отвергнуты также: галстук (читается как поиск работы/HR, не dev), два пузыря «вопрос → ответ» (выглядит как мессенджер, в монохроме теряет смысл), `S▌`, `<S/>`.
- Логотип — прежняя композиция «терминал»: `<>IT</>` (лигатуры JetBrains Mono выключены через `font-feature-settings: 'calt' 0`, иначе `<>` склеивается в ромб), крупное `Sobes` и зелёный курсор — `assets/icon-src/logo.svg`, для будущего сплэша/шапки/баннера Google Play; пока нигде не подключён. Три точки окна (отсылка к macOS) и `~/prep $` убраны по просьбе пользователя. Текст в нём — `<text>` со шрифтом из Google Fonts (`@import` внутри SVG), рендер нужен с сетью.
- Исходники — `assets/icon-src/*.svg` (1024×1024): `icon.svg`, `adaptive-foreground.svg`, `adaptive-background.svg`, `adaptive-monochrome.svg` (тот же знак белым), `logo.svg`.
- PNG отрисованы через playwright-core (из `node_modules` cabinet.next) + системный Chrome: SVG инлайном в страницу (для `logo.svg` — ждать `document.fonts.load('800 100px "JetBrains Mono"')`), скриншот `svg` с `omitBackground: true`; новых пакетов не ставили. Подключены в `app.config.ts` (`icon`, `android.adaptiveIcon`), после изменения — `npx expo prebuild --platform android --no-install`.
- Сплэш не делали: нужен пакет `expo-splash-screen` (спросить разрешение).

## Тема «ИИ и LLM» (13.10.2026)

- Шестая тема `ai`: изумрудная палитра (light `#047857`/шапка `#059669`, dark `#34D399`), логотип — искры, теги `llm-basics`, `prompting`, `rag`, `agents`, `ai-security`, `ai-frontend`, `ai-tools`.
- 32 вопроса RU+EN (`data/ai.ts`, `data/ai-2.ts`; 14/13/5 по сложности): LLM и токены, контекст, галлюцинации, temperature, промпты, structured output, RAG и эмбеддинги, function calling, агенты, MCP, ключи API, prompt injection, XSS из ответа модели, стриминг, UX ИИ-функций, 429, работа с ИИ-ассистентами.
- Источники — Claude Docs, Google ML, Hugging Face, OWASP GenAI, MDN, AWS, MCP; все 276 ссылок банка живые.
- `TopicSwitcher` сам докручивается до выбранной темы (с 6 темами выбранный чип уходил за край).
- Проверено на эмуляторе: онбординг → ИИ, главная light/dark, вопрос.

## Выбор темы из шапки (13.10.2026)

- Бургер в шапке вкладки «Тренировка» опускает шторку из-под шапки с карточками тем (`features/select-topic`: `topicMenuModel`, `TopicMenuButton`, `TopicMenuSheet`). Карточки — общий `TopicCardList` из `entities/topic`, его же использует онбординг.
- Выбор темы закрывает шторку; ещё закрывают крестик, тап по затемнению, «Назад» и уход с вкладки. При открытии список прокручивается к выбранной теме.
- Проверено на эмуляторе 360 dp: dark (AI → React), light (React → JS, чёрный бургер на жёлтой шапке), «Назад», тап по фону.

## Тема «Алгоритмы» (13.10.2026)

- Седьмая тема `algorithms` (shortTitle `Algo`): малиновая палитра (light `#BE185D`/шапка `#DB2777`, dark `#F472B6`), логотип — растущие столбики, теги `big-o`, `data-structures`, `searching`, `sorting`, `recursion`, `two-pointers`, `hashing`, `trees-graphs`, `dynamic-programming`. Префикс id — `algo`.
- 35 вопросов RU+EN (`data/algorithms.ts`, `data/algorithms-2.ts`; 10/19/6 по сложности), глубина «собес фронтендера»: Big-O циклов и `includes`/`Set`/`shift`, стек/очередь/куча/список, two sum, анаграммы, бинарный поиск, стабильность `sort`, merge vs quick, `fib` и мемоизация, `RangeError`, хвостовые вызовы (только Safari), два указателя, скользящее окно, Флойд, BFS/DFS, порядок DOM, вырожденный BST, `flat`, diff React, лестница и табуляция.
- 18 вопросов машинно проверены (`js-output`); ответы распределены 7/7/7/7/7; у текстовых вариантов выровнена длина, чтобы верный не выдавал себя самым длинным.
- 3 новые схемы: `binary-search`, `bfs-queue`, `recursion-stack`. Все 319 ссылок банка живые.
- Проверено на эмуляторе 360 dp (x86_64-сборка): главная «Алгоритмы» в dark и light, вопрос с кодом, схемы BFS (dark, пошагово), бинарного поиска (dark) и стека рекурсии (light).
- Замечание: в схеме бинарного поиска 7 чисел встают столбиком — дорожки плеера вертикальные; терпимо, но схема высокая.
- Сборки прерывались вместе с сессией Claude Code (фоновые Bash-задачи убиваются). Эмулятор и gradle запускать через PowerShell `Start-Process` — они переживают перезапуск.

## Тема «CSS» (13.10.2026)

- Тема `css` после `web`: палитра rebeccapurple (light `#663399` — акцент и шапка, dark `#B48EE8`/шапка `#24153A`), логотип — белое «CSS» на `#663399` (`LetterMark`), префикс id `css`. Теги: `cascade`, `selectors`, `box-model`, `flexbox`, `css-grid`, `positioning`, `css-units`, `responsive`, `animations`, `modern-css` (тег `css` по-прежнему у темы Web, её 8 CSS-вопросов не трогали и не дублировали).
- 44 вопроса RU+EN (`data/css.ts`, `css-2.ts`, `css-3.ts`; 12/22/10 по сложности): специфичность, `:is`/`:where`, наследование и `unset`, `@layer` (в т.ч. перевёрнутый порядок для `!important`), комбинаторы, `:nth-child`, `:has`, `::before` без `content`, outline, строчные элементы, `padding` в %, щель под `img`, `flow-root`, `flex-grow`/`flex-shrink`/`flex: 1`/`min-width: 0`, `fr` и `gap`, `auto-fill`/`auto-fit`, `1 / -1`, `minmax(auto, 1fr)`, содержащий блок для absolute/fixed (`transform`), `isolation`, `em`/`rem`, % высоты, `clamp`, `dvh`, порядок медиазапросов, meta viewport, переменные и invalid at computed-value time, `@container`, нативная вложенность, `content-visibility`, `height: auto` в transition, `animation-fill-mode`, `@property`. Верные ответы распределены 8/9/9/9/9.
- Новый вид проверки `css-computed`: вопросы рендерятся в headless Chrome (`--dump-dom`, все вопросы одной страницей в iframe-ах), сравнивается `getComputedStyle`/`getBoundingClientRect`. Машинно проверено 35 из 44; негативный тест (подмена ответа) ловится. Все 383 ссылки банка живые.
- Проверено на эмуляторе 360 dp: шторка тем с карточкой CSS, главная и вопрос в dark и light, верный и неверный ответ.

## Общая шапка вкладок (13.10.2026)

- Шапка react-navigation у вкладок отключена (`headerShown: false`), вместо неё виджет `widgets/app-header` над `Tabs`: бургер, «Sobes» (`common.appName`) и справа логотип текущей темы в рамке цвета `headerText` (без рамки логотип сливается с шапкой того же цвета). Одинакова на всех вкладках, названия разделов в шапке больше нет. Высота 64 dp + отступ статус-бара, как у прежней шапки.
- Справа в шапке вместо логотипа в рамке — чип текущей темы (`TopicChip` из `entities/topic`: логотип + короткое название, вид выбранного чипа), обёрнутый в `features/select-topic/TopicMenuChip`: тап открывает ту же шторку. Ряд чипов `TopicSwitcher` под шапкой убран с «Тренировки», «Ошибок» и «Статистики», компонент удалён — тема выбирается только через шапку.
- Шторка тем (`TopicMenuSheet`) теперь оборачивает `Tabs` целиком и выезжает на весь экран под шапкой, перекрывая таб-бар; затемнение и закрытие тапом по фону убраны — закрывают крестик, выбор темы и «Назад».
- Проверено на эмуляторе 360 dp: light (Algo, CSS, Статистика) и dark (Настройки, шторка), «Все темы» в шапке, «Назад» закрывает шторку, переход в тренировку и обратно. На эмуляторе после проверки возвращён `dist/sobes-emulator.apk` — в нём шапки ещё нет.

## Этап 0 roadmap — подготовка к RuStore (14.10.2026)

- **Подпись (R0-1).** Ключ `C:\Users\basileus\.sobes-keys\sobes-release.jks` (PKCS12, alias `sobes`, RSA 2048, 10 000 дней, `CN=Sobes, C=RU`, SHA-256 `88:91:69:A8:…:32:5A`), пароль случайный — в `~/.gradle/gradle.properties` (`SOBES_RELEASE_*`), копия свойств — `gradle.properties.backup` рядом с ключом. Плагин `plugins/with-release-signing.js` добавляет `signingConfigs.release` и выбирает его, если свойство задано; иначе debug + предупреждение в `build:apk`. Подпись проверена `apksigner verify --print-certs`.
- **Сплэш (R0-2).** `expo-splash-screen` ~31.0.13: знак-лицо (`adaptive-icon.png`, 200 dp) на `#FFFFFF` / `#121214` (ночь). В `app/_layout.tsx` сплэш держится до загрузки настроек, темы и прогресса, гаснет за 250 мс. Конфиг Expo не импортирует TS из `src` — цвета в `app.config.ts` продублированы (правило в CLAUDE.md). Кадр сплэша скриншотом не поймать — его перекрывает анимация запуска лаунчера; ресурсы (`splashscreen_logo`, `values(-night)/colors.xml`) проверены в `android/`.
- **Акцент brand (R0-3)** — лайм + графит: шапка `#121417` / лайм `#C8F31D`, кнопки и сегменты лаймовые с графитовым текстом, `accentText` светлой схемы — олива `#4D6200`. Контраст проходит `verify-content`. На эмуляторе: «Все темы» light, настройки dark, онбординг.
- **Статус-бар на онбординге** был белым на белом (у brand теперь светлые иконки под тёмную шапку) — до онбординга иконки статус-бара берутся по схеме, а не из `headerBarStyle`.
- **Политика (R0-5).** `site/privacy/index.html` (RU+EN, light/dark, 360 px без горизонтального скролла — проверено в Playwright), деплой — `.github/workflows/pages.yml` (только `site/`), ссылка «Политика конфиденциальности» в настройках → `https://stazzz544.github.io/sobes/privacy/`. Pages ещё не включены, страница пока 404.
- **Deep link (R0-6).** Холодный старт `sobes://question/js-closures-001` в release-сборке открывает вопрос; «Назад» раньше закрывал приложение — добавлен `unstable_settings.initialRouteName = '(tabs)'`. Прежний пустой экран наблюдался на debug-сборке с Metro; в debug повторно не воспроизводили.
- **Версия (R0-8).** `version` из `package.json`, `versionCode` = major·10000 + minor·100 + patch (1.0.0 → 10000), `build:apk` всегда делает `expo prebuild`. `CHANGELOG.md` — текст «Что нового» для магазина.
- `android.blockedPermissions`: убраны READ/WRITE_EXTERNAL_STORAGE и SYSTEM_ALERT_WINDOW (шаблон Expo добавлял их в release-манифест). Остались INTERNET и VIBRATE.
- Тексты карточки RuStore — `docs/store/rustore.md`.
- Гоча: release-ключ ≠ debug-ключ старых APK — поверх старой сборки не ставится, сначала удалить приложение (прогресс на устройстве пропадёт).

## R1-1 — аналитика AppMetrica (14.10.2026)

- Пакет `@appmetrica/react-native-analytics` 4.2.0 (TurboModule, нативный SDK 8.4.1), config-плагин не нужен — хватает автолинковки.
- `src/shared/analytics`: каталог событий `events.ts` (типизированный union), `activateAnalyticsFx` (после загрузки настроек, см. R1-2/R1-5 ниже), `trackEventFx`. Отправка — только release-сборка с ключом `EXPO_PUBLIC_APPMETRICA_API_KEY` (`.env.local`); в debug — `console.log('[analytics] …')`. При активации выключены `locationTracking` и `advIdentifiersTracking`; разрешение `AD_ID`, которое добавляет SDK, вырезано через `blockedPermissions`.
- Точки событий: `onboarding_completed` — новая модель `widgets/onboarding/model`; `topic_selected` (с `previous`) — `features/select-topic`; `quiz_started` / `question_answered` / `quiz_finished` / `quiz_abandoned` — `quiz-session-model` (`buildSummary` вынесен из `$summary`, им же считается `quiz_finished`); `mistake_resolved` — `progress-model`; `ask_ai_used` (`target` = провайдер / `share` / `copy`) и `question_reported` — в обработчиках кнопок.
- `chosen` в `question_answered` — канонический id варианта (`a`–`e`), не позиция на экране: варианты перемешиваются, а для R1-4 нужен «любимый» дистрактор.
- `quiz_abandoned` — выход из тренировки в фазе `answering`/`revealed`; уход с итогового экрана его не шлёт. Выход на последнем вопросе до «Далее» даёт `answered = length`.
- Проверено на эмуляторе release-сборкой с фиктивным ключом и `EXPO_PUBLIC_APPMETRICA_LOGS=1` (logcat, тег `AppMetrica`): SDK активируется, `location_enabled=false`, `adv_identifiers_tracking=false`; все 9 событий приходят с верными параметрами (смена темы JS→TS→JS, практика до итога, собеседование до итога с `level`, выход из собеседования, «Скопировать» в «Спросить ИИ», жалоба, онбординг после `pm clear`, закрепление ошибки в «Работе над ошибками»). Прогресс на эмуляторе сброшен (`pm clear`).
- Гоча Effector: `sample` с `source` читает стор в момент своего запуска — объявленный **до** сэмпла, меняющего этот стор от того же `clock`, видит старое значение, объявленный после — уже новое (проверено скриптом). На этом держится `previous` в `topic_selected`.
- `build:apk` предупреждает, если ключа аналитики нет.
- Осталось: ключ от пользователя → сборка → события в консоли AppMetrica.

## R1-2 и R1-5 — сбои, отказ от статистики, политика (14.10.2026)

- **Как JS-ошибки доходят до AppMetrica** (разобрано по исходникам RN 0.81 и проверено на эмуляторе): ошибка в обработчике/таймере → `ErrorUtils` → `ExceptionsManager` → нативный `JavascriptException` → краш, его ловит нативный обработчик AppMetrica (`crashReporting` по умолчанию), при следующем запуске уходит `EVENT_TYPE_PREV_SESSION_EXCEPTION_UNHANDLED_FROM_FILE` («Crash: com.facebook.react.common.JavascriptException», текст и JS-стек — в сообщении). Ошибка рендера идёт `onUncaughtError` → `ExceptionsManager.handleException(error, true)` напрямую, мимо `ErrorUtils.setGlobalHandler`, поэтому свой глобальный обработчик не ставили (ловил бы не всё и дублировал краши).
- **ErrorBoundary** в `app/_layout.tsx` (expo-router оборачивает им сам `RootLayout`): виджет `widgets/error-fallback` — иконка, «Что-то пошло не так», «Прогресс сохранён — попробуйте ещё раз», кнопка «Попробовать снова» (`retry` возвращает на главную); свои `SafeAreaProvider` и `ThemeProvider` (акцент brand), потому что провайдеры приложения внутри упавшего дерева. Отчёт — `reportErrorFx` → `reportErrorWithoutIdentifier` (группировка по стеку), в логах «Error from plugin received». Проверено временными триггерами (ошибка рендера при открытии «Спросить ИИ», `throw` в `setTimeout` при жалобе) — триггеры удалены; экран проверен в light и dark на 360 dp.
- **Отказ от статистики**: настройка `analytics` (по умолчанию `true`), переключатель в «О приложении». SDK активируется после загрузки настроек с `statisticsSending`, смена — `setDataSendingEnabled`; события и ошибки при выключенной настройке не репортятся. Проверено: выкл → «Updated data sending enabled: false», смена темы не даёт события, после перезапуска `data_sending_enabled:false`; вкл → события снова идут.
- Переключатели настроек вынесены в `SwitchRow`; у выключенного ползунок теперь `textMuted` — в тёмной теме выключенный переключатель был почти не виден (это касалось и «Вибрации»).
- **Политика** (`site/privacy/`, RU+EN): раздел «Анонимная статистика и отчёты о сбоях» — какие события и технические данные, AppMetrica (Яндекс), шифрование при передаче, как отключить; «Персональные данные» и «Сеть» уточнены, дата редакции. Проверено в Playwright: 360 px, dark, без горизонтального скролла. Состав сборов AppMetrica — по их странице Google Data safety (краши, диагностика, ID устройства, тех. данные; геолокация выключена по умолчанию). Ответы для анкеты данных — `docs/store/rustore.md`.

Дальше — `docs/roadmap.md`.
