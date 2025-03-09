'use client';

import { UseControllerProps, useFormContext, useController } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { RadioGroupProps, Radio, RadioGroup } from '@heroui/react';

export function YesNoRadioGroup(props: UseControllerProps<any> & RadioGroupProps) {
  const { setValue, getValues } = useFormContext();
  const { fieldState } = useController(props);
  const t = useTranslations('common');
  const value = getValues(props.name);
  const items = [
    { label: t('form.yesNoControl.yes'), value: '1' },
    { label: t('form.yesNoControl.no'), value: '0' },
  ];
  return (
    <RadioGroup
      name={props.name}
      label={props.label}
      value={value === true ? '1' : '0'}
      defaultValue={value === true ? '1' : '0'}
      onValueChange={value => {
        setValue(props.name, value === '1');
      }}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      orientation="horizontal"
    >
      {items.map(item => (
        <Radio key={item.label} value={item.value}>
          {item.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}
