import { JSX } from 'react';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CARD_BORDER_RADIUS } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Button, FormattedText } from '@app/shared/ui';
import { getGlossaryTerm } from '../model/content';

type GlossarySheetProps = {
  termId: string | null;
  isOpen: boolean;
  onClose: () => void;
};

export const GlossarySheet = ({ termId, isOpen, onClose }: GlossarySheetProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text } = useI18n();
  const insets = useSafeAreaInsets();
  const term = termId ? getGlossaryTerm(termId) : undefined;

  return (
    <Modal visible={isOpen && term !== undefined} transparent statusBarTranslucent animationType="slide" onRequestClose={onClose}>
      <Pressable
        style={[styles.backdrop, { backgroundColor: colors.overlay }]}
        onPress={onClose}
        accessibilityLabel={t('common.close')}
      />
      <View style={[styles.sheet, { backgroundColor: colors.bgPrimary, paddingBottom: insets.bottom + 16 }]}>
        <View style={[styles.handle, { backgroundColor: colors.border }]} />
        {term ? (
          <>
            <AppText variant="label" tone="muted">
              {t('glossary.label')}
            </AppText>
            <AppText variant="subtitle">{text(term.term)}</AppText>
            <FormattedText>{text(term.definition)}</FormattedText>
          </>
        ) : null}
        <Button title={t('common.close')} variant="secondary" onPress={onClose} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  sheet: {
    borderTopLeftRadius: CARD_BORDER_RADIUS + 8,
    borderTopRightRadius: CARD_BORDER_RADIUS + 8,
    paddingHorizontal: 16,
    paddingTop: 10,
    gap: 10,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 6,
  },
});
