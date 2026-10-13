import { JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { BORDER_RADIUS, MIN_TOUCH_SIZE } from '@app/shared/config';
import { useTheme } from '@app/shared/theme';

export type SegmentedOption<Value extends string> = {
  value: Value;
  label: string;
};

type SegmentedControlProps<Value extends string> = {
  options: readonly SegmentedOption<Value>[];
  value: Value;
  onChange: (value: Value) => void;
  accessibilityLabel?: string;
};

export const SegmentedControl = <Value extends string>({
  options,
  value,
  onChange,
  accessibilityLabel,
}: SegmentedControlProps<Value>): JSX.Element => {
  const { colors } = useTheme();

  return (
    <View
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel}
      style={[styles.container, { backgroundColor: colors.bgSecondary }]}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected: isSelected }}
            style={[styles.segment, isSelected && { backgroundColor: colors.accent }]}
          >
            <Text
              numberOfLines={1}
              style={[styles.label, { color: isSelected ? colors.onAccent : colors.textSecondary }]}
            >
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: BORDER_RADIUS,
    padding: 4,
    gap: 4,
  },
  segment: {
    flex: 1,
    minHeight: MIN_TOUCH_SIZE,
    borderRadius: BORDER_RADIUS - 4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
});
