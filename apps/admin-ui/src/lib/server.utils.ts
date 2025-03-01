'use server';

import { ZodIssue } from 'zod';
import { RequestState } from '@admin-ui/types/form-action';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchData<T>({
  url,
  headers,
  method,
  body,
}: {
  url: string;
  headers?: Record<string, string>;
  method?: string;
  body?: Record<string, unknown>;
}): Promise<RequestState<T>> {
  url = `${apiBaseUrl}${url}`;
  url = url.replace('//', '/');

  const res = await fetch(`${url}`, {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body && JSON.stringify(body),
  });

  let isSuccess = res.ok;
  let errors: ZodIssue[] | null = null;
  let data: T | null = null;
  let message: string | null = null;
  if (!res.ok) {
    isSuccess = false;
    const body = await res.json();
    errors = body?.error?.issues;
    message = body?.message;
    console.log(url);
    console.log(res.statusText);
    console.log('Errors', JSON.stringify(errors, null, 2));
    console.log('Message', message);
  } else {
    data = await res.json();
  }

  return {
    isSuccess,
    data,
    errors,
    status: res.status,
    statusText: res.statusText,
    message: message,
  };
}
