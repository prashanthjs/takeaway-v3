'use client';

import { useTranslations } from 'next-intl';
import { Input as BaseInput } from '@heroui/react';
import { Search } from 'lucide-react';
import { useDebouncedCallback } from 'use-debounce';
import { useSearchParams } from '@/hooks/use-search-params';

export function SectionSearch() {
  const t = useTranslations('common.search');
  const { getSearchParam, updateSearchParam } = useSearchParams();

  const handleSearch = useDebouncedCallback(term => {
    updateSearchParam('search', term);
  }, 300);

  return (
    <BaseInput
      name="search"
      placeholder={t('placeholder')}
      endContent={<Search />}
      onValueChange={handleSearch}
      defaultValue={getSearchParam('search')?.toString()}
    />
  );
}
