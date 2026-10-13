export type ColorScheme = 'light' | 'dark';

export type ThemePreference = 'system' | ColorScheme;

export type AccentName = 'brand' | 'javascript' | 'typescript' | 'react' | 'web';

export type BaseColors = {
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  bgPrimary: string;
  bgSecondary: string;
  bgCard: string;
  border: string;
  success: string;
  successSoft: string;
  danger: string;
  dangerSoft: string;
  warning: string;
  warningSoft: string;
  tabBarBg: string;
  overlay: string;
  codeBg: string;
  codeText: string;
  codeKeyword: string;
  codeString: string;
  codeNumber: string;
  codeComment: string;
  codeFunction: string;
  codePunctuation: string;
};

export type AccentColors = {
  accent: string;
  onAccent: string;
  accentSoft: string;
  accentText: string;
  headerBg: string;
  headerText: string;
  headerBarStyle: 'light' | 'dark';
};

export type ThemeColors = BaseColors & AccentColors;

export const BASE_COLORS: Record<ColorScheme, BaseColors> = {
  light: {
    textPrimary: '#14141F',
    textSecondary: '#545465',
    textMuted: '#6A6A7A',
    bgPrimary: '#FFFFFF',
    bgSecondary: '#F4F4F7',
    bgCard: '#FFFFFF',
    border: '#E2E2EA',
    success: '#136E52',
    successSoft: '#E3F5EE',
    danger: '#C42B3B',
    dangerSoft: '#FDE8EA',
    warning: '#9A6400',
    warningSoft: '#FDF3E1',
    tabBarBg: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.45)',
    codeBg: '#F6F8FA',
    codeText: '#24292F',
    codeKeyword: '#CF222E',
    codeString: '#0A3069',
    codeNumber: '#0550AE',
    codeComment: '#6E7781',
    codeFunction: '#8250DF',
    codePunctuation: '#57606A',
  },
  dark: {
    textPrimary: '#F2F2F7',
    textSecondary: '#A0A0B0',
    textMuted: '#8A8A9A',
    bgPrimary: '#121214',
    bgSecondary: '#1C1C22',
    bgCard: '#1C1C22',
    border: '#2C2C36',
    success: '#3DD4B4',
    successSoft: '#12322B',
    danger: '#FF8A92',
    dangerSoft: '#3A1A1E',
    warning: '#F2C14E',
    warningSoft: '#3A2F12',
    tabBarBg: '#121214',
    overlay: 'rgba(0, 0, 0, 0.6)',
    codeBg: '#0D1117',
    codeText: '#E6EDF3',
    codeKeyword: '#FF7B72',
    codeString: '#A5D6FF',
    codeNumber: '#79C0FF',
    codeComment: '#8B949E',
    codeFunction: '#D2A8FF',
    codePunctuation: '#8B949E',
  },
};

export const ACCENT_COLORS: Record<AccentName, Record<ColorScheme, AccentColors>> = {
  brand: {
    light: {
      accent: '#6D4AFF',
      onAccent: '#FFFFFF',
      accentSoft: '#EFEBFF',
      accentText: '#5535E0',
      headerBg: '#FFFFFF',
      headerText: '#14141F',
      headerBarStyle: 'dark',
    },
    dark: {
      accent: '#8B73FF',
      onAccent: '#121214',
      accentSoft: '#252040',
      accentText: '#A897FF',
      headerBg: '#121214',
      headerText: '#F2F2F7',
      headerBarStyle: 'light',
    },
  },
  javascript: {
    light: {
      accent: '#F7DF1E',
      onAccent: '#000000',
      accentSoft: '#FEF9D6',
      accentText: '#5C5000',
      headerBg: '#F7DF1E',
      headerText: '#000000',
      headerBarStyle: 'dark',
    },
    dark: {
      accent: '#F7DF1E',
      onAccent: '#000000',
      accentSoft: '#2E2A0A',
      accentText: '#F7DF1E',
      headerBg: '#000000',
      headerText: '#F7DF1E',
      headerBarStyle: 'light',
    },
  },
  typescript: {
    light: {
      accent: '#3178C6',
      onAccent: '#FFFFFF',
      accentSoft: '#E6F0FA',
      accentText: '#235A97',
      headerBg: '#3178C6',
      headerText: '#FFFFFF',
      headerBarStyle: 'light',
    },
    dark: {
      accent: '#3178C6',
      onAccent: '#FFFFFF',
      accentSoft: '#13253A',
      accentText: '#7FB2EA',
      headerBg: '#235A97',
      headerText: '#FFFFFF',
      headerBarStyle: 'light',
    },
  },
  react: {
    light: {
      accent: '#61DAFB',
      onAccent: '#20232A',
      accentSoft: '#E7F8FD',
      accentText: '#06708F',
      headerBg: '#20232A',
      headerText: '#61DAFB',
      headerBarStyle: 'light',
    },
    dark: {
      accent: '#61DAFB',
      onAccent: '#20232A',
      accentSoft: '#10303A',
      accentText: '#61DAFB',
      headerBg: '#20232A',
      headerText: '#61DAFB',
      headerBarStyle: 'light',
    },
  },
  web: {
    light: {
      accent: '#D2431C',
      onAccent: '#FFFFFF',
      accentSoft: '#FDECE7',
      accentText: '#B83A17',
      headerBg: '#E34F26',
      headerText: '#FFFFFF',
      headerBarStyle: 'light',
    },
    dark: {
      accent: '#F06529',
      onAccent: '#121214',
      accentSoft: '#3A1A10',
      accentText: '#FF8A5C',
      headerBg: '#2A140D',
      headerText: '#FF8A5C',
      headerBarStyle: 'light',
    },
  },
};
