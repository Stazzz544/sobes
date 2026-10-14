import { JSX, ReactNode, useCallback, useEffect, useRef } from 'react';
import { BackHandler, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect } from 'expo-router';
import { useUnit } from 'effector-react';
import { TopicCardList, topicModel } from '@app/entities/topic';
import { SCREEN_PADDING } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText } from '@app/shared/ui';
import { topicMenuModel } from '../model/topic-menu-model';

const SELECTED_TOPIC_OFFSET = 56;

type TopicMenuSheetProps = {
  children: ReactNode;
};

export const TopicMenuSheet = ({ children }: TopicMenuSheetProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const { isOpen, topic, onClose, onPick } = useUnit({
    isOpen: topicMenuModel.$isMenuOpen,
    topic: topicModel.$currentTopic,
    onClose: topicMenuModel.menuClosed,
    onPick: topicMenuModel.topicPicked,
  });
  const scrollRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      onClose();
      return true;
    });
    return () => subscription.remove();
  }, [isOpen, onClose]);

  useFocusEffect(useCallback(() => () => onClose(), [onClose]));

  return (
    <View style={styles.root}>
      <View style={styles.root} importantForAccessibility={isOpen ? 'no-hide-descendants' : 'auto'}>
        {children}
      </View>
      <View style={styles.layer}>
        {isOpen ? (
          <Animated.View
            entering={SlideInUp.duration(260)}
            exiting={SlideOutUp.duration(200)}
            style={[styles.sheet, { backgroundColor: colors.bgPrimary }]}
          >
            <AppText variant="label" tone="muted" style={styles.title}>
              {t('topicMenu.title')}
            </AppText>
            <ScrollView
              ref={scrollRef}
              style={styles.root}
              contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + SCREEN_PADDING * 2 }]}
            >
              <TopicCardList
                value={topic}
                onChange={onPick}
                onSelectedLayout={(offsetY) =>
                  scrollRef.current?.scrollTo({ y: Math.max(offsetY - SELECTED_TOPIC_OFFSET, 0), animated: false })
                }
              />
            </ScrollView>
          </Animated.View>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    pointerEvents: 'box-none',
  },
  sheet: {
    ...StyleSheet.absoluteFillObject,
  },
  title: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: SCREEN_PADDING,
    paddingBottom: 12,
  },
  content: {
    paddingHorizontal: SCREEN_PADDING,
  },
});
