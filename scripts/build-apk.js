const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const ANDROID_DIR = path.join(PROJECT_ROOT, 'android');
const RELEASE_DIR = path.join(ANDROID_DIR, 'app', 'build', 'outputs', 'apk', 'release');
const GRADLE_APK_PATH = path.join(RELEASE_DIR, 'app-release.apk');
const IS_EMULATOR_BUILD = process.argv.includes('--emulator');
// ARM-only APK падает на x86_64-эмуляторе: SoLoader ищет библиотеки под первую ABI устройства
const ARCHITECTURES = IS_EMULATOR_BUILD ? 'x86_64' : 'arm64-v8a,armeabi-v7a';
const DIST_DIR = path.join(PROJECT_ROOT, 'dist');
const APK_PATH = path.join(DIST_DIR, IS_EMULATOR_BUILD ? 'sobes-emulator.apk' : 'sobes.apk');
const DEFAULT_JAVA_HOME = 'C:\\Program Files\\Android\\Android Studio\\jbr';
const DEFAULT_ANDROID_HOME = path.join(process.env.LOCALAPPDATA ?? '', 'Android', 'Sdk');
const GRADLE_PROPERTIES = path.join(process.env.GRADLE_USER_HOME || path.join(os.homedir(), '.gradle'), 'gradle.properties');
const RELEASE_KEY_PROPERTY = 'SOBES_RELEASE_STORE_FILE';

const fail = (message) => {
  console.error(`\n[build-apk] ${message}`);
  process.exit(1);
};

const run = (command, cwd, env) => {
  const result = spawnSync(command, { cwd, env, stdio: 'inherit', shell: true });
  if (result.status !== 0) {
    fail(`Команда «${command}» завершилась с кодом ${result.status}`);
  }
};

const javaHome = process.env.JAVA_HOME || DEFAULT_JAVA_HOME;
if (!fs.existsSync(path.join(javaHome, 'bin', 'java.exe'))) {
  fail(`JDK не найден в ${javaHome}. Установите Android Studio или задайте JAVA_HOME`);
}

const androidHome = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT || DEFAULT_ANDROID_HOME;
if (!fs.existsSync(androidHome)) {
  fail(`Android SDK не найден в ${androidHome}. Установите SDK через Android Studio или задайте ANDROID_HOME`);
}

const env = { ...process.env, JAVA_HOME: javaHome, ANDROID_HOME: androidHome };

// версия, иконки, сплэш и подпись попадают в android/ только через prebuild
run('npx expo prebuild --platform android --no-install', PROJECT_ROOT, env);

const localProperties = path.join(ANDROID_DIR, 'local.properties');
if (!fs.existsSync(localProperties)) {
  fs.writeFileSync(localProperties, `sdk.dir=${androidHome.replace(/\\/g, '\\\\')}\n`);
}

run(`.\\gradlew.bat assembleRelease -PreactNativeArchitectures=${ARCHITECTURES}`, ANDROID_DIR, env);

fs.mkdirSync(DIST_DIR, { recursive: true });
fs.copyFileSync(GRADLE_APK_PATH, APK_PATH);

const hasReleaseKey =
  Boolean(process.env[`ORG_GRADLE_PROJECT_${RELEASE_KEY_PROPERTY}`]) ||
  (fs.existsSync(GRADLE_PROPERTIES) && fs.readFileSync(GRADLE_PROPERTIES, 'utf8').includes(`${RELEASE_KEY_PROPERTY}=`));

const sizeMb = (fs.statSync(APK_PATH).size / 1024 / 1024).toFixed(1);
console.log(`\n[build-apk] Готово: ${APK_PATH} (${sizeMb} МБ)`);
if (!hasReleaseKey) {
  console.warn(
    `[build-apk] Release-ключ не задан (${RELEASE_KEY_PROPERTY} в ${GRADLE_PROPERTIES}) — APK подписан debug-ключом, в RuStore его не загружать`,
  );
}

