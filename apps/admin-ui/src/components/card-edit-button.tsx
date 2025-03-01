'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@heroui/react';
import { PencilIcon } from 'lucide-react';

type CardEditButtonProps = {
  onPress: () => void;
  isDisabled?: boolean;
};

export function CardEditButton({ onPress, isDisabled }: CardEditButtonProps) {
  const t = useTranslations('common');
  return (
    <Button isIconOnly color="default" aria-label={t('edit')} size={'sm'} onPress={onPress} isDisabled={isDisabled}>
      <PencilIcon size={16} />
    </Button>
  );
}
