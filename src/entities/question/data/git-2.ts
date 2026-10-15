import type { Question } from '../model/types';

const BOOK = 'https://git-scm.com/book/en/v2';
const DOCS = 'https://git-scm.com/docs';

const OUTPUT_PROMPT = { ru: 'Что выведет последняя команда? Впишите ответ.', en: 'What does the last command print? Type the answer.' };

export const GIT_QUESTIONS_2: Question[] = [
  {
    id: 'git-basics-005',
    kind: 'output',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo secret > .env
git add .env
git commit -q -m "add env"
echo .env > .gitignore
git add .gitignore
git commit -q -m "ignore env"
echo changed > .env
git status --porcelain`,
    },
    answers: ['M .env'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`.gitignore` действует только на **неотслеживаемые** файлы. `.env` уже в репозитории, поэтому Git продолжает следить за ним и показывает изменение. Чтобы перестать отслеживать файл, оставив его на диске, нужен `git rm --cached .env` и коммит — а утёкший секрет после этого всё равно надо сменить: он остался в истории.',
          en: '`.gitignore` only affects **untracked** files. `.env` is already in the repository, so Git keeps tracking it and shows the change. To stop tracking the file while keeping it on disk, run `git rm --cached .env` and commit — and rotate the leaked secret anyway: it stays in history.',
        },
      },
    ],
    sources: [
      { title: 'gitignore', url: `${DOCS}/gitignore` },
      { title: 'git-rm', url: `${DOCS}/git-rm` },
    ],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-undo-005',
    kind: 'output',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo a > a.txt
git add a.txt
git commit -q -m "a"
echo draft > notes.txt
echo b >> a.txt
git stash -q
git status --porcelain`,
    },
    answers: ['?? notes.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git stash` по умолчанию прячет только изменения **отслеживаемых** файлов: правка `a.txt` ушла в stash, а новый `notes.txt` остался в рабочей папке. Чтобы спрятать и неотслеживаемые файлы, используют `git stash -u` (`--include-untracked`).',
          en: '`git stash` by default stashes only changes to **tracked** files: the edit to `a.txt` went into the stash, while the new `notes.txt` stayed in the working tree. To stash untracked files too, use `git stash -u` (`--include-untracked`).',
        },
      },
    ],
    sources: [{ title: 'git-stash', url: `${DOCS}/git-stash` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-branches-005',
    kind: 'output',
    topic: 'git',
    tags: ['git-branches'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "base"
git switch -q -c feature
echo f > f.txt
git add f.txt
git commit -q -m "feature"
git switch -q main
git merge -q --squash feature > /dev/null
git commit -q -m "squashed feature"
git branch --merged`,
    },
    answers: ['* main'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`merge --squash` переносит **изменения** ветки одним новым коммитом, но не записывает её как родителя. Для Git ветка `feature` так и осталась неслитой, поэтому её нет в `--merged`, и `git branch -d feature` откажется её удалять. Так работает кнопка «Squash and merge» на GitHub — после неё ветку удаляют через `-D`.',
          en: '`merge --squash` brings the branch’s **changes** in as one new commit but doesn’t record it as a parent. To Git, `feature` is still unmerged, so it’s missing from `--merged`, and `git branch -d feature` refuses to delete it. That’s how GitHub’s “Squash and merge” works — the branch is then deleted with `-D`.',
        },
      },
    ],
    sources: [{ title: 'git-merge: --squash', url: `${DOCS}/git-merge` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-branches-006',
    kind: 'output',
    topic: 'git',
    tags: ['git-branches'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "base"
git switch -q -c feature
git commit -q --allow-empty -m "f1"
git commit -q --allow-empty -m "f2"
git switch -q main
git commit -q --allow-empty -m "m1"
git log --format=%s main..feature`,
    },
    answers: ['f2 f1', 'f2, f1'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`A..B` — коммиты, достижимые из `B`, но не из `A`: то, что есть в `feature` и чего нет в `main`. `base` общий, `m1` только в `main`, поэтому остаются `f2` и `f1` — новые сверху. `git log feature..main` покажет обратное — `m1`, а `A...B` (три точки) — коммиты, которые есть только в одной из веток.',
          en: '`A..B` means commits reachable from `B` but not from `A`: what’s in `feature` and not in `main`. `base` is shared, `m1` is only in `main`, so `f2` and `f1` remain — newest first. `git log feature..main` shows the reverse — `m1`, and `A...B` (three dots) shows commits in exactly one of the branches.',
        },
      },
    ],
    sources: [
      { title: 'Pro Git — Revision Selection', url: `${BOOK}/Git-Tools-Revision-Selection` },
      { title: 'gitrevisions', url: `${DOCS}/gitrevisions` },
    ],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-undo-006',
    kind: 'output',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo a > a.txt
git add a.txt
git commit -q -m "add a"
echo b > b.txt
git add b.txt
git commit -q --amend -m "add a and b"
git log --oneline | wc -l`,
    },
    answers: ['1'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`--amend` не добавляет новый коммит поверх, а **заменяет** последний новым — с другим хешем, обновлённым сообщением и добавленным `b.txt`. Старый коммит остаётся только в `reflog`. Поэтому amend уже отправленного коммита требует `push --force-with-lease` и ломает историю тем, кто его забрал.',
          en: '`--amend` doesn’t add a new commit on top but **replaces** the last one with a new one — a different hash, the updated message and the added `b.txt`. The old commit remains only in the `reflog`. That’s why amending an already pushed commit needs `push --force-with-lease` and breaks history for anyone who pulled it.',
        },
      },
    ],
    sources: [{ title: 'git-commit: --amend', url: `${DOCS}/git-commit` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-undo-007',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Тесты сломались где-то среди последних 1000 коммитов. Примерно за сколько проверок `git bisect` найдёт виновника?',
      en: 'Tests broke somewhere in the last 1000 commits. About how many checks does `git bisect` need to find the culprit?',
    },
    options: [
      { text: { ru: '1000', en: '1000' } },
      { text: { ru: '500', en: '500' } },
      { text: { ru: '100', en: '100' } },
      { text: { ru: 'Около 10', en: 'About 10' } },
      { text: { ru: '2', en: '2' } },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git bisect` — двоичный поиск по истории: отмечаете хороший и плохой коммит, Git выдаёт середину, вы говорите `good` или `bad` — и диапазон каждый раз делится пополам. 1000 → 500 → 250 → … — около log₂(1000) ≈ 10 шагов. А `git bisect run npm test` проходит их сам: код выхода скрипта решает, хороший коммит или нет.',
          en: '`git bisect` is a binary search over history: mark a good and a bad commit, Git checks out the middle, you answer `good` or `bad` — and the range halves each time. 1000 → 500 → 250 → … — about log₂(1000) ≈ 10 steps. And `git bisect run npm test` walks them itself: the script’s exit code decides whether a commit is good.',
        },
      },
    ],
    sources: [{ title: 'git-bisect', url: `${DOCS}/git-bisect` }],
  },
];
