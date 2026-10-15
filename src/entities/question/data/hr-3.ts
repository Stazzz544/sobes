import type { Question } from '../model/types';

const TIH = 'https://www.techinterviewhandbook.org';

export const HR_QUESTIONS_3: Question[] = [
  {
    id: 'hr-motivation-006',
    topic: 'hr',
    tags: ['motivation'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: 'Вы сказали руководителю, что уходите на оффер с зарплатой на 30% выше. Вам тут же предлагают такую же сумму, чтобы остались. Как разумнее поступить?',
      en: 'You told your manager you’re leaving for an offer that pays 30% more. They immediately match the amount to keep you. What’s the sensible move?',
    },
    options: [
      { text: { ru: 'Сразу соглашаться: деньги те же, а менять ничего не нужно', en: 'Accept right away: same money, nothing to change' } },
      {
        text: {
          ru: 'Вспомнить, почему начали искать работу: если причины не только в деньгах, контрпредложение их не решит',
          en: 'Recall why you started looking: if the reasons weren’t only money, the counteroffer won’t fix them',
        },
      },
      { text: { ru: 'Попросить у нового работодателя ещё больше, ссылаясь на контрпредложение', en: 'Ask the new employer for even more, citing the counteroffer' } },
      { text: { ru: 'Принять оба предложения и решить позже', en: 'Accept both offers and decide later' } },
      { text: { ru: 'Отказаться от разговора о контрпредложении', en: 'Refuse to discuss the counteroffer' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Контрпредложение меняет деньги, но не задачи, команду и рост, из-за которых обычно и ищут работу. К тому же руководитель уже знает, что вы готовы уйти, — это может повлиять на доверие. Решение принимают по исходным причинам. Торговаться между двумя компаниями без реального намерения перейти — рискованно для репутации.',
          en: 'A counteroffer changes the money but not the work, team and growth that usually drive a job search. Plus, your manager now knows you’re ready to leave — that may affect trust. Decide based on your original reasons. Playing two companies against each other without a real intent to move risks your reputation.',
        },
      },
    ],
    sources: [{ title: 'Tech Interview Handbook — Negotiation', url: `${TIH}/negotiation/` }],
  },
  {
    id: 'hr-hiring-process-007',
    topic: 'hr',
    tags: ['hiring-process', 'motivation'],
    difficulty: 3,
    popular: true,
    prompt: {
      ru: 'Оффер на 15% ниже ваших ожиданий, а компания вам нравится. Какой ответ сильнее?',
      en: 'The offer is 15% below your expectations, but you like the company. Which response is stronger?',
    },
    options: [
      { text: { ru: '«Тогда я отказываюсь»', en: '“Then I decline”' } },
      { text: { ru: '«Хорошо, согласен», — чтобы не потерять предложение', en: '“OK, I accept,” — so as not to lose the offer' } },
      {
        text: {
          ru: '«Мне очень интересна команда. Исходя из рынка и задач роли, я рассчитывал на X — есть ли возможность приблизиться к этой сумме или пересмотреть её после испытательного срока?»',
          en: '“I’m really interested in the team. Based on the market and the role’s scope, I expected X — is there a way to get closer to that or revisit it after probation?”',
        },
      },
      { text: { ru: '«У меня есть другие офферы на больше», — даже если их нет', en: '“I have other, higher offers,” — even if you don’t' } },
      { text: { ru: 'Не отвечать неделю, чтобы компания занервничала', en: 'Don’t reply for a week to make the company nervous' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Сильный ответ показывает интерес к работе, называет конкретную сумму с обоснованием (рынок, объём задач) и предлагает варианты: повышение, пересмотр после испытательного срока, бонус. Выдуманные офферы легко проверить вопросом, а молчание выглядит как незаинтересованность. Перед согласием просят оффер письменно со всеми условиями.',
          en: 'A strong response shows interest in the work, names a specific figure with reasons (market, scope) and offers options: a raise, a review after probation, a bonus. Fake offers are easy to probe, and silence looks like disinterest. Before accepting, ask for the written offer with all terms.',
        },
      },
    ],
    sources: [
      { title: 'HBR — 15 Rules for Negotiating a Job Offer', url: 'https://hbr.org/2014/04/15-rules-for-negotiating-a-job-offer' },
      { title: 'Tech Interview Handbook — Negotiation', url: `${TIH}/negotiation/` },
    ],
  },
  {
    id: 'hr-star-005',
    topic: 'hr',
    tags: ['star'],
    difficulty: 3,
    popular: false,
    prompt: {
      ru: '«Расскажите, как вы добились изменения, на которое у вас не было полномочий». Какая история сильнее?',
      en: '“Tell me how you achieved a change you had no authority over.” Which story is stronger?',
    },
    options: [
      { text: { ru: '«Я просто сделал как считал нужным, а потом все согласились»', en: '“I just did what I thought was right, and later everyone agreed”' } },
      { text: { ru: '«Я пожаловался руководителю, и он всё решил»', en: '“I complained to my manager, and they sorted it out”' } },
      {
        text: {
          ru: '«Сборка шла 12 минут. Я замерил, где теряется время, показал команде прототип с кешем и цифрами, учёл возражения — после внедрения сборка стала занимать 4 минуты»',
          en: '“Builds took 12 minutes. I measured where time went, showed the team a caching prototype with numbers, addressed objections — after rollout builds took 4 minutes”',
        },
      },
      { text: { ru: '«Таких ситуаций у меня не было»', en: '“I’ve never had such a situation”' } },
      { text: { ru: '«Я убедил всех, потому что был прав»', en: '“I convinced everyone because I was right”' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Это вопрос о влиянии без власти — важный для middle и senior. Сильная история по STAR показывает, **как** вы убеждали: данные, прототип, работа с возражениями, — и измеримый результат. Действие в обход команды, перекладывание на руководителя или «я был прав» без доказательств показывают обратное.',
          en: 'This asks about influence without authority — important for middle and senior roles. A strong STAR story shows **how** you persuaded: data, a prototype, handling objections — and a measurable result. Acting around the team, offloading to a manager or “I was right” without evidence show the opposite.',
        },
      },
    ],
    sources: [{ title: 'Tech Interview Handbook — Behavioral interview', url: `${TIH}/behavioral-interview/` }],
  },
  {
    id: 'hr-tough-questions-006',
    topic: 'hr',
    tags: ['tough-questions'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: '«У вас в резюме перерыв в работе почти год. Чем занимались?» Какой ответ сильнее?',
      en: '“There’s almost a year gap in your résumé. What were you doing?” Which answer is stronger?',
    },
    options: [
      { text: { ru: 'Уйти от ответа и перевести разговор на проекты', en: 'Dodge and switch to talking about projects' } },
      { text: { ru: 'Подробно рассказать о личных обстоятельствах', en: 'Describe personal circumstances in detail' } },
      {
        text: {
          ru: 'Коротко и честно назвать причину, рассказать, что делали для профессии в это время, и подчеркнуть готовность к работе сейчас',
          en: 'Briefly and honestly name the reason, say what you did professionally in that time, and stress you’re ready to work now',
        },
      },
      { text: { ru: 'Сказать, что работали, но не можете назвать компанию', en: 'Say you worked but can’t name the company' } },
      { text: { ru: 'Извиняться за перерыв', en: 'Apologize for the gap' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Перерыв сам по себе не проблема — интервьюер проверяет, не скрываете ли вы что-то и в форме ли вы сейчас. Одно-два предложения о причине без лишних подробностей, затем то, что поддерживало навыки: курсы, пет-проект, open source. Выдуманная работа легко вскрывается проверкой рекомендаций.',
          en: 'A gap itself isn’t a problem — the interviewer checks that you aren’t hiding something and are in shape now. One or two sentences on the reason without excess detail, then what kept your skills up: courses, a pet project, open source. A made-up job is easily exposed by reference checks.',
        },
      },
    ],
    sources: [{ title: 'Harvard — Interviewing', url: 'https://careerservices.fas.harvard.edu/resources/interviewing/' }],
  },
  {
    id: 'hr-questions-to-employer-005',
    topic: 'hr',
    tags: ['questions-to-employer'],
    difficulty: 2,
    popular: false,
    prompt: {
      ru: 'Вы спросили про процессы в команде. Какой ответ — повод насторожиться?',
      en: 'You asked about the team’s processes. Which answer is a red flag?',
    },
    options: [
      { text: { ru: '«Каждый PR смотрит хотя бы один коллега»', en: '“Every PR is reviewed by at least one colleague”' } },
      { text: { ru: '«Релизим раз в неделю, есть автотесты в CI»', en: '“We release weekly, with automated tests in CI”' } },
      {
        text: {
          ru: '«Код-ревью нет — некогда, у нас всё горит, дедлайн был вчера»',
          en: '“No code review — no time, everything’s on fire, the deadline was yesterday”',
        },
      },
      { text: { ru: '«На онбординг новичку даём ментора на первый месяц»', en: '“A newcomer gets a mentor for the first month”' } },
      { text: { ru: '«Техдолгу выделяем часть каждого спринта»', en: '“We set aside part of every sprint for tech debt”' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Постоянный аврал без ревью означает переработки, хрупкий код и мало обучения — особенно тяжело это джуну. Сам по себе дедлайн нормален; тревожно, когда «всё горит» — обычное состояние. Хорошие вопросы к работодателю нужны не для вежливости, а чтобы понять, в каких условиях вы будете работать.',
          en: 'Constant firefighting without review means overtime, fragile code and little learning — especially hard for a junior. A deadline itself is normal; it’s alarming when “everything’s on fire” is the default. Good questions to the employer aren’t about politeness — they reveal the conditions you’ll work in.',
        },
      },
    ],
    sources: [{ title: 'Julia Evans — Questions I’m asking in interviews', url: 'https://jvns.ca/blog/2013/12/30/questions-im-asking-in-interviews/' }],
  },
];
