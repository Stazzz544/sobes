import { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MIN_TOUCH_SIZE } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { TOPICS } from '../config/topics';
import { TopicLogo } from './topic-logo';
import type { TopicSelection } from '../model/types';

type TopicChipProps = {
  topic: TopicSelection;
};

export const TopicChip = ({ topic }: TopicChipProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const label = topic === 'all' ? t('topics.allShort') : TOPICS[topic].shortTitle;

  return (
    <View style={[styles.chip, { backgroundColor: colors.accentSoft, borderColor: colors.accentText }]}>
      <TopicLogo topic={topic} size={24} />
      <Text style={[styles.label, { color: colors.accentText }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    minHeight: MIN_TOUCH_SIZE,
    paddingHorizontal: 12,
    borderRadius: MIN_TOUCH_SIZE / 2,
    borderWidth: 2,
  },
  label: {
    fontSize: 15,
    fontWeight: '700',
  },
});
