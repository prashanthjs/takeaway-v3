import { serve } from '@hono/node-server';

import { app } from '@api/index';

import { config } from './config';
import { logger } from './utils/logger';

logger.info(`Starting server on port ${config.port}`);

serve({
  port: config.port,
  fetch: app.fetch,
});
