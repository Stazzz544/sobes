import { JSX } from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useUnit } from 'effector-react';
import { progressModel } from '@app/entities/progress';
import { QUESTIONS_BY_ID } from '@app/entities/question';
import { useI18n } from '@app/shared/i18n';
import { useTheme } from '@app/shared/theme';

export default function TabsLayout(): JSX.Element {
  const { colors } = useTheme();
  const { t } = useI18n();
  const { mistakeIds } = useUnit({ mistakeIds: progressModel.$mistakeIds });
  const mistakesCount = mistakeIds.filter((questionId) => QUESTIONS_BY_ID[questionId]).length;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accentText,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: { backgroundColor: colors.tabBarBg, borderTopColor: colors.border },
        tabBarLabelStyle: { fontWeight: '600' },
        headerStyle: { backgroundColor: colors.headerBg },
        headerTintColor: colors.headerText,
        headerTitleStyle: { fontWeight: '700', color: colors.headerText },
        sceneStyle: { backgroundColor: colors.bgPrimary },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Sobes',
          tabBarLabel: t('tabs.train'),
          tabBarIcon: ({ color, size }) => <Ionicons name="school-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="mistakes"
        options={{
          title: t('tabs.mistakes'),
          tabBarBadge: mistakesCount > 0 ? mistakesCount : undefined,
          tabBarBadgeStyle: { backgroundColor: colors.accent, color: colors.onAccent },
          tabBarIcon: ({ color, size }) => <Ionicons name="refresh-circle-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: t('tabs.stats'),
          tabBarIcon: ({ color, size }) => <Ionicons name="stats-chart-outline" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          tabBarIcon: ({ color, size }) => <Ionicons name="settings-outline" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
