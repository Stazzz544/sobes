import { JSX, useEffect } from 'react';
import { AccessibilityInfo, Pressable, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUnit } from 'effector-react';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CARD_BORDER_RADIUS, SCREEN_PADDING } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText } from '@app/shared/ui';
import { achievementsModel } from '../model/achievements-model';

const TOAST_DURATION_MS = 4000;

export const AchievementToast = (): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const { current, dismiss } = useUnit({ current: achievementsModel.$current, dismiss: achievementsModel.toastDismissed });
  const currentId = current?.id ?? null;
  const title = currentId ? t(`achievements.items.${currentId}.title`) : '';

  useEffect(() => {
    if (!currentId) {
      return;
    }
    AccessibilityInfo.announceForAccessibility(`${t('achievements.toast')}: ${title}`);
    const timer = setTimeout(dismiss, TOAST_DURATION_MS);
    return () => clearTimeout(timer);
  }, [currentId, title, t, dismiss]);

  return (
    <View pointerEvents="box-none" style={[styles.container, { top: insets.top + 8 }]}>
      {current ? (
        <Animated.View key={current.id} entering={FadeInUp.duration(250)} exiting={FadeOutUp.duration(200)} style={styles.slot}>
          <Pressable
            onPress={dismiss}
            accessibilityRole="button"
            accessibilityLabel={`${t('achievements.toast')}: ${title}`}
            accessibilityHint={t('achievements.toastHint')}
            style={[styles.toast, { backgroundColor: colors.bgCard, borderColor: colors.accent }]}
          >
            <View style={[styles.badge, { backgroundColor: colors.accent }]}>
              <Ionicons name={current.icon} size={22} color={colors.onAccent} />
            </View>
            <View style={styles.texts}>
              <AppText variant="caption" tone="accent">
                {t('achievements.toast')}
              </AppText>
              <AppText variant="bodyStrong">{title}</AppText>
            </View>
          </Pressable>
        </Animated.View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: SCREEN_PADDING,
    right: SCREEN_PADDING,
    alignItems: 'center',
  },
  slot: {
    width: '100%',
    maxWidth: 480,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderWidth: 1,
    borderRadius: CARD_BORDER_RADIUS,
    elevation: 6,
  },
  badge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
});
