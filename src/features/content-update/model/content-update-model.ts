import { createEffect, createEvent, sample } from 'effector';
import { File, Paths } from 'expo-file-system';
import { BUNDLED_CONTENT, PACK_ID, PACK_SCHEMA, ensurePackDirectory, getPackFile, sanitizePack } from '@app/entities/question';
import { APP_VERSION, CONTENT_PACKS_URL, STORAGE_KEYS } from '@app/shared/config';
import { compareVersions, storage } from '@app/shared/lib';

type ManifestEntry = {
  file: string;
  appVersion: string;
  md5: string;
};

export type ContentUpdateResult = 'skipped' | 'up-to-date' | 'downloaded' | 'invalid';

const CHECK_INTERVAL_MS = 12 * 60 * 60 * 1000;
const REQUEST_TIMEOUT_MS = 30_000;

const fetchText = async (url: string): Promise<string> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timer);
  }
};

const readEntry = (manifest: unknown): ManifestEntry | null => {
  if (typeof manifest !== 'object' || manifest === null || !('schema' in manifest) || manifest.schema !== PACK_SCHEMA || !('packs' in manifest)) {
    return null;
  }
  const packs = manifest.packs;
  const entry = typeof packs === 'object' && packs !== null && PACK_ID in packs ? (packs as Record<string, unknown>)[PACK_ID] : null;
  if (typeof entry !== 'object' || entry === null) {
    return null;
  }
  const { file, appVersion, md5 } = entry as Record<string, unknown>;
  return typeof file === 'string' && typeof appVersion === 'string' && typeof md5 === 'string' ? { file, appVersion, md5 } : null;
};

const updateCheckRequested = createEvent();

const checkForUpdateFx = createEffect(async (): Promise<ContentUpdateResult> => {
  const checkedAt = (await storage.get<number>(STORAGE_KEYS.CONTENT_CHECKED_AT)) ?? 0;
  if (Date.now() - checkedAt < CHECK_INTERVAL_MS) {
    return 'skipped';
  }
  await storage.set(STORAGE_KEYS.CONTENT_CHECKED_AT, Date.now());

  const entry = readEntry(JSON.parse(await fetchText(`${CONTENT_PACKS_URL}/manifest.json`)));
  const packFile = getPackFile();
  if (!entry || compareVersions(entry.appVersion, APP_VERSION) <= 0 || (packFile.exists && packFile.md5 === entry.md5)) {
    return 'up-to-date';
  }

  const text = await fetchText(`${CONTENT_PACKS_URL}/${entry.file}`);
  const download = new File(Paths.cache, `${PACK_ID}.download.json`);
  if (download.exists) {
    download.delete();
  }
  download.create();
  download.write(text);
  if (download.md5 !== entry.md5 || !sanitizePack(JSON.parse(text), APP_VERSION, BUNDLED_CONTENT)) {
    download.delete();
    return 'invalid';
  }
  ensurePackDirectory();
  if (packFile.exists) {
    packFile.delete();
  }
  download.move(packFile);
  return 'downloaded';
});

sample({ clock: updateCheckRequested, target: checkForUpdateFx });

export const contentUpdateModel = { updateCheckRequested, checkForUpdateFx };
