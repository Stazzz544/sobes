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

const STORES_ATOMS: Illustration = {
  id: 'stores-atoms',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
<rect x="0" y="0" width="150" height="48" rx="10" fill="{{color.bgSecondary}}"/>
<text x="75" y="21" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">cartAtom</text>
<text x="75" y="39" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{{label.same}}</text>
<rect x="170" y="0" width="150" height="48" rx="10" fill="{{color.warningSoft}}"/>
<text x="245" y="21" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">userAtom</text>
<text x="245" y="39" font-size="12" text-anchor="middle" fill="{{color.textPrimary}}">{{label.changed}}</text>
<line x1="75" y1="50" x2="75" y2="66" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="70,66 80,66 75,74" fill="{{color.textMuted}}"/>
<rect x="0" y="76" width="150" height="48" rx="10" fill="{{color.bgSecondary}}"/>
<text x="75" y="97" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">totalAtom</text>
<text x="75" y="115" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{{label.derived}}</text>
<line x1="75" y1="126" x2="75" y2="142" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="70,142 80,142 75,150" fill="{{color.textMuted}}"/>
<line x1="245" y1="50" x2="245" y2="142" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="240,142 250,142 245,150" fill="{{color.success}}"/>
<rect x="0" y="152" width="150" height="48" rx="10" fill="{{color.bgSecondary}}"/>
<text x="75" y="173" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">Total</text>
<text x="75" y="191" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{{label.skip}}</text>
<rect x="170" y="152" width="150" height="48" rx="10" fill="{{color.successSoft}}"/>
<text x="245" y="173" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">Avatar</text>
<text x="245" y="191" font-size="12" text-anchor="middle" fill="{{color.success}}">{{label.render}}</text>
</svg>`,
  labels: {
    same: { ru: 'не менялся', en: 'unchanged' },
    changed: { ru: 'изменился', en: 'changed' },
    derived: { ru: 'производный', en: 'derived' },
    skip: { ru: 'без рендера', en: 'no re-render' },
    render: { ru: 'перерисовка', en: 're-renders' },
  },
  alt: {
    ru: 'Атомы cartAtom и userAtom. Производный totalAtom читает cartAtom, его читает компонент Total. Компонент Avatar читает userAtom. Изменился userAtom — перерисовался только Avatar, а Total и totalAtom не тронуты.',
    en: 'Atoms cartAtom and userAtom. The derived totalAtom reads cartAtom, and the Total component reads it. The Avatar component reads userAtom. userAtom changed — only Avatar re-rendered, while Total and totalAtom were untouched.',
  },
};

const SERVER_QUERY_LIFECYCLE: Illustration = {
  id: 'server-query-lifecycle',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 156">
<text x="50" y="16" font-size="13" font-weight="bold" text-anchor="middle" fill="{{color.success}}">{{label.fresh}}</text>
<text x="160" y="16" font-size="13" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">{{label.stale}}</text>
<text x="270" y="16" font-size="13" font-weight="bold" text-anchor="middle" fill="{{color.textSecondary}}">{{label.unused}}</text>
<rect x="0" y="28" width="100" height="28" rx="8" fill="{{color.successSoft}}"/>
<rect x="102" y="28" width="116" height="28" rx="8" fill="{{color.warningSoft}}"/>
<rect x="220" y="28" width="100" height="28" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<line x1="101" y1="22" x2="101" y2="72" stroke="{{color.textMuted}}" stroke-width="2" stroke-dasharray="3 3"/>
<text x="101" y="86" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">staleTime</text>
<line x1="319" y1="22" x2="319" y2="72" stroke="{{color.danger}}" stroke-width="2" stroke-dasharray="3 3"/>
<text x="316" y="86" font-size="11" font-family="monospace" text-anchor="end" fill="{{color.danger}}">gcTime</text>
<text x="50" y="114" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{{label.freshNote}}</text>
<text x="50" y="132" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{{label.freshNote2}}</text>
<text x="160" y="114" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{{label.staleNote}}</text>
<text x="160" y="132" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{{label.staleNote2}}</text>
<text x="270" y="114" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{{label.unusedNote}}</text>
<text x="270" y="132" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{{label.unusedNote2}}</text>
</svg>`,
  labels: {
    fresh: { ru: 'свежие', en: 'fresh' },
    stale: { ru: 'устаревшие', en: 'stale' },
    unused: { ru: 'не нужны', en: 'unused' },
    freshNote: { ru: 'отдаются', en: 'served from' },
    freshNote2: { ru: 'из кеша', en: 'the cache' },
    staleNote: { ru: 'кеш + запрос', en: 'cache + a' },
    staleNote2: { ru: 'в фоне', en: 'background fetch' },
    unusedNote: { ru: 'в памяти', en: 'in memory' },
    unusedNote2: { ru: 'до gcTime', en: 'until gcTime' },
  },
  alt: {
    ru: 'Шкала жизни данных запроса: сначала свежие — отдаются из кеша без запроса; после staleTime устаревшие — показывается кеш и в фоне идёт запрос; когда подписчиков нет, данные лежат в памяти и удаляются по истечении gcTime.',
    en: 'A query data timeline: first fresh — served from the cache without a request; after staleTime, stale — the cache is shown while a background fetch runs; with no subscribers, the data stays in memory and is removed when gcTime runs out.',
  },
};

const SERVER_RACE: Illustration = {
  id: 'server-race',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 168">
<text x="0" y="30" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">'re'</text>
<rect x="60" y="16" width="200" height="20" rx="6" fill="{{color.warningSoft}}"/>
<circle cx="260" cy="26" r="7" fill="{{color.danger}}"/>
<text x="250" y="54" font-size="11" text-anchor="end" fill="{{color.danger}}">{{label.last}}</text>
<text x="0" y="86" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">'react'</text>
<rect x="80" y="72" width="60" height="20" rx="6" fill="{{color.successSoft}}"/>
<circle cx="140" cy="82" r="7" fill="{{color.success}}"/>
<text x="150" y="87" font-size="11" fill="{{color.success}}">{{label.first}}</text>
<line x1="60" y1="110" x2="318" y2="110" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="310,105 318,110 310,115" fill="{{color.textMuted}}"/>
<text x="318" y="128" font-size="11" text-anchor="end" fill="{{color.textSecondary}}">{{label.time}}</text>
<rect x="0" y="136" width="320" height="32" rx="8" fill="{{color.dangerSoft}}"/>
<text x="12" y="157" font-size="13" fill="{{color.textPrimary}}">{{label.screen}}</text>
<text x="308" y="157" font-size="13" font-weight="bold" font-family="monospace" text-anchor="end" fill="{{color.danger}}">'re'</text>
</svg>`,
  labels: {
    last: { ru: 'пришёл последним', en: 'arrived last' },
    first: { ru: 'пришёл первым', en: 'arrived first' },
    time: { ru: 'время', en: 'time' },
    screen: { ru: 'На экране', en: 'On screen' },
  },
  alt: {
    ru: 'Два запроса поиска: «re» отправлен первым, но идёт долго; «react» отправлен позже и пришёл первым. Последним пришёл ответ на «re», и на экране остались устаревшие результаты для «re».',
    en: 'Two search requests: “re” is sent first but takes long; “react” is sent later and arrives first. The “re” response arrives last, so the screen is left with stale results for “re”.',
  },
};

const URL_ANATOMY: Illustration = {
  id: 'url-anatomy',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 146">
<rect x="0" y="0" width="160" height="30" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="10" y="20" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">https://shop.example</text>
<text x="172" y="13" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">origin</text>
<text x="172" y="28" font-size="11" fill="{{color.textSecondary}}">{{label.origin}}</text>
<rect x="0" y="38" width="160" height="30" rx="8" fill="{{color.accentSoft}}"/>
<text x="10" y="58" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">/catalog</text>
<text x="172" y="51" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.accentText}}">pathname</text>
<text x="172" y="66" font-size="11" fill="{{color.textSecondary}}">{{label.path}}</text>
<rect x="0" y="76" width="160" height="30" rx="8" fill="{{color.successSoft}}"/>
<text x="10" y="96" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">?page=2</text>
<text x="172" y="89" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.success}}">search</text>
<text x="172" y="104" font-size="11" fill="{{color.textSecondary}}">{{label.search}}</text>
<rect x="0" y="114" width="160" height="30" rx="8" fill="{{color.warningSoft}}"/>
<text x="10" y="134" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">#reviews</text>
<text x="172" y="127" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">hash</text>
<text x="172" y="142" font-size="11" fill="{{color.textSecondary}}">{{label.hash}}</text>
</svg>`,
  labels: {
    origin: { ru: 'протокол и хост', en: 'protocol and host' },
    path: { ru: 'какая страница', en: 'which page' },
    search: { ru: 'состояние экрана', en: 'screen state' },
    hash: { ru: 'не уходит на сервер', en: 'not sent to server' },
  },
  alt: {
    ru: 'Адрес https://shop.example/catalog?page=2#reviews по частям: origin — протокол и хост, pathname — путь к странице, search — параметры с состоянием экрана, hash — якорь, который не отправляется на сервер.',
    en: 'The address https://shop.example/catalog?page=2#reviews in parts: origin is the protocol and host, pathname is the page path, search holds parameters with screen state, and hash is an anchor not sent to the server.',
  },
};

const GIT_THREE_AREAS: Illustration = {
  id: 'git-three-areas',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 192">
<rect x="79" y="1" width="140" height="44" rx="10" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="149" y="20" font-size="13" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">{{label.work}}</text>
<text x="149" y="37" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.workNote}}</text>
<rect x="78" y="74" width="142" height="46" rx="10" fill="{{color.accentSoft}}"/>
<text x="149" y="94" font-size="13" font-weight="bold" text-anchor="middle" fill="{{color.accentText}}">{{label.index}}</text>
<text x="149" y="111" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.indexNote}}</text>
<rect x="78" y="146" width="142" height="46" rx="10" fill="{{color.successSoft}}"/>
<text x="149" y="166" font-size="13" font-weight="bold" text-anchor="middle" fill="{{color.success}}">{{label.repo}}</text>
<text x="149" y="183" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.repoNote}}</text>
<line x1="64" y1="40" x2="64" y2="70" stroke="{{color.accentText}}" stroke-width="2"/>
<polygon points="59,68 69,68 64,76" fill="{{color.accentText}}"/>
<text x="56" y="62" font-size="11" font-family="monospace" text-anchor="end" fill="{{color.accentText}}">add</text>
<line x1="64" y1="114" x2="64" y2="142" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="59,140 69,140 64,148" fill="{{color.success}}"/>
<text x="56" y="136" font-size="11" font-family="monospace" text-anchor="end" fill="{{color.success}}">commit</text>
<line x1="234" y1="76" x2="234" y2="48" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="229,50 239,50 234,42" fill="{{color.textMuted}}"/>
<text x="242" y="64" font-size="11" font-family="monospace" fill="{{color.textSecondary}}">restore</text>
<line x1="234" y1="148" x2="234" y2="122" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="229,124 239,124 234,116" fill="{{color.textMuted}}"/>
<text x="242" y="138" font-size="11" font-family="monospace" fill="{{color.textSecondary}}">restore -S</text>
</svg>`,
  labels: {
    work: { ru: 'Рабочая папка', en: 'Working tree' },
    workNote: { ru: 'то, что в редакторе', en: 'what you see' },
    index: { ru: 'Индекс', en: 'Index' },
    indexNote: { ru: 'черновик коммита', en: 'draft of the commit' },
    repo: { ru: 'Коммиты', en: 'Commits' },
    repoNote: { ru: 'история в .git', en: 'history in .git' },
  },
  alt: {
    ru: 'Три зоны Git сверху вниз: рабочая папка, индекс — черновик следующего коммита, и коммиты в .git. git add переносит изменения из папки в индекс, git commit — из индекса в историю. git restore возвращает файл из индекса в папку, git restore -S — из коммита в индекс.',
    en: 'Git’s three areas from top to bottom: the working tree, the index — a draft of the next commit — and commits in .git. git add moves changes from the folder to the index, git commit from the index to history. git restore brings a file back from the index to the folder, git restore -S from the commit to the index.',
  },
};

const GIT_STATUS_COLUMNS: Illustration = {
  id: 'git-status-columns',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 168">
<rect x="12" y="0" width="40" height="42" rx="8" fill="{{color.accentSoft}}"/>
<text x="32" y="29" font-size="22" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">M</text>
<rect x="59" y="1" width="38" height="40" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="78" y="29" font-size="22" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">M</text>
<text x="112" y="29" font-size="20" font-family="monospace" fill="{{color.textPrimary}}">a.txt</text>
<rect x="12" y="56" width="14" height="14" rx="3" fill="{{color.accentSoft}}"/>
<text x="34" y="68" font-size="12" fill="{{color.textPrimary}}">{{label.first}}</text>
<rect x="13" y="79" width="12" height="12" rx="3" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="34" y="90" font-size="12" fill="{{color.textPrimary}}">{{label.second}}</text>
<line x1="12" y1="106" x2="308" y2="106" stroke="{{color.border}}" stroke-width="1"/>
<text x="12" y="132" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">A</text>
<text x="40" y="132" font-size="12" fill="{{color.textSecondary}}">{{label.added}}</text>
<text x="166" y="132" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">??</text>
<text x="194" y="132" font-size="12" fill="{{color.textSecondary}}">{{label.untracked}}</text>
<text x="12" y="158" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">D</text>
<text x="40" y="158" font-size="12" fill="{{color.textSecondary}}">{{label.deleted}}</text>
<text x="166" y="158" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">R</text>
<text x="194" y="158" font-size="12" fill="{{color.textSecondary}}">{{label.renamed}}</text>
</svg>`,
  labels: {
    first: { ru: 'индекс против HEAD', en: 'index vs HEAD' },
    second: { ru: 'папка против индекса', en: 'folder vs index' },
    added: { ru: 'новый в индексе', en: 'new in the index' },
    untracked: { ru: 'не отслеживается', en: 'untracked' },
    deleted: { ru: 'удалён', en: 'deleted' },
    renamed: { ru: 'переименован', en: 'renamed' },
  },
  alt: {
    ru: 'Строка статуса MM a.txt: первая колонка сравнивает индекс с последним коммитом, вторая — рабочую папку с индексом. Ниже коды: A — новый в индексе, ?? — не отслеживается, D — удалён, R — переименован.',
    en: 'The status line MM a.txt: the first column compares the index with the last commit, the second the working tree with the index. Below are the codes: A — new in the index, ?? — untracked, D — deleted, R — renamed.',
  },
};

const GIT_BRANCH_POINTERS: Illustration = {
  id: 'git-branch-pointers',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 128">
<line x1="24" y1="96" x2="164" y2="96" stroke="{{color.textMuted}}" stroke-width="3"/>
<line x1="94" y1="96" x2="164" y2="32" stroke="{{color.textMuted}}" stroke-width="3"/>
<circle cx="24" cy="96" r="14" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="2"/>
<text x="24" y="101" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">A</text>
<circle cx="94" cy="96" r="14" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="2"/>
<text x="94" y="101" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">B</text>
<circle cx="164" cy="96" r="14" fill="{{color.successSoft}}" stroke="{{color.success}}" stroke-width="2"/>
<text x="164" y="101" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">C</text>
<circle cx="164" cy="32" r="14" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="2"/>
<text x="164" y="37" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">D</text>
<line x1="180" y1="96" x2="196" y2="96" stroke="{{color.success}}" stroke-width="2"/>
<rect x="196" y="84" width="52" height="24" rx="6" fill="{{color.successSoft}}"/>
<text x="222" y="101" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">main</text>
<line x1="180" y1="32" x2="196" y2="32" stroke="{{color.accentText}}" stroke-width="2"/>
<rect x="196" y="20" width="70" height="24" rx="6" fill="{{color.accentSoft}}"/>
<text x="231" y="37" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">feature</text>
<line x1="270" y1="96" x2="250" y2="96" stroke="{{color.textPrimary}}" stroke-width="2"/>
<polygon points="256,91 256,101 248,96" fill="{{color.textPrimary}}"/>
<rect x="270" y="84" width="48" height="24" rx="6" fill="{{color.warningSoft}}"/>
<text x="294" y="101" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">HEAD</text>
</svg>`,
  labels: {},
  alt: {
    ru: 'Граф коммитов: A, B и C идут подряд, от B ответвляется D. Ветка main указывает на C, ветка feature — на D, а HEAD указывает на ветку main.',
    en: 'A commit graph: A, B and C in a row, with D branching off B. The main branch points to C, the feature branch to D, and HEAD points to the main branch.',
  },
};

const GIT_FF_VS_MERGE: Illustration = {
  id: 'git-ff-vs-merge',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 196">
<text x="0" y="14" font-size="12" font-weight="bold" fill="{{color.textPrimary}}">{{label.ff}}</text>
<line x1="20" y1="44" x2="170" y2="44" stroke="{{color.textMuted}}" stroke-width="3"/>
<circle cx="20" cy="44" r="11" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="2"/>
<text x="20" y="48" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">A</text>
<circle cx="70" cy="44" r="11" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="2"/>
<text x="70" y="48" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">B</text>
<circle cx="120" cy="44" r="11" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="2"/>
<text x="120" y="48" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">C</text>
<circle cx="170" cy="44" r="11" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="2"/>
<text x="170" y="48" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">D</text>
<rect x="194" y="32" width="50" height="24" rx="6" fill="{{color.successSoft}}"/>
<text x="219" y="49" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">main</text>
<text x="0" y="80" font-size="11" fill="{{color.textSecondary}}">{{label.ffNote}}</text>
<line x1="0" y1="96" x2="320" y2="96" stroke="{{color.border}}" stroke-width="1"/>
<text x="0" y="116" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">--no-ff</text>
<line x1="20" y1="170" x2="220" y2="170" stroke="{{color.textMuted}}" stroke-width="3"/>
<line x1="70" y1="170" x2="120" y2="136" stroke="{{color.textMuted}}" stroke-width="3"/>
<line x1="120" y1="136" x2="170" y2="136" stroke="{{color.textMuted}}" stroke-width="3"/>
<line x1="170" y1="136" x2="220" y2="170" stroke="{{color.textMuted}}" stroke-width="3"/>
<circle cx="20" cy="170" r="11" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="2"/>
<text x="20" y="174" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">A</text>
<circle cx="70" cy="170" r="11" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="2"/>
<text x="70" y="174" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">B</text>
<circle cx="120" cy="136" r="11" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="2"/>
<text x="120" y="140" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">C</text>
<circle cx="170" cy="136" r="11" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="2"/>
<text x="170" y="140" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">D</text>
<circle cx="220" cy="170" r="13" fill="{{color.successSoft}}" stroke="{{color.success}}" stroke-width="2"/>
<text x="220" y="174" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">M</text>
<rect x="244" y="158" width="50" height="24" rx="6" fill="{{color.successSoft}}"/>
<text x="269" y="175" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">main</text>
<text x="0" y="194" font-size="11" fill="{{color.textSecondary}}">{{label.mergeNote}}</text>
</svg>`,
  labels: {
    ff: { ru: 'Fast-forward', en: 'Fast-forward' },
    ffNote: { ru: 'main сдвинулся на D', en: 'main moved to D' },
    mergeNote: { ru: 'M — коммит слияния', en: 'M is a merge commit' },
  },
  alt: {
    ru: 'Сверху fast-forward: коммиты A, B, C, D в одну линию, main просто сдвинулся на D без нового коммита. Снизу --no-ff: ветка C, D отходит от B и возвращается в коммит слияния M с двумя родителями, на него указывает main.',
    en: 'Top, fast-forward: commits A, B, C, D in one line; main simply moved to D without a new commit. Bottom, --no-ff: the C, D branch leaves B and returns into a merge commit M with two parents, which main points to.',
  },
};

const GIT_CONFLICT_ORIGIN: Illustration = {
  id: 'git-conflict-origin',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 166">
<line x1="160" y1="40" x2="70" y2="64" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="160" y1="40" x2="250" y2="64" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="70" y1="104" x2="160" y2="126" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="250" y1="104" x2="160" y2="126" stroke="{{color.textMuted}}" stroke-width="2"/>
<rect x="85" y="0" width="150" height="42" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="160" y="15" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">base</text>
<text x="160" y="33" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">timeout = 1000</text>
<rect x="0" y="62" width="140" height="42" rx="8" fill="{{color.successSoft}}"/>
<text x="70" y="77" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">main</text>
<text x="70" y="95" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">timeout = 3000</text>
<rect x="180" y="62" width="140" height="42" rx="8" fill="{{color.accentSoft}}"/>
<text x="250" y="77" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">feature</text>
<text x="250" y="95" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">timeout = 5000</text>
<rect x="50" y="124" width="220" height="42" rx="8" fill="{{color.dangerSoft}}"/>
<text x="160" y="140" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.danger}}">{{label.conflict}}</text>
<text x="160" y="158" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">UU config.js</text>
</svg>`,
  labels: {
    conflict: { ru: 'конфликт в строке', en: 'conflict on one line' },
  },
  alt: {
    ru: 'В базовой версии timeout = 1000. Ветка main поменяла строку на 3000, ветка feature — на 5000. При слиянии Git не может выбрать сам: конфликт, статус UU config.js.',
    en: 'In the base version timeout = 1000. The main branch changed the line to 3000, the feature branch to 5000. On merge Git can’t choose by itself: a conflict, status UU config.js.',
  },
};

const GIT_RESET_MODES: Illustration = {
  id: 'git-reset-modes',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 146">
<text x="144" y="16" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">{{label.index}}</text>
<text x="264" y="16" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">{{label.files}}</text>
<text x="0" y="52" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">--soft</text>
<rect x="88" y="28" width="112" height="34" rx="8" fill="{{color.successSoft}}"/>
<text x="144" y="50" font-size="12" text-anchor="middle" fill="{{color.success}}">{{label.kept}}</text>
<rect x="208" y="28" width="112" height="34" rx="8" fill="{{color.successSoft}}"/>
<text x="264" y="50" font-size="12" text-anchor="middle" fill="{{color.success}}">{{label.kept}}</text>
<text x="0" y="92" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">--mixed</text>
<rect x="88" y="68" width="112" height="34" rx="8" fill="{{color.dangerSoft}}"/>
<text x="144" y="90" font-size="12" text-anchor="middle" fill="{{color.danger}}">{{label.reset}}</text>
<rect x="208" y="68" width="112" height="34" rx="8" fill="{{color.successSoft}}"/>
<text x="264" y="90" font-size="12" text-anchor="middle" fill="{{color.success}}">{{label.kept}}</text>
<text x="0" y="132" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">--hard</text>
<rect x="88" y="108" width="112" height="34" rx="8" fill="{{color.dangerSoft}}"/>
<text x="144" y="130" font-size="12" text-anchor="middle" fill="{{color.danger}}">{{label.reset}}</text>
<rect x="208" y="108" width="112" height="34" rx="8" fill="{{color.dangerSoft}}"/>
<text x="264" y="130" font-size="12" text-anchor="middle" fill="{{color.danger}}">{{label.reset}}</text>
</svg>`,
  labels: {
    index: { ru: 'Индекс', en: 'Index' },
    files: { ru: 'Файлы', en: 'Files' },
    kept: { ru: 'сохранён', en: 'kept' },
    reset: { ru: 'сброшен', en: 'reset' },
  },
  alt: {
    ru: 'Таблица режимов git reset. --soft: индекс и файлы сохранены. --mixed: индекс сброшен, файлы сохранены. --hard: сброшены и индекс, и файлы.',
    en: 'A table of git reset modes. --soft: index and files kept. --mixed: index reset, files kept. --hard: both index and files reset.',
  },
};

const GIT_REBASE_REPLAY: Illustration = {
  id: 'git-rebase-replay',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 178">
<text x="0" y="12" font-size="12" font-weight="bold" fill="{{color.textSecondary}}">{{label.before}}</text>
<line x1="20" y1="62" x2="120" y2="62" stroke="{{color.textMuted}}" stroke-width="3"/>
<line x1="70" y1="62" x2="120" y2="30" stroke="{{color.textMuted}}" stroke-width="3"/>
<circle cx="20" cy="62" r="11" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="2"/>
<text x="20" y="66" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">A</text>
<circle cx="70" cy="62" r="11" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="2"/>
<text x="70" y="66" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">B</text>
<circle cx="120" cy="62" r="11" fill="{{color.successSoft}}" stroke="{{color.success}}" stroke-width="2"/>
<text x="120" y="66" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">M</text>
<circle cx="120" cy="30" r="11" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="2"/>
<text x="120" y="34" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">F</text>
<rect x="142" y="50" width="50" height="24" rx="6" fill="{{color.successSoft}}"/>
<text x="167" y="67" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">main</text>
<rect x="142" y="18" width="70" height="24" rx="6" fill="{{color.accentSoft}}"/>
<text x="177" y="35" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">feature</text>
<line x1="0" y1="88" x2="320" y2="88" stroke="{{color.border}}" stroke-width="1"/>
<text x="0" y="108" font-size="12" font-weight="bold" fill="{{color.textSecondary}}">{{label.after}}</text>
<line x1="20" y1="140" x2="170" y2="140" stroke="{{color.textMuted}}" stroke-width="3"/>
<circle cx="20" cy="140" r="11" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="2"/>
<text x="20" y="144" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">A</text>
<circle cx="70" cy="140" r="11" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="2"/>
<text x="70" y="144" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">B</text>
<circle cx="120" cy="140" r="11" fill="{{color.successSoft}}" stroke="{{color.success}}" stroke-width="2"/>
<text x="120" y="144" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">M</text>
<circle cx="170" cy="140" r="12" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="2"/>
<text x="170" y="144" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">F′</text>
<rect x="96" y="114" width="50" height="16" rx="5" fill="{{color.successSoft}}"/>
<text x="121" y="126" font-size="11" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">main</text>
<rect x="192" y="128" width="70" height="24" rx="6" fill="{{color.accentSoft}}"/>
<text x="227" y="145" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">feature</text>
<text x="0" y="174" font-size="11" fill="{{color.textSecondary}}">{{label.newHash}}</text>
</svg>`,
  labels: {
    before: { ru: 'До rebase', en: 'Before rebase' },
    after: { ru: 'После rebase', en: 'After rebase' },
    newHash: { ru: 'F′ — новый хеш', en: 'F′ has a new hash' },
  },
  alt: {
    ru: 'До rebase: ветка feature с коммитом F отходит от B, а main ушла вперёд на коммит M. После git rebase main история прямая: A, B, M и F′ — копия F с новым хешем, на неё указывает feature.',
    en: 'Before rebase: the feature branch with commit F leaves B, while main moved on to commit M. After git rebase main the history is linear: A, B, M and F′ — a copy of F with a new hash, which feature points to.',
  },
};

export const ILLUSTRATIONS: Record<IllustrationId, Illustration> = {
  'state-kinds': STATE_KINDS,
  'state-id-vs-copy': STATE_ID_VS_COPY,
  'imm-shared-reference': IMM_SHARED_REFERENCE,
  'imm-array-methods': IMM_ARRAY_METHODS,
  'redux-selector-new-array': REDUX_SELECTOR_NEW_ARRAY,
  'stores-atoms': STORES_ATOMS,
  'server-query-lifecycle': SERVER_QUERY_LIFECYCLE,
  'server-race': SERVER_RACE,
  'url-anatomy': URL_ANATOMY,
  'git-three-areas': GIT_THREE_AREAS,
  'git-status-columns': GIT_STATUS_COLUMNS,
  'git-branch-pointers': GIT_BRANCH_POINTERS,
  'git-ff-vs-merge': GIT_FF_VS_MERGE,
  'git-conflict-origin': GIT_CONFLICT_ORIGIN,
  'git-reset-modes': GIT_RESET_MODES,
  'git-rebase-replay': GIT_REBASE_REPLAY,
};
