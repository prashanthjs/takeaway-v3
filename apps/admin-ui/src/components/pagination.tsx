'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination as BasePagination } from '@heroui/react';

export function Pagination({ total }: { total: number }) {
  const pathname = usePathname();
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const page = Number(searchParams.get('page')) || 1;

  const onPageChange = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    replace(`${pathname}?${params.toString()}`);
  };

  if (!total || total <= 1) {
    return null;
  }

  return <BasePagination total={total} page={page} onChange={onPageChange} />;
}
