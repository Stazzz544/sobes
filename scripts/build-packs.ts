import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { PACK_ID, PACK_SCHEMA } from '../src/entities/question/config/content-pack';
import { QUESTIONS } from '../src/entities/question/data';
import { DIAGRAMS } from '../src/entities/question/data/diagrams';
import { ILLUSTRATIONS } from '../src/entities/question/data/illustrations';
import { GLOSSARY } from '../src/entities/question/glossary/glossary';
import { LESSON_GROUPS } from '../src/entities/question/lessons';
import { COURSES } from '../src/entities/question/lessons/courses';

const outFlag = process.argv.indexOf('--out');
const outDir = path.resolve(outFlag >= 0 ? (process.argv[outFlag + 1] ?? '') : 'site/packs/v1');
const { version: appVersion } = JSON.parse(readFileSync('package.json', 'utf8')) as { version: string };
const builtAt = new Date().toISOString();

const questions = QUESTIONS.map(({ verify: _verify, ...question }) => question);
const lessonCount = Object.values(LESSON_GROUPS).reduce((sum, lessons) => sum + (lessons?.length ?? 0), 0);

const pack = JSON.stringify({
  schema: PACK_SCHEMA,
  id: PACK_ID,
  appVersion,
  builtAt,
  questions,
  lessons: LESSON_GROUPS,
  glossary: GLOSSARY,
  diagrams: DIAGRAMS,
  illustrations: ILLUSTRATIONS,
  courses: COURSES,
});
const file = `${PACK_ID}.json`;
const manifest = {
  schema: PACK_SCHEMA,
  packs: {
    [PACK_ID]: {
      file,
      appVersion,
      builtAt,
      questions: questions.length,
      lessons: lessonCount,
      size: Buffer.byteLength(pack),
      md5: createHash('md5').update(pack).digest('hex'),
      sha256: createHash('sha256').update(pack).digest('hex'),
    },
  },
};

mkdirSync(outDir, { recursive: true });
writeFileSync(path.join(outDir, file), pack);
writeFileSync(path.join(outDir, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Пак ${PACK_ID} ${appVersion}: ${questions.length} вопросов, ${lessonCount} конспектов, ${(manifest.packs[PACK_ID].size / 1024).toFixed(0)} КБ → ${outDir}`);
