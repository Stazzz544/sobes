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

export const COURSES: Partial<Record<TopicId, Course>> = {
  state: STATE_COURSE,
  git: GIT_COURSE,
};
