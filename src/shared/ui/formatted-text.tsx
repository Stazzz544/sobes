import { JSX, useMemo } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '@app/shared/theme';
import { AppText } from './app-text';
import type { TextTone, TextVariant } from './app-text';

type FormattedTextProps = {
  children: string;
  variant?: TextVariant;
  tone?: TextTone;
};

type Segment = {
  kind: 'plain' | 'code' | 'bold';
  value: string;
};

const SEGMENT_PATTERN = /`([^`]+)`|\*\*([^*]+)\*\*/g;

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

export const FormattedText = ({ children, variant = 'body', tone = 'primary' }: FormattedTextProps): JSX.Element => {
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
});
