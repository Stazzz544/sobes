type AnalyticsEventParams = {
  onboarding_completed: {
    topic: string;
    locale: string;
  };
  topic_selected: {
    topic: string;
    previous: string;
  };
  quiz_started: {
    mode: string;
    topic: string;
    tag?: string;
    length: number;
  };
  question_answered: {
    question_id: string;
    topic: string;
    difficulty: number;
    mode: string;
    result: string;
    chosen: string;
  };
  quiz_finished: {
    mode: string;
    topic: string;
    tag?: string;
    length: number;
    answered: number;
    correct: number;
    wrong: number;
    dont_know: number;
    score_percent: number;
    level?: string;
  };
  quiz_abandoned: {
    mode: string;
    topic: string;
    length: number;
    answered: number;
  };
  ask_ai_used: {
    question_id: string;
    target: string;
  };
  question_reported: {
    question_id: string;
  };
  mistake_resolved: {
    question_id: string;
  };
};

export type AnalyticsEventName = keyof AnalyticsEventParams;

export type AnalyticsEvent = {
  [Name in AnalyticsEventName]: { name: Name; params: AnalyticsEventParams[Name] };
}[AnalyticsEventName];
