const { withAppBuildGradle } = require('expo/config-plugins');

const STORE_FILE_PROPERTY = 'SOBES_RELEASE_STORE_FILE';

const RELEASE_SIGNING_CONFIG = `signingConfigs {
        release {
            if (project.hasProperty('${STORE_FILE_PROPERTY}')) {
                storeFile file(${STORE_FILE_PROPERTY})
                storePassword SOBES_RELEASE_STORE_PASSWORD
                keyAlias SOBES_RELEASE_KEY_ALIAS
                keyPassword SOBES_RELEASE_KEY_PASSWORD
            }
        }`;

const RELEASE_SIGNING_SELECTOR = `signingConfig project.hasProperty('${STORE_FILE_PROPERTY}') ? signingConfigs.release : signingConfigs.debug`;

const applyReleaseSigning = (buildGradle) => {
  if (buildGradle.includes(STORE_FILE_PROPERTY)) {
    return buildGradle;
  }
  const buildTypesStart = buildGradle.indexOf('buildTypes {');
  const releaseStart = buildGradle.indexOf('release {', buildTypesStart);
  const debugSigningStart = buildGradle.indexOf('signingConfig signingConfigs.debug', releaseStart);
  if (buildTypesStart === -1 || releaseStart === -1 || debugSigningStart === -1) {
    throw new Error('with-release-signing: не найден buildTypes.release в android/app/build.gradle');
  }
  const withReleaseBuildType =
    buildGradle.slice(0, debugSigningStart) +
    RELEASE_SIGNING_SELECTOR +
    buildGradle.slice(debugSigningStart + 'signingConfig signingConfigs.debug'.length);
  return withReleaseBuildType.replace('signingConfigs {', RELEASE_SIGNING_CONFIG);
};

module.exports = (config) =>
  withAppBuildGradle(config, (gradleConfig) => {
    gradleConfig.modResults.contents = applyReleaseSigning(gradleConfig.modResults.contents);
    return gradleConfig;
  });
