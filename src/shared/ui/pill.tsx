import { JSX } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@app/shared/theme';
import type { IconName } from './button';

type PillProps = {
  label: string;
  icon?: IconName;
  tone?: 'neutral' | 'accent';
};

export const Pill = ({ label, icon, tone = 'neutral' }: PillProps): JSX.Element => {
  const { colors } = useTheme();
  const background = tone === 'accent' ? colors.accentSoft : colors.bgSecondary;
  const foreground = tone === 'accent' ? colors.accentText : colors.textSecondary;

  return (
    <View style={[styles.pill, { backgroundColor: background }]}>
      {icon ? <Ionicons name={icon} size={13} color={foreground} /> : null}
      <Text style={[styles.label, { color: foreground }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
  },
});
