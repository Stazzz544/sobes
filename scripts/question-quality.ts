import { readFileSync, writeFileSync } from 'node:fs';
import { QUESTIONS } from '../src/entities/question/data';
import { OPTION_IDS } from '../src/entities/question/model/types';
import type { ChoiceQuestion, OptionContent, Question } from '../src/entities/question/model/types';

type ExportRow = Record<string, unknown>;

type AnswerEvent = {
  questionId: string;
  result: string;
  chosen: string;
  device: string;
  timestamp: number;
};

type QuestionStats = {
  question: Question;
  total: number;
  correct: number;
  dontKnow: number;
  choices: Map<string, number>;
};

type Finding = {
  stats: QuestionStats;
  note: string;
};

const MIN_ANSWERS = Number(readFlag('min', '30'));
const HARD_GAP = 0.25;
const EASY_ACCURACY = 0.97;
const DONT_KNOW_SHARE = 0.4;
const MIN_WRONG_FOR_DISTRACTOR = 20;
const FAVORITE_SHARE = 0.6;
const FAVORITE_MIN_WRONG_SHARE = 0.25;
const DEAD_MIN_ANSWERS = 100;
const DEAD_SHARE = 0.02;
const DIFFICULTY_LABELS = { 1: 'junior', 2: 'middle', 3: 'senior' } as const;

function readFlag(name: string, fallback: string): string {
  const index = process.argv.indexOf(`--${name}`);
  return index >= 0 ? (process.argv[index + 1] ?? fallback) : fallback;
}

const parseCsv = (source: string): ExportRow[] => {
  const records: string[][] = [];
  let record: string[] = [];
  let field = '';
  let isQuoted = false;
  for (let index = 0; index < source.length; index += 1) {
    const char = source[index];
    if (isQuoted) {
      if (char === '"' && source[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        isQuoted = false;
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      isQuoted = true;
    } else if (char === ',') {
      record.push(field);
      field = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && source[index + 1] === '\n') {
        index += 1;
      }
      record.push(field);
      records.push(record);
      record = [];
      field = '';
    } else {
      field += char;
    }
  }
  if (field !== '' || record.length > 0) {
    record.push(field);
    records.push(record);
  }
  const [header = [], ...rows] = records.filter((row) => row.some((cell) => cell !== ''));
  return rows.map((row) => Object.fromEntries(header.map((name, column) => [name, row[column] ?? ''])));
};

const readExport = (file: string): ExportRow[] => {
  const source = readFileSync(file, 'utf8').replace(/^﻿/, '');
  if (file.endsWith('.json')) {
    return (JSON.parse(source) as { data?: ExportRow[] }).data ?? [];
  }
  return parseCsv(source);
};

const readTimestamp = (row: ExportRow): number => {
  const timestamp = Number(row.event_timestamp);
  if (Number.isFinite(timestamp) && timestamp > 0) {
    return timestamp;
  }
  const parsed = Date.parse(String(row.event_datetime ?? '').replace(' ', 'T'));
  return Number.isNaN(parsed) ? 0 : parsed / 1000;
};

const toAnswerEvent = (row: ExportRow): AnswerEvent | null => {
  if (row.event_name !== 'question_answered') {
    return null;
  }
  try {
    const params = JSON.parse(String(row.event_json ?? '')) as Record<string, unknown>;
    if (typeof params.question_id !== 'string' || typeof params.result !== 'string') {
      return null;
    }
    return {
      questionId: params.question_id,
      result: params.result,
      chosen: typeof params.chosen === 'string' ? params.chosen : 'none',
      device: String(row.appmetrica_device_id ?? row.profile_id ?? ''),
      timestamp: readTimestamp(row),
    };
  } catch {
    return null;
  }
};

const cell = (value: string, limit = 70): string => {
  const flat = value.replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim();
  return flat.length > limit ? `${flat.slice(0, limit - 1)}…` : flat;
};

const describeOption = (content: OptionContent): string => ('code' in content ? content.code : content.text.ru);

const describeChoice = (question: Question, chosen: string): string => {
  if (question.kind === 'bug-line' && chosen.startsWith('line:')) {
    return `строка ${chosen.slice('line:'.length)}`;
  }
  const optionIndex = OPTION_IDS.indexOf(chosen as ChoiceQuestion['answer']);
  if (optionIndex >= 0 && (question.kind === undefined || question.kind === 'choice')) {
    return `${chosen}) ${describeOption(question.options[optionIndex])}`;
  }
  return chosen;
};

const percent = (part: number, whole: number): string => `${whole === 0 ? 0 : Math.round((part / whole) * 100)}%`;

const questionCell = (question: Question): string => `\`${question.id}\` ${cell(question.prompt.ru)}`;

const inputFile = process.argv[2];
if (inputFile === undefined || inputFile.startsWith('--')) {
  console.error('Использование: npm run report:questions -- <events.json|events.csv> [--min 30] [--out report.md]');
  process.exit(1);
}

const questionsById = new Map(QUESTIONS.map((question) => [question.id, question]));
const rows = readExport(inputFile);
const events = rows
  .map(toAnswerEvent)
  .filter((event): event is AnswerEvent => event !== null)
  .sort((first, second) => first.timestamp - second.timestamp);

const seenPairs = new Set<string>();
const statsById = new Map<string, QuestionStats>();
const unknownIds = new Set<string>();
const devices = new Set<string>();
let repeats = 0;

for (const event of events) {
  if (event.device !== '') {
    devices.add(event.device);
    const pair = `${event.device}|${event.questionId}`;
    if (seenPairs.has(pair)) {
      repeats += 1;
      continue;
    }
    seenPairs.add(pair);
  }
  const question = questionsById.get(event.questionId);
  if (question === undefined) {
    unknownIds.add(event.questionId);
    continue;
  }
  const stats = statsById.get(question.id) ?? { question, total: 0, correct: 0, dontKnow: 0, choices: new Map() };
  stats.total += 1;
  if (event.result === 'correct') {
    stats.correct += 1;
  } else if (event.result === 'dontKnow') {
    stats.dontKnow += 1;
  } else {
    stats.choices.set(event.chosen, (stats.choices.get(event.chosen) ?? 0) + 1);
  }
  statsById.set(question.id, stats);
}

const eligible = [...statsById.values()].filter((stats) => stats.total >= MIN_ANSWERS);
const baselines = new Map<number, number>();
for (const difficulty of [1, 2, 3]) {
  const group = eligible.filter((stats) => stats.question.difficulty === difficulty);
  const total = group.reduce((sum, stats) => sum + stats.total, 0);
  const correct = group.reduce((sum, stats) => sum + stats.correct, 0);
  if (total > 0) {
    baselines.set(difficulty, correct / total);
  }
}

const accuracyOf = (stats: QuestionStats): number => stats.correct / stats.total;
const wrongOf = (stats: QuestionStats): number => stats.total - stats.correct - stats.dontKnow;

const hard: Finding[] = [];
const easy: Finding[] = [];
const unclear: Finding[] = [];
const favorites: Finding[] = [];
const dead: Finding[] = [];

for (const stats of eligible) {
  const { question } = stats;
  const accuracy = accuracyOf(stats);
  const baseline = baselines.get(question.difficulty) ?? accuracy;
  const level = DIFFICULTY_LABELS[question.difficulty];
  if (accuracy < baseline - HARD_GAP) {
    hard.push({ stats, note: `верно ${percent(stats.correct, stats.total)} при норме ${level} ${Math.round(baseline * 100)}%` });
  }
  if (question.difficulty >= 2 && accuracy >= EASY_ACCURACY) {
    easy.push({ stats, note: `верно ${percent(stats.correct, stats.total)}, уровень ${level}` });
  }
  if (stats.dontKnow / stats.total >= DONT_KNOW_SHARE) {
    unclear.push({ stats, note: `«Не знаю» — ${percent(stats.dontKnow, stats.total)}` });
  }
  const wrong = wrongOf(stats);
  const [topChoice, topCount] = [...stats.choices.entries()].sort((first, second) => second[1] - first[1])[0] ?? ['', 0];
  const isChoiceLike = question.kind === undefined || question.kind === 'choice' || question.kind === 'bug-line';
  if (
    isChoiceLike &&
    wrong >= MIN_WRONG_FOR_DISTRACTOR &&
    topCount / wrong >= FAVORITE_SHARE &&
    wrong / stats.total >= FAVORITE_MIN_WRONG_SHARE
  ) {
    const rivalry = topCount > stats.correct ? ' — выбирают чаще правильного' : '';
    favorites.push({
      stats,
      note: `${cell(describeChoice(question, topChoice), 60)}: ${percent(topCount, wrong)} ошибок${rivalry}`,
    });
  }
  if ((question.kind === undefined || question.kind === 'choice') && stats.total >= DEAD_MIN_ANSWERS) {
    const unused = OPTION_IDS.filter(
      (option) => option !== question.answer && (stats.choices.get(option) ?? 0) / stats.total < DEAD_SHARE,
    );
    if (unused.length > 0) {
      dead.push({ stats, note: unused.map((option) => cell(describeChoice(question, option), 40)).join('; ') });
    }
  }
}

const section = (title: string, hint: string, findings: Finding[]): string[] => {
  const lines = ['', `## ${title} — ${findings.length}`, '', hint];
  if (findings.length === 0) {
    return [...lines, '', 'Нет.'];
  }
  const sorted = [...findings].sort((first, second) => accuracyOf(first.stats) - accuracyOf(second.stats));
  return [
    ...lines,
    '',
    '| Вопрос | Тема | Ответов | Что не так |',
    '| --- | --- | --- | --- |',
    ...sorted.map(({ stats, note }) => `| ${questionCell(stats.question)} | ${stats.question.topic} | ${stats.total} | ${note} |`),
  ];
};

const timestamps = events.map((event) => event.timestamp).filter((timestamp) => timestamp > 0);
const formatDate = (seconds: number): string => new Date(seconds * 1000).toISOString().slice(0, 10);
const period = timestamps.length > 0 ? `${formatDate(timestamps[0])} — ${formatDate(timestamps[timestamps.length - 1])}` : 'неизвестен';
const baselineLine = [1, 2, 3]
  .filter((difficulty) => baselines.has(difficulty))
  .map((difficulty) => `${DIFFICULTY_LABELS[difficulty as 1 | 2 | 3]} ${Math.round((baselines.get(difficulty) ?? 0) * 100)}%`)
  .join(', ');

const report = [
  '# Качество вопросов по аналитике',
  '',
  `Выгрузка \`${inputFile.split(/[\\/]/).pop()}\`, период ${period}. Событий \`question_answered\`: ${events.length}, устройств: ${devices.size}.`,
  `Учтён только первый ответ устройства на вопрос: повторы на повторении и пересдачах занижали бы точность у трудных вопросов (отброшено ${repeats}).`,
  `Вопросов с ответами: ${statsById.size}, из них с выборкой от ${MIN_ANSWERS} ответов: ${eligible.length}. Средняя точность по уровням: ${baselineLine || 'нет данных'}.`,
  unknownIds.size > 0 ? `Неизвестные id (вопрос удалён или переименован): ${[...unknownIds].map((id) => `\`${id}\``).join(', ')}.` : '',
  ...section(
    'Аномально трудные',
    `Точность ниже средней по уровню больше чем на ${Math.round(HARD_GAP * 100)} п. п. Проверить ключ, формулировку и соответствие уровню.`,
    hard,
  ),
  ...section(
    'Любимый дистрактор',
    `Один неверный вариант набирает от ${Math.round(FAVORITE_SHARE * 100)}% ошибок. Возможно, он тоже верен или вопрос двусмысленный — переписать вариант или разбор.`,
    favorites,
  ),
  ...section(
    'Часто «Не знаю»',
    `«Не знаю» — от ${Math.round(DONT_KNOW_SHARE * 100)}% ответов. Вопрос непонятен или выходит за рамки темы.`,
    unclear,
  ),
  ...section(
    'Слишком лёгкие для уровня',
    `Middle и senior с точностью от ${Math.round(EASY_ACCURACY * 100)}%: понизить уровень или усложнить варианты.`,
    easy,
  ),
  ...section(
    'Мёртвые варианты',
    `Вопросы от ${DEAD_MIN_ANSWERS} ответов, где неверный вариант набирает меньше ${Math.round(DEAD_SHARE * 100)}% ответов: он очевидно лишний, заменить правдоподобным.`,
    dead,
  ),
  '',
]
  .filter((line, index, lines) => line !== '' || lines[index - 1] !== '')
  .join('\n');

const outFile = readFlag('out', '');
if (outFile !== '') {
  writeFileSync(outFile, report);
  console.log(`Отчёт → ${outFile}`);
} else {
  console.log(report);
}
console.log(
  `Трудных: ${hard.length}, любимых дистракторов: ${favorites.length}, «Не знаю»: ${unclear.length}, лёгких: ${easy.length}, мёртвых вариантов: ${dead.length}`,
);
