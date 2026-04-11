import { mergeConfig } from 'vitest/config';
import baseConfig from '../../vitest.base.config';

export default mergeConfig(baseConfig, {
  test: {
    name: 'db',
    include: ['src/**/*.test.ts'],
  },
});
