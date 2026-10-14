import { ExpoConfig, ConfigContext } from 'expo/config';
import { version } from './package.json';

const [major = 0, minor = 0, patch = 0] = version.split('.').map(Number);
const VERSION_CODE = major * 10000 + minor * 100 + patch;

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: 'Sobes',
  slug: 'sobes',
  scheme: 'sobes',
  version,
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic',
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.sobes.app',
  },
  android: {
    package: 'com.sobes.app',
    versionCode: VERSION_CODE,
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundImage: './assets/adaptive-background.png',
      monochromeImage: './assets/adaptive-monochrome.png',
      backgroundColor: '#121417',
    },
    blockedPermissions: [
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.SYSTEM_ALERT_WINDOW',
      'com.google.android.gms.permission.AD_ID',
    ],
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
  },
  plugins: [
    'expo-router',
    'expo-localization',
    [
      'expo-splash-screen',
      {
        image: './assets/adaptive-icon.png',
        imageWidth: 200,
        backgroundColor: '#FFFFFF',
        dark: { backgroundColor: '#121214' },
      },
    ],
    ['expo-notifications', { icon: './assets/notification-icon.png', color: '#4D6200' }],
    './plugins/with-release-signing',
  ],
});
