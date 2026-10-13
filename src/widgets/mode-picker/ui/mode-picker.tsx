import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { QUIZ_MODES } from '@app/entities/question';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Card } from '@app/shared/ui';
import type { QuizMode } from '@app/entities/question';
import type { IconName } from '@app/shared/ui';

type ModePickerProps = {
  onSelect: (mode: QuizMode) => void;
};

const MODE_ICONS: Record<QuizMode, IconName> = {
  practice: 'school-outline',
  popular: 'flame-outline',
  hard: 'barbell-outline',
  interview: 'timer-outline',
  mistakes: 'refresh-outline',
};

export const ModePicker = ({ onSelect }: ModePickerProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();

  return (
    <View style={styles.list}>
      {QUIZ_MODES.map((mode) => {
        const title = t(`home.modes.${mode}.title`);
        return (
          <Card
            key={mode}
            onPress={() => onSelect(mode)}
            accessibilityLabel={`${title}. ${t(`home.modes.${mode}.description`)}`}
            style={styles.card}
          >
            <View style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}>
              <Ionicons name={MODE_ICONS[mode]} size={24} color={colors.accentText} />
            </View>
            <View style={styles.texts}>
              <AppText variant="subtitle">{title}</AppText>
              <AppText variant="caption" tone="secondary">
                {t(`home.modes.${mode}.description`)}
              </AppText>
            </View>
            <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
          </Card>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  texts: {
    flex: 1,
    minWidth: 0,
    gap: 2,
  },
});
