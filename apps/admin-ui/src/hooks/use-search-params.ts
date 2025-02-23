'use client';

import { useCallback } from 'react';

import { useSearchParams as useBaseSearchParams, usePathname, useRouter } from 'next/navigation';

export function useSearchParams() {
  const router = useRouter();
  const searchParams = useBaseSearchParams();
  const pathname = usePathname();

  const getSearchParam = useCallback((key: string) => searchParams.get(key), [searchParams]);

  const pushParams = useCallback(
    (params: Record<string, string | undefined | number | null>) => {
      const urlSearchParams = new URLSearchParams(searchParams);
      Object.entries(params).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return urlSearchParams.delete(key);
        return urlSearchParams.set(key, String(value));
      });
      router.push(`${pathname}?${urlSearchParams.toString()}`);
    },
    [router, searchParams, pathname],
  );

  return {
    searchParams,
    getSearchParam,
    pushParams,
  };
}
