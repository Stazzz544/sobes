import { JSX } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { BORDER_RADIUS, MIN_TOUCH_SIZE } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, FormattedText } from '@app/shared/ui';
import type { ThemeColors } from '@app/shared/theme';
import type { IconName } from '@app/shared/ui';
import type { OptionContent, OrderQuestion } from '../model/types';

type OrderAnswerProps = {
  question: OrderQuestion;
  displayOrder: number[];
  order: number[];
  isRevealed: boolean;
  onChange?: (order: number[]) => void;
};

type ItemContentProps = {
  item: OptionContent;
};

type ItemRowProps = {
  item: OptionContent;
  label: string;
  borderColor: string;
  backgroundColor: string;
  accessibilityLabel: string;
  statusIcon?: IconName;
  onPress?: () => void;
};

const ItemContent = ({ item }: ItemContentProps): JSX.Element => {
  const { colors } = useTheme();
  const { text } = useI18n();

  if ('code' in item) {
    return <Text style={[styles.code, { color: colors.textPrimary }]}>{item.code}</Text>;
  }
  return <FormattedText>{text(item.text)}</FormattedText>;
};

const ItemRow = ({ item, label, borderColor, backgroundColor, accessibilityLabel, statusIcon, onPress }: ItemRowProps): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      disabled={!onPress}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityLabel={accessibilityLabel}
      style={({ pressed }) => [styles.row, { borderColor, backgroundColor }, pressed && styles.pressed]}
    >
      <View style={[styles.badge, { backgroundColor: colors.bgSecondary }]}>
        <AppText variant="caption" tone="secondary">
          {label}
        </AppText>
      </View>
      <View style={styles.rowContent}>
        <ItemContent item={item} />
      </View>
      {statusIcon ? <Ionicons name={statusIcon} size={20} color={borderColor} /> : null}
    </Pressable>
  );
};

const getPlacedBorder = (isRevealed: boolean, isPlacedCorrectly: boolean, colors: ThemeColors): string => {
  if (!isRevealed) {
    return colors.accent;
  }
  return isPlacedCorrectly ? colors.success : colors.danger;
};

const getPlacedIcon = (isRevealed: boolean, isPlacedCorrectly: boolean): IconName | undefined => {
  if (!isRevealed) {
    return undefined;
  }
  return isPlacedCorrectly ? 'checkmark-circle' : 'close-circle';
};

export const OrderAnswer = ({ question, displayOrder, order, isRevealed, onChange }: OrderAnswerProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const itemLabel = (index: number): string => {
    const item = question.items[index];
    if (!item) {
      return '';
    }
    return 'code' in item ? item.code : text(item.text);
  };
  const pool = displayOrder.filter((index) => !order.includes(index));
  const isCorrect = order.length === question.items.length && order.every((index, position) => index === position);

  return (
    <View style={styles.container}>
      {isRevealed ? null : (
        <AppText variant="caption" tone="secondary">
          {t('question.orderHint')}
        </AppText>
      )}
      {order.length > 0 ? (
        <View style={styles.list}>
          <AppText variant="label" tone="muted">
            {t('question.orderYours')}
          </AppText>
          {order.map((index, position) => {
            const borderColor = getPlacedBorder(isRevealed, index === position, colors);
            const statusIcon = getPlacedIcon(isRevealed, index === position);
            return (
              <ItemRow
                key={index}
                item={question.items[index] ?? { code: '' }}
                label={String(position + 1)}
                borderColor={borderColor}
                backgroundColor={colors.bgCard}
                accessibilityLabel={`${position + 1}. ${itemLabel(index)}`}
                statusIcon={statusIcon}
                onPress={
                  isRevealed || !onChange ? undefined : () => onChange(order.filter((placed) => placed !== index))
                }
              />
            );
          })}
        </View>
      ) : null}
      {isRevealed ? null : (
        <View style={styles.list}>
          {pool.map((index) => (
            <ItemRow
              key={index}
              item={question.items[index] ?? { code: '' }}
              label="+"
              borderColor={colors.border}
              backgroundColor={colors.bgCard}
              accessibilityLabel={itemLabel(index)}
              onPress={onChange ? () => onChange([...order, index]) : undefined}
            />
          ))}
        </View>
      )}
      {isRevealed && !isCorrect ? (
        <View style={styles.list}>
          <View style={styles.correctTitle}>
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
            <AppText variant="label" tone="muted">
              {t('question.orderCorrect')}
            </AppText>
          </View>
          {question.items.map((item, index) => (
            <ItemRow
              key={index}
              item={item}
              label={String(index + 1)}
              borderColor={colors.success}
              backgroundColor={colors.successSoft}
              accessibilityLabel={`${index + 1}. ${itemLabel(index)}`}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 12,
  },
  list: {
    gap: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: MIN_TOUCH_SIZE,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1.5,
    borderRadius: BORDER_RADIUS,
  },
  badge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowContent: {
    flex: 1,
    minWidth: 0,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
  correctTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pressed: {
    opacity: 0.8,
  },
});
