import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { DIRECTION_IDS } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { AppText } from '@app/shared/ui';
import { DIRECTIONS } from '../config/directions';
import { TopicCard } from './topic-card';
import type { TopicSelection } from '../model/types';

type TopicCardListProps = {
  value: TopicSelection;
  onChange: (topic: TopicSelection) => void;
  onSelectedLayout?: (offsetY: number) => void;
};

export const TopicCardList = ({ value, onChange, onSelectedLayout }: TopicCardListProps): JSX.Element => {
  const { text } = useI18n();

  const renderCard = (selection: TopicSelection): JSX.Element => (
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
  );

  return (
    <View accessibilityRole="radiogroup" style={styles.cards}>
      {DIRECTION_IDS.flatMap((directionId) => [
        <AppText key={directionId} variant="subtitle" accessibilityRole="header" style={styles.direction}>
          {text(DIRECTIONS[directionId].title)}
        </AppText>,
        ...DIRECTIONS[directionId].topics.map(renderCard),
      ])}
      {renderCard('all')}
    </View>
  );
};

const styles = StyleSheet.create({
  cards: {
    gap: 10,
  },
  direction: {
    marginTop: 4,
  },
});
