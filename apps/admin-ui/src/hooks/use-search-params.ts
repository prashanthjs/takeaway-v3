'use client';

import { useSearchParams as useBaseSearchParams, usePathname, useRouter } from 'next/navigation';

export function useSearchParams() {
  const router = useRouter();
  const searchParams = useBaseSearchParams();
  const pathname = usePathname();

  const getSearchParam = (key: string) => searchParams.get(key)?.toString();

  const pushParams = (params: Record<string, string | undefined | number | null>) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return urlSearchParams.delete(key);
      return urlSearchParams.set(key, String(value));
    });
    router.push(`${pathname}?${urlSearchParams.toString()}`);
  };

  const updateSearchParam = (key: string, value: string | null | undefined) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  const updateSearchParams = (params: Record<string, string | undefined | number | null>) => {
    const urlSearchParams = new URLSearchParams(searchParams);
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined || value === null || value === '') return urlSearchParams.delete(key);
      return urlSearchParams.set(key, String(value));
    });
    router.replace(`${pathname}?${urlSearchParams.toString()}`);
  };

  return {
    searchParams,
    getSearchParam,
    pushParams,
    updateSearchParam,
    updateSearchParams,
    pathname,
  };
}
