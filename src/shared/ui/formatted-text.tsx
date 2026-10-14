import { JSX, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '@app/shared/theme';
import { AppText } from './app-text';
import type { TextTone, TextVariant } from './app-text';

type FormattedTextProps = {
  children: string;
  variant?: TextVariant;
  tone?: TextTone;
  onTermPress?: (termId: string) => void;
};

type Segment = {
  kind: 'plain' | 'code' | 'bold' | 'term';
  value: string;
  termId?: string;
};

const SEGMENT_PATTERN = /`([^`]+)`|\*\*([^*]+)\*\*|\[\[([a-z0-9-]+)\|([^\]]+)\]\]/g;

const splitSegments = (source: string): Segment[] => {
  const segments: Segment[] = [];
  let cursor = 0;
  for (const match of source.matchAll(SEGMENT_PATTERN)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      segments.push({ kind: 'plain', value: source.slice(cursor, index) });
    }
    if (match[1] !== undefined) {
      segments.push({ kind: 'code', value: match[1] });
    } else if (match[3] !== undefined) {
      segments.push({ kind: 'term', value: match[4] ?? '', termId: match[3] });
    } else {
      segments.push({ kind: 'bold', value: match[2] ?? '' });
    }
    cursor = index + match[0].length;
  }
  if (cursor < source.length) {
    segments.push({ kind: 'plain', value: source.slice(cursor) });
  }
  return segments;
};

export const FormattedText = ({
  children,
  variant = 'body',
  tone = 'primary',
  onTermPress,
}: FormattedTextProps): JSX.Element => {
  const { colors } = useTheme();
  const segments = useMemo(() => splitSegments(children), [children]);

  return (
    <AppText variant={variant} tone={tone}>
      {segments.map((segment, index) => {
        if (segment.kind === 'code') {
          return (
            <Text key={index} style={[styles.code, { backgroundColor: colors.codeBg, color: colors.codeText }]}>
              {` ${segment.value} `}
            </Text>
          );
        }
        if (segment.kind === 'term' && onTermPress) {
          const termId = segment.termId ?? '';
          return (
            <Text
              key={index}
              onPress={() => onTermPress(termId)}
              accessibilityRole="link"
              style={[styles.term, { color: colors.accentText }]}
            >
              {segment.value}
            </Text>
          );
        }
        if (segment.kind === 'term') {
          return segment.value;
        }
        if (segment.kind === 'bold') {
          return (
            <Text key={index} style={styles.bold}>
              {segment.value}
            </Text>
          );
        }
        return segment.value;
      })}
    </AppText>
  );
};

const styles = StyleSheet.create({
  code: {
    fontFamily: 'monospace',
    fontSize: 14,
  },
  bold: {
    fontWeight: '700',
  },
  term: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'dotted',
  },
});
