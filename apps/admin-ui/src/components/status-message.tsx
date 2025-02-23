import { useTranslations } from 'next-intl';
import { Button } from '@heroui/react';

type StatusMessageProps = {
  isLoading?: boolean;
  isRefreshing?: boolean;
  isDeleting?: boolean;
  isSaving?: boolean;
};

export function StatusMessage({ isDeleting, isLoading, isRefreshing, isSaving }: StatusMessageProps) {
  const t = useTranslations('common');
  return (
    <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 -translate-y-1/2 transform">
      {isLoading && <Button isLoading={true}>{t('loading')}</Button>}
      {isDeleting && <Button isLoading={true}>{t('deleting')}</Button>}
      {isRefreshing && !isLoading && <Button isLoading={true}>{t('refreshing')}</Button>}
      {isSaving && <Button isLoading={true}>{t('saving')}</Button>}
    </div>
  );
}
