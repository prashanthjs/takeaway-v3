'use client';

import { useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@heroui/react';
import { Trash2Icon } from 'lucide-react';

type CardDeleteButtonProps = {
  onPress: () => void;
  children: React.ReactNode;
  isActionDisabled?: boolean;
};

export function CardDeleteButton({ onPress, children, isActionDisabled }: CardDeleteButtonProps) {
  const t = useTranslations('common');
  const ref = useRef<HTMLElement>(null);
  return (
    <Popover showArrow placement={'bottom'}>
      <PopoverTrigger>
        <Button
          isIconOnly
          color="danger"
          variant="faded"
          aria-label="Delete Button"
          size={'sm'}
          isDisabled={isActionDisabled}
        >
          <Trash2Icon size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-1">
        <div className={'flex flex-col gap-2 p-4'}>
          <p>{children}</p>
          <div className={'mt-2 flex justify-end gap-2'}>
            <Button
              size={'sm'}
              color={'danger'}
              onPress={() => {
                onPress();
                ref.current?.click();
              }}
              isDisabled={isActionDisabled}
            >
              {t('yes')}
            </Button>
            <Button
              size={'sm'}
              disabled={isActionDisabled}
              onPress={() => {
                ref.current?.click();
              }}
            >
              {t('no')}
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
