import { JSX, Ref } from 'react';
import { StyleSheet, View } from 'react-native';
import { TOPICS, TopicLogo } from '@app/entities/topic';
import { useI18n } from '@app/shared/i18n';
import { ACCENT_COLORS, BASE_COLORS } from '@app/shared/theme';
import { AppText } from '@app/shared/ui';
import type { QuizMode } from '@app/entities/question';
import type { TopicSelection } from '@app/shared/config';
import type { SessionSummary } from '../model/quiz-session-model';

type ResultCardProps = {
  summary: SessionSummary;
  mode: QuizMode;
  topic: TopicSelection;
  ref?: Ref<View>;
};

// картинка уходит в чужие чаты, поэтому палитра фиксированная, а не из текущей темы
const BASE = BASE_COLORS.dark;
const ACCENT = ACCENT_COLORS.brand.dark;

export const ResultCard = ({ summary, mode, topic, ref }: ResultCardProps): JSX.Element => {
  const { t, text, locale } = useI18n();
  const percent = summary.total > 0 ? Math.round((summary.correct / summary.total) * 100) : 0;
  const topicTitle = topic === 'all' ? t('topics.all') : text(TOPICS[topic].title);
  const date = new Date().toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <View ref={ref} collapsable={false} style={[styles.card, { backgroundColor: BASE.bgPrimary, borderColor: ACCENT.accent }]}>
      <View style={styles.header}>
        <TopicLogo topic={topic} size={44} />
        <View style={styles.headerTexts}>
          <AppText variant="subtitle" style={{ color: BASE.textPrimary }}>
            {topicTitle}
          </AppText>
          <AppText variant="caption" style={{ color: BASE.textSecondary }}>
            {`${t(`home.modes.${mode}.title`)} · ${date}`}
          </AppText>
        </View>
      </View>
      <View>
        <AppText variant="display" style={[styles.score, { color: ACCENT.accent }]}>
          {`${summary.correct} / ${summary.total}`}
        </AppText>
        <AppText style={{ color: BASE.textSecondary }}>{t('share.correctOf', { percent })}</AppText>
      </View>
      {summary.level ? (
        <View style={[styles.level, { backgroundColor: ACCENT.accentSoft }]}>
          <AppText variant="bodyStrong" style={{ color: ACCENT.accentText }}>
            {t(`quiz.level.${summary.level}`)}
          </AppText>
        </View>
      ) : null}
      <View style={[styles.footer, { borderTopColor: BASE.border }]}>
        <AppText variant="bodyStrong" style={{ color: ACCENT.accent }}>
          {t('common.appName')}
        </AppText>
        <AppText variant="caption" style={[styles.footerText, { color: BASE.textMuted }]}>
          {t('share.tagline')}
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 320,
    maxWidth: '100%',
    padding: 24,
    gap: 20,
    borderRadius: 24,
    borderWidth: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTexts: {
    flex: 1,
    minWidth: 0,
  },
  score: {
    fontSize: 48,
    lineHeight: 56,
  },
  level: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingTop: 14,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  footerText: {
    flex: 1,
    minWidth: 0,
    textAlign: 'right',
  },
});
