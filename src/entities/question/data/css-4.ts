import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/CSS';

export const CSS_QUESTIONS_4: Question[] = [
  {
    id: 'css-box-model-output-001',
    kind: 'output',
    topic: 'css',
    tags: ['box-model'],
    difficulty: 1,
    popular: true,
    prompt: {
      ru: 'Какую ширину займёт `.box` от рамки до рамки? Впишите значение в px.',
      en: 'How wide is `.box` from border edge to border edge? Type the value in px.',
    },
    code: {
      lang: 'css',
      source: `.box {
  width: 200px;
  padding: 20px;
  border: 5px solid;
  margin: 10px;
}`,
    },
    answers: ['250px', '250'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'По умолчанию `box-sizing: content-box`: `width` задаёт только контент, а `padding` и `border` прибавляются с обеих сторон: 200 + 2 × 20 + 2 × 5 = 250px.',
          en: 'The default is `box-sizing: content-box`: `width` sets only the content, and `padding` and `border` are added on both sides: 200 + 2 × 20 + 2 × 5 = 250px.',
        },
      },
      {
        type: 'text',
        text: {
          ru: '`margin` — внешний отступ, в размер бокса не входит. С `box-sizing: border-box` ширина от рамки до рамки была бы ровно 200px.',
          en: '`margin` is outer spacing and is not part of the box size. With `box-sizing: border-box` the border-to-border width would be exactly 200px.',
        },
      },
    ],
    sources: [{ title: 'MDN — box-sizing', url: `${MDN}/box-sizing` }],
    verify: {
      kind: 'css-computed',
      selector: '.box',
      property: 'rect.width',
      html: '<div class="box"></div>',
    },
  },
  {
    id: 'css-units-output-001',
    kind: 'output',
    topic: 'css',
    tags: ['css-units'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Чему равен `padding-top` у `.title`? Впишите значение в px.',
      en: 'What is the `padding-top` of `.title`? Type the value in px.',
    },
    code: {
      lang: 'css',
      source: `html {
  font-size: 16px;
}

.card {
  font-size: 20px;
}

.title {
  font-size: 1.5em;
  padding: 0.5em;
}`,
    },
    answers: ['15px', '15'],
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`font-size: 1.5em` считается от шрифта родителя: 1.5 × 20px = 30px.',
          en: '`font-size: 1.5em` is relative to the parent’s font: 1.5 × 20px = 30px.',
        },
      },
      {
        type: 'text',
        text: {
          ru: 'Во всех остальных свойствах `em` берётся от шрифта **самого элемента**, поэтому `padding: 0.5em` = 0.5 × 30px = 15px. Чтобы не зависеть от вложенности, используют `rem`.',
          en: 'In every other property `em` uses the **element’s own** font size, so `padding: 0.5em` = 0.5 × 30px = 15px. Use `rem` to avoid depending on nesting.',
        },
      },
    ],
    sources: [{ title: 'MDN — CSS values and units', url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Values_and_units' }],
    verify: {
      kind: 'css-computed',
      selector: '.title',
      property: 'padding-top',
      html: '<div class="card"><h2 class="title">Title</h2></div>',
    },
  },
];
