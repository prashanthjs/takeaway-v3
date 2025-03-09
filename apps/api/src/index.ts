import { cors } from 'hono/cors';
import { logger } from 'hono/logger';
import { prettyJSON } from 'hono/pretty-json';
import { swaggerUI } from '@hono/swagger-ui';
import { OpenAPIHono } from '@hono/zod-openapi';
import { config } from './config';
import { databaseInit } from './inits/database.init';
import { notFound, errorHandler } from './middlewares/error.middleware';
import { branchRoute } from './routes/branch.route';
import { companyRoute } from './routes/company.route';
import { logger as customLogger } from './utils/logger';

export const app = new OpenAPIHono().basePath(config.globalPrefix);

databaseInit();

app.use('*', logger(customLogger.http), prettyJSON());

/** CORS */
app.use(
  '*',
  cors({
    origin: '*',
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  }),
);
/** end of CORS */

app.get('/', c => c.text('Hello Node.js!'));
app.route('/companies', companyRoute);
app.route('/branches', branchRoute);

/** Error Handlers */
// Error Handler

app.onError((err, c) => errorHandler(err, c));
app.notFound(c => notFound(c));

/** end of error handlers */

/** Swagger UI & OpenAPI */
app.doc('/openapi', {
  openapi: '3.1.0',
  info: {
    version: '1.0.0',
    title: 'Takeaway API',
  },
});
app.get('/swagger', swaggerUI({ url: `${config.globalPrefix}/openapi`, version: '3.1.0' }));
