import { JSX, ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { CARD_BORDER_RADIUS } from '@app/shared/config';
import { useTheme } from '@app/shared/theme';
import type { StyleProp, ViewStyle } from 'react-native';

type CardProps = {
  children: ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
};

export const Card = ({ children, onPress, style, accessibilityLabel }: CardProps): JSX.Element => {
  const { colors } = useTheme();
  const cardStyle = [styles.card, { backgroundColor: colors.bgCard, borderColor: colors.border }, style];

  if (!onPress) {
    return <View style={cardStyle}>{children}</View>;
  }

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [cardStyle, pressed && styles.pressed]}
    >
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: CARD_BORDER_RADIUS,
    borderWidth: 1,
    padding: 16,
  },
  pressed: {
    opacity: 0.85,
  },
});
