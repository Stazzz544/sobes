# Как помочь Sobes

Sobes — тренажёр для подготовки к собеседованию фронтенд-разработчика. Главное в нём — качество вопросов, поэтому самая ценная помощь — находить в них ошибки и предлагать новые.

## Нашли ошибку в вопросе

Создайте issue по шаблону [«Ошибка в вопросе»](https://github.com/Stazzz544/sobes/issues/new?template=question-error.yml). Нужен ID вопроса — он есть в тексте, который формирует кнопка «Сообщить об ошибке» под разбором. Ссылка на первоисточник, подтверждающий правку, сильно ускоряет исправление.

## Хотите предложить вопрос

- Без кода — issue по шаблону [«Новый вопрос»](https://github.com/Stazzz544/sobes/issues/new?template=new-question.yml).
- С кодом — pull request с вопросом в банке.

Правила составления вопросов — [docs/content-guidelines.md](docs/content-guidelines.md): один верный ответ, правдоподобные дистракторы, RU и EN, первоисточники, машинная проверка там, где её можно сделать.

## Pull request с вопросами

1. Node 25 и `npm ci`.
2. Вопросы лежат в `src/entities/question/data/<тема>[-N].ts`, теги — в `src/entities/question/config/tags.ts`. ID — `<префикс>-<тема>-NNN` (например, `js-closures-001`), после публикации не меняется: на нём хранится прогресс пользователей.
3. `npm run verify:content` — проверка типов и банка: запуск кода из вопросов, сверка типов TypeScript, CSS в headless Chrome, контраст, схемы. Перед PR — ещё `npm run verify:content -- --links` (живость ссылок).
4. Та же проверка автоматически запускается для каждого PR.

## Код приложения

Expo + React Native, Effector, Feature-Sliced Design. Правила проекта — в [CLAUDE.md](CLAUDE.md), план развития — [docs/roadmap.md](docs/roadmap.md). Крупные изменения лучше сначала обсудить в issue.
