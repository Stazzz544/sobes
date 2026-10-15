import type { Question } from '../model/types';

const BOOK = 'https://git-scm.com/book/en/v2';
const DOCS = 'https://git-scm.com/docs';

const OUTPUT_PROMPT = { ru: 'Что выведет последняя команда? Впишите ответ.', en: 'What does the last command print? Type the answer.' };

export const GIT_QUESTIONS_4: Question[] = [
  {
    id: 'git-basics-009',
    kind: 'output',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo hello > old.txt
git add old.txt
git commit -q -m "add"
git mv old.txt new.txt
git status --porcelain`,
    },
    answers: ['R old.txt -> new.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Git не хранит переименования отдельно — он сравнивает содержимое и **догадывается**: удалённый и новый файл с похожим текстом показываются как `R` (renamed). `git mv` — просто короткая запись для переименования на диске плюс `git add`/`git rm`. Если сильно изменить файл одновременно с переименованием, Git может увидеть удаление и новый файл, поэтому переименование лучше делать отдельным коммитом.',
          en: 'Git doesn’t store renames separately — it compares content and **infers** them: a deleted and a new file with similar text show as `R` (renamed). `git mv` is just shorthand for renaming on disk plus `git add`/`git rm`. Change the file heavily in the same commit and Git may see a delete plus a new file, so rename in a separate commit.',
        },
      },
    ],
    sources: [{ title: 'git-mv', url: `${DOCS}/git-mv` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-basics-010',
    kind: 'output',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
printf '*.log\\n!keep.log\\n' > .gitignore
touch debug.log error.log keep.log
git status --porcelain`,
    },
    answers: ['?? .gitignore ?? keep.log'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Правила `.gitignore` читаются сверху вниз, и последнее подходящее побеждает: `*.log` игнорирует все логи, а `!keep.log` возвращает один обратно. Ограничение: исключение не сработает, если проигнорирована вся папка, где лежит файл, — Git туда даже не заглядывает. Сам `.gitignore` — обычный файл, его коммитят.',
          en: '`.gitignore` rules are read top to bottom, and the last matching one wins: `*.log` ignores all logs, while `!keep.log` brings one back. A limitation: negation doesn’t work if the file’s whole folder is ignored — Git doesn’t even look inside. `.gitignore` itself is a regular file you commit.',
        },
      },
    ],
    sources: [{ title: 'gitignore: pattern format', url: `${DOCS}/gitignore` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-basics-011',
    kind: 'output',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "release"
git tag v1.0
git tag -a v1.1 -m "Release 1.1"
echo "$(git cat-file -t v1.0) $(git cat-file -t v1.1)"`,
    },
    answers: ['commit tag'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Лёгкий** тег — просто имя, указывающее на коммит. **Аннотированный** (`-a`) — отдельный объект Git со своим автором, датой, сообщением и возможной подписью, который уже указывает на коммит. Для релизов используют аннотированные: их видит `git describe`, а `git push --follow-tags` отправляет только их.',
          en: 'A **lightweight** tag is just a name pointing at a commit. An **annotated** tag (`-a`) is a separate Git object with its own author, date, message and optional signature, which in turn points at the commit. Use annotated tags for releases: `git describe` sees them, and `git push --follow-tags` pushes only those.',
        },
      },
    ],
    sources: [{ title: 'Pro Git — Tagging', url: `${BOOK}/Git-Basics-Tagging` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-branches-008',
    kind: 'output',
    topic: 'git',
    tags: ['git-branches'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "one"
git commit -q --allow-empty -m "two"
git switch -q --detach HEAD~1
git rev-parse --abbrev-ref HEAD`,
    },
    answers: ['HEAD'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**Detached HEAD**: `HEAD` указывает прямо на коммит, а не на ветку, поэтому имя ветки — просто `HEAD`. Смотреть старое состояние так можно, но новые коммиты не попадут ни в одну ветку и потеряются после переключения (останутся только в `reflog`). Если начали работу в таком состоянии — сохраните её: `git switch -c новая-ветка`.',
          en: '**Detached HEAD**: `HEAD` points straight at a commit, not a branch, so the branch name is just `HEAD`. It’s fine for viewing an old state, but new commits belong to no branch and get lost after switching (they remain only in the `reflog`). If you started work this way, save it: `git switch -c new-branch`.',
        },
      },
    ],
    sources: [{ title: 'git-switch: --detach', url: `${DOCS}/git-switch` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-branches-009',
    kind: 'output',
    topic: 'git',
    tags: ['git-branches'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "base"
git switch -q -c feature
git commit -q --allow-empty -m "unfinished"
git switch -q main
git branch -d feature > /dev/null 2>&1 && echo deleted || echo kept`,
    },
    answers: ['kept'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git branch -d` удаляет ветку, только если её коммиты уже есть в текущей ветке или в её upstream. Здесь `unfinished` нигде больше нет, поэтому Git отказывается — это защита от потери работы. Удалить принудительно можно через `-D`, а после squash-слияния это единственный способ, ведь Git не считает такую ветку слитой.',
          en: '`git branch -d` deletes a branch only if its commits are already in the current branch or its upstream. Here `unfinished` exists nowhere else, so Git refuses — a guard against losing work. Force deletion with `-D`; after a squash merge that’s the only way, since Git doesn’t consider such a branch merged.',
        },
      },
    ],
    sources: [{ title: 'git-branch', url: `${DOCS}/git-branch` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-branches-010',
    kind: 'output',
    topic: 'git',
    tags: ['git-branches', 'git-rebase'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "base"
git switch -q -c feature
git commit -q --allow-empty -m "feature"
git switch -q main
git commit -q --allow-empty -m "hotfix"
git merge --ff-only feature > /dev/null 2>&1 && echo merged || echo refused`,
    },
    answers: ['refused'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`--ff-only` разрешает слияние только перемоткой вперёд — когда текущая ветка целиком содержится в вливаемой. Здесь ветки разошлись (в `main` есть `hotfix`), поэтому без коммита слияния не обойтись, и Git отказывается. Так держат историю линейной: сначала `git rebase main` в ветке, потом перемотка. Многие ставят `pull.ff = only`, чтобы `git pull` не создавал случайных merge-коммитов.',
          en: '`--ff-only` allows only a fast-forward merge — when the current branch is fully contained in the incoming one. Here the branches diverged (`main` has `hotfix`), so a merge commit would be needed, and Git refuses. That keeps history linear: `git rebase main` on the branch first, then fast-forward. Many set `pull.ff = only` so `git pull` doesn’t create accidental merge commits.',
        },
      },
    ],
    sources: [{ title: 'git-merge: --ff-only', url: `${DOCS}/git-merge` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-undo-010',
    kind: 'output',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo a > a.txt
git add a.txt
git commit -q -m "a"
echo b > b.txt
git add b.txt
git commit -q -m "b"
git reset -q HEAD~1
git status --porcelain`,
    },
    answers: ['?? b.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git reset` без флага — это `--mixed`: коммит отменяется, файлы на диске остаются, но индекс сбрасывается, поэтому новый `b.txt` стал неотслеживаемым. Сравните: `--soft` оставил бы изменения в индексе (`A b.txt`), а `--hard` удалил бы их совсем. `--mixed` удобен, чтобы пересобрать коммит заново по частям.',
          en: '`git reset` without a flag is `--mixed`: the commit is undone, files stay on disk, but the index is reset, so the new `b.txt` is untracked. Compare: `--soft` would keep changes staged (`A b.txt`), and `--hard` would delete them entirely. `--mixed` is handy for rebuilding a commit piece by piece.',
        },
      },
    ],
    sources: [{ title: 'git-reset', url: `${DOCS}/git-reset` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-undo-011',
    kind: 'output',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 1,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo a > a.txt
git add a.txt
git commit -q -m "a"
touch tmp.txt
git clean -n`,
    },
    answers: ['Would remove tmp.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git clean` удаляет **неотслеживаемые** файлы — безвозвратно, их нет ни в коммитах, ни в корзине. Поэтому сначала смотрят список с `-n` (dry run), а удаляют уже `-f`. `-d` добавляет папки, `-x` — ещё и игнорируемые файлы вроде `node_modules` и сборок. Отслеживаемые файлы `clean` не трогает — для них есть `git restore`.',
          en: '`git clean` deletes **untracked** files — permanently: they’re in no commit and no trash. So first look at the list with `-n` (dry run), then delete with `-f`. `-d` adds folders, `-x` also ignored files like `node_modules` and builds. `clean` doesn’t touch tracked files — that’s what `git restore` is for.',
        },
      },
    ],
    sources: [{ title: 'git-clean', url: `${DOCS}/git-clean` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-undo-012',
    kind: 'output',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "first"
git commit -q --allow-empty -m "second"
git reset -q --hard HEAD~1
git reset -q --hard HEAD@{1}
git log -1 --format=%s`,
    },
    answers: ['second'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`reflog` записывает каждое перемещение `HEAD`, и `HEAD@{1}` — его положение шагом раньше, то есть до неудачного `reset`. Возврат туда восстанавливает «потерянный» коммит. Записи reflog хранятся локально и по умолчанию живут около 90 дней, а в чужой клон они не попадают — поэтому спасти можно только то, что было в вашем репозитории.',
          en: 'The `reflog` records every move of `HEAD`, and `HEAD@{1}` is its position one step earlier — before the bad `reset`. Resetting there restores the “lost” commit. Reflog entries are local and by default live about 90 days, and they don’t travel to other clones — so you can only rescue what was in your own repository.',
        },
      },
    ],
    sources: [{ title: 'git-reflog', url: `${DOCS}/git-reflog` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-remote-006',
    kind: 'output',
    topic: 'git',
    tags: ['git-remote', 'git-rebase'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Вы и коллега закоммитили в `main` одновременно. Сколько merge-коммитов будет в истории после `pull --rebase`? Впишите число.',
      en: 'You and a colleague committed to `main` at the same time. How many merge commits will history have after `pull --rebase`? Type the number.',
    },
    code: {
      lang: 'bash',
      source: `git init -q --bare ../origin.git
git clone -q ../origin.git me 2> /dev/null
git clone -q ../origin.git colleague 2> /dev/null
cd me
git commit -q --allow-empty -m "init"
git push -q -u origin main
cd ../colleague
git pull -q origin main
git commit -q --allow-empty -m "colleague"
git push -q origin main
cd ../me
git commit -q --allow-empty -m "mine"
git pull -q --rebase origin main
git log --merges --oneline | wc -l`,
    },
    answers: ['0'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обычный `git pull` при разошедшихся ветках создаёт merge-коммит «Merge branch main of …» — история обрастает узлами без смысла. `pull --rebase` переносит ваши локальные коммиты поверх свежего `origin/main`, и история остаётся прямой: `init → colleague → mine`. Это безопасно, пока ваши коммиты ещё никуда не отправлены. Включить по умолчанию: `git config pull.rebase true`.',
          en: 'A plain `git pull` on diverged branches creates a “Merge branch main of …” commit — history fills up with meaningless knots. `pull --rebase` replays your local commits on top of the fresh `origin/main`, keeping history linear: `init → colleague → mine`. It’s safe while your commits haven’t been pushed yet. Make it the default: `git config pull.rebase true`.',
        },
      },
    ],
    sources: [{ title: 'git-pull: --rebase', url: `${DOCS}/git-pull` }],
    verify: { kind: 'shell-output' },
  },
];
