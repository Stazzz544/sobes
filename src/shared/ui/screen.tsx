import { JSX, ReactNode } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SCREEN_PADDING } from '@app/shared/config';
import { useTheme } from '@app/shared/theme';
import type { StyleProp, ViewStyle } from 'react-native';

type ScreenProps = {
  children: ReactNode;
  withTopInset?: boolean;
  withBottomInset?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

export const Screen = ({
  children,
  withTopInset = false,
  withBottomInset = false,
  contentStyle,
}: ScreenProps): JSX.Element => {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: colors.bgPrimary }}
      contentContainerStyle={[
        styles.content,
        withTopInset && { paddingTop: insets.top + SCREEN_PADDING },
        withBottomInset && { paddingBottom: insets.bottom + SCREEN_PADDING * 2 },
        contentStyle,
      ]}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    padding: SCREEN_PADDING,
    paddingBottom: SCREEN_PADDING * 2,
    gap: 16,
  },
});
