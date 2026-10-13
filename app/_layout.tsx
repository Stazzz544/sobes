import { JSX, useEffect } from 'react';
import { useColorScheme, View } from 'react-native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useUnit } from 'effector-react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { progressModel } from '@app/entities/progress';
import { settingsModel } from '@app/entities/settings';
import { getSelectionAccent, topicModel } from '@app/entities/topic';
import { useI18n } from '@app/shared/i18n';
import { BASE_COLORS, ThemeProvider, useTheme } from '@app/shared/theme';

type RootNavigationProps = {
  isOnboardingDone: boolean;
};

const RootNavigation = ({ isOnboardingDone }: RootNavigationProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <>
      <StatusBar style={colors.headerBarStyle} />
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
          <Stack.Screen name="quiz" options={{ title: t('tabs.train') }} />
          <Stack.Screen name="question/[id]" options={{ title: t('quiz.explanation') }} />
        </Stack.Protected>
        <Stack.Protected guard={!isOnboardingDone}>
          <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack.Protected>
      </Stack>
    </>
  );
};

const AppRoot = (): JSX.Element => {
  const { settings, isSettingsLoaded, topic, isTopicLoaded, isProgressLoaded } = useUnit({
    settings: settingsModel.$settings,
    isSettingsLoaded: settingsModel.$isLoaded,
    topic: topicModel.$currentTopic,
    isTopicLoaded: topicModel.$isLoaded,
    isProgressLoaded: progressModel.$isLoaded,
  });

  const systemScheme = useColorScheme();

  useEffect(() => {
    settingsModel.settingsLoaded();
    topicModel.currentTopicLoaded();
    progressModel.progressLoaded();
  }, []);

  if (!isSettingsLoaded || !isTopicLoaded || !isProgressLoaded) {
    return <View style={{ flex: 1, backgroundColor: BASE_COLORS[systemScheme === 'dark' ? 'dark' : 'light'].bgPrimary }} />;
  }

  return (
    <ThemeProvider preference={settings.theme} accent={settings.onboardingDone ? getSelectionAccent(topic) : 'brand'}>
      <RootNavigation isOnboardingDone={settings.onboardingDone} />
    </ThemeProvider>
  );
};

export default function RootLayout(): JSX.Element {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <AppRoot />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
