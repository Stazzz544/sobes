import { TOPIC_IDS } from '@app/shared/config';
import { addDays, toDayKey } from '@app/shared/lib';
import type { AnswerRecord, QuestionStats } from '@app/entities/progress';
import type { Difficulty, Question, TagId } from '@app/entities/question';
import type { TopicId, TopicSelection } from '@app/shared/config';

export const ACTIVITY_DAYS = 14;

const WEAK_TAGS_LIMIT = 5;

export type TopicOverview = {
  topic: TopicId;
  answered: number;
  accuracy: number | null;
  seen: number;
  total: number;
};

export type TagOverview = {
  tag: TagId;
  answered: number;
  accuracy: number;
};

export type DifficultyOverview = {
  difficulty: Difficulty;
  answered: number;
  accuracy: number | null;
};

export type DayActivity = {
  dayKey: string;
  correct: number;
  incorrect: number;
};

export type StatsOverview = {
  answered: number;
  accuracy: number | null;
  dontKnowRate: number | null;
  streakDays: number;
  topics: TopicOverview[];
  weakTags: TagOverview[];
  difficulties: DifficultyOverview[];
  activity: DayActivity[];
};

type AggregateInput = {
  log: AnswerRecord[];
  stats: QuestionStats;
  questions: readonly Question[];
  questionsById: Readonly<Record<string, Question>>;
  selection: TopicSelection;
  now: number;
};

type ResolvedRecord = AnswerRecord & { question: Question };

const ratio = (part: number, total: number): number | null => (total > 0 ? part / total : null);

const countStreak = (log: AnswerRecord[], now: number): number => {
  const activeDays = new Set(log.map((record) => toDayKey(record.at)));
  let cursor = activeDays.has(toDayKey(now)) ? now : addDays(now, -1);
  let streak = 0;
  while (activeDays.has(toDayKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
};

const collectWeakTags = (records: ResolvedRecord[]): TagOverview[] => {
  const byTag = new Map<TagId, { answered: number; correct: number }>();
  for (const record of records) {
    for (const tag of record.question.tags) {
      const current = byTag.get(tag) ?? { answered: 0, correct: 0 };
      byTag.set(tag, {
        answered: current.answered + 1,
        correct: current.correct + (record.result === 'correct' ? 1 : 0),
      });
    }
  }
  const tags = [...byTag.entries()].map(([tag, value]) => ({
    tag,
    answered: value.answered,
    accuracy: value.correct / value.answered,
  }));
  const reliable = tags.filter((tag) => tag.answered >= 2);
  return (reliable.length > 0 ? reliable : tags)
    .filter((tag) => tag.accuracy < 1)
    .sort((first, second) => first.accuracy - second.accuracy || second.answered - first.answered)
    .slice(0, WEAK_TAGS_LIMIT);
};

export const aggregateStats = ({ log, stats, questions, questionsById, selection, now }: AggregateInput): StatsOverview => {
  const resolved = log
    .map((record) => ({ ...record, question: questionsById[record.questionId] }))
    .filter((record): record is ResolvedRecord => Boolean(record.question));
  const scoped = resolved.filter((record) => selection === 'all' || record.question.topic === selection);
  const correct = scoped.filter((record) => record.result === 'correct').length;
  const dontKnow = scoped.filter((record) => record.result === 'dontKnow').length;

  const topics = TOPIC_IDS.map((topic): TopicOverview => {
    const topicRecords = resolved.filter((record) => record.question.topic === topic);
    const topicQuestions = questions.filter((question) => question.topic === topic);
    return {
      topic,
      answered: topicRecords.length,
      accuracy: ratio(topicRecords.filter((record) => record.result === 'correct').length, topicRecords.length),
      seen: topicQuestions.filter((question) => stats[question.id]).length,
      total: topicQuestions.length,
    };
  });

  const difficulties = ([1, 2, 3] as const).map((difficulty): DifficultyOverview => {
    const records = scoped.filter((record) => record.question.difficulty === difficulty);
    return {
      difficulty,
      answered: records.length,
      accuracy: ratio(records.filter((record) => record.result === 'correct').length, records.length),
    };
  });

  const activity = Array.from({ length: ACTIVITY_DAYS }, (_, index): DayActivity => {
    const dayKey = toDayKey(addDays(now, index - (ACTIVITY_DAYS - 1)));
    const dayRecords = scoped.filter((record) => toDayKey(record.at) === dayKey);
    const dayCorrect = dayRecords.filter((record) => record.result === 'correct').length;
    return { dayKey, correct: dayCorrect, incorrect: dayRecords.length - dayCorrect };
  });

  return {
    answered: scoped.length,
    accuracy: ratio(correct, scoped.length),
    dontKnowRate: ratio(dontKnow, scoped.length),
    streakDays: countStreak(resolved, now),
    topics,
    weakTags: collectWeakTags(scoped),
    difficulties,
    activity,
  };
};
