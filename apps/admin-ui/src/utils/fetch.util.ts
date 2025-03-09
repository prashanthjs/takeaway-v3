'use server';

import qs from 'qs';
import { ApiError } from './error.util';

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export async function fetchData<T>({
  url,
  headers,
  method,
  body,
  query,
}: {
  url: string;
  headers?: Record<string, string>;
  method?: string;
  body?: Record<string, unknown>;
  query?: Record<string, unknown>;
}): Promise<{ data: T; status: number }> {
  url = `${apiBaseUrl}${url}`;
  url = url.replace('//', '/');

  if (query) {
    url = `${url}?${qs.stringify(query)}`;
  }
  const res = await fetch(`${url}`, {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body && JSON.stringify(body),
  });

  if (!res.ok) {
    const body = await res.json();
    throw new ApiError({
      message: body?.message ?? res.statusText,
      status: res.status,
      statusText: res.statusText,
      issues: body?.error?.issues ?? [],
    });
  }

  const data: T = (await res.json().catch(() => null)) as T;

  return {
    data,
    status: res.status,
  };
}
