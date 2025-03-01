'use client';

import { ErrorPage } from '@admin-ui/components/error-page';

export default function DashboardError({ error }: { error: Error & { digest?: string; cause?: unknown } }) {
  console.log('Dashboard Error', JSON.stringify(error), error.cause);

  return <ErrorPage error={error?.message ?? 'Something went wrong.'} />;
}
