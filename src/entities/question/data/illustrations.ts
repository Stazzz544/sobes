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

export const ILLUSTRATIONS: Record<IllustrationId, Illustration> = {
  'state-kinds': STATE_KINDS,
  'state-id-vs-copy': STATE_ID_VS_COPY,
};
