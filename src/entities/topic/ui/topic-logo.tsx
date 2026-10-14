import { JSX } from 'react';
import Svg, { Circle, Ellipse, G, Path, Rect, Text as SvgText } from 'react-native-svg';
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
  cssPurple: '#663399',
  aiEmerald: '#059669',
  aiMint: '#A7F3D0',
  algoPink: '#DB2777',
  algoBlush: '#FBCFE8',
  hrAmber: '#B45309',
  gitRed: '#B91C1C',
  htmlTeal: '#0F766E',
  testSky: '#0369A1',
  testIce: '#BAE6FD',
  stateSlate: '#334155',
  stateMist: '#CBD5E1',
  nodeGreen: '#3D7A32',
  hrCream: '#FDE68A',
  black: '#000000',
  white: '#FFFFFF',
} as const;

const ALGO_BARS = [
  { x: 11, height: 10 },
  { x: 23, height: 18 },
  { x: 35, height: 27 },
  { x: 47, height: 36 },
];

const AlgoMark = ({ size }: { size: number }): JSX.Element => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect width={64} height={64} rx={12} fill={LOGO_COLORS.algoPink} />
    {ALGO_BARS.map((bar, index) => (
      <Rect
        key={bar.x}
        x={bar.x}
        y={50 - bar.height}
        width={8}
        height={bar.height}
        rx={2}
        fill={index === ALGO_BARS.length - 1 ? LOGO_COLORS.white : LOGO_COLORS.algoBlush}
      />
    ))}
  </Svg>
);

const HtmlMark = ({ size }: { size: number }): JSX.Element => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect width={64} height={64} rx={12} fill={LOGO_COLORS.htmlTeal} />
    <Circle cx={32} cy={14} r={5.5} fill={LOGO_COLORS.white} />
    <G stroke={LOGO_COLORS.white} strokeWidth={4.5} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M15 25 H49" />
      <Path d="M32 25 V38" />
      <Path d="M23 52 L32 38 L41 52" />
    </G>
  </Svg>
);

const TestingMark = ({ size }: { size: number }): JSX.Element => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect width={64} height={64} rx={12} fill={LOGO_COLORS.testSky} />
    <G stroke={LOGO_COLORS.white} strokeWidth={4} fill="none" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M11 19 L15 23 L23 14" />
      <Path d="M11 41 L15 45 L23 36" />
    </G>
    <G stroke={LOGO_COLORS.testIce} strokeWidth={4} strokeLinecap="round">
      <Path d="M31 19 H53" />
      <Path d="M31 41 H53" />
    </G>
  </Svg>
);

const NodeMark = ({ size }: { size: number }): JSX.Element => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect width={64} height={64} rx={12} fill={LOGO_COLORS.nodeGreen} />
    <Path
      d="M32 9 L52 20.5 V43.5 L32 55 L12 43.5 V20.5 Z"
      fill="none"
      stroke={LOGO_COLORS.white}
      strokeWidth={3.5}
      strokeLinejoin="round"
    />
    <SvgText x={32} y={39} textAnchor="middle" fontSize={17} fontWeight="bold" fill={LOGO_COLORS.white}>
      JS
    </SvgText>
  </Svg>
);

const StateMark = ({ size }: { size: number }): JSX.Element => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect width={64} height={64} rx={12} fill={LOGO_COLORS.stateSlate} />
    <Rect x={22} y={10} width={20} height={14} rx={4} fill={LOGO_COLORS.white} />
    <G stroke={LOGO_COLORS.stateMist} strokeWidth={3.5} fill="none" strokeLinecap="round">
      <Path d="M32 24 V32 M14 32 H50 M14 32 V38 M32 32 V38 M50 32 V38" />
    </G>
    <Circle cx={14} cy={45} r={6} fill={LOGO_COLORS.stateMist} />
    <Circle cx={32} cy={45} r={6} fill={LOGO_COLORS.stateMist} />
    <Circle cx={50} cy={45} r={6} fill={LOGO_COLORS.stateMist} />
  </Svg>
);

const GitMark = ({ size }: { size: number }): JSX.Element => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect width={64} height={64} rx={12} fill={LOGO_COLORS.gitRed} />
    <G stroke={LOGO_COLORS.white} strokeWidth={4} fill="none" strokeLinecap="round">
      <Path d="M22 17 V47" />
      <Path d="M42 23 C42 34 22 30 22 41" />
    </G>
    <Circle cx={22} cy={15} r={5.5} fill={LOGO_COLORS.white} />
    <Circle cx={22} cy={49} r={5.5} fill={LOGO_COLORS.white} />
    <Circle cx={42} cy={21} r={5.5} fill={LOGO_COLORS.white} />
  </Svg>
);

const HrMark = ({ size }: { size: number }): JSX.Element => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect width={64} height={64} rx={12} fill={LOGO_COLORS.hrAmber} />
    <Path d="M10 14 H38 A5 5 0 0 1 43 19 V31 A5 5 0 0 1 38 36 H22 L14 43 V36 H10 A5 5 0 0 1 5 31 V19 A5 5 0 0 1 10 14 Z" fill={LOGO_COLORS.white} />
    <Path d="M28 30 H54 A5 5 0 0 1 59 35 V46 A5 5 0 0 1 54 51 H52 V57 L45 51 H28 A5 5 0 0 1 23 46 V35 A5 5 0 0 1 28 30 Z" fill={LOGO_COLORS.hrCream} />
  </Svg>
);

const AiMark = ({ size }: { size: number }): JSX.Element => (
  <Svg width={size} height={size} viewBox="0 0 64 64">
    <Rect width={64} height={64} rx={12} fill={LOGO_COLORS.aiEmerald} />
    <Path
      d="M28 13 C29.6 26 32 28.4 45 30 C32 31.6 29.6 34 28 47 C26.4 34 24 31.6 11 30 C24 28.4 26.4 26 28 13 Z"
      fill={LOGO_COLORS.white}
    />
    <Path
      d="M47 8 C47.7 13.4 48.6 14.3 54 15 C48.6 15.7 47.7 16.6 47 22 C46.3 16.6 45.4 15.7 40 15 C45.4 14.3 46.3 13.4 47 8 Z"
      fill={LOGO_COLORS.aiMint}
    />
  </Svg>
);

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
  if (topic === 'css') {
    return <LetterMark size={size} background={LOGO_COLORS.cssPurple} foreground={LOGO_COLORS.white} label="CSS" />;
  }
  if (topic === 'ai') {
    return <AiMark size={size} />;
  }
  if (topic === 'algorithms') {
    return <AlgoMark size={size} />;
  }
  if (topic === 'html') {
    return <HtmlMark size={size} />;
  }
  if (topic === 'testing') {
    return <TestingMark size={size} />;
  }
  if (topic === 'state') {
    return <StateMark size={size} />;
  }
  if (topic === 'node') {
    return <NodeMark size={size} />;
  }
  if (topic === 'git') {
    return <GitMark size={size} />;
  }
  if (topic === 'hr') {
    return <HrMark size={size} />;
  }
  return <AllMark size={size} />;
};
