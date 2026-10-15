import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { TAGS } from '../src/entities/question/config/tags';
import { QUESTIONS } from '../src/entities/question/data';
import { DIAGRAMS } from '../src/entities/question/data/diagrams';
import { GLOSSARY } from '../src/entities/question/glossary/glossary';
import { LESSON_GROUPS } from '../src/entities/question/lessons';
import { TOPIC_PATHS } from '../src/entities/question/config/paths';
import { OPTION_IDS } from '../src/entities/question/model/types';
import { DIRECTIONS } from '../src/entities/topic/config/directions';
import { RELEASES } from '../src/shared/config/releases';
import { DIRECTION_IDS, TOPIC_IDS } from '../src/shared/config/topics';
import { ACCENT_COLORS, BASE_COLORS } from '../src/shared/theme/colors';
import type { ChoiceQuestion, JsTestsVerification, OptionContent, Question, QuestionVerification } from '../src/entities/question/model/types';

type CssComputedVerification = Extract<QuestionVerification, { kind: 'css-computed' | 'dom-probe' }>;

const LOCALES = ['ru', 'en'] as const;
const ID_PREFIX = { javascript: 'js', typescript: 'ts', react: 'react', web: 'web', css: 'css', ai: 'ai', algorithms: 'algo', hr: 'hr', git: 'git', html: 'html', testing: 'test', state: 'state', node: 'node', next: 'next', architecture: 'arch' } as const;
const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
];
const FORBIDDEN_OPTION_PATTERNS = [/все (перечисленн|вышеперечисленн)/i, /all of the above/i, /none of the above/i];
const VIRTUAL_FILE = 'question.ts';
const IS_CI = process.env.CI === 'true';

const errors: string[] = [];
const warnings: string[] = [];

const fail = (question: Question | null, message: string): void => {
  errors.push(question ? `${question.id}: ${message}` : message);
};

const normalize = (value: string): string => value.replace(/\s+/g, ' ').trim();

const normalizeType = (value: string): string => {
  const parts: string[] = [];
  let depth = 0;
  let current = '';
  for (const char of normalize(value)) {
    if ('<({['.includes(char)) {
      depth += 1;
    }
    if ('>)}]'.includes(char)) {
      depth -= 1;
    }
    if (char === '|' && depth === 0) {
      parts.push(current.trim());
      current = '';
      continue;
    }
    current += char;
  }
  parts.push(current.trim());
  return parts.sort().join(' | ');
};

const optionKey = (option: OptionContent, locale: (typeof LOCALES)[number]): string =>
  'code' in option ? normalize(option.code) : normalize(option.text[locale]).toLowerCase();

const getCorrectOption = (question: ChoiceQuestion): OptionContent => question.options[OPTION_IDS.indexOf(question.answer)];

const checkContentList = (question: Question, list: readonly OptionContent[], locale: (typeof LOCALES)[number], name: string): void => {
  const keys = list.map((item) => optionKey(item, locale));
  if (new Set(keys).size !== keys.length) {
    fail(question, `повторяющиеся ${name} (${locale})`);
  }
  for (const item of list) {
    const text = 'code' in item ? item.code : item.text[locale];
    if (!text.trim()) {
      fail(question, `пустой элемент «${name}» (${locale})`);
    }
    if ('code' in item && /[а-яё]/i.test(item.code)) {
      fail(question, `кириллица в коде «${item.code}» — нужен text { ru, en }`);
    }
    if (FORBIDDEN_OPTION_PATTERNS.some((pattern) => pattern.test(text))) {
      fail(question, `запрещённый вариант «${text}»`);
    }
  }
};

const checkKindStructure = (question: Question): void => {
  if (question.kind === 'order') {
    if (question.items.length < 3 || question.items.length > 6) {
      fail(question, `в order нужно 3–6 элементов, сейчас ${question.items.length}`);
    }
    LOCALES.forEach((locale) => checkContentList(question, question.items, locale, 'элементы'));
    return;
  }
  if (question.kind === 'bug-line') {
    const lineCount = question.code.source.split('\n').length;
    if (lineCount < 3) {
      fail(question, 'в bug-line нужно хотя бы 3 строки кода');
    }
    if (!Number.isInteger(question.answerLine) || question.answerLine < 1 || question.answerLine > lineCount) {
      fail(question, `answerLine ${question.answerLine} вне кода (строк: ${lineCount})`);
    }
    return;
  }
  if (question.kind === 'output') {
    if (question.answers.length === 0 || question.answers.some((answer) => !answer.trim())) {
      fail(question, 'в output нужен хотя бы один непустой ответ');
    }
    if (/[а-яё]/i.test(question.answers.join(''))) {
      fail(question, 'кириллица в ответе output — ответ должен быть выводом кода');
    }
    return;
  }
  LOCALES.forEach((locale) => checkContentList(question, question.options, locale, 'варианты'));
  if (!OPTION_IDS.includes(question.answer)) {
    fail(question, `некорректный answer ${question.answer}`);
  }
};

const checkAgainstAnswer = (question: Question, actual: string, what: string, toKey: (value: string) => string = normalize): void => {
  if (question.kind === 'order') {
    const expected = question.items.map((item) => ('code' in item ? item.code : '')).join(' ');
    if (toKey(expected) !== actual) {
      fail(question, `фактический ${what} «${actual}» не совпадает с правильным порядком «${expected}»`);
    }
    return;
  }
  if (question.kind === 'output') {
    const expected = question.answers[0] ?? '';
    if (toKey(expected) !== actual) {
      fail(question, `фактический ${what} «${actual}» не совпадает с ответом «${expected}»`);
    }
    return;
  }
  if (question.kind === 'bug-line') {
    fail(question, `проверка «${what}» не применима к bug-line`);
    return;
  }
  const correct = getCorrectOption(question);
  if (!('code' in correct) || toKey(correct.code) !== actual) {
    fail(question, `фактический ${what} «${actual}» не совпадает с верным вариантом`);
  }
  question.options.forEach((option, index) => {
    if (OPTION_IDS[index] !== question.answer && 'code' in option && toKey(option.code) === actual) {
      fail(question, `вариант ${OPTION_IDS[index]} тоже совпадает (${what})`);
    }
  });
};

const checkStructure = (question: Question, seenIds: Set<string>): void => {
  if (seenIds.has(question.id)) {
    fail(question, 'повторяющийся id');
  }
  seenIds.add(question.id);
  if (!new RegExp(`^${ID_PREFIX[question.topic]}-[a-z0-9-]+-\\d{3}$`).test(question.id)) {
    fail(question, `id не соответствует шаблону ${ID_PREFIX[question.topic]}-<тема>-NNN`);
  }
  if (question.tags.length === 0) {
    fail(question, 'нет тегов');
  }
  for (const tag of question.tags) {
    if (TAGS[tag].topic !== question.topic) {
      fail(question, `тег ${tag} относится к теме ${TAGS[tag].topic}`);
    }
  }
  for (const locale of LOCALES) {
    if (!question.prompt[locale].trim()) {
      fail(question, `пустая формулировка (${locale})`);
    }
    for (const block of question.explanation) {
      if (block.type === 'text' && !block.text[locale].trim()) {
        fail(question, `пустой блок пояснения (${locale})`);
      }
      if (block.type === 'code' && block.caption && !block.caption[locale].trim()) {
        fail(question, `пустая подпись к коду (${locale})`);
      }
    }
  }
  checkKindStructure(question);
  if (!question.explanation.some((block) => block.type === 'text')) {
    fail(question, 'в пояснении нет текста');
  }
  if (question.sources.length === 0) {
    fail(question, 'нет источников');
  }
  for (const source of question.sources) {
    if (!source.url.startsWith('https://')) {
      fail(question, `источник не https: ${source.url}`);
    }
  }
};

const checkJsOutput = (question: Question, workDir: string, transpile = false): void => {
  if (!question.code) {
    fail(question, 'js-output без кода');
    return;
  }
  const file = path.join(workDir, `${question.id}.js`);
  const source = transpile
    ? ts.transpileModule(question.code.source, {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
      }).outputText
    : question.code.source;
  writeFileSync(file, source);
  const result = spawnSync(process.execPath, [file], { encoding: 'utf8', timeout: 5000 });
  if (result.status !== 0) {
    fail(question, `код упал: ${result.stderr.trim().split('\n')[0] ?? ''}`);
    return;
  }
  checkAgainstAnswer(question, normalize(result.stdout), 'вывод');
};

const JS_TESTS_PASSED = '__SOBES_TESTS_PASSED__';

const passesJsTests = (source: string, tests: string, file: string): boolean => {
  writeFileSync(
    file,
    [
      "const assert = require('node:assert/strict');",
      source,
      ';(async () => {',
      tests,
      `})().then(() => console.log('${JS_TESTS_PASSED}'), (error) => console.log('tests failed:', error?.message));`,
    ].join('\n'),
  );
  const result = spawnSync(process.execPath, [file], { encoding: 'utf8', timeout: 5000 });
  return result.status === 0 && result.stdout.includes(JS_TESTS_PASSED);
};

const checkJsTests = (question: Question, verify: JsTestsVerification, workDir: string): void => {
  const file = path.join(workDir, `${question.id}.tests.js`);
  const passes = (body: string): boolean => passesJsTests([verify.before ?? '', body, verify.after ?? ''].join('\n'), verify.tests, file);
  if (question.kind === 'order') {
    const lines = question.items.map((item) => ('code' in item ? item.code : ''));
    if (!passes(lines.join('\n'))) {
      fail(question, 'js-tests: правильный порядок не проходит тесты');
    }
    for (let index = 0; index + 1 < lines.length; index++) {
      const swapped = [...lines];
      [swapped[index], swapped[index + 1]] = [swapped[index + 1] ?? '', swapped[index] ?? ''];
      if (passes(swapped.join('\n'))) {
        fail(question, `js-tests: тесты проходят и с переставленными элементами ${index + 1} и ${index + 2} — порядок неоднозначен`);
      }
    }
    return;
  }
  if (question.kind === 'bug-line') {
    if (passes(question.code.source)) {
      fail(question, 'js-tests: код с ошибкой проходит тесты');
    }
    if (verify.fixedLine === undefined) {
      fail(question, 'js-tests: для bug-line нужен fixedLine');
      return;
    }
    const lines = question.code.source.split('\n');
    lines[question.answerLine - 1] = verify.fixedLine;
    if (!passes(lines.join('\n'))) {
      fail(question, 'js-tests: код с исправленной строкой не проходит тесты');
    }
    return;
  }
  if (question.kind === 'output') {
    fail(question, 'js-tests не для output');
    return;
  }
  OPTION_IDS.forEach((id, index) => {
    const option = question.options[index];
    if (!option || !('code' in option)) {
      fail(question, `js-tests: вариант ${id} без кода`);
      return;
    }
    const passed = passes(option.code);
    if (id === question.answer && !passed) {
      fail(question, `js-tests: правильный вариант ${id} не проходит тесты`);
    }
    if (id !== question.answer && passed) {
      fail(question, `js-tests: неправильный вариант ${id} проходит тесты`);
    }
  });
};

const BASH_CANDIDATES = [process.env.BASH_PATH, 'C:/Program Files/Git/bin/bash.exe', '/bin/bash', '/usr/bin/bash'];
const GIT_CONFIG = [
  '[user]',
  '\tname = Sobes',
  '\temail = sobes@example.com',
  '[init]',
  '\tdefaultBranch = main',
  '[core]',
  '\tautocrlf = false',
  '[commit]',
  '\tgpgsign = false',
  '[advice]',
  '\tdetachedHead = false',
  '',
].join('\n');
const GIT_DATE = '2026-01-01T00:00:00Z';

const checkShellOutput = (question: Question, workDir: string): void => {
  const bash = BASH_CANDIDATES.find((candidate) => candidate !== undefined && existsSync(candidate));
  if (!bash) {
    (IS_CI ? errors : warnings).push(`${question.id}: shell-output — не найден bash (задайте BASH_PATH)`);
    return;
  }
  if (!question.code) {
    fail(question, 'shell-output без кода');
    return;
  }
  const questionDir = path.join(workDir, question.id);
  const home = path.join(questionDir, 'home');
  const repo = path.join(questionDir, 'repo');
  mkdirSync(home, { recursive: true });
  mkdirSync(repo, { recursive: true });
  writeFileSync(path.join(home, '.gitconfig'), GIT_CONFIG);
  const script = path.join(questionDir, 'script.sh');
  writeFileSync(script, `set -e\n${question.code.source}\n`);
  // чистый HOME и фиксированные даты: без пользовательского gitconfig вывод и хеши одинаковы на любой машине
  const result = spawnSync(bash, [script], {
    cwd: repo,
    encoding: 'utf8',
    timeout: 20000,
    env: {
      ...process.env,
      HOME: home,
      GIT_CONFIG_NOSYSTEM: '1',
      GIT_AUTHOR_DATE: GIT_DATE,
      GIT_COMMITTER_DATE: GIT_DATE,
      LC_ALL: 'C',
    },
  });
  if (result.status !== 0) {
    fail(question, `скрипт упал: ${(result.stderr ?? '').trim().split('\n').slice(-1)[0] ?? ''}`);
    return;
  }
  checkAgainstAnswer(question, normalize(result.stdout), 'вывод');
};

const COMPILER_OPTIONS: ts.CompilerOptions = {
  strict: true,
  noEmit: true,
  target: ts.ScriptTarget.ES2022,
  module: ts.ModuleKind.ESNext,
  moduleResolution: ts.ModuleResolutionKind.Bundler,
  lib: ['lib.es2022.d.ts', 'lib.dom.d.ts'],
  types: [],
  skipLibCheck: true,
};

const compile = (source: string): { program: ts.Program; diagnostics: readonly ts.Diagnostic[] } => {
  const host = ts.createCompilerHost(COMPILER_OPTIONS);
  const originalGetSourceFile = host.getSourceFile;
  host.getSourceFile = (fileName, languageVersion, ...rest) =>
    fileName === VIRTUAL_FILE
      ? ts.createSourceFile(fileName, source, languageVersion, true)
      : originalGetSourceFile.call(host, fileName, languageVersion, ...rest);
  const originalFileExists = host.fileExists;
  host.fileExists = (fileName) => fileName === VIRTUAL_FILE || originalFileExists.call(host, fileName);
  const program = ts.createProgram([VIRTUAL_FILE], COMPILER_OPTIONS, host);
  return { program, diagnostics: ts.getPreEmitDiagnostics(program) };
};

const formatDiagnostic = (diagnostic: ts.Diagnostic): string =>
  `TS${diagnostic.code}: ${ts.flattenDiagnosticMessageText(diagnostic.messageText, ' ')}`;

const findDeclaration = (node: ts.Node, name: string): ts.Identifier | null => {
  if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === name) {
    return node.name;
  }
  return ts.forEachChild(node, (child) => findDeclaration(child, name) ?? undefined) ?? null;
};

const checkTsType = (question: Question, symbol: string): void => {
  if (!question.code) {
    fail(question, 'ts-type без кода');
    return;
  }
  const { program, diagnostics } = compile(question.code.source);
  if (diagnostics.length > 0) {
    fail(question, `код не компилируется: ${diagnostics.map(formatDiagnostic).join('; ')}`);
    return;
  }
  const sourceFile = program.getSourceFile(VIRTUAL_FILE);
  const identifier = sourceFile ? findDeclaration(sourceFile, symbol) : null;
  if (!identifier) {
    fail(question, `не найдена переменная ${symbol}`);
    return;
  }
  const checker = program.getTypeChecker();
  checkAgainstAnswer(question, normalizeType(checker.typeToString(checker.getTypeAtLocation(identifier))), 'тип', normalizeType);
};

const checkTsError = (question: Question, code: number): void => {
  const { diagnostics } = compile(question.code?.source ?? '');
  const codes = diagnostics.map((diagnostic) => diagnostic.code);
  if (codes.length === 0 || codes.some((actual) => actual !== code)) {
    fail(question, `ожидалась только ошибка TS${code}, получено: ${diagnostics.map(formatDiagnostic).join('; ') || 'ошибок нет'}`);
  }
};

const checkTsErrorLine = (question: Question): void => {
  if (question.kind !== 'bug-line') {
    fail(question, 'ts-error-line только для bug-line');
    return;
  }
  const { diagnostics } = compile(question.code.source);
  const lines = diagnostics.map((diagnostic) =>
    diagnostic.file && diagnostic.start !== undefined ? diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start).line + 1 : 0,
  );
  if (lines.length === 0 || lines.some((line) => line !== question.answerLine)) {
    const found = diagnostics.map((diagnostic, index) => `строка ${lines[index]}: ${formatDiagnostic(diagnostic)}`).join('; ');
    fail(question, `ожидались ошибки только на строке ${question.answerLine}, получено: ${found || 'ошибок нет'}`);
  }
};

const checkTsSource = (question: Question, extra: string): void => {
  const source = [question.code?.source ?? '', extra].join('\n');
  const { diagnostics } = compile(source);
  if (diagnostics.length > 0) {
    fail(question, `ts-check: ${diagnostics.map(formatDiagnostic).join('; ')}`);
  }
};

const CSS_PROBE_SCRIPT = `
addEventListener('load', () => {
  const results = PROBES.map((probe) => {
    try {
      const frame = document.getElementById('frame-' + probe.frame).contentDocument;
      const [selector, pseudo] = probe.selector.split('::');
      const element = frame.querySelector(selector);
      if (!element) {
        return 'NOT FOUND: ' + selector;
      }
      if (probe.property === 'aom.role') {
        return element.computedRole;
      }
      if (probe.property === 'aom.name') {
        return element.computedName;
      }
      if (probe.property.startsWith('js:')) {
        return String(new frame.defaultView.Function('el', 'document', 'return (' + probe.property.slice(3) + ')')(element, frame));
      }
      if (probe.property.startsWith('rect.')) {
        const value = element.getBoundingClientRect()[probe.property.slice(5)];
        return String(Math.round(value * 100) / 100) + 'px';
      }
      return frame.defaultView.getComputedStyle(element, pseudo ? '::' + pseudo : null).getPropertyValue(probe.property).trim();
    } catch (error) {
      return 'ERROR: ' + error.message;
    }
  });
  document.getElementById('out').textContent = btoa(unescape(encodeURIComponent(JSON.stringify(results))));
});`;

type CssCheck = { question: Question; verify: CssComputedVerification };

const escapeAttribute = (value: string): string => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;');

const buildCssDocument = ({ question, verify }: CssCheck): string => {
  const source = question.code?.source ?? '';
  const markup = question.code?.lang === 'css' ? `<style>${source}</style>` : source;
  return `<!doctype html><meta charset="utf-8">${markup}${verify.html ?? ''}`;
};

const checkCssComputed = (checks: CssCheck[], workDir: string): void => {
  if (checks.length === 0) {
    return;
  }
  const chrome = CHROME_CANDIDATES.find((candidate) => candidate !== undefined && existsSync(candidate));
  if (!chrome) {
    const message = `css-computed: не найден Chrome (задайте CHROME_PATH), не проверено вопросов: ${checks.length}`;
    (IS_CI ? errors : warnings).push(message);
    return;
  }
  const frames = checks
    .map(
      (check, index) =>
        `<iframe id="frame-${index}" style="display:block;width:${check.verify.viewportWidth ?? 800}px;height:600px;border:0" srcdoc="${escapeAttribute(buildCssDocument(check))}"></iframe>`,
    )
    .join('\n');
  const probes = JSON.stringify(
    checks.flatMap(({ verify }, frame) =>
      [verify, ...(verify.also ?? [])].map(({ selector, property }) => ({ frame, selector, property })),
    ),
  );
  const file = path.join(workDir, 'css-computed.html');
  writeFileSync(file, `<!doctype html><meta charset="utf-8">${frames}<pre id="out"></pre><script>const PROBES = ${probes};${CSS_PROBE_SCRIPT}</script>`);
  // на ubuntu-раннерах AppArmor запрещает песочнице Chrome user namespaces, а страница — наша локальная
  const sandboxFlags = IS_CI ? ['--no-sandbox'] : [];
  const result = spawnSync(
    chrome,
    [...sandboxFlags, '--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--virtual-time-budget=10000', '--enable-blink-features=ComputedAccessibilityInfo', '--dump-dom', pathToFileURL(file).href],
    { encoding: 'utf8', timeout: 60000, maxBuffer: 64 * 1024 * 1024 },
  );
  const encoded = /<pre id="out">([^<]+)<\/pre>/.exec(result.stdout ?? '')?.[1];
  if (!encoded) {
    errors.push(`css-computed: Chrome не вернул результат (${result.error?.message ?? 'пустой вывод'})`);
    return;
  }
  const values = (JSON.parse(Buffer.from(encoded, 'base64').toString('utf8')) as string[]).map(normalize);
  let cursor = 0;
  for (const { question, verify } of checks) {
    const actual = values[cursor] ?? '';
    const extraProbes = verify.also ?? [];
    extraProbes.forEach((probe, probeIndex) => {
      const value = values[cursor + 1 + probeIndex] ?? '';
      if (normalize(probe.expected) !== value) {
        fail(question, `css-computed: ${probe.selector} → ${probe.property} = «${value}», ожидалось «${probe.expected}»`);
      }
    });
    cursor += 1 + extraProbes.length;
    if (verify.expected === undefined) {
      checkAgainstAnswer(question, actual, `${verify.kind === 'dom-probe' ? 'dom' : 'css'} ${verify.selector} → ${verify.property}`);
      continue;
    }
    if (normalize(verify.expected) !== actual) {
      fail(question, `css-computed: ${verify.selector} → ${verify.property} = «${actual}», ожидалось «${verify.expected}»`);
    }
  }
};

const hexToLuminance = (hex: string): number => {
  const channels = (hex.replace('#', '').match(/../g) ?? []).map((pair) => {
    const value = parseInt(pair, 16) / 255;
    return value <= 0.03928 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
  });
  const [red = 0, green = 0, blue = 0] = channels;
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrast = (first: string, second: string): number => {
  const [light, dark] = [hexToLuminance(first), hexToLuminance(second)].sort((a, b) => b - a);
  return ((light ?? 0) + 0.05) / ((dark ?? 0) + 0.05);
};

const checkContrast = (): void => {
  for (const scheme of ['light', 'dark'] as const) {
    const base = BASE_COLORS[scheme];
    const textPairs: [string, string, string][] = [
      ['textPrimary/bgPrimary', base.textPrimary, base.bgPrimary],
      ['textSecondary/bgCard', base.textSecondary, base.bgCard],
      ['textMuted/bgSecondary', base.textMuted, base.bgSecondary],
      ['success/bgPrimary', base.success, base.bgPrimary],
      ['danger/bgPrimary', base.danger, base.bgPrimary],
      ['danger/dangerSoft', base.danger, base.dangerSoft],
      ['success/successSoft', base.success, base.successSoft],
    ];
    for (const [accentName, accentSchemes] of Object.entries(ACCENT_COLORS)) {
      const accent = accentSchemes[scheme];
      textPairs.push(
        [`${accentName}.onAccent/accent`, accent.onAccent, accent.accent],
        [`${accentName}.accentText/bgPrimary`, accent.accentText, base.bgPrimary],
        [`${accentName}.accentText/accentSoft`, accent.accentText, accent.accentSoft],
      );
      if (contrast(accent.headerText, accent.headerBg) < 3) {
        errors.push(`контраст ${scheme} ${accentName}.headerText/headerBg < 3`);
      }
    }
    for (const [name, foreground, background] of textPairs) {
      const ratio = contrast(foreground, background);
      if (ratio < 4.5) {
        errors.push(`контраст ${scheme} ${name} = ${ratio.toFixed(2)} < 4.5`);
      }
    }
  }
};

const LESSONS = Object.values(LESSON_GROUPS).flatMap((lessons) => lessons ?? []);

const checkLessons = (): void => {
  const seenTags = new Set<string>();
  for (const [topic, lessons] of Object.entries(LESSON_GROUPS)) {
    for (const lesson of lessons ?? []) {
      const lessonError = (message: string): void => {
        errors.push(`конспект ${lesson.tag}: ${message}`);
      };
      if (seenTags.has(lesson.tag)) {
        lessonError('повторяется');
      }
      seenTags.add(lesson.tag);
      if (TAGS[lesson.tag].topic !== topic) {
        lessonError(`тег из темы ${TAGS[lesson.tag].topic}, а лежит в ${topic}`);
      }
      if (lesson.keyPoints.length < 3 || lesson.keyPoints.length > 5) {
        lessonError(`в «Запомнить» нужно 3–5 пунктов, сейчас ${lesson.keyPoints.length}`);
      }
      if (!lesson.blocks.some((block) => block.type === 'text')) {
        lessonError('нет текста');
      }
      if (lesson.sources.length === 0) {
        lessonError('нет источников');
      }
      for (const source of lesson.sources) {
        if (!source.url.startsWith('https://')) {
          lessonError(`источник не https: ${source.url}`);
        }
      }
      for (const locale of LOCALES) {
        if (!lesson.summary[locale].trim()) {
          lessonError(`пустое введение (${locale})`);
        }
        if (lesson.keyPoints.some((point) => !point[locale].trim())) {
          lessonError(`пустой пункт «Запомнить» (${locale})`);
        }
        for (const block of lesson.blocks) {
          if (block.type === 'text' && !block.text[locale].trim()) {
            lessonError(`пустой текстовый блок (${locale})`);
          }
          if (block.type === 'code' && block.caption && !block.caption[locale].trim()) {
            lessonError(`пустая подпись к коду (${locale})`);
          }
        }
      }
      for (const block of lesson.blocks) {
        if (block.type === 'code' && /[а-яё]/i.test(block.code.source)) {
          lessonError('кириллица в коде — комментарии в коде только на английском');
        }
      }
    }
  }
  for (const tag of Object.keys(TAGS)) {
    if (!seenTags.has(tag)) {
      errors.push(`нет конспекта для тега ${tag}`);
    }
  }
};

const TERM_PATTERN = /\[\[([a-z0-9-]+)\|[^\]]+\]\]/g;

const termIds = (value: string): string[] => [...value.matchAll(TERM_PATTERN)].map((match) => match[1] ?? '');

const checkGlossary = (): void => {
  for (const [id, entry] of Object.entries(GLOSSARY)) {
    for (const locale of LOCALES) {
      if (!entry.term[locale].trim() || !entry.definition[locale].trim()) {
        errors.push(`глоссарий ${id}: пусто (${locale})`);
      }
    }
  }
  const visit = (node: unknown, where: string): void => {
    if (Array.isArray(node)) {
      node.forEach((item) => visit(item, where));
      return;
    }
    if (typeof node !== 'object' || node === null) {
      return;
    }
    const record = node as Record<string, unknown>;
    if (typeof record.ru === 'string' && typeof record.en === 'string') {
      const ruIds = termIds(record.ru);
      const enIds = termIds(record.en);
      for (const id of [...ruIds, ...enIds]) {
        if (!(id in GLOSSARY)) {
          errors.push(`${where}: нет термина ${id} в глоссарии`);
        }
      }
      if ([...ruIds].sort().join() !== [...enIds].sort().join()) {
        errors.push(`${where}: разные термины в RU (${ruIds.join(', ')}) и EN (${enIds.join(', ')})`);
      }
      return;
    }
    Object.values(record).forEach((value) => visit(value, where));
  };
  QUESTIONS.forEach((question) => visit(question, question.id));
  LESSONS.forEach((lesson) => visit(lesson, `конспект ${lesson.tag}`));
};

const checkDirections = (): void => {
  for (const topic of TOPIC_IDS) {
    const owners = DIRECTION_IDS.filter((directionId) => DIRECTIONS[directionId].topics.includes(topic));
    if (owners.length !== 1) {
      errors.push(`тема ${topic}: должна быть ровно в одном направлении, сейчас — ${owners.join(', ') || 'ни в одном'}`);
    }
  }
  for (const directionId of DIRECTION_IDS) {
    const direction = DIRECTIONS[directionId];
    if (direction.topics.length === 0) {
      errors.push(`направление ${directionId}: нет тем`);
    }
    for (const locale of LOCALES) {
      if (!direction.title[locale].trim() || !direction.role[locale].trim()) {
        errors.push(`направление ${directionId}: пустое название или роль (${locale})`);
      }
    }
  }
};

const checkPaths = (): void => {
  for (const [topic, path] of Object.entries(TOPIC_PATHS)) {
    const topicTags = Object.entries(TAGS)
      .filter(([, meta]) => meta.topic === topic)
      .map(([tag]) => tag);
    const missing = topicTags.filter((tag) => !(path as readonly string[]).includes(tag));
    const foreign = path.filter((tag) => TAGS[tag].topic !== topic);
    if (missing.length > 0) {
      errors.push(`путь ${topic}: нет тегов ${missing.join(', ')}`);
    }
    if (foreign.length > 0) {
      errors.push(`путь ${topic}: чужие теги ${foreign.join(', ')}`);
    }
    if (new Set(path).size !== path.length) {
      errors.push(`путь ${topic}: теги повторяются`);
    }
  }
};

const checkLinks = async (): Promise<void> => {
  const urls = [
    ...new Set([...QUESTIONS, ...LESSONS].flatMap((item) => item.sources.map((source) => source.url))),
  ];
  const queue = [...urls];
  const worker = async (): Promise<void> => {
    for (let url = queue.shift(); url; url = queue.shift()) {
      try {
        const response = await fetch(url, {
          redirect: 'follow',
          signal: AbortSignal.timeout(20000),
          headers: { 'User-Agent': 'Mozilla/5.0 (sobes-content-check)' },
        });
        if (!response.ok) {
          errors.push(`ссылка ${url} → ${response.status}`);
        }
      } catch (error) {
        errors.push(`ссылка ${url} → ${error instanceof Error ? error.message : String(error)}`);
      }
    }
  };
  await Promise.all(Array.from({ length: 6 }, worker));
  console.log(`Проверено ссылок: ${urls.length}`);
};

const checkDiagrams = (): void => {
  const used = new Set(
    QUESTIONS.flatMap((question) =>
      question.explanation.flatMap((block) => (block.type === 'diagram' ? [block.diagram] : [])),
    ),
  );
  for (const diagram of Object.values(DIAGRAMS)) {
    if (diagram.steps.length < 2) {
      errors.push(`схема ${diagram.id}: меньше двух шагов`);
    }
    if (!used.has(diagram.id)) {
      warnings.push(`схема ${diagram.id} не используется ни в одном вопросе`);
    }
    diagram.steps.forEach((step, index) => {
      for (const locale of LOCALES) {
        if (!step.caption[locale].trim()) {
          errors.push(`схема ${diagram.id}, шаг ${index + 1}: пустая подпись (${locale})`);
        }
      }
      const itemIds = step.lanes.flatMap((lane) => lane.items.map((item) => item.id));
      if (new Set(itemIds).size !== itemIds.length) {
        errors.push(`схема ${diagram.id}, шаг ${index + 1}: повторяющиеся id элементов`);
      }
    });
  }
};

const SEMVER_PATTERN = /^(\d+)\.(\d+)\.(\d+)$/;

const compareVersions = (first: string, second: string): number => {
  const [firstParts, secondParts] = [first, second].map((version) => version.split('.').map(Number));
  const index = [0, 1, 2].find((part) => firstParts?.[part] !== secondParts?.[part]);
  return index === undefined ? 0 : (firstParts?.[index] ?? 0) - (secondParts?.[index] ?? 0);
};

const checkReleases = (): void => {
  const { version } = JSON.parse(readFileSync('package.json', 'utf8')) as { version: string };
  if (RELEASES[0]?.version !== version) {
    errors.push(`версия ${version} из package.json не совпадает с последней в releases.ts (${RELEASES[0]?.version ?? 'нет'}) — см. скилл release-notes`);
  }
  if (!readFileSync('CHANGELOG.md', 'utf8').split(/\r?\n/).some((line) => line.trim() === `## ${version}`)) {
    errors.push(`в CHANGELOG.md нет секции «## ${version}»`);
  }
  RELEASES.forEach((release, index) => {
    const releaseError = (message: string): void => {
      errors.push(`релиз ${release.version}: ${message}`);
    };
    if (!SEMVER_PATTERN.test(release.version)) {
      releaseError('версия не в формате X.Y.Z');
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(release.date) || Number.isNaN(Date.parse(release.date))) {
      releaseError(`дата «${release.date}» не в формате YYYY-MM-DD`);
    }
    const previous = RELEASES[index + 1];
    if (previous && compareVersions(release.version, previous.version) <= 0) {
      releaseError(`должна быть больше следующей в списке ${previous.version} — новые релизы сверху`);
    }
    if (previous && release.date < previous.date) {
      releaseError('дата раньше, чем у предыдущей версии');
    }
    if (release.changes.length === 0) {
      releaseError('нет изменений');
    }
    for (const locale of LOCALES) {
      if (release.changes.some((change) => !change[locale].trim())) {
        releaseError(`пустой пункт (${locale})`);
      }
    }
  });
};

const printDistribution = (): void => {
  const rows = Object.keys(ID_PREFIX).map((topic) => {
    const list = QUESTIONS.filter((question) => question.topic === topic);
    return {
      topic,
      total: list.length,
      junior: list.filter((question) => question.difficulty === 1).length,
      middle: list.filter((question) => question.difficulty === 2).length,
      senior: list.filter((question) => question.difficulty === 3).length,
      popular: list.filter((question) => question.popular).length,
      verified: list.filter((question) => question.verify).length,
      interactive: list.filter((question) => question.kind !== undefined && question.kind !== 'choice').length,
    };
  });
  console.table(rows);
  for (const row of rows) {
    if (row.total >= 20 && row.senior < row.total * 0.15) {
      warnings.push(`${row.topic}: мало сложных вопросов (${row.senior}/${row.total})`);
    }
  }
};

const main = async (): Promise<void> => {
  const workDir = mkdtempSync(path.join(tmpdir(), 'sobes-verify-'));
  const seenIds = new Set<string>();
  const cssChecks: CssCheck[] = [];
  try {
    for (const question of QUESTIONS) {
      checkStructure(question, seenIds);
      if (question.verify?.kind === 'js-output') {
        checkJsOutput(question, workDir);
      }
      if (question.verify?.kind === 'ts-type') {
        checkTsType(question, question.verify.symbol);
      }
      if (question.verify?.kind === 'ts-check') {
        checkTsSource(question, question.verify.source);
      }
      if (question.verify?.kind === 'ts-error') {
        checkTsError(question, question.verify.code);
      }
      if (question.verify?.kind === 'ts-error-line') {
        checkTsErrorLine(question);
      }
      if (question.verify?.kind === 'shell-output') {
        checkShellOutput(question, workDir);
      }
      if (question.verify?.kind === 'js-tests') {
        checkJsTests(question, question.verify, workDir);
      }
      if (question.verify?.kind === 'ts-output') {
        checkJsOutput(question, workDir, true);
      }
      if (question.verify?.kind === 'css-computed' || question.verify?.kind === 'dom-probe') {
        cssChecks.push({ question, verify: question.verify });
      }
    }
    checkCssComputed(cssChecks, workDir);
  } finally {
    rmSync(workDir, { recursive: true, force: true });
  }
  checkContrast();
  checkDiagrams();
  checkLessons();
  checkPaths();
  checkDirections();
  checkGlossary();
  checkReleases();
  printDistribution();
  if (process.argv.includes('--links')) {
    await checkLinks();
  }
  warnings.forEach((warning) => console.warn(`⚠ ${warning}`));
  if (errors.length > 0) {
    errors.forEach((error) => console.error(`✖ ${error}`));
    console.error(`\nОшибок: ${errors.length}`);
    process.exit(1);
  }
  console.log(`\n✔ Вопросов: ${QUESTIONS.length}, конспектов: ${LESSONS.length}, ошибок нет`);
};

main();
