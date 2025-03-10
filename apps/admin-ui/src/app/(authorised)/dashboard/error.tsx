'use client';

import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import { ErrorPage } from '@/components/error-page';

export default function DashboardError({ error }: { error: Error & { digest?: string; cause?: unknown } }) {
  useEffect(() => {
    console.error(error);
    console.error(error.message);
    Sentry.captureException(error);
  }, [error]);

  return <ErrorPage error={error?.message ?? 'Something went wrong.'} />;
}
