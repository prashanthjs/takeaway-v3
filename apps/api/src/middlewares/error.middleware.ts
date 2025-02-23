import { Context } from 'hono';
import type { StatusCode } from 'hono/dist/types/utils/http-status';

// Error Handler
export function errorHandler(c: Context) {
  console.log(c.res.status);
  c.status((c.res.status as StatusCode) || 500);
  return c.json({
    success: false,
    message: c.error?.message,
    status: c.res.status,
    stack: process.env.NODE_ENV === 'production' ? null : c.error?.stack,
  });
}

// Not Found Handler
export const notFound = (c: Context) => {
  return c.json({
    success: false,
    message: `Not Found - [${c.req.method}] ${c.req.url}`,
  });
};
