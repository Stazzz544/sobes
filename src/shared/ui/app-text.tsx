import { JSX } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '@app/shared/theme';
import type { TextProps } from 'react-native';
import type { ThemeColors } from '@app/shared/theme';

export type TextVariant = 'display' | 'title' | 'subtitle' | 'body' | 'bodyStrong' | 'caption' | 'label';

export type TextTone = 'primary' | 'secondary' | 'muted' | 'accent' | 'onAccent' | 'success' | 'danger';

type AppTextProps = TextProps & {
  variant?: TextVariant;
  tone?: TextTone;
};

const TONE_TO_COLOR: Record<TextTone, keyof ThemeColors> = {
  primary: 'textPrimary',
  secondary: 'textSecondary',
  muted: 'textMuted',
  accent: 'accentText',
  onAccent: 'onAccent',
  success: 'success',
  danger: 'danger',
};

export const AppText = ({ variant = 'body', tone = 'primary', style, ...rest }: AppTextProps): JSX.Element => {
  const { colors } = useTheme();

  return <Text {...rest} style={[styles[variant], { color: colors[TONE_TO_COLOR[tone]] }, style]} />;
};

const styles = StyleSheet.create({
  display: { fontSize: 28, lineHeight: 34, fontWeight: '700' },
  title: { fontSize: 22, lineHeight: 28, fontWeight: '700' },
  subtitle: { fontSize: 17, lineHeight: 23, fontWeight: '600' },
  body: { fontSize: 15, lineHeight: 22 },
  bodyStrong: { fontSize: 15, lineHeight: 22, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 18 },
  label: { fontSize: 12, lineHeight: 16, fontWeight: '700', letterSpacing: 0.6, textTransform: 'uppercase' },
});
