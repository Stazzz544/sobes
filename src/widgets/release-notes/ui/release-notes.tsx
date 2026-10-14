import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import Constants from 'expo-constants';
import { RELEASES } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Card, Pill, Screen } from '@app/shared/ui';
import type { Release } from '@app/shared/config';

type ReleaseCardProps = {
  release: Release;
  isCurrent: boolean;
};

const ReleaseCard = ({ release, isCurrent }: ReleaseCardProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text, locale } = useI18n();
  const date = new Date(`${release.date}T00:00:00`).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <AppText variant="subtitle" style={styles.version}>
          {release.version}
        </AppText>
        {isCurrent ? <Pill label={t('releases.current')} icon="checkmark-circle" tone="accent" /> : null}
      </View>
      <AppText variant="caption" tone="secondary">
        {date}
      </AppText>
      <View style={styles.changes}>
        {release.changes.map((change) => (
          <View key={change.en} style={styles.change}>
            <View style={[styles.bullet, { backgroundColor: colors.accentText }]} />
            <AppText style={styles.changeText}>{text(change)}</AppText>
          </View>
        ))}
      </View>
    </Card>
  );
};

export const ReleaseNotes = (): JSX.Element => {
  const currentVersion = Constants.expoConfig?.version;

  return (
    <Screen withBottomInset>
      {RELEASES.map((release) => (
        <ReleaseCard key={release.version} release={release} isCurrent={release.version === currentVersion} />
      ))}
    </Screen>
  );
};

const styles = StyleSheet.create({
  card: {
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  version: {
    flexShrink: 1,
  },
  changes: {
    gap: 8,
    marginTop: 6,
  },
  change: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
  },
  changeText: {
    flex: 1,
    minWidth: 0,
  },
});
