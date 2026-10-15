import type { Question } from '../model/types';

const TIH = 'https://www.techinterviewhandbook.org';
const HARVARD_INTERVIEWING = 'https://careerservices.fas.harvard.edu/resources/interviewing/';
const MIT_STAR = 'https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/';
const LABOR_CODE = 'https://www.consultant.ru/document/cons_doc_LAW_34683/';

export const HR_QUESTIONS_5: Question[] = [
  {
    id: 'hr-hiring-process-010',
    kind: 'output',
    topic: 'hr',
    tags: ['hiring-process'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Вы отдали заявление об увольнении в понедельник, 2 ноября 2026 года. По ст. 80 ТК РФ предупреждают за две недели, и срок начинает течь на следующий день после получения заявления. Какую дату последнего рабочего дня выведет код?',
      en: 'You handed in your resignation on Monday, November 2, 2026. Under Article 80 of the Russian Labor Code the notice period is two weeks, starting the day after the employer receives the letter. What last-working-day date does the code print?',
    },
    code: {
      lang: 'js',
      source: `const submitted = new Date(2026, 10, 2);
const lastDay = new Date(submitted);
lastDay.setDate(lastDay.getDate() + 14);

console.log(\`\${lastDay.getDate()}.\${lastDay.getMonth() + 1}\`);`,
    },
    answers: ['16.11'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Отсчёт начинается 3 ноября, и 14 календарных дней заканчиваются 16 ноября — это последний рабочий день: в него выдают трудовую книжку и делают расчёт. Праздник 4 ноября срок не продлевает, считаются календарные дни. Если последний день выпал бы на выходной, днём окончания стал бы следующий рабочий (ст. 14 ТК РФ). По соглашению с работодателем можно уйти раньше, а на испытательном сроке предупреждают за три дня.',
          en: 'The count starts on November 3, and 14 calendar days end on November 16 — your last working day, when you get your employment record and final pay. The November 4 holiday doesn’t extend the period: calendar days count. If the last day fell on a day off, the next working day would be the end date (Article 14). By agreement with the employer you can leave earlier, and during probation the notice is three days.',
        },
      },
    ],
    sources: [{ title: 'ТК РФ — статьи 14 и 80', url: LABOR_CODE }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'hr-motivation-009',
    kind: 'output',
    topic: 'hr',
    tags: ['motivation'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Оффер — 250 000 ₽ в месяц до вычета налога, других доходов нет. С 2025 года НДФЛ прогрессивный. Сколько налога удержат за год? Впишите число, которое выведет код.',
      en: 'The offer is 250,000 ₽ a month before tax, with no other income. Since 2025 Russian income tax is progressive. How much tax is withheld per year? Type the number the code prints.',
    },
    code: {
      lang: 'js',
      source: `const income = 250000 * 12;
const brackets = [
  { upTo: 2400000, rate: 0.13 },
  { upTo: 5000000, rate: 0.15 },
  { upTo: 20000000, rate: 0.18 },
];

let tax = 0;
let lower = 0;
for (const { upTo, rate } of brackets) {
  if (income > lower) {
    tax += (Math.min(income, upTo) - lower) * rate;
  }
  lower = upTo;
}

console.log(Math.round(tax));`,
    },
    answers: ['402000'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Повышенная ставка действует не на весь доход, а только на часть сверх порога: 13% с первых 2,4 млн (312 000 ₽) и 15% с оставшихся 600 000 ₽ (90 000 ₽). Поэтому перейти порог и получить на руки меньше, чем до него, нельзя. Но в месяцы после превышения порога (здесь — с октября) на руки приходит меньше — это стоит учесть, сравнивая офферы «на руки». Шкала: 13% до 2,4 млн, 15% до 5 млн, 18% до 20 млн, 20% до 50 млн, 22% выше.',
          en: 'The higher rate applies not to all income, only to the part above the threshold: 13% on the first 2.4 million (312,000 ₽) and 15% on the remaining 600,000 ₽ (90,000 ₽). So crossing the threshold can’t leave you with less than before it. But in the months after crossing it (here, from October) your take-home pay drops — keep that in mind when comparing take-home offers. The scale: 13% up to 2.4 million, 15% up to 5 million, 18% up to 20 million, 20% up to 50 million, 22% above.',
        },
      },
    ],
    sources: [{ title: 'ФНС России — НДФЛ', url: 'https://www.nalog.gov.ru/rn77/taxation/taxes/ndfl/' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'hr-motivation-010',
    kind: 'output',
    topic: 'hr',
    tags: ['motivation'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'В оффере — 4 800 опционов с вестингом на 4 года и «клиффом» в 1 год, дальше доли начисляются ежемесячно. Сколько опционов будет вашими, если уйти через 11, 18 и 48 месяцев? Впишите, что выведет код.',
      en: 'The offer includes 4,800 options vesting over 4 years with a 1-year cliff, then monthly. How many options are yours if you leave after 11, 18 and 48 months? Type what the code prints.',
    },
    code: {
      lang: 'js',
      source: `const total = 4800;
const vestedAfter = (months) => (months < 12 ? 0 : Math.floor((total * Math.min(months, 48)) / 48));

console.log(vestedAfter(11), vestedAfter(18), vestedAfter(48));`,
    },
    answers: ['0 1800 4800'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'До клиффа не начисляется ничего: уйдя через 11 месяцев, вы остаётесь без опционов. В дату клиффа разом открывается четверть (1 200), дальше — по 1/48 в месяц. Поэтому при сравнении офферов опционы оценивают с поправкой на срок, который вы реально готовы отработать, и уточняют цену исполнения, срок на выкуп после ухода и что будет при продаже компании.',
          en: 'Nothing vests before the cliff: leave after 11 months and you have no options. On the cliff date a quarter (1,200) vests at once, then 1/48 per month. So when comparing offers, value options by how long you’re really willing to stay, and ask about the strike price, the exercise window after leaving and what happens if the company is sold.',
        },
      },
    ],
    sources: [{ title: 'Wikipedia — Vesting', url: 'https://en.wikipedia.org/wiki/Vesting' }],
    verify: { kind: 'js-output' },
  },
  {
    id: 'hr-self-presentation-006',
    topic: 'hr',
    tags: ['self-presentation'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какая строка в резюме фронтендера сильнее?',
      en: 'Which résumé line for a front-end developer is stronger?',
    },
    options: [
      { text: { ru: '«Отвечал за фронтенд личного кабинета»', en: '“Was responsible for the account dashboard front end”' } },
      { text: { ru: '«Работал с React, Redux, TypeScript, Webpack, Jest, Docker»', en: '“Worked with React, Redux, TypeScript, Webpack, Jest, Docker”' } },
      { text: { ru: '«Командный игрок, быстро обучаюсь, стрессоустойчив»', en: '“Team player, fast learner, handles stress well”' } },
      {
        text: {
          ru: '«Ускорил загрузку каталога с 4 до 1,5 с: разбил бандл и включил ленивую загрузку картинок»',
          en: '“Cut catalog load time from 4 s to 1.5 s by splitting the bundle and lazy-loading images”',
        },
      },
      { text: { ru: '«Участвовал в разработке различных интересных проектов»', en: '“Took part in developing various interesting projects”' } },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Резюме просматривают за минуты, а то и секунды. Строка «достижение — как сделано — измеримый результат» показывает, что вы умеете и какую пользу принесли, и даёт интервьюеру тему для вопросов. Обязанности («отвечал за») и список технологий без контекста не отличают вас от других, а качества вроде «командный игрок» без примеров не проверить. Метрика должна быть настоящей: о ней спросят подробно.',
          en: 'Résumés get minutes, sometimes seconds. A line of “achievement — how — measurable result” shows what you can do and the value you added, and gives the interviewer something to ask about. Duties (“responsible for”) and a bare list of technologies don’t set you apart, and traits like “team player” can’t be checked without examples. The metric must be real: you’ll be asked about it in detail.',
        },
      },
    ],
    sources: [{ title: 'Tech Interview Handbook — Resume', url: `${TIH}/resume/` }],
  },
  {
    id: 'hr-star-007',
    kind: 'order',
    topic: 'hr',
    tags: ['star'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Расставьте шаги подготовки к поведенческому интервью по порядку.',
      en: 'Put the steps of preparing for a behavioral interview in order.',
    },
    items: [
      {
        text: {
          ru: 'Выписать из вакансии и ценностей компании, какие качества будут проверять',
          en: 'List the qualities they’ll assess, from the job posting and company values',
        },
      },
      { text: { ru: 'Подобрать к каждому качеству историю из своего опыта', en: 'Match each quality with a story from your experience' } },
      { text: { ru: 'Разложить каждую историю по STAR с цифрами результата', en: 'Structure each story with STAR, including result numbers' } },
      { text: { ru: 'Проговорить истории вслух, укладываясь в 2–3 минуты', en: 'Rehearse the stories aloud, fitting into 2–3 minutes' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Начинают с того, что будут оценивать, а не с любимых историй: иначе можно отлично подготовить рассказ, который не ответит ни на один вопрос. Одна сильная история часто покрывает несколько тем — конфликт, сжатый срок, ошибку, — нужно лишь сместить акцент. Репетиция вслух выявляет затянутые места, которых не видно в тексте.',
          en: 'Start from what they’ll assess, not from favorite stories: otherwise you may polish a story that answers none of the questions. One strong story often covers several themes — a conflict, a tight deadline, a mistake — you just shift the emphasis. Rehearsing aloud reveals the slow parts you can’t see on paper.',
        },
      },
    ],
    sources: [
      { title: 'Tech Interview Handbook — Behavioral interview', url: `${TIH}/behavioral-interview/` },
      { title: 'MIT CAPD — The STAR method', url: MIT_STAR },
    ],
  },
  {
    id: 'hr-star-008',
    topic: 'hr',
    tags: ['star'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'После вашей истории по STAR интервьюер спрашивает: «Что бы вы сделали иначе?» Какой ответ сильнее?',
      en: 'After your STAR story the interviewer asks: “What would you do differently?” Which answer is stronger?',
    },
    options: [
      { text: { ru: '«Ничего — всё прошло идеально»', en: '“Nothing — it went perfectly”' } },
      { text: { ru: 'Объяснить, что подвели другие участники', en: 'Explain that other people let you down' } },
      { text: { ru: 'Рассказать другую историю, где всё получилось', en: 'Tell a different story where everything worked' } },
      { text: { ru: '«Я бы больше старался»', en: '“I’d try harder”' } },
      {
        text: {
          ru: 'Назвать конкретное решение, которое изменили бы, объяснить почему и как применили этот вывод потом',
          en: 'Name a specific decision you’d change, explain why, and how you applied that lesson later',
        },
      },
    ],
    answer: 'e',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Уточняющий вопрос проверяет рефлексию: умеете ли вы делать выводы. «Ничего» звучит как неспособность видеть ошибки, а «старался бы больше» — как отписка. Сильный ответ конкретен: «раньше показал бы прототип заказчику — с тех пор так и делаю на каждом проекте». Переложить вину на других — главный красный флаг поведенческого интервью.',
          en: 'The follow-up tests reflection: can you draw lessons? “Nothing” sounds like you can’t see mistakes, and “I’d try harder” is a brush-off. A strong answer is specific: “I’d show the client a prototype earlier — I’ve done that on every project since.” Blaming others is the biggest red flag in a behavioral interview.',
        },
      },
    ],
    sources: [{ title: 'Tech Interview Handbook — Behavioral interview', url: `${TIH}/behavioral-interview/` }],
  },
  {
    id: 'hr-tough-questions-010',
    topic: 'hr',
    tags: ['tough-questions'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: '«Почему мы должны взять именно вас?» Какой ответ сильнее?',
      en: '“Why should we hire you?” Which answer is stronger?',
    },
    options: [
      {
        text: {
          ru: 'Связать 2–3 ключевых требования вакансии с конкретными примерами из своего опыта',
          en: 'Connect 2–3 key job requirements with specific examples from your experience',
        },
      },
      { text: { ru: '«Я очень хочу у вас работать»', en: '“I really want to work here”' } },
      { text: { ru: '«Я лучше других кандидатов»', en: '“I’m better than the other candidates”' } },
      { text: { ru: 'Перечислить все свои сильные качества', en: 'List all your strengths' } },
      { text: { ru: '«Не знаю, решать вам»', en: '“I don’t know, it’s your call”' } },
    ],
    answer: 'a',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это просьба подвести итог: чем вы закрываете их задачу. Лучший ответ опирается на вакансию — «вам нужен человек, который наладит тесты и доведёт до релиза оплату; ровно это я делал в прошлой компании» — и на факты, а не на прилагательные. Сравнивать себя с другими кандидатами бессмысленно: вы их не знаете. Одно желание работать — мотивация, но не аргумент.',
          en: 'It’s a request to sum up how you solve their problem. The best answer builds on the job — “you need someone to set up testing and ship the payment flow; that’s exactly what I did at my last company” — and on facts, not adjectives. Comparing yourself with other candidates is pointless: you don’t know them. Wanting the job is motivation, not an argument.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-tough-questions-011',
    topic: 'hr',
    tags: ['tough-questions'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: '«Оцените свой JavaScript от 1 до 10». Какой ответ сильнее?',
      en: '“Rate your JavaScript from 1 to 10.” Which answer is stronger?',
    },
    options: [
      { text: { ru: '«10 из 10»', en: '“10 out of 10”' } },
      {
        text: {
          ru: '«На 7: уверенно пишу асинхронный код, разбираюсь в замыканиях и прототипах; слабее — в профилировании производительности, сейчас изучаю его»',
          en: '“A 7: I write async code confidently and understand closures and prototypes; I’m weaker at performance profiling and learning it now”',
        },
      },
      { text: { ru: '«Не люблю оценивать себя, пусть оценят другие»', en: '“I don’t like rating myself, let others do it”' } },
      { text: { ru: '«2 из 10» — чтобы точно не завысить', en: '“2 out of 10” — to be safe' } },
      { text: { ru: 'Назвать число и сразу сменить тему', en: 'Give a number and change the subject' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Цифра сама по себе мало что значит — шкала у каждого своя. Интервьюер смотрит, насколько точно вы видите свои сильные и слабые стороны. «10» провоцирует вопросы, на которых легко засыпаться, а заниженная оценка выглядит неуверенностью. Сильный ответ называет число и сразу раскрывает его: что знаете хорошо, где пробелы и как вы их закрываете.',
          en: 'The number alone means little — everyone’s scale differs. The interviewer checks how accurately you see your strengths and weaknesses. “10” invites questions that are easy to fail, and a lowball looks insecure. A strong answer gives a number and unpacks it right away: what you know well, where the gaps are and how you’re closing them.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-questions-to-employer-007',
    topic: 'hr',
    tags: ['questions-to-employer'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какой вопрос лучше поможет понять, что происходит в команде, куда вас нанимают?',
      en: 'Which question best helps you understand what’s going on in the team you’d join?',
    },
    options: [
      { text: { ru: '«У вас дружный коллектив?»', en: '“Is the team friendly?”' } },
      { text: { ru: '«Сколько стоит обед в столовой?»', en: '“How much is lunch in the cafeteria?”' } },
      { text: { ru: '«Вы меня возьмёте?»', en: '“Will you hire me?”' } },
      {
        text: {
          ru: '«Почему открыта эта вакансия — команда растёт или кто-то ушёл?»',
          en: '“Why is this position open — is the team growing or did someone leave?”',
        },
      },
      { text: { ru: '«Какой у вас стек?» — хотя он указан в вакансии', en: '“What’s your stack?” — though it’s in the job posting' } },
    ],
    answer: 'd',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Причина вакансии многое говорит о команде. Рост — это новые задачи и возможности. Замена ушедшего — повод спросить, почему он ушёл и как давно в команде остальные: частая текучка — сигнал насторожиться. На «дружный ли коллектив» ответят «да» почти везде, а вопрос о том, что написано в вакансии, показывает, что вы её не читали.',
          en: 'Why the position is open says a lot about the team. Growth means new work and opportunities. Replacing someone is a reason to ask why they left and how long the others have been there: high turnover is a warning sign. “Is the team friendly” gets a “yes” almost everywhere, and asking what’s already in the posting shows you didn’t read it.',
        },
      },
    ],
    sources: [{ title: 'Tech Interview Handbook — Questions to ask', url: `${TIH}/final-questions/` }],
  },
  {
    id: 'hr-hiring-process-011',
    topic: 'hr',
    tags: ['hiring-process'],
    difficulty: 1,
    popular: false,
    prompt: {
      ru: 'После финального этапа пришёл отказ. Что разумнее всего сделать?',
      en: 'You got a rejection after the final round. What’s the wisest thing to do?',
    },
    options: [
      { text: { ru: 'Не отвечать', en: 'Don’t reply' } },
      { text: { ru: 'Попросить пересмотреть решение', en: 'Ask them to reconsider' } },
      {
        text: {
          ru: 'Поблагодарить, попросить короткую обратную связь и сказать, что будете рады другим вакансиям',
          en: 'Thank them, ask for brief feedback and say you’d welcome other openings',
        },
      },
      { text: { ru: 'Написать, что они ошиблись', en: 'Write that they made a mistake' } },
      { text: { ru: 'Сразу откликнуться на все их вакансии подряд', en: 'Immediately apply to all their openings' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Вежливый ответ оставляет дверь открытой: компании возвращаются к сильным финалистам, когда открывается новая позиция или выбранный кандидат отказывается. Обратную связь дают не всегда, но если дают — это ценный материал для следующих собеседований. Спор решение не изменит, а мир индустрии тесен.',
          en: 'A polite reply keeps the door open: companies come back to strong finalists when a new role opens or the chosen candidate declines. Feedback isn’t always given, but when it is, it’s valuable material for your next interviews. Arguing won’t change the decision, and the industry is a small world.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
];
