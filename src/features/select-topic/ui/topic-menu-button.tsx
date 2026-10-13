import { JSX } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useUnit } from 'effector-react';
import { MIN_TOUCH_SIZE } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { topicMenuModel } from '../model/topic-menu-model';

export const TopicMenuButton = (): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { isOpen, onToggle } = useUnit({
    isOpen: topicMenuModel.$isMenuOpen,
    onToggle: topicMenuModel.menuToggled,
  });

  return (
    <Pressable
      onPress={() => onToggle()}
      accessibilityRole="button"
      accessibilityLabel={isOpen ? t('topicMenu.close') : t('topicMenu.open')}
      accessibilityState={{ expanded: isOpen }}
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons name={isOpen ? 'close' : 'menu'} size={26} color={colors.headerText} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: MIN_TOUCH_SIZE,
    height: MIN_TOUCH_SIZE,
    marginHorizontal: 4,
    borderRadius: MIN_TOUCH_SIZE / 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.6,
  },
});
