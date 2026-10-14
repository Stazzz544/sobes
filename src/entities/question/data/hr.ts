import type { Question } from '../model/types';

const WIKI = 'https://en.wikipedia.org/wiki';
const HARVARD_INTERVIEWING = 'https://careerservices.fas.harvard.edu/resources/interviewing/';
const MIT_STAR = 'https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/';
const MUSE_ABOUT = 'https://www.themuse.com/advice/tell-me-about-yourself-interview-question-answer-examples';
const REWORK = 'https://rework.withgoogle.com/guides/hiring-use-structured-interviewing/steps/introduction/';

export const HR_QUESTIONS: Question[] = [
  {
    id: 'hr-self-presentation-001',
    topic: 'hr',
    tags: ['self-presentation'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Junior без коммерческого опыта начинает ответ на «Расскажите о себе». Какое начало сильнее?',
      en: 'A junior without commercial experience starts answering “Tell me about yourself”. Which opening is stronger?',
    },
    options: [
      { text: { ru: '«Я родился в Твери, с детства любил компьютеры…»', en: '“I was born in Tver and loved computers since childhood…”' } },
      {
        text: {
          ru: '«Сейчас делаю пет-проекты на React и TypeScript: последний — трекер привычек, им пользуются 40 человек…»',
          en: '“Right now I build pet projects with React and TypeScript: the latest is a habit tracker with 40 users…”',
        },
      },
      { text: { ru: '«Всё написано в резюме, могу ответить на вопросы»', en: '“It’s all in my résumé, happy to answer questions”' } },
      { text: { ru: '«Я ответственный, коммуникабельный и стрессоустойчивый»', en: '“I’m responsible, communicative and stress-resistant”' } },
      { text: { ru: '«Ищу любую работу в IT, где стабильно платят»', en: '“I’m looking for any IT job with a steady salary”' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сильное начало — **настоящее** с конкретикой: чем занимаетесь сейчас, на каком стеке и с каким результатом. Это сразу даёт интервьюеру темы для вопросов.',
          en: 'A strong opening is the **present** with specifics: what you do now, with which stack and what result. It immediately gives the interviewer topics to ask about.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Биография с детства тратит время, «всё в резюме» звучит как нежелание говорить, список качеств без фактов ничего не доказывает, а «любая работа» показывает, что эта вакансия не особенная.',
          en: 'A biography from childhood wastes time, “it’s in my résumé” sounds unwilling, a list of traits without facts proves nothing, and “any job” shows this role isn’t special.',
        },
      },
    ],
    sources: [{ title: 'The Muse — How to answer “Tell me about yourself”', url: MUSE_ABOUT }],
  },
  {
    id: 'hr-self-presentation-002',
    kind: 'order',
    topic: 'hr',
    tags: ['self-presentation'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Расставьте части ответа на «Расскажите о себе» в рекомендуемом порядке.',
      en: 'Put the parts of a “Tell me about yourself” answer in the recommended order.',
    },
    items: [
      { text: { ru: 'Чем занимаетесь сейчас и недавнее достижение', en: 'What you do now and a recent achievement' } },
      { text: { ru: 'Как пришли к этому и какой опыт пригодится', en: 'How you got here and which experience is relevant' } },
      { text: { ru: 'Чего хотите дальше и почему эта компания', en: 'What you want next and why this company' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Формула **настоящее → прошлое → будущее**: начать с актуального, коротко объяснить путь и закончить тем, почему эта роль — логичный следующий шаг. Финал сам подводит к разговору о вакансии.',
          en: 'The **present → past → future** formula: start with what’s current, briefly explain the path and finish with why this role is the logical next step. The ending leads naturally into the job itself.',
        },
      },
    ],
    sources: [{ title: 'The Muse — How to answer “Tell me about yourself”', url: MUSE_ABOUT }],
  },
  {
    id: 'hr-self-presentation-003',
    topic: 'hr',
    tags: ['self-presentation'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Сколько обычно должен длиться ответ на «Расскажите о себе»?',
      en: 'How long should an answer to “Tell me about yourself” usually be?',
    },
    options: [
      { text: { ru: '10–15 секунд', en: '10–15 seconds' } },
      { text: { ru: '1–2 минуты', en: '1–2 minutes' } },
      { text: { ru: '5–7 минут', en: '5–7 minutes' } },
      { text: { ru: 'Пока интервьюер не перебьёт', en: 'Until the interviewer interrupts' } },
      { text: { ru: 'Столько, сколько длится резюме', en: 'As long as the résumé takes to read' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это короткая презентация в духе «питча для лифта»: 1–2 минуты хватает, чтобы назвать текущую роль, релевантный опыт и цель. Слишком короткий ответ ничего не даёт, слишком длинный утомляет и съедает время на вопросы.',
          en: 'It’s a short presentation in the spirit of an elevator pitch: 1–2 minutes is enough to name your current role, relevant experience and goal. Too short gives nothing; too long tires the listener and eats the time for questions.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Elevator pitch', url: `${WIKI}/Elevator_pitch` },
      { title: 'The Muse — How to answer “Tell me about yourself”', url: MUSE_ABOUT },
    ],
  },
  {
    id: 'hr-self-presentation-004',
    topic: 'hr',
    tags: ['self-presentation'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'В рассказе о себе вы упомянули Docker, хотя запускали его один раз по инструкции. Чем это рискованно?',
      en: 'In your introduction you mentioned Docker, though you ran it once following a tutorial. Why is that risky?',
    },
    options: [
      { text: { ru: 'Ничем: чем больше технологий, тем лучше', en: 'It isn’t: the more technologies, the better' } },
      { text: { ru: 'Интервьюер может спросить о нём подробно — и ответить будет нечего', en: 'The interviewer may ask about it in depth — and you’ll have nothing to say' } },
      { text: { ru: 'Docker не относится к фронтенду, его упоминать запрещено', en: 'Docker isn’t front-end, so mentioning it is forbidden' } },
      { text: { ru: 'Рекрутер решит, что вы DevOps, и отправит на другую вакансию', en: 'The recruiter will think you’re DevOps and move you to another job' } },
      { text: { ru: 'Docker устарел, его упоминание снижает оценку', en: 'Docker is outdated, so mentioning it lowers your score' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Интервьюер строит следующие вопросы по тому, что вы назвали. Технология «для галочки» превращается в вопрос, на котором видно, что опыта нет, — и это бьёт по доверию к остальному рассказу.',
          en: 'The interviewer builds the next questions on what you mentioned. A technology dropped “for show” becomes a question that reveals the lack of experience — and that hurts trust in the rest of your story.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Упоминайте то, о чём можете говорить подробно, или честно оценивайте уровень: «знакомился с Docker на учебном проекте».',
          en: 'Mention what you can discuss in depth, or state your level honestly: “I tried Docker in a study project”.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-star-001',
    kind: 'order',
    topic: 'hr',
    tags: ['star'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Расставьте части ответа по методу STAR по порядку.',
      en: 'Put the parts of a STAR answer in order.',
    },
    items: [
      { text: { ru: 'Ситуация: контекст в паре предложений', en: 'Situation: context in a couple of sentences' } },
      { text: { ru: 'Задача: что требовалось именно от вас', en: 'Task: what was required of you' } },
      { text: { ru: 'Действия: что сделали вы', en: 'Action: what you did' } },
      { text: { ru: 'Результат: чем закончилось и что вынесли', en: 'Result: how it ended and what you learned' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '**STAR** — Situation, Task, Action, Result. Такой порядок превращает ответ в короткую историю с понятным началом и итогом, и интервьюеру легко оценить ваш вклад.',
          en: '**STAR** is Situation, Task, Action, Result. This order turns an answer into a short story with a clear start and ending, so the interviewer can easily judge your contribution.',
        },
      },
    ],
    sources: [
      { title: 'MIT CAPD — The STAR method', url: MIT_STAR },
      { title: 'Wikipedia — Situation, task, action, result', url: `${WIKI}/Situation,_task,_action,_result` },
    ],
  },
  {
    id: 'hr-star-002',
    topic: 'hr',
    tags: ['star'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какая формулировка части «Действия» в STAR сильнее?',
      en: 'Which wording of the “Action” part of STAR is stronger?',
    },
    options: [
      { text: { ru: '«Мы всей командой собрались и всё исправили»', en: '“The whole team got together and fixed everything”' } },
      {
        text: {
          ru: '«Я нашёл, что сборка тянет лишние полифилы, убрал их и настроил разделение кода»',
          en: '“I found the build pulled in unnecessary polyfills, removed them and set up code splitting”',
        },
      },
      { text: { ru: '«Было много работы, но мы справились»', en: '“There was a lot of work, but we managed”' } },
      { text: { ru: '«Руководитель сказал, что делать, и я сделал»', en: '“My manager told me what to do and I did it”' } },
      { text: { ru: '«Не помню точно, но всё как-то наладилось»', en: '“I don’t remember exactly, but things worked out”' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Интервьюеру нужен **ваш** вклад, поэтому в действиях говорят «я» и называют конкретные шаги. «Мы справились» не показывает, что делали лично вы, а «руководитель сказал» — что вы только исполняли.',
          en: 'The interviewer wants **your** contribution, so the action part uses “I” and names concrete steps. “We managed” doesn’t show what you personally did, and “my manager told me” suggests you only followed orders.',
        },
      },
    ],
    sources: [{ title: 'MIT CAPD — The STAR method', url: MIT_STAR }],
  },
  {
    id: 'hr-star-003',
    topic: 'hr',
    tags: ['star'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Какой «Результат» в истории по STAR сильнее?',
      en: 'Which “Result” in a STAR story is stronger?',
    },
    options: [
      { text: { ru: '«Всё получилось хорошо»', en: '“Everything turned out well”' } },
      { text: { ru: '«Руководитель остался доволен»', en: '“My manager was pleased”' } },
      {
        text: {
          ru: '«Сборка ускорилась с 6 до 2 минут, а я с тех пор слежу за размером бандла в CI»',
          en: '“The build went from 6 to 2 minutes, and since then I track bundle size in CI”',
        },
      },
      { text: { ru: '«Мы молодцы»', en: '“We did great”' } },
      { text: { ru: '«Проект потом всё равно закрыли»', en: '“The project got closed later anyway”' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сильный результат **измерим** и заканчивается выводом: что изменилось в цифрах и что вы стали делать иначе. Оценочные слова («хорошо», «молодцы») ничего не доказывают.',
          en: 'A strong result is **measurable** and ends with a takeaway: what changed in numbers and what you do differently now. Evaluative words (“well”, “great”) prove nothing.',
        },
      },
    ],
    sources: [{ title: 'MIT CAPD — The STAR method', url: MIT_STAR }],
  },
  {
    id: 'hr-star-004',
    topic: 'hr',
    tags: ['star'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Зачем на собеседованиях задают вопросы вида «Расскажите о случае, когда…»?',
      en: 'Why do interviews include questions like “Tell me about a time when…”?',
    },
    options: [
      { text: { ru: 'Чтобы проверить память кандидата', en: 'To test the candidate’s memory' } },
      { text: { ru: 'Прошлое поведение лучше предсказывает будущее, чем ответы на «как бы вы поступили»', en: 'Past behavior predicts future behavior better than “what would you do” answers' } },
      { text: { ru: 'Чтобы заполнить время, пока нет технических вопросов', en: 'To fill time when there are no technical questions' } },
      { text: { ru: 'Это требование трудового законодательства', en: 'Labor law requires it' } },
      { text: { ru: 'Чтобы узнать подробности о прошлом работодателе', en: 'To learn details about the previous employer' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это **поведенческие** вопросы структурированного интервью: всем кандидатам задают одинаковые вопросы и оценивают ответы по общим критериям. Реальный опыт показывает, как человек действует, точнее гипотетических рассуждений.',
          en: 'These are **behavioral** questions of a structured interview: every candidate gets the same questions, and answers are scored against shared criteria. Real experience shows how someone acts more accurately than hypothetical reasoning.',
        },
      },
    ],
    sources: [
      { title: 'Google re:Work — Use structured interviewing', url: REWORK },
      { title: 'Wikipedia — Structured interview', url: `${WIKI}/Structured_interview` },
    ],
  },
  {
    id: 'hr-tough-questions-001',
    topic: 'hr',
    tags: ['tough-questions'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: '«Назовите свою слабую сторону». Какой ответ сильнее?',
      en: '“What is your weakness?” Which answer is stronger?',
    },
    options: [
      { text: { ru: '«Я перфекционист»', en: '“I’m a perfectionist”' } },
      { text: { ru: '«У меня нет слабых сторон»', en: '“I don’t have weaknesses”' } },
      {
        text: {
          ru: '«Долго не прошу помощи. Теперь даю себе час на задачу, потом пишу в командный чат»',
          en: '“I take too long to ask for help. Now I give myself an hour on a problem, then post in the team chat”',
        },
      },
      { text: { ru: '«Не люблю работать с кодом»', en: '“I don’t like working with code”' } },
      { text: { ru: '«Часто опаздываю, но это неважно»', en: '“I’m often late, but it doesn’t matter”' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сильный ответ — **реальная** слабость, не критичная для роли, плюс то, что вы уже с ней делаете. Вопрос проверяет самооценку и умение работать над собой.',
          en: 'A strong answer is a **real** weakness that isn’t critical for the role, plus what you’re already doing about it. The question tests self-awareness and the ability to improve.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '«Перфекционист» и «нет слабостей» звучат как уход от ответа, а слабость в ключевом навыке или без плана исправления — повод отказать.',
          en: '“Perfectionist” and “no weaknesses” sound evasive, while a weakness in a core skill or without a plan to fix it is a reason to reject.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-tough-questions-002',
    topic: 'hr',
    tags: ['tough-questions'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: '«Почему уходите с текущей работы?» Какой ответ сильнее?',
      en: '“Why are you leaving your current job?” Which answer is stronger?',
    },
    options: [
      { text: { ru: '«Там ужасный руководитель и все некомпетентны»', en: '“My manager is awful and everyone is incompetent”' } },
      {
        text: {
          ru: '«Хочу писать продуктовый фронтенд на React — в текущей команде задачи в основном на поддержке старого кода»',
          en: '“I want to build product front-end in React — my current team mostly maintains legacy code”',
        },
      },
      { text: { ru: '«Просто надоело»', en: '“I’m just bored”' } },
      { text: { ru: '«Не скажу, это личное»', en: '“I won’t say, it’s personal”' } },
      { text: { ru: '«Мне везде мало платят»', en: '“I’m underpaid everywhere”' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сильный ответ — про то, **куда** вы идёте, а не от чего бежите: какой опыт хотите получить и почему он есть здесь. Критика бывшего работодателя настораживает — интервьюер представляет, как вы будете говорить о нём.',
          en: 'A strong answer is about **where** you’re going, not what you’re running from: what experience you want and why it’s here. Criticizing a former employer is a red flag — the interviewer imagines you talking about them that way.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-tough-questions-003',
    topic: 'hr',
    tags: ['tough-questions'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: '«Расскажите о своей ошибке». Что должно быть главным в ответе?',
      en: '“Tell me about a mistake you made”. What should be the focus of the answer?',
    },
    options: [
      { text: { ru: 'Доказать, что ошибка была не по вашей вине', en: 'Proving the mistake wasn’t your fault' } },
      { text: { ru: 'Выбрать ошибку поменьше, чтобы не испортить впечатление', en: 'Picking a tiny mistake so as not to spoil the impression' } },
      {
        text: {
          ru: 'Что вы сделали, чтобы исправить последствия, и что изменили в работе после',
          en: 'What you did to fix the consequences and what you changed in how you work afterwards',
        },
      },
      { text: { ru: 'Подробно описать, как всё сломалось', en: 'Describing in detail how everything broke' } },
      { text: { ru: 'Сказать, что ошибок не было', en: 'Saying you’ve made no mistakes' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ошибаются все — вопрос проверяет, берёте ли вы ответственность и учитесь ли. Расскажите историю по STAR, где основное время занимает исправление и вывод: «теперь я перед релизом прогоняю…».',
          en: 'Everyone makes mistakes — the question checks whether you take responsibility and learn. Tell a STAR story where most of the time goes to the fix and the takeaway: “now before a release I run…”.',
        },
      },
    ],
    sources: [
      { title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING },
      { title: 'MIT CAPD — The STAR method', url: MIT_STAR },
    ],
  },
  {
    id: 'hr-tough-questions-004',
    topic: 'hr',
    tags: ['tough-questions'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: '«Расскажите о конфликте в команде». Какая история подходит лучше всего?',
      en: '“Tell me about a conflict in your team”. Which story fits best?',
    },
    options: [
      { text: { ru: 'Как вы доказали коллеге, что он неправ, и он извинился', en: 'How you proved a colleague wrong and he apologized' } },
      {
        text: {
          ru: 'Как на код-ревью разошлись во мнениях о подходе, сравнили варианты на прототипе и выбрали по замерам',
          en: 'How you disagreed on an approach in code review, compared options on a prototype and chose by measurements',
        },
      },
      { text: { ru: 'Конфликтов у вас никогда не было', en: 'You’ve never had conflicts' } },
      { text: { ru: 'Как пожаловались руководителю, и он всё решил', en: 'How you complained to the manager and he sorted it out' } },
      { text: { ru: 'Личная ссора с коллегой вне работы', en: 'A personal quarrel with a colleague outside work' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Лучшая история — о **разногласии по делу**, которое решили разговором и аргументами, с результатом для работы. Она показывает, что вы умеете спорить без вражды и менять мнение по фактам.',
          en: 'The best story is about a **work disagreement** resolved through conversation and arguments, with a result for the work. It shows you can disagree without hostility and change your mind based on facts.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '«Конфликтов не было» звучит неправдоподобно, «победа» над коллегой и жалоба руководителю — сигналы о сложном характере.',
          en: '“Never had conflicts” sounds implausible; “winning” over a colleague or complaining to the manager signal a difficult personality.',
        },
      },
    ],
    sources: [
      { title: 'MIT CAPD — The STAR method', url: MIT_STAR },
      { title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING },
    ],
  },
  {
    id: 'hr-tough-questions-005',
    topic: 'hr',
    tags: ['tough-questions'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'На техническом интервью вы не знаете ответа на вопрос. Как лучше поступить?',
      en: 'In a technical interview you don’t know the answer to a question. What’s the best move?',
    },
    options: [
      { text: { ru: 'Уверенно сказать что-нибудь похожее', en: 'Confidently say something that sounds similar' } },
      { text: { ru: 'Молчать, пока интервьюер не перейдёт к следующему', en: 'Stay silent until the interviewer moves on' } },
      {
        text: {
          ru: 'Честно сказать, что не знаю, и порассуждать вслух, как бы искал ответ',
          en: 'Say honestly that you don’t know and reason aloud about how you’d find the answer',
        },
      },
      { text: { ru: 'Сказать, что вопрос некорректный', en: 'Say the question is invalid' } },
      { text: { ru: 'Попросить пропустить все сложные вопросы', en: 'Ask to skip all hard questions' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Блеф обычно раскрывается уточняющим вопросом и подрывает доверие к остальным ответам. Честное «не знаю» плюс ход мыслей показывает, как вы работаете с незнакомым, — а это для junior важнее энциклопедичности.',
          en: 'A bluff is usually exposed by a follow-up question and undermines trust in your other answers. An honest “I don’t know” plus your reasoning shows how you deal with the unfamiliar — which matters more for a junior than encyclopedic knowledge.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-motivation-001',
    topic: 'hr',
    tags: ['motivation'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: '«Почему вы хотите работать у нас?» Какой ответ сильнее?',
      en: '“Why do you want to work here?” Which answer is stronger?',
    },
    options: [
      { text: { ru: '«У вас хороший офис»', en: '“You have a nice office”' } },
      { text: { ru: '«Вы известная компания»', en: '“You’re a well-known company”' } },
      {
        text: {
          ru: '«Ваш продукт для учителей — это интерфейсы с формами и таблицами, а я как раз делал такие в пет-проекте и хочу развиваться в этом»',
          en: '“Your product for teachers is form- and table-heavy UI — exactly what I built in my pet project and want to grow in”',
        },
      },
      { text: { ru: '«Мне всё равно где, лишь бы взяли»', en: '“I don’t care where, as long as I’m hired”' } },
      { text: { ru: '«Друг сказал, что у вас легко пройти собеседование»', en: '“A friend said your interview is easy to pass”' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сильный ответ показывает, что вы **изучили компанию**, и связывает её задачи с вашим опытом и целями. Общие слова подойдут к любой компании и не отличают вас от других кандидатов.',
          en: 'A strong answer shows you **researched the company** and ties its work to your experience and goals. Generic phrases fit any company and don’t set you apart.',
        },
      },
    ],
    sources: [
      { title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING },
      { title: 'The Muse — How to answer “Tell me about yourself”', url: MUSE_ABOUT },
    ],
  },
  {
    id: 'hr-motivation-002',
    topic: 'hr',
    tags: ['motivation'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Рекрутер спрашивает о зарплатных ожиданиях. Как лучше ответить?',
      en: 'The recruiter asks about your salary expectations. What’s the best answer?',
    },
    options: [
      { text: { ru: '«Сколько дадите — на всё согласен»', en: '“Whatever you offer — I agree to anything”' } },
      {
        text: {
          ru: 'Назвать вилку по данным рынка для этого уровня и уточнить, «на руки» это или до вычета налогов',
          en: 'Name a range based on market data for this level and specify whether it’s net or gross',
        },
      },
      { text: { ru: 'Назвать сумму вдвое выше рынка — потом снизят', en: 'Name twice the market rate — they’ll lower it anyway' } },
      { text: { ru: 'Отказаться отвечать до оффера', en: 'Refuse to answer until the offer' } },
      { text: { ru: 'Назвать текущую зарплату друга', en: 'Name your friend’s current salary' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Обоснованная вилка показывает, что вы знаете рынок, и оставляет место для торга. Данные берут из зарплатных отчётов и вакансий с указанной зарплатой.',
          en: 'A justified range shows you know the market and leaves room to negotiate. Get data from salary reports and job posts that state pay.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '«Сколько дадите» закрепляет низкую цифру, завышенная вдвое — отсеивает на скрининге, а отказ отвечать затягивает процесс: компании нужно понять, укладываетесь ли вы в бюджет.',
          en: '“Whatever you offer” anchors you low, double the market gets you filtered out at screening, and refusing to answer stalls the process: the company needs to know if you fit the budget.',
        },
      },
    ],
    sources: [
      { title: 'Хабр Карьера — зарплаты в IT', url: 'https://career.habr.com/salaries' },
      { title: 'Wikipedia — Salary negotiation', url: `${WIKI}/Salary_negotiation` },
    ],
  },
  {
    id: 'hr-motivation-003',
    kind: 'output',
    topic: 'hr',
    tags: ['motivation'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'В оффере — 150 000 ₽ в месяц до вычета НДФЛ (ставка 13%). Сколько вы получите на руки? Впишите число в рублях.',
      en: 'The offer is ₽150,000 a month gross, with 13% personal income tax. How much will you take home? Type the number in rubles.',
    },
    code: {
      lang: 'js',
      source: `const gross = 150000;
const taxRate = 0.13;

console.log(Math.round(gross * (1 - taxRate)));`,
    },
    answers: ['130500', '130500₽'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'На руки = 150 000 × (1 − 0,13) = **130 500 ₽**; налог 19 500 ₽ удерживает работодатель. Поэтому в разговоре о зарплате важно уточнять, «на руки» сумма или до вычета налогов: разница — почти 20 000 ₽ в месяц.',
          en: 'Take-home = 150,000 × (1 − 0.13) = **₽130,500**; the employer withholds ₽19,500 of tax. That’s why you should clarify whether a salary is net or gross: the difference is almost ₽20,000 a month.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'С 2025 года ставка НДФЛ прогрессивная: 13% — пока доход за год не больше 2,4 млн ₽, дальше выше. 150 000 ₽ в месяц — это 1,8 млн ₽ в год, поэтому весь доход облагается по 13%.',
          en: 'Since 2025 Russia’s income tax is progressive: 13% while annual income is ₽2.4M or less, higher above that. ₽150,000 a month is ₽1.8M a year, so all of it is taxed at 13%.',
        },
      },
    ],
    sources: [{ title: 'ФНС России — НДФЛ', url: 'https://www.nalog.gov.ru/rn77/taxation/taxes/ndfl/' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'hr-motivation-004',
    topic: 'hr',
    tags: ['motivation'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: '«Где вы видите себя через пять лет?» Какой ответ сильнее?',
      en: '“Where do you see yourself in five years?” Which answer is stronger?',
    },
    options: [
      { text: { ru: '«На вашем месте»', en: '“In your position”' } },
      { text: { ru: '«Не знаю, не думал»', en: '“I don’t know, haven’t thought about it”' } },
      {
        text: {
          ru: '«Хочу вырасти до разработчика, который сам ведёт фичи от макета до релиза и помогает новичкам»',
          en: '“I want to grow into a developer who owns features from mockup to release and helps newcomers”',
        },
      },
      { text: { ru: '«Открою свою компанию и уйду»', en: '“I’ll start my own company and leave”' } },
      { text: { ru: '«Уйду из IT в дизайн»', en: '“I’ll leave IT for design”' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Вопрос проверяет, есть ли у вас направление развития и совпадает ли оно с тем, что может дать компания. Сильный ответ — про рост в профессии внутри роли: глубже в стек, больше ответственности, наставничество.',
          en: 'The question checks whether you have a direction and whether it matches what the company can offer. A strong answer is about growing in the profession within the role: deeper in the stack, more ownership, mentoring.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-motivation-005',
    topic: 'hr',
    tags: ['motivation'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'У вас оффер от компании A и финальное интервью в компании B, которая нравится больше. A просит ответ завтра. Как лучше поступить?',
      en: 'You have an offer from company A and a final interview at company B, which you like more. A wants an answer tomorrow. What’s the best move?',
    },
    options: [
      { text: { ru: 'Принять оффер A, а если B позовёт — просто уйти', en: 'Accept A’s offer and just leave if B says yes' } },
      {
        text: {
          ru: 'Честно попросить у A несколько дней и сообщить B, что есть оффер, — чтобы ускорить решение',
          en: 'Honestly ask A for a few more days and tell B you have an offer — to speed up their decision',
        },
      },
      { text: { ru: 'Отказать A, не дожидаясь ответа B', en: 'Decline A without waiting for B' } },
      { text: { ru: 'Не отвечать A, пока не решит B', en: 'Not reply to A until B decides' } },
      { text: { ru: 'Сказать B, что у вас три оффера, чтобы надавить', en: 'Tell B you have three offers to pressure them' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Нормальная практика — попросить немного времени на решение и сообщить второй компании о сроках: так у вас появляется выбор без обмана. Наличие реального оффера — ваша **альтернатива**, она усиливает позицию в переговорах.',
          en: 'It’s normal practice to ask for a bit more time and let the other company know your deadline: you get a choice without deceiving anyone. A real offer is your **alternative**, which strengthens your negotiating position.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Молчание и уход после принятия оффера портят репутацию — рынок тесный, а выдуманные офферы легко проверить вопросом «от кого?».',
          en: 'Silence or leaving after accepting an offer hurts your reputation — the market is small, and made-up offers are easy to expose with “from whom?”.',
        },
      },
    ],
    sources: [
      { title: 'HBR — 15 Rules for Negotiating a Job Offer', url: 'https://hbr.org/2014/04/15-rules-for-negotiating-a-job-offer' },
      { title: 'Wikipedia — BATNA', url: `${WIKI}/BATNA` },
    ],
  },
];
