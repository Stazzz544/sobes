import type { Locale } from '@app/shared/i18n';
import type { ThemeColors } from '@app/shared/theme';
import type { Illustration } from '../model/types';

export const ILLUSTRATION_COLORS = [
  'textPrimary',
  'textSecondary',
  'textMuted',
  'bgPrimary',
  'bgSecondary',
  'bgCard',
  'border',
  'success',
  'successSoft',
  'danger',
  'dangerSoft',
  'warning',
  'warningSoft',
  'accent',
  'accentSoft',
  'accentText',
  'onAccent',
  'codeBg',
  'codeText',
] as const satisfies readonly (keyof ThemeColors)[];

export type IllustrationColor = (typeof ILLUSTRATION_COLORS)[number];

// только цвета, контраст которых с фоном проверяет checkContrast
export const ILLUSTRATION_TEXT_COLORS: readonly IllustrationColor[] = [
  'textPrimary',
  'textSecondary',
  'textMuted',
  'success',
  'danger',
  'accentText',
  'onAccent',
];

export const COLOR_TOKEN = /\{\{color\.([a-zA-Z]+)\}\}/g;

export const LABEL_TOKEN = /\{\{label\.([a-zA-Z0-9-]+)\}\}/g;

const isIllustrationColor = (name: string): name is IllustrationColor => ILLUSTRATION_COLORS.some((color) => color === name);

const escapeXml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const renderIllustration = (
  illustration: Illustration,
  colors: Readonly<Record<IllustrationColor, string>>,
  locale: Locale,
): string =>
  illustration.svg
    .replace(COLOR_TOKEN, (_, name: string) => (isIllustrationColor(name) ? colors[name] : 'none'))
    .replace(LABEL_TOKEN, (_, key: string) => escapeXml(illustration.labels[key]?.[locale] ?? ''));

export const readViewBox = (svg: string): { width: number; height: number } | null => {
  const match = /viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/.exec(svg);
  return match ? { width: Number(match[1]), height: Number(match[2]) } : null;
};
