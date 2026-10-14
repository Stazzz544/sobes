import { JSX, useRef, useState } from 'react';
import { Modal, ScrollView, StyleSheet, ToastAndroid, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Sharing from 'expo-sharing';
import { useUnit } from 'effector-react';
import { captureRef } from 'react-native-view-shot';
import { trackEventFx } from '@app/shared/analytics';
import { SCREEN_PADDING } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { Button } from '@app/shared/ui';
import { ResultCard } from './result-card';
import type { QuizMode } from '@app/entities/question';
import type { TopicSelection } from '@app/shared/config';
import type { SessionSummary } from '../model/quiz-session-model';

type ShareResultButtonProps = {
  summary: SessionSummary;
  mode: QuizMode;
  topic: TopicSelection;
};

export const ShareResultButton = ({ summary, mode, topic }: ShareResultButtonProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const insets = useSafeAreaInsets();
  const cardRef = useRef<View>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const { onTrack } = useUnit({ onTrack: trackEventFx });

  const handleShare = async (): Promise<void> => {
    setIsSharing(true);
    try {
      const uri = await captureRef(cardRef, { format: 'png', quality: 1, result: 'tmpfile' });
      await Sharing.shareAsync(uri, { mimeType: 'image/png', dialogTitle: t('share.button') });
      onTrack({
        name: 'result_shared',
        params: {
          mode,
          topic,
          score_percent: summary.total > 0 ? Math.round((summary.correct / summary.total) * 100) : 0,
        },
      });
      setIsOpen(false);
    } catch {
      ToastAndroid.show(t('share.error'), ToastAndroid.SHORT);
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <>
      <Button title={t('share.button')} icon="share-social-outline" variant="secondary" onPress={() => setIsOpen(true)} />
      <Modal visible={isOpen} statusBarTranslucent animationType="slide" onRequestClose={() => setIsOpen(false)}>
        <View style={[styles.backdrop, { backgroundColor: colors.bgPrimary }]}>
          <ScrollView
            contentContainerStyle={[
              styles.content,
              { paddingTop: insets.top + SCREEN_PADDING, paddingBottom: insets.bottom + SCREEN_PADDING },
            ]}
          >
            <ResultCard ref={cardRef} summary={summary} mode={mode} topic={topic} />
            <View style={styles.actions}>
              <Button
                title={t('share.send')}
                icon="share-social-outline"
                disabled={isSharing}
                onPress={handleShare}
                style={styles.action}
              />
              <Button title={t('common.close')} variant="ghost" onPress={() => setIsOpen(false)} style={styles.action} />
            </View>
          </ScrollView>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: SCREEN_PADDING,
  },
  actions: {
    width: 320,
    maxWidth: '100%',
    gap: 10,
  },
  action: {
    alignSelf: 'stretch',
  },
});
