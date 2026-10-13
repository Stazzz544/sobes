import { createContext, useMemo, JSX, ReactNode } from 'react';
import { useColorScheme } from 'react-native';
import { ACCENT_COLORS, BASE_COLORS } from './colors';
import type { AccentName, ColorScheme, ThemeColors, ThemePreference } from './colors';

export type ThemeContextValue = {
  colors: ThemeColors;
  scheme: ColorScheme;
  isDark: boolean;
  accent: AccentName;
};

export const ThemeContext = createContext<ThemeContextValue | null>(null);

type ThemeProviderProps = {
  preference: ThemePreference;
  accent: AccentName;
  children: ReactNode;
};

export const ThemeProvider = ({ preference, accent, children }: ThemeProviderProps): JSX.Element => {
  const systemScheme = useColorScheme();
  const systemResolved: ColorScheme = systemScheme === 'dark' ? 'dark' : 'light';
  const scheme = preference === 'system' ? systemResolved : preference;

  const value = useMemo(
    (): ThemeContextValue => ({
      colors: { ...BASE_COLORS[scheme], ...ACCENT_COLORS[accent][scheme] },
      scheme,
      isDark: scheme === 'dark',
      accent,
    }),
    [scheme, accent],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
