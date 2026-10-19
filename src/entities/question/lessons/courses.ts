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

export const COURSES: Partial<Record<TopicId, Course>> = {
  state: STATE_COURSE,
  git: GIT_COURSE,
  html: HTML_COURSE,
  testing: TESTING_COURSE,
  node: NODE_COURSE,
  next: NEXT_COURSE,
  architecture: ARCHITECTURE_COURSE,
  typescript: TYPESCRIPT_COURSE,
};
