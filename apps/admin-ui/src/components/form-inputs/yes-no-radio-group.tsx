'use client';

import { UseControllerProps } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { RadioGroupProps } from '@heroui/react';
import { SimpleRadioGroup } from './simple-radio-group';

export function YesNoRadioGroup(props: UseControllerProps<any> & RadioGroupProps) {
  const t = useTranslations('common');
  return (
    <SimpleRadioGroup
      defaultValue="0"
      orientation="horizontal"
      {...props}
      items={[
        { label: t('form.yesNoControl.yes'), value: '1' },
        { label: t('form.yesNoControl.no'), value: '0' },
      ]}
    />
  );
}
