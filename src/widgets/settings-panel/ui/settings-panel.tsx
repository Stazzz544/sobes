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
import type { LocalePreference, SessionLength } from '@app/entities/settings';
import type { ThemePreference } from '@app/shared/theme';

const SESSION_LENGTHS: readonly SessionLength[] = [10, 20, 30];

export const SettingsPanel = (): JSX.Element => {
  const { t } = useI18n();
  const { colors } = useTheme();
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
        <View style={styles.switchRow}>
          <AppText style={styles.switchLabel}>{t('settings.haptics')}</AppText>
          <Switch
            value={settings.haptics}
            onValueChange={(value) => {
              onSettingsChange({ haptics: value });
            }}
            trackColor={{ true: colors.accent, false: colors.border }}
            thumbColor={colors.bgCard}
            accessibilityLabel={t('settings.haptics')}
          />
        </View>
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
