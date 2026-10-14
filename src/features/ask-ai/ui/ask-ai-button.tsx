import { JSX, useState } from 'react';
import { Linking, Modal, Pressable, Share, StyleSheet, ToastAndroid, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { useUnit } from 'effector-react';
import { settingsModel } from '@app/entities/settings';
import { trackEventFx } from '@app/shared/analytics';
import { CARD_BORDER_RADIUS, MIN_TOUCH_SIZE } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { AppText, Button } from '@app/shared/ui';
import { AI_PROVIDERS } from '../config/providers';
import { buildAiPrompt } from '../lib/build-prompt';
import type { OptionId, Question } from '@app/entities/question';
import type { IconName } from '@app/shared/ui';
import type { AiProvider } from '../config/providers';

type AskAiButtonProps = {
  question: Question;
  chosen?: OptionId | null;
};

type SheetRowProps = {
  icon: IconName;
  title: string;
  subtitle?: string;
  isHighlighted?: boolean;
  onPress: () => void;
};

const SheetRow = ({ icon, title, subtitle, isHighlighted = false, onPress }: SheetRowProps): JSX.Element => {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [
        styles.row,
        { backgroundColor: isHighlighted ? colors.accentSoft : colors.bgSecondary },
        pressed && styles.pressed,
      ]}
    >
      <Ionicons name={icon} size={22} color={isHighlighted ? colors.accentText : colors.textSecondary} />
      <View style={styles.rowTexts}>
        <AppText variant="bodyStrong">{title}</AppText>
        {subtitle ? (
          <AppText variant="caption" tone="secondary">
            {subtitle}
          </AppText>
        ) : null}
      </View>
    </Pressable>
  );
};

export const AskAiButton = ({ question, chosen }: AskAiButtonProps): JSX.Element => {
  const { colors } = useTheme();
  const { t, text, locale } = useI18n();
  const insets = useSafeAreaInsets();
  const [isOpen, setIsOpen] = useState(false);
  const { settings, onSettingsChange, onTrack } = useUnit({
    settings: settingsModel.$settings,
    onSettingsChange: settingsModel.settingsChanged,
    onTrack: trackEventFx,
  });
  const lastProvider = settings.aiProvider;
  const prompt = buildAiPrompt(question, chosen, locale);

  const trackTarget = (target: string): void => {
    onTrack({ name: 'ask_ai_used', params: { question_id: question.id, target } });
  };

  const handleProvider = async (provider: AiProvider): Promise<void> => {
    setIsOpen(false);
    trackTarget(provider.id);
    onSettingsChange({ aiProvider: provider.id });
    await Clipboard.setStringAsync(prompt);
    ToastAndroid.show(provider.hasPrefill ? t('askAi.toastPrefilled') : t('askAi.toastCopied'), ToastAndroid.LONG);
    await Linking.openURL(provider.buildUrl(prompt));
  };

  const handleShare = async (): Promise<void> => {
    setIsOpen(false);
    trackTarget('share');
    await Share.share({ message: prompt });
  };

  const handleCopy = async (): Promise<void> => {
    setIsOpen(false);
    trackTarget('copy');
    await Clipboard.setStringAsync(prompt);
    ToastAndroid.show(t('common.copied'), ToastAndroid.SHORT);
  };

  return (
    <>
      <Button title={t('askAi.button')} icon="sparkles-outline" variant="secondary" onPress={() => setIsOpen(true)} />
      <Modal
        visible={isOpen}
        transparent
        statusBarTranslucent
        animationType="slide"
        onRequestClose={() => setIsOpen(false)}
      >
        <Pressable
          style={[styles.backdrop, { backgroundColor: colors.overlay }]}
          onPress={() => setIsOpen(false)}
          accessibilityLabel={t('common.close')}
        />
        <View style={[styles.sheet, { backgroundColor: colors.bgPrimary, paddingBottom: insets.bottom + 16 }]}>
          <View style={[styles.handle, { backgroundColor: colors.border }]} />
          <AppText variant="subtitle">{t('askAi.title')}</AppText>
          <AppText variant="caption" tone="secondary">
            {t('askAi.description')}
          </AppText>
          <View style={styles.list}>
            {AI_PROVIDERS.map((provider) => (
              <SheetRow
                key={provider.id}
                icon="globe-outline"
                title={text(provider.name)}
                subtitle={provider.id === lastProvider ? `${text(provider.hint)} · ${t('askAi.lastUsed')}` : text(provider.hint)}
                isHighlighted={provider.id === lastProvider}
                onPress={() => handleProvider(provider)}
              />
            ))}
            <SheetRow icon="share-social-outline" title={t('askAi.otherApp')} onPress={handleShare} />
            <SheetRow icon="copy-outline" title={t('askAi.copyOnly')} onPress={handleCopy} />
          </View>
        </View>
      </Modal>
    </>
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
    gap: 8,
  },
  handle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    marginBottom: 6,
  },
  list: {
    gap: 8,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: MIN_TOUCH_SIZE + 4,
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: CARD_BORDER_RADIUS,
  },
  rowTexts: {
    flex: 1,
    minWidth: 0,
  },
  pressed: {
    opacity: 0.8,
  },
});
