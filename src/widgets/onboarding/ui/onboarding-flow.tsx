import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { useUnit } from 'effector-react';
import { settingsModel } from '@app/entities/settings';
import { TopicCardList, TopicLogo, topicModel } from '@app/entities/topic';
import { LOCALES, LOCALE_NAMES, useI18n } from '@app/shared/i18n';
import { AppText, Button, Screen, SegmentedControl } from '@app/shared/ui';
import { onboardingModel } from '../model/onboarding-model';
import type { Locale } from '@app/shared/i18n';

export const OnboardingFlow = (): JSX.Element => {
  const { t, locale } = useI18n();
  const { topic, onTopicSelect, onSettingsChange, onStart } = useUnit({
    topic: topicModel.$currentTopic,
    onTopicSelect: topicModel.topicSelected,
    onSettingsChange: settingsModel.settingsChanged,
    onStart: onboardingModel.startPressed,
  });

  return (
    <Screen withTopInset withBottomInset>
      <View style={styles.hero}>
        <TopicLogo topic="all" size={64} />
        <AppText variant="display">{t('onboarding.welcomeTitle')}</AppText>
        <AppText tone="secondary">{t('onboarding.welcomeText')}</AppText>
      </View>

      <View style={styles.section}>
        <AppText variant="label" tone="muted">
          {t('onboarding.languageLabel')}
        </AppText>
        <SegmentedControl<Locale>
          options={LOCALES.map((value) => ({ value, label: LOCALE_NAMES[value] }))}
          value={locale}
          onChange={(value) => onSettingsChange({ locale: value })}
          accessibilityLabel={t('onboarding.languageLabel')}
        />
      </View>

      <View style={styles.section}>
        <AppText variant="title">{t('onboarding.topicTitle')}</AppText>
        <TopicCardList value={topic} onChange={onTopicSelect} />
        <AppText variant="caption" tone="muted">
          {t('onboarding.topicHint')}
        </AppText>
      </View>

      <Button title={t('common.start')} icon="arrow-forward" onPress={() => onStart()} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  hero: {
    gap: 12,
    paddingTop: 8,
  },
  section: {
    gap: 10,
  },
});
