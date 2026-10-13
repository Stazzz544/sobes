import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { TOPIC_SELECTIONS } from '@app/shared/config';
import { TopicCard } from './topic-card';
import type { TopicSelection } from '../model/types';

type TopicCardListProps = {
  value: TopicSelection;
  onChange: (topic: TopicSelection) => void;
  onSelectedLayout?: (offsetY: number) => void;
};

export const TopicCardList = ({ value, onChange, onSelectedLayout }: TopicCardListProps): JSX.Element => (
  <View accessibilityRole="radiogroup" style={styles.cards}>
    {TOPIC_SELECTIONS.map((selection) => (
      <View
        key={selection}
        onLayout={(event) => {
          if (selection === value) {
            onSelectedLayout?.(event.nativeEvent.layout.y);
          }
        }}
      >
        <TopicCard topic={selection} isSelected={selection === value} onPress={() => onChange(selection)} />
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  cards: {
    gap: 10,
  },
});
