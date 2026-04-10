import { defineWorkspace } from 'vitest/config';

// Unified workspace for all testing projects in the monorepo
export default defineWorkspace([
  'libs/db/vitest.config.ts',
  'libs/shared/vitest.config.ts',
  'apps/backend/vitest.config.ts',
]);
