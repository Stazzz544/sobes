import { JSX } from 'react';
import { router } from 'expo-router';
import { StatsDashboard } from '@app/widgets/stats-dashboard';

export default function StatsScreen(): JSX.Element {
  return (
    <StatsDashboard
      onPracticeTag={(topic, tag) => router.push({ pathname: '/quiz', params: { mode: 'practice', topic, tag } })}
    />
  );
}
