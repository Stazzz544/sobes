import { JSX, useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import { Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useUnit } from 'effector-react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { progressModel } from '@app/entities/progress';
import { contentModel, getLessonByTag, getLessonPosition, isCourseTopic, isQuizMode, isStepLesson, isTagId } from '@app/entities/question';
import { settingsModel } from '@app/entities/settings';
import { getSelectionAccent, topicModel } from '@app/entities/topic';
import { contentUpdateModel } from '@app/features/content-update';
import { reminderModel, useReviewReminderTap } from '@app/features/daily-reminder';
import { reportErrorFx } from '@app/shared/analytics';
import { TOPIC_IDS } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { BASE_COLORS, ThemeProvider, useTheme } from '@app/shared/theme';
import { AchievementToast } from '@app/widgets/achievements';
import { ErrorFallback } from '@app/widgets/error-fallback';
import type { ErrorBoundaryProps } from 'expo-router';
import type { I18n } from '@app/shared/i18n';

type RouteWithParams = { route: { params?: object } };

const readParam = (params: object | undefined, key: string): unknown =>
  params && key in params ? (params as Record<string, unknown>)[key] : undefined;

const getQuizTitle = ({ route }: RouteWithParams, t: I18n['t']): string => {
  const mode = readParam(route.params, 'mode');
  return t(`home.modes.${isQuizMode(mode) ? mode : 'practice'}.title`);
};

const getLessonTitle = ({ route }: RouteWithParams, t: I18n['t']): string => {
  const tag = readParam(route.params, 'tag');
  const position = isTagId(tag) && isStepLesson(getLessonByTag(tag)) ? getLessonPosition(tag) : null;
  return position ? t('lesson.lessonOf', position) : t('lesson.title');
};

const getPathTitle = ({ route }: RouteWithParams, t: I18n['t']): string => {
  const topic = TOPIC_IDS.find((id) => id === readParam(route.params, 'topic'));
  return topic && isCourseTopic(topic) ? t('path.courseTitle') : t('path.title');
};

SplashScreen.preventAutoHideAsync();
SplashScreen.setOptions({ fade: true, duration: 250 });

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

const openReview = (): void => {
  router.push({ pathname: '/quiz', params: { mode: 'review', topic: 'all' } });
};

type RootNavigationProps = {
  isOnboardingDone: boolean;
};

const RootNavigation = ({ isOnboardingDone }: RootNavigationProps): JSX.Element => {
  const { colors, isDark } = useTheme();
  const { t } = useI18n();
  const contentBarStyle = isDark ? 'light' : 'dark';

  useReviewReminderTap(openReview);

  return (
    <>
      <StatusBar style={isOnboardingDone ? colors.headerBarStyle : contentBarStyle} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.headerBg },
          headerTintColor: colors.headerText,
          headerTitleStyle: { fontWeight: '700' },
          contentStyle: { backgroundColor: colors.bgPrimary },
        }}
      >
        <Stack.Protected guard={isOnboardingDone}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="quiz" options={(props) => ({ title: getQuizTitle(props, t) })} />
          <Stack.Screen name="question/[id]" options={{ title: t('quiz.explanation') }} />
          <Stack.Screen name="lesson/[tag]" options={(props) => ({ title: getLessonTitle(props, t) })} />
          <Stack.Screen name="path/[topic]" options={(props) => ({ title: getPathTitle(props, t) })} />
          <Stack.Screen name="releases" options={{ title: t('releases.title') }} />
        </Stack.Protected>
        <Stack.Protected guard={!isOnboardingDone}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
      {isOnboardingDone ? <AchievementToast /> : null}
    </>
  );
};

const AppRoot = (): JSX.Element => {
  const { settings, isSettingsLoaded, topic, isTopicLoaded, isProgressLoaded, isContentLoaded } = useUnit({
    settings: settingsModel.$settings,
    isSettingsLoaded: settingsModel.$isLoaded,
    topic: topicModel.$currentTopic,
    isTopicLoaded: topicModel.$isLoaded,
    isProgressLoaded: progressModel.$isLoaded,
    isContentLoaded: contentModel.$isLoaded,
  });

  const systemScheme = useColorScheme();
  const isReady = isSettingsLoaded && isTopicLoaded && isProgressLoaded && isContentLoaded;

  useEffect(() => {
    settingsModel.settingsLoaded();
    topicModel.currentTopicLoaded();
    progressModel.progressLoaded();
    contentModel.contentLoaded();
    reminderModel.remindersStarted();
  }, []);

  useEffect(() => {
    if (isReady) {
      SplashScreen.hideAsync();
      contentUpdateModel.updateCheckRequested();
    }
  }, [isReady]);

  if (!isReady) {
    return <View style={{ flex: 1, backgroundColor: BASE_COLORS[systemScheme === 'dark' ? 'dark' : 'light'].bgPrimary }} />;
  }

  return (
    <ThemeProvider preference={settings.theme} accent={settings.onboardingDone ? getSelectionAccent(topic) : 'brand'}>
      <RootNavigation isOnboardingDone={settings.onboardingDone} />
    </ThemeProvider>
  );
};

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps): JSX.Element {
  const { settings } = useUnit({ settings: settingsModel.$settings });

  useEffect(() => {
    reportErrorFx(error);
  }, [error]);

  return (
    <SafeAreaProvider>
      <ThemeProvider preference={settings.theme} accent="brand">
        <ErrorFallback onRetry={() => retry()} />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export default function RootLayout(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppRoot />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
