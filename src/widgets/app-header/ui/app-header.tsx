import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useUnit } from 'effector-react';
import { TOPICS, TopicLogo, topicModel } from '@app/entities/topic';
import { TopicMenuButton } from '@app/features/select-topic';
import { SCREEN_PADDING } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText } from '@app/shared/ui';

const HEADER_HEIGHT = 64;
const LOGO_SIZE = 30;

export const AppHeader = (): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const insets = useSafeAreaInsets();
  const { topic } = useUnit({ topic: topicModel.$currentTopic });
  const topicTitle = topic === 'all' ? t('topics.all') : text(TOPICS[topic].title);

  return (
    <View style={[styles.header, { paddingTop: insets.top, backgroundColor: colors.headerBg }]}>
      <View style={styles.row}>
        <TopicMenuButton />
        <AppText variant="title" accessibilityRole="header" numberOfLines={1} style={[styles.title, { color: colors.headerText }]}>
          {t('common.appName')}
        </AppText>
        <View
          accessible
          accessibilityRole="image"
          accessibilityLabel={t('topicMenu.current', { topic: topicTitle })}
          style={[styles.logo, { borderColor: colors.headerText }]}
        >
          <TopicLogo topic={topic} size={LOGO_SIZE} />
        </View>
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
  logo: {
    padding: 2,
    borderWidth: 2,
    borderRadius: 9,
  },
});
