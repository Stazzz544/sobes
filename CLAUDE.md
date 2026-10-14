# Sobes — правила проекта

Android-тренажёр для подготовки к собеседованию фронтенд-разработчика. Expo SDK 54 (CNG/prebuild, `android/` генерируется и в git не идёт), RN 0.81 New Arch + Hermes, expo-router 6, Effector 23, AsyncStorage, Reanimated 4, react-native-svg. Состояние работы по фазам — `docs/progress.md`; план развития и что делать дальше — `docs/roadmap.md`.

## Общее

- Общение — строго на русском.
- Комментарии — по минимуму: только неочевидное «почему», одна строка.
- Unit-тесты не пишем.
- Перед сдачей — `npm run type-check`; при правке вопросов — `npm run verify:content`.
- Новые пакеты — только с разрешения пользователя. Версии нативных — через `npx expo install`.
- Коммиты — только по просьбе пользователя.

## Архитектура (FSD)

`shared → entities → features → widgets → app/` (экраны expo-router вместо слоя pages).

- Нижний слой не импортирует верхний; импорт внутри одного слоя запрещён — композиция через пропсы.
- Импорты только через `@app/...` и публичный `index.ts` слайса.
- Экраны в `app/` тонкие: собирают виджеты, default export только у них.

## Effector

- Связи — только `sample`. Без `.on()` / `.reset()` / `setState`.
- Сторы — в моделях, не в компонентах. Синглтон-модель экспортируется объектом (`export const topicModel = { $currentTopic, topicSelected }`), переиспользуемая — фабрикой `createXxxModel()`.
- Персист: `loadFx` на событии `xxxLoaded`, сохранение через `sample` в `saveFx`.
- Ключ `kind` в shape `useUnit` не использовать — Effector принимает объект за юнит.

## Компоненты

- Named export, явный `: JSX.Element`, `type` для пропсов над компонентом.
- Стили — `StyleSheet.create`, цвета — только из `useTheme().colors`. Hex допустим только в `src/shared/theme/colors.ts`, в SVG-логотипах и в `app.config.ts` (фон иконки и сплэша: конфиг Expo не импортирует TS из `src`, значения синхронизировать с `bgPrimary` вручную).
- Фигурные скобки всегда; без `switch`; без вложенных тернарников; без сокращений имён.
- Цели касания ≥ 48 dp, `accessibilityRole`/`accessibilityLabel` у интерактивных элементов, состояние не только цветом.
- Сначала смотри `@app/shared/ui` (`AppText`, `Button`, `Card`, `ProgressBar`, `SegmentedControl`, `Screen`, `EmptyState`).

## Темы и цвета

Палитра = базовые токены светлой/тёмной схемы + акцент выбранной темы (`brand` / `javascript` / `typescript` / `react` / `web`), см. `src/shared/theme/colors.ts`. Любой UI проверяется в light и dark и во всех акцентах. Контраст текста ≥ 4.5:1; жёлтый JS не используем как цвет текста на светлом фоне (`accentText` для этого).

## Тексты

- UI-строки — `useI18n().t('key')`, словари `src/shared/i18n/locales/ru.ts` и `en.ts` (`en: Dictionary` — компилятор ловит пропущенные ключи). Хардкод строк в компонентах запрещён.
- Склонение — `plural('question', n)`.
- Контент вопросов — `LocalizedText` (`{ ru, en }`), оба языка обязательны.

## Релиз

- Версия — только в `package.json` (`npm version patch|minor --no-git-tag-version`); `versionCode` = major·10000 + minor·100 + patch считает `app.config.ts`. RuStore принимает только растущий `versionCode` — каждая загрузка = новая версия. Перед выпуском — секция в `CHANGELOG.md` (это текст «Что нового» для магазина).
- Подпись — плагин `plugins/with-release-signing.js`: ключ `C:\Users\basileus\.sobes-keys\sobes-release.jks`, свойства `SOBES_RELEASE_*` в `~/.gradle/gradle.properties`. Без них сборка подписывается debug-ключом с предупреждением — такой APK в RuStore не загружать. Ключи и пароли в git не попадают.
- Release-подпись ≠ debug: поверх сборки с другим ключом APK не встанет (`INSTALL_FAILED_UPDATE_INCOMPATIBLE`) — сначала удалить приложение (прогресс на устройстве пропадёт).
- `npm run build:apk` каждый раз делает `expo prebuild` (без `--clean`) — правки `app.config.ts` попадают в сборку сами.

## Аналитика

- AppMetrica, ключ — `EXPO_PUBLIC_APPMETRICA_API_KEY` в `.env.local` (в git не идёт, `build:apk` предупреждает, если его нет). Отправляет только release-сборка с ключом; в debug события пишутся в лог Metro (`[analytics] …`). `EXPO_PUBLIC_APPMETRICA_LOGS=1` включает логи SDK в logcat.
- SDK активируется после загрузки настроек (`activateAnalyticsFx` в `settings-model`) с учётом переключателя «Анонимная статистика»; при выключенном `trackEventFx` / `reportErrorFx` ничего не делают.
- Событие — только из каталога `src/shared/analytics/events.ts`, через `trackEventFx` (в модели — `target` у `sample`). Без персональных данных и свободного текста. Новое событие или параметр = правка политики конфиденциальности (`site/privacy/`) до выхода версии.
- Сбои: ошибки рендера ловит `ErrorBoundary` в `app/_layout.tsx` (экран «Что-то пошло не так» + `reportErrorFx`), остальные JS-ошибки роняют приложение и уходят в AppMetrica нативным крашем `JavascriptException`. Свой `ErrorUtils.setGlobalHandler` не ставить: ошибки рендера идут мимо него (`ExceptionsManager.handleException` напрямую), а для прочих он даст дубль краша.

## Эмулятор

- Metro — `npx expo start` без `CI=1` (с ним не следит за файлами).
- Запуск: `adb shell monkey -p com.sobes.app -c android.intent.category.LAUNCHER 1`.
- 360 dp на Pixel_9_Pro_XL: `adb shell wm density 597` + force-stop; вернуть — `adb shell wm density reset`.
- В Git Bash для путей `/sdcard/…` нужен `MSYS_NO_PATHCONV=1`.
- Навигация по UI — `uiautomator dump` + tap по bounds, скриншоты — только для визуала.
- Кириллицу вводить через буфер хоста, `adb shell input text` её не умеет.
- Release APK: `npm run build:apk` → `dist/sobes.apk` (arm64-v8a + armeabi-v7a). На x86_64-эмуляторе ARM-only APK падает (`libreactnative.so` не найден) — для эмулятора `npm run build:apk -- --emulator` → `dist/sobes-emulator.apk` (только x86_64). Gradle при каждой сборке чистит `outputs/apk/release`, поэтому готовые APK лежат в `dist/`.
- Фоновые задачи Bash живут 30 мин по умолчанию — эмулятор и Metro запускать с `timeout: 7200000`, эмулятор — с `-no-snapshot-load`. Если эмулятор сразу закрывается — удалить `~/.android/avd/Pixel_9_Pro_XL.avd/multiinstance.lock`.
- `npx expo run:android` без `JAVA_HOME` падает (код 9009) — задать `JAVA_HOME="C:\Program Files\Android\Android Studio\jbr"`. `INSTALL_FAILED_INSUFFICIENT_STORAGE` на эмуляторе — `adb shell pm trim-caches 99G`.
- Никаких бэктиков внутри `node -e "…"` под bash: они выполняются как команды. Такие правки — только через Edit.
