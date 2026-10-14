export type ColorScheme = 'light' | 'dark';

export type ThemePreference = 'system' | ColorScheme;

export type AccentName = 'brand' | 'javascript' | 'typescript' | 'react' | 'web' | 'css' | 'ai' | 'algorithms' | 'git' | 'hr';

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
      accent: '#C8F31D',
      onAccent: '#121417',
      accentSoft: '#F3FBD2',
      accentText: '#4D6200',
      headerBg: '#121417',
      headerText: '#C8F31D',
      headerBarStyle: 'light',
    },
    dark: {
      accent: '#C8F31D',
      onAccent: '#121417',
      accentSoft: '#252C0B',
      accentText: '#C8F31D',
      headerBg: '#121417',
      headerText: '#C8F31D',
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
  css: {
    light: {
      accent: '#663399',
      onAccent: '#FFFFFF',
      accentSoft: '#F1EAFA',
      accentText: '#663399',
      headerBg: '#663399',
      headerText: '#FFFFFF',
      headerBarStyle: 'light',
    },
    dark: {
      accent: '#B48EE8',
      onAccent: '#1E0F33',
      accentSoft: '#2A1B40',
      accentText: '#C9AEF0',
      headerBg: '#24153A',
      headerText: '#C9AEF0',
      headerBarStyle: 'light',
    },
  },
  ai: {
    light: {
      accent: '#047857',
      onAccent: '#FFFFFF',
      accentSoft: '#E3F7EF',
      accentText: '#047857',
      headerBg: '#059669',
      headerText: '#FFFFFF',
      headerBarStyle: 'light',
    },
    dark: {
      accent: '#34D399',
      onAccent: '#06281D',
      accentSoft: '#0F2E24',
      accentText: '#6EE7B7',
      headerBg: '#0B2A20',
      headerText: '#6EE7B7',
      headerBarStyle: 'light',
    },
  },
  git: {
    light: {
      accent: '#B91C1C',
      onAccent: '#FFFFFF',
      accentSoft: '#FDECEC',
      accentText: '#B91C1C',
      headerBg: '#B91C1C',
      headerText: '#FFFFFF',
      headerBarStyle: 'light',
    },
    dark: {
      accent: '#F87171',
      onAccent: '#2B0707',
      accentSoft: '#341313',
      accentText: '#FCA5A5',
      headerBg: '#2A0E0E',
      headerText: '#FCA5A5',
      headerBarStyle: 'light',
    },
  },
  hr: {
    light: {
      accent: '#B45309',
      onAccent: '#FFFFFF',
      accentSoft: '#FEF3E2',
      accentText: '#92400E',
      headerBg: '#B45309',
      headerText: '#FFFFFF',
      headerBarStyle: 'light',
    },
    dark: {
      accent: '#F59E0B',
      onAccent: '#2A1600',
      accentSoft: '#2E1F0A',
      accentText: '#FBBF24',
      headerBg: '#2A1A06',
      headerText: '#FBBF24',
      headerBarStyle: 'light',
    },
  },
  algorithms: {
    light: {
      accent: '#BE185D',
      onAccent: '#FFFFFF',
      accentSoft: '#FCE7F3',
      accentText: '#BE185D',
      headerBg: '#DB2777',
      headerText: '#FFFFFF',
      headerBarStyle: 'light',
    },
    dark: {
      accent: '#F472B6',
      onAccent: '#2A0A1A',
      accentSoft: '#3A1229',
      accentText: '#F9A8D4',
      headerBg: '#2A0F1F',
      headerText: '#F9A8D4',
      headerBarStyle: 'light',
    },
  },
};
