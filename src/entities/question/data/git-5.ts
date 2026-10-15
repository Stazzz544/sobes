import type { Question } from '../model/types';

const DOCS = 'https://git-scm.com/docs';

const OUTPUT_PROMPT = { ru: 'Что выведет последняя команда? Впишите ответ.', en: 'What does the last command print? Type the answer.' };

export const GIT_QUESTIONS_5: Question[] = [
  {
    id: 'git-undo-013',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 2,
    popular: false,
    prompt: { ru: 'Что выведет последняя команда?', en: 'What does the last command print?' },
    code: {
      lang: 'bash',
      source: `git init -q
echo a > a.txt
git add a.txt
git commit -q -m "init"
echo first >> a.txt
git stash push -q -m "first"
echo second >> a.txt
git stash push -q -m "second"
git stash list --format=%gs`,
    },
    options: [
      { code: 'On main: first On main: second' },
      { code: 'On main: second On main: first' },
      { code: 'On main: second' },
      { code: 'On main: first' },
      { code: 'WIP on main: first WIP on main: second' },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Stash — это стек: последняя запись становится `stash@{0}` и выводится первой, более ранние сдвигаются вниз. `git stash pop` без аргументов берёт именно `stash@{0}`, а конкретную запись указывают явно: `git stash pop stash@{1}`. Без `-m` запись называется «WIP on main: <хеш> <сообщение коммита>», и через пару дней уже не вспомнить, что в ней, — поэтому сообщение стоит давать всегда.',
          en: 'The stash is a stack: the latest entry becomes `stash@{0}` and is listed first, older ones shift down. `git stash pop` without arguments takes `stash@{0}`; name a specific entry explicitly: `git stash pop stash@{1}`. Without `-m` the entry is called “WIP on main: <hash> <commit message>”, and in a couple of days you won’t remember what’s inside — so always give a message.',
        },
      },
    ],
    sources: [{ title: 'git-stash', url: `${DOCS}/git-stash` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-branches-011',
    kind: 'output',
    topic: 'git',
    tags: ['git-branches'],
    difficulty: 2,
    popular: true,
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
echo "$(git rev-list --count main..feature) $(git rev-list --count main...feature)"`,
    },
    answers: ['2 3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`main..feature` — коммиты, достижимые из `feature`, но не из `main`: то, что принесёт слияние, — `f1` и `f2`. Три точки `main...feature` — симметричная разность: коммиты, которые есть только в одной из веток, — ещё и `m1`. На практике `git log main..feature` показывает, что уйдёт в ревью, а `git diff main...feature` — изменения ветки относительно точки, где она отделилась, без чужих правок в `main`.',
          en: '`main..feature` means commits reachable from `feature` but not from `main`: what a merge would bring in — `f1` and `f2`. Three dots `main...feature` is the symmetric difference: commits in only one of the branches — `m1` as well. In practice `git log main..feature` shows what goes to review, and `git diff main...feature` shows the branch’s changes since it split off, without others’ changes in `main`.',
        },
      },
    ],
    sources: [{ title: 'gitrevisions — Specifying Ranges', url: `${DOCS}/gitrevisions` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-basics-012',
    kind: 'output',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo v1 > a.txt
git add a.txt
git commit -q -m "v1"
echo v2 > a.txt
git add a.txt
echo "diff: $(git diff --name-only)"
echo "cached: $(git diff --cached --name-only)"`,
    },
    answers: ['diff: cached: a.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git diff` без аргументов сравнивает рабочую копию с **индексом**, а не с последним коммитом. После `git add` они совпадают, и вывод пустой — частая причина паники «изменения пропали». Подготовленное к коммиту показывает `git diff --cached` (он же `--staged`): индекс против `HEAD`. Всё сразу относительно последнего коммита — `git diff HEAD`.',
          en: '`git diff` with no arguments compares the working tree with the **index**, not the last commit. After `git add` they match and the output is empty — a common cause of “my changes are gone” panic. What’s staged for commit is shown by `git diff --cached` (a.k.a. `--staged`): index versus `HEAD`. Everything relative to the last commit is `git diff HEAD`.',
        },
      },
    ],
    sources: [{ title: 'git-diff', url: `${DOCS}/git-diff` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-basics-013',
    kind: 'output',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "first"
git tag -a v1.0 -m "release 1.0"
git commit -q --allow-empty -m "fix"
git commit -q --allow-empty -m "docs"
git describe | cut -d- -f1,2`,
    },
    answers: ['v1.0-2'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git describe` находит ближайший тег в истории и пишет `<тег>-<сколько коммитов после него>-g<короткий хеш>`, здесь `v1.0-2-g…`. Так собирают версии для билдов между релизами. По умолчанию учитываются только аннотированные теги (`-a`); лёгкие — с флагом `--tags`. Если `HEAD` стоит ровно на теге, выводится просто `v1.0`.',
          en: '`git describe` finds the nearest tag in history and prints `<tag>-<commits since it>-g<short hash>`, here `v1.0-2-g…`. Builds between releases get their version this way. By default only annotated tags (`-a`) count; lightweight ones need `--tags`. If `HEAD` sits exactly on the tag, it prints just `v1.0`.',
        },
      },
    ],
    sources: [{ title: 'git-describe', url: `${DOCS}/git-describe` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-undo-014',
    kind: 'output',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "one"
git commit -q --allow-empty -m "two"
git reset -q --hard HEAD~1
echo "$(git log --oneline | wc -l) $(git reflog | wc -l)"`,
    },
    answers: ['1 3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git log` показывает историю, достижимую из текущего коммита, — после `reset` в ней остался один `one`. `git reflog` — журнал перемещений `HEAD` в **вашем** репозитории: два коммита и сам `reset`, всего три записи. Коммит `two` никуда не делся: его хеш есть в reflog, и `git reset --hard HEAD@{1}` вернёт его. Записи reflog локальные и по умолчанию живут около 90 дней.',
          en: '`git log` shows history reachable from the current commit — after the `reset` only `one` remains. `git reflog` is the journal of `HEAD` moves in **your** repository: two commits and the `reset` itself, three entries. Commit `two` hasn’t gone anywhere: its hash is in the reflog, and `git reset --hard HEAD@{1}` brings it back. Reflog entries are local and last about 90 days by default.',
        },
      },
    ],
    sources: [{ title: 'git-reflog', url: `${DOCS}/git-reflog` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-remote-007',
    kind: 'output',
    topic: 'git',
    tags: ['git-remote'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
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
git pull -q --ff-only origin main 2> /dev/null || echo "exit $?"
git log --format=%s`,
    },
    answers: ['exit 128 mine init'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`--ff-only` разрешает только перемотку вперёд. Ветки разошлись — у вас `mine`, на сервере `colleague`, — поэтому `pull` отказывается и выходит с кодом 128, ничего не меняя: в истории по-прежнему `mine` и `init`. Дальше выбор за вами: `git pull --rebase` или обычное слияние. Многие ставят `git config pull.ff only`, чтобы `pull` никогда молча не создавал merge-коммиты.',
          en: '`--ff-only` allows only a fast-forward. The branches have diverged — you have `mine`, the server has `colleague` — so `pull` refuses and exits with code 128 without changing anything: history still holds `mine` and `init`. The next step is your call: `git pull --rebase` or a regular merge. Many set `git config pull.ff only` so `pull` never silently creates merge commits.',
        },
      },
    ],
    sources: [{ title: 'git-pull', url: `${DOCS}/git-pull` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-basics-014',
    kind: 'output',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo v1 > old.txt
git add old.txt
git commit -q -m "create"
echo v2 >> old.txt
git commit -q -am "edit"
git mv old.txt new.txt
git commit -q -m "rename"
echo "$(git log --oneline -- new.txt | wc -l) $(git log --oneline --follow -- new.txt | wc -l)"`,
    },
    answers: ['1 3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git log -- путь` фильтрует коммиты, где менялся файл с **этим** именем, — до переименования `new.txt` не существовал, поэтому найден один коммит. `--follow` при переименовании продолжает искать по старому имени и показывает всю историю файла. Работает только для одного файла. То же касается `git blame`: он следует за переименованиями сам.',
          en: '`git log -- path` filters commits that changed a file with **this** name — `new.txt` didn’t exist before the rename, so one commit is found. `--follow` keeps searching under the old name across a rename and shows the file’s whole history. It works for a single file only. `git blame` follows renames on its own.',
        },
      },
    ],
    sources: [{ title: 'git-log: --follow', url: `${DOCS}/git-log` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-rebase-007',
    kind: 'output',
    topic: 'git',
    tags: ['git-rebase'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo base > base.txt
git add base.txt
git commit -q -m "base"
git switch -q -c topic
echo t > t.txt
git add t.txt
git commit -q -m "t1"
git switch -q -c feature
echo f > f.txt
git add f.txt
git commit -q -m "f1"
git rebase -q --onto main topic feature
git log --format=%s`,
    },
    answers: ['f1 base'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git rebase --onto main topic feature` берёт коммиты `feature`, которых нет в `topic`, — только `f1` — и переносит их на `main`. Коммит `t1` из ветки-основы в `feature` больше не попадает. Типичная ситуация: вы начали задачу от чужой ветки, ту ещё не влили, а вашу нужно отправить отдельно.',
          en: '`git rebase --onto main topic feature` takes the `feature` commits that aren’t in `topic` — only `f1` — and moves them onto `main`. Commit `t1` from the base branch no longer ends up in `feature`. A typical case: you started work off someone else’s branch, it isn’t merged yet, and yours has to go in separately.',
        },
      },
    ],
    sources: [{ title: 'git-rebase: --onto', url: `${DOCS}/git-rebase` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-rebase-008',
    kind: 'output',
    topic: 'git',
    tags: ['git-rebase'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "base"
echo a > a.txt
git add a.txt
git commit -q -m "add a"
echo b > b.txt
git add b.txt
git commit -q -m "add b"
echo fixed > a.txt
git commit -q -a --fixup HEAD~1
GIT_SEQUENCE_EDITOR=: git rebase -q -i --autosquash HEAD~3
git log --format=%s`,
    },
    answers: ['add b add a base'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git commit --fixup <коммит>` создаёт коммит с сообщением `fixup! add a`. При `rebase -i --autosquash` Git сам ставит его сразу после целевого коммита с действием `fixup` — исправление вливается в `add a`, а его сообщение отбрасывается. `GIT_SEQUENCE_EDITOR=:` принимает план без редактора. Так правки после ревью попадают в нужные коммиты, и история остаётся чистой.',
          en: '`git commit --fixup <commit>` creates a commit with the message `fixup! add a`. With `rebase -i --autosquash`, Git places it right after the target commit with the `fixup` action — the fix is folded into `add a` and its message is dropped. `GIT_SEQUENCE_EDITOR=:` accepts the plan without an editor. This is how review fixes land in the right commits and history stays clean.',
        },
      },
    ],
    sources: [
      { title: 'git-rebase: --autosquash', url: `${DOCS}/git-rebase` },
      { title: 'git-commit: --fixup', url: `${DOCS}/git-commit` },
    ],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-branches-012',
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
git switch -q main
git commit -q --allow-empty -m "m1"
git merge -q --no-ff feature -m "merge"
echo "$(git log -1 --format=%s HEAD^1) $(git log -1 --format=%s HEAD^2) $(git log -1 --format=%s HEAD~2)"`,
    },
    answers: ['m1 f1 base'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'У merge-коммита два родителя. `^n` выбирает n-го родителя: `HEAD^1` — ветка, **в которую** сливали (`m1`), `HEAD^2` — та, **которую** влили (`f1`). `~n` идёт n шагов назад только по первым родителям: `HEAD~2` = `HEAD^1^1` = `base`. Отсюда `git revert -m 1 <merge>` — отменить слияние, сохранив сторону основной ветки.',
          en: 'A merge commit has two parents. `^n` picks the n-th parent: `HEAD^1` is the branch merged **into** (`m1`), `HEAD^2` is the branch merged **in** (`f1`). `~n` walks n steps back along first parents only: `HEAD~2` = `HEAD^1^1` = `base`. Hence `git revert -m 1 <merge>` — undo a merge keeping the mainline side.',
        },
      },
    ],
    sources: [{ title: 'gitrevisions', url: `${DOCS}/gitrevisions` }],
    verify: { kind: 'shell-output' },
  },
];
