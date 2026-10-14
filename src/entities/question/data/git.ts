import type { Question } from '../model/types';

const BOOK = 'https://git-scm.com/book/en/v2';
const DOCS = 'https://git-scm.com/docs';

const OUTPUT_PROMPT = { ru: 'Что выведет последняя команда? Впишите ответ.', en: 'What does the last command print? Type the answer.' };
const CHOICE_PROMPT = { ru: 'Что выведет последняя команда?', en: 'What does the last command print?' };

export const GIT_QUESTIONS: Question[] = [
  {
    id: 'git-basics-001',
    kind: 'output',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo a > f.txt
git add f.txt
echo b >> f.txt
git status --short`,
    },
    answers: ['AM f.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Короткий статус — две колонки: индекс и рабочая копия. `A` — файл добавлен в индекс (в версии `a`), `M` — после `git add` он снова изменился в рабочей копии.',
          en: 'The short status has two columns: the index and the working tree. `A` — the file is staged (as version `a`), `M` — it changed again in the working tree after `git add`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`git add` сохраняет снимок содержимого на момент вызова, поэтому коммит сейчас записал бы только `a`. Чтобы добавить `b`, нужен ещё один `git add`.',
          en: '`git add` saves a snapshot of the content at that moment, so a commit now would record only `a`. To include `b`, run `git add` again.',
        },
      },
    ],
    sources: [
      { title: 'git-status — Short Format', url: `${DOCS}/git-status` },
      { title: 'Pro Git — Recording Changes to the Repository', url: `${BOOK}/Git-Basics-Recording-Changes-to-the-Repository` },
    ],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-basics-002',
    kind: 'output',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 1,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo a > tracked.txt
git add tracked.txt
git commit -qm "init"
echo b >> tracked.txt
echo x > new.txt
git commit -qam "update"
git status --short`,
    },
    answers: ['?? new.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git commit -a` сам добавляет изменения **уже отслеживаемых** файлов — правка `tracked.txt` попала в коммит. Новый `new.txt` Git ещё не отслеживает, поэтому он остался неотслеживаемым: `??`.',
          en: '`git commit -a` automatically stages changes to **already tracked** files — the edit to `tracked.txt` went into the commit. Git doesn’t track the new `new.txt` yet, so it stays untracked: `??`.',
        },
      },
    ],
    sources: [{ title: 'Pro Git — Recording Changes to the Repository', url: `${BOOK}/Git-Basics-Recording-Changes-to-the-Repository` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-basics-003',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 2,
    popular: true,
    prompt: CHOICE_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo "debug" > app.log
git add app.log
git commit -qm "init"
echo "*.log" > .gitignore
echo "more" >> app.log
git status --short`,
    },
    options: [{ code: '?? .gitignore' }, { code: ' M app.log\n?? .gitignore' }, { code: ' M app.log' }, { code: 'D  app.log\n?? .gitignore' }, { code: '!! app.log\n?? .gitignore' }],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`.gitignore` действует только на **неотслеживаемые** файлы. `app.log` уже в репозитории, поэтому его изменения по-прежнему видны (`M`), а сам `.gitignore` — новый файл (`??`).',
          en: '`.gitignore` only affects **untracked** files. `app.log` is already in the repository, so its changes are still shown (`M`), while `.gitignore` itself is a new file (`??`).',
        },
      },
      {
        type: 'code',
        code: { lang: 'bash', source: 'git rm --cached app.log' },
        caption: { ru: 'Перестать отслеживать, оставив файл на диске', en: 'Stop tracking while keeping the file on disk' },
      },
    ],
    sources: [
      { title: 'gitignore', url: `${DOCS}/gitignore` },
      { title: 'git-rm — --cached', url: `${DOCS}/git-rm` },
    ],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-basics-004',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что делает `git add файл`?', en: 'What does `git add file` do?' },
    options: [
      { text: { ru: 'Сразу сохраняет файл в историю', en: 'Saves the file to history right away' } },
      { text: { ru: 'Кладёт текущее содержимое файла в индекс — для следующего коммита', en: 'Puts the file’s current content into the index — for the next commit' } },
      { text: { ru: 'Отправляет файл на сервер', en: 'Sends the file to the server' } },
      { text: { ru: 'Начинает отслеживать все будущие изменения файла автоматически', en: 'Starts tracking all future changes to the file automatically' } },
      { text: { ru: 'Создаёт новую ветку с этим файлом', en: 'Creates a new branch with this file' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Индекс (staging area) — черновик следующего коммита. `git add` копирует в него **текущую** версию файла; последующие правки нужно добавить снова. В историю индекс попадает только при `git commit`, на сервер — при `git push`.',
          en: 'The index (staging area) is a draft of the next commit. `git add` copies the **current** version of the file into it; later edits must be added again. The index reaches history only with `git commit`, and the server only with `git push`.',
        },
      },
    ],
    sources: [{ title: 'Pro Git — Recording Changes to the Repository', url: `${BOOK}/Git-Basics-Recording-Changes-to-the-Repository` }],
  },
  {
    id: 'git-branches-001',
    kind: 'output',
    topic: 'git',
    tags: ['git-branches'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Сколько коммитов будет в `main`? Впишите число.',
      en: 'How many commits will `main` have? Type the number.',
    },
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "init"
git switch -q -c feature
git commit -q --allow-empty -m "f1"
git commit -q --allow-empty -m "f2"
git switch -q main
git merge -q feature
git rev-list --count main`,
    },
    answers: ['3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В `main` после ответвления не было своих коммитов, поэтому слияние — **fast-forward**: указатель `main` просто передвигается на `f2`. Коммит слияния не создаётся: `init`, `f1`, `f2` — три коммита.',
          en: '`main` had no commits of its own after the branch point, so the merge is a **fast-forward**: the `main` pointer just moves to `f2`. No merge commit is created: `init`, `f1`, `f2` — three commits.',
        },
      },
    ],
    sources: [{ title: 'Pro Git — Basic Branching and Merging', url: `${BOOK}/Git-Branching-Basic-Branching-and-Merging` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-branches-002',
    kind: 'output',
    topic: 'git',
    tags: ['git-branches'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Сколько коммитов будет в `main`? Впишите число.',
      en: 'How many commits will `main` have? Type the number.',
    },
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "init"
git switch -q -c feature
git commit -q --allow-empty -m "f1"
git commit -q --allow-empty -m "f2"
git switch -q main
git merge -q --no-ff -m "merge feature" feature
git rev-list --count main`,
    },
    answers: ['4'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`--no-ff` запрещает перемотку и всегда создаёт **коммит слияния**: `init`, `f1`, `f2` и `merge feature` — четыре. Так в истории видно, какие коммиты пришли одной фичей.',
          en: '`--no-ff` forbids fast-forwarding and always creates a **merge commit**: `init`, `f1`, `f2` and `merge feature` — four. That way history shows which commits came in as one feature.',
        },
      },
    ],
    sources: [
      { title: 'git-merge — --no-ff', url: `${DOCS}/git-merge` },
      { title: 'Pro Git — Basic Branching and Merging', url: `${BOOK}/Git-Branching-Basic-Branching-and-Merging` },
    ],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-branches-003',
    topic: 'git',
    tags: ['git-branches'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Что такое `HEAD` в Git?', en: 'What is `HEAD` in Git?' },
    options: [
      { text: { ru: 'Самый первый коммит репозитория', en: 'The very first commit of the repository' } },
      { text: { ru: 'Указатель на текущую ветку (или коммит), где вы находитесь', en: 'A pointer to the current branch (or commit) you’re on' } },
      { text: { ru: 'Главная ветка на сервере', en: 'The main branch on the server' } },
      { text: { ru: 'Последний коммит в любой ветке', en: 'The latest commit in any branch' } },
      { text: { ru: 'Файл с настройками репозитория', en: 'The repository settings file' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ветка — указатель на коммит, а `HEAD` — указатель на **текущую ветку**. Новый коммит сдвигает ветку, на которую указывает `HEAD`. Если переключиться прямо на коммит, `HEAD` указывает на него — это состояние «detached HEAD».',
          en: 'A branch is a pointer to a commit, and `HEAD` points to the **current branch**. A new commit moves the branch `HEAD` points to. If you check out a commit directly, `HEAD` points at it — the “detached HEAD” state.',
        },
      },
    ],
    sources: [{ title: 'Pro Git — Branches in a Nutshell', url: `${BOOK}/Git-Branching-Branches-in-a-Nutshell` }],
  },
  {
    id: 'git-branches-004',
    kind: 'order',
    topic: 'git',
    tags: ['git-branches'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Как начать задачу от свежего `main` и отправить её на ревью? Расставьте команды по порядку.',
      en: 'How do you start a task from an up-to-date `main` and send it for review? Put the commands in order.',
    },
    items: [{ code: 'git switch main' }, { code: 'git pull' }, { code: 'git switch -c feature/login' }, { code: 'git commit -am "Add login form"' }, { code: 'git push -u origin feature/login' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сначала обновляют `main`, чтобы ветка началась от актуального кода, — иначе позже придётся разбирать лишние конфликты. Затем создают ветку, коммитят и пушат с `-u`, чтобы связать её с удалённой и дальше писать просто `git push`.',
          en: 'First update `main` so the branch starts from current code — otherwise you’ll deal with extra conflicts later. Then create the branch, commit and push with `-u` to link it with the remote, so later a plain `git push` works.',
        },
      },
    ],
    sources: [
      { title: 'Pro Git — Remote Branches', url: `${BOOK}/Git-Branching-Remote-Branches` },
      { title: 'Pro Git — Basic Branching and Merging', url: `${BOOK}/Git-Branching-Basic-Branching-and-Merging` },
    ],
  },
  {
    id: 'git-rebase-001',
    kind: 'order',
    topic: 'git',
    tags: ['git-rebase'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'В каком порядке `git log --format=%s` выведет сообщения коммитов?',
      en: 'In what order will `git log --format=%s` print the commit messages?',
    },
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "init"
git switch -q -c feature
git commit -q --allow-empty -m "f1"
git switch -q main
git commit -q --allow-empty -m "m2"
git switch -q feature
git rebase -q main
git log --format=%s`,
    },
    items: [{ code: 'f1' }, { code: 'm2' }, { code: 'init' }],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`rebase main` переносит коммиты фичи **поверх** последнего коммита `main`: история становится `init → m2 → f1`. `git log` выводит от новых к старым: `f1`, `m2`, `init`.',
          en: '`rebase main` replays the feature commits **on top of** `main`’s latest commit: history becomes `init → m2 → f1`. `git log` prints newest first: `f1`, `m2`, `init`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Коммит `f1` при этом пересоздаётся с новым хешем — поэтому ребейзят только свои, ещё не опубликованные коммиты.',
          en: 'The `f1` commit is recreated with a new hash — that’s why you only rebase your own unpublished commits.',
        },
      },
    ],
    sources: [{ title: 'Pro Git — Rebasing', url: `${BOOK}/Git-Branching-Rebasing` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-rebase-002',
    kind: 'output',
    topic: 'git',
    tags: ['git-rebase'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "init"
git switch -q -c feature
echo a > a.txt
git add a.txt
git commit -qm "a"
echo b > b.txt
git add b.txt
git commit -qm "b"
git switch -q main
git cherry-pick feature > /dev/null
ls`,
    },
    answers: ['b.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`cherry-pick` копирует **один** коммит. Имя ветки здесь означает её последний коммит — `b`, поэтому в `main` появился только `b.txt`, а `a.txt` остался в `feature`.',
          en: '`cherry-pick` copies **one** commit. A branch name here means its tip — `b`, so only `b.txt` appears in `main`, while `a.txt` stays in `feature`.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Чтобы перенести несколько коммитов, указывают диапазон: `git cherry-pick main..feature`.',
          en: 'To bring several commits, pass a range: `git cherry-pick main..feature`.',
        },
      },
    ],
    sources: [{ title: 'git-cherry-pick', url: `${DOCS}/git-cherry-pick` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-rebase-003',
    topic: 'git',
    tags: ['git-rebase'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Перед пушем в ветке пять коммитов «fix», «fix 2», «опечатка»… Как объединить их в один аккуратный коммит?',
      en: 'Before pushing, your branch has five commits: “fix”, “fix 2”, “typo”… How do you combine them into one clean commit?',
    },
    options: [
      { text: { ru: '`git rebase -i` и пометить лишние коммиты как `squash`', en: '`git rebase -i` and mark the extra commits as `squash`' } },
      { text: { ru: '`git revert` для каждого коммита', en: '`git revert` each commit' } },
      { text: { ru: '`git cherry-pick` всех коммитов в `main`', en: '`git cherry-pick` all commits into `main`' } },
      { text: { ru: 'Удалить папку `.git` и создать репозиторий заново', en: 'Delete the `.git` folder and create the repository again' } },
      { text: { ru: '`git fetch --squash`', en: '`git fetch --squash`' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Интерактивный rebase (`git rebase -i HEAD~5`) открывает список коммитов, где можно объединить их (`squash`/`fixup`), переставить или переписать сообщения. Делают это со **своими** коммитами до публикации — история меняется.',
          en: 'Interactive rebase (`git rebase -i HEAD~5`) opens a list of commits where you can combine them (`squash`/`fixup`), reorder or reword them. Do it with **your own** commits before publishing — history changes.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`revert` добавит ещё пять отменяющих коммитов, `cherry-pick` их просто скопирует, а `fetch --squash` не существует.',
          en: '`revert` would add five more undoing commits, `cherry-pick` would just copy them, and `fetch --squash` doesn’t exist.',
        },
      },
    ],
    sources: [{ title: 'Pro Git — Rewriting History', url: `${BOOK}/Git-Tools-Rewriting-History` }],
  },
  {
    id: 'git-undo-001',
    kind: 'output',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo 1 > one.txt
git add one.txt
git commit -qm "one"
echo 2 > two.txt
git add two.txt
git commit -qm "two"
git reset --soft HEAD~1
git status --short`,
    },
    answers: ['A two.txt', 'A  two.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`reset --soft` двигает ветку на коммит назад, но **оставляет изменения в индексе**: коммита «two» больше нет, а `two.txt` подготовлен к коммиту — `A`. Удобно, чтобы переписать последний коммит.',
          en: '`reset --soft` moves the branch back one commit but **keeps the changes staged**: the “two” commit is gone, and `two.txt` is staged — `A`. Handy for redoing the last commit.',
        },
      },
    ],
    sources: [
      { title: 'Pro Git — Reset Demystified', url: `${BOOK}/Git-Tools-Reset-Demystified` },
      { title: 'git-reset', url: `${DOCS}/git-reset` },
    ],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-undo-002',
    kind: 'output',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo 1 > one.txt
git add one.txt
git commit -qm "one"
echo 2 > two.txt
git add two.txt
git commit -qm "two"
git reset -q --hard HEAD~1
ls`,
    },
    answers: ['one.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`reset --hard` сдвигает ветку назад **и** приводит индекс и рабочую копию к этому коммиту: `two.txt` удалён с диска. Это самый опасный вариант `reset` — несохранённые правки пропадают.',
          en: '`reset --hard` moves the branch back **and** makes the index and working tree match that commit: `two.txt` is removed from disk. It’s the most dangerous `reset` — uncommitted edits are lost.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Сам коммит «two» не исчез сразу: его хеш можно найти в `git reflog` и вернуться к нему.',
          en: 'The “two” commit isn’t gone immediately: you can find its hash in `git reflog` and go back to it.',
        },
      },
    ],
    sources: [{ title: 'Pro Git — Reset Demystified', url: `${BOOK}/Git-Tools-Reset-Demystified` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-undo-003',
    kind: 'output',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 1,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo "v1" > app.js
git add app.js
git commit -qm "init"
echo "v2" > app.js
git restore app.js
cat app.js`,
    },
    answers: ['v1'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git restore файл` возвращает файл к версии из индекса — здесь это закоммиченная `v1`. Правка `v2` не была сохранена ни в индексе, ни в коммите, поэтому её не вернуть.',
          en: '`git restore file` brings the file back to the indexed version — here the committed `v1`. The `v2` edit wasn’t saved in the index or a commit, so it can’t be recovered.',
        },
      },
    ],
    sources: [
      { title: 'git-restore', url: `${DOCS}/git-restore` },
      { title: 'Pro Git — Undoing Things', url: `${BOOK}/Git-Basics-Undoing-Things` },
    ],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-undo-004',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Вы сделали `git reset --hard HEAD~3` и поняли, что эти три коммита были нужны. Как их вернуть?',
      en: 'You ran `git reset --hard HEAD~3` and realized those three commits were needed. How do you get them back?',
    },
    options: [
      { text: { ru: 'Никак — `--hard` удаляет коммиты навсегда', en: 'You can’t — `--hard` deletes commits forever' } },
      { text: { ru: '`git revert HEAD~3`', en: '`git revert HEAD~3`' } },
      {
        text: {
          ru: 'Найти хеш в `git reflog` и сделать `git reset --hard <хеш>`',
          en: 'Find the hash in `git reflog` and run `git reset --hard <hash>`',
        },
      },
      { text: { ru: '`git restore .`', en: '`git restore .`' } },
      { text: { ru: '`git pull --force`', en: '`git pull --force`' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`reflog` — журнал перемещений `HEAD` в локальном репозитории. В нём есть запись, где `HEAD` указывал на последний «потерянный» коммит; ветку возвращают на этот хеш. Коммиты без ссылок живут, пока их не удалит сборка мусора (по умолчанию — недели).',
          en: '`reflog` is the log of `HEAD` movements in your local repository. It has an entry where `HEAD` pointed to the last “lost” commit; move the branch back to that hash. Unreferenced commits survive until garbage collection removes them (weeks by default).',
        },
      },
    ],
    sources: [
      { title: 'git-reflog', url: `${DOCS}/git-reflog` },
      { title: 'Pro Git — Maintenance and Data Recovery', url: `${BOOK}/Git-Internals-Maintenance-and-Data-Recovery` },
    ],
  },
  {
    id: 'git-remote-001',
    kind: 'output',
    topic: 'git',
    tags: ['git-remote'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q --bare ../origin.git
git clone -q ../origin.git app
cd app
git commit -q --allow-empty -m "init"
git push -q -u origin main
git commit -q --allow-empty -m "local"
git status -sb`,
    },
    answers: ['## main...origin/main [ahead 1]'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`-sb` — короткий статус с информацией о ветке. Локальная `main` на один коммит впереди `origin/main` — копии состояния сервера на момент последнего обмена: коммит «local» ещё не отправлен.',
          en: '`-sb` is the short status with branch info. Local `main` is one commit ahead of `origin/main` — the copy of the server state from the last exchange: the “local” commit hasn’t been pushed yet.',
        },
      },
    ],
    sources: [
      { title: 'Pro Git — Remote Branches', url: `${BOOK}/Git-Branching-Remote-Branches` },
      { title: 'git-status', url: `${DOCS}/git-status` },
    ],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-remote-002',
    kind: 'output',
    topic: 'git',
    tags: ['git-remote'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q --bare ../origin.git
git clone -q ../origin.git me
git clone -q ../origin.git colleague
cd me
git commit -q --allow-empty -m "init"
git push -q -u origin main
cd ../colleague
git pull -q origin main
git commit -q --allow-empty -m "feature"
git push -q origin main
cd ../me
git fetch -q
git status -sb`,
    },
    answers: ['## main...origin/main [behind 1]'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Коллега отправил коммит. `git fetch` скачал его и сдвинул `origin/main`, но вашу `main` не тронул — поэтому статус «позади на 1». Чтобы забрать изменения в свою ветку, нужен `git pull` (или `merge`/`rebase` после `fetch`).',
          en: 'A colleague pushed a commit. `git fetch` downloaded it and moved `origin/main` but didn’t touch your `main` — hence “behind 1”. To bring the changes into your branch you need `git pull` (or `merge`/`rebase` after `fetch`).',
        },
      },
    ],
    sources: [
      { title: 'git-fetch', url: `${DOCS}/git-fetch` },
      { title: 'Pro Git — Remote Branches', url: `${BOOK}/Git-Branching-Remote-Branches` },
    ],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-remote-003',
    topic: 'git',
    tags: ['git-remote'],
    difficulty: 1,
    popular: true,
    prompt: { ru: 'Чем `git fetch` отличается от `git pull`?', en: 'How does `git fetch` differ from `git pull`?' },
    options: [
      { text: { ru: 'Ничем, это синонимы', en: 'They’re the same thing' } },
      {
        text: {
          ru: '`fetch` только скачивает изменения в `origin/*`, `pull` ещё и вливает их в текущую ветку',
          en: '`fetch` only downloads changes into `origin/*`; `pull` also merges them into the current branch',
        },
      },
      { text: { ru: '`fetch` отправляет коммиты на сервер, `pull` — забирает', en: '`fetch` sends commits to the server, `pull` brings them in' } },
      { text: { ru: '`pull` работает только с одной веткой, `fetch` — только со всеми', en: '`pull` works with one branch only, `fetch` only with all' } },
      { text: { ru: '`fetch` перезаписывает локальные изменения', en: '`fetch` overwrites local changes' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git fetch` безопасен: обновляет удалённые ветки (`origin/main`) и не трогает ваши. `git pull` = `fetch` + `merge` (или `rebase` с `--rebase`) в текущую ветку — может создать коммит слияния или конфликт.',
          en: '`git fetch` is safe: it updates remote-tracking branches (`origin/main`) and leaves yours alone. `git pull` = `fetch` + `merge` (or `rebase` with `--rebase`) into the current branch — it can create a merge commit or a conflict.',
        },
      },
    ],
    sources: [
      { title: 'git-pull', url: `${DOCS}/git-pull` },
      { title: 'Pro Git — Remote Branches', url: `${BOOK}/Git-Branching-Remote-Branches` },
    ],
  },
  {
    id: 'git-remote-004',
    topic: 'git',
    tags: ['git-remote'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'После rebase своей ветки обычный `git push` отклонён. Как безопаснее всего отправить ветку?',
      en: 'After rebasing your branch, a plain `git push` is rejected. What’s the safest way to push it?',
    },
    options: [
      { text: { ru: '`git push --force`', en: '`git push --force`' } },
      { text: { ru: '`git push --force-with-lease`', en: '`git push --force-with-lease`' } },
      { text: { ru: 'Удалить ветку на сервере вручную и запушить заново', en: 'Delete the branch on the server manually and push again' } },
      { text: { ru: '`git pull` и затем `git push`', en: '`git pull` and then `git push`' } },
      { text: { ru: '`git push --no-verify`', en: '`git push --no-verify`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Rebase переписал коммиты, поэтому нужна принудительная отправка. `--force-with-lease` перезапишет ветку, только если на сервере она в том состоянии, которое вы последний раз видели, — чужие свежие коммиты не потеряются. `--force` перезапишет всё.',
          en: 'Rebase rewrote the commits, so a forced push is needed. `--force-with-lease` overwrites the branch only if it’s in the state you last saw on the server — others’ fresh commits won’t be lost. `--force` overwrites everything.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`pull` после rebase вольёт старые копии коммитов обратно и задвоит историю, а `--no-verify` лишь пропускает git-хуки.',
          en: '`pull` after a rebase would merge the old copies of the commits back and duplicate history, while `--no-verify` only skips git hooks.',
        },
      },
    ],
    sources: [{ title: 'git-push — --force-with-lease', url: `${DOCS}/git-push` }],
  },
  {
    id: 'git-conflicts-001',
    kind: 'output',
    topic: 'git',
    tags: ['git-conflicts'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo "color: red" > theme.css
git add theme.css
git commit -qm "init"
git switch -q -c feature
echo "color: blue" > theme.css
git commit -qam "blue"
git switch -q main
echo "color: green" > theme.css
git commit -qam "green"
git merge feature > /dev/null || true
git status --short`,
    },
    answers: ['UU theme.css'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обе ветки изменили одну строку, поэтому слияние остановилось на конфликте. `UU` — «unmerged, both modified»: файл изменён обеими сторонами и ждёт ручного разрешения.',
          en: 'Both branches changed the same line, so the merge stopped with a conflict. `UU` means “unmerged, both modified”: the file was changed by both sides and awaits manual resolution.',
        },
      },
    ],
    sources: [
      { title: 'git-status — Short Format', url: `${DOCS}/git-status` },
      { title: 'Pro Git — Basic Branching and Merging', url: `${BOOK}/Git-Branching-Basic-Branching-and-Merging` },
    ],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-conflicts-002',
    topic: 'git',
    tags: ['git-conflicts'],
    difficulty: 2,
    popular: true,
    prompt: { ru: 'Что окажется в `theme.css` после команд?', en: 'What will `theme.css` contain after these commands?' },
    code: {
      lang: 'bash',
      source: `git init -q
echo "color: red" > theme.css
git add theme.css
git commit -qm "init"
git switch -q -c feature
echo "color: blue" > theme.css
git commit -qam "blue"
git switch -q main
echo "color: green" > theme.css
git commit -qam "green"
git merge feature > /dev/null || true
cat theme.css`,
    },
    options: [
      { code: '<<<<<<< HEAD\ncolor: green\n=======\ncolor: blue\n>>>>>>> feature' },
      { code: '<<<<<<< HEAD\ncolor: blue\n=======\ncolor: green\n>>>>>>> feature' },
      { code: 'color: blue' },
      { code: 'color: green' },
      { code: '<<<<<<< feature\ncolor: blue\n=======\ncolor: green\n>>>>>>> HEAD' },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сверху, после `<<<<<<< HEAD`, — версия **текущей** ветки (`main`, куда вливаем): `green`. Снизу, перед `>>>>>>> feature`, — версия вливаемой ветки: `blue`. Git ничего не выбирает сам — решает разработчик.',
          en: 'On top, after `<<<<<<< HEAD`, is the **current** branch’s version (`main`, the merge target): `green`. Below, before `>>>>>>> feature`, is the incoming branch’s version: `blue`. Git doesn’t pick — the developer decides.',
        },
      },
    ],
    sources: [
      { title: 'git-merge — How conflicts are presented', url: `${DOCS}/git-merge` },
      { title: 'Pro Git — Advanced Merging', url: `${BOOK}/Git-Tools-Advanced-Merging` },
    ],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-conflicts-003',
    kind: 'order',
    topic: 'git',
    tags: ['git-conflicts'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'При слиянии возник конфликт в `theme.css`. Расставьте шаги разрешения по порядку.',
      en: 'A merge produced a conflict in `theme.css`. Put the resolution steps in order.',
    },
    items: [
      { text: { ru: 'Открыть файл и выбрать итоговый вариант', en: 'Open the file and choose the final version' } },
      { text: { ru: 'Удалить маркеры `<<<<<<<`, `=======`, `>>>>>>>`', en: 'Remove the `<<<<<<<`, `=======`, `>>>>>>>` markers' } },
      { code: 'git add theme.css' },
      { code: 'git commit' },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сначала решают, каким должен быть код, и убирают маркеры — иначе они попадут в коммит и сломают файл. `git add` помечает конфликт решённым, а `git commit` (или `git merge --continue`) завершает слияние.',
          en: 'First decide what the code should be and remove the markers — otherwise they end up in the commit and break the file. `git add` marks the conflict resolved, and `git commit` (or `git merge --continue`) completes the merge.',
        },
      },
    ],
    sources: [{ title: 'Pro Git — Basic Branching and Merging', url: `${BOOK}/Git-Branching-Basic-Branching-and-Merging` }],
  },
  {
    id: 'git-conflicts-004',
    topic: 'git',
    tags: ['git-conflicts'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Слияние дало десяток конфликтов, и вы решили пока не сливать. Как вернуть всё как было?',
      en: 'A merge produced a dozen conflicts and you decide not to merge for now. How do you put everything back?',
    },
    options: [
      { text: { ru: '`git merge --abort`', en: '`git merge --abort`' } },
      { text: { ru: 'Удалить конфликтующие файлы', en: 'Delete the conflicting files' } },
      { text: { ru: '`git commit` с маркерами конфликта', en: '`git commit` with the conflict markers' } },
      { text: { ru: '`git push --force`', en: '`git push --force`' } },
      { text: { ru: 'Переклонировать репозиторий', en: 'Clone the repository again' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git merge --abort` отменяет незавершённое слияние и возвращает ветку, индекс и файлы к состоянию до `git merge`. Коммит с маркерами сломает код, а удаление файлов — потеря работы.',
          en: '`git merge --abort` cancels an unfinished merge and returns the branch, index and files to the state before `git merge`. Committing the markers breaks the code, and deleting files loses work.',
        },
      },
    ],
    sources: [{ title: 'git-merge — --abort', url: `${DOCS}/git-merge` }],
  },
];
