import type { Question } from '../model/types';

const WIKI = 'https://en.wikipedia.org/wiki';
const HARVARD_INTERVIEWING = 'https://careerservices.fas.harvard.edu/resources/interviewing/';
const LABOR_CODE = 'https://www.consultant.ru/document/cons_doc_LAW_34683/';
const JULIA_EVANS = 'https://jvns.ca/blog/2013/12/30/questions-im-asking-in-interviews/';
const JOEL_TEST = 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/';

export const HR_QUESTIONS_2: Question[] = [
  {
    id: 'hr-questions-to-employer-001',
    topic: 'hr',
    tags: ['questions-to-employer'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'В конце технического интервью: «Есть вопросы к нам?» Какой вопрос junior-кандидата лучше?',
      en: 'At the end of a technical interview: “Any questions for us?” Which question from a junior candidate is best?',
    },
    options: [
      { text: { ru: '«Сколько дней отпуска?»', en: '“How many vacation days do I get?”' } },
      { text: { ru: '«А чем занимается ваша компания?»', en: '“So what does your company do?”' } },
      {
        text: {
          ru: '«Как устроен онбординг и кто помогает новичку в первые месяцы?»',
          en: '“How does onboarding work and who helps a newcomer in the first months?”',
        },
      },
      { text: { ru: '«Когда меня повысят?»', en: '“When will I be promoted?”' } },
      { text: { ru: '«Вопросов нет»', en: '“No questions”' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Вопрос про онбординг и наставника показывает интерес к работе и даёт важную для новичка информацию: будет ли кому помочь. Он проверяет, подходит ли вам команда, — это двусторонний разговор.',
          en: 'A question about onboarding and mentoring shows interest in the work and gives a newcomer key information: whether someone will help. It checks whether the team suits you — the conversation goes both ways.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Отпуск и повышение обсуждают на этапе оффера, «чем вы занимаетесь» выдаёт, что вы не изучили компанию, а «вопросов нет» — упущенный шанс показать интерес.',
          en: 'Vacation and promotion belong to the offer stage, “what do you do” reveals you didn’t research the company, and “no questions” is a missed chance to show interest.',
        },
      },
    ],
    sources: [
      { title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING },
      { title: 'Julia Evans — Questions I’m asking in interviews', url: JULIA_EVANS },
    ],
  },
  {
    id: 'hr-questions-to-employer-002',
    topic: 'hr',
    tags: ['questions-to-employer'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какой вопрос лучше всего покажет, как в команде заботятся о качестве кода?',
      en: 'Which question best reveals how the team cares about code quality?',
    },
    options: [
      { text: { ru: '«У вас хороший код?»', en: '“Is your code good?”' } },
      {
        text: {
          ru: '«Как устроены код-ревью, автотесты и выкладка — сколько шагов от коммита до прода?»',
          en: '“How do code review, automated tests and deployment work — how many steps from commit to production?”',
        },
      },
      { text: { ru: '«Какой у вас любимый язык программирования?»', en: '“What’s your favorite programming language?”' } },
      { text: { ru: '«Вы пишете на последней версии React?»', en: '“Do you use the latest React version?”' } },
      { text: { ru: '«Сколько строк кода в проекте?»', en: '“How many lines of code are in the project?”' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Вопрос о процессах даёт проверяемые факты: есть ли ревью, тесты, автоматическая сборка и выкладка. Это идея известного «теста Джоэла» — простых вопросов, по которым видно зрелость команды. На «у вас хороший код?» ответят «да» почти везде.',
          en: 'A question about processes yields checkable facts: whether there’s review, tests, automated builds and deploys. That’s the idea behind the well-known “Joel Test” — simple questions that reveal a team’s maturity. “Is your code good?” gets a “yes” almost everywhere.',
        },
      },
    ],
    sources: [
      { title: 'Joel Spolsky — The Joel Test', url: JOEL_TEST },
      { title: 'Julia Evans — Questions I’m asking in interviews', url: JULIA_EVANS },
    ],
  },
  {
    id: 'hr-questions-to-employer-003',
    topic: 'hr',
    tags: ['questions-to-employer'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Что стоит уточнить в самом конце любого интервью?',
      en: 'What should you clarify at the very end of any interview?',
    },
    options: [
      { text: { ru: 'Понравились ли вы интервьюеру', en: 'Whether the interviewer liked you' } },
      { text: { ru: 'Какой следующий шаг и когда ждать обратной связи', en: 'What the next step is and when to expect feedback' } },
      { text: { ru: 'Сколько ещё кандидатов на вакансию', en: 'How many other candidates there are' } },
      { text: { ru: 'Можно ли не делать тестовое', en: 'Whether you can skip the take-home' } },
      { text: { ru: 'Номер личного телефона интервьюера', en: 'The interviewer’s personal phone number' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Следующий шаг и сроки ответа помогают планировать поиск: вы знаете, когда напомнить о себе и стоит ли ждать. Заодно можно ещё раз сказать, что вакансия вам интересна.',
          en: 'The next step and response time help you plan your search: you know when to follow up and whether to wait. It’s also a chance to say once more that you’re interested in the role.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-questions-to-employer-004',
    topic: 'hr',
    tags: ['questions-to-employer'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Какой вопрос поможет понять, что от вас ждут на испытательном сроке?',
      en: 'Which question helps you understand what’s expected of you during probation?',
    },
    options: [
      { text: { ru: '«Испытательный срок — это обязательно?»', en: '“Is probation mandatory?”' } },
      {
        text: {
          ru: '«По каким критериям вы поймёте через три месяца, что я справляюсь?»',
          en: '“By what criteria will you know in three months that I’m doing well?”',
        },
      },
      { text: { ru: '«Можно на испытательном работать меньше?»', en: '“Can I work less during probation?”' } },
      { text: { ru: '«Кого чаще всего увольняют?»', en: '“Who gets fired most often?”' } },
      { text: { ru: '«Зарплата на испытательном такая же?»', en: '“Is the salary the same during probation?”' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Критерии успеха делают ожидания явными: какие задачи, какой уровень самостоятельности, как будут оценивать. С ними проще пройти испытательный срок и понять, реалистичны ли ожидания.',
          en: 'Success criteria make expectations explicit: which tasks, how much independence, how you’ll be evaluated. They make probation easier to pass and show whether expectations are realistic.',
        },
      },
    ],
    sources: [{ title: 'Julia Evans — Questions I’m asking in interviews', url: JULIA_EVANS }],
  },
  {
    id: 'hr-hiring-process-001',
    kind: 'order',
    topic: 'hr',
    tags: ['hiring-process'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Расставьте этапы типичного найма во фронтенд-команду по порядку.',
      en: 'Put the stages of a typical front-end hiring process in order.',
    },
    items: [
      { text: { ru: 'Отклик на вакансию', en: 'Applying to the job' } },
      { text: { ru: 'Скрининг с рекрутером', en: 'Screening call with a recruiter' } },
      { text: { ru: 'Техническое интервью или тестовое', en: 'Technical interview or take-home' } },
      { text: { ru: 'Финальная встреча с командой или руководителем', en: 'Final meeting with the team or manager' } },
      { text: { ru: 'Оффер', en: 'Offer' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Скрининг отсекает явное несовпадение по опыту, ожиданиям и формату работы до того, как тратить время инженеров. Техническая часть проверяет навыки, финал — совместимость с командой. Оффер приходит последним, обычно письменно.',
          en: 'Screening filters out obvious mismatches in experience, expectations and work format before engineers spend time. The technical part checks skills, the final round checks team fit. The offer comes last, usually in writing.',
        },
      },
    ],
    sources: [
      { title: 'Wikipedia — Job interview', url: `${WIKI}/Job_interview` },
      { title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING },
    ],
  },
  {
    id: 'hr-hiring-process-002',
    kind: 'order',
    topic: 'hr',
    tags: ['hiring-process'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Вы получили устное предложение о работе. Расставьте шаги до смены работы по порядку.',
      en: 'You got a verbal job offer. Put the steps before switching jobs in order.',
    },
    items: [
      { text: { ru: 'Попросить оффер письменно', en: 'Ask for the offer in writing' } },
      { text: { ru: 'Уточнить условия: состав зарплаты, испытательный, формат', en: 'Clarify terms: pay structure, probation, work format' } },
      { text: { ru: 'Принять оффер и согласовать дату выхода', en: 'Accept the offer and agree on a start date' } },
      { text: { ru: 'Подать заявление на текущей работе', en: 'Hand in your notice at your current job' } },
    ],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Увольняться можно только после того, как условия зафиксированы письменно и вы их приняли: устные договорённости легко меняются. Дату выхода согласуют с учётом срока предупреждения на текущей работе — по ТК РФ это обычно две недели.',
          en: 'Resign only after the terms are in writing and you’ve accepted them: verbal agreements change easily. The start date accounts for your notice period — under the Russian Labor Code it’s usually two weeks.',
        },
      },
    ],
    sources: [{ title: 'ТК РФ — статья 80 (расторжение по инициативе работника)', url: LABOR_CODE }],
  },
  {
    id: 'hr-hiring-process-003',
    topic: 'hr',
    tags: ['hiring-process'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какой максимальный испытательный срок для обычного сотрудника по ТК РФ?',
      en: 'What is the maximum probation period for a regular employee under the Russian Labor Code?',
    },
    options: [
      { text: { ru: '1 месяц', en: '1 month' } },
      { text: { ru: '2 месяца', en: '2 months' } },
      { text: { ru: '3 месяца', en: '3 months' } },
      { text: { ru: '6 месяцев', en: '6 months' } },
      { text: { ru: '1 год', en: '1 year' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'По статье 70 ТК РФ срок испытания — не больше **трёх месяцев**. До шести месяцев — только для руководителей организаций, их заместителей и главных бухгалтеров. Условие об испытании должно быть в трудовом договоре.',
          en: 'Under Article 70 of the Russian Labor Code, probation is at most **three months**. Up to six months applies only to heads of organizations, their deputies and chief accountants. The probation clause must be in the employment contract.',
        },
      },
    ],
    sources: [
      { title: 'ТК РФ — статья 70', url: LABOR_CODE },
      { title: 'Wikipedia — Probation (workplace)', url: `${WIKI}/Probation_(workplace)` },
    ],
  },
  {
    id: 'hr-hiring-process-004',
    topic: 'hr',
    tags: ['hiring-process'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Вы поняли, что работа не подходит, ещё на испытательном сроке. За сколько нужно предупредить работодателя об уходе по ТК РФ?',
      en: 'During probation you realize the job isn’t right. How much notice must you give under the Russian Labor Code?',
    },
    options: [
      { text: { ru: 'Можно уйти в тот же день без предупреждения', en: 'You can leave the same day without notice' } },
      { text: { ru: 'За 3 дня', en: '3 days' } },
      { text: { ru: 'За 2 недели', en: '2 weeks' } },
      { text: { ru: 'За 1 месяц', en: '1 month' } },
      { text: { ru: 'Уволиться до конца испытательного нельзя', en: 'You can’t resign before probation ends' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'По статье 71 ТК РФ на испытательном сроке сотрудник может уволиться по собственному желанию, предупредив работодателя письменно за **три дня**. Работодатель тоже может расторгнуть договор при неудовлетворительном результате, предупредив за три дня и указав причины.',
          en: 'Under Article 71 of the Russian Labor Code, during probation an employee can resign with **three days’** written notice. The employer can also terminate for unsatisfactory results with three days’ notice, stating the reasons.',
        },
      },
    ],
    sources: [{ title: 'ТК РФ — статья 71', url: LABOR_CODE }],
  },
  {
    id: 'hr-hiring-process-005',
    topic: 'hr',
    tags: ['hiring-process'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Тестовое задание выглядит как неделя работы над полноценным продуктом. Как разумнее поступить?',
      en: 'A take-home assignment looks like a week of work on a full product. What’s the sensible move?',
    },
    options: [
      { text: { ru: 'Молча делать неделю — иначе откажут', en: 'Silently spend a week on it — otherwise you’ll be rejected' } },
      {
        text: {
          ru: 'Уточнить ожидаемое время и что важнее всего проверить, предложить сделать урезанную версию',
          en: 'Ask about the expected time and what matters most, and offer a reduced version',
        },
      },
      { text: { ru: 'Скопировать готовый проект с GitHub', en: 'Copy a ready-made project from GitHub' } },
      { text: { ru: 'Сразу написать, что тестовые — это эксплуатация', en: 'Reply right away that take-homes are exploitation' } },
      { text: { ru: 'Пропасть без ответа', en: 'Disappear without replying' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Нормальное тестовое ограничено по времени — несколько часов. Если объём неясен, вежливо уточните ожидания и критерии: часто компании важнее подход и качество кода, чем все фичи. Так вы экономите время и показываете умение договариваться о задаче.',
          en: 'A reasonable take-home is time-boxed — a few hours. If the scope is unclear, politely ask about expectations and criteria: companies often care more about approach and code quality than every feature. You save time and show you can negotiate a task.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
  {
    id: 'hr-hiring-process-006',
    topic: 'hr',
    tags: ['hiring-process'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Что обычно проверяют на скрининге с рекрутером?',
      en: 'What is usually checked in a recruiter screening call?',
    },
    options: [
      { text: { ru: 'Алгоритмы на доске', en: 'Whiteboard algorithms' } },
      {
        text: {
          ru: 'Опыт в целом, ожидания по зарплате, формат работы и интерес к вакансии',
          en: 'Overall experience, salary expectations, work format and interest in the role',
        },
      },
      { text: { ru: 'Знание всех хуков React наизусть', en: 'Knowing every React hook by heart' } },
      { text: { ru: 'Только оценки из диплома', en: 'Only your diploma grades' } },
      { text: { ru: 'Ничего — это формальность', en: 'Nothing — it’s a formality' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Скрининг — короткий разговор, который отсекает несовпадения до технических этапов: подходит ли опыт, укладываются ли ожидания в бюджет, устраивает ли формат (офис, удалёнка, город). Готовьте короткий рассказ о себе и вилку по зарплате.',
          en: 'Screening is a short call that filters out mismatches before the technical stages: whether your experience fits, expectations fit the budget, and the format works (office, remote, city). Prepare a short introduction and a salary range.',
        },
      },
    ],
    sources: [{ title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING }],
  },
];
