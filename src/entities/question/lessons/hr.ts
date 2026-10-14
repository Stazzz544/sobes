import type { Lesson } from '../model/types';

const WIKI = 'https://en.wikipedia.org/wiki';
const HARVARD_INTERVIEWING = 'https://careerservices.fas.harvard.edu/resources/interviewing/';
const MIT_STAR = 'https://capd.mit.edu/resources/the-star-method-for-behavioral-interviews/';

export const HR_LESSONS: Lesson[] = [
  {
    tag: 'self-presentation',
    summary: {
      ru: '«Расскажите о себе» — не пересказ резюме, а 1–2 минуты о том, почему вы подходите именно на эту роль.',
      en: '“Tell me about yourself” isn’t a résumé recap but 1–2 minutes on why you fit this particular role.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Рабочая структура — **настоящее → прошлое → будущее**. Сейчас: чем занимаетесь и одно конкретное достижение. Раньше: как пришли к этому и какой опыт пригодится в новой роли. Дальше: чего хотите и почему эта компания — логичный следующий шаг.',
          en: 'A structure that works is **present → past → future**. Now: what you do and one concrete achievement. Before: how you got here and which experience matters for the new role. Next: what you want and why this company is the logical next step.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Новичку без коммерческого опыта настоящее — это учебные и пет-проекты: что сделали сами, какой стек, что получилось. Личное (хобби, семья) — только если связано с работой; детство и вся биография — мимо. Интервьюер по этому ответу решает, о чём спрашивать дальше, поэтому называйте то, о чём готовы рассказать подробно.',
          en: 'For a newcomer without commercial experience, the present is study and pet projects: what you built yourself, which stack, what came out of it. Personal things (hobbies, family) only if they relate to the job; childhood and a full biography are off-topic. The interviewer uses this answer to decide what to ask next, so mention things you can talk about in depth.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Структура: настоящее → прошлое → будущее.', en: 'Structure: present → past → future.' },
      { ru: '1–2 минуты, без пересказа всего резюме.', en: '1–2 minutes, no full résumé recap.' },
      { ru: 'Связывайте опыт с этой вакансией и компанией.', en: 'Tie your experience to this job and company.' },
      { ru: 'Упоминайте то, о чём готовы говорить подробно.', en: 'Mention what you’re ready to discuss in depth.' },
    ],
    sources: [
      {
        title: 'The Muse — How to answer “Tell me about yourself”',
        url: 'https://www.themuse.com/advice/tell-me-about-yourself-interview-question-answer-examples',
      },
      { title: 'Wikipedia — Elevator pitch', url: `${WIKI}/Elevator_pitch` },
    ],
  },
  {
    tag: 'star',
    summary: {
      ru: 'На поведенческие вопросы («расскажите о случае, когда…») отвечают историей по STAR: ситуация, задача, действия, результат.',
      en: 'Behavioral questions (“tell me about a time when…”) are answered with a STAR story: situation, task, action, result.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**S**ituation — контекст в паре предложений. **T**ask — что именно требовалось от вас. **A**ction — что сделали **вы**, а не команда: «я предложил», «я переписал». **R**esult — чем закончилось, лучше в цифрах, и чему научились. Основное время — на действия и результат.',
          en: '**S**ituation — context in a couple of sentences. **T**ask — what exactly was required of you. **A**ction — what **you** did, not the team: “I proposed”, “I rewrote”. **R**esult — how it ended, ideally in numbers, and what you learned. Spend most of the time on action and result.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Поведенческие вопросы задают потому, что прошлое поведение предсказывает будущее лучше гипотетических ответов. Заготовьте 4–6 историй — конфликт, ошибка, сжатые сроки, инициатива, обучение новому — и подстраивайте их под вопрос.',
          en: 'Behavioral questions are asked because past behavior predicts future behavior better than hypothetical answers. Prepare 4–6 stories — a conflict, a mistake, a tight deadline, an initiative, learning something new — and adapt them to the question.',
        },
      },
    ],
    keyPoints: [
      { ru: 'STAR: ситуация → задача → действия → результат.', en: 'STAR: situation → task → action → result.' },
      { ru: 'Говорите «я», а не «мы»: интервьюеру важен ваш вклад.', en: 'Say “I”, not “we”: the interviewer wants your contribution.' },
      { ru: 'Результат — измеримый, плюс вывод.', en: 'The result should be measurable, plus a takeaway.' },
      { ru: 'Заранее подготовьте 4–6 историй.', en: 'Prepare 4–6 stories in advance.' },
    ],
    sources: [
      { title: 'MIT CAPD — The STAR method', url: MIT_STAR },
      { title: 'Wikipedia — Situation, task, action, result', url: `${WIKI}/Situation,_task,_action,_result` },
      {
        title: 'Google re:Work — Use structured interviewing',
        url: 'https://rework.withgoogle.com/guides/hiring-use-structured-interviewing/steps/introduction/',
      },
    ],
  },
  {
    tag: 'tough-questions',
    summary: {
      ru: 'Слабые стороны, провалы, конфликты, причина ухода — проверяют самооценку и честность. Работает правда плюс вывод, а не идеальная картинка.',
      en: 'Weaknesses, failures, conflicts, reasons for leaving — they test self-awareness and honesty. The truth plus a takeaway works, not a perfect picture.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '**Слабая сторона** — реальная, не критичная для роли, и с тем, что вы уже делаете: «долго не прошу помощи — теперь ставлю себе лимит в час, потом пишу в чат». «Я перфекционист» звучит как уход от ответа.',
          en: 'A **weakness** should be real, not critical for the role, and come with what you already do about it: “I take too long to ask for help — now I give myself an hour, then I post in the chat”. “I’m a perfectionist” sounds like dodging the question.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '**Провал или ошибка** — история по STAR, где главное — что вы исправили и что поменяли в работе. **Конфликт** — про разногласие по делу, которое решили разговором и аргументами. **Причина ухода** — про то, куда вы идёте, а не от чего бежите; бывшего работодателя не ругают.',
          en: 'A **failure or mistake** is a STAR story where the point is what you fixed and what you changed in how you work. A **conflict** is about a work disagreement resolved through conversation and arguments. The **reason for leaving** is about where you’re going, not what you’re running from; don’t criticize a former employer.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Слабость — реальная, не ключевая для роли, с планом.', en: 'A weakness: real, not key to the role, with a plan.' },
      { ru: 'В истории об ошибке главное — вывод и изменения.', en: 'In a mistake story, the point is the takeaway and changes.' },
      { ru: 'Не критикуйте бывших коллег и работодателя.', en: 'Don’t criticize former colleagues or employers.' },
    ],
    sources: [
      { title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING },
      { title: 'MIT CAPD — The STAR method', url: MIT_STAR },
    ],
  },
  {
    tag: 'motivation',
    summary: {
      ru: '«Почему мы?», «где вы через 5 лет?» и «сколько хотите?» проверяют, что вы понимаете, куда идёте, и знаете рынок.',
      en: '“Why us?”, “where do you see yourself in 5 years?” and “what salary do you expect?” check that you know where you’re heading and know the market.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: '«Почему мы» — конкретика о продукте, стеке или задачах, которую вы узнали заранее, и как это совпадает с вашими целями. «Через 5 лет» — про рост в профессии (глубже в стек, ответственность за фичи, наставничество), а не про «ваше место» или уход в другую сферу.',
          en: '“Why us” — specifics about the product, stack or tasks that you researched in advance, and how they match your goals. “In 5 years” — about growing in the profession (deeper in the stack, owning features, mentoring), not about “your job” or switching fields.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'К вопросу о зарплате готовятся по данным: зарплатные отчёты и вакансии с вилками. Называют **обоснованную вилку** «на руки» или «до вычета налогов» — и уточняют, что именно. Слишком низкая цифра закрепляет низкий уровень, «сколько дадите» без цифры выглядит неподготовленно.',
          en: 'Prepare for the salary question with data: salary reports and job posts with ranges. Name a **justified range**, specifying whether it’s net or gross. A number that’s too low anchors you low; “whatever you offer” without a number looks unprepared.',
        },
      },
    ],
    keyPoints: [
      { ru: '«Почему мы» — конкретика о компании, изученная заранее.', en: '“Why us” — specifics about the company, researched in advance.' },
      { ru: 'Планы — рост в профессии, а не «ваше место».', en: 'Plans — growth in the profession, not “your job”.' },
      { ru: 'Зарплата — вилка по рыночным данным, с уточнением «на руки» или «до налогов».', en: 'Salary — a range based on market data, net or gross specified.' },
    ],
    sources: [
      { title: 'Хабр Карьера — зарплаты в IT', url: 'https://career.habr.com/salaries' },
      { title: 'Wikipedia — Salary negotiation', url: `${WIKI}/Salary_negotiation` },
      { title: 'HBR — 15 Rules for Negotiating a Job Offer', url: 'https://hbr.org/2014/04/15-rules-for-negotiating-a-job-offer' },
    ],
  },
  {
    tag: 'questions-to-employer',
    summary: {
      ru: 'Вопросы в конце интервью — способ проверить, подходит ли вам команда, и показать интерес. «Вопросов нет» — упущенная возможность.',
      en: 'Questions at the end of an interview let you check whether the team suits you and show interest. “No questions” is a missed chance.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Спрашивайте о том, что повлияет на вашу работу: как устроены код-ревью и релизы, есть ли тесты и CI, как проходит онбординг, кто наставник у новичка, по каким критериям оценят испытательный срок. Такие ответы честнее любых обещаний в вакансии.',
          en: 'Ask about what will affect your work: how code review and releases work, whether there are tests and CI, how onboarding goes, who mentors a newcomer, what criteria the probation period is judged by. These answers are more honest than any job ad.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Не стоит начинать с отпуска и бонусов — их обсуждают на этапе оффера — и спрашивать то, что написано на сайте компании. В конце уточните следующий шаг: когда ждать обратной связи.',
          en: 'Don’t lead with vacation and bonuses — they’re discussed at the offer stage — or ask what’s on the company website. At the end, ask about the next step: when to expect feedback.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Готовьте 3–5 вопросов о работе, команде и процессах.', en: 'Prepare 3–5 questions about the work, team and processes.' },
      { ru: 'Спросите о критериях успеха на испытательном сроке.', en: 'Ask about success criteria for probation.' },
      { ru: 'Условия и бонусы — на этапе оффера.', en: 'Benefits and bonuses — at the offer stage.' },
      { ru: 'Уточните следующий шаг и сроки ответа.', en: 'Ask about the next step and when to expect an answer.' },
    ],
    sources: [
      { title: 'Julia Evans — Questions I’m asking in interviews', url: 'https://jvns.ca/blog/2013/12/30/questions-im-asking-in-interviews/' },
      { title: 'Joel Spolsky — The Joel Test', url: 'https://www.joelonsoftware.com/2000/08/09/the-joel-test-12-steps-to-better-code/' },
      { title: 'Harvard Mignone Center — Interviewing', url: HARVARD_INTERVIEWING },
    ],
  },
  {
    tag: 'hiring-process',
    summary: {
      ru: 'Найм в IT — несколько этапов от скрининга до оффера. Понимание этапов и правил испытательного срока помогает не терять время и не соглашаться вслепую.',
      en: 'Hiring in IT is several stages from screening to offer. Knowing the stages and probation rules helps you not waste time or accept blindly.',
    },
    blocks: [
      {
        type: 'text',
        text: {
          ru: 'Обычный путь: отклик → скрининг с рекрутером (опыт, ожидания, формат работы) → техническое интервью и/или тестовое → финальная встреча с командой или руководителем → оффер. Тестовое разумно, когда оно ограничено по времени; огромная бесплатная задача на неделю — повод уточнить объём.',
          en: 'The usual path: application → recruiter screening (experience, expectations, work format) → technical interview and/or take-home → final meeting with the team or manager → offer. A take-home is reasonable when it’s time-boxed; a huge week-long free task is a reason to clarify the scope.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Оффер сравнивают целиком: зарплата и её состав, формат и график, задачи и стек, обучение, ДМС. По ТК РФ испытательный срок — не больше **трёх месяцев** (для руководителей — до шести), а уволиться в это время можно, предупредив за **три дня**.',
          en: 'Compare offers as a whole: salary and its structure, format and schedule, tasks and stack, learning, health insurance. Under the Russian Labor Code, probation is at most **three months** (up to six for managers), and you can resign during it with **three days’** notice.',
        },
      },
    ],
    keyPoints: [
      { ru: 'Этапы: скрининг → техничка/тестовое → финал → оффер.', en: 'Stages: screening → technical/take-home → final → offer.' },
      { ru: 'Тестовое должно быть ограничено по времени.', en: 'A take-home should be time-boxed.' },
      { ru: 'Оффер сравнивают целиком, не только по зарплате.', en: 'Compare offers as a whole, not just by salary.' },
      { ru: 'Испытательный срок по ТК РФ — до 3 месяцев.', en: 'Probation under the Russian Labor Code — up to 3 months.' },
    ],
    sources: [
      { title: 'ТК РФ — статьи 70–71 (испытание при приёме на работу)', url: 'https://www.consultant.ru/document/cons_doc_LAW_34683/' },
      { title: 'Wikipedia — Probation (workplace)', url: `${WIKI}/Probation_(workplace)` },
      { title: 'Wikipedia — Structured interview', url: `${WIKI}/Structured_interview` },
    ],
  },
];
