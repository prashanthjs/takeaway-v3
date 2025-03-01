'use client';

import { ErrorPage } from '@admin-ui/components/error-page';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <ErrorPage error={error?.message ?? 'Something went wrong.'} />;
}
