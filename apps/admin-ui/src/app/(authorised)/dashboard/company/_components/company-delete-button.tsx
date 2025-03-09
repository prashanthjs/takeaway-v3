'use client';

import { useTranslations } from 'next-intl';
import { useAction } from 'next-safe-action/hooks';
import { addToast } from '@heroui/react';
import { CardDeleteButton } from '@/components/card-delete-button';
import { deleteCompanyAction } from '../_action';

type Props = {
  companyId: string;
  name: string;
};

export function CompanyDeleteButton({ companyId, name }: Props) {
  const t = useTranslations('company.deleteMessages');
  const { execute: executeDelete, isPending } = useAction(deleteCompanyAction, {
    onSuccess() {
      addToast({
        title: t('success.title'),
        description: t('success.description', { name }),
        color: 'success',
      });
    },
    onError(error) {
      console.error(error);
      addToast({
        title: t('error.title'),
        description: t('error.description', { name }),
        color: 'danger',
      });
    },
  });

  function onDelete(id: string) {
    executeDelete({ _id: id });
  }

  return (
    <CardDeleteButton isPending={isPending} onPress={() => onDelete(companyId)}>
      {t('confirm', { name })}
    </CardDeleteButton>
  );
}
