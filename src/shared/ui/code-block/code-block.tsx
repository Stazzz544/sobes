import { JSX, useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Clipboard from 'expo-clipboard';
import { BORDER_RADIUS } from '@app/shared/config';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';
import { FormattedText } from '../formatted-text';
import { tokenize } from './tokenize';
import type { ThemeColors } from '@app/shared/theme';
import type { CodeLanguage, Token, TokenKind } from './tokenize';

type CodeTokensProps = {
  tokens: Token[];
};

type CodeBlockProps = {
  source: string;
  lang: CodeLanguage;
  caption?: string;
};

const TOKEN_COLOR: Record<TokenKind, keyof ThemeColors> = {
  plain: 'codeText',
  keyword: 'codeKeyword',
  string: 'codeString',
  number: 'codeNumber',
  comment: 'codeComment',
  function: 'codeFunction',
  punctuation: 'codePunctuation',
};

export const CodeTokens = ({ tokens }: CodeTokensProps): JSX.Element => {
  const { colors } = useTheme();

  return (
    <>
      {tokens.map((token, index) => (
        <Text key={index} style={{ color: colors[TOKEN_COLOR[token.kind]] }}>
          {token.value}
        </Text>
      ))}
    </>
  );
};

export const CodeBlock = ({ source, lang, caption }: CodeBlockProps): JSX.Element => {
  const { colors } = useTheme();
  const { t } = useI18n();
  const tokens = useMemo(() => tokenize(source, lang), [source, lang]);

  const handleCopy = (): void => {
    Clipboard.setStringAsync(source).then(() => ToastAndroid.show(t('common.copied'), ToastAndroid.SHORT));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.codeBg, borderColor: colors.border }]}>
      <View style={styles.header}>
        <Text style={[styles.lang, { color: colors.codeComment }]}>{lang}</Text>
        <Pressable
          onPress={handleCopy}
          hitSlop={15}
          accessibilityRole="button"
          accessibilityLabel={t('common.copyCode')}
        >
          <Ionicons name="copy-outline" size={18} color={colors.codeComment} />
        </Pressable>
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <Text style={[styles.code, { color: colors.codeText }]} selectable>
          <CodeTokens tokens={tokens} />
        </Text>
      </ScrollView>
      {caption ? (
        <View style={styles.caption}>
          <FormattedText variant="caption" tone="secondary">
            {caption}
          </FormattedText>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    borderWidth: 1,
    paddingVertical: 10,
    gap: 6,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 14,
  },
  lang: {
    fontFamily: 'monospace',
    fontSize: 11,
    textTransform: 'uppercase',
  },
  scroll: {
    paddingHorizontal: 14,
  },
  code: {
    fontFamily: 'monospace',
    fontSize: 13,
    lineHeight: 20,
  },
  caption: {
    paddingHorizontal: 14,
  },
});
