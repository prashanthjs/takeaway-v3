'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Error500Page } from './error-500-page';

export type ErrorType = string | (Error & { statusCode?: number });

type ErrorMessageProps = {
  error: ErrorType;
};

export function ErrorPage({ error }: ErrorMessageProps) {
  const router = useRouter();

  const statusCode = useMemo(() => {
    if (!error) return null;
    if (error instanceof Error) return 500;
    if ((error as any)?.response?.status) {
      return (error as any).response.status;
    }
    return undefined;
  }, [error]);

  const message = useMemo(() => {
    if (!error) return null;
    if (error instanceof Error) return error.message;
    if ((error as any)?.response?.data?.message) {
      return (error as any).response.data.message;
    } else if (typeof error === 'string') {
      return error;
    }

    return (error as unknown as Error)?.message;
  }, [error]);

  useEffect(() => {
    if (error instanceof Error) {
      console.error(error);
    }
    if (statusCode === 401) {
      router.push('/login');
    }
    if (statusCode === 403) {
      router.push('/dashboard/403');
    }
  }, [statusCode, router, error]);

  return <Error500Page errorMessage={message || 'Something went wrong!'} />;
}

export default ErrorPage;
