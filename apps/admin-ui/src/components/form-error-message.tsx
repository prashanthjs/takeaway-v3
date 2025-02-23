import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardBody } from '@heroui/react';

export type ErrorType = string | (Error & { statusCode?: number });

type ErrorMessageProps = {
  error: ErrorType | string;
  defaultErrorMessages?: Record<number, string>;
};

export function FormErrorMessage({ error, defaultErrorMessages }: ErrorMessageProps) {
  const { push } = useRouter();
  const statusCode = useMemo(() => {
    if ((error as any)?.response?.status) {
      return (error as any).response.status;
    }
    return undefined;
  }, [error]);

  const message = useMemo(() => {
    if (statusCode && defaultErrorMessages && defaultErrorMessages[statusCode]) {
      return defaultErrorMessages[statusCode];
    } else if ((error as any)?.response?.data?.message) {
      return (error as any).response.data.message;
    } else if (typeof error === 'string') {
      return error;
    }

    return (error as Error)?.message;
  }, [error, defaultErrorMessages, statusCode]);

  useEffect(() => {
    if (statusCode === 401) {
      push('/login');
    }
    if (statusCode === 403) {
      push('/dashboard/403');
    }
  }, [statusCode, push]);

  return (
    <Card className="border-1 border-danger bg-danger-400 bg-opacity-50">
      <CardBody>
        <p>{message}</p>
      </CardBody>
    </Card>
  );
}
