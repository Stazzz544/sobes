import type { Illustration, IllustrationId } from '../model/types';

const STATE_KINDS: Illustration = {
  id: 'state-kinds',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 212">
<rect x="0" y="0" width="154" height="100" rx="12" fill="{{color.accentSoft}}"/>
<text x="12" y="26" font-size="15" font-weight="bold" fill="{{color.accentText}}">{{label.local}}</text>
<text x="12" y="50" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">useState</text>
<text x="12" y="72" font-size="12" fill="{{color.textSecondary}}">{{label.localExample}}</text>
<text x="12" y="88" font-size="12" fill="{{color.textSecondary}}">{{label.localExample2}}</text>
<rect x="166" y="0" width="154" height="100" rx="12" fill="{{color.successSoft}}"/>
<text x="178" y="26" font-size="15" font-weight="bold" fill="{{color.success}}">{{label.shared}}</text>
<text x="178" y="50" font-size="12" fill="{{color.textPrimary}}">{{label.sharedWhere}}</text>
<text x="178" y="72" font-size="12" fill="{{color.textSecondary}}">{{label.sharedExample}}</text>
<text x="178" y="88" font-size="12" fill="{{color.textSecondary}}">{{label.sharedExample2}}</text>
<rect x="0" y="112" width="154" height="100" rx="12" fill="{{color.warningSoft}}"/>
<text x="12" y="138" font-size="15" font-weight="bold" fill="{{color.textPrimary}}">{{label.server}}</text>
<text x="12" y="162" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">TanStack Query</text>
<text x="12" y="184" font-size="12" fill="{{color.textSecondary}}">{{label.serverExample}}</text>
<text x="12" y="200" font-size="12" fill="{{color.textSecondary}}">{{label.serverExample2}}</text>
<rect x="167" y="113" width="152" height="98" rx="11" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="178" y="138" font-size="15" font-weight="bold" fill="{{color.textPrimary}}">URL</text>
<text x="178" y="162" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">?page=2</text>
<text x="178" y="184" font-size="12" fill="{{color.textSecondary}}">{{label.urlExample}}</text>
<text x="178" y="200" font-size="12" fill="{{color.textSecondary}}">{{label.urlExample2}}</text>
</svg>`,
  labels: {
    local: { ru: 'Локальное', en: 'Local' },
    localExample: { ru: 'модалка открыта?', en: 'is the modal open?' },
    localExample2: { ru: 'текст в поле', en: 'input text' },
    shared: { ru: 'Общее', en: 'Shared' },
    sharedWhere: { ru: 'контекст или стор', en: 'context or a store' },
    sharedExample: { ru: 'тема, корзина', en: 'theme, cart' },
    sharedExample2: { ru: 'авторизация', en: 'auth' },
    server: { ru: 'Серверное', en: 'Server' },
    serverExample: { ru: 'списки, профиль', en: 'lists, profile' },
    serverExample2: { ru: 'кэш, а не стор', en: 'a cache, not a store' },
    urlExample: { ru: 'фильтры, страница', en: 'filters, page' },
    urlExample2: { ru: 'чем делятся ссылкой', en: 'shareable as a link' },
  },
  alt: {
    ru: 'Четыре карточки: локальное состояние в useState (модалка, текст в поле); общее — в контексте или сторе (тема, корзина, авторизация); серверное — в TanStack Query (списки, профиль, это кэш); URL — фильтры и страница, которыми делятся ссылкой.',
    en: 'Four cards: local state in useState (modal, input text); shared state in context or a store (theme, cart, auth); server state in TanStack Query (lists, profile, it is a cache); the URL holds filters and the page that you share as a link.',
  },
};

const STATE_ID_VS_COPY: Illustration = {
  id: 'state-id-vs-copy',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 214">
<rect x="0" y="0" width="320" height="86" rx="12" fill="{{color.bgSecondary}}"/>
<text x="12" y="22" font-size="12" fill="{{color.textSecondary}}">{{label.list}}</text>
<text x="12" y="46" font-size="13" font-family="monospace" fill="{{color.textPrimary}}">{{label.row1}}</text>
<rect x="6" y="56" width="308" height="24" rx="6" fill="{{color.successSoft}}"/>
<text x="12" y="73" font-size="13" font-family="monospace" fill="{{color.textPrimary}}">{{label.row2}}</text>
<text x="306" y="73" font-size="11" text-anchor="end" fill="{{color.success}}">{{label.updated}}</text>
<line x1="77" y1="110" x2="77" y2="88" stroke="{{color.danger}}" stroke-width="2" stroke-dasharray="4 4"/>
<line x1="243" y1="110" x2="243" y2="90" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="237,92 243,82 249,92" fill="{{color.success}}"/>
<rect x="0" y="112" width="154" height="102" rx="12" fill="{{color.dangerSoft}}"/>
<text x="12" y="138" font-size="14" font-weight="bold" fill="{{color.danger}}">{{label.copy}}</text>
<text x="12" y="162" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">id: 2</text>
<text x="12" y="180" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">price: 100</text>
<text x="12" y="202" font-size="12" fill="{{color.danger}}">{{label.stale}}</text>
<rect x="166" y="112" width="154" height="102" rx="12" fill="{{color.successSoft}}"/>
<text x="178" y="138" font-size="14" font-weight="bold" fill="{{color.success}}">{{label.id}}</text>
<text x="178" y="162" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">selectedId: 2</text>
<text x="178" y="202" font-size="12" fill="{{color.success}}">{{label.fresh}}</text>
</svg>`,
  labels: {
    list: { ru: 'Список с сервера', en: 'List from the server' },
    row1: { ru: '#1 · чайник · 100', en: '#1 · kettle · 100' },
    row2: { ru: '#2 · лампа · 120', en: '#2 · lamp · 120' },
    updated: { ru: 'цена выросла', en: 'price went up' },
    copy: { ru: 'Копия объекта', en: 'Object copy' },
    stale: { ru: '✗ устарела', en: '✗ stale' },
    id: { ru: 'Только id', en: 'Just the id' },
    fresh: { ru: '✓ всегда свежий', en: '✓ always fresh' },
  },
  alt: {
    ru: 'Сверху список с сервера: у лампы с id 2 цена выросла до 120. Слева копия объекта id 2 с ценой 100 — она устарела. Справа хранится только selectedId: 2, стрелка ведёт в список — данные всегда свежие.',
    en: 'At the top, the list from the server: the lamp with id 2 now costs 120. On the left, an object copy with id 2 and price 100 — it is stale. On the right, only selectedId: 2 is stored, with an arrow into the list — the data is always fresh.',
  },
};

const IMM_SHARED_REFERENCE: Illustration = {
  id: 'imm-shared-reference',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 210">
<rect x="1" y="1" width="138" height="66" rx="11" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="70" y="30" font-size="15" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">state</text>
<text x="70" y="52" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{{label.original}}</text>
<rect x="180" y="0" width="140" height="68" rx="12" fill="{{color.accentSoft}}"/>
<text x="250" y="30" font-size="15" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">next</text>
<text x="250" y="52" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{ ...state }</text>
<text x="160" y="40" font-size="14" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">!==</text>
<line x1="75" y1="70" x2="124" y2="121" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="130,128 127.6,118 120.2,124.8" fill="{{color.textMuted}}"/>
<line x1="245" y1="70" x2="196" y2="121" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="190,128 199.8,124.8 192.4,118" fill="{{color.textMuted}}"/>
<text x="160" y="104" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">.user</text>
<rect x="50" y="130" width="220" height="80" rx="12" fill="{{color.dangerSoft}}"/>
<text x="160" y="154" font-size="15" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">user</text>
<text x="160" y="176" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">{ name: 'Bob' }</text>
<text x="160" y="198" font-size="12" text-anchor="middle" fill="{{color.danger}}">{{label.shared}}</text>
</svg>`,
  labels: {
    original: { ru: 'оригинал', en: 'original' },
    shared: { ru: 'один объект на двоих', en: 'one shared object' },
  },
  alt: {
    ru: 'Два разных объекта, state и его копия next через спред, ссылаются на один и тот же вложенный объект user с именем Bob: изменение через next видно и в state.',
    en: 'Two different objects, state and its spread copy next, point to the same nested user object with the name Bob: a change through next is visible in state too.',
  },
};

const IMM_ARRAY_METHODS: Illustration = {
  id: 'imm-array-methods',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 222">
<rect x="0" y="0" width="154" height="222" rx="12" fill="{{color.dangerSoft}}"/>
<text x="12" y="28" font-size="15" font-weight="bold" fill="{{color.danger}}">{{label.mutate}}</text>
<text x="12" y="58" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">push · pop</text>
<text x="12" y="82" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">shift · unshift</text>
<text x="12" y="106" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">splice</text>
<text x="12" y="130" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">sort · reverse</text>
<text x="12" y="154" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">arr[i] = x</text>
<text x="12" y="178" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">delete arr[i]</text>
<text x="12" y="208" font-size="12" fill="{{color.danger}}">{{label.sameArray}}</text>
<rect x="166" y="0" width="154" height="222" rx="12" fill="{{color.successSoft}}"/>
<text x="178" y="28" font-size="15" font-weight="bold" fill="{{color.success}}">{{label.copy}}</text>
<text x="178" y="58" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">[...arr, x]</text>
<text x="178" y="82" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">filter · map</text>
<text x="178" y="106" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">slice · concat</text>
<text x="178" y="130" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">toSorted</text>
<text x="178" y="154" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">toReversed</text>
<text x="178" y="178" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">with(i, x)</text>
<text x="178" y="208" font-size="12" fill="{{color.success}}">{{label.newArray}}</text>
</svg>`,
  labels: {
    mutate: { ru: 'Мутируют', en: 'Mutate' },
    sameArray: { ru: 'меняют сам массив', en: 'change the array' },
    copy: { ru: 'Новый массив', en: 'New array' },
    newArray: { ru: 'оригинал цел', en: 'original intact' },
  },
  alt: {
    ru: 'Слева методы, которые меняют сам массив: push, pop, splice, sort, reverse, запись по индексу, delete, Object.assign. Справа способы получить новый массив: спред, filter, map, slice, concat, toSorted, toReversed, with.',
    en: 'On the left, methods that change the array itself: push, pop, splice, sort, reverse, index assignment, delete, Object.assign. On the right, ways to get a new array: spread, filter, map, slice, concat, toSorted, toReversed, with.',
  },
};

const REDUX_SELECTOR_NEW_ARRAY: Illustration = {
  id: 'redux-selector-new-array',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 212">
<rect x="0" y="0" width="320" height="100" rx="12" fill="{{color.dangerSoft}}"/>
<text x="12" y="24" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">todos.filter(done)</text>
<rect x="12" y="36" width="118" height="32" rx="8" fill="{{color.bgCard}}"/>
<text x="71" y="57" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">[ t1, t3 ]</text>
<text x="160" y="58" font-size="15" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.danger}}">!==</text>
<rect x="190" y="36" width="118" height="32" rx="8" fill="{{color.bgCard}}"/>
<text x="249" y="57" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">[ t1, t3 ]</text>
<text x="12" y="88" font-size="12" fill="{{color.danger}}">{{label.always}}</text>
<rect x="0" y="112" width="320" height="100" rx="12" fill="{{color.successSoft}}"/>
<text x="12" y="136" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">createSelector(…)</text>
<rect x="12" y="148" width="118" height="32" rx="8" fill="{{color.bgCard}}"/>
<text x="71" y="169" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">[ t1, t3 ]</text>
<text x="160" y="170" font-size="15" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">===</text>
<rect x="190" y="148" width="118" height="32" rx="8" fill="{{color.bgCard}}"/>
<text x="249" y="169" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">[ t1, t3 ]</text>
<text x="12" y="200" font-size="12" fill="{{color.success}}">{{label.memo}}</text>
</svg>`,
  labels: {
    always: { ru: 'рендер каждый раз', en: 'always re-renders' },
    memo: { ru: 'рендера нет', en: 'no re-render' },
  },
  alt: {
    ru: 'Сверху селектор с filter: после двух действий получаются два одинаковых по содержимому массива, но это разные ссылки, и компонент перерисовывается каждый раз. Снизу createSelector возвращает тот же массив, и перерисовки нет.',
    en: 'At the top, a selector with filter: two actions give two arrays with equal contents but different references, so the component re-renders every time. At the bottom, createSelector returns the same array, so there is no re-render.',
  },
};

export const ILLUSTRATIONS: Record<IllustrationId, Illustration> = {
  'state-kinds': STATE_KINDS,
  'state-id-vs-copy': STATE_ID_VS_COPY,
  'imm-shared-reference': IMM_SHARED_REFERENCE,
  'imm-array-methods': IMM_ARRAY_METHODS,
  'redux-selector-new-array': REDUX_SELECTOR_NEW_ARRAY,
};
