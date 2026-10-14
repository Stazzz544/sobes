import { combine, createEffect, createEvent, createStore, sample } from 'effector';
import * as Haptics from 'expo-haptics';
import { ToastAndroid } from 'react-native';
import { interval } from 'patronum';
import { progressModel } from '@app/entities/progress';
import { OPTION_IDS, QUESTIONS, QUESTIONS_BY_ID } from '@app/entities/question';
import { settingsModel } from '@app/entities/settings';
import { trackEventFx } from '@app/shared/analytics';
import { DICTIONARIES, i18nModel, translate } from '@app/shared/i18n';
import { createRandom, shuffle } from '@app/shared/lib';
import { buildQueue } from '../lib/build-queue';
import { estimateLevel } from '../lib/estimate-level';
import type { AnswerResult, QuestionStats } from '@app/entities/progress';
import type { OptionId, Question } from '@app/entities/question';
import type { AnalyticsEvent } from '@app/shared/analytics';
import type { SessionParams } from '../lib/build-queue';
import type { InterviewLevel } from '../lib/estimate-level';

export const INTERVIEW_SECONDS_PER_QUESTION = 60;

export type SessionPhase = 'idle' | 'answering' | 'revealed' | 'finished' | 'empty';

export type SessionAnswer = {
  questionId: string;
  chosen: OptionId | null;
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

type Transition = {
  phase: SessionPhase;
  index: number;
};

type SessionSnapshot = {
  params: SessionParams | null;
  queue: string[];
  answers: SessionAnswer[];
};

const getResult = (question: Question, chosen: OptionId | null): AnswerResult => {
  if (chosen === null) {
    return 'dontKnow';
  }
  return chosen === question.answer ? 'correct' : 'wrong';
};

const buildSummary = (answers: SessionAnswer[], queue: string[], isInterview: boolean): SessionSummary => {
  const questions = queue.map((id) => QUESTIONS_BY_ID[id]).filter((question): question is Question => Boolean(question));
  return {
    total: queue.length,
    answered: answers.length,
    correct: answers.filter((answer) => answer.result === 'correct').length,
    wrong: answers.filter((answer) => answer.result === 'wrong').length,
    dontKnow: answers.filter((answer) => answer.result === 'dontKnow').length,
    level: isInterview
      ? estimateLevel(
          answers.map((answer) => ({
            difficulty: QUESTIONS_BY_ID[answer.questionId]?.difficulty ?? 1,
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
  const summary = buildSummary(answers, queue, mode === 'interview');
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
  const answerConfirmed = createEvent();
  const dontKnowPressed = createEvent();
  const nextPressed = createEvent();
  const answerSubmitted = createEvent<OptionId | null>();
  const answerAdded = createEvent<SessionAnswer>();
  const transitionPlanned = createEvent<Transition>();
  const timerStopped = createEvent();
  const interviewStarted = createEvent();

  const $params = createStore<SessionParams | null>(null);
  const $queue = createStore<string[]>([]);
  const $seed = createStore(0);
  const $index = createStore(0);
  const $selectedOption = createStore<OptionId | null>(null);
  const $phase = createStore<SessionPhase>('idle');
  const $answers = createStore<SessionAnswer[]>([]);
  const $remainingSeconds = createStore(0);

  const prepareSessionFx = createEffect(
    ({ params, stats, sessionLength }: { params: SessionParams; stats: QuestionStats; sessionLength: number }): PreparedSession => {
      const seed = Date.now();
      return { params, seed, queue: buildQueue(QUESTIONS, stats, params, sessionLength, createRandom(seed), seed) };
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
  const $isLast = combine($queue, $index, (queue, index) => index >= queue.length - 1);
  const $hapticsEnabled = settingsModel.$settings.map((settings) => settings.haptics);
  const $currentQuestion = combine($queue, $index, (queue, index): Question | null => QUESTIONS_BY_ID[queue[index] ?? ''] ?? null);
  const $optionOrder = combine($seed, $index, (seed, index): OptionId[] => shuffle(OPTION_IDS, createRandom(seed + index * 7919)));
  const $currentAnswer = combine($answers, $currentQuestion, (answers, question) =>
    question ? (answers.find((answer) => answer.questionId === question.id) ?? null) : null,
  );
  const $summary = combine($answers, $queue, $isInterview, buildSummary);

  const timer = interval({ timeout: 1000, start: interviewStarted, stop: timerStopped });

  sample({
    clock: sessionStarted,
    source: { stats: progressModel.$questionStats, settings: settingsModel.$settings },
    fn: ({ stats, settings }, params) => ({ params, stats, sessionLength: settings.sessionLength }),
    target: prepareSessionFx,
  });
  sample({ clock: prepareSessionFx.doneData, fn: (session) => session.params, target: $params });
  sample({ clock: prepareSessionFx.doneData, fn: (session) => session.seed, target: $seed });
  sample({ clock: prepareSessionFx.doneData, fn: (session) => session.queue, target: $queue });
  sample({ clock: prepareSessionFx.doneData, fn: () => 0, target: $index });
  sample({ clock: prepareSessionFx.doneData, fn: () => null, target: $selectedOption });
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

  sample({ clock: optionSelected, filter: $phase.map((phase) => phase === 'answering'), target: $selectedOption });
  sample({ clock: optionSelected, filter: $hapticsEnabled, target: selectionHapticFx });

  sample({
    clock: answerConfirmed,
    source: $selectedOption,
    filter: (selected) => selected !== null,
    target: answerSubmitted,
  });
  sample({ clock: dontKnowPressed, fn: () => null, target: answerSubmitted });

  sample({
    clock: answerSubmitted,
    source: { question: $currentQuestion, phase: $phase },
    filter: ({ question, phase }) => question !== null && phase === 'answering',
    fn: ({ question }, chosen): SessionAnswer => {
      const current = question as Question;
      return { questionId: current.id, chosen, result: getResult(current, chosen) };
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
      const question = QUESTIONS_BY_ID[answer.questionId];
      return {
        name: 'question_answered',
        params: {
          question_id: answer.questionId,
          topic: question?.topic ?? 'unknown',
          difficulty: question?.difficulty ?? 0,
          mode: params?.mode ?? 'practice',
          result: answer.result,
          chosen: answer.chosen ?? 'none',
        },
      };
    },
    target: trackEventFx,
  });
  sample({
    clock: answerAdded,
    source: { isEnabled: $hapticsEnabled, isInterview: $isInterview },
    filter: ({ isEnabled, isInterview }) => isEnabled && !isInterview,
    fn: (_, answer) => answer.result,
    target: resultHapticFx,
  });
  sample({
    clock: answerAdded,
    source: { isEnabled: $hapticsEnabled, isInterview: $isInterview },
    filter: ({ isEnabled, isInterview }) => isEnabled && isInterview,
    target: selectionHapticFx,
  });
  sample({
    clock: answerAdded,
    source: { isInterview: $isInterview, isLast: $isLast, index: $index },
    fn: ({ isInterview, isLast, index }): Transition => {
      if (!isInterview) {
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
  sample({ clock: transitionPlanned, filter: (transition) => transition.phase === 'answering', fn: () => null, target: $selectedOption });

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
    source: { params: $params, queue: $queue, answers: $answers },
    filter: (_, phase) => phase === 'finished',
    fn: toFinishedEvent,
    target: trackEventFx,
  });

  sample({
    clock: progressModel.mistakeResolved,
    source: { isInterview: $isInterview, locale: i18nModel.$locale },
    filter: ({ isInterview }) => !isInterview,
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
    $selectedOption,
    $answers,
    $currentQuestion,
    $currentAnswer,
    $optionOrder,
    $isInterview,
    $isLast,
    $remainingSeconds,
    $summary,
    sessionStarted,
    sessionClosed,
    optionSelected,
    answerConfirmed,
    dontKnowPressed,
    nextPressed,
  };
};

export type QuizSessionModel = ReturnType<typeof createQuizSessionModel>;

export const quizSessionModel = createQuizSessionModel();
