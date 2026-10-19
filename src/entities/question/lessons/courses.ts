import type { TopicId } from '@app/shared/config';
import type { Course } from '../model/types';

const STATE_COURSE: Course = {
  topic: 'state',
  final: [
    { question: 'state-basics-007', tag: 'state-basics', step: 'kinds' },
    { question: 'state-basics-005', tag: 'state-basics', step: 'single-source' },
    { question: 'state-immutability-009', tag: 'state-immutability', step: 'immer-and-clone' },
    { question: 'state-immutability-010', tag: 'state-immutability', step: 'immer-and-clone' },
    { question: 'state-redux-009', tag: 'state-redux', step: 'slices' },
    { question: 'state-redux-008', tag: 'state-redux', step: 'middleware' },
    { question: 'state-stores-004', tag: 'state-stores', step: 'shallow' },
    { question: 'state-stores-010', tag: 'state-stores', step: 'external-store' },
    { question: 'state-server-004', tag: 'state-server', step: 'mutations' },
    { question: 'state-server-012', tag: 'state-server', step: 'mutations' },
    { question: 'state-url-006', tag: 'state-url', step: 'search-params' },
    { question: 'state-url-010', tag: 'state-url', step: 'encoding-parsing' },
  ],
};

const GIT_COURSE: Course = {
  topic: 'git',
  final: [
    { question: 'git-basics-001', tag: 'git-basics', step: 'status' },
    { question: 'git-basics-010', tag: 'git-basics', step: 'gitignore' },
    { question: 'git-branches-008', tag: 'git-branches', step: 'pointers' },
    { question: 'git-branches-011', tag: 'git-branches', step: 'ranges' },
    { question: 'git-conflicts-005', tag: 'git-conflicts', step: 'origin' },
    { question: 'git-remote-002', tag: 'git-remote', step: 'fetch-pull' },
    { question: 'git-remote-007', tag: 'git-remote', step: 'diverged' },
    { question: 'git-undo-002', tag: 'git-undo', step: 'reset-modes' },
    { question: 'git-undo-012', tag: 'git-undo', step: 'reflog' },
    { question: 'git-rebase-006', tag: 'git-rebase', step: 'cherry-pick' },
    { question: 'git-rebase-008', tag: 'git-rebase', step: 'interactive' },
  ],
};

const HTML_COURSE: Course = {
  topic: 'html',
  final: [
    { question: 'html-semantics-006', tag: 'html-semantics', step: 'landmarks' },
    { question: 'html-semantics-008', tag: 'html-semantics', step: 'controls' },
    { question: 'html-parsing-011', tag: 'html-parsing', step: 'void-elements' },
    { question: 'html-parsing-008', tag: 'html-parsing', step: 'nesting' },
    { question: 'html-forms-011', tag: 'html-forms', step: 'button-type' },
    { question: 'html-forms-007', tag: 'html-forms', step: 'checkboxes' },
    { question: 'html-a11y-names-009', tag: 'a11y-names', step: 'priority' },
    { question: 'html-a11y-names-012', tag: 'a11y-names', step: 'groups' },
    { question: 'html-a11y-aria-006', tag: 'a11y-aria', step: 'states' },
    { question: 'html-a11y-keyboard-002', tag: 'a11y-keyboard', step: 'tab-order' },
    { question: 'html-a11y-keyboard-005', tag: 'a11y-keyboard', step: 'modals' },
  ],
};

const TESTING_COURSE: Course = {
  topic: 'testing',
  final: [
    { question: 'test-basics-007', tag: 'testing-basics', step: 'quality' },
    { question: 'test-unit-011', tag: 'testing-unit', step: 'equality' },
    { question: 'test-unit-005', tag: 'testing-unit', step: 'async' },
    { question: 'test-mocks-006', tag: 'testing-mocks', step: 'spies-reset' },
    { question: 'test-mocks-009', tag: 'testing-mocks', step: 'timers' },
    { question: 'test-components-006', tag: 'testing-components', step: 'helpers' },
    { question: 'test-components-010', tag: 'testing-components', step: 'helpers' },
    { question: 'test-e2e-010', tag: 'testing-e2e', step: 'locators' },
    { question: 'test-e2e-007', tag: 'testing-e2e', step: 'ci-debug' },
    { question: 'test-tdd-005', tag: 'testing-tdd', step: 'doubles' },
  ],
};

const NODE_COURSE: Course = {
  topic: 'node',
  final: [
    { question: 'node-runtime-env-file-001', tag: 'node-runtime', step: 'process' },
    { question: 'node-runtime-inspect-depth-001', tag: 'node-runtime', step: 'builtins' },
    { question: 'node-modules-require-cache-001', tag: 'node-modules', step: 'cache' },
    { question: 'node-modules-require-esm-001', tag: 'node-modules', step: 'esm' },
    { question: 'node-runtime-exit-events-001', tag: 'node-event-loop', step: 'keep-alive' },
    { question: 'node-async-max-listeners-001', tag: 'node-async', step: 'emitter' },
    { question: 'node-async-local-storage-001', tag: 'node-async', step: 'parallel' },
    { question: 'node-streams-hex-001', tag: 'node-streams', step: 'buffers' },
    { question: 'node-streams-readline-001', tag: 'node-streams', step: 'iteration' },
    { question: 'node-http-express5-async-001', tag: 'node-http', step: 'errors' },
  ],
};

const NEXT_COURSE: Course = {
  topic: 'next',
  final: [
    { question: 'next-routing-dynamic-001', tag: 'next-routing', step: 'files' },
    { question: 'next-routing-global-error-001', tag: 'next-routing', step: 'special-files' },
    { question: 'next-components-use-server-001', tag: 'next-components', step: 'boundaries' },
    { question: 'next-rendering-static-shell-001', tag: 'next-rendering', step: 'streaming' },
    { question: 'next-rendering-static-export-001', tag: 'next-rendering', step: 'build-time' },
    { question: 'next-data-update-tag-001', tag: 'next-data', step: 'revalidate' },
    { question: 'next-routing-router-refresh-001', tag: 'next-data', step: 'revalidate' },
    { question: 'next-actions-body-limit-001', tag: 'next-actions', step: 'cookies-limits' },
    { question: 'next-routing-redirect-001', tag: 'next-actions', step: 'server-actions' },
    { question: 'next-optimization-remote-images-001', tag: 'next-optimization', step: 'images' },
    { question: 'next-optimization-blur-001', tag: 'next-optimization', step: 'images' },
  ],
};

const ARCHITECTURE_COURSE: Course = {
  topic: 'architecture',
  final: [
    { question: 'arch-principles-rule-of-three-001', tag: 'arch-principles', step: 'dry-yagni' },
    { question: 'arch-principles-boolean-trap-001', tag: 'arch-principles', step: 'honest-functions' },
    { question: 'arch-patterns-builder-001', tag: 'arch-patterns', step: 'creational' },
    { question: 'arch-patterns-proxy-001', tag: 'arch-patterns', step: 'wrappers' },
    { question: 'arch-frontend-headless-001', tag: 'arch-frontend', step: 'logic-view' },
    { question: 'arch-frontend-state-machine-001', tag: 'arch-frontend', step: 'states' },
    { question: 'arch-principles-demeter-001', tag: 'arch-dependencies', step: 'coupling' },
    { question: 'arch-principles-functional-core-001', tag: 'arch-dependencies', step: 'injection' },
    { question: 'arch-data-openapi-001', tag: 'arch-data', step: 'contract' },
    { question: 'arch-data-result-001', tag: 'arch-data', step: 'errors' },
    { question: 'arch-scale-affected-001', tag: 'arch-scale', step: 'monorepo' },
    { question: 'arch-scale-performance-budget-001', tag: 'arch-scale', step: 'delivery' },
  ],
};

const TYPESCRIPT_COURSE: Course = {
  topic: 'typescript',
  final: [
    { question: 'ts-never-001', tag: 'any-unknown-never', step: 'never' },
    { question: 'ts-narrowing-004', tag: 'narrowing', step: 'type-guards' },
    { question: 'ts-narrowing-006', tag: 'narrowing', step: 'in-discriminated' },
    { question: 'ts-structural-004', tag: 'structural-typing', step: 'shape' },
    { question: 'ts-literal-002', tag: 'keyof-typeof', step: 'typeof-type' },
    { question: 'ts-generics-004', tag: 'generics', step: 'const-params' },
    { question: 'ts-utility-009', tag: 'utility-types', step: 'from-functions' },
    { question: 'ts-enums-output-001', tag: 'enums', step: 'numeric-enums' },
    { question: 'ts-satisfies-005', tag: 'satisfies', step: 'contextual' },
    { question: 'ts-mapped-005', tag: 'mapped-types', step: 'key-remapping' },
    { question: 'ts-conditional-005', tag: 'conditional-types', step: 'distributive' },
  ],
};

const CSS_COURSE: Course = {
  topic: 'css',
  final: [
    { question: 'css-selectors-005', tag: 'selectors', step: 'nth-child' },
    { question: 'css-cascade-010', tag: 'cascade', step: 'keywords' },
    { question: 'css-box-005', tag: 'box-model', step: 'outline-flow-root' },
    { question: 'css-flex-008', tag: 'flexbox', step: 'basis' },
    { question: 'css-grid-004', tag: 'css-grid', step: 'fr' },
    { question: 'css-pos-005', tag: 'positioning', step: 'absolute' },
    { question: 'css-units-output-001', tag: 'css-units', step: 'em-rem' },
    { question: 'css-modern-006', tag: 'responsive', step: 'fluid' },
    { question: 'css-anim-005', tag: 'animations', step: 'performance-a11y' },
    { question: 'css-cascade-007', tag: 'modern-css', step: 'layers' },
  ],
};

const AI_COURSE: Course = {
  topic: 'ai',
  final: [
    { question: 'ai-llm-009', tag: 'llm-basics', step: 'tokens' },
    { question: 'ai-llm-010', tag: 'llm-basics', step: 'tokens' },
    { question: 'ai-llm-008', tag: 'llm-basics', step: 'limits' },
    { question: 'ai-prompt-006', tag: 'prompting', step: 'structured-output' },
    { question: 'ai-tools-005', tag: 'ai-tools', step: 'context-files' },
    { question: 'ai-rag-009', tag: 'rag', step: 'quality' },
    { question: 'ai-rag-008', tag: 'rag', step: 'quality' },
    { question: 'ai-agents-004', tag: 'agents', step: 'agent-loop' },
    { question: 'ai-front-003', tag: 'ai-frontend', step: 'errors-ux' },
    { question: 'ai-sec-007', tag: 'ai-security', step: 'keys' },
  ],
};

const ALGORITHMS_COURSE: Course = {
  topic: 'algorithms',
  final: [
    { question: 'algo-big-o-amortized-001', tag: 'big-o', step: 'arrays-lists' },
    { question: 'algo-ds-brackets-001', tag: 'data-structures', step: 'brackets' },
    { question: 'algo-search-lower-bound-001', tag: 'searching', step: 'first-true' },
    { question: 'algo-tp-004', tag: 'sorting', step: 'merge-quick' },
    { question: 'algo-hash-anagram-001', tag: 'hashing', step: 'counting' },
    { question: 'algo-tp-sliding-window-001', tag: 'two-pointers', step: 'sliding-window' },
    { question: 'algo-rec-permutations-001', tag: 'recursion', step: 'combinatorics' },
    { question: 'algo-graph-dijkstra-001', tag: 'trees-graphs', step: 'shortest-path' },
    { question: 'algo-graph-cycle-001', tag: 'trees-graphs', step: 'dependencies' },
    { question: 'algo-dp-lcs-001', tag: 'dynamic-programming', step: 'tables' },
  ],
};

const JAVASCRIPT_COURSE: Course = {
  topic: 'javascript',
  final: [
    { question: 'js-types-003', tag: 'types-coercion', step: 'numbers' },
    { question: 'js-equality-004', tag: 'equality', step: 'references' },
    { question: 'js-scope-005', tag: 'scope', step: 'lexical' },
    { question: 'js-live-curry-001', tag: 'closures', step: 'utilities' },
    { question: 'js-objects-002', tag: 'objects', step: 'copies' },
    { question: 'js-live-group-by-001', tag: 'arrays', step: 'boundaries' },
    { question: 'js-this-004', tag: 'this', step: 'arrows' },
    { question: 'js-proto-001', tag: 'prototypes', step: 'chain' },
    { question: 'js-live-memoize-001', tag: 'collections', step: 'patterns' },
    { question: 'js-iterators-004', tag: 'iterators', step: 'generators' },
    { question: 'js-async-001', tag: 'event-loop', step: 'async-await' },
    { question: 'js-live-timeout-001', tag: 'promises', step: 'combinators' },
    { question: 'js-modules-004', tag: 'modules', step: 'exports' },
    { question: 'js-live-chunk-001', tag: 'live-coding', step: 'clarify' },
  ],
};

const REACT_COURSE: Course = {
  topic: 'react',
  final: [
    { question: 'react-portal-001', tag: 'rendering', step: 'jsx-traps' },
    { question: 'react-state-007', tag: 'state', step: 'structure' },
    { question: 'react-keys-005', tag: 'keys', step: 'index-keys' },
    { question: 'react-effects-004', tag: 'effects', step: 'pitfalls' },
    { question: 'react-19-use-context-001', tag: 'hooks-rules', step: 'top-level' },
    { question: 'react-refs-callback-cleanup-001', tag: 'refs', step: 'ref-prop' },
    { question: 'react-19-form-status-001', tag: 'forms', step: 'actions' },
    { question: 'react-context-005', tag: 'context', step: 'value-identity' },
    { question: 'react-state-008', tag: 'memoization', step: 'lazy-deferred' },
    { question: 'react-suspense-003', tag: 'suspense', step: 'error-boundaries' },
    { question: 'react-effects-event-001', tag: 'react-19', step: 'compiler' },
    { question: 'react-rsc-005', tag: 'server-components', step: 'bundle-secrets' },
  ],
};

export const COURSES: Partial<Record<TopicId, Course>> = {
  state: STATE_COURSE,
  git: GIT_COURSE,
  html: HTML_COURSE,
  testing: TESTING_COURSE,
  node: NODE_COURSE,
  next: NEXT_COURSE,
  architecture: ARCHITECTURE_COURSE,
  typescript: TYPESCRIPT_COURSE,
  css: CSS_COURSE,
  ai: AI_COURSE,
  algorithms: ALGORITHMS_COURSE,
  javascript: JAVASCRIPT_COURSE,
  react: REACT_COURSE,
};
