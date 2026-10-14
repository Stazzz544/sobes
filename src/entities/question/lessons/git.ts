import type { Lesson } from '../model/types';

const BOOK = 'https://git-scm.com/book/en/v2';
const DOCS = 'https://git-scm.com/docs';

export const GIT_LESSONS: Lesson[] = [
  {
    tag: 'git-basics',
    summary: {
      ru: 'У файла в Git три состояния: изменён в рабочей копии, подготовлен в индексе, зафиксирован в коммите. `git add` переносит снимок файла в индекс, `git commit` — индекс в историю.',
      en: 'A file in Git has three states: modified in the working tree, staged in the index, committed. `git add` copies a snapshot of the file to the index, `git commit` turns the index into history.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`git add` кладёт в индекс **текущее содержимое** файла. Если после этого файл снова изменить, в коммит попадёт версия на момент `add`, а новые правки останутся в рабочей копии — `git status --short` покажет `AM` или `MM`.',
          en: '`git add` puts the **current content** of a file into the index. If you edit the file again afterwards, the commit gets the version from the moment of `add`, and the new edits stay in the working tree — `git status --short` shows `AM` or `MM`.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'bash',
          source: `git status --short
# ?? new.js     untracked
# A  added.js   staged new file
#  M edited.js  modified, not staged
# AM both.js    staged, then edited again`,
        },
        caption: { ru: 'Левая колонка — индекс, правая — рабочая копия', en: 'Left column — the index, right column — the working tree' },
      },
      {
        type: 'text',
        text: {
          ru: '`git commit -a` сам добавляет изменения **отслеживаемых** файлов, но новые файлы пропускает. `.gitignore` действует только на неотслеживаемые файлы: уже закоммиченный файл перестанет отслеживаться только после `git rm --cached`.',
          en: '`git commit -a` stages changes to **tracked** files automatically but skips new files. `.gitignore` only affects untracked files: an already committed file stops being tracked only after `git rm --cached`.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Рабочая копия → `git add` → индекс → `git commit` → история.', en: 'Working tree → `git add` → index → `git commit` → history.' },
      { ru: 'В коммит попадает версия файла на момент `git add`.', en: 'A commit gets the file version from the moment of `git add`.' },
      { ru: '`commit -a` не добавляет новые файлы.', en: '`commit -a` doesn’t add new files.' },
      { ru: '`.gitignore` не действует на уже отслеживаемые файлы.', en: '`.gitignore` doesn’t affect already tracked files.' },
    ],
    sources: [
      { title: 'Pro Git — Recording Changes to the Repository', url: `${BOOK}/Git-Basics-Recording-Changes-to-the-Repository` },
      { title: 'git-status — Short Format', url: `${DOCS}/git-status` },
      { title: 'gitignore', url: `${DOCS}/gitignore` },
    ],
  },
  {
    tag: 'git-branches',
    summary: {
      ru: 'Ветка — подвижный указатель на коммит, `HEAD` — указатель на текущую ветку. Слияние без расхождений — перемотка указателя, с расхождением — коммит слияния.',
      en: 'A branch is a movable pointer to a commit; `HEAD` points to the current branch. Merging without divergence just moves the pointer; with divergence it creates a merge commit.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Создать ветку — дёшево: это файл с хешем коммита. При новом коммите текущая ветка (на которую указывает `HEAD`) сдвигается на него.',
          en: 'Creating a branch is cheap: it’s a file containing a commit hash. A new commit moves the current branch (the one `HEAD` points to) forward.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Если в `main` не было своих коммитов после ответвления, `git merge feature` делает **fast-forward**: просто передвигает `main` на последний коммит `feature`, без коммита слияния. `--no-ff` заставляет создать коммит слияния, чтобы в истории осталась граница фичи.',
          en: 'If `main` has no commits of its own since the branch point, `git merge feature` does a **fast-forward**: it simply moves `main` to the tip of `feature`, with no merge commit. `--no-ff` forces a merge commit so the feature boundary stays in history.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Ветка — указатель на коммит, `HEAD` — на текущую ветку.', en: 'A branch points to a commit, `HEAD` to the current branch.' },
      { ru: 'Fast-forward не создаёт коммит слияния.', en: 'A fast-forward doesn’t create a merge commit.' },
      { ru: '`--no-ff` всегда создаёт коммит слияния.', en: '`--no-ff` always creates a merge commit.' },
    ],
    sources: [
      { title: 'Pro Git — Branches in a Nutshell', url: `${BOOK}/Git-Branching-Branches-in-a-Nutshell` },
      { title: 'Pro Git — Basic Branching and Merging', url: `${BOOK}/Git-Branching-Basic-Branching-and-Merging` },
    ],
  },
  {
    tag: 'git-rebase',
    summary: {
      ru: '`rebase` переносит коммиты ветки поверх другой, создавая их копии с новыми хешами. `cherry-pick` копирует отдельные коммиты.',
      en: '`rebase` replays a branch’s commits on top of another, creating copies with new hashes. `cherry-pick` copies individual commits.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'После `git rebase main` коммиты фичи оказываются **после** всех коммитов `main`: история линейная, как будто работу начали только сейчас. Хеши меняются, поэтому уже опубликованные коммиты, на которых работают другие, не ребейзят.',
          en: 'After `git rebase main` the feature commits come **after** all of `main`’s commits: history is linear, as if the work started just now. Hashes change, so you don’t rebase published commits others build on.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`git cherry-pick <коммит>` копирует **один** указанный коммит на текущую ветку; если передать имя ветки — берётся только её последний коммит. `git rebase -i` позволяет переупорядочить, объединить (`squash`) или переписать коммиты перед публикацией.',
          en: '`git cherry-pick <commit>` copies **one** given commit onto the current branch; if you pass a branch name, only its tip is taken. `git rebase -i` lets you reorder, combine (`squash`) or reword commits before publishing.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Rebase создаёт новые коммиты с новыми хешами.', en: 'Rebase creates new commits with new hashes.' },
      { ru: 'Не ребейзят коммиты, которые уже используют другие.', en: 'Don’t rebase commits others already use.' },
      { ru: '`cherry-pick ветка` берёт только последний коммит ветки.', en: '`cherry-pick branch` takes only the branch tip.' },
      { ru: '`rebase -i` — навести порядок в своих коммитах до пуша.', en: '`rebase -i` — tidy your own commits before pushing.' },
    ],
    sources: [
      { title: 'Pro Git — Rebasing', url: `${BOOK}/Git-Branching-Rebasing` },
      { title: 'Pro Git — Rewriting History', url: `${BOOK}/Git-Tools-Rewriting-History` },
      { title: 'git-cherry-pick', url: `${DOCS}/git-cherry-pick` },
    ],
  },
  {
    tag: 'git-undo',
    summary: {
      ru: '`restore` откатывает файлы, `reset` двигает ветку назад, `revert` создаёт отменяющий коммит. Почти всё «потерянное» можно найти в `reflog`.',
      en: '`restore` reverts files, `reset` moves the branch back, `revert` creates an undoing commit. Almost anything “lost” can be found in the `reflog`.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`git restore файл` возвращает файл к версии из индекса — несохранённые правки пропадают. `git reset` двигает текущую ветку на другой коммит: `--soft` оставляет изменения в индексе, `--mixed` (по умолчанию) — в рабочей копии, `--hard` удаляет их совсем.',
          en: '`git restore file` brings a file back to the indexed version — unsaved edits are gone. `git reset` moves the current branch to another commit: `--soft` keeps the changes staged, `--mixed` (default) keeps them in the working tree, `--hard` discards them entirely.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`reset` переписывает историю — для коммитов в общей ветке используют `git revert`. Если `reset --hard` убрал нужный коммит, его хеш есть в `git reflog` — журнале перемещений `HEAD`, и ветку можно вернуть на него.',
          en: '`reset` rewrites history — for commits on a shared branch use `git revert`. If `reset --hard` removed a commit you need, its hash is in `git reflog` — the log of `HEAD` movements — and you can move the branch back to it.',
        },
      },
    ],
    keyPoints: [
      { ru: '`restore` — откатить файл, `reset` — сдвинуть ветку.', en: '`restore` reverts a file, `reset` moves the branch.' },
      { ru: '`--soft` / `--mixed` / `--hard`: индекс / рабочая копия / ничего не остаётся.', en: '`--soft` / `--mixed` / `--hard`: staged / in the working tree / nothing kept.' },
      { ru: 'Общие коммиты отменяют через `revert`.', en: 'Shared commits are undone with `revert`.' },
      { ru: '`reflog` помнит, где был `HEAD`.', en: '`reflog` remembers where `HEAD` was.' },
    ],
    sources: [
      { title: 'Pro Git — Undoing Things', url: `${BOOK}/Git-Basics-Undoing-Things` },
      { title: 'Pro Git — Reset Demystified', url: `${BOOK}/Git-Tools-Reset-Demystified` },
      { title: 'git-reflog', url: `${DOCS}/git-reflog` },
    ],
  },
  {
    tag: 'git-remote',
    summary: {
      ru: '`origin/main` — локальная копия состояния удалённой ветки. `fetch` обновляет её, `pull` = `fetch` + слияние, `push` отправляет ваши коммиты.',
      en: '`origin/main` is a local copy of the remote branch’s state. `fetch` updates it, `pull` = `fetch` + merge, `push` sends your commits.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '`git fetch` скачивает новые коммиты и двигает `origin/main`, но вашу ветку и файлы не трогает. После него `git status -sb` покажет `[behind 1]` или `[ahead 1]` — сравнение с последним известным состоянием сервера, а не с сервером в реальном времени.',
          en: '`git fetch` downloads new commits and moves `origin/main` but doesn’t touch your branch or files. Afterwards `git status -sb` shows `[behind 1]` or `[ahead 1]` — a comparison with the last known server state, not the live server.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Если история на сервере ушла вперёд, обычный `push` откажется. После своего rebase ветку пушат с `--force-with-lease`: в отличие от `--force`, он не перезапишет чужие коммиты, которых вы ещё не видели.',
          en: 'If the server history moved ahead, a plain `push` is rejected. After your own rebase you push with `--force-with-lease`: unlike `--force`, it won’t overwrite others’ commits you haven’t seen yet.',
        },
      },
    ],
    keyPoints: [
      { ru: '`fetch` обновляет `origin/*`, не трогая ваши файлы.', en: '`fetch` updates `origin/*` without touching your files.' },
      { ru: '`pull` = `fetch` + `merge` (или `rebase`).', en: '`pull` = `fetch` + `merge` (or `rebase`).' },
      { ru: '`ahead`/`behind` считаются от последнего `fetch`.', en: '`ahead`/`behind` are counted from the last `fetch`.' },
      { ru: '`--force-with-lease` вместо `--force`.', en: '`--force-with-lease` instead of `--force`.' },
    ],
    sources: [
      { title: 'Pro Git — Remote Branches', url: `${BOOK}/Git-Branching-Remote-Branches` },
      { title: 'Pro Git — Working with Remotes', url: `${BOOK}/Git-Basics-Working-with-Remotes` },
      { title: 'git-push — --force-with-lease', url: `${DOCS}/git-push` },
    ],
  },
  {
    tag: 'git-conflicts',
    summary: {
      ru: 'Конфликт — когда обе ветки изменили одни и те же строки. Git помечает их маркерами, а решение — отредактировать файл, `git add` и завершить слияние.',
      en: 'A conflict happens when both branches changed the same lines. Git marks them with markers; you resolve by editing the file, `git add` and finishing the merge.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Между `<<<<<<< HEAD` и `=======` — версия **текущей** ветки (куда вливаете), между `=======` и `>>>>>>> feature` — версия вливаемой. `git status` показывает такие файлы как `UU` — изменены обеими сторонами и не слиты.',
          en: 'Between `<<<<<<< HEAD` and `=======` is the **current** branch’s version (the one you merge into); between `=======` and `>>>>>>> feature` is the incoming one. `git status` shows such files as `UU` — changed by both sides and unmerged.',
        },
      },
      {
        type: 'code',
        code: {
          lang: 'bash',
          source: `git merge feature   # CONFLICT in theme.css
# edit theme.css, remove the markers
git add theme.css
git commit          # or: git merge --continue`,
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Передумали сливать — `git merge --abort` вернёт всё к состоянию до слияния. Частые небольшие слияния и короткоживущие ветки делают конфликты редкими и простыми.',
          en: 'Changed your mind — `git merge --abort` returns everything to the pre-merge state. Frequent small merges and short-lived branches keep conflicts rare and simple.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Сверху (`HEAD`) — текущая ветка, снизу — вливаемая.', en: 'Top (`HEAD`) is the current branch, bottom is the incoming one.' },
      { ru: 'Разрешение: правка файла → `git add` → коммит.', en: 'Resolution: edit the file → `git add` → commit.' },
      { ru: '`git merge --abort` отменяет слияние.', en: '`git merge --abort` cancels the merge.' },
    ],
    sources: [
      { title: 'Pro Git — Basic Branching and Merging', url: `${BOOK}/Git-Branching-Basic-Branching-and-Merging` },
      { title: 'Pro Git — Advanced Merging', url: `${BOOK}/Git-Tools-Advanced-Merging` },
      { title: 'git-merge — How conflicts are presented', url: `${DOCS}/git-merge` },
    ],
  },
];
