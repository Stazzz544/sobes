export type SupportLink = {
  id: string;
  title: string;
  url: string;
};

export const FEEDBACK_EMAIL = '';

export const PRIVACY_POLICY_URL = 'https://stazzz544.github.io/sobes/privacy/';

export const CONTENT_PACKS_URL = process.env.EXPO_PUBLIC_CONTENT_URL ?? 'https://stazzz544.github.io/sobes/packs/v1';

export const SUPPORT_LINKS: readonly SupportLink[] = [];
