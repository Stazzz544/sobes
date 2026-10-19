import type { Question } from '../model/types';

const MDN = 'https://developer.mozilla.org/en-US/docs/Web/CSS';

export const CSS_QUESTIONS_7: Question[] = [
  {
    id: 'css-pos-006',
    topic: 'css',
    tags: ['positioning'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Шапка с `position: sticky` уезжает вместе со страницей и не прилипает к верху окна. Чего не хватает?',
      en: 'A header with `position: sticky` scrolls away with the page instead of sticking to the top of the window. What’s missing?',
    },
    code: {
      lang: 'css',
      source: `.header {
  position: sticky;
  background: white;
}`,
    },
    options: [
      { text: { ru: '`z-index: 10`', en: '`z-index: 10`' } },
      { text: { ru: '`top: 0` — порог, на котором элемент прилипает', en: '`top: 0` — the threshold where the element sticks' } },
      { text: { ru: '`display: block`', en: '`display: block`' } },
      { text: { ru: '`position: relative` у родителя', en: '`position: relative` on the parent' } },
      { text: { ru: '`overflow: hidden` у `body`', en: '`overflow: hidden` on `body`' } },
    ],
    answer: 'b',
    explanation: [
      {
        type: 'text',
        text: {
          ru: '`sticky` ведёт себя как `relative`, пока элемент не дойдёт до порога, заданного `top`, `bottom`, `left` или `right`. Без порога прилипать не к чему, и шапка прокручивается как обычный блок. Ещё две частые причины: предок с `overflow: hidden` или `auto` становится прокручиваемым контейнером, внутри которого и работает прилипание, а сам элемент не выходит за пределы своего родителя — когда родитель уехал, уезжает и шапка.',
          en: '`sticky` behaves like `relative` until the element reaches the threshold set by `top`, `bottom`, `left` or `right`. With no threshold there’s nothing to stick to, so the header scrolls like a normal block. Two other common causes: an ancestor with `overflow: hidden` or `auto` becomes the scroll container that sticking works within, and the element never leaves its parent — when the parent scrolls away, so does the header.',
        },
      },
    ],
    sources: [{ title: 'MDN — position: sticky', url: `${MDN}/position#sticky_positioning` }],
  },
  {
    id: 'css-anim-006',
    topic: 'css',
    tags: ['animations'],
    difficulty: 2,
    popular: true,
    prompt: {
      ru: 'Какие свойства лучше анимировать, чтобы анимация шла плавно и не пересчитывала раскладку страницы на каждом кадре?',
      en: 'Which properties are best to animate so that the animation stays smooth and doesn’t recalculate the page layout on every frame?',
    },
    options: [
      { text: { ru: '`width` и `height`', en: '`width` and `height`' } },
      { text: { ru: '`top` и `left`', en: '`top` and `left`' } },
      { text: { ru: '`transform` и `opacity`', en: '`transform` and `opacity`' } },
      { text: { ru: '`margin` и `padding`', en: '`margin` and `padding`' } },
      { text: { ru: 'Любые: браузер оптимизирует всё одинаково', en: 'Any: the browser optimizes everything equally' } },
    ],
    answer: 'c',
    explanation: [
      {
        type: 'text',
        text: {
          ru: 'Изменение `width`, `top` или `margin` сдвигает соседей, поэтому браузер на каждом кадре заново считает раскладку и перерисовывает страницу. `transform` и `opacity` раскладку не меняют: элемент выносится в отдельный слой, и его сдвиг, масштаб и прозрачность обрабатывает композитор, часто на GPU и вне главного потока. Поэтому «выезд» делают через `transform: translateX()`, а не через `left`.',
          en: 'Changing `width`, `top` or `margin` moves neighbors, so on every frame the browser recalculates layout and repaints the page. `transform` and `opacity` don’t change layout: the element gets its own layer, and the compositor handles its movement, scale and transparency, often on the GPU and off the main thread. That’s why a slide-in uses `transform: translateX()`, not `left`.',
        },
      },
    ],
    sources: [{ title: 'web.dev — How to create high-performance CSS animations', url: 'https://web.dev/articles/animations-guide' }],
  },
];
