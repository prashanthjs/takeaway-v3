'use client';

import { useEffect } from 'react';
import { ErrorPage } from '@admin-ui/components/error-page';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return <ErrorPage error={error?.message ?? 'Something went wrong.'} />;
}
