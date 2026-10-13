export type CodeLanguage = 'js' | 'jsx' | 'ts' | 'tsx' | 'html' | 'css' | 'http' | 'bash' | 'text';

export type TokenKind = 'plain' | 'keyword' | 'string' | 'number' | 'comment' | 'function' | 'punctuation';

export type Token = {
  kind: TokenKind;
  value: string;
};

type Rule = {
  kind: TokenKind | 'identifier';
  pattern: string;
};

const SCRIPT_KEYWORDS = new Set([
  'abstract', 'any', 'as', 'async', 'await', 'boolean', 'break', 'case', 'catch', 'class', 'const', 'continue',
  'declare', 'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false', 'finally', 'for', 'from',
  'function', 'get', 'if', 'implements', 'import', 'in', 'infer', 'instanceof', 'interface', 'is', 'keyof', 'let',
  'never', 'new', 'null', 'number', 'object', 'of', 'private', 'protected', 'public', 'readonly', 'return',
  'satisfies', 'set', 'static', 'string', 'super', 'switch', 'symbol', 'this', 'throw', 'true', 'try', 'type',
  'typeof', 'undefined', 'unknown', 'var', 'void', 'while', 'yield',
]);

const STRING_PATTERN = '\'(?:\\\\.|[^\'\\\\\\n])*\'|"(?:\\\\.|[^"\\\\\\n])*"|`(?:\\\\.|[^`\\\\])*`';

const SCRIPT_RULES: Rule[] = [
  { kind: 'comment', pattern: '\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/' },
  { kind: 'string', pattern: STRING_PATTERN },
  { kind: 'number', pattern: '\\b\\d[\\d_]*(?:\\.\\d+)?n?\\b' },
  { kind: 'function', pattern: '[A-Za-z_$][\\w$]*(?=\\s*\\()' },
  { kind: 'identifier', pattern: '[A-Za-z_$][\\w$]*' },
  { kind: 'punctuation', pattern: '=>|[{}()[\\];,.<>=+\\-*/%!?:&|^~]' },
];

const CSS_RULES: Rule[] = [
  { kind: 'comment', pattern: '\\/\\*[\\s\\S]*?\\*\\/' },
  { kind: 'string', pattern: STRING_PATTERN },
  { kind: 'keyword', pattern: '@[\\w-]+|!important' },
  { kind: 'function', pattern: '[\\w-]+(?=\\s*:[^:])' },
  { kind: 'number', pattern: '#[0-9a-fA-F]{3,8}\\b|-?\\d+(?:\\.\\d+)?(?:px|rem|em|%|vh|vw|s|ms|fr)?' },
  { kind: 'punctuation', pattern: '[{}();:,.#>+~*\\[\\]=]' },
];

const HTML_RULES: Rule[] = [
  { kind: 'comment', pattern: '<!--[\\s\\S]*?-->' },
  { kind: 'keyword', pattern: '<\\/?[A-Za-z][\\w-]*' },
  { kind: 'string', pattern: STRING_PATTERN },
  { kind: 'function', pattern: '[\\w-]+(?=\\s*[=:][^:])' },
  { kind: 'number', pattern: '#[0-9a-fA-F]{3,8}\\b|\\b\\d+(?:\\.\\d+)?(?:px|rem|em|%)?' },
  { kind: 'keyword', pattern: '!important' },
  { kind: 'punctuation', pattern: '\\/?>|[{}();:,.=#]' },
];

const SHELL_RULES: Rule[] = [
  { kind: 'comment', pattern: '#[^\\n]*' },
  { kind: 'string', pattern: STRING_PATTERN },
  { kind: 'number', pattern: '\\b\\d+(?:\\.\\d+)?\\b' },
];

const RULES_BY_LANGUAGE: Record<CodeLanguage, Rule[]> = {
  js: SCRIPT_RULES,
  jsx: SCRIPT_RULES,
  ts: SCRIPT_RULES,
  tsx: SCRIPT_RULES,
  css: CSS_RULES,
  html: HTML_RULES,
  http: SHELL_RULES,
  bash: SHELL_RULES,
  text: [],
};

const pushToken = (tokens: Token[], kind: TokenKind, value: string): void => {
  const previous = tokens[tokens.length - 1];
  if (previous && previous.kind === kind) {
    previous.value += value;
    return;
  }
  tokens.push({ kind, value });
};

export const tokenize = (source: string, language: CodeLanguage): Token[] => {
  const rules = RULES_BY_LANGUAGE[language];
  if (rules.length === 0) {
    return [{ kind: 'plain', value: source }];
  }
  const matcher = new RegExp(rules.map((rule) => `(${rule.pattern})`).join('|'), 'g');
  const tokens: Token[] = [];
  let cursor = 0;

  for (const match of source.matchAll(matcher)) {
    const index = match.index ?? 0;
    if (index > cursor) {
      pushToken(tokens, 'plain', source.slice(cursor, index));
    }
    const ruleIndex = match.slice(1).findIndex((group) => group !== undefined);
    const rule = rules[ruleIndex];
    const value = match[0];
    if (!rule || rule.kind === 'identifier') {
      pushToken(tokens, SCRIPT_KEYWORDS.has(value) ? 'keyword' : 'plain', value);
    } else if (rule.kind === 'function' && rules === SCRIPT_RULES && SCRIPT_KEYWORDS.has(value)) {
      pushToken(tokens, 'keyword', value);
    } else {
      pushToken(tokens, rule.kind, value);
    }
    cursor = index + value.length;
  }

  if (cursor < source.length) {
    pushToken(tokens, 'plain', source.slice(cursor));
  }
  return tokens;
};
