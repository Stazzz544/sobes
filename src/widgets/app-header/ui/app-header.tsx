import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TopicMenuButton, TopicMenuChip } from '@app/features/select-topic';
import { SCREEN_PADDING } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText } from '@app/shared/ui';

const HEADER_HEIGHT = 64;

export const AppHeader = (): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.header, { paddingTop: insets.top, backgroundColor: colors.headerBg }]}>
      <View style={styles.row}>
        <TopicMenuButton />
        <AppText variant="title" accessibilityRole="header" numberOfLines={1} style={[styles.title, { color: colors.headerText }]}>
          {t('common.appName')}
        </AppText>
        <TopicMenuChip />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    elevation: 4,
    zIndex: 1,
  },
  row: {
    height: HEADER_HEIGHT,
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: SCREEN_PADDING,
  },
  title: {
    flex: 1,
    marginLeft: 4,
    fontSize: 20,
  },
});
