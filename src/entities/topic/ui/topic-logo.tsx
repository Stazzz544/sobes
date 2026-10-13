import { JSX } from 'react';
import Svg, { Circle, Ellipse, G, Rect, Text as SvgText } from 'react-native-svg';
import type { TopicSelection } from '../model/types';

type TopicLogoProps = {
  topic: TopicSelection;
  size?: number;
};

const LOGO_COLORS = {
  jsYellow: '#F7DF1E',
  tsBlue: '#3178C6',
  reactCyan: '#61DAFB',
  reactDark: '#20232A',
  html: '#E34F26',
  black: '#000000',
  white: '#FFFFFF',
} as const;

const LetterMark = ({ size, background, foreground, label }: { size: number; background: string; foreground: string; label: string }): JSX.Element => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect width={64} height={64} rx={12} fill={background} />
    <SvgText x={58} y={56} textAnchor="end" fontSize={label.length > 2 ? 24 : 28} fontWeight="bold" fill={foreground}>
      {label}
    </SvgText>
  </Svg>
);

const ReactMark = ({ size }: { size: number }): JSX.Element => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect width={64} height={64} rx={12} fill={LOGO_COLORS.reactDark} />
    <G stroke={LOGO_COLORS.reactCyan} strokeWidth={2.6} fill="none">
      <Ellipse cx={32} cy={32} rx={24} ry={9.5} />
      <Ellipse cx={32} cy={32} rx={24} ry={9.5} transform="rotate(60 32 32)" />
      <Ellipse cx={32} cy={32} rx={24} ry={9.5} transform="rotate(120 32 32)" />
    </G>
    <Circle cx={32} cy={32} r={4.6} fill={LOGO_COLORS.reactCyan} />
  </Svg>
);

const WebMark = ({ size }: { size: number }): JSX.Element => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect width={64} height={64} rx={12} fill={LOGO_COLORS.html} />
    <SvgText x={32} y={41} textAnchor="middle" fontSize={24} fontWeight="bold" fill={LOGO_COLORS.white}>
      {'</>'}
    </SvgText>
  </Svg>
);

const AllMark = ({ size }: { size: number }): JSX.Element => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect x={2} y={2} width={28} height={28} rx={8} fill={LOGO_COLORS.jsYellow} />
    <Rect x={34} y={2} width={28} height={28} rx={8} fill={LOGO_COLORS.tsBlue} />
    <Rect x={2} y={34} width={28} height={28} rx={8} fill={LOGO_COLORS.reactDark} />
    <Circle cx={16} cy={48} r={6} fill={LOGO_COLORS.reactCyan} />
    <Rect x={34} y={34} width={28} height={28} rx={8} fill={LOGO_COLORS.html} />
  </Svg>
);

export const TopicLogo = ({ topic, size = 40 }: TopicLogoProps): JSX.Element => {
  if (topic === 'javascript') {
    return <LetterMark size={size} background={LOGO_COLORS.jsYellow} foreground={LOGO_COLORS.black} label="JS" />;
  }
  if (topic === 'typescript') {
    return <LetterMark size={size} background={LOGO_COLORS.tsBlue} foreground={LOGO_COLORS.white} label="TS" />;
  }
  if (topic === 'react') {
    return <ReactMark size={size} />;
  }
  if (topic === 'web') {
    return <WebMark size={size} />;
  }
  return <AllMark size={size} />;
};
