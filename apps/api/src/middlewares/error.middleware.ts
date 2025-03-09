import { Context } from 'hono';
import { HTTPException } from 'hono/http-exception';

// Error Handler
export function errorHandler(err: Error | HTTPException, c: Context) {
  const status = err instanceof HTTPException ? err.status : 500;

  c.status(status);

  return c.json({
    success: false,
    message: err.message ?? 'Something went wrong.',
    status: status,
    stack: process.env.NODE_ENV === 'production' ? null : c.error?.stack,
  });
}

// Not Found Handler
export const notFound = (c: Context) => {
  c.status(404);
  return c.json({
    success: false,
    status: 404,
    message: `Not Found - [${c.req.method}] ${c.req.url}`,
  });
};
