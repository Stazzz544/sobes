import type { Question } from '../model/types';

const BOOK = 'https://git-scm.com/book/en/v2';
const DOCS = 'https://git-scm.com/docs';

const OUTPUT_PROMPT = { ru: 'Что выведет последняя команда? Впишите ответ.', en: 'What does the last command print? Type the answer.' };

const CONFLICT_SETUP = `git init -q
echo red > theme.css
git add theme.css
git commit -q -m "base"
git switch -q -c feature
echo blue > theme.css
git commit -q -am "blue"
git switch -q main
echo green > theme.css
git commit -q -am "green"
git merge -q feature > /dev/null || true`;

export const GIT_QUESTIONS_3: Question[] = [
  {
    id: 'git-basics-006',
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
echo v3 > a.txt
git status --porcelain`,
    },
    answers: ['MM a.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'В коротком формате две колонки: первая — индекс относительно коммита, вторая — рабочая папка относительно индекса. `v2` попала в индекс (первая `M`), а `v3` есть только на диске (вторая `M`). Если сейчас сделать коммит, в него уйдёт `v2`, а не то, что вы видите в редакторе.',
          en: 'The short format has two columns: the first is the index vs the commit, the second is the working tree vs the index. `v2` is staged (first `M`), while `v3` exists only on disk (second `M`). Commit now, and `v2` goes in — not what you see in the editor.',
        },
      },
    ],
    sources: [{ title: 'git-status: Short Format', url: `${DOCS}/git-status` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-basics-007',
    kind: 'output',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo secret > .env
git add .env
git commit -q -m "add env"
git rm -q --cached .env
git status --porcelain`,
    },
    answers: ['D .env ?? .env'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git rm --cached` удаляет файл только из индекса: в следующем коммите он будет удалён из репозитория (`D`), но на диске останется и станет неотслеживаемым (`??`). Чтобы он не вернулся при следующем `git add .`, его добавляют в `.gitignore`. Старые коммиты с файлом при этом никуда не деваются.',
          en: '`git rm --cached` removes the file from the index only: the next commit deletes it from the repository (`D`), but it stays on disk as untracked (`??`). Add it to `.gitignore` so the next `git add .` doesn’t bring it back. Old commits still contain the file.',
        },
      },
    ],
    sources: [{ title: 'git-rm', url: `${DOCS}/git-rm` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-basics-008',
    kind: 'output',
    topic: 'git',
    tags: ['git-basics'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo v1 > a.txt
git add a.txt
git commit -q -m "v1"
echo v2 > a.txt
git show HEAD:a.txt`,
    },
    answers: ['v1'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git show <коммит>:<путь>` показывает файл таким, каким он был в коммите, не трогая рабочую папку. Так удобно посмотреть старую версию (`HEAD~3:src/app.ts`) или версию из другой ветки (`main:package.json`), не переключаясь.',
          en: '`git show <commit>:<path>` shows a file as it was in a commit without touching the working tree. It’s handy for viewing an old version (`HEAD~3:src/app.ts`) or another branch’s version (`main:package.json`) without switching.',
        },
      },
    ],
    sources: [{ title: 'git-show', url: `${DOCS}/git-show` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-branches-007',
    kind: 'output',
    topic: 'git',
    tags: ['git-branches'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
echo v1 > a.txt
git add a.txt
git commit -q -m "v1"
echo draft >> a.txt
git switch -q -c experiment
git status --porcelain`,
    },
    answers: ['M a.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Незакоммиченные изменения не принадлежат ветке — они лежат в рабочей папке и «переезжают» вместе с вами при переключении, если не конфликтуют с целевой веткой. Поэтому правка оказалась в `experiment`. Если переключение затронуло бы изменённый файл, Git откажется — тогда изменения коммитят или прячут в `stash`.',
          en: 'Uncommitted changes don’t belong to a branch — they live in the working tree and “move” with you when switching, as long as they don’t conflict with the target branch. That’s why the edit is now in `experiment`. If switching would touch the changed file, Git refuses — then commit or stash the changes.',
        },
      },
    ],
    sources: [{ title: 'git-switch', url: `${DOCS}/git-switch` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-rebase-005',
    kind: 'output',
    topic: 'git',
    tags: ['git-rebase'],
    difficulty: 2,
    popular: true,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "base"
git switch -q -c feature
echo f > f.txt
git add f.txt
git commit -q -m "feature"
before=$(git rev-parse HEAD)
git switch -q main
git commit -q --allow-empty -m "main moved"
git rebase -q main feature
[ "$before" = "$(git rev-parse HEAD)" ] && echo same || echo changed`,
    },
    answers: ['changed'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '[[rebase|Rebase]] не перемещает коммиты, а **создаёт новые** с теми же изменениями поверх другой базы — у них другой родитель, поэтому и другой хеш. Старые коммиты остаются в `reflog`. Отсюда правило: не делать rebase веток, которые уже забрали другие, — их история разойдётся с вашей.',
          en: '[[rebase|Rebase]] doesn’t move commits — it **creates new ones** with the same changes on a different base; they have a different parent, hence a different hash. The old commits stay in the `reflog`. Hence the rule: don’t rebase branches others have already pulled — their history will diverge from yours.',
        },
      },
    ],
    sources: [{ title: 'Pro Git — Rebasing: the perils', url: `${BOOK}/Git-Branching-Rebasing` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-rebase-006',
    kind: 'output',
    topic: 'git',
    tags: ['git-rebase', 'git-branches'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q
git commit -q --allow-empty -m "base"
git switch -q -c feature
git commit -q --allow-empty -m "wip"
git commit -q --allow-empty -m "hotfix"
git switch -q main
git cherry-pick --allow-empty feature > /dev/null
git log --format=%s`,
    },
    answers: ['hotfix base', 'hotfix, base'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`cherry-pick` копирует изменения одного коммита — здесь последнего в `feature` — как новый коммит в текущую ветку. Остальная ветка (`wip`) не переносится. Так забирают срочный фикс в релизную ветку. Копия получает новый хеш, поэтому при будущем слиянии `feature` Git увидит те же изменения ещё раз — обычно это проходит гладко, но может дать конфликт.',
          en: '`cherry-pick` copies one commit’s changes — here the tip of `feature` — as a new commit on the current branch. The rest of the branch (`wip`) isn’t brought over. That’s how an urgent fix gets into a release branch. The copy has a new hash, so a later merge of `feature` sees the same changes again — usually fine, but it can conflict.',
        },
      },
    ],
    sources: [{ title: 'git-cherry-pick', url: `${DOCS}/git-cherry-pick` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-undo-008',
    kind: 'output',
    topic: 'git',
    tags: ['git-undo'],
    difficulty: 1,
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
git revert --no-edit HEAD > /dev/null
git rev-list --count HEAD`,
    },
    answers: ['3'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git revert` не удаляет коммит из истории, а добавляет **новый**, который отменяет его изменения: коммитов стало три, а `b.txt` исчез из рабочей папки. История не переписывается, поэтому revert безопасен для общих веток, в отличие от `reset` и последующего `push --force`.',
          en: '`git revert` doesn’t remove a commit from history but adds a **new** one that undoes its changes: there are now three commits, and `b.txt` is gone from the working tree. History isn’t rewritten, so revert is safe for shared branches, unlike `reset` followed by `push --force`.',
        },
      },
    ],
    sources: [{ title: 'git-revert', url: `${DOCS}/git-revert` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-undo-009',
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
echo b > b.txt
echo c > c.txt
git add .
git restore --staged b.txt
git diff --cached --name-only`,
    },
    answers: ['c.txt'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`git restore --staged` убирает файл из индекса, не трогая его содержимое на диске: `b.txt` остался в папке, но в коммит не попадёт. `git diff --cached` показывает именно то, что войдёт в следующий коммит. Это современная замена `git reset HEAD <файл>`.',
          en: '`git restore --staged` removes a file from the index without touching its content on disk: `b.txt` stays in the folder but won’t be committed. `git diff --cached` shows exactly what goes into the next commit. It’s the modern replacement for `git reset HEAD <file>`.',
        },
      },
    ],
    sources: [{ title: 'git-restore', url: `${DOCS}/git-restore` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-remote-005',
    kind: 'output',
    topic: 'git',
    tags: ['git-remote'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: {
      lang: 'bash',
      source: `git init -q --bare ../origin.git
git clone -q ../origin.git app 2> /dev/null
cd app
git commit -q --allow-empty -m "init"
git push -q -u origin main
git switch -q -c feature
git commit -q --allow-empty -m "feature"
git push -q -u origin feature
git status -sb`,
    },
    answers: ['## feature...origin/feature'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`-u` (`--set-upstream`) связывает локальную ветку с удалённой: после этого `git status` сравнивает их, а `git pull` и `git push` без аргументов знают, куда идти. Ветки на одном уровне — нет ни «ahead», ни «behind». Чтобы не писать `-u` для каждой новой ветки, есть настройка `push.autoSetupRemote = true`.',
          en: '`-u` (`--set-upstream`) links the local branch to the remote one: then `git status` compares them, and plain `git pull` and `git push` know where to go. The branches are level — neither “ahead” nor “behind”. To avoid typing `-u` for each new branch, set `push.autoSetupRemote = true`.',
        },
      },
    ],
    sources: [{ title: 'git-push', url: `${DOCS}/git-push` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-conflicts-005',
    kind: 'output',
    topic: 'git',
    tags: ['git-conflicts'],
    difficulty: 2,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: { lang: 'bash', source: `${CONFLICT_SETUP}\ngit status --porcelain` },
    answers: ['UU theme.css'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обе ветки поменяли одну строку — слияние остановилось. `UU` — «unmerged, изменён с обеих сторон»: файл содержит маркеры `<<<<<<<`, `=======`, `>>>>>>>`. Список таких файлов даёт `git diff --name-only --diff-filter=U`. После правки файл добавляют через `git add` и завершают слияние `git commit` (или `git merge --continue`).',
          en: 'Both branches changed the same line — the merge stopped. `UU` means “unmerged, both modified”: the file contains `<<<<<<<`, `=======`, `>>>>>>>` markers. `git diff --name-only --diff-filter=U` lists such files. After fixing, `git add` the file and finish with `git commit` (or `git merge --continue`).',
        },
      },
    ],
    sources: [{ title: 'Pro Git — Basic Merge Conflicts', url: `${BOOK}/Git-Branching-Basic-Branching-and-Merging` }],
    verify: { kind: 'shell-output' },
  },
  {
    id: 'git-conflicts-006',
    kind: 'output',
    topic: 'git',
    tags: ['git-conflicts'],
    difficulty: 3,
    popular: false,
    prompt: OUTPUT_PROMPT,
    code: { lang: 'bash', source: `${CONFLICT_SETUP}\ngit checkout --theirs theme.css\ncat theme.css` },
    answers: ['blue'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'При `merge` «ours» — ветка, в которой вы стоите (`main`, `green`), а «theirs» — та, которую вливаете (`feature`, `blue`). Коварство в том, что при `rebase` стороны меняются местами: «ours» — ветка, на которую переносят коммиты, а «theirs» — ваши собственные коммиты. Перед массовым `--ours`/`--theirs` стоит проверить содержимое.',
          en: 'In a `merge`, “ours” is the branch you’re on (`main`, `green`), and “theirs” is the one being merged in (`feature`, `blue`). The catch: during `rebase` the sides swap — “ours” is the branch you’re replaying onto, and “theirs” is your own commits. Check the content before a blanket `--ours`/`--theirs`.',
        },
      },
    ],
    sources: [{ title: 'git-checkout: --ours / --theirs', url: `${DOCS}/git-checkout` }],
    verify: { kind: 'shell-output' },
  },
];
