'use client';

import { ChangeEvent } from 'react';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Button, Select, SelectItem } from '@heroui/react';
import { ArrowDownAZIcon, ArrowUpAZIcon } from 'lucide-react';
import { useSearchParams } from '@admin-ui/hooks/use-search-params';

export type SortDirection = 'asc' | 'desc';

type Props = {
  sortOptions?: { value: string; label: string }[];
};

export function SectionSort({ sortOptions }: Props) {
  const t = useTranslations('common.sort');

  const { getSearchParam, updateSearchParam } = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const sort = getSearchParam('sort')?.toString() || undefined;
  const sortDirection = getSearchParam('sortDirection')?.toString() || 'asc';

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => updateSearchParam('sort', e.target.value);
  const handleSortDirection = (sortDirection: SortDirection) => updateSearchParam('sortDirection', sortDirection);

  return (
    <div className={'flex gap-2'}>
      <Select
        items={sortOptions}
        name="sort"
        className="max-w-xs"
        onChange={handleSort}
        placeholder={t('title')}
        defaultSelectedKeys={sort ? [sort] : undefined}
      >
        {sortOption => <SelectItem key={sortOption.value}>{sortOption.label}</SelectItem>}
      </Select>
      <Button
        isIconOnly
        onPress={() => handleSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
        aria-label={t('direction.title')}
      >
        {sortDirection === 'asc' ? <ArrowDownAZIcon /> : <ArrowUpAZIcon />}
      </Button>
    </div>
  );
}
