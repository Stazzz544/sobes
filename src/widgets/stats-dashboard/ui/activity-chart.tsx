import { JSX, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText } from '@app/shared/ui';
import type { DayActivity } from '../lib/aggregate-stats';

type ActivityChartProps = {
  activity: DayActivity[];
};

const CHART_HEIGHT = 96;
const BAR_GAP = 4;
const MIN_BAR_HEIGHT = 3;

const formatDay = (dayKey: string): string => dayKey.slice(8).replace(/^0/, '');

export const ActivityChart = ({ activity }: ActivityChartProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, plural } = useI18n();
  const [width, setWidth] = useState(0);
  const maxTotal = Math.max(1, ...activity.map((day) => day.correct + day.incorrect));
  const barWidth = width > 0 ? (width - BAR_GAP * (activity.length - 1)) / activity.length : 0;
  const total = activity.reduce((sum, day) => sum + day.correct + day.incorrect, 0);
  const first = activity[0];
  const last = activity[activity.length - 1];

  return (
    <View
      accessible
      accessibilityLabel={`${t('stats.activityTitle')}: ${plural('question', total)}`}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={styles.container}
    >
      {width > 0 ? (
        <Svg width={width} height={CHART_HEIGHT}>
          {activity.map((day, index) => {
            const x = index * (barWidth + BAR_GAP);
            const correctHeight = (day.correct / maxTotal) * CHART_HEIGHT;
            const incorrectHeight = (day.incorrect / maxTotal) * CHART_HEIGHT;
            if (day.correct + day.incorrect === 0) {
              return (
                <Rect
                  key={day.dayKey}
                  x={x}
                  y={CHART_HEIGHT - MIN_BAR_HEIGHT}
                  width={barWidth}
                  height={MIN_BAR_HEIGHT}
                  rx={1.5}
                  fill={colors.border}
                />
              );
            }
            return (
              <Rect
                key={day.dayKey}
                x={x}
                y={CHART_HEIGHT - correctHeight - incorrectHeight}
                width={barWidth}
                height={incorrectHeight + correctHeight}
                rx={3}
                fill={colors.danger}
              />
            );
          })}
          {activity.map((day, index) =>
            day.correct > 0 ? (
              <Rect
                key={`${day.dayKey}-correct`}
                x={index * (barWidth + BAR_GAP)}
                y={CHART_HEIGHT - (day.correct / maxTotal) * CHART_HEIGHT}
                width={barWidth}
                height={(day.correct / maxTotal) * CHART_HEIGHT}
                rx={3}
                fill={colors.success}
              />
            ) : null,
          )}
        </Svg>
      ) : null}
      <View style={styles.labels}>
        <AppText variant="caption" tone="muted">
          {first ? formatDay(first.dayKey) : ''}
        </AppText>
        <AppText variant="caption" tone="muted">
          {total > 0 ? plural('question', total) : t('stats.noAnswers')}
        </AppText>
        <AppText variant="caption" tone="muted">
          {last ? formatDay(last.dayKey) : ''}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 6,
  },
  labels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
