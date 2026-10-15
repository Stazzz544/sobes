import type { Question } from '../model/types';

const TIH = 'https://www.techinterviewhandbook.org';
const HARVARD_INTERVIEWING = 'https://careerservices.fas.harvard.edu/resources/interviewing/';
const MIT_STAR = 'https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/';

export const HR_QUESTIONS_4: Question[] = [
  {
    id: 'hr-motivation-007',
    kind: 'output',
    topic: 'hr',
    tags: ['motivation'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Два оффера: A — 250 000 ₽ в месяц, B — 230 000 ₽ и годовой бонус 15% от годового оклада. На сколько B выгоднее за год (до налогов)? Впишите число, которое выведет код.',
      en: 'Two offers: A — 250,000 ₽ a month, B — 230,000 ₽ plus an annual bonus of 15% of the yearly salary. How much more does B pay per year (pre-tax)? Type the number the code prints.',
    },
    code: {
      lang: 'js',
      source: `const offerA = 250000 * 12;
const salaryB = 230000 * 12;
const offerB = salaryB + salaryB * 0.15;

console.log(offerB - offerA);`,
    },
    answers: ['174000'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Ежемесячная цифра меньше, но с бонусом B даёт 3 174 000 ₽ против 3 000 000 ₽. Офферы сравнивают по **полному доходу за год**: оклад, бонусы (и насколько они гарантированы), ДМС, опционы, компенсации, а также формат работы и перспективы роста. Негарантированный бонус честнее учитывать с дисконтом — уточните, как часто его реально платят.',
          en: 'The monthly figure is lower, but with the bonus B pays 3,174,000 ₽ versus 3,000,000 ₽. Compare offers by **total yearly compensation**: salary, bonuses (and how guaranteed they are), health insurance, equity, perks, plus work format and growth. Discount a non-guaranteed bonus — ask how often it’s actually paid.',
        },
      },
    ],
    sources: [{ title: 'Tech Interview Handbook — Understanding compensation', url: `${TIH}/understanding-compensation/` }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'hr-motivation-008',
    topic: 'hr',
    tags: ['motivation'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Рекрутер спрашивает: «Сколько вы получаете сейчас?» Какой ответ сильнее?',
      en: 'A recruiter asks: “How much do you earn now?” Which answer is stronger?',
    },
    options: [
      { text: { ru: 'Назвать сумму на 30% выше реальной', en: 'Name a figure 30% above the real one' } },
      { text: { ru: 'Отказаться отвечать и закончить разговор', en: 'Refuse to answer and end the call' } },
      {
        text: {
          ru: '«Мне важнее обсудить эту роль: по рынку и объёму задач я рассчитываю на X — это реально в вашей вилке?»',
          en: '“I’d rather focus on this role: based on the market and scope, I’m targeting X — is that within your range?”',
        },
      },
      { text: { ru: 'Сказать, что согласны на любую сумму', en: 'Say you’ll accept any amount' } },
      { text: { ru: 'Назвать текущую зарплату и попросить +5%', en: 'Name your current salary and ask for +5%' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Текущая зарплата привязывает оффер к прошлому месту, а не к ценности на новой роли. Вежливо переводят разговор на ожидания, обоснованные рынком (обзоры зарплат, вилки в вакансиях), и спрашивают вилку компании. Врать о текущем доходе рискованно: это могут проверить, и доверие будет потеряно.',
          en: 'Your current salary anchors the offer to your past job, not to your value in the new role. Politely shift to expectations grounded in the market (salary surveys, ranges in job posts) and ask for the company’s range. Lying about current pay is risky: it can be checked, and trust is lost.',
        },
      },
    ],
    sources: [
      { title: 'Tech Interview Handbook — Negotiation', url: `${TIH}/negotiation/` },
      { title: 'HBR — 15 Rules for Negotiating a Job Offer', url: 'https://hbr.org/2014/04/15-rules-for-negotiating-a-job-offer' },
    ],
  },
  {
    id: 'hr-tough-questions-007',
    topic: 'hr',
    tags: ['tough-questions'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: '«Почему вы ушли с прошлого места через полгода?» (вас сократили вместе с отделом). Какой ответ сильнее?',
      en: '“Why did you leave your last job after six months?” (you were laid off with your team). Which answer is stronger?',
    },
    options: [
      { text: { ru: '«Руководство было некомпетентным, всё развалилось»', en: '“Management was incompetent, everything fell apart”' } },
      { text: { ru: '«Не хочу об этом говорить»', en: '“I’d rather not talk about it”' } },
      {
        text: {
          ru: '«Компания закрыла направление, сократили весь отдел. За полгода я успел запустить X и научился Y — теперь ищу продукт, где это пригодится надолго»',
          en: '“The company closed the product line and laid off the whole team. In six months I shipped X and learned Y — now I’m looking for a product where that lasts”',
        },
      },
      { text: { ru: 'Придумать, что ушли ради более интересного проекта', en: 'Make up that you left for a more interesting project' } },
      { text: { ru: 'Долго извиняться за короткий срок', en: 'Apologize at length for the short tenure' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сильный ответ — короткий факт без оценок прошлого работодателя, затем результат за этот срок и связь с новой ролью. Критика бывшей компании настораживает: интервьюер представляет, как вы будете говорить о нём. Выдуманную причину легко раскрыть, а сокращение вместе с отделом — нормальная история, не требующая оправданий.',
          en: 'A strong answer is a brief fact without judging the former employer, then what you achieved in that time and how it connects to the new role. Criticizing a past company is a red flag: the interviewer imagines you talking about them that way. A made-up reason is easy to expose, while a team layoff is a normal story needing no excuses.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-tough-questions-008',
    topic: 'hr',
    tags: ['tough-questions'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'В конце интервью: «Честно говоря, нам кажется, что у вас маловато опыта для этой роли». Как лучше ответить?',
      en: 'At the end of the interview: “Honestly, we feel you may lack experience for this role.” How do you best respond?',
    },
    options: [
      { text: { ru: 'Согласиться и поблагодарить за время', en: 'Agree and thank them for their time' } },
      { text: { ru: 'Спорить, что опыта достаточно', en: 'Argue that your experience is enough' } },
      {
        text: {
          ru: 'Спросить, чего именно не хватает, и привести конкретный пример, как вы быстро осваивали похожее',
          en: 'Ask what specifically is missing and give a concrete example of quickly mastering something similar',
        },
      },
      { text: { ru: 'Предложить работать бесплатно первый месяц', en: 'Offer to work for free the first month' } },
      { text: { ru: 'Сразу снизить зарплатные ожидания вдвое', en: 'Immediately halve your salary expectations' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сомнение, высказанное вслух, — шанс его снять. Уточняющий вопрос показывает, что вы спокойно воспринимаете обратную связь, а ответ по существу — «за два месяца освоил React Native и выпустил приложение» — даёт интервьюеру аргумент «за». Спор звучит оборонительно, а демпинг обесценивает вас и не убирает сомнение.',
          en: 'A doubt voiced aloud is a chance to address it. A clarifying question shows you take feedback calmly, and a substantive answer — “I learned React Native in two months and shipped an app” — gives the interviewer an argument in your favor. Arguing sounds defensive, and underpricing devalues you without removing the doubt.',
        },
      },
    ],
    sources: [{ title: 'Tech Interview Handbook — Behavioral interview', url: `${TIH}/behavioral-interview/` }],
  },
  {
    id: 'hr-tough-questions-009',
    topic: 'hr',
    tags: ['tough-questions'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: '«У вас три места работы за два года. Почему так часто меняли?» Какой ответ сильнее?',
      en: '“Three jobs in two years. Why did you change so often?” Which answer is stronger?',
    },
    options: [
      { text: { ru: '«Мне быстро становится скучно»', en: '“I get bored quickly”' } },
      {
        text: {
          ru: 'Коротко объяснить причины каждого перехода, показать, что вы вынесли из каждого, и почему эта роль — надолго',
          en: 'Briefly explain each move, show what you gained from each, and why this role is long-term',
        },
      },
      { text: { ru: 'Убрать одно место из резюме', en: 'Remove one job from the résumé' } },
      { text: { ru: '«Везде были плохие команды»', en: '“Every team was bad”' } },
      { text: { ru: 'Пообещать, что точно не уйдёт никогда', en: 'Promise never to leave' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'За вопросом стоит страх работодателя: вложимся в онбординг, а человек уйдёт через полгода. Ответ снимает его логикой переходов — закрылся стартап, переехали, вырос из роли — и аргументами, почему здесь вы задержитесь: задачи, продукт, команда. Скрытое место работы всплывёт при проверке, а «скучно» и «плохие команды» подтверждают опасения.',
          en: 'Behind the question is the employer’s fear: they invest in onboarding and you leave in six months. Address it with the logic of each move — the startup shut down, you relocated, you outgrew the role — and reasons you’ll stay here: the work, the product, the team. A hidden job surfaces in background checks, and “bored” or “bad teams” confirm the fear.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-star-006',
    topic: 'hr',
    tags: ['star'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: '«Расскажите о проекте, которым гордитесь». Что чаще всего ослабляет такой рассказ?',
      en: '“Tell me about a project you’re proud of.” What most often weakens such a story?',
    },
    options: [
      { text: { ru: 'Упоминание метрик результата', en: 'Mentioning outcome metrics' } },
      {
        text: {
          ru: 'Рассказ только от «мы»: непонятно, что сделали лично вы',
          en: 'Telling it only as “we”: it’s unclear what you personally did',
        },
      },
      { text: { ru: 'Рассказ о трудностях по ходу', en: 'Talking about difficulties along the way' } },
      { text: { ru: 'Краткость — 2–3 минуты', en: 'Brevity — 2–3 minutes' } },
      { text: { ru: 'Объяснение, зачем проект был нужен бизнесу', en: 'Explaining why the business needed the project' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Интервьюер оценивает **вас**, а не команду. «Мы переписали поиск» не показывает вашу роль — «я предложил индекс по фамилиям и сократил ответ с 2 с до 200 мс» показывает. Команду упомянуть стоит, но действия в STAR — от первого лица. Трудности и метрики, наоборот, делают рассказ сильнее.',
          en: 'The interviewer evaluates **you**, not the team. “We rewrote search” doesn’t show your role — “I proposed a surname index and cut the response from 2 s to 200 ms” does. Mention the team, but the STAR actions are first-person. Difficulties and metrics, on the other hand, make the story stronger.',
        },
      },
    ],
    sources: [{ title: 'MIT CAPD — The STAR method', url: MIT_STAR }],
  },
  {
    id: 'hr-self-presentation-005',
    topic: 'hr',
    tags: ['self-presentation'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Вы идёте на собеседование в финтех на React и TypeScript. Как адаптировать рассказ о себе?',
      en: 'You’re interviewing at a fintech company using React and TypeScript. How do you adapt your self-introduction?',
    },
    options: [
      { text: { ru: 'Рассказывать одинаково на всех собеседованиях', en: 'Tell the same story at every interview' } },
      {
        text: {
          ru: 'Вынести вперёд опыт, близкий им: React/TypeScript, работу с деньгами, формы и точность расчётов',
          en: 'Lead with experience close to theirs: React/TypeScript, handling money, forms and calculation accuracy',
        },
      },
      { text: { ru: 'Перечислить все технологии, которые встречали', en: 'List every technology you’ve encountered' } },
      { text: { ru: 'Рассказать о хобби подробнее, чем о работе', en: 'Describe hobbies in more detail than work' } },
      { text: { ru: 'Выдумать опыт в финтехе', en: 'Invent fintech experience' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Каркас рассказа остаётся тем же, но акценты меняются под вакансию: из своего опыта выбирают то, что ближе к их стеку, домену и задачам из описания. Так интервьюеру проще увидеть вас в роли. Длинный список технологий без контекста ничего не доказывает, а выдуманный опыт рассыпается на первом уточняющем вопросе.',
          en: 'The story’s skeleton stays, but the emphasis shifts to the job: pick the parts of your experience closest to their stack, domain and the tasks in the posting. That makes it easier for the interviewer to picture you in the role. A long list of technologies without context proves nothing, and invented experience collapses at the first follow-up question.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-questions-to-employer-006',
    topic: 'hr',
    tags: ['questions-to-employer'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'Какой вопрос о росте лучше задать работодателю?',
      en: 'Which question about growth is better to ask an employer?',
    },
    options: [
      { text: { ru: '«Когда меня повысят?»', en: '“When will I be promoted?”' } },
      {
        text: {
          ru: '«Как у вас выглядит путь от junior до middle — какие ожидания и как часто их пересматривают?»',
          en: '“What does the path from junior to middle look like here — what are the expectations and how often are they reviewed?”',
        },
      },
      { text: { ru: '«Можно ли быстро стать тимлидом?»', en: '“Can I become a team lead quickly?”' } },
      { text: { ru: '«Сколько дней отпуска?» — первым вопросом', en: '“How many vacation days?” — as the first question' } },
      { text: { ru: 'Не спрашивать о росте вовсе', en: 'Don’t ask about growth at all' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Вопрос о процессе показывает интерес к развитию и одновременно проверяет компанию: есть ли матрица компетенций, регулярные ревью, ментор. Если внятного ответа нет — рост зависит от удачи. «Когда меня повысят» звучит как требование, а бытовые вопросы лучше оставить на этап обсуждения оффера.',
          en: 'Asking about the process shows interest in growth and tests the company: is there a competency matrix, regular reviews, a mentor? If there’s no clear answer, growth depends on luck. “When will I be promoted” sounds like a demand, and practical questions are better left for the offer stage.',
        },
      },
    ],
    sources: [{ title: 'Tech Interview Handbook — Questions to ask', url: `${TIH}/final-questions/` }],
  },
  {
    id: 'hr-hiring-process-008',
    topic: 'hr',
    tags: ['hiring-process'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Тестовое задание готово. Что приложить к ссылке на репозиторий?',
      en: 'The take-home assignment is done. What should accompany the repository link?',
    },
    options: [
      { text: { ru: 'Ничего: код говорит сам за себя', en: 'Nothing: the code speaks for itself' } },
      {
        text: {
          ru: 'README: как запустить, ключевые решения и компромиссы, что не успели и как улучшили бы',
          en: 'A README: how to run it, key decisions and trade-offs, what you didn’t finish and how you’d improve it',
        },
      },
      { text: { ru: 'Архив `node_modules`', en: 'A `node_modules` archive' } },
      { text: { ru: 'Объяснение, почему задание слишком большое', en: 'An explanation of why the task was too big' } },
      { text: { ru: 'Видео на час с разбором каждой строки', en: 'An hour-long video walking through every line' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Проверяющий тратит на задание немного времени: если проект не запускается по инструкции, его могут не досмотреть. Короткий README с решениями и компромиссами показывает мышление — «выбрал X, потому что…», «тесты только на логику, UI не успел» — и даёт темы для обсуждения на следующем этапе. Признанные пробелы лучше незамеченных.',
          en: 'The reviewer spends little time on the task: if the project doesn’t start per the instructions, they may not go further. A short README with decisions and trade-offs shows your thinking — “chose X because…”, “tests cover logic only, no time for UI” — and gives topics for the next stage. Acknowledged gaps beat unnoticed ones.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-hiring-process-009',
    topic: 'hr',
    tags: ['hiring-process'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'После финального интервью прошла неделя — тишина, хотя обещали ответ за 3 дня. Что сделать?',
      en: 'A week has passed since the final interview — silence, though they promised an answer in 3 days. What should you do?',
    },
    options: [
      { text: { ru: 'Ждать молча — значит, отказ', en: 'Wait silently — it means rejection' } },
      {
        text: {
          ru: 'Вежливо написать рекрутеру: поблагодарить, подтвердить интерес и спросить о сроках решения',
          en: 'Politely write to the recruiter: thank them, confirm your interest and ask about the decision timeline',
        },
      },
      { text: { ru: 'Звонить каждый день', en: 'Call every day' } },
      { text: { ru: 'Написать гневный отзыв о компании', en: 'Write an angry review of the company' } },
      { text: { ru: 'Связаться напрямую с CEO', en: 'Contact the CEO directly' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сроки найма часто сдвигаются: согласования, отпуска, другие кандидаты. Одно короткое вежливое письмо — нормальная практика, оно напоминает о вас и показывает интерес. Если у вас есть другой оффер со сроком ответа, это стоит прямо упомянуть: компании нередко ускоряются. Давление и эмоции закрывают двери.',
          en: 'Hiring timelines often slip: approvals, vacations, other candidates. One short polite email is normal practice — it reminds them of you and shows interest. If you have another offer with a deadline, say so plainly: companies often speed up. Pressure and emotions close doors.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
];
