import { JSX, ReactNode, useCallback, useEffect, useRef } from 'react';
import { BackHandler, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { useFocusEffect } from 'expo-router';
import { useUnit } from 'effector-react';
import { TopicCardList, topicModel } from '@app/entities/topic';
import { CARD_BORDER_RADIUS, SCREEN_PADDING } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText } from '@app/shared/ui';
import { topicMenuModel } from '../model/topic-menu-model';

type TopicMenuSheetProps = {
  children: ReactNode;
};

export const TopicMenuSheet = ({ children }: TopicMenuSheetProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
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
          <>
            <Animated.View
              entering={FadeIn.duration(200)}
              exiting={FadeOut.duration(200)}
              style={[StyleSheet.absoluteFill, { backgroundColor: colors.overlay }]}
            >
              <Pressable
                style={styles.root}
                onPress={() => onClose()}
                accessibilityRole="button"
                accessibilityLabel={t('common.close')}
              />
            </Animated.View>
            <Animated.View
              entering={SlideInUp.duration(260)}
              exiting={SlideOutUp.duration(200)}
              style={[styles.sheet, { backgroundColor: colors.bgPrimary }]}
            >
              <AppText variant="label" tone="muted" style={styles.title}>
                {t('topicMenu.title')}
              </AppText>
              <ScrollView ref={scrollRef} style={styles.scroll} contentContainerStyle={styles.content}>
                <TopicCardList
                  value={topic}
                  onChange={onPick}
                  onSelectedLayout={(offsetY) => scrollRef.current?.scrollTo({ y: offsetY, animated: false })}
                />
              </ScrollView>
            </Animated.View>
          </>
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    maxHeight: '85%',
    borderBottomLeftRadius: CARD_BORDER_RADIUS + 8,
    borderBottomRightRadius: CARD_BORDER_RADIUS + 8,
    overflow: 'hidden',
  },
  title: {
    paddingHorizontal: SCREEN_PADDING,
    paddingTop: SCREEN_PADDING,
    paddingBottom: 12,
  },
  scroll: {
    flexGrow: 0,
    flexShrink: 1,
  },
  content: {
    paddingHorizontal: SCREEN_PADDING,
    paddingBottom: SCREEN_PADDING + 4,
  },
});
