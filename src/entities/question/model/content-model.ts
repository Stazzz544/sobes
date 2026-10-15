import { createEffect, createEvent, createStore, sample } from 'effector';
import { Directory, File, Paths } from 'expo-file-system';
import { APP_VERSION } from '@app/shared/config';
import { PACK_ID } from '../config/content-pack';
import { sanitizePack } from '../lib/sanitize-pack';
import { BUNDLED_CONTENT, setContentBank } from './content';
import type { ContentBank } from './content';

export type ContentInfo = {
  questions: number;
  packVersion: string | null;
  builtAt: string | null;
};

const PACK_DIRECTORY = 'content';

export const getPackFile = (): File => new File(Paths.document, PACK_DIRECTORY, `${PACK_ID}.json`);

export const ensurePackDirectory = (): void => {
  new Directory(Paths.document, PACK_DIRECTORY).create({ idempotent: true });
};

const toInfo = (bank: ContentBank): ContentInfo => ({
  questions: bank.questions.length,
  packVersion: bank.packVersion,
  builtAt: bank.builtAt,
});

const contentLoaded = createEvent();

const $info = createStore<ContentInfo>(toInfo(BUNDLED_CONTENT));
const $isLoaded = createStore(false);

const loadCachedPackFx = createEffect(async (): Promise<ContentInfo> => {
  const file = getPackFile();
  if (!file.exists) {
    return toInfo(BUNDLED_CONTENT);
  }
  try {
    const bank = sanitizePack(JSON.parse(await file.text()), APP_VERSION, BUNDLED_CONTENT);
    if (bank) {
      setContentBank(bank);
      return toInfo(bank);
    }
  } catch {
    // битый файл удаляем ниже, как и устаревший
  }
  file.delete();
  return toInfo(BUNDLED_CONTENT);
});

sample({ clock: contentLoaded, target: loadCachedPackFx });
sample({ clock: loadCachedPackFx.doneData, target: $info });
sample({ clock: loadCachedPackFx.finally, fn: () => true, target: $isLoaded });

export const contentModel = { $info, $isLoaded, contentLoaded };
