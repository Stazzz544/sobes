import { JSX } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@app/shared/theme';
import { AppText } from './app-text';
import type { IconName } from './button';

type EmptyStateProps = {
  icon: IconName;
  title: string;
  text: string;
};

export const EmptyState = ({ icon, title, text }: EmptyStateProps): JSX.Element => {
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={[styles.iconWrap, { backgroundColor: colors.accentSoft }]}>
        <Ionicons name={icon} size={36} color={colors.accentText} />
      </View>
      <AppText variant="subtitle" style={styles.center}>
        {title}
      </AppText>
      <AppText tone="secondary" style={styles.center}>
        {text}
      </AppText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingHorizontal: 24,
    paddingVertical: 48,
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    textAlign: 'center',
  },
});
