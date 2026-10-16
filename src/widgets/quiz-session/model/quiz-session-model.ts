import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import * as Haptics from 'expo-haptics';
import { ToastAndroid } from 'react-native';
import { interval } from 'patronum';
import { progressModel } from '@app/entities/progress';
import { describeResponse, getQuestionById, getQuestions, isResponseComplete, isResponseCorrect, OPTION_IDS } from '@app/entities/question';
import { settingsModel } from '@app/entities/settings';
import { trackEventFx } from '@app/shared/analytics';
import { DICTIONARIES, i18nModel, translate } from '@app/shared/i18n';
import { createRandom, shuffle } from '@app/shared/lib';
import { buildQueue } from '../lib/build-queue';
import { estimateLevel } from '../lib/estimate-level';
import type { AnswerResult, LearningProgress, QuestionStats, TestFinished } from '@app/entities/progress';
import type { OptionId, Question, QuestionResponse, QuizMode } from '@app/entities/question';
import type { AnalyticsEvent } from '@app/shared/analytics';
import type { SessionParams } from '../lib/build-queue';
import type { InterviewLevel } from '../lib/estimate-level';

export const INTERVIEW_SECONDS_PER_QUESTION = 60;

export type SessionPhase = 'idle' | 'answering' | 'revealed' | 'finished' | 'empty';

export type SessionAnswer = {
  questionId: string;
  response: QuestionResponse | null;
  result: AnswerResult;
};

export type SessionSummary = {
  total: number;
  answered: number;
  correct: number;
  wrong: number;
  dontKnow: number;
  level: InterviewLevel | null;
};

type PreparedSession = {
  params: SessionParams;
  seed: number;
  queue: string[];
};

type PrepareInput = {
  params: SessionParams;
  stats: QuestionStats;
  learning: LearningProgress;
  sessionLength: number;
};

type Transition = {
  phase: SessionPhase;
  index: number;
};

type SessionSnapshot = {
  params: SessionParams | null;
  queue: string[];
  answers: SessionAnswer[];
};

const getResult = (question: Question, response: QuestionResponse | null): AnswerResult => {
  if (response === null) {
    return 'dontKnow';
  }
  return isResponseCorrect(question, response) ? 'correct' : 'wrong';
};

const getItemOrder = (question: Question | null, seed: number): number[] => {
  if (question?.kind !== 'order') {
    return [];
  }
  const order = shuffle(
    question.items.map((_, index) => index),
    createRandom(seed),
  );
  return order.every((itemIndex, position) => itemIndex === position) ? order.reverse() : order;
};

const isLevelMode = (mode: QuizMode | undefined): boolean => mode === 'interview' || mode === 'placement';

const isExamMode = (mode: QuizMode | undefined): boolean => isLevelMode(mode) || mode === 'course-test';

export const isTestMode = (mode: QuizMode | undefined): boolean => mode === 'lesson-test' || mode === 'course-test';

const buildSummary = (answers: SessionAnswer[], queue: string[], withLevel: boolean): SessionSummary => {
  const questions = queue.map((id) => getQuestionById(id)).filter((question): question is Question => Boolean(question));
  return {
    total: queue.length,
    answered: answers.length,
    correct: answers.filter((answer) => answer.result === 'correct').length,
    wrong: answers.filter((answer) => answer.result === 'wrong').length,
    dontKnow: answers.filter((answer) => answer.result === 'dontKnow').length,
    level: withLevel
      ? estimateLevel(
          answers.map((answer) => ({
            difficulty: getQuestionById(answer.questionId)?.difficulty ?? 1,
            isCorrect: answer.result === 'correct',
          })),
          questions.map((question) => question.difficulty),
        )
      : null,
  };
};

const getTagParam = (params: SessionParams): { tag?: string } => (params.tag ? { tag: params.tag } : {});

const toFinishedEvent = ({ params, queue, answers }: SessionSnapshot): AnalyticsEvent => {
  const mode = params?.mode ?? 'practice';
  const summary = buildSummary(answers, queue, isLevelMode(mode));
  return {
    name: 'quiz_finished',
    params: {
      mode,
      topic: params?.topic ?? 'all',
      ...(params ? getTagParam(params) : {}),
      length: summary.total,
      answered: summary.answered,
      correct: summary.correct,
      wrong: summary.wrong,
      dont_know: summary.dontKnow,
      score_percent: summary.total > 0 ? Math.round((summary.correct / summary.total) * 100) : 0,
      ...(summary.level ? { level: summary.level } : {}),
    },
  };
};

export const createQuizSessionModel = () => {
  const sessionStarted = createEvent<SessionParams>();
  const sessionClosed = createEvent();
  const optionSelected = createEvent<OptionId>();
  const draftChanged = createEvent<QuestionResponse>();
  const answerConfirmed = createEvent();
  const dontKnowPressed = createEvent();
  const nextPressed = createEvent();
  const answerSubmitted = createEvent<QuestionResponse | null>();
  const answerAdded = createEvent<SessionAnswer>();
  const transitionPlanned = createEvent<Transition>();
  const timerStopped = createEvent();
  const interviewStarted = createEvent();

  const $params = createStore<SessionParams | null>(null);
  const $queue = createStore<string[]>([]);
  const $seed = createStore(0);
  const $index = createStore(0);
  const $draft = createStore<QuestionResponse | null>(null);
  const $phase = createStore<SessionPhase>('idle');
  const $answers = createStore<SessionAnswer[]>([]);
  const $remainingSeconds = createStore(0);

  const prepareSessionFx = createEffect(
    ({ params, stats, learning, sessionLength }: PrepareInput): PreparedSession => {
      const seed = Date.now();
      return { params, seed, queue: buildQueue(getQuestions(), stats, learning, params, sessionLength, createRandom(seed), seed) };
    },
  );

  const resultHapticFx = createEffect(async (result: AnswerResult) =>
    Haptics.notificationAsync(
      result === 'correct' ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Error,
    ),
  );
  const selectionHapticFx = createEffect(async () => Haptics.selectionAsync());
  const toastFx = createEffect((message: string) => ToastAndroid.show(message, ToastAndroid.SHORT));

  const $isInterview = $params.map((params) => params?.mode === 'interview');
  const $isExam = $params.map((params) => isExamMode(params?.mode));
  const $isLast = combine($queue, $index, (queue, index) => index >= queue.length - 1);
  const $hapticsEnabled = settingsModel.$settings.map((settings) => settings.haptics);
  const $currentQuestion = combine($queue, $index, (queue, index): Question | null => getQuestionById(queue[index] ?? '') ?? null);
  const $optionOrder = combine($seed, $index, (seed, index): OptionId[] => shuffle(OPTION_IDS, createRandom(seed + index * 7919)));
  const $itemOrder = combine($seed, $index, $currentQuestion, (seed, index, question) => getItemOrder(question, seed + index * 7919));
  const $currentAnswer = combine($answers, $currentQuestion, (answers, question) =>
    question ? (answers.find((answer) => answer.questionId === question.id) ?? null) : null,
  );
  const $withLevel = $params.map((params) => isLevelMode(params?.mode));
  const $summary = combine($answers, $queue, $withLevel, buildSummary);

  const timer = interval({ timeout: 1000, start: interviewStarted, stop: timerStopped });

  sample({
    clock: sessionStarted,
    source: { stats: progressModel.$questionStats, learning: progressModel.$learning, settings: settingsModel.$settings },
    fn: ({ stats, learning, settings }, params): PrepareInput => ({ params, stats, learning, sessionLength: settings.sessionLength }),
    target: prepareSessionFx,
  });
  sample({ clock: prepareSessionFx.doneData, fn: (session) => session.params, target: $params });
  sample({ clock: prepareSessionFx.doneData, fn: (session) => session.seed, target: $seed });
  sample({ clock: prepareSessionFx.doneData, fn: (session) => session.queue, target: $queue });
  sample({ clock: prepareSessionFx.doneData, fn: () => 0, target: $index });
  sample({ clock: prepareSessionFx.doneData, fn: () => null, target: $draft });
  sample({ clock: prepareSessionFx.doneData, fn: (): SessionAnswer[] => [], target: $answers });
  sample({
    clock: prepareSessionFx.doneData,
    fn: (session): SessionPhase => (session.queue.length > 0 ? 'answering' : 'empty'),
    target: $phase,
  });
  sample({
    clock: prepareSessionFx.doneData,
    fn: (session) => (session.params.mode === 'interview' ? session.queue.length * INTERVIEW_SECONDS_PER_QUESTION : 0),
    target: $remainingSeconds,
  });
  sample({
    clock: prepareSessionFx.doneData,
    filter: (session) => session.params.mode === 'interview' && session.queue.length > 0,
    target: interviewStarted,
  });
  sample({
    clock: prepareSessionFx.doneData,
    filter: (session) => session.queue.length > 0,
    fn: ({ params, queue }): AnalyticsEvent => ({
      name: 'quiz_started',
      params: { mode: params.mode, topic: params.topic, ...getTagParam(params), length: queue.length },
    }),
    target: trackEventFx,
  });

  sample({ clock: optionSelected, fn: (option): QuestionResponse => ({ kind: 'choice', option }), target: draftChanged });
  sample({ clock: draftChanged, filter: $phase.map((phase) => phase === 'answering'), target: $draft });
  sample({
    clock: draftChanged,
    source: $hapticsEnabled,
    filter: (isEnabled, draft) => isEnabled && draft.kind !== 'output',
    target: selectionHapticFx,
  });

  sample({
    clock: answerConfirmed,
    source: { question: $currentQuestion, draft: $draft },
    filter: ({ question, draft }) => question !== null && isResponseComplete(question, draft),
    fn: ({ draft }) => draft,
    target: answerSubmitted,
  });
  sample({ clock: dontKnowPressed, fn: () => null, target: answerSubmitted });

  sample({
    clock: answerSubmitted,
    source: { question: $currentQuestion, phase: $phase },
    filter: ({ question, phase }) => question !== null && phase === 'answering',
    fn: ({ question }, response): SessionAnswer => {
      const current = question as Question;
      return { questionId: current.id, response, result: getResult(current, response) };
    },
    target: answerAdded,
  });
  sample({ clock: answerAdded, source: $answers, fn: (answers, answer) => [...answers, answer], target: $answers });
  sample({
    clock: answerAdded,
    source: $params,
    fn: (params, answer) => ({
      questionId: answer.questionId,
      result: answer.result,
      mode: params?.mode ?? 'practice',
      at: Date.now(),
    }),
    target: progressModel.answerRecorded,
  });
  sample({
    clock: answerAdded,
    source: $params,
    fn: (params, answer): AnalyticsEvent => {
      const question = getQuestionById(answer.questionId);
      return {
        name: 'question_answered',
        params: {
          question_id: answer.questionId,
          topic: question?.topic ?? 'unknown',
          difficulty: question?.difficulty ?? 0,
          mode: params?.mode ?? 'practice',
          result: answer.result,
          chosen: describeResponse(answer.response),
        },
      };
    },
    target: trackEventFx,
  });
  sample({
    clock: answerAdded,
    source: { isEnabled: $hapticsEnabled, isExam: $isExam },
    filter: ({ isEnabled, isExam }) => isEnabled && !isExam,
    fn: (_, answer) => answer.result,
    target: resultHapticFx,
  });
  sample({
    clock: answerAdded,
    source: { isEnabled: $hapticsEnabled, isExam: $isExam },
    filter: ({ isEnabled, isExam }) => isEnabled && isExam,
    target: selectionHapticFx,
  });
  sample({
    clock: answerAdded,
    source: { isExam: $isExam, isLast: $isLast, index: $index },
    fn: ({ isExam, isLast, index }): Transition => {
      if (!isExam) {
        return { phase: 'revealed', index };
      }
      if (isLast) {
        return { phase: 'finished', index };
      }
      return { phase: 'answering', index: index + 1 };
    },
    target: transitionPlanned,
  });

  sample({
    clock: nextPressed,
    source: { phase: $phase, isLast: $isLast, index: $index },
    filter: ({ phase }) => phase === 'revealed',
    fn: ({ isLast, index }): Transition => (isLast ? { phase: 'finished', index } : { phase: 'answering', index: index + 1 }),
    target: transitionPlanned,
  });

  sample({ clock: transitionPlanned, fn: (transition) => transition.index, target: $index });
  sample({ clock: transitionPlanned, fn: (transition) => transition.phase, target: $phase });
  sample({ clock: transitionPlanned, filter: (transition) => transition.phase === 'answering', fn: () => null, target: $draft });

  sample({ clock: timer.tick, source: $remainingSeconds, fn: (seconds) => Math.max(seconds - 1, 0), target: $remainingSeconds });
  sample({
    clock: $remainingSeconds.updates,
    source: $phase,
    filter: (phase, seconds) => seconds === 0 && phase === 'answering',
    fn: (): SessionPhase => 'finished',
    target: $phase,
  });
  sample({ clock: $phase.updates, filter: (phase) => phase === 'finished', target: timerStopped });
  sample({
    clock: $phase.updates,
    source: { params: $params, summary: $summary },
    filter: ({ params }, phase) => phase === 'finished' && isTestMode(params?.mode),
    fn: ({ params, summary }): TestFinished => ({
      scope: params?.mode === 'course-test' ? 'course' : 'lesson',
      id: params?.mode === 'course-test' ? String(params.topic) : String(params?.tag),
      correct: summary.correct,
      total: summary.total,
      at: Date.now(),
    }),
    target: progressModel.testFinished,
  });
  sample({
    clock: $phase.updates,
    source: { params: $params, queue: $queue, answers: $answers },
    filter: (_, phase) => phase === 'finished',
    fn: toFinishedEvent,
    target: trackEventFx,
  });

  sample({
    clock: progressModel.mistakeResolved,
    source: { isExam: $isExam, locale: i18nModel.$locale },
    filter: ({ isExam }) => !isExam,
    fn: ({ locale }) => translate(DICTIONARIES[locale], 'quiz.mistakeResolved'),
    target: toastFx,
  });

  sample({
    clock: sessionClosed,
    source: { phase: $phase, params: $params, queue: $queue, answers: $answers },
    filter: ({ phase }) => phase === 'answering' || phase === 'revealed',
    fn: ({ params, queue, answers }): AnalyticsEvent => ({
      name: 'quiz_abandoned',
      params: {
        mode: params?.mode ?? 'practice',
        topic: params?.topic ?? 'all',
        length: queue.length,
        answered: answers.length,
      },
    }),
    target: trackEventFx,
  });
  sample({ clock: sessionClosed, target: timerStopped });
  sample({ clock: sessionClosed, fn: (): SessionPhase => 'idle', target: $phase });

  return {
    $params,
    $queue,
    $index,
    $phase,
    $draft,
    $answers,
    $currentQuestion,
    $currentAnswer,
    $optionOrder,
    $itemOrder,
    $isInterview,
    $isLast,
    $remainingSeconds,
    $summary,
    sessionStarted,
    sessionClosed,
    optionSelected,
    draftChanged,
    answerConfirmed,
    dontKnowPressed,
    nextPressed,
  };
};

export type QuizSessionModel = ReturnType<typeof createQuizSessionModel>;

export const quizSessionModel = createQuizSessionModel();
