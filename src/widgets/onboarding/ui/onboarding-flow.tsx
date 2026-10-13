import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { useUnit } from 'effector-react';
import { settingsModel } from '@app/entities/settings';
import { TopicCard, TopicLogo, TOPIC_SELECTIONS, topicModel } from '@app/entities/topic';
import { LOCALES, LOCALE_NAMES, useI18n } from '@app/shared/i18n';
import { AppText, Button, Screen, SegmentedControl } from '@app/shared/ui';
import type { Locale } from '@app/shared/i18n';

export const OnboardingFlow = (): JSX.Element => {
  const { t, locale } = useI18n();
  const { topic, onTopicSelect, onSettingsChange, onComplete } = useUnit({
    topic: topicModel.$currentTopic,
    onTopicSelect: topicModel.topicSelected,
    onSettingsChange: settingsModel.settingsChanged,
    onComplete: settingsModel.onboardingCompleted,
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
        <View accessibilityRole="radiogroup" style={styles.cards}>
          {TOPIC_SELECTIONS.map((selection) => (
            <TopicCard
              key={selection}
              topic={selection}
              isSelected={selection === topic}
              onPress={() => onTopicSelect(selection)}
            />
          ))}
        </View>
        <AppText variant="caption" tone="muted">
          {t('onboarding.topicHint')}
        </AppText>
      </View>

      <Button title={t('common.start')} icon="arrow-forward" onPress={() => onComplete()} />
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
  cards: {
    gap: 10,
  },
});
