import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { GLOSSARY } from '../src/entities/question/glossary/glossary';

type TermPatterns = {
  ru: string;
  en: string;
  topics?: readonly string[];
  skip?: readonly string[];
};

type Span = {
  start: number;
  end: number;
};

type Candidate = {
  id: string;
  ru: Span;
  en: Span;
};

const W = '[а-яё]*';
const MAX_TERMS_PER_BLOCK = 2;
const ROOT = process.cwd();
const CONTENT_DIRS = ['src/entities/question/data', 'src/entities/question/lessons'];
const SKIPPED_FILES = new Set(['index.ts', 'diagrams.ts']);

const TERM_PATTERNS: Record<string, TermPatterns> = {
  'lexical-environment': { ru: `лексическ${W} окружени${W}`, en: 'lexical environments?' },
  microtask: { ru: `микрозадач${W}`, en: 'microtasks?' },
  tdz: { ru: `(?:временн${W} мёртв${W} зон${W}|(?-i:TDZ))`, en: '(?:temporal dead zone|(?-i:TDZ))' },
  hoisting: { ru: `(?:всплыти${W}|hoisting)`, en: 'hoist(?:ing|ed|s)?', topics: ['javascript'] },
  'prototype-chain': { ru: `цепочк${W} прототипов`, en: 'prototype chains?' },
  idempotent: { ru: `идемпотентн${W}`, en: 'idempoten(?:t|ce|cy)' },
  origin: { ru: 'origin', en: 'origins?', topics: ['web'] },
  preflight: { ru: `preflight(?:-запрос${W})?`, en: 'preflight(?: requests?)?' },
  xss: { ru: '(?-i:XSS)', en: '(?-i:XSS)' },
  csrf: { ru: '(?-i:CSRF)', en: '(?-i:CSRF)' },
  specificity: { ru: `специфичност${W}`, en: 'specificity', topics: ['css'] },
  'stacking-context': { ru: `контекст${W} наложения`, en: 'stacking contexts?' },
  reconciliation: { ru: `(?:reconciliation|согласовани${W})`, en: 'reconciliation', topics: ['react'] },
  batching: { ru: `(?:батчинг${W}|batching)`, en: 'batching', topics: ['react', 'state'] },
  memoization: { ru: `мемоиз${W}`, en: 'memoiz(?:ation|e|ed|es|ing)' },
  amortized: { ru: `амортизированн${W}`, en: 'amortized' },
  token: { ru: `токен${W}`, en: 'tokens?', topics: ['ai'], skip: ['ai-rag-007'] },
  'context-window': { ru: `окн${W} контекста`, en: 'context windows?' },
  embedding: { ru: `эмбеддинг${W}`, en: 'embeddings?', topics: ['ai'] },
  distributive: { ru: `дистрибутивн${W}`, en: 'distributive' },
  'tree-shaking': { ru: 'tree-shaking', en: 'tree-shaking' },
  layout: { ru: 'layout(?! shift)', en: 'layout(?! shift)', topics: ['web'] },
  closure: { ru: `замыкани${W}`, en: 'closures?' },
  'stale-closure': { ru: `устаревш${W} замыкани${W}`, en: 'stale closures?' },
  'event-loop': { ru: `(?:цикл${W} событий|event loop)`, en: 'event loop' },
  'garbage-collection': { ru: `(?:сборщик${W} мусора|сборк${W} мусора)`, en: 'garbage collect(?:or|ion|ed)', topics: ['javascript', 'node', 'web', 'react'] },
  'pure-function': { ru: `чист${W} функци${W}`, en: 'pure functions?' },
  'side-effect': {
    ru: `побочн${W} эффект${W}`,
    en: 'side effects?',
    topics: ['javascript', 'typescript', 'react', 'web', 'ai', 'algorithms', 'html', 'testing', 'state', 'node', 'next', 'architecture'],
  },
  immutability: { ru: `(?:иммутабельн${W}|неизменяем${W})`, en: 'immutab(?:le|ility)' },
  'shallow-copy': { ru: `поверхностн${W} (?:копи|копировани)${W}`, en: 'shallow cop(?:y|ies|ying)' },
  'type-coercion': { ru: `приведени${W} тип${W}`, en: '(?:type )?coercion' },
  debounce: { ru: `(?:debounce|дебаунс${W})`, en: 'debounc(?:e|ed|es|ing)' },
  throttle: { ru: `(?:throttl${W}|тротт?линг${W})`, en: 'throttl(?:e|ed|es|ing)', topics: ['javascript', 'react', 'state'] },
  'type-narrowing': { ru: `сужени${W}`, en: 'narrowing', topics: ['typescript'] },
  'type-guard': { ru: `(?:type guard${W}|предикат${W} тип${W})`, en: 'type (?:guards?|predicates?)' },
  generic: { ru: `(?:дженерик${W}|обобщённ${W} тип${W})`, en: 'generics?', topics: ['typescript'] },
  'structural-typing': { ru: `структурн${W} типизаци${W}`, en: 'structural typing' },
  hydration: { ru: `гидрат${W}`, en: 'hydrat(?:ion|e|es|ed|ing)' },
  'controlled-component': { ru: `управляем${W} (?:компонент|пол|инпут)${W}`, en: 'controlled (?:components?|inputs?|fields?)' },
  'prop-drilling': { ru: `(?:prop drilling|проброс${W} пропс${W})`, en: 'prop drilling' },
  bfc: {
    ru: `(?:блочн${W} контекст${W} форматирования|контекст${W} форматирования блок${W}|(?-i:BFC))`,
    en: '(?:block formatting contexts?|(?-i:BFC))',
  },
  'margin-collapsing': { ru: `схлопывани${W}`, en: '(?:margin collaps(?:e|es|ing)|collaps(?:e|es|ing) margins?|collapsing)', topics: ['css'] },
  'containing-block': { ru: `содержащ${W} блок${W}`, en: 'containing blocks?' },
  cors: { ru: '(?-i:CORS)', en: '(?-i:CORS)' },
  csp: { ru: '(?-i:CSP)', en: '(?-i:CSP)' },
  'same-origin-policy': { ru: `(?:политик${W} (?:одного|единого) источника|same-origin policy)`, en: 'same-origin policy' },
  hsts: { ru: '(?-i:HSTS)', en: '(?-i:HSTS)' },
  lcp: { ru: '(?-i:LCP)', en: '(?-i:LCP)' },
  cls: { ru: '(?-i:CLS)', en: '(?-i:CLS)' },
  inp: { ru: '(?-i:INP)', en: '(?-i:INP)' },
  'critical-rendering-path': { ru: `критическ${W} пут${W} (?:рендеринга|отрисовки)`, en: 'critical rendering path' },
  'service-worker': { ru: `(?:service worker${W}|сервис-воркер${W})`, en: 'service workers?' },
  'accessibility-tree': { ru: `дерев${W} доступности`, en: 'accessibility trees?' },
  'accessible-name': { ru: `доступн${W} (?:имя|имени|именем|имена)`, en: 'accessible names?' },
  landmark: { ru: `(?:ориентир${W}|landmark${W})`, en: 'landmarks?', topics: ['html'] },
  backpressure: { ru: `(?:обратн${W} давлени${W}|backpressure)`, en: 'backpressure' },
  libuv: { ru: 'libuv', en: 'libuv' },
  rsc: { ru: `(?:серверн${W} компонент${W}|(?-i:RSC))`, en: '(?:server components?|(?-i:RSC))' },
  ssr: { ru: `(?:(?-i:SSR)|серверн${W} рендеринг${W})`, en: '(?:(?-i:SSR)|server-side rendering)' },
  isr: { ru: '(?-i:ISR)', en: '(?-i:ISR)' },
  'fast-forward': { ru: 'fast-forward', en: 'fast-forward', topics: ['git'] },
  'detached-head': { ru: `(?:detached HEAD|отсоединённ${W} HEAD)`, en: 'detached HEAD' },
  rebase: { ru: `(?:rebase|ребейз${W}|перебазир${W})`, en: 'rebas(?:e|es|ed|ing)', topics: ['git'] },
  'test-double': { ru: `(?:тестов${W} двойник${W}|мок${W}|стаб${W})`, en: '(?:test doubles?|mocks?|stubs?)', topics: ['testing'] },
  'flaky-test': { ru: `(?:нестабильн${W} тест${W}|flaky)`, en: 'flaky(?: tests?)?' },
  normalization: { ru: `нормализ${W}`, en: 'normaliz(?:e|es|ed|ing|ation)', topics: ['state'] },
  'single-source-of-truth': { ru: `(?:(?:единств|един)${W}|один) источник${W} истины`, en: 'single source of truth' },
  coupling: { ru: `(?:связанност${W}|зацеплени${W})`, en: 'coupl(?:ing|ed)' },
  cohesion: { ru: `связност${W}`, en: 'cohesi(?:on|ve)' },
  'dependency-injection': { ru: `внедрени${W} зависимост${W}`, en: 'dependency injection' },
  'dependency-inversion': { ru: `инверси${W} зависимост${W}`, en: 'dependency inversion' },
  hallucination: { ru: `галлюцин${W}`, en: 'hallucinat(?:e|es|ed|ing|ion|ions)' },
  rag: { ru: '(?-i:RAG)', en: '(?-i:RAG)' },
  'prompt-injection': { ru: `(?:prompt injection|промпт-инъекци${W}|инъекци${W} в промпт${W})`, en: 'prompt injections?' },
  'big-o': { ru: `(?:O-нотаци${W}|асимптотическ${W} сложност${W})`, en: '(?:Big O|big-O|asymptotic complexity)' },
};

const STRING = `'(?:[^'\\\\\\n]|\\\\.)*'|"(?:[^"\\\\\\n]|\\\\.)*"`;
const BLOCK_PATTERN = new RegExp(`type: 'text',(\\s*)text: \\{(\\s*)ru: (${STRING}),(\\s*)en: (${STRING})`, 'g');
const ANCHOR_PATTERN = /^\s{2,4}(?:id|tag): '([^']+)'/gm;
const MARKUP_PATTERN = /`[^`]*`|\*\*[^*]*\*\*|\[\[[^\]]*\]\]/g;
const TERM_ID_PATTERN = /\[\[([a-z0-9-]+)\|/g;

const compiled = Object.fromEntries(
  Object.entries(TERM_PATTERNS).map(([id, patterns]) => [
    id,
    {
      ru: new RegExp(`(?<![\\p{L}\\p{N}_-])(?:${patterns.ru})(?![\\p{L}\\p{N}_])`, 'giu'),
      en: new RegExp(`(?<![\\p{L}\\p{N}_-])(?:${patterns.en})(?![\\p{L}\\p{N}_])`, 'giu'),
      topics: patterns.topics,
      skip: patterns.skip,
    },
  ]),
);

const topicOf = (fileName: string): string => fileName.replace(/(-\d+)?\.ts$/, '');

const protectedSpans = (value: string): Span[] =>
  [...value.matchAll(MARKUP_PATTERN)].map((match) => ({ start: match.index ?? 0, end: (match.index ?? 0) + match[0].length }));

const overlaps = (span: Span, spans: Span[]): boolean => spans.some((other) => span.start < other.end && other.start < span.end);

const findFree = (pattern: RegExp, value: string, blocked: Span[]): Span | null => {
  for (const match of value.matchAll(pattern)) {
    const span = { start: match.index ?? 0, end: (match.index ?? 0) + match[0].length };
    if (!overlaps(span, blocked)) {
      return span;
    }
  }
  return null;
};

const wrap = (value: string, picks: { id: string; span: Span }[]): string =>
  [...picks]
    .sort((left, right) => right.span.start - left.span.start)
    .reduce(
      (result, { id, span }) => `${result.slice(0, span.start)}[[${id}|${result.slice(span.start, span.end)}]]${result.slice(span.end)}`,
      value,
    );

const report = new Map<string, string[]>();

const markFile = (filePath: string, topic: string): number => {
  const source = readFileSync(filePath, 'utf8');
  const anchors = [...source.matchAll(ANCHOR_PATTERN)].map((match) => ({ index: match.index ?? 0, id: match[1] ?? '' }));
  const markedByAnchor = new Map<string, Set<string>>();
  let added = 0;

  const result = source.replace(BLOCK_PATTERN, (whole, gap1: string, gap2: string, ruLiteral: string, gap3: string, enLiteral: string, offset: number) => {
    const anchor = anchors.filter((item) => item.index < offset).at(-1)?.id ?? filePath;
    const marked = markedByAnchor.get(anchor) ?? new Set<string>();
    markedByAnchor.set(anchor, marked);
    const quote = ruLiteral[0] ?? "'";
    const ru = ruLiteral.slice(1, -1);
    const en = enLiteral.slice(1, -1);
    const existing = new Set([...ru.matchAll(TERM_ID_PATTERN)].map((match) => match[1] ?? ''));
    existing.forEach((id) => marked.add(id));
    const ruBlocked = protectedSpans(ru);
    const enBlocked = protectedSpans(en);

    const candidates: Candidate[] = Object.entries(compiled)
      .filter(
        ([id, term]) =>
          !marked.has(id) && id in GLOSSARY && (!term.topics || term.topics.includes(topic)) && !term.skip?.includes(anchor),
      )
      .flatMap(([id, term]) => {
        const ruSpan = findFree(term.ru, ru, ruBlocked);
        const enSpan = findFree(term.en, en, enBlocked);
        return ruSpan && enSpan ? [{ id, ru: ruSpan, en: enSpan }] : [];
      })
      .sort((left, right) => left.ru.start - right.ru.start || right.ru.end - left.ru.end);

    const picks: Candidate[] = [];
    for (const candidate of candidates) {
      if (existing.size + picks.length >= MAX_TERMS_PER_BLOCK) {
        break;
      }
      const ruTaken = picks.map((pick) => pick.ru);
      const enTaken = picks.map((pick) => pick.en);
      if (overlaps(candidate.ru, ruTaken) || overlaps(candidate.en, enTaken)) {
        continue;
      }
      picks.push(candidate);
    }
    if (picks.length === 0) {
      return whole;
    }
    picks.forEach((pick) => {
      marked.add(pick.id);
      const contexts = report.get(pick.id) ?? [];
      contexts.push(`${anchor}: «${ru.slice(Math.max(0, pick.ru.start - 30), pick.ru.end + 30)}» / «${en.slice(Math.max(0, pick.en.start - 30), pick.en.end + 30)}»`);
      report.set(pick.id, contexts);
    });
    added += picks.length;
    const newRu = wrap(ru, picks.map((pick) => ({ id: pick.id, span: pick.ru })));
    const newEn = wrap(en, picks.map((pick) => ({ id: pick.id, span: pick.en })));
    return `type: 'text',${gap1}text: {${gap2}ru: ${quote}${newRu}${quote},${gap3}en: ${enLiteral[0]}${newEn}${enLiteral[0]}`;
  });

  if (result !== source && !process.argv.includes('--dry')) {
    writeFileSync(filePath, result);
  }
  return added;
};

let total = 0;
for (const dir of CONTENT_DIRS) {
  for (const fileName of readdirSync(path.join(ROOT, dir))) {
    if (!fileName.endsWith('.ts') || SKIPPED_FILES.has(fileName)) {
      continue;
    }
    total += markFile(path.join(ROOT, dir, fileName), topicOf(fileName));
  }
}

const verbose = process.argv.includes('--verbose');
for (const [id, contexts] of [...report.entries()].sort((left, right) => right[1].length - left[1].length)) {
  console.log(`${id}: ${contexts.length}`);
  if (verbose) {
    contexts.forEach((context) => console.log(`  ${context}`));
  }
}
console.log(`Размечено терминов: ${total}`);
