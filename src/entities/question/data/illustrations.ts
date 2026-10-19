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

const HTML_LANDMARKS: Illustration = {
  id: 'html-landmarks',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 236">
<rect x="0" y="0" width="320" height="40" rx="8" fill="{{color.accentSoft}}"/>
<text x="12" y="25" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">header</text>
<text x="308" y="25" font-size="12" font-family="monospace" text-anchor="end" fill="{{color.accentText}}">banner</text>
<rect x="0" y="48" width="320" height="32" rx="8" fill="{{color.warningSoft}}"/>
<text x="12" y="69" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">nav</text>
<text x="308" y="69" font-size="12" font-family="monospace" text-anchor="end" fill="{{color.textPrimary}}">navigation</text>
<rect x="0" y="88" width="208" height="100" rx="8" fill="{{color.successSoft}}"/>
<text x="12" y="110" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">main</text>
<text x="196" y="110" font-size="12" font-family="monospace" text-anchor="end" fill="{{color.success}}">main</text>
<rect x="12" y="122" width="184" height="54" rx="6" fill="{{color.bgCard}}"/>
<text x="22" y="142" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">article</text>
<text x="22" y="164" font-size="11" fill="{{color.textSecondary}}">{{label.article}}</text>
<rect x="216" y="88" width="104" height="100" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="228" y="110" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">aside</text>
<text x="228" y="132" font-size="11" font-family="monospace" fill="{{color.textSecondary}}">complem-</text>
<text x="228" y="148" font-size="11" font-family="monospace" fill="{{color.textSecondary}}">entary</text>
<rect x="0" y="196" width="320" height="40" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="12" y="221" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">footer</text>
<text x="308" y="221" font-size="12" font-family="monospace" text-anchor="end" fill="{{color.textSecondary}}">contentinfo</text>
</svg>`,
  labels: {
    article: { ru: 'запись, карточка', en: 'a post, a card' },
  },
  alt: {
    ru: 'Схема страницы: header — ориентир banner, nav — navigation, main — main с article внутри, aside — complementary, footer — contentinfo.',
    en: 'A page layout: header is the banner landmark, nav is navigation, main is main with an article inside, aside is complementary, footer is contentinfo.',
  },
};

const HTML_FORMDATA: Illustration = {
  id: 'html-formdata',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 214">
<text x="0" y="14" font-size="12" font-weight="bold" fill="{{color.textSecondary}}">{{label.field}}</text>
<text x="320" y="14" font-size="12" font-weight="bold" text-anchor="end" fill="{{color.textSecondary}}">FormData</text>
<rect x="0" y="24" width="320" height="30" rx="6" fill="{{color.successSoft}}"/>
<text x="10" y="44" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">name="city"</text>
<text x="310" y="44" font-size="12" font-family="monospace" text-anchor="end" fill="{{color.success}}">city=Tver</text>
<rect x="0" y="60" width="320" height="30" rx="6" fill="{{color.successSoft}}"/>
<text x="10" y="80" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">readonly</text>
<text x="310" y="80" font-size="12" font-family="monospace" text-anchor="end" fill="{{color.success}}">{{label.sent}}</text>
<rect x="0" y="96" width="320" height="30" rx="6" fill="{{color.dangerSoft}}"/>
<text x="10" y="116" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">disabled</text>
<text x="310" y="116" font-size="12" text-anchor="end" fill="{{color.danger}}">{{label.missing}}</text>
<rect x="0" y="132" width="320" height="30" rx="6" fill="{{color.dangerSoft}}"/>
<text x="10" y="152" font-size="12" fill="{{color.textPrimary}}">{{label.noName}}</text>
<text x="310" y="152" font-size="12" text-anchor="end" fill="{{color.danger}}">{{label.missing}}</text>
<rect x="0" y="168" width="320" height="30" rx="6" fill="{{color.dangerSoft}}"/>
<text x="10" y="188" font-size="12" fill="{{color.textPrimary}}">{{label.unchecked}}</text>
<text x="310" y="188" font-size="12" text-anchor="end" fill="{{color.danger}}">{{label.missing}}</text>
<text x="0" y="212" font-size="11" fill="{{color.textSecondary}}">{{label.checked}}</text>
</svg>`,
  labels: {
    field: { ru: 'Поле', en: 'Field' },
    sent: { ru: 'отправится', en: 'sent' },
    missing: { ru: 'нет в данных', en: 'not in data' },
    noName: { ru: 'без name', en: 'no name' },
    unchecked: { ru: 'чекбокс не отмечен', en: 'unchecked box' },
    checked: { ru: 'отмечен: value «on»', en: 'checked: value “on”' },
  },
  alt: {
    ru: 'Что попадёт в FormData: поле с name и readonly-поле отправятся; disabled-поле, поле без name и неотмеченный чекбокс в данных отсутствуют; отмеченный чекбокс без value отправляет строку on.',
    en: 'What ends up in FormData: a named field and a readonly field are sent; a disabled field, a field without a name and an unchecked checkbox are missing; a checked checkbox without a value sends the string on.',
  },
};

const A11Y_NAME_PRIORITY: Illustration = {
  id: 'a11y-name-priority',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 196">
<rect x="0" y="0" width="320" height="40" rx="8" fill="{{color.accentSoft}}"/>
<text x="14" y="26" font-size="16" font-weight="bold" fill="{{color.accentText}}">1</text>
<text x="40" y="25" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">aria-labelledby</text>
<rect x="12" y="48" width="308" height="40" rx="8" fill="{{color.accentSoft}}"/>
<text x="26" y="74" font-size="16" font-weight="bold" fill="{{color.accentText}}">2</text>
<text x="52" y="73" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">aria-label</text>
<rect x="24" y="96" width="296" height="48" rx="8" fill="{{color.successSoft}}"/>
<text x="38" y="126" font-size="16" font-weight="bold" fill="{{color.success}}">3</text>
<text x="64" y="116" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">label · alt · legend</text>
<text x="64" y="134" font-size="11" fill="{{color.textSecondary}}">{{label.content}}</text>
<rect x="36" y="152" width="284" height="40" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="50" y="178" font-size="16" font-weight="bold" fill="{{color.textSecondary}}">4</text>
<text x="76" y="177" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textSecondary}}">title · placeholder</text>
</svg>`,
  labels: {
    content: { ru: 'или текст внутри', en: 'or the text inside' },
  },
  alt: {
    ru: 'Приоритет источников доступного имени сверху вниз: 1 — aria-labelledby, 2 — aria-label, 3 — label, alt, legend или текст содержимого, 4 — title и placeholder как запасной вариант.',
    en: 'Accessible name sources by priority, top to bottom: 1 — aria-labelledby, 2 — aria-label, 3 — label, alt, legend or the text content, 4 — title and placeholder as a fallback.',
  },
};

const A11Y_HIDDEN_VS_INERT: Illustration = {
  id: 'a11y-hidden-vs-inert',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 150">
<text x="176" y="14" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">{{label.reader}}</text>
<text x="272" y="14" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">Tab</text>
<text x="0" y="46" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">aria-hidden</text>
<rect x="128" y="26" width="96" height="30" rx="8" fill="{{color.successSoft}}"/>
<text x="176" y="46" font-size="12" text-anchor="middle" fill="{{color.success}}">{{label.hidden}}</text>
<rect x="232" y="26" width="88" height="30" rx="8" fill="{{color.dangerSoft}}"/>
<text x="276" y="46" font-size="12" text-anchor="middle" fill="{{color.danger}}">{{label.reachable}}</text>
<text x="0" y="86" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">inert</text>
<rect x="128" y="66" width="96" height="30" rx="8" fill="{{color.successSoft}}"/>
<text x="176" y="86" font-size="12" text-anchor="middle" fill="{{color.success}}">{{label.hidden}}</text>
<rect x="232" y="66" width="88" height="30" rx="8" fill="{{color.successSoft}}"/>
<text x="276" y="86" font-size="12" text-anchor="middle" fill="{{color.success}}">{{label.blocked}}</text>
<text x="0" y="126" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">showModal()</text>
<rect x="128" y="106" width="192" height="30" rx="8" fill="{{color.accentSoft}}"/>
<text x="224" y="126" font-size="12" text-anchor="middle" fill="{{color.accentText}}">{{label.modal}}</text>
</svg>`,
  labels: {
    reader: { ru: 'Диктор', en: 'Screen reader' },
    hidden: { ru: 'не видит', en: 'can’t see' },
    reachable: { ru: 'доходит', en: 'reaches' },
    blocked: { ru: 'не доходит', en: 'blocked' },
    modal: { ru: 'фон инертен сам', en: 'background inert' },
  },
  alt: {
    ru: 'Сравнение: aria-hidden прячет элементы от диктора, но Tab до них доходит. inert прячет и от диктора, и от Tab. dialog.showModal() делает фон инертным автоматически.',
    en: 'Comparison: aria-hidden hides elements from the screen reader, but Tab still reaches them. inert hides them from both the screen reader and Tab. dialog.showModal() makes the background inert automatically.',
  },
};

const TESTING_PYRAMID_TROPHY: Illustration = {
  id: 'testing-pyramid-trophy',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
<text x="76" y="14" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">{{label.pyramid}}</text>
<polygon points="76,26 106,70 46,70" fill="{{color.dangerSoft}}"/>
<text x="76" y="62" font-size="11" font-weight="bold" text-anchor="middle" fill="{{color.danger}}">E2E</text>
<polygon points="44,74 108,74 128,118 24,118" fill="{{color.warningSoft}}"/>
<text x="76" y="101" font-size="11" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">{{label.integration}}</text>
<polygon points="22,122 130,122 150,170 2,170" fill="{{color.successSoft}}"/>
<text x="76" y="151" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.success}}">{{label.unit}}</text>
<text x="244" y="14" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">{{label.trophy}}</text>
<rect x="222" y="24" width="44" height="22" rx="6" fill="{{color.dangerSoft}}"/>
<text x="244" y="39" font-size="11" font-weight="bold" text-anchor="middle" fill="{{color.danger}}">E2E</text>
<rect x="184" y="50" width="120" height="58" rx="10" fill="{{color.warningSoft}}"/>
<text x="244" y="83" font-size="11" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">{{label.integration}}</text>
<rect x="206" y="112" width="76" height="26" rx="6" fill="{{color.successSoft}}"/>
<text x="244" y="129" font-size="11" font-weight="bold" text-anchor="middle" fill="{{color.success}}">{{label.unit}}</text>
<rect x="190" y="142" width="108" height="28" rx="6" fill="{{color.accentSoft}}"/>
<text x="244" y="160" font-size="11" font-weight="bold" text-anchor="middle" fill="{{color.accentText}}">{{label.static}}</text>
<text x="76" y="192" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.pyramidNote}}</text>
<text x="244" y="192" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.trophyNote}}</text>
</svg>`,
  labels: {
    pyramid: { ru: 'Пирамида', en: 'Pyramid' },
    trophy: { ru: 'Трофей', en: 'Trophy' },
    integration: { ru: 'Интеграционные', en: 'Integration' },
    unit: { ru: 'Юнит', en: 'Unit' },
    static: { ru: 'TS, ESLint', en: 'TS, ESLint' },
    pyramidNote: { ru: 'больше всего юнитов', en: 'mostly unit tests' },
    trophyNote: { ru: 'упор на интеграцию', en: 'focus on integration' },
  },
  alt: {
    ru: 'Слева пирамида тестов: широкое основание из юнит-тестов, середина — интеграционные, вершина — E2E. Справа трофей: основание — статический анализ TypeScript и ESLint, затем юнит-тесты, самая широкая часть — интеграционные, сверху немного E2E.',
    en: 'Left, the test pyramid: a wide base of unit tests, integration tests in the middle, E2E at the top. Right, the trophy: static analysis with TypeScript and ESLint at the base, then unit tests, integration tests as the widest part, a little E2E on top.',
  },
};

const TESTING_QUERY_VARIANTS: Illustration = {
  id: 'testing-query-variants',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 170">
<text x="148" y="14" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">{{label.missing}}</text>
<text x="264" y="14" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">{{label.waits}}</text>
<text x="0" y="48" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">getBy</text>
<rect x="88" y="28" width="120" height="30" rx="8" fill="{{color.dangerSoft}}"/>
<text x="148" y="48" font-size="12" text-anchor="middle" fill="{{color.danger}}">{{label.throws}}</text>
<rect x="216" y="28" width="96" height="30" rx="8" fill="{{color.bgSecondary}}"/>
<text x="264" y="48" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{{label.no}}</text>
<text x="0" y="88" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">queryBy</text>
<rect x="88" y="68" width="120" height="30" rx="8" fill="{{color.successSoft}}"/>
<text x="148" y="88" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.success}}">null</text>
<rect x="216" y="68" width="96" height="30" rx="8" fill="{{color.bgSecondary}}"/>
<text x="264" y="88" font-size="12" text-anchor="middle" fill="{{color.textSecondary}}">{{label.no}}</text>
<text x="0" y="128" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">findBy</text>
<rect x="88" y="108" width="120" height="30" rx="8" fill="{{color.dangerSoft}}"/>
<text x="148" y="128" font-size="12" text-anchor="middle" fill="{{color.danger}}">{{label.timeout}}</text>
<rect x="216" y="108" width="96" height="30" rx="8" fill="{{color.successSoft}}"/>
<text x="264" y="128" font-size="12" text-anchor="middle" fill="{{color.success}}">{{label.yes}}</text>
<text x="0" y="162" font-size="11" fill="{{color.textSecondary}}">{{label.note}}</text>
</svg>`,
  labels: {
    missing: { ru: 'Если не найден', en: 'If not found' },
    waits: { ru: 'Ждёт?', en: 'Waits?' },
    throws: { ru: 'ошибка сразу', en: 'throws at once' },
    timeout: { ru: 'ошибка по таймауту', en: 'rejects on timeout' },
    no: { ru: 'нет', en: 'no' },
    yes: { ru: 'да, до 1 с', en: 'yes, up to 1 s' },
    note: { ru: 'отсутствие — queryBy', en: 'absence — queryBy' },
  },
  alt: {
    ru: 'Таблица запросов Testing Library. getBy: если элемента нет — сразу ошибка, не ждёт. queryBy: возвращает null, не ждёт — им проверяют отсутствие. findBy: ждёт до секунды, по таймауту — ошибка.',
    en: 'A table of Testing Library queries. getBy: throws at once if nothing is found, doesn’t wait. queryBy: returns null, doesn’t wait — used to check absence. findBy: waits up to a second and rejects on timeout.',
  },
};

const NODE_THREADS: Illustration = {
  id: 'node-threads',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 214">
<rect x="0" y="0" width="320" height="58" rx="10" fill="{{color.accentSoft}}"/>
<text x="12" y="22" font-size="13" font-weight="bold" fill="{{color.accentText}}">{{label.main}}</text>
<text x="12" y="44" font-size="11" fill="{{color.textSecondary}}">{{label.mainNote}}</text>
<line x1="80" y1="60" x2="80" y2="82" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="75,80 85,80 80,88" fill="{{color.textMuted}}"/>
<line x1="240" y1="60" x2="240" y2="82" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="235,80 245,80 240,88" fill="{{color.textMuted}}"/>
<rect x="0" y="90" width="154" height="74" rx="10" fill="{{color.warningSoft}}"/>
<text x="12" y="110" font-size="12" font-weight="bold" fill="{{color.textPrimary}}">{{label.pool}}</text>
<text x="12" y="130" font-size="11" font-family="monospace" fill="{{color.textPrimary}}">fs · dns.lookup</text>
<text x="12" y="150" font-size="11" font-family="monospace" fill="{{color.textPrimary}}">zlib · crypto</text>
<rect x="166" y="90" width="154" height="74" rx="10" fill="{{color.successSoft}}"/>
<text x="178" y="110" font-size="12" font-weight="bold" fill="{{color.success}}">{{label.os}}</text>
<text x="178" y="130" font-size="11" font-family="monospace" fill="{{color.textPrimary}}">TCP · HTTP</text>
<text x="178" y="150" font-size="11" fill="{{color.textSecondary}}">{{label.osNote}}</text>
<rect x="1" y="174" width="318" height="38" rx="10" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="12" y="198" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">worker_threads</text>
<text x="308" y="198" font-size="11" text-anchor="end" fill="{{color.textSecondary}}">{{label.worker}}</text>
</svg>`,
  labels: {
    main: { ru: 'Главный поток JS', en: 'Main JS thread' },
    mainNote: { ru: 'ваш код и колбэки', en: 'your code, callbacks' },
    pool: { ru: 'Пул потоков libuv', en: 'libuv thread pool' },
    os: { ru: 'Ядро ОС', en: 'OS kernel' },
    osNote: { ru: 'без потоков', en: 'no threads' },
    worker: { ru: 'свой JS и цикл', en: 'own JS and loop' },
  },
  alt: {
    ru: 'Главный поток JavaScript выполняет ваш код и все колбэки. Файловые операции, dns.lookup, zlib и crypto уходят в пул потоков libuv, сетевой ввод-вывод — в ядро ОС без отдельных потоков. worker_threads запускают отдельный JavaScript со своим циклом событий.',
    en: 'The main JavaScript thread runs your code and every callback. File operations, dns.lookup, zlib and crypto go to the libuv thread pool; network I/O goes to the OS kernel without extra threads. worker_threads run separate JavaScript with its own event loop.',
  },
};

const NODE_STREAM_MEMORY: Illustration = {
  id: 'node-stream-memory',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 176">
<text x="0" y="14" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">readFile</text>
<rect x="0" y="22" width="60" height="44" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="30" y="49" font-size="12" text-anchor="middle" fill="{{color.textPrimary}}">2 GB</text>
<line x1="64" y1="44" x2="96" y2="44" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="94,39 94,49 102,44" fill="{{color.textMuted}}"/>
<rect x="104" y="22" width="216" height="44" rx="8" fill="{{color.dangerSoft}}"/>
<text x="212" y="42" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.danger}}">{{label.memoryAll}}</text>
<text x="212" y="58" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.tenUsers}}</text>
<text x="0" y="98" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">createReadStream</text>
<rect x="0" y="106" width="60" height="44" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="30" y="133" font-size="12" text-anchor="middle" fill="{{color.textPrimary}}">2 GB</text>
<rect x="72" y="118" width="22" height="20" rx="4" fill="{{color.successSoft}}"/>
<rect x="100" y="118" width="22" height="20" rx="4" fill="{{color.successSoft}}"/>
<rect x="128" y="118" width="22" height="20" rx="4" fill="{{color.successSoft}}"/>
<line x1="156" y1="128" x2="196" y2="128" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="194,123 194,133 202,128" fill="{{color.success}}"/>
<rect x="204" y="106" width="116" height="44" rx="8" fill="{{color.successSoft}}"/>
<text x="262" y="126" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.success}}">{{label.client}}</text>
<text x="262" y="142" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.chunks}}</text>
<text x="0" y="172" font-size="11" fill="{{color.textSecondary}}">{{label.note}}</text>
</svg>`,
  labels: {
    memoryAll: { ru: 'весь файл в памяти', en: 'whole file in memory' },
    tenUsers: { ru: '10 клиентов — 20 ГБ', en: '10 clients — 20 GB' },
    client: { ru: 'клиент', en: 'client' },
    chunks: { ru: 'по 64 КБ', en: '64 KB at a time' },
    note: { ru: 'память не растёт', en: 'memory stays flat' },
  },
  alt: {
    ru: 'Сверху readFile читает файл на 2 ГБ в память целиком: десять одновременных скачиваний — 20 ГБ. Снизу createReadStream отдаёт файл клиенту кусками по 64 КБ, и память не растёт с размером файла.',
    en: 'Top: readFile loads a 2 GB file into memory entirely — ten simultaneous downloads take 20 GB. Bottom: createReadStream sends the file to the client in 64 KB chunks, and memory doesn’t grow with the file size.',
  },
};

const NEXT_FILE_NESTING: Illustration = {
  id: 'next-file-nesting',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 216">
<rect x="1" y="1" width="318" height="214" rx="12" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<text x="12" y="20" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">layout.tsx</text>
<rect x="12" y="28" width="296" height="178" rx="10" fill="{{color.bgCard}}"/>
<text x="22" y="46" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textSecondary}}">template.tsx</text>
<rect x="22" y="54" width="276" height="144" rx="10" fill="{{color.dangerSoft}}"/>
<text x="32" y="72" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.danger}}">error.tsx</text>
<rect x="32" y="80" width="256" height="110" rx="10" fill="{{color.warningSoft}}"/>
<text x="42" y="98" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">loading.tsx</text>
<rect x="42" y="106" width="236" height="76" rx="10" fill="{{color.accentSoft}}"/>
<text x="52" y="124" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.accentText}}">not-found.tsx</text>
<rect x="52" y="132" width="216" height="42" rx="8" fill="{{color.successSoft}}"/>
<text x="160" y="158" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">page.tsx</text>
</svg>`,
  labels: {},
  alt: {
    ru: 'Вложенность специальных файлов одного сегмента снаружи внутрь: layout, template, error, loading, not-found и в самом центре page.',
    en: 'Nesting of one segment’s special files from outside in: layout, template, error, loading, not-found and page at the very center.',
  },
};

const NEXT_STATIC_SHELL: Illustration = {
  id: 'next-static-shell',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
<rect x="1" y="1" width="318" height="198" rx="12" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="2"/>
<rect x="12" y="12" width="296" height="34" rx="8" fill="{{color.successSoft}}"/>
<text x="22" y="34" font-size="12" font-weight="bold" fill="{{color.success}}">{{label.header}}</text>
<text x="298" y="34" font-size="11" text-anchor="end" fill="{{color.textSecondary}}">{{label.fromCdn}}</text>
<rect x="12" y="54" width="296" height="34" rx="8" fill="{{color.successSoft}}"/>
<text x="22" y="76" font-size="12" font-weight="bold" fill="{{color.success}}">{{label.title}}</text>
<text x="298" y="76" font-size="11" text-anchor="end" fill="{{color.textSecondary}}">{{label.fromCdn}}</text>
<rect x="13" y="97" width="294" height="62" rx="8" fill="{{color.bgCard}}" stroke="{{color.accent}}" stroke-width="2" stroke-dasharray="6 4"/>
<text x="22" y="118" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.accentText}}">Suspense</text>
<text x="22" y="138" font-size="12" fill="{{color.textSecondary}}">{{label.fallback}}</text>
<text x="298" y="150" font-size="11" text-anchor="end" fill="{{color.accentText}}">{{label.streamed}}</text>
<rect x="12" y="166" width="296" height="24" rx="6" fill="{{color.successSoft}}"/>
<text x="22" y="182" font-size="11" font-weight="bold" fill="{{color.success}}">{{label.footer}}</text>
</svg>`,
  labels: {
    header: { ru: 'Шапка', en: 'Header' },
    title: { ru: 'Заголовок статьи', en: 'Article title' },
    fromCdn: { ru: 'сразу из кеша', en: 'instantly cached' },
    fallback: { ru: 'заглушка «Загрузка…»', en: 'fallback “Loading…”' },
    streamed: { ru: 'придёт потоком', en: 'streamed later' },
    footer: { ru: 'Подвал', en: 'Footer' },
  },
  alt: {
    ru: 'Страница со статической оболочкой: шапка, заголовок и подвал отдаются сразу из кеша, а на месте границы Suspense стоит заглушка «Загрузка…», и содержимое этого блока придёт потоком во время запроса.',
    en: 'A page with a static shell: the header, title and footer are served instantly from cache, while a Suspense boundary shows a “Loading…” fallback, and that block’s content streams in during the request.',
  },
};

const NEXT_IMAGE_CLS: Illustration = {
  id: 'next-image-cls',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 196">
<text x="76" y="14" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.danger}}">{{label.without}}</text>
<rect x="0" y="24" width="152" height="10" rx="4" fill="{{color.textMuted}}"/>
<rect x="0" y="40" width="120" height="10" rx="4" fill="{{color.textMuted}}"/>
<rect x="0" y="62" width="152" height="70" rx="8" fill="{{color.dangerSoft}}"/>
<text x="76" y="101" font-size="11" text-anchor="middle" fill="{{color.danger}}">{{label.loaded}}</text>
<rect x="0" y="140" width="152" height="10" rx="4" fill="{{color.textMuted}}"/>
<rect x="0" y="156" width="110" height="10" rx="4" fill="{{color.textMuted}}"/>
<text x="76" y="190" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.jump}}</text>
<text x="244" y="14" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.success}}">{{label.with}}</text>
<rect x="168" y="24" width="152" height="10" rx="4" fill="{{color.textMuted}}"/>
<rect x="168" y="40" width="120" height="10" rx="4" fill="{{color.textMuted}}"/>
<rect x="169" y="63" width="150" height="68" rx="8" fill="{{color.successSoft}}" stroke="{{color.success}}" stroke-width="2" stroke-dasharray="5 4"/>
<text x="244" y="101" font-size="11" text-anchor="middle" fill="{{color.success}}">{{label.reserved}}</text>
<rect x="168" y="140" width="152" height="10" rx="4" fill="{{color.textMuted}}"/>
<rect x="168" y="156" width="110" height="10" rx="4" fill="{{color.textMuted}}"/>
<text x="244" y="190" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.stays}}</text>
</svg>`,
  labels: {
    without: { ru: 'Без размеров', en: 'No dimensions' },
    with: { ru: 'width и height', en: 'width and height' },
    loaded: { ru: 'картинка догрузилась', en: 'image arrived late' },
    reserved: { ru: 'место занято заранее', en: 'space reserved' },
    jump: { ru: 'текст прыгнул вниз', en: 'text jumped down' },
    stays: { ru: 'текст на месте', en: 'text stays put' },
  },
  alt: {
    ru: 'Слева картинка без размеров: она догрузилась и сдвинула текст вниз — это сдвиг макета. Справа у картинки заданы width и height: место зарезервировано заранее, и текст остаётся на месте.',
    en: 'Left: an image without dimensions arrived late and pushed the text down — a layout shift. Right: the image has width and height: space is reserved in advance, and the text stays put.',
  },
};

const ARCH_SRP_REASONS: Illustration = {
  id: 'arch-srp-reasons',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 170">
<text x="76" y="13" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.danger}}">{{label.before}}</text>
<rect x="0" y="24" width="48" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="24" y="39" font-size="11" text-anchor="middle" fill="{{color.accentText}}">{{label.prices}}</text>
<rect x="52" y="24" width="48" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="76" y="39" font-size="11" text-anchor="middle" fill="{{color.accentText}}">{{label.events}}</text>
<rect x="104" y="24" width="48" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="128" y="39" font-size="11" text-anchor="middle" fill="{{color.accentText}}">{{label.layout}}</text>
<line x1="24" y1="46" x2="24" y2="76" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="19,74 29,74 24,82" fill="{{color.textMuted}}"/>
<line x1="76" y1="46" x2="76" y2="76" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="71,74 81,74 76,82" fill="{{color.textMuted}}"/>
<line x1="128" y1="46" x2="128" y2="76" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="123,74 133,74 128,82" fill="{{color.textMuted}}"/>
<rect x="0" y="82" width="152" height="56" rx="8" fill="{{color.dangerSoft}}"/>
<text x="76" y="106" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.danger}}">Cart</text>
<text x="76" y="125" font-size="11" text-anchor="middle" fill="{{color.danger}}">{{label.reasons}}</text>
<text x="76" y="162" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.ripple}}</text>
<text x="244" y="13" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.success}}">{{label.after}}</text>
<rect x="168" y="24" width="48" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="192" y="39" font-size="11" text-anchor="middle" fill="{{color.accentText}}">{{label.prices}}</text>
<rect x="220" y="24" width="48" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="244" y="39" font-size="11" text-anchor="middle" fill="{{color.accentText}}">{{label.events}}</text>
<rect x="272" y="24" width="48" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="296" y="39" font-size="11" text-anchor="middle" fill="{{color.accentText}}">{{label.layout}}</text>
<line x1="192" y1="46" x2="192" y2="76" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="187,74 197,74 192,82" fill="{{color.success}}"/>
<line x1="244" y1="46" x2="244" y2="76" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="239,74 249,74 244,82" fill="{{color.success}}"/>
<line x1="296" y1="46" x2="296" y2="76" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="291,74 301,74 296,82" fill="{{color.success}}"/>
<rect x="168" y="82" width="48" height="56" rx="8" fill="{{color.successSoft}}"/>
<text x="192" y="114" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.success}}">price</text>
<rect x="220" y="82" width="48" height="56" rx="8" fill="{{color.successSoft}}"/>
<text x="244" y="114" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.success}}">track</text>
<rect x="272" y="82" width="48" height="56" rx="8" fill="{{color.successSoft}}"/>
<text x="296" y="114" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.success}}">View</text>
<text x="244" y="162" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.isolated}}</text>
</svg>`,
  labels: {
    before: { ru: 'Один компонент', en: 'One component' },
    after: { ru: 'Три модуля', en: 'Three modules' },
    prices: { ru: 'скидки', en: 'prices' },
    events: { ru: 'события', en: 'events' },
    layout: { ru: 'вёрстка', en: 'layout' },
    reasons: { ru: '3 причины меняться', en: '3 reasons to change' },
    ripple: { ru: 'правка задевает всё', en: 'a change hits it all' },
    isolated: { ru: 'у каждого одна', en: 'one reason each' },
  },
  alt: {
    ru: 'Слева компонент Cart меняется по трём причинам — скидки, события аналитики и вёрстка, — и любая правка задевает его целиком. Справа те же три причины ведут в три отдельных модуля: price, track и View, у каждого одна причина для изменения.',
    en: 'Left: the Cart component changes for three reasons — prices, analytics events and layout — and every change hits all of it. Right: the same three reasons lead to three separate modules — price, track and View — each with one reason to change.',
  },
};

const ARCH_OBSERVER: Illustration = {
  id: 'arch-observer',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 176">
<rect x="0" y="4" width="100" height="168" rx="10" fill="{{color.accentSoft}}"/>
<text x="50" y="82" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">store</text>
<text x="50" y="100" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">set(5)</text>
<line x1="100" y1="24" x2="206" y2="24" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="204,19 204,29 212,24" fill="{{color.success}}"/>
<text x="156" y="17" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.success}}">5</text>
<line x1="100" y1="88" x2="206" y2="88" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="204,83 204,93 212,88" fill="{{color.success}}"/>
<text x="156" y="81" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.success}}">5</text>
<line x1="100" y1="152" x2="210" y2="152" stroke="{{color.textMuted}}" stroke-width="2" stroke-dasharray="4 4"/>
<rect x="212" y="4" width="108" height="40" rx="8" fill="{{color.successSoft}}"/>
<text x="266" y="20" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">Header</text>
<text x="266" y="36" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.received}}</text>
<rect x="212" y="68" width="108" height="40" rx="8" fill="{{color.successSoft}}"/>
<text x="266" y="84" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">Chart</text>
<text x="266" y="100" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.received}}</text>
<rect x="213" y="133" width="106" height="38" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="2" stroke-dasharray="4 4"/>
<text x="266" y="148" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textMuted}}">Modal</text>
<text x="266" y="164" font-size="11" text-anchor="middle" fill="{{color.textMuted}}">{{label.unsubscribed}}</text>
</svg>`,
  labels: {
    received: { ru: 'получил 5', en: 'got 5' },
    unsubscribed: { ru: 'отписан', en: 'unsubscribed' },
  },
  alt: {
    ru: 'Стор после set(5) рассылает новое значение подписчикам: Header и Chart получили 5. Modal отписался — до него уведомление не дошло.',
    en: 'After set(5) the store sends the new value to its subscribers: Header and Chart got 5. Modal unsubscribed, so the notification didn’t reach it.',
  },
};

const ARCH_FSD_LAYERS: Illustration = {
  id: 'arch-fsd-layers',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 206">
<rect x="60" y="4" width="180" height="28" rx="6" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="150" y="23" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">app</text>
<rect x="60" y="38" width="180" height="28" rx="6" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="150" y="57" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">pages</text>
<rect x="60" y="72" width="180" height="28" rx="6" fill="{{color.accentSoft}}"/>
<text x="150" y="91" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">widgets</text>
<rect x="60" y="106" width="180" height="28" rx="6" fill="{{color.dangerSoft}}"/>
<text x="150" y="125" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.danger}}">features</text>
<rect x="60" y="140" width="180" height="28" rx="6" fill="{{color.successSoft}}"/>
<text x="150" y="159" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">entities</text>
<rect x="60" y="174" width="180" height="28" rx="6" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="150" y="193" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">shared</text>
<polyline points="58,86 44,86 44,154 52,154" fill="none" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="52,149 52,159 60,154" fill="{{color.success}}"/>
<text x="38" y="124" font-size="11" font-weight="bold" text-anchor="end" fill="{{color.success}}">{{label.allowed}}</text>
<polyline points="242,154 268,154 268,120 248,120" fill="none" stroke="{{color.danger}}" stroke-width="2"/>
<polygon points="248,115 248,125 240,120" fill="{{color.danger}}"/>
<text x="274" y="141" font-size="11" font-weight="bold" fill="{{color.danger}}">{{label.forbidden}}</text>
</svg>`,
  labels: {
    allowed: { ru: 'можно', en: 'OK' },
    forbidden: { ru: 'нельзя', en: 'never' },
  },
  alt: {
    ru: 'Слои FSD сверху вниз: app, pages, widgets, features, entities, shared. Стрелка из widgets вниз в entities — можно. Стрелка из entities вверх в features — нельзя: импортировать можно только из слоёв ниже.',
    en: 'FSD layers top to bottom: app, pages, widgets, features, entities, shared. An arrow from widgets down to entities is OK. An arrow from entities up to features is never allowed: you may import only from lower layers.',
  },
};

const ARCH_UPLOAD_MACHINE: Illustration = {
  id: 'arch-upload-machine',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 168">
<rect x="0" y="20" width="70" height="34" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="35" y="41" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">idle</text>
<rect x="110" y="20" width="100" height="34" rx="8" fill="{{color.accentSoft}}"/>
<text x="160" y="41" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">uploading</text>
<rect x="250" y="20" width="70" height="34" rx="8" fill="{{color.successSoft}}"/>
<text x="285" y="41" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">done</text>
<rect x="110" y="130" width="100" height="34" rx="8" fill="{{color.dangerSoft}}"/>
<text x="160" y="151" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.danger}}">failed</text>
<line x1="70" y1="37" x2="103" y2="37" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="102,32 102,42 110,37" fill="{{color.textMuted}}"/>
<text x="90" y="14" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">START</text>
<line x1="210" y1="37" x2="243" y2="37" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="242,32 242,42 250,37" fill="{{color.textMuted}}"/>
<text x="230" y="14" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">OK</text>
<line x1="140" y1="54" x2="140" y2="123" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="135,122 145,122 140,130" fill="{{color.textMuted}}"/>
<text x="132" y="96" font-size="11" font-family="monospace" text-anchor="end" fill="{{color.textSecondary}}">FAIL</text>
<line x1="180" y1="130" x2="180" y2="61" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="175,62 185,62 180,54" fill="{{color.textMuted}}"/>
<text x="188" y="96" font-size="11" font-family="monospace" fill="{{color.textSecondary}}">RETRY</text>
</svg>`,
  labels: {},
  alt: {
    ru: 'Конечный автомат загрузки: из idle по START в uploading, из uploading по OK в done, по FAIL в failed, из failed по RETRY снова в uploading.',
    en: 'An upload state machine: idle goes to uploading on START, uploading goes to done on OK or to failed on FAIL, and failed goes back to uploading on RETRY.',
  },
};

const ARCH_DEPENDENCY_INVERSION: Illustration = {
  id: 'arch-dependency-inversion',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 182">
<text x="76" y="13" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.danger}}">{{label.direct}}</text>
<rect x="0" y="24" width="48" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="24" y="39" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">cart</text>
<rect x="52" y="24" width="48" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="76" y="39" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">user</text>
<rect x="104" y="24" width="48" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="128" y="39" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">feed</text>
<line x1="24" y1="46" x2="24" y2="63" stroke="{{color.danger}}" stroke-width="2"/>
<polygon points="19,62 29,62 24,70" fill="{{color.danger}}"/>
<line x1="76" y1="46" x2="76" y2="63" stroke="{{color.danger}}" stroke-width="2"/>
<polygon points="71,62 81,62 76,70" fill="{{color.danger}}"/>
<line x1="128" y1="46" x2="128" y2="63" stroke="{{color.danger}}" stroke-width="2"/>
<polygon points="123,62 133,62 128,70" fill="{{color.danger}}"/>
<rect x="0" y="70" width="152" height="28" rx="8" fill="{{color.dangerSoft}}"/>
<text x="76" y="88" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.danger}}">localStorage</text>
<text x="76" y="132" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.everywhere}}</text>
<text x="244" y="13" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.success}}">{{label.inverted}}</text>
<rect x="168" y="24" width="48" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="192" y="39" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">cart</text>
<rect x="220" y="24" width="48" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="244" y="39" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">user</text>
<rect x="272" y="24" width="48" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="296" y="39" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">feed</text>
<line x1="192" y1="46" x2="192" y2="63" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="187,62 197,62 192,70" fill="{{color.success}}"/>
<line x1="244" y1="46" x2="244" y2="63" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="239,62 249,62 244,70" fill="{{color.success}}"/>
<line x1="296" y1="46" x2="296" y2="63" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="291,62 301,62 296,70" fill="{{color.success}}"/>
<rect x="168" y="70" width="152" height="28" rx="8" fill="{{color.successSoft}}"/>
<text x="244" y="88" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.success}}">Storage</text>
<rect x="168" y="128" width="152" height="28" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="244" y="146" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">webStorage</text>
<line x1="244" y1="128" x2="244" y2="105" stroke="{{color.textMuted}}" stroke-width="2" stroke-dasharray="4 3"/>
<polygon points="239,106 249,106 244,98" fill="{{color.textMuted}}"/>
<text x="244" y="176" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.root}}</text>
</svg>`,
  labels: {
    direct: { ru: 'Напрямую', en: 'Directly' },
    inverted: { ru: 'Через интерфейс', en: 'Via an interface' },
    everywhere: { ru: 'замена — правка всех', en: 'swap = edit them all' },
    root: { ru: 'создан в main.ts', en: 'created in main.ts' },
  },
  alt: {
    ru: 'Слева модули cart, user и feed напрямую обращаются к localStorage — замена хранилища требует правки каждого. Справа модули зависят от своего интерфейса Storage, а реализацию webStorage создают в main.ts и передают им.',
    en: 'Left: the cart, user and feed modules call localStorage directly — swapping storage means editing each one. Right: the modules depend on their own Storage interface, and the webStorage implementation is created in main.ts and passed to them.',
  },
};

const ARCH_BACKOFF: Illustration = {
  id: 'arch-backoff',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 176">
<line x1="0" y1="20" x2="320" y2="20" stroke="{{color.danger}}" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="2" y="14" font-size="11" font-weight="bold" fill="{{color.danger}}">{{label.cap}}</text>
<rect x="24" y="125" width="40" height="15" rx="3" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="1.5"/>
<text x="44" y="119" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">0.5s</text>
<rect x="84" y="110" width="40" height="30" rx="3" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="1.5"/>
<text x="104" y="104" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">1s</text>
<rect x="144" y="80" width="40" height="60" rx="3" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="1.5"/>
<text x="164" y="74" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">2s</text>
<rect x="204" y="20" width="40" height="120" rx="3" fill="{{color.warningSoft}}" stroke="{{color.warning}}" stroke-width="1.5"/>
<text x="224" y="34" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">4s</text>
<rect x="264" y="20" width="40" height="120" rx="3" fill="{{color.warningSoft}}" stroke="{{color.warning}}" stroke-width="1.5"/>
<text x="284" y="34" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">4s</text>
<line x1="0" y1="140" x2="320" y2="140" stroke="{{color.border}}" stroke-width="1.5"/>
<text x="44" y="155" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">n=0</text>
<text x="104" y="155" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">n=1</text>
<text x="164" y="155" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">n=2</text>
<text x="224" y="155" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">n=3</text>
<text x="284" y="155" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">n=4</text>
<text x="160" y="172" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">min(500 * 2 ** n, 4000)</text>
</svg>`,
  labels: {
    cap: { ru: 'потолок', en: 'ceiling' },
  },
  alt: {
    ru: 'Задержки перед повторами растут вдвое: 0,5, 1 и 2 секунды, а дальше упираются в потолок 4 секунды. Формула — min(500 * 2 ** n, 4000) миллисекунд.',
    en: 'Retry delays double: 0.5, 1 and 2 seconds, then hit the 4-second ceiling. The formula is min(500 * 2 ** n, 4000) milliseconds.',
  },
};

const ARCH_OFFSET_CURSOR: Illustration = {
  id: 'arch-offset-cursor',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 186">
<text x="0" y="13" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.danger}}">offset=3</text>
<rect x="0" y="24" width="90" height="18" rx="4" fill="{{color.accentSoft}}"/>
<text x="8" y="37" font-size="11" font-family="monospace" fill="{{color.accentText}}">post 11</text>
<rect x="0" y="44" width="90" height="18" rx="4" fill="{{color.accentSoft}}"/>
<text x="8" y="57" font-size="11" font-family="monospace" fill="{{color.accentText}}">post 10</text>
<text x="96" y="47" font-size="11" fill="{{color.accentText}}">{{label.fresh}}</text>
<rect x="0" y="64" width="90" height="18" rx="4" fill="{{color.bgSecondary}}"/>
<text x="8" y="77" font-size="11" font-family="monospace" fill="{{color.textMuted}}">post 9</text>
<rect x="0" y="84" width="90" height="18" rx="4" fill="{{color.dangerSoft}}"/>
<text x="8" y="97" font-size="11" font-family="monospace" fill="{{color.danger}}">post 8</text>
<rect x="0" y="104" width="90" height="18" rx="4" fill="{{color.dangerSoft}}"/>
<text x="8" y="117" font-size="11" font-family="monospace" fill="{{color.danger}}">post 7</text>
<text x="96" y="107" font-size="11" fill="{{color.danger}}">{{label.repeat}}</text>
<rect x="0" y="124" width="90" height="18" rx="4" fill="{{color.successSoft}}"/>
<text x="8" y="137" font-size="11" font-family="monospace" fill="{{color.success}}">post 6</text>
<rect x="0" y="144" width="90" height="18" rx="4" fill="{{color.bgSecondary}}"/>
<text x="8" y="157" font-size="11" font-family="monospace" fill="{{color.textMuted}}">post 5</text>
<rect x="0" y="164" width="90" height="18" rx="4" fill="{{color.bgSecondary}}"/>
<text x="8" y="177" font-size="11" font-family="monospace" fill="{{color.textMuted}}">post 4</text>
<text x="168" y="13" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.success}}">after=7</text>
<rect x="168" y="24" width="90" height="18" rx="4" fill="{{color.accentSoft}}"/>
<text x="176" y="37" font-size="11" font-family="monospace" fill="{{color.accentText}}">post 11</text>
<rect x="168" y="44" width="90" height="18" rx="4" fill="{{color.accentSoft}}"/>
<text x="176" y="57" font-size="11" font-family="monospace" fill="{{color.accentText}}">post 10</text>
<text x="264" y="47" font-size="11" fill="{{color.accentText}}">{{label.fresh}}</text>
<rect x="168" y="64" width="90" height="18" rx="4" fill="{{color.bgSecondary}}"/>
<text x="176" y="77" font-size="11" font-family="monospace" fill="{{color.textMuted}}">post 9</text>
<rect x="168" y="84" width="90" height="18" rx="4" fill="{{color.bgSecondary}}"/>
<text x="176" y="97" font-size="11" font-family="monospace" fill="{{color.textMuted}}">post 8</text>
<rect x="168" y="104" width="90" height="18" rx="4" fill="{{color.bgSecondary}}"/>
<text x="176" y="117" font-size="11" font-family="monospace" fill="{{color.textMuted}}">post 7</text>
<rect x="168" y="124" width="90" height="18" rx="4" fill="{{color.successSoft}}"/>
<text x="176" y="137" font-size="11" font-family="monospace" fill="{{color.success}}">post 6</text>
<rect x="168" y="144" width="90" height="18" rx="4" fill="{{color.successSoft}}"/>
<text x="176" y="157" font-size="11" font-family="monospace" fill="{{color.success}}">post 5</text>
<rect x="168" y="164" width="90" height="18" rx="4" fill="{{color.successSoft}}"/>
<text x="176" y="177" font-size="11" font-family="monospace" fill="{{color.success}}">post 4</text>
<text x="264" y="157" font-size="11" fill="{{color.success}}">{{label.page}}</text>
</svg>`,
  labels: {
    fresh: { ru: 'новые', en: 'new' },
    repeat: { ru: 'повтор', en: 'repeat' },
    page: { ru: 'стр. 2', en: 'page 2' },
  },
  alt: {
    ru: 'Первая страница — посты 9, 8, 7. Пока читали, сверху появились посты 11 и 10. Слева offset=3 сдвинулся: вторая страница — 8, 7, 6, и два поста повторились. Справа курсор «после 7» вернул ровно 6, 5, 4.',
    en: 'Page one was posts 9, 8, 7. Meanwhile posts 11 and 10 appeared on top. Left: offset=3 has shifted, so page two is 8, 7, 6, and two posts repeat. Right: the cursor “after 7” returns exactly 6, 5, 4.',
  },
};

const ARCH_AFFECTED_GRAPH: Illustration = {
  id: 'arch-affected-graph',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 170">
<rect x="20" y="20" width="88" height="30" rx="8" fill="{{color.warningSoft}}" stroke="{{color.warning}}" stroke-width="2"/>
<text x="64" y="39" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">ui-kit</text>
<rect x="233" y="21" width="86" height="28" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="1.5" stroke-dasharray="4 3"/>
<text x="276" y="39" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textMuted}}">utils</text>
<polyline points="64,50 64,72" fill="none" stroke="{{color.accentText}}" stroke-width="2"/>
<polyline points="44,89 44,72 160,72 160,89" fill="none" stroke="{{color.accentText}}" stroke-width="2"/>
<polygon points="39,88 49,88 44,96" fill="{{color.accentText}}"/>
<polygon points="155,88 165,88 160,96" fill="{{color.accentText}}"/>
<line x1="276" y1="49" x2="276" y2="89" stroke="{{color.textMuted}}" stroke-width="1.5" stroke-dasharray="4 3"/>
<polygon points="271,88 281,88 276,96" fill="{{color.textMuted}}"/>
<rect x="0" y="96" width="88" height="30" rx="8" fill="{{color.accentSoft}}"/>
<text x="44" y="115" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">shop</text>
<rect x="116" y="96" width="88" height="30" rx="8" fill="{{color.accentSoft}}"/>
<text x="160" y="115" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">admin</text>
<rect x="233" y="97" width="86" height="28" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="1.5" stroke-dasharray="4 3"/>
<text x="276" y="115" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.textMuted}}">docs</text>
<rect x="0" y="150" width="12" height="12" rx="3" fill="{{color.warningSoft}}" stroke="{{color.warning}}" stroke-width="1.5"/>
<text x="18" y="161" font-size="11" fill="{{color.textSecondary}}">{{label.changed}}</text>
<rect x="110" y="150" width="12" height="12" rx="3" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="1.5"/>
<text x="128" y="161" font-size="11" fill="{{color.textSecondary}}">{{label.affected}}</text>
<rect x="220" y="150" width="12" height="12" rx="3" fill="{{color.bgSecondary}}" stroke="{{color.textMuted}}" stroke-width="1.5" stroke-dasharray="3 2"/>
<text x="238" y="161" font-size="11" fill="{{color.textSecondary}}">{{label.skipped}}</text>
</svg>`,
  labels: {
    changed: { ru: 'изменено', en: 'changed' },
    affected: { ru: 'затронуто', en: 'affected' },
    skipped: { ru: 'пропущено', en: 'skipped' },
  },
  alt: {
    ru: 'Граф монорепозитория: изменили библиотеку ui-kit — проверяются она и зависящие от неё приложения shop и admin. Библиотека utils и сайт docs не затронуты, их задачи пропускаются.',
    en: 'A monorepo graph: the ui-kit library changed, so it and the apps that depend on it, shop and admin, are checked. The utils library and the docs site aren’t affected, so their tasks are skipped.',
  },
};

const TS_TYPE_SETS: Illustration = {
  id: 'ts-type-sets',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
<rect x="0" y="0" width="222" height="180" rx="12" fill="{{color.accentSoft}}"/>
<text x="14" y="24" font-size="13" font-weight="bold" font-family="monospace" fill="{{color.accentText}}">unknown</text>
<text x="14" y="41" font-size="11" fill="{{color.textSecondary}}">{{label.all}}</text>
<rect x="14" y="54" width="60" height="24" rx="6" fill="{{color.bgCard}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="44" y="70" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">string</text>
<rect x="82" y="54" width="60" height="24" rx="6" fill="{{color.bgCard}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="112" y="70" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">number</text>
<rect x="150" y="54" width="60" height="24" rx="6" fill="{{color.bgCard}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="180" y="70" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">boolean</text>
<rect x="14" y="86" width="44" height="24" rx="6" fill="{{color.bgCard}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="36" y="102" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">null</text>
<rect x="66" y="86" width="60" height="24" rx="6" fill="{{color.bgCard}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="96" y="102" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">object</text>
<rect x="134" y="86" width="76" height="24" rx="6" fill="{{color.bgCard}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="172" y="102" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">undefined</text>
<circle cx="40" cy="146" r="21" fill="none" stroke="{{color.textMuted}}" stroke-width="1.5" stroke-dasharray="4 3"/>
<text x="40" y="150" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">never</text>
<text x="70" y="150" font-size="11" fill="{{color.textSecondary}}">{{label.empty}}</text>
<rect x="236" y="56" width="84" height="64" rx="10" fill="{{color.dangerSoft}}"/>
<text x="278" y="84" font-size="13" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.danger}}">any</text>
<text x="278" y="104" font-size="11" text-anchor="middle" fill="{{color.danger}}">{{label.off}}</text>
</svg>`,
  labels: {
    all: { ru: 'любое значение', en: 'any value' },
    empty: { ru: 'ни одного значения', en: 'no values at all' },
    off: { ru: 'проверки нет', en: 'no checks' },
  },
  alt: {
    ru: 'unknown — множество всех значений: string, number, boolean, null, object, undefined. never — пустое множество внутри него, без единого значения. any стоит в стороне: это не множество значений, а отключённая проверка.',
    en: 'unknown is the set of all values: string, number, boolean, null, object, undefined. never is the empty set inside it, with no values at all. any stands apart: it’s not a set of values but checking turned off.',
  },
};

const TS_UTILITY_FIELDS: Illustration = {
  id: 'ts-utility-fields',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 168">
<text x="37" y="13" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">User</text>
<text x="119" y="13" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">Pick</text>
<text x="119" y="29" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">id | name</text>
<text x="201" y="13" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">Omit</text>
<text x="201" y="29" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">password</text>
<text x="283" y="13" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">Partial</text>
<rect x="0" y="38" width="74" height="22" rx="6" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="37" y="53" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">id</text>
<rect x="0" y="64" width="74" height="22" rx="6" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="37" y="79" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">name</text>
<rect x="0" y="90" width="74" height="22" rx="6" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="37" y="105" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">email</text>
<rect x="0" y="116" width="74" height="22" rx="6" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="37" y="131" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">password</text>
<rect x="82" y="38" width="74" height="22" rx="6" fill="{{color.successSoft}}" stroke="{{color.success}}" stroke-width="1"/>
<text x="119" y="53" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.success}}">id</text>
<rect x="82" y="64" width="74" height="22" rx="6" fill="{{color.successSoft}}" stroke="{{color.success}}" stroke-width="1"/>
<text x="119" y="79" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.success}}">name</text>
<rect x="82.5" y="90.5" width="73" height="21" rx="6" fill="none" stroke="{{color.textMuted}}" stroke-width="1" stroke-dasharray="3 3"/>
<text x="119" y="105" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textMuted}}">email</text>
<rect x="82.5" y="116.5" width="73" height="21" rx="6" fill="none" stroke="{{color.textMuted}}" stroke-width="1" stroke-dasharray="3 3"/>
<text x="119" y="131" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textMuted}}">password</text>
<rect x="164" y="38" width="74" height="22" rx="6" fill="{{color.successSoft}}" stroke="{{color.success}}" stroke-width="1"/>
<text x="201" y="53" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.success}}">id</text>
<rect x="164" y="64" width="74" height="22" rx="6" fill="{{color.successSoft}}" stroke="{{color.success}}" stroke-width="1"/>
<text x="201" y="79" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.success}}">name</text>
<rect x="164" y="90" width="74" height="22" rx="6" fill="{{color.successSoft}}" stroke="{{color.success}}" stroke-width="1"/>
<text x="201" y="105" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.success}}">email</text>
<rect x="164.5" y="116.5" width="73" height="21" rx="6" fill="none" stroke="{{color.textMuted}}" stroke-width="1" stroke-dasharray="3 3"/>
<text x="201" y="131" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textMuted}}">password</text>
<rect x="246" y="38" width="74" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="283" y="53" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">id?</text>
<rect x="246" y="64" width="74" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="283" y="79" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">name?</text>
<rect x="246" y="90" width="74" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="283" y="105" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">email?</text>
<rect x="246" y="116" width="74" height="22" rx="6" fill="{{color.accentSoft}}"/>
<text x="283" y="131" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">password?</text>
<rect x="0" y="152" width="12" height="12" rx="3" fill="{{color.successSoft}}" stroke="{{color.success}}" stroke-width="1"/>
<text x="18" y="163" font-size="11" fill="{{color.textSecondary}}">{{label.kept}}</text>
<rect x="110.5" y="152.5" width="11" height="11" rx="3" fill="none" stroke="{{color.textMuted}}" stroke-width="1" stroke-dasharray="3 2"/>
<text x="128" y="163" font-size="11" fill="{{color.textSecondary}}">{{label.dropped}}</text>
<rect x="220" y="152" width="12" height="12" rx="3" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="1"/>
<text x="238" y="163" font-size="11" fill="{{color.textSecondary}}">{{label.optional}}</text>
</svg>`,
  labels: {
    kept: { ru: 'осталось', en: 'kept' },
    dropped: { ru: 'убрано', en: 'dropped' },
    optional: { ru: 'опционально', en: 'optional' },
  },
  alt: {
    ru: 'Тип User с полями id, name, email, password. Pick по id и name оставляет только их. Omit по password оставляет id, name и email. Partial оставляет все четыре поля, но каждое становится необязательным.',
    en: 'A User type with fields id, name, email, password. Pick of id and name keeps only those two. Omit of password keeps id, name and email. Partial keeps all four fields but makes each one optional.',
  },
};

const CSS_BOX_LAYERS: Illustration = {
  id: 'css-box-layers',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 204">
<rect x="1" y="1" width="318" height="148" rx="6" fill="none" stroke="{{color.textMuted}}" stroke-width="1.5" stroke-dasharray="5 4"/>
<text x="8" y="13" font-size="11" font-family="monospace" fill="{{color.textSecondary}}">margin</text>
<rect x="15" y="17" width="290" height="120" rx="4" fill="{{color.warningSoft}}" stroke="{{color.warning}}" stroke-width="2"/>
<text x="22" y="30" font-size="11" font-family="monospace" fill="{{color.textSecondary}}">border</text>
<rect x="33" y="34" width="254" height="86" rx="2" fill="{{color.successSoft}}"/>
<text x="40" y="48" font-size="11" font-family="monospace" fill="{{color.success}}">padding</text>
<rect x="70" y="56" width="180" height="42" rx="2" fill="{{color.bgCard}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="160" y="81" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">content</text>
<line x1="70" y1="160" x2="250" y2="160" stroke="{{color.accentText}}" stroke-width="2"/>
<line x1="70" y1="154" x2="70" y2="166" stroke="{{color.accentText}}" stroke-width="2"/>
<line x1="250" y1="154" x2="250" y2="166" stroke="{{color.accentText}}" stroke-width="2"/>
<text x="160" y="176" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">width: content-box</text>
<line x1="15" y1="186" x2="305" y2="186" stroke="{{color.success}}" stroke-width="2"/>
<line x1="15" y1="180" x2="15" y2="192" stroke="{{color.success}}" stroke-width="2"/>
<line x1="305" y1="180" x2="305" y2="192" stroke="{{color.success}}" stroke-width="2"/>
<text x="160" y="202" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.success}}">width: border-box</text>
</svg>`,
  labels: {},
  alt: {
    ru: 'Слои бокса изнутри наружу: content, padding, border и внешний margin. При box-sizing: content-box ширина width — это только content. При border-box в width входят и padding, и border. margin не входит ни в одном режиме.',
    en: 'Box layers from the inside out: content, padding, border and the outer margin. With box-sizing: content-box, width is just the content. With border-box, width includes padding and border too. margin is never included.',
  },
};

const CSS_FLEX_AXES: Illustration = {
  id: 'css-flex-axes',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 180">
<text x="76" y="13" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">row</text>
<rect x="0" y="20" width="152" height="120" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<rect x="14" y="36" width="30" height="56" rx="4" fill="{{color.accentSoft}}"/>
<rect x="50" y="36" width="30" height="56" rx="4" fill="{{color.accentSoft}}"/>
<rect x="86" y="36" width="30" height="56" rx="4" fill="{{color.accentSoft}}"/>
<line x1="12" y1="112" x2="119" y2="112" stroke="{{color.accentText}}" stroke-width="2"/>
<polygon points="118,107 118,117 126,112" fill="{{color.accentText}}"/>
<line x1="138" y1="30" x2="138" y2="121" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="133,120 143,120 138,128" fill="{{color.success}}"/>
<text x="244" y="13" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">column</text>
<rect x="168" y="20" width="152" height="120" rx="8" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<rect x="184" y="30" width="60" height="24" rx="4" fill="{{color.accentSoft}}"/>
<rect x="184" y="60" width="60" height="24" rx="4" fill="{{color.accentSoft}}"/>
<rect x="184" y="90" width="60" height="24" rx="4" fill="{{color.accentSoft}}"/>
<line x1="300" y1="30" x2="300" y2="117" stroke="{{color.accentText}}" stroke-width="2"/>
<polygon points="295,116 305,116 300,124" fill="{{color.accentText}}"/>
<line x1="180" y1="129" x2="275" y2="129" stroke="{{color.success}}" stroke-width="2"/>
<polygon points="274,124 274,134 282,129" fill="{{color.success}}"/>
<line x1="0" y1="157" x2="18" y2="157" stroke="{{color.accentText}}" stroke-width="3"/>
<text x="24" y="161" font-size="11" fill="{{color.textSecondary}}">{{label.main}}</text>
<text x="24" y="176" font-size="11" font-family="monospace" fill="{{color.accentText}}">justify-content</text>
<line x1="168" y1="157" x2="186" y2="157" stroke="{{color.success}}" stroke-width="3"/>
<text x="192" y="161" font-size="11" fill="{{color.textSecondary}}">{{label.cross}}</text>
<text x="192" y="176" font-size="11" font-family="monospace" fill="{{color.success}}">align-items</text>
</svg>`,
  labels: {
    main: { ru: 'главная ось', en: 'main axis' },
    cross: { ru: 'поперечная ось', en: 'cross axis' },
  },
  alt: {
    ru: 'При flex-direction: row главная ось идёт слева направо, поперечная — сверху вниз. При column наоборот: главная ось вертикальная, поперечная — горизонтальная. justify-content работает вдоль главной оси, align-items — вдоль поперечной.',
    en: 'With flex-direction: row the main axis runs left to right and the cross axis top to bottom. With column it’s reversed: the main axis is vertical and the cross axis horizontal. justify-content works along the main axis, align-items along the cross axis.',
  },
};

const CSS_GRID_FR: Illustration = {
  id: 'css-grid-fr',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 120">
<text x="160" y="13" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">400px: 80px 1fr 2fr; gap: 16px</text>
<rect x="0" y="24" width="64" height="50" rx="4" fill="{{color.bgSecondary}}" stroke="{{color.border}}" stroke-width="1"/>
<text x="32" y="53" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">80px</text>
<rect x="64" y="24" width="12.8" height="50" fill="{{color.warningSoft}}"/>
<rect x="76.8" y="24" width="76.8" height="50" rx="4" fill="{{color.accentSoft}}"/>
<text x="115.2" y="46" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">1fr</text>
<text x="115.2" y="63" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">96px</text>
<rect x="153.6" y="24" width="12.8" height="50" fill="{{color.warningSoft}}"/>
<rect x="166.4" y="24" width="153.6" height="50" rx="4" fill="{{color.accentSoft}}"/>
<text x="243.2" y="46" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">2fr</text>
<text x="243.2" y="63" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">192px</text>
<text x="160" y="96" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">400 − 80 − 2 × 16 = 288</text>
<text x="160" y="113" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textPrimary}}">1fr = 288 / 3 = 96px</text>
</svg>`,
  labels: {},
  alt: {
    ru: 'Сетка шириной 400px с колонками 80px, 1fr и 2fr и промежутками по 16px. Из 400 вычитают фиксированную колонку и два промежутка — остаётся 288px. Это три доли: 1fr = 96px, 2fr = 192px.',
    en: 'A 400px grid with columns 80px, 1fr and 2fr and 16px gaps. Subtract the fixed column and two gaps from 400 — 288px remain. That’s three fractions: 1fr = 96px, 2fr = 192px.',
  },
};

const AI_TOKENS: Illustration = {
  id: 'ai-tokens',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 136">
<text x="0" y="29" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">strawberry</text>
<line x1="96" y1="25" x2="112" y2="25" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="111,20 111,30 119,25" fill="{{color.textMuted}}"/>
<rect x="126" y="12" width="56" height="26" rx="6" fill="{{color.accentSoft}}"/>
<text x="154" y="29" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">straw</text>
<rect x="188" y="12" width="56" height="26" rx="6" fill="{{color.accentSoft}}"/>
<text x="216" y="29" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">berry</text>
<text x="0" y="73" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">unbelievable</text>
<line x1="96" y1="69" x2="112" y2="69" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="111,64 111,74 119,69" fill="{{color.textMuted}}"/>
<rect x="126" y="56" width="36" height="26" rx="6" fill="{{color.accentSoft}}"/>
<text x="144" y="73" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">un</text>
<rect x="168" y="56" width="64" height="26" rx="6" fill="{{color.accentSoft}}"/>
<text x="200" y="73" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">believ</text>
<rect x="238" y="56" width="48" height="26" rx="6" fill="{{color.accentSoft}}"/>
<text x="262" y="73" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.accentText}}">able</text>
<text x="0" y="117" font-size="12" font-family="monospace" fill="{{color.textPrimary}}">1234567</text>
<line x1="96" y1="113" x2="112" y2="113" stroke="{{color.textMuted}}" stroke-width="2"/>
<polygon points="111,108 111,118 119,113" fill="{{color.textMuted}}"/>
<rect x="126" y="100" width="44" height="26" rx="6" fill="{{color.successSoft}}"/>
<text x="148" y="117" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.success}}">123</text>
<rect x="176" y="100" width="44" height="26" rx="6" fill="{{color.successSoft}}"/>
<text x="198" y="117" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.success}}">456</text>
<rect x="226" y="100" width="28" height="26" rx="6" fill="{{color.successSoft}}"/>
<text x="240" y="117" font-size="12" font-family="monospace" text-anchor="middle" fill="{{color.success}}">7</text>
</svg>`,
  labels: {},
  alt: {
    ru: 'Пример разбиения на токены: strawberry — straw и berry, unbelievable — un, believ и able, число 1234567 — 123, 456 и 7. Модель видит эти куски, а не отдельные буквы.',
    en: 'A tokenization example: strawberry becomes straw and berry, unbelievable becomes un, believ and able, and the number 1234567 becomes 123, 456 and 7. The model sees these pieces, not individual letters.',
  },
};

const AI_TEMPERATURE: Illustration = {
  id: 'ai-temperature',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 172">
<text x="160" y="14" font-size="12" font-weight="bold" text-anchor="middle" fill="{{color.textPrimary}}">{{label.prompt}}</text>
<text x="75" y="36" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">t = 1</text>
<text x="245" y="36" font-size="12" font-weight="bold" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">t = 0.5</text>
<rect x="10" y="87" width="40" height="63" rx="3" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="1.5"/>
<text x="30" y="82" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">63%</text>
<rect x="55" y="127" width="40" height="23" rx="3" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="1.5"/>
<text x="75" y="122" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">23%</text>
<rect x="100" y="136" width="40" height="14" rx="3" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="1.5"/>
<text x="120" y="131" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">14%</text>
<rect x="180" y="66" width="40" height="84" rx="3" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="1.5"/>
<text x="200" y="61" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">84%</text>
<rect x="225" y="139" width="40" height="11" rx="3" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="1.5"/>
<text x="245" y="134" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">11%</text>
<rect x="270" y="145" width="40" height="5" rx="2" fill="{{color.accentSoft}}" stroke="{{color.accentText}}" stroke-width="1.5"/>
<text x="290" y="140" font-size="11" font-family="monospace" text-anchor="middle" fill="{{color.textSecondary}}">4%</text>
<line x1="0" y1="150" x2="150" y2="150" stroke="{{color.border}}" stroke-width="1.5"/>
<line x1="170" y1="150" x2="320" y2="150" stroke="{{color.border}}" stroke-width="1.5"/>
<text x="30" y="166" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.window}}</text>
<text x="75" y="166" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.roof}}</text>
<text x="120" y="166" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.sofa}}</text>
<text x="200" y="166" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.window}}</text>
<text x="245" y="166" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.roof}}</text>
<text x="290" y="166" font-size="11" text-anchor="middle" fill="{{color.textSecondary}}">{{label.sofa}}</text>
</svg>`,
  labels: {
    prompt: { ru: 'Кот сидит на…', en: 'The cat sits on the…' },
    window: { ru: 'окне', en: 'sill' },
    roof: { ru: 'крыше', en: 'roof' },
    sofa: { ru: 'диване', en: 'sofa' },
  },
  alt: {
    ru: 'Вероятности следующего токена после «Кот сидит на…». При температуре 1: окне 63%, крыше 23%, диване 14%. При температуре 0.5 распределение острее: окне 84%, крыше 11%, диване 4%.',
    en: 'Next-token probabilities after “The cat sits on the…”. At temperature 1: sill 63%, roof 23%, sofa 14%. At temperature 0.5 the distribution is sharper: sill 84%, roof 11%, sofa 4%.',
  },
};

const ALGO_GROWTH: Illustration = {
  id: 'algo-growth',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 200">
<line x1="30" y1="180" x2="312" y2="180" stroke="{{color.border}}" stroke-width="1.5"/>
<line x1="30" y1="180" x2="30" y2="8" stroke="{{color.border}}" stroke-width="1.5"/>
<polyline points="30,169.8 44,169.8 58,169.8 72,169.8 86,169.8 100,169.8 114,169.8 128,169.8 142,169.8 156,169.8 170,169.8 184,169.8 198,169.8 212,169.8 226,169.8 240,169.8 254,169.8 268,169.8 282,169.8 296,169.8 310,169.8" fill="none" stroke="{{color.success}}" stroke-width="2.5"/>
<polyline points="30,180 44,173.2 58,169.2 72,166.4 86,164.2 100,162.4 114,160.9 128,159.6 142,158.4 156,157.4 170,156.5 184,155.6 198,154.8 212,154.1 226,153.4 240,152.8 254,152.2 268,151.6 282,151.1 296,150.6 310,150.1" fill="none" stroke="{{color.success}}" stroke-width="2.5"/>
<polyline points="30,180 44,176.6 58,173.2 72,169.8 86,166.4 100,163 114,159.6 128,156.2 142,152.8 156,149.4 170,146 184,142.6 198,139.2 212,135.8 226,132.4 240,129 254,125.6 268,122.2 282,118.8 296,115.4 310,112" fill="none" stroke="{{color.accentText}}" stroke-width="2.5"/>
<polyline points="30,180 44,178.3 58,174.6 72,169.8 86,164.2 100,158 114,151.4 128,144.3 142,136.9 156,129.2 170,121.2 184,113 198,104.5 212,95.9 226,87 240,78 254,68.8 268,59.5 282,50 296,40.4 310,30.7" fill="none" stroke="{{color.textSecondary}}" stroke-width="2.5"/>
<polyline points="30,180 44,179.2 58,176.6 72,172.4 86,166.4 100,158.8 114,149.4 128,138.4 142,125.6 156,111.2 170,95 184,77.2 198,57.6 212,36.3 226,13.4" fill="none" stroke="{{color.danger}}" stroke-width="2.5"/>
<text x="306" y="163.8" font-size="11" font-family="monospace" text-anchor="end" fill="{{color.success}}">O(1)</text>
<text x="306" y="144.1" font-size="11" font-family="monospace" text-anchor="end" fill="{{color.success}}">O(log n)</text>
<text x="306" y="106" font-size="11" font-family="monospace" text-anchor="end" fill="{{color.accentText}}">O(n)</text>
<text x="306" y="24.7" font-size="11" font-family="monospace" text-anchor="end" fill="{{color.textSecondary}}">O(n log n)</text>
<text x="218" y="23.4" font-size="11" font-family="monospace" text-anchor="end" fill="{{color.danger}}">O(n²)</text>
<text x="312" y="196" font-size="11" font-family="monospace" text-anchor="end" fill="{{color.textSecondary}}">n</text>
<text x="26" y="16" font-size="11" text-anchor="end" fill="{{color.textSecondary}}">{{label.time}}</text>
</svg>`,
  labels: {
    time: { ru: 'шаги', en: 'steps' },
  },
  alt: {
    ru: 'Рост числа шагов при увеличении n: O(1) — горизонтальная линия, O(log n) растёт очень медленно, O(n) — прямая, O(n log n) — чуть круче, O(n²) быстро уходит вверх.',
    en: 'How the number of steps grows with n: O(1) is a flat line, O(log n) grows very slowly, O(n) is a straight line, O(n log n) is a bit steeper, O(n²) shoots up quickly.',
  },
};

const WEB_DEBOUNCE_THROTTLE: Illustration = {
  id: 'web-debounce-throttle',
  svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 176">
<text x="0" y="13" font-size="11" fill="{{color.textSecondary}}">{{label.events}}</text>
<line x1="0" y1="42" x2="320" y2="42" stroke="{{color.border}}" stroke-width="1"/>
<line x1="10" y1="26" x2="10" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="22" y1="26" x2="22" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="34" y1="26" x2="34" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="46" y1="26" x2="46" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="58" y1="26" x2="58" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="70" y1="26" x2="70" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="82" y1="26" x2="82" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="94" y1="26" x2="94" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="106" y1="26" x2="106" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="118" y1="26" x2="118" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="200" y1="26" x2="200" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="212" y1="26" x2="212" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="224" y1="26" x2="224" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<line x1="236" y1="26" x2="236" y2="42" stroke="{{color.textMuted}}" stroke-width="2"/>
<text x="159" y="37" font-size="11" text-anchor="middle" fill="{{color.textMuted}}">{{label.pause}}</text>
<text x="0" y="66" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">debounce</text>
<line x1="0" y1="92" x2="320" y2="92" stroke="{{color.border}}" stroke-width="1"/>
<line x1="118" y1="84" x2="162" y2="84" stroke="{{color.success}}" stroke-width="1" stroke-dasharray="3 3"/>
<line x1="236" y1="84" x2="280" y2="84" stroke="{{color.success}}" stroke-width="1" stroke-dasharray="3 3"/>
<circle cx="168" cy="92" r="6" fill="{{color.success}}"/>
<circle cx="286" cy="92" r="6" fill="{{color.success}}"/>
<text x="0" y="118" font-size="12" font-weight="bold" font-family="monospace" fill="{{color.textPrimary}}">throttle</text>
<line x1="0" y1="144" x2="320" y2="144" stroke="{{color.border}}" stroke-width="1"/>
<circle cx="10" cy="144" r="6" fill="{{color.accentText}}"/>
<circle cx="58" cy="144" r="6" fill="{{color.accentText}}"/>
<circle cx="106" cy="144" r="6" fill="{{color.accentText}}"/>
<circle cx="200" cy="144" r="6" fill="{{color.accentText}}"/>
<text x="0" y="172" font-size="11" fill="{{color.textSecondary}}">{{label.note}}</text>
</svg>`,
  labels: {
    events: { ru: 'события ввода', en: 'input events' },
    pause: { ru: 'пауза', en: 'pause' },
    note: { ru: 'кружок — вызов fn', en: 'dot = a call of fn' },
  },
  alt: {
    ru: 'Две пачки событий ввода с паузой между ними. debounce ждёт затишья и вызывает функцию один раз после каждой пачки — всего два вызова. throttle вызывает её не чаще раза в интервал, пока события идут, — четыре вызова.',
    en: 'Two bursts of input events with a pause between them. debounce waits for quiet and calls the function once after each burst — two calls in total. throttle calls it at most once per interval while events keep coming — four calls.',
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
  'html-landmarks': HTML_LANDMARKS,
  'html-formdata': HTML_FORMDATA,
  'a11y-name-priority': A11Y_NAME_PRIORITY,
  'a11y-hidden-vs-inert': A11Y_HIDDEN_VS_INERT,
  'testing-pyramid-trophy': TESTING_PYRAMID_TROPHY,
  'testing-query-variants': TESTING_QUERY_VARIANTS,
  'node-threads': NODE_THREADS,
  'node-stream-memory': NODE_STREAM_MEMORY,
  'next-file-nesting': NEXT_FILE_NESTING,
  'next-static-shell': NEXT_STATIC_SHELL,
  'next-image-cls': NEXT_IMAGE_CLS,
  'arch-srp-reasons': ARCH_SRP_REASONS,
  'arch-observer': ARCH_OBSERVER,
  'arch-fsd-layers': ARCH_FSD_LAYERS,
  'arch-upload-machine': ARCH_UPLOAD_MACHINE,
  'arch-dependency-inversion': ARCH_DEPENDENCY_INVERSION,
  'arch-backoff': ARCH_BACKOFF,
  'arch-offset-cursor': ARCH_OFFSET_CURSOR,
  'arch-affected-graph': ARCH_AFFECTED_GRAPH,
  'ts-type-sets': TS_TYPE_SETS,
  'ts-utility-fields': TS_UTILITY_FIELDS,
  'css-box-layers': CSS_BOX_LAYERS,
  'css-flex-axes': CSS_FLEX_AXES,
  'css-grid-fr': CSS_GRID_FR,
  'ai-tokens': AI_TOKENS,
  'ai-temperature': AI_TEMPERATURE,
  'algo-growth': ALGO_GROWTH,
  'web-debounce-throttle': WEB_DEBOUNCE_THROTTLE,
};
