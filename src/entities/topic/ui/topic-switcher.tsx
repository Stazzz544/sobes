import { JSX } from 'react';
import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';
import { MIN_TOUCH_SIZE, TOPIC_SELECTIONS } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { TOPICS } from '../config/topics';
import { TopicLogo } from './topic-logo';
import type { TopicSelection } from '../model/types';

type TopicSwitcherProps = {
  value: TopicSelection;
  onChange: (topic: TopicSelection) => void;
};

export const TopicSwitcher = ({ value, onChange }: TopicSwitcherProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.scroll}
      contentContainerStyle={styles.row}
      accessibilityRole="radiogroup"
    >
      {TOPIC_SELECTIONS.map((topic) => {
        const isSelected = topic === value;
        const label = topic === 'all' ? t('topics.allShort') : TOPICS[topic].shortTitle;
        return (
          <Pressable
            key={topic}
            onPress={() => onChange(topic)}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            accessibilityLabel={label}
            style={[
              styles.chip,
              {
                backgroundColor: isSelected ? colors.accentSoft : colors.bgSecondary,
                borderColor: isSelected ? colors.accentText : 'transparent',
              },
            ]}
          >
            <TopicLogo topic={topic} size={24} />
            <Text style={[styles.label, { color: isSelected ? colors.accentText : colors.textSecondary }]}>{label}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 0,
  },
  row: {
    alignItems: 'center',
    gap: 8,
    paddingVertical: 2,
  },
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
