import { createSafeActionClient } from 'next-safe-action';
import * as Sentry from '@sentry/nextjs';
import { z } from 'zod';
import { ApiError } from './error.util';

export const actionClient = createSafeActionClient({
  defineMetadataSchema() {
    return z.object({
      actionName: z.string(),
    });
  },
  handleServerError(e, utils) {
    const { clientInput, metadata } = utils;
    console.error('error', e.constructor.name, e instanceof ApiError, e.name);
    Sentry.captureException(e, scope => {
      scope.clear();
      scope.setContext('serverError', { message: e.message });
      scope.setContext('metadata', { actionName: metadata?.actionName });
      scope.setContext('clientInput', { clientInput });
      if (e.constructor.name === 'ApiError') {
        const apiError = e as ApiError;
        scope.setContext('apiError', {
          status: apiError.status,
          statusText: apiError.statusText,
          issues: apiError.issues,
          url: apiError.url,
          message: apiError.message,
        });
      }
      return scope;
    });

    if (e.constructor.name === 'ApiError') {
      const apiError = e as ApiError;
      if (apiError.status === 404) {
        return 'API: Resource not found';
      }
      return 'API:' + e.message;
    }
    return e.message;
  },
});
