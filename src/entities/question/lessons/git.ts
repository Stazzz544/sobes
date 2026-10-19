import type { Lesson } from '../model/types';

const BOOK = 'https://git-scm.com/book/en/v2';
const DOCS = 'https://git-scm.com/docs';

export const GIT_LESSONS: Lesson[] = [
  {
    tag: 'git-basics',
    format: 'steps',
    summary: {
      ru: 'Git хранит не «последнюю версию файла», а историю снимков. Между вашей папкой и этой историей есть промежуточная зона — индекс, и почти все вопросы про `status` и `diff` сводятся к тому, где сейчас лежит изменение.',
      en: 'Git stores not “the latest version of a file” but a history of snapshots. Between your folder and that history sits an intermediate area — the index, and almost every `status` and `diff` question comes down to where a change currently lives.',
    },
    steps: [
      {
        id: 'three-areas',
        title: { ru: 'Папка, индекс и коммиты', en: 'Working tree, index and commits' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'У изменения в Git три места. **Рабочая папка** — то, что вы видите в редакторе. **Индекс** (staging area) — черновик следующего коммита. **Коммиты** — история в `.git`. `git add` кладёт в индекс **текущее** содержимое файла: если после этого снова его изменить, в коммит уйдёт версия на момент `add`, а новую правку придётся добавить ещё раз. В историю индекс попадает при `git commit`, а на сервер — только при `git push`.',
              en: 'A change in Git lives in one of three places. The **working tree** is what you see in your editor. The **index** (staging area) is a draft of the next commit. **Commits** are the history in `.git`. `git add` puts the **current** content of a file into the index: edit the file again afterwards, and the commit gets the version from the moment of `add`, so the new edit has to be added again. The index becomes history on `git commit`, and reaches the server only on `git push`.',
            },
          },
          {
            type: 'illustration',
            illustration: 'git-three-areas',
            caption: { ru: '`add` и `commit` двигают изменения вниз, `restore` — обратно', en: '`add` and `commit` move changes down, `restore` brings them back' },
          },
        ],
        test: ['git-basics-004'],
      },
      {
        id: 'status',
        title: { ru: 'Короткий статус', en: 'The short status' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git status --short` печатает перед именем файла две колонки. Первая — индекс против последнего коммита, вторая — рабочая папка против индекса. `A` — новый в индексе, `M` — изменён, `D` — удалён, `R` — переименован, `??` — Git файл не отслеживает. `MM a.txt`: одна версия уже в индексе, а на диске лежит более новая. `git commit -a` сам добавляет изменения **отслеживаемых** файлов, но новые так и останутся `??`.',
              en: '`git status --short` prints two columns before the file name. The first is the index vs the last commit, the second is the working tree vs the index. `A` is new in the index, `M` modified, `D` deleted, `R` renamed, `??` untracked by Git. `MM a.txt`: one version is already in the index, and a newer one sits on disk. `git commit -a` adds changes to **tracked** files by itself, but new files stay `??`.',
            },
          },
          {
            type: 'illustration',
            illustration: 'git-status-columns',
          },
          {
            type: 'check',
            check: {
              id: 'status-am',
              prompt: {
                ru: 'Что значит строка `AM app.js` в `git status --short`?',
                en: 'What does the line `AM app.js` in `git status --short` mean?',
              },
              options: [
                { text: { ru: 'Файл изменён в двух ветках', en: 'The file changed in two branches' } },
                { text: { ru: 'Новый файл добавлен в индекс, а потом снова изменён', en: 'A new file was added to the index and then changed again' } },
                { text: { ru: 'Файл удалён и добавлен заново', en: 'The file was deleted and added again' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Первая колонка `A` — в индексе новый файл, вторая `M` — на диске он отличается от версии в индексе. Коммит сейчас записал бы версию на момент `git add`.',
                en: 'The first column `A` means a new file in the index; the second `M` means the disk version differs from the one in the index. A commit now would record the version from the moment of `git add`.',
              },
            },
          },
        ],
        test: ['git-basics-006', 'git-basics-002'],
      },
      {
        id: 'diff',
        title: { ru: 'diff и show', en: 'diff and show' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git diff` без аргументов сравнивает рабочую папку с **индексом**, а не с последним коммитом. После `git add` они совпадают, и вывод пустой — изменения никуда не пропали. То, что уйдёт в следующий коммит, показывает `git diff --cached` (он же `--staged`): индекс против `HEAD`. Всё сразу — `git diff HEAD`. А `git show HEAD:путь` выводит файл таким, каким он был в коммите, не трогая рабочую папку.',
              en: '`git diff` with no arguments compares the working tree with the **index**, not with the last commit. After `git add` they match, and the output is empty — the changes haven’t gone anywhere. What goes into the next commit is shown by `git diff --cached` (also `--staged`): the index vs `HEAD`. Everything at once — `git diff HEAD`. And `git show HEAD:path` prints a file as it was in the commit without touching the working tree.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'bash',
              source: 'git diff           # tree vs index\ngit diff --cached  # index vs HEAD\ngit diff HEAD      # tree vs HEAD\ngit show main:package.json',
            },
          },
        ],
        test: ['git-basics-012'],
      },
      {
        id: 'gitignore',
        title: { ru: '.gitignore', en: '.gitignore' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`.gitignore` действует только на **неотслеживаемые** файлы. Если `.env` уже закоммичен, Git продолжит показывать его изменения, сколько ни добавляй его в `.gitignore`. Перестать отслеживать файл, оставив его на диске, — `git rm --cached .env`: в коммите он будет удалён (`D`), а на диске станет `??`. Утёкший секрет всё равно меняют — он остался в старых коммитах. Правила читаются сверху вниз, побеждает последнее совпавшее: `!keep.log` возвращает файл после `*.log`.',
              en: '`.gitignore` only affects **untracked** files. If `.env` is already committed, Git keeps showing its changes no matter how you list it in `.gitignore`. To stop tracking a file while keeping it on disk, run `git rm --cached .env`: the commit deletes it (`D`), and on disk it becomes `??`. A leaked secret still has to be rotated — it lives on in old commits. Rules are read top to bottom and the last match wins: `!keep.log` brings a file back after `*.log`.',
            },
          },
        ],
        test: ['git-basics-003', 'git-basics-007'],
      },
      {
        id: 'tags',
        title: { ru: 'Теги и версии', en: 'Tags and versions' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Тег — постоянное имя для коммита, обычно релиза. **Лёгкий** тег (`git tag v1.0`) — просто указатель на коммит. **Аннотированный** (`git tag -a v1.1 -m …`) — отдельный объект с автором, датой и сообщением, поэтому `git cat-file -t` для него скажет `tag`, а для лёгкого — `commit`. Для релизов берут аннотированные: их видит `git describe` — он пишет ближайший тег и число коммитов после него, — и их отправляет `git push --follow-tags`.',
              en: 'A tag is a permanent name for a commit, usually a release. A **lightweight** tag (`git tag v1.0`) is just a pointer to a commit. An **annotated** one (`git tag -a v1.1 -m …`) is a separate object with an author, date and message, so `git cat-file -t` says `tag` for it and `commit` for a lightweight one. Releases use annotated tags: `git describe` sees them — it prints the nearest tag and the number of commits after it — and `git push --follow-tags` sends them.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'release-tag',
              prompt: {
                ru: 'Какой тег поставить на релиз?',
                en: 'Which tag should mark a release?',
              },
              options: [
                { text: { ru: 'Лёгкий — он проще', en: 'Lightweight — it’s simpler' } },
                { text: { ru: 'Без разницы — это одно и то же', en: 'Doesn’t matter — they’re the same' } },
                { text: { ru: 'Аннотированный — у него автор, дата и сообщение', en: 'Annotated — it has an author, date and message' } },
              ],
              answer: 2,
              explanation: {
                ru: 'Аннотированный тег хранит, кто и когда выпустил релиз и зачем, его по умолчанию учитывает `git describe` и отправляет `push --follow-tags`. Лёгкие подходят для личных закладок.',
                en: 'An annotated tag records who released what, when and why; `git describe` uses it by default and `push --follow-tags` sends it. Lightweight tags suit personal bookmarks.',
              },
            },
          },
        ],
        test: ['git-basics-011'],
      },
      {
        id: 'file-history',
        title: { ru: 'История файла', en: 'A file’s history' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Git не хранит переименования отдельно: удалённый и новый файл с похожим содержимым он показывает как `R old.txt -> new.txt`. `git mv` — лишь короткая запись для переименования на диске плюс `git add`. Поэтому `git log -- new.txt` найдёт только коммиты после переименования: раньше файла с таким именем не было. Всю историю покажет `git log --follow -- new.txt` — при переименовании он продолжает поиск по старому имени. Работает это для одного файла.',
              en: 'Git doesn’t store renames separately: a deleted file and a new one with similar content show up as `R old.txt -> new.txt`. `git mv` is just shorthand for renaming on disk plus `git add`. That’s why `git log -- new.txt` finds only commits after the rename: before it, no file had that name. The full history comes from `git log --follow -- new.txt` — at a rename it keeps searching under the old name. This works for a single file.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'bash',
              source: 'git mv old.txt new.txt\ngit commit -m "rename"\n\ngit log --oneline -- new.txt\ngit log --oneline --follow -- new.txt',
            },
          },
        ],
        test: ['git-basics-014'],
      },
    ],
    keyPoints: [
      { ru: 'Индекс — черновик коммита: `git add` берёт файл в его текущем виде.', en: 'The index is a draft commit: `git add` takes the file as it is right now.' },
      { ru: 'Первая колонка статуса — индекс, вторая — рабочая папка.', en: 'The first status column is the index, the second the working tree.' },
      { ru: '`git diff` — папка против индекса, `--cached` — индекс против коммита.', en: '`git diff` is tree vs index; `--cached` is index vs commit.' },
      { ru: '`.gitignore` не действует на уже отслеживаемые файлы.', en: '`.gitignore` doesn’t affect files that are already tracked.' },
      { ru: 'Для релизов — аннотированные теги.', en: 'Releases get annotated tags.' },
    ],
    sources: [
      { title: 'Pro Git — Recording Changes to the Repository', url: `${BOOK}/Git-Basics-Recording-Changes-to-the-Repository` },
      { title: 'git-status — Short Format', url: `${DOCS}/git-status` },
      { title: 'git-diff', url: `${DOCS}/git-diff` },
      { title: 'gitignore', url: `${DOCS}/gitignore` },
      { title: 'Pro Git — Tagging', url: `${BOOK}/Git-Basics-Tagging` },
    ],
  },
  {
    tag: 'git-branches',
    format: 'steps',
    summary: {
      ru: 'Ветка в Git — не копия кода, а подвижный указатель на коммит. Отсюда всё остальное: слияние перемоткой, коммиты слияния, сравнение веток и то, почему Git иногда не даёт удалить ветку.',
      en: 'A Git branch isn’t a copy of the code but a movable pointer to a commit. Everything else follows from that: fast-forward merges, merge commits, comparing branches and why Git sometimes won’t let you delete one.',
    },
    steps: [
      {
        id: 'pointers',
        title: { ru: 'Ветка — это указатель', en: 'A branch is a pointer' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Коммиты образуют цепочку: каждый ссылается на родителя. **Ветка** — просто подвижное имя одного коммита, а **`HEAD`** — указатель на текущую ветку. Новый коммит сдвигает вперёд ту ветку, на которую указывает `HEAD`. Если переключиться прямо на коммит (`git switch --detach`), `HEAD` указывает на него — это [[detached-head|detached HEAD]]: смотреть код можно, но новые коммиты не попадут ни в одну ветку и после переключения найдутся только в `reflog`. Сохранить их — `git switch -c имя`.',
              en: 'Commits form a chain: each points to its parent. A **branch** is just a movable name for one commit, and **`HEAD`** points to the current branch. A new commit moves forward the branch `HEAD` points to. Switch straight to a commit (`git switch --detach`), and `HEAD` points to it — that’s a [[detached-head|detached HEAD]]: you can look at the code, but new commits land on no branch and after switching away can only be found in `reflog`. Save them with `git switch -c name`.',
            },
          },
          {
            type: 'illustration',
            illustration: 'git-branch-pointers',
            caption: { ru: '`main` и `feature` — имена коммитов, `HEAD` — где вы сейчас', en: '`main` and `feature` name commits; `HEAD` is where you are' },
          },
          {
            type: 'check',
            check: {
              id: 'commit-moves-branch',
              prompt: {
                ru: '`HEAD` указывает на `feature`, вы делаете коммит. Что сдвинется?',
                en: '`HEAD` points to `feature`, and you commit. What moves?',
              },
              options: [
                { text: { ru: 'Все ветки репозитория', en: 'Every branch in the repo' } },
                { text: { ru: 'Только `HEAD`, ветка останется на месте', en: 'Only `HEAD`; the branch stays put' } },
                { text: { ru: '`feature` — на новый коммит, а `HEAD` по-прежнему указывает на неё', en: '`feature` — to the new commit, and `HEAD` still points to it' } },
              ],
              answer: 2,
              explanation: {
                ru: 'Коммит продвигает ветку, на которую указывает `HEAD`. Сам `HEAD` указывает на ветку, а не на коммит, поэтому «едет» вместе с ней.',
                en: 'A commit advances the branch `HEAD` points to. `HEAD` itself points to the branch, not a commit, so it moves along with it.',
              },
            },
          },
        ],
        test: ['git-branches-003'],
      },
      {
        id: 'workflow',
        title: { ru: 'Ветка под задачу', en: 'A branch per task' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Задачу начинают от свежего `main`: переключаются на него, подтягивают изменения и создают ветку. Коммитят и отправляют её с `-u`, чтобы связать с удалённой, — дальше хватит `git push`. Незакоммиченные изменения не принадлежат ветке: они лежат в рабочей папке и «переезжают» вместе с вами при переключении. Если переключение затронуло бы изменённый файл, Git откажется — тогда изменения коммитят или прячут в `git stash`.',
              en: 'A task starts from a fresh `main`: switch to it, pull the changes and create a branch. Commit and push it with `-u` to link it to the remote — after that plain `git push` is enough. Uncommitted changes don’t belong to a branch: they live in the working tree and travel with you when you switch. If switching would touch a modified file, Git refuses — then you commit the changes or stash them with `git stash`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'bash',
              source: 'git switch main\ngit pull\ngit switch -c feature/login\ngit commit -am "Add login form"\ngit push -u origin feature/login',
            },
          },
        ],
        test: ['git-branches-004'],
      },
      {
        id: 'merge',
        title: { ru: 'Перемотка и коммит слияния', en: 'Fast-forward and merge commits' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Если в `main` после ответвления не было своих коммитов, `git merge feature` делает **fast-forward**: указатель `main` просто передвигается на последний коммит фичи, нового коммита нет. `--no-ff` запрещает перемотку и всегда создаёт **коммит слияния** с двумя родителями — так в истории видно, какие коммиты пришли одной фичей. Обратный флаг `--ff-only` разрешает только перемотку: если ветки разошлись, Git откажется, и сначала нужен `rebase`.',
              en: 'If `main` got no commits of its own after the branch split off, `git merge feature` does a **fast-forward**: the `main` pointer just moves to the feature’s last commit, and no new commit appears. `--no-ff` forbids that and always creates a **merge commit** with two parents — history then shows which commits came in as one feature. The opposite flag, `--ff-only`, allows fast-forward only: if the branches diverged, Git refuses, and you need a `rebase` first.',
            },
          },
          {
            type: 'illustration',
            illustration: 'git-ff-vs-merge',
          },
        ],
        test: ['git-branches-001', 'git-branches-002'],
      },
      {
        id: 'ranges',
        title: { ru: 'Две точки и три точки', en: 'Two dots and three dots' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`A..B` — коммиты, достижимые из `B`, но не из `A`. `git log main..feature` показывает ровно то, что принесёт слияние фичи: общая база и коммиты, которые есть только в `main`, туда не попадают. Обратный порядок, `feature..main`, — то, что ушло в `main`, пока вы работали. Три точки `A...B` — симметричная разность: коммиты, которые есть только в одной из веток. `git rev-list --count` не выводит коммиты, а считает их.',
              en: '`A..B` means commits reachable from `B` but not from `A`. `git log main..feature` shows exactly what merging the feature will bring: the shared base and commits that exist only in `main` don’t show up. The reverse, `feature..main`, is what landed in `main` while you worked. Three dots, `A...B`, is the symmetric difference: commits that exist in only one of the branches. `git rev-list --count` counts commits instead of listing them.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'bash',
              source: 'git log --oneline main..feature\ngit log --oneline feature..main\ngit rev-list --count main...feature',
            },
          },
        ],
        test: ['git-branches-006'],
      },
      {
        id: 'squash-delete',
        title: { ru: 'Squash и удаление веток', en: 'Squash and deleting branches' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git merge --squash feature` переносит все **изменения** ветки одним новым коммитом, но не записывает её родителем. Для Git ветка осталась неслитой: её нет в `git branch --merged`, и `git branch -d feature` откажется её удалять. Так же `-d` защищает любую ветку с коммитами, которых больше нигде нет, — это страховка от потери работы. Принудительно удаляют через `-D`, и после «Squash and merge» на GitHub это единственный способ.',
              en: '`git merge --squash feature` brings all of the branch’s **changes** as one new commit but doesn’t record the branch as a parent. To Git the branch is still unmerged: it’s missing from `git branch --merged`, and `git branch -d feature` refuses to delete it. `-d` protects any branch whose commits exist nowhere else — a safeguard against losing work. Force deletion is `-D`, and after “Squash and merge” on GitHub it’s the only way.',
            },
          },
        ],
        test: ['git-branches-005', 'git-branches-009'],
      },
      {
        id: 'parents',
        title: { ru: 'Родители коммита слияния', en: 'A merge commit’s parents' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'У merge-коммита два родителя. `^n` выбирает n-го: `HEAD^1` — ветка, **в которую** сливали, `HEAD^2` — та, **которую** влили. `~n` идёт на n шагов назад только по первым родителям: `HEAD~2` — то же, что `HEAD^1^1`. Это нужно, например, чтобы отменить слияние: `git revert -m 1 <merge>` откатывает изменения влитой ветки и сохраняет сторону, в которую сливали.',
              en: 'A merge commit has two parents. `^n` picks the n-th: `HEAD^1` is the branch merged **into**, `HEAD^2` the one that was merged **in**. `~n` walks n steps back along first parents only: `HEAD~2` equals `HEAD^1^1`. You need this, for example, to undo a merge: `git revert -m 1 <merge>` reverts the merged branch’s changes and keeps the side merged into.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'bash',
              source: 'git show --oneline HEAD^1  # main side\ngit show --oneline HEAD^2  # merged side\ngit show --oneline HEAD~2  # 2 back',
            },
          },
        ],
        test: ['git-branches-012'],
      },
    ],
    keyPoints: [
      { ru: 'Ветка — подвижное имя коммита, `HEAD` — текущая ветка.', en: 'A branch is a movable commit name; `HEAD` is the current branch.' },
      { ru: 'Fast-forward двигает указатель, `--no-ff` создаёт коммит слияния.', en: 'Fast-forward moves the pointer; `--no-ff` creates a merge commit.' },
      { ru: '`main..feature` — то, что принесёт слияние.', en: '`main..feature` is what a merge will bring.' },
      { ru: '`-d` не удалит неслитую ветку; после squash нужен `-D`.', en: '`-d` won’t delete an unmerged branch; after squash you need `-D`.' },
      { ru: '`^1` и `^2` — родители слияния, `~n` — шаги по первому родителю.', en: '`^1` and `^2` are merge parents; `~n` walks first parents.' },
    ],
    sources: [
      { title: 'Pro Git — Branches in a Nutshell', url: `${BOOK}/Git-Branching-Branches-in-a-Nutshell` },
      { title: 'Pro Git — Basic Branching and Merging', url: `${BOOK}/Git-Branching-Basic-Branching-and-Merging` },
      { title: 'gitrevisions — specifying ranges', url: `${DOCS}/gitrevisions` },
      { title: 'git-branch', url: `${DOCS}/git-branch` },
    ],
  },
  {
    tag: 'git-rebase',
    format: 'steps',
    summary: {
      ru: 'Rebase и cherry-pick не перемещают коммиты, а создают их копии в новом месте. Это даёт прямую и аккуратную историю, но требует одного правила: переписывать можно только то, что ещё не забрали другие.',
      en: 'Rebase and cherry-pick don’t move commits; they create copies in a new place. That gives a clean, linear history but comes with one rule: rewrite only what nobody else has pulled yet.',
    },
    steps: [
      {
        id: 'replay',
        title: { ru: 'Что делает rebase', en: 'What rebase does' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git rebase main` в ветке фичи берёт её коммиты, которых нет в `main`, и **пересоздаёт** их поверх последнего коммита `main`. История становится прямой: сначала коммиты `main`, потом ваши — `git log` выведет их от новых к старым. Пересозданные коммиты — новые: у них другой родитель, а значит, и другой хеш, старые остаются только в `reflog`. Отсюда правило: [[rebase|ребейзят]] только свои, ещё не опубликованные коммиты.',
              en: '`git rebase main` on a feature branch takes its commits that aren’t in `main` and **recreates** them on top of `main`’s last commit. History becomes linear: `main`’s commits first, then yours — `git log` lists them newest first. The recreated commits are new: they have a different parent and therefore a different hash, while the old ones stay only in `reflog`. Hence the rule: [[rebase|rebase]] only your own, not yet published commits.',
            },
          },
          {
            type: 'illustration',
            illustration: 'git-rebase-replay',
          },
          {
            type: 'check',
            check: {
              id: 'rebase-new-hash',
              prompt: {
                ru: 'Почему после rebase у ваших коммитов другие хеши, хотя изменения в них те же?',
                en: 'Why do your commits have different hashes after a rebase, even though their changes are the same?',
              },
              options: [
                { text: { ru: 'Git добавляет к хешу время rebase', en: 'Git adds the rebase time to the hash' } },
                { text: { ru: 'У них другой родитель — это новые коммиты', en: 'They have a different parent — they’re new commits' } },
                { text: { ru: 'Хеши не меняются, меняются только имена веток', en: 'Hashes don’t change, only branch names do' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Хеш коммита считается в том числе от хеша родителя. Новая база — новый родитель, поэтому rebase создаёт новые коммиты, а не двигает старые.',
                en: 'A commit’s hash is computed from, among other things, its parent’s hash. A new base means a new parent, so rebase creates new commits rather than moving the old ones.',
              },
            },
          },
        ],
        test: ['git-rebase-001', 'git-rebase-005'],
      },
      {
        id: 'linear',
        title: { ru: 'Перемотка после rebase', en: 'Fast-forward after a rebase' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Чтобы история `main` оставалась прямой, ветку сначала ребейзят на свежий `main`, а потом вливают перемоткой. `git merge --ff-only feature` разрешает только fast-forward: если ветки разошлись — в `main` есть коммиты, которых нет в фиче, — Git откажется и ничего не изменит. После `git rebase main` в ветке фича снова содержит весь `main`, и перемотка пройдёт.',
              en: 'To keep `main`’s history linear, you first rebase the branch onto a fresh `main` and then merge it by fast-forward. `git merge --ff-only feature` allows fast-forward only: if the branches diverged — `main` has commits the feature lacks — Git refuses and changes nothing. After `git rebase main` on the branch, the feature contains all of `main` again, and the fast-forward goes through.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'bash',
              source: 'git switch feature\ngit rebase main\ngit switch main\ngit merge --ff-only feature',
            },
          },
        ],
        test: ['git-branches-010'],
      },
      {
        id: 'cherry-pick',
        title: { ru: 'cherry-pick', en: 'cherry-pick' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git cherry-pick <коммит>` копирует изменения **одного** коммита в текущую ветку новым коммитом. Имя ветки здесь означает её последний коммит, поэтому `git cherry-pick feature` перенесёт только его, а не всю ветку. Несколько коммитов задают диапазоном: `git cherry-pick main..feature`. Так забирают срочный фикс в релизную ветку. У копии новый хеш, поэтому при будущем слиянии ветки Git увидит те же изменения ещё раз.',
              en: '`git cherry-pick <commit>` copies the changes of **one** commit into the current branch as a new commit. A branch name here means its last commit, so `git cherry-pick feature` brings over only that, not the whole branch. Several commits are given as a range: `git cherry-pick main..feature`. That’s how an urgent fix gets into a release branch. The copy has a new hash, so when the branch is merged later Git sees the same changes once more.',
            },
          },
        ],
        test: ['git-rebase-002'],
      },
      {
        id: 'interactive',
        title: { ru: 'Интерактивный rebase', en: 'Interactive rebase' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git rebase -i HEAD~5` открывает список последних коммитов, где каждому назначают действие: `pick` — оставить, `reword` — переписать сообщение, `squash` — слить с предыдущим, `fixup` — слить и выбросить своё сообщение, `drop` — удалить; строки можно переставлять. Так перед пушем превращают «fix», «fix 2», «опечатка» в один аккуратный коммит. Ещё удобнее `git commit --fixup <коммит>`: `rebase -i --autosquash` сам поставит правку после целевого коммита.',
              en: '`git rebase -i HEAD~5` opens a list of recent commits where each gets an action: `pick` keeps it, `reword` rewrites the message, `squash` melds it into the previous one, `fixup` melds it and drops its message, `drop` removes it; lines can be reordered. That’s how “fix”, “fix 2”, “typo” become one tidy commit before a push. Even handier is `git commit --fixup <commit>`: `rebase -i --autosquash` places that fix right after its target by itself.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'fixup-action',
              prompt: {
                ru: 'Какое действие в `rebase -i` вольёт коммит в предыдущий и выбросит его сообщение?',
                en: 'Which `rebase -i` action melds a commit into the previous one and drops its message?',
              },
              options: [
                { text: { ru: '`reword`', en: '`reword`' } },
                { text: { ru: '`pick`', en: '`pick`' } },
                { text: { ru: '`fixup`', en: '`fixup`' } },
              ],
              answer: 2,
              explanation: {
                ru: '`fixup` — как `squash`, но без объединения сообщений: остаётся текст предыдущего коммита. `reword` меняет только сообщение, `pick` оставляет коммит как есть.',
                en: '`fixup` is like `squash` without combining messages: the previous commit’s text stays. `reword` changes only the message, and `pick` keeps the commit as is.',
              },
            },
          },
        ],
        test: ['git-rebase-003'],
      },
      {
        id: 'onto',
        title: { ru: 'rebase --onto', en: 'rebase --onto' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Вы начали задачу от чужой ветки `topic`, её ещё не влили, а вашу нужно отправить отдельно. `git rebase --onto main topic feature` берёт коммиты `feature`, которых нет в `topic`, и переносит их на `main`. Коммиты самой `topic` в вашу ветку больше не попадают. Читается так: «перенеси на `main` всё, что в `feature` появилось после `topic`».',
              en: 'You started a task from someone else’s `topic` branch, it isn’t merged yet, and yours has to ship separately. `git rebase --onto main topic feature` takes the `feature` commits that aren’t in `topic` and moves them onto `main`. The `topic` commits no longer end up in your branch. Read it as: “move onto `main` everything in `feature` that came after `topic`”.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'bash',
              source: 'git rebase --onto main topic feature',
            },
          },
        ],
        test: ['git-rebase-007'],
      },
    ],
    keyPoints: [
      { ru: 'Rebase пересоздаёт коммиты поверх новой базы — хеши меняются.', en: 'Rebase recreates commits on a new base — hashes change.' },
      { ru: 'Ребейзят только свои неопубликованные коммиты.', en: 'Rebase only your own unpublished commits.' },
      { ru: 'Rebase плюс `merge --ff-only` — прямая история.', en: 'Rebase plus `merge --ff-only` gives a linear history.' },
      { ru: '`cherry-pick` копирует один коммит, диапазон — через `..`.', en: '`cherry-pick` copies one commit; ranges use `..`.' },
      { ru: '`rebase -i` и `--autosquash` наводят порядок перед пушем.', en: '`rebase -i` and `--autosquash` tidy up before a push.' },
    ],
    sources: [
      { title: 'Pro Git — Rebasing', url: `${BOOK}/Git-Branching-Rebasing` },
      { title: 'Pro Git — Rewriting History', url: `${BOOK}/Git-Tools-Rewriting-History` },
      { title: 'git-cherry-pick', url: `${DOCS}/git-cherry-pick` },
      { title: 'git-rebase', url: `${DOCS}/git-rebase` },
    ],
  },
  {
    tag: 'git-undo',
    format: 'steps',
    summary: {
      ru: 'В Git почти всё можно отменить — важно выбрать подходящий инструмент. Одни команды переписывают историю, другие добавляют к ней, третьи трогают только файлы, а потерянные коммиты ещё долго помнит reflog.',
      en: 'Almost anything in Git can be undone — the trick is picking the right tool. Some commands rewrite history, some add to it, some touch only files, and reflog remembers “lost” commits for a long time.',
    },
    steps: [
      {
        id: 'restore',
        title: { ru: 'Вернуть файл', en: 'Restoring a file' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git restore файл` возвращает файл в рабочей папке к версии из **индекса** — обычно это последний коммит. Несохранённая правка при этом пропадает навсегда: её не было ни в индексе, ни в коммите. `git restore --staged файл` делает обратное — убирает файл из индекса, не трогая содержимое на диске: правка останется, но в коммит не попадёт. Это современная замена `git checkout -- файл` и `git reset HEAD файл`.',
              en: '`git restore file` returns a file in the working tree to the version in the **index** — usually the last commit. An unsaved edit is lost for good: it was neither in the index nor in a commit. `git restore --staged file` does the opposite — takes the file out of the index without touching the content on disk: the edit stays but won’t go into the commit. These replace `git checkout -- file` and `git reset HEAD file`.',
            },
          },
        ],
        test: ['git-undo-003'],
      },
      {
        id: 'reset-modes',
        title: { ru: 'reset: soft, mixed, hard', en: 'reset: soft, mixed, hard' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git reset HEAD~1` отодвигает текущую ветку на коммит назад, а флаг решает, что станет с изменениями. `--soft` оставляет их в индексе: коммита нет, файлы подготовлены — удобно переписать последний коммит. `--mixed` (по умолчанию) сбрасывает индекс: файлы на диске остались, но новые снова `??`. `--hard` приводит к коммиту и индекс, и рабочую папку — несохранённые правки пропадают. Сам «отменённый» коммит ещё можно найти в `reflog`.',
              en: '`git reset HEAD~1` moves the current branch one commit back, and the flag decides what happens to the changes. `--soft` keeps them in the index: the commit is gone, the files are staged — handy for rewriting the last commit. `--mixed` (the default) resets the index: files stay on disk, but new ones are `??` again. `--hard` resets both the index and the working tree to the commit — unsaved edits are lost. The “undone” commit can still be found in `reflog`.',
            },
          },
          {
            type: 'illustration',
            illustration: 'git-reset-modes',
            caption: { ru: 'Ветка уходит назад при любом флаге — разница в индексе и файлах', en: 'The branch moves back with any flag — the difference is the index and files' },
          },
          {
            type: 'check',
            check: {
              id: 'redo-commit',
              prompt: {
                ru: 'Последний коммит вышел неудачным: хочется поправить файл и закоммитить заново, ничего не потеряв. Какой reset подойдёт?',
                en: 'The last commit went wrong: you want to fix a file and commit again without losing anything. Which reset fits?',
              },
              options: [
                { text: { ru: '`--hard`', en: '`--hard`' } },
                { text: { ru: '`--soft` или `--mixed` — изменения останутся', en: '`--soft` or `--mixed` — the changes stay' } },
                { text: { ru: 'Никакой — только клонировать заново', en: 'None — only cloning again' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Оба режима оставляют файлы на диске: `--soft` — ещё и в индексе, `--mixed` — без индекса. `--hard` выбросил бы правки.',
                en: 'Both modes keep the files on disk: `--soft` also keeps them staged, `--mixed` unstages them. `--hard` would throw the edits away.',
              },
            },
          },
        ],
        test: ['git-undo-001', 'git-undo-010'],
      },
      {
        id: 'revert-amend',
        title: { ru: 'revert и amend', en: 'revert and amend' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git revert <коммит>` не удаляет коммит из истории, а добавляет **новый**, который отменяет его изменения. История не переписывается, поэтому revert безопасен для общих веток. `git commit --amend`, наоборот, **заменяет** последний коммит новым — с другим хешем, сообщением и, например, забытым файлом. Старый коммит остаётся только в `reflog`. Amend уже отправленного коммита потребует `push --force-with-lease` и сломает историю тем, кто его забрал.',
              en: '`git revert <commit>` doesn’t delete a commit from history; it adds a **new** one that undoes its changes. History isn’t rewritten, so revert is safe on shared branches. `git commit --amend`, on the contrary, **replaces** the last commit with a new one — with a different hash, message and, say, a forgotten file. The old commit remains only in `reflog`. Amending a commit you already pushed needs `push --force-with-lease` and breaks history for those who pulled it.',
            },
          },
        ],
        test: ['git-undo-008', 'git-undo-006'],
      },
      {
        id: 'reflog',
        title: { ru: 'reflog спасает', en: 'reflog to the rescue' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git reflog` — журнал перемещений `HEAD` в **вашем** репозитории: каждый коммит, переключение и `reset`. `git log` показывает только то, что достижимо из текущего коммита, а reflog помнит и «потерянное». `HEAD@{1}` — положение `HEAD` шагом раньше, поэтому после неудачного `reset --hard` спасает `git reset --hard HEAD@{1}` или хеш из reflog. Записи хранятся локально около 90 дней и в чужой клон не попадают.',
              en: '`git reflog` is a journal of `HEAD` movements in **your** repository: every commit, switch and `reset`. `git log` shows only what’s reachable from the current commit, while reflog remembers the “lost” ones too. `HEAD@{1}` is where `HEAD` was one step earlier, so after a bad `reset --hard`, `git reset --hard HEAD@{1}` or a hash from reflog saves the day. Entries are kept locally for about 90 days and never reach other clones.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'bash',
              source: 'git reflog\n# a1b2c3d HEAD@{0}: reset: HEAD~3\n# 9f8e7d6 HEAD@{1}: commit: search\ngit reset --hard HEAD@{1}',
            },
          },
        ],
        test: ['git-undo-004'],
      },
      {
        id: 'stash-clean',
        title: { ru: 'stash и clean', en: 'stash and clean' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git stash` прячет незакоммиченные изменения **отслеживаемых** файлов и возвращает чистую папку; новые файлы остаются на месте — для них `git stash -u`. Stash — стек: последняя запись становится `stash@{0}`, и `git stash pop` берёт её. `git clean` удаляет **неотслеживаемые** файлы безвозвратно — их нет ни в коммитах, ни в корзине. Поэтому сначала смотрят список с `-n`, а удаляют с `-f`; `-d` добавляет папки, `-x` — ещё и игнорируемые файлы.',
              en: '`git stash` hides uncommitted changes to **tracked** files and gives you a clean folder; new files stay put — use `git stash -u` for them. Stash is a stack: the latest entry becomes `stash@{0}`, and `git stash pop` takes it. `git clean` deletes **untracked** files for good — they’re in no commit and no trash. So you first list them with `-n`, then delete with `-f`; `-d` adds folders, `-x` also ignored files.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'clean-dry-run',
              prompt: {
                ru: 'Как безопасно посмотреть, что удалит `git clean`?',
                en: 'How do you safely see what `git clean` would delete?',
              },
              options: [
                { text: { ru: '`git clean -f`', en: '`git clean -f`' } },
                { text: { ru: '`git stash`', en: '`git stash`' } },
                { text: { ru: '`git clean -n`', en: '`git clean -n`' } },
              ],
              answer: 2,
              explanation: {
                ru: '`-n` — «пробный прогон»: Git только печатает, что удалил бы. `-f` удаляет сразу и без возврата.',
                en: '`-n` is a dry run: Git only prints what it would remove. `-f` deletes right away, with no way back.',
              },
            },
          },
        ],
        test: ['git-undo-005'],
      },
      {
        id: 'bisect',
        title: { ru: 'Найти виноватый коммит', en: 'Finding the guilty commit' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git bisect` ищет коммит, сломавший код, двоичным поиском. Отмечаете хороший и плохой коммит, Git выдаёт середину, вы говорите `good` или `bad` — и диапазон каждый раз делится пополам. Для 1000 коммитов это около 10 проверок: log₂(1000) ≈ 10. А `git bisect run npm test` проходит шаги сам: код выхода скрипта решает, хороший коммит или нет.',
              en: '`git bisect` finds the commit that broke the code with binary search. You mark a good and a bad commit, Git checks out the middle, you answer `good` or `bad` — and the range halves each time. For 1000 commits that’s about 10 checks: log₂(1000) ≈ 10. And `git bisect run npm test` walks the steps by itself: the script’s exit code decides whether a commit is good.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'bash',
              source: 'git bisect start\ngit bisect bad\ngit bisect good v1.0\ngit bisect run npm test\ngit bisect reset',
            },
          },
        ],
        test: ['git-undo-007'],
      },
    ],
    keyPoints: [
      { ru: '`restore` возвращает файл, `restore --staged` убирает его из индекса.', en: '`restore` brings a file back; `restore --staged` unstages it.' },
      { ru: '`reset --soft`, `--mixed`, `--hard` различаются тем, что станет с индексом и файлами.', en: '`reset --soft`, `--mixed`, `--hard` differ in what happens to the index and files.' },
      { ru: '`revert` безопасен для общих веток, `amend` переписывает коммит.', en: '`revert` is safe on shared branches; `amend` rewrites a commit.' },
      { ru: '`reflog` помнит всё, что делал `HEAD`.', en: '`reflog` remembers everything `HEAD` did.' },
      { ru: 'Перед `git clean -f` — `git clean -n`.', en: 'Run `git clean -n` before `git clean -f`.' },
    ],
    sources: [
      { title: 'Pro Git — Undoing Things', url: `${BOOK}/Git-Basics-Undoing-Things` },
      { title: 'Pro Git — Reset Demystified', url: `${BOOK}/Git-Tools-Reset-Demystified` },
      { title: 'git-reflog', url: `${DOCS}/git-reflog` },
      { title: 'git-bisect', url: `${DOCS}/git-bisect` },
    ],
  },
  {
    tag: 'git-remote',
    format: 'steps',
    summary: {
      ru: 'Удалённый репозиторий не синхронизируется сам: Git обменивается с ним только по командам. Почти все сюрпризы с `pull` и `push` объясняются тем, что ваша копия сервера — `origin/main` — устарела или ветки разошлись.',
      en: 'A remote repository doesn’t sync by itself: Git talks to it only on command. Almost every `pull` and `push` surprise comes down to your copy of the server — `origin/main` — being stale or the branches having diverged.',
    },
    steps: [
      {
        id: 'origin',
        title: { ru: 'origin и origin/main', en: 'origin and origin/main' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git clone` запоминает сервер под именем **origin** и создаёт удалённые ветки вроде `origin/main` — локальные копии состояния сервера на момент последнего обмена. Сами они не обновляются. `git status -sb` сравнивает вашу ветку с её копией: `[ahead 1]` — у вас есть коммит, которого нет на сервере, `[behind 1]` — на сервере есть коммит, которого нет у вас, оба числа сразу — ветки разошлись.',
              en: '`git clone` remembers the server as **origin** and creates remote branches like `origin/main` — local copies of the server’s state as of the last exchange. They don’t update by themselves. `git status -sb` compares your branch with its copy: `[ahead 1]` means you have a commit the server lacks, `[behind 1]` means the server has one you lack, and both numbers mean the branches diverged.',
            },
          },
          { type: 'diagram', diagram: 'git-remote-sync' },
        ],
        test: ['git-remote-001'],
      },
      {
        id: 'fetch-pull',
        title: { ru: 'fetch и pull', en: 'fetch and pull' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git fetch` скачивает новые коммиты и сдвигает `origin/main`, но ваши ветки не трогает — после него статус может показать `[behind 1]`. Это безопасно: посмотреть, что пришло, можно через `git log main..origin/main`. `git pull` — это `fetch` плюс слияние `origin/main` в текущую ветку (или `rebase` с флагом `--rebase`). Поэтому `pull` может создать коммит слияния или остановиться на конфликте, а `fetch` — никогда.',
              en: '`git fetch` downloads new commits and moves `origin/main` but doesn’t touch your branches — afterwards the status may show `[behind 1]`. It’s safe: you can see what arrived with `git log main..origin/main`. `git pull` is `fetch` plus merging `origin/main` into the current branch (or a `rebase` with `--rebase`). That’s why `pull` can create a merge commit or stop on a conflict, and `fetch` never does.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'fetch-local-branch',
              prompt: {
                ru: 'Вы выполнили `git fetch`, на сервере были новые коммиты. Изменилась ли ваша локальная `main`?',
                en: 'You ran `git fetch`, and the server had new commits. Did your local `main` change?',
              },
              options: [
                { text: { ru: 'Да, новые коммиты влились в неё', en: 'Yes, the new commits were merged into it' } },
                { text: { ru: 'Нет, сдвинулась только `origin/main`', en: 'No, only `origin/main` moved' } },
                { text: { ru: 'Да, она стала равна серверу и потеряла ваши коммиты', en: 'Yes, it now equals the server and lost your commits' } },
              ],
              answer: 1,
              explanation: {
                ru: '`fetch` обновляет только удалённые ветки. Чтобы забрать изменения в `main`, нужен `pull`, `merge` или `rebase`.',
                en: '`fetch` only updates remote branches. To bring the changes into `main` you need `pull`, `merge` or `rebase`.',
              },
            },
          },
        ],
        test: ['git-remote-003'],
      },
      {
        id: 'upstream',
        title: { ru: 'Upstream и push -u', en: 'Upstream and push -u' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: '`git push -u origin feature` (`--set-upstream`) связывает локальную ветку с удалённой. После этого `git status` сравнивает их, а `git pull` и `git push` без аргументов знают, куда идти. Когда ветки на одном уровне, статус показывает просто `## feature...origin/feature` — без ahead и behind. Чтобы не писать `-u` для каждой новой ветки, есть настройка `push.autoSetupRemote = true`.',
              en: '`git push -u origin feature` (`--set-upstream`) links the local branch to the remote one. After that `git status` compares them, and `git pull` and `git push` with no arguments know where to go. When the branches are level, the status shows just `## feature...origin/feature` — no ahead or behind. To skip `-u` for every new branch there’s the `push.autoSetupRemote = true` setting.',
            },
          },
        ],
        test: ['git-remote-005'],
      },
      {
        id: 'diverged',
        title: { ru: 'Разошедшиеся ветки', en: 'Diverged branches' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Вы и коллега закоммитили в `main` одновременно. Обычный `git pull` создаст коммит слияния «Merge branch main of …» — история обрастает узлами без смысла. `git pull --rebase` переносит ваши локальные коммиты поверх свежего `origin/main`, и история остаётся прямой. `git pull --ff-only` разрешает только перемотку: раз ветки разошлись, он откажется с ошибкой и ничего не изменит. Поведение по умолчанию задают `pull.rebase` или `pull.ff`.',
              en: 'You and a colleague committed to `main` at the same time. A plain `git pull` creates a “Merge branch main of …” commit — history grows meaningless knots. `git pull --rebase` moves your local commits on top of the fresh `origin/main`, and history stays linear. `git pull --ff-only` allows only a fast-forward: since the branches diverged, it fails and changes nothing. The default behavior is set with `pull.rebase` or `pull.ff`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'bash',
              source: 'git pull --rebase\ngit pull --ff-only\ngit config --global pull.rebase true',
            },
          },
        ],
        test: ['git-remote-006'],
      },
      {
        id: 'force',
        title: { ru: 'Push после rebase', en: 'Pushing after a rebase' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Rebase и `commit --amend` переписывают коммиты, и обычный `git push` будет отклонён: история на сервере больше не продолжение вашей. Отправить можно принудительно, но `--force` перезапишет ветку целиком — вместе с чужими коммитами, которые успели туда попасть. `--force-with-lease` безопаснее: он перезапишет ветку, только если на сервере она в том состоянии, которое вы видели при последнем обмене. А `git pull` после rebase вольёт старые копии ваших коммитов обратно.',
              en: 'Rebase and `commit --amend` rewrite commits, so a plain `git push` is rejected: the server history is no longer a continuation of yours. You can push by force, but `--force` overwrites the whole branch — including other people’s commits that got there. `--force-with-lease` is safer: it overwrites the branch only if the server still has the state you saw at the last exchange. And `git pull` after a rebase merges the old copies of your commits back in.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'force-with-lease',
              prompt: {
                ru: 'Пока вы делали rebase, коллега запушил в вашу ветку. Что сделает `git push --force-with-lease`?',
                en: 'While you were rebasing, a colleague pushed to your branch. What will `git push --force-with-lease` do?',
              },
              options: [
                { text: { ru: 'Перезапишет коммит коллеги', en: 'Overwrite the colleague’s commit' } },
                { text: { ru: 'Сам сольёт ветки', en: 'Merge the branches by itself' } },
                { text: { ru: 'Откажется: ветка на сервере изменилась с последнего обмена', en: 'Refuse: the server branch changed since the last exchange' } },
              ],
              answer: 2,
              explanation: {
                ru: 'Lease — это «аренда»: Git проверяет, что на сервере ровно то, что вы видели. Чужой коммит её нарушает, и push отклоняется — сначала заберите изменения.',
                en: 'The lease checks that the server has exactly what you last saw. Someone else’s commit breaks it, so the push is rejected — fetch the changes first.',
              },
            },
          },
        ],
        test: ['git-remote-004'],
      },
    ],
    keyPoints: [
      { ru: '`origin/main` — копия сервера на момент последнего обмена.', en: '`origin/main` is the server copy as of the last exchange.' },
      { ru: '`fetch` только скачивает, `pull` ещё и вливает.', en: '`fetch` only downloads; `pull` also merges.' },
      { ru: '`-u` связывает ветку с удалённой.', en: '`-u` links a branch to its remote.' },
      { ru: '`pull --rebase` держит историю прямой.', en: '`pull --rebase` keeps history linear.' },
      { ru: 'После rebase — `push --force-with-lease`, а не `--force`.', en: 'After a rebase — `push --force-with-lease`, not `--force`.' },
    ],
    sources: [
      { title: 'Pro Git — Remote Branches', url: `${BOOK}/Git-Branching-Remote-Branches` },
      { title: 'Pro Git — Working with Remotes', url: `${BOOK}/Git-Basics-Working-with-Remotes` },
      { title: 'git-pull', url: `${DOCS}/git-pull` },
      { title: 'git-push — --force-with-lease', url: `${DOCS}/git-push` },
    ],
  },
  {
    tag: 'git-conflicts',
    format: 'steps',
    summary: {
      ru: 'Конфликт — не ошибка, а вопрос к вам: обе ветки изменили одно и то же место, и Git не знает, какой вариант правильный. Разобраться с ним — это четыре шага и пара флагов на случай, если хочется всё отменить.',
      en: 'A conflict isn’t an error but a question for you: both branches changed the same spot, and Git can’t tell which version is right. Dealing with it takes four steps and a couple of flags in case you want to back out.',
    },
    steps: [
      {
        id: 'origin',
        title: { ru: 'Откуда берётся конфликт', en: 'Where conflicts come from' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Git сливает изменения сам, пока ветки правили **разные** места файлов. Если обе ветки изменили одну и ту же строку, автоматически выбрать нельзя: слияние останавливается на конфликте. `git status --short` помечает такой файл `UU` — «не слит, изменён с обеих сторон». Список всех конфликтных файлов даёт `git diff --name-only --diff-filter=U`. Пока конфликты не решены, слияние не завершено.',
              en: 'Git merges changes by itself as long as the branches edited **different** spots. If both branches changed the same line, there’s no automatic choice: the merge stops on a conflict. `git status --short` marks such a file `UU` — “unmerged, both modified”. `git diff --name-only --diff-filter=U` lists all conflicted files. Until the conflicts are resolved, the merge isn’t finished.',
            },
          },
          {
            type: 'illustration',
            illustration: 'git-conflict-origin',
          },
        ],
        test: ['git-conflicts-001'],
      },
      {
        id: 'markers',
        title: { ru: 'Маркеры в файле', en: 'Markers in the file' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'В конфликтном файле Git оставляет обе версии между маркерами. Сверху, после `<<<<<<< HEAD`, — версия **текущей** ветки, в которую вы вливаете. Между `=======` и `>>>>>>> feature` — версия вливаемой ветки. Git ничего не выбирает за вас: оставьте одну из версий, обе или напишите третью.',
              en: 'In a conflicted file Git keeps both versions between markers. On top, after `<<<<<<< HEAD`, is the version of the **current** branch you’re merging into. Between `=======` and `>>>>>>> feature` is the incoming branch’s version. Git doesn’t choose for you: keep one version, both, or write a third.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'text',
              source: '<<<<<<< HEAD\nconst timeout = 3000;\n=======\nconst timeout = 5000;\n>>>>>>> feature',
            },
            caption: { ru: 'Сверху — `main`, куда вливаем, снизу — `feature`', en: 'Top: `main`, merged into; bottom: `feature`' },
          },
        ],
        test: ['git-conflicts-002'],
      },
      {
        id: 'resolve',
        title: { ru: 'Решить или отменить', en: 'Resolve or abort' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Конфликт решают так: открыть файл, оставить итоговый код и удалить все маркеры `<<<<<<<`, `=======`, `>>>>>>>` — иначе они попадут в коммит и сломают сборку. Потом `git add файл` помечает конфликт решённым, а `git commit` (или `git merge --continue`) завершает слияние. Если конфликтов слишком много и вы передумали, `git merge --abort` вернёт ветку, индекс и файлы к состоянию до `git merge`.',
              en: 'To resolve a conflict: open the file, keep the final code and delete every `<<<<<<<`, `=======`, `>>>>>>>` marker — or they end up in the commit and break the build. Then `git add file` marks the conflict resolved, and `git commit` (or `git merge --continue`) finishes the merge. If there are too many conflicts and you change your mind, `git merge --abort` returns the branch, index and files to how they were before `git merge`.',
            },
          },
          {
            type: 'code',
            code: {
              lang: 'bash',
              source: 'git add config.js\ngit merge --continue\n\n# or give up\ngit merge --abort',
            },
          },
          {
            type: 'check',
            check: {
              id: 'mark-resolved',
              prompt: {
                ru: 'Вы убрали маркеры и сохранили файл. Что ещё нужно, чтобы Git счёл конфликт решённым?',
                en: 'You removed the markers and saved the file. What else does Git need to treat the conflict as resolved?',
              },
              options: [
                { text: { ru: 'Ничего — Git видит сохранение', en: 'Nothing — Git sees the save' } },
                { text: { ru: '`git add` для этого файла', en: '`git add` for that file' } },
                { text: { ru: '`git merge --abort`', en: '`git merge --abort`' } },
              ],
              answer: 1,
              explanation: {
                ru: 'Конфликтный файл помечен в индексе как неслитый. `git add` записывает итоговую версию и снимает пометку, после чего слияние можно завершить. `--abort`, наоборот, выбросит всю работу.',
                en: 'The conflicted file is marked unmerged in the index. `git add` records the final version and clears the mark, so the merge can be finished. `--abort` would throw the work away instead.',
              },
            },
          },
        ],
        test: ['git-conflicts-003', 'git-conflicts-004'],
      },
      {
        id: 'ours-theirs',
        title: { ru: 'ours и theirs', en: 'ours and theirs' },
        blocks: [
          {
            type: 'text',
            text: {
              ru: 'Иногда нужна целиком одна из сторон: `git checkout --ours файл` или `--theirs`. При **merge** «ours» — ветка, в которой вы стоите, а «theirs» — та, которую вливаете. Коварство в том, что при **rebase** стороны меняются местами: «ours» — ветка, на которую переносят коммиты, а «theirs» — ваши собственные коммиты. Перед массовым `--ours` или `--theirs` проверьте результат в файле.',
              en: 'Sometimes you want one side entirely: `git checkout --ours file` or `--theirs`. During a **merge**, “ours” is the branch you’re on and “theirs” is the one being merged in. The catch: during a **rebase** the sides swap — “ours” is the branch your commits are being moved onto, and “theirs” is your own commits. Before a blanket `--ours` or `--theirs`, check the result in the file.',
            },
          },
          {
            type: 'check',
            check: {
              id: 'theirs-in-rebase',
              prompt: {
                ru: 'Вы делаете `git rebase main` в своей ветке и получили конфликт. Что окажется в файле после `git checkout --theirs`?',
                en: 'You run `git rebase main` on your branch and hit a conflict. What ends up in the file after `git checkout --theirs`?',
              },
              options: [
                { text: { ru: 'Версия из `main`', en: 'The version from `main`' } },
                { text: { ru: 'Ваша версия из переносимого коммита', en: 'Your version from the commit being moved' } },
                { text: { ru: 'Обе версии с маркерами', en: 'Both versions with markers' } },
              ],
              answer: 1,
              explanation: {
                ru: 'При rebase Git переносит ваши коммиты поверх `main`, поэтому «ours» — это `main`, а «theirs» — ваши коммиты. При обычном merge было бы наоборот.',
                en: 'In a rebase Git replays your commits on top of `main`, so “ours” is `main` and “theirs” is your commits. In a regular merge it’s the other way round.',
              },
            },
          },
        ],
        test: ['git-conflicts-006'],
      },
    ],
    keyPoints: [
      { ru: 'Конфликт — когда обе ветки изменили одни и те же строки.', en: 'A conflict means both branches changed the same lines.' },
      { ru: 'Над `=======` — текущая ветка, под ним — вливаемая.', en: 'Above `=======` is the current branch, below it the incoming one.' },
      { ru: 'Решили — убрать маркеры, `git add`, `git commit`; передумали — `git merge --abort`.', en: 'Resolved — remove markers, `git add`, `git commit`; changed your mind — `git merge --abort`.' },
      { ru: 'При rebase «ours» и «theirs» меняются местами.', en: 'In a rebase “ours” and “theirs” swap.' },
    ],
    sources: [
      { title: 'Pro Git — Basic Branching and Merging', url: `${BOOK}/Git-Branching-Basic-Branching-and-Merging` },
      { title: 'Pro Git — Advanced Merging', url: `${BOOK}/Git-Tools-Advanced-Merging` },
      { title: 'git-merge — How conflicts are presented', url: `${DOCS}/git-merge` },
    ],
  },
];
