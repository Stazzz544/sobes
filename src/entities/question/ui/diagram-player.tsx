import { JSX, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { BORDER_RADIUS, CARD_BORDER_RADIUS } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, FormattedText, IconButton } from '@app/shared/ui';
import type { Locale } from '@app/shared/i18n';
import type { ThemeColors } from '@app/shared/theme';
import type { Diagram, DiagramItem, DiagramLane, DiagramLaneTone, DiagramText } from '../model/types';

type DiagramPlayerProps = {
  diagram: Diagram;
};

type LanePalette = {
  background: string;
  foreground: string;
};

const AUTOPLAY_STEP_MS = 2600;

const resolveText = (value: DiagramText, locale: Locale): string => (typeof value === 'string' ? value : value[locale]);

const getLanePalette = (tone: DiagramLaneTone, colors: ThemeColors): LanePalette => {
  if (tone === 'accent') {
    return { background: colors.accentSoft, foreground: colors.accentText };
  }
  if (tone === 'success') {
    return { background: colors.successSoft, foreground: colors.success };
  }
  if (tone === 'warning') {
    return { background: colors.warningSoft, foreground: colors.warning };
  }
  return { background: colors.codeBg, foreground: colors.textSecondary };
};

const ItemChip = ({ item, palette }: { item: DiagramItem; palette: LanePalette }): JSX.Element => {
  const { colors } = useTheme();
  const { locale } = useI18n();

  return (
    <Animated.View
      entering={FadeIn.duration(260)}
      exiting={FadeOut.duration(160)}
      layout={LinearTransition.duration(260)}
      style={[styles.chip, { backgroundColor: colors.bgCard, borderColor: palette.foreground }]}
    >
      <Text style={[item.isCode ? styles.chipCode : styles.chipText, { color: colors.textPrimary }]}>
        {resolveText(item.label, locale)}
      </Text>
    </Animated.View>
  );
};

const ColumnLane = ({ lane }: { lane: DiagramLane }): JSX.Element => {
  const { colors } = useTheme();
  const { locale } = useI18n();
  const palette = getLanePalette(lane.tone, colors);

  return (
    <View style={[styles.column, { backgroundColor: palette.background }]}>
      <Text style={[styles.laneTitle, { color: palette.foreground }]}>{resolveText(lane.title, locale)}</Text>
      <View style={[styles.items, lane.tone === 'neutral' && styles.itemsRow]}>
        {lane.items.map((item) => (
          <ItemChip key={item.id} item={item} palette={palette} />
        ))}
      </View>
    </View>
  );
};

const ChainNode = ({ lane }: { lane: DiagramLane }): JSX.Element => {
  const { colors } = useTheme();
  const { locale } = useI18n();
  const palette = getLanePalette(lane.tone, colors);
  const emphasis = useSharedValue(lane.isActive ? 1 : 0);

  useEffect(() => {
    emphasis.value = withTiming(lane.isActive ? 1 : 0, { duration: 280 });
  }, [lane.isActive, emphasis]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: 0.6 + emphasis.value * 0.4,
    transform: [{ scale: 0.97 + emphasis.value * 0.03 }],
  }));

  return (
    <Animated.View
      style={[
        styles.node,
        { backgroundColor: palette.background, borderColor: lane.isActive ? palette.foreground : 'transparent' },
        animatedStyle,
      ]}
    >
      <Text style={[styles.nodeTitle, { color: palette.foreground }]}>{resolveText(lane.title, locale)}</Text>
      {lane.items.length > 0 ? (
        <View style={styles.nodeItems}>
          {lane.items.map((item) => (
            <ItemChip key={item.id} item={item} palette={palette} />
          ))}
        </View>
      ) : null}
    </Animated.View>
  );
};

export const DiagramPlayer = ({ diagram }: DiagramPlayerProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const total = diagram.steps.length;
  const step = diagram.steps[stepIndex] ?? diagram.steps[0];
  const isLast = stepIndex >= total - 1;

  useEffect(() => {
    if (!isPlaying) {
      return undefined;
    }
    if (isLast) {
      setIsPlaying(false);
      return undefined;
    }
    const timeout = setTimeout(() => setStepIndex((index) => index + 1), AUTOPLAY_STEP_MS);
    return () => clearTimeout(timeout);
  }, [isPlaying, isLast, stepIndex]);

  const handlePlay = (): void => {
    if (isPlaying) {
      setIsPlaying(false);
      return;
    }
    if (isLast) {
      setStepIndex(0);
    }
    setIsPlaying(true);
  };

  const goTo = (index: number): void => {
    setIsPlaying(false);
    setStepIndex(Math.min(Math.max(index, 0), total - 1));
  };

  if (!step) {
    return <View />;
  }

  return (
    <View style={[styles.container, { borderColor: colors.border, backgroundColor: colors.bgCard }]}>
      <View style={styles.header}>
        <Ionicons name="git-network-outline" size={18} color={colors.accentText} />
        <AppText variant="label" tone="accent">
          {t('diagram.title')}
        </AppText>
      </View>

      {diagram.layout === 'columns' ? (
        <View style={styles.columns}>
          {step.lanes.map((lane) => (
            <ColumnLane key={lane.id} lane={lane} />
          ))}
        </View>
      ) : (
        <View style={styles.chain}>
          {step.lanes.map((lane, index) => (
            <View key={lane.id} style={styles.chainItem}>
              {index > 0 ? <Ionicons name="arrow-down" size={18} color={colors.textMuted} /> : null}
              <ChainNode lane={lane} />
            </View>
          ))}
        </View>
      )}

      <Animated.View key={stepIndex} entering={FadeIn.duration(260)} accessibilityLiveRegion="polite" style={styles.caption}>
        <FormattedText>{text(step.caption)}</FormattedText>
      </Animated.View>

      <View style={styles.controls}>
        <IconButton
          icon="chevron-back"
          onPress={() => goTo(stepIndex - 1)}
          disabled={stepIndex === 0}
          accessibilityLabel={t('diagram.back')}
        />
        <AppText variant="caption" tone="secondary" style={styles.counter}>
          {t('diagram.step', { current: stepIndex + 1, total })}
        </AppText>
        <IconButton
          icon={isPlaying ? 'pause' : 'play'}
          onPress={handlePlay}
          isPrimary
          accessibilityLabel={isPlaying ? t('diagram.pause') : t('diagram.play')}
        />
        <IconButton
          icon="chevron-forward"
          onPress={() => goTo(stepIndex + 1)}
          disabled={isLast}
          accessibilityLabel={t('diagram.next')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderRadius: CARD_BORDER_RADIUS,
    padding: 12,
    gap: 12,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  columns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  column: {
    flexGrow: 1,
    flexBasis: '46%',
    minWidth: 0,
    minHeight: 96,
    borderRadius: BORDER_RADIUS,
    padding: 8,
    gap: 6,
  },
  laneTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  items: {
    gap: 6,
  },
  itemsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
    maxWidth: '100%',
  },
  chipCode: {
    fontFamily: 'monospace',
    fontSize: 12,
  },
  chipText: {
    fontSize: 13,
  },
  chain: {
    gap: 4,
  },
  chainItem: {
    alignItems: 'center',
    gap: 4,
  },
  node: {
    alignSelf: 'stretch',
    borderWidth: 2,
    borderRadius: BORDER_RADIUS,
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
  },
  nodeTitle: {
    fontSize: 14,
    fontWeight: '700',
  },
  nodeItems: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  caption: {
    minHeight: 66,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  counter: {
    flex: 1,
  },
});
