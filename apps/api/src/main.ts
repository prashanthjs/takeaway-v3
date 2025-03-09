import { serve } from '@hono/node-server';
import { config } from './config';
import { app } from './index';
import { logger } from './utils/logger';

logger.info(`Starting server on port ${config.port}`);

serve({
  port: config.port,
  fetch: app.fetch,
});
