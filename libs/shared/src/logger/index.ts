import pino from 'pino';
import { config } from '../config';

// Best Practice: Centralized logging configuration using validated config
export const logger = pino({
  level: config.LOG_LEVEL,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
});
