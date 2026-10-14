import { JSX } from 'react';
import { Linking, StyleSheet, Switch, View } from 'react-native';
import Constants from 'expo-constants';
import { useUnit } from 'effector-react';
import { settingsModel } from '@app/entities/settings';
import { ResetProgressButton } from '@app/features/reset-progress';
import { PRIVACY_POLICY_URL } from '@app/shared/config';
import { LOCALE_NAMES, useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Button, Card, SegmentedControl } from '@app/shared/ui';
import type { DailyGoal, LocalePreference, SessionLength } from '@app/entities/settings';
import type { ThemePreference } from '@app/shared/theme';

const SESSION_LENGTHS: readonly SessionLength[] = [10, 20, 30];
const DAILY_GOALS: readonly DailyGoal[] = [5, 10, 20];

type SwitchRowProps = {
  label: string;
  value: boolean;
  onChange: (value: boolean) => void;
};

const SwitchRow = ({ label, value, onChange }: SwitchRowProps): JSX.Element => {
  const { colors } = useTheme();

  return (
    <View style={styles.switchRow}>
      <AppText style={styles.switchLabel}>{label}</AppText>
      <Switch
        value={value}
        onValueChange={onChange}
        trackColor={{ true: colors.accent, false: colors.border }}
        thumbColor={value ? colors.bgCard : colors.textMuted}
        accessibilityLabel={label}
      />
    </View>
  );
};

export const SettingsPanel = (): JSX.Element => {
  const { t } = useI18n();
  const { settings, onSettingsChange } = useUnit({
    settings: settingsModel.$settings,
    onSettingsChange: settingsModel.settingsChanged,
  });

  return (
    <View style={styles.list}>
      <Card style={styles.card}>
        <AppText variant="label" tone="muted">
          {t('settings.language')}
        </AppText>
        <SegmentedControl<LocalePreference>
          options={[
            { value: 'system', label: t('settings.languageSystem') },
            { value: 'ru', label: LOCALE_NAMES.ru },
            { value: 'en', label: LOCALE_NAMES.en },
          ]}
          value={settings.locale}
          onChange={(value) => onSettingsChange({ locale: value })}
          accessibilityLabel={t('settings.language')}
        />
      </Card>

      <Card style={styles.card}>
        <AppText variant="label" tone="muted">
          {t('settings.theme')}
        </AppText>
        <SegmentedControl<ThemePreference>
          options={[
            { value: 'system', label: t('settings.themeSystem') },
            { value: 'light', label: t('settings.themeLight') },
            { value: 'dark', label: t('settings.themeDark') },
          ]}
          value={settings.theme}
          onChange={(value) => onSettingsChange({ theme: value })}
          accessibilityLabel={t('settings.theme')}
        />
      </Card>

      <Card style={styles.card}>
        <AppText variant="label" tone="muted">
          {t('settings.sessionLength')}
        </AppText>
        <SegmentedControl<`${SessionLength}`>
          options={SESSION_LENGTHS.map((length) => ({ value: `${length}`, label: String(length) }))}
          value={`${settings.sessionLength}`}
          onChange={(value) =>
            onSettingsChange({ sessionLength: SESSION_LENGTHS.find((length) => `${length}` === value) ?? 10 })
          }
          accessibilityLabel={t('settings.sessionLength')}
        />
        <SwitchRow
          label={t('settings.haptics')}
          value={settings.haptics}
          onChange={(value) => onSettingsChange({ haptics: value })}
        />
      </Card>

      <Card style={styles.card}>
        <AppText variant="label" tone="muted">
          {t('settings.dailyGoal')}
        </AppText>
        <SegmentedControl<`${DailyGoal}`>
          options={DAILY_GOALS.map((goal) => ({ value: `${goal}`, label: String(goal) }))}
          value={`${settings.dailyGoal}`}
          onChange={(value) => onSettingsChange({ dailyGoal: DAILY_GOALS.find((goal) => `${goal}` === value) ?? 10 })}
          accessibilityLabel={t('settings.dailyGoal')}
        />
        <AppText variant="caption" tone="secondary">
          {t('settings.dailyGoalHint')}
        </AppText>
      </Card>

      <Card style={styles.card}>
        <AppText variant="label" tone="muted">
          {t('settings.progress')}
        </AppText>
        <ResetProgressButton />
      </Card>

      <Card style={styles.card}>
        <AppText variant="label" tone="muted">
          {t('settings.about')}
        </AppText>
        <AppText variant="bodyStrong">{t('settings.version', { version: Constants.expoConfig?.version ?? '—' })}</AppText>
        <AppText variant="caption" tone="secondary">
          {t('settings.aboutText')}
        </AppText>
        <SwitchRow
          label={t('settings.analytics')}
          value={settings.analytics}
          onChange={(value) => onSettingsChange({ analytics: value })}
        />
        <Button
          title={t('settings.privacy')}
          variant="ghost"
          size="compact"
          icon="shield-checkmark-outline"
          onPress={() => Linking.openURL(PRIVACY_POLICY_URL)}
        />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 12,
  },
  card: {
    gap: 10,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    minHeight: 48,
  },
  switchLabel: {
    flex: 1,
  },
});
