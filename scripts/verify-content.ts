import { spawnSync } from 'node:child_process';
import { existsSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';
import { TAGS } from '../src/entities/question/config/tags';
import { QUESTIONS } from '../src/entities/question/data';
import { DIAGRAMS } from '../src/entities/question/data/diagrams';
import { LESSON_GROUPS } from '../src/entities/question/lessons';
import { OPTION_IDS } from '../src/entities/question/model/types';
import { ACCENT_COLORS, BASE_COLORS } from '../src/shared/theme/colors';
import type { OptionContent, Question, QuestionVerification } from '../src/entities/question/model/types';

type CssComputedVerification = Extract<QuestionVerification, { kind: 'css-computed' }>;

const LOCALES = ['ru', 'en'] as const;
const ID_PREFIX = { javascript: 'js', typescript: 'ts', react: 'react', web: 'web', css: 'css', ai: 'ai', algorithms: 'algo' } as const;
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

const getCorrectOption = (question: Question): OptionContent => question.options[OPTION_IDS.indexOf(question.answer)];

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
    const keys = question.options.map((option) => optionKey(option, locale));
    if (new Set(keys).size !== keys.length) {
      fail(question, `повторяющиеся варианты (${locale})`);
    }
    for (const option of question.options) {
      const text = 'code' in option ? option.code : option.text[locale];
      if (!text.trim()) {
        fail(question, `пустой вариант (${locale})`);
      }
      if ('code' in option && /[а-яё]/i.test(option.code)) {
        fail(question, `кириллица в варианте-коде «${option.code}» — нужен text { ru, en }`);
      }
      if (FORBIDDEN_OPTION_PATTERNS.some((pattern) => pattern.test(text))) {
        fail(question, `запрещённый вариант «${text}»`);
      }
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
  if (!OPTION_IDS.includes(question.answer)) {
    fail(question, `некорректный answer ${question.answer}`);
  }
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
  const actual = normalize(result.stdout);
  const correct = getCorrectOption(question);
  if (!('code' in correct) || normalize(correct.code) !== actual) {
    fail(question, `фактический вывод «${actual}» не совпадает с верным вариантом`);
  }
  question.options.forEach((option, index) => {
    if (OPTION_IDS[index] !== question.answer && 'code' in option && normalize(option.code) === actual) {
      fail(question, `вариант ${OPTION_IDS[index]} тоже совпадает с выводом`);
    }
  });
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
  const actual = normalizeType(checker.typeToString(checker.getTypeAtLocation(identifier)));
  const correct = getCorrectOption(question);
  if (!('code' in correct) || normalizeType(correct.code) !== actual) {
    fail(question, `фактический тип «${actual}» не совпадает с верным вариантом`);
  }
  question.options.forEach((option, index) => {
    if (OPTION_IDS[index] !== question.answer && 'code' in option && normalizeType(option.code) === actual) {
      fail(question, `вариант ${OPTION_IDS[index]} тоже совпадает с типом`);
    }
  });
};

const checkTsError = (question: Question, code: number): void => {
  const { diagnostics } = compile(question.code?.source ?? '');
  const codes = diagnostics.map((diagnostic) => diagnostic.code);
  if (codes.length === 0 || codes.some((actual) => actual !== code)) {
    fail(question, `ожидалась только ошибка TS${code}, получено: ${diagnostics.map(formatDiagnostic).join('; ') || 'ошибок нет'}`);
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
    [...sandboxFlags, '--headless', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--virtual-time-budget=10000', '--dump-dom', pathToFileURL(file).href],
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
    const correct = getCorrectOption(question);
    const expected = verify.expected ?? ('code' in correct ? correct.code : undefined);
    if (expected === undefined) {
      fail(question, 'css-computed: при текстовом верном варианте нужен expected');
      continue;
    }
    if (normalize(expected) !== actual) {
      fail(question, `css-computed: ${verify.selector} → ${verify.property} = «${actual}», ожидалось «${expected}»`);
    }
    question.options.forEach((option, optionIndex) => {
      if (OPTION_IDS[optionIndex] !== question.answer && 'code' in option && normalize(option.code) === actual) {
        fail(question, `вариант ${OPTION_IDS[optionIndex]} тоже совпадает со значением`);
      }
    });
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
      if (question.verify?.kind === 'ts-output') {
        checkJsOutput(question, workDir, true);
      }
      if (question.verify?.kind === 'css-computed') {
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
