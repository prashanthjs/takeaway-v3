'use client';

import { useController, UseControllerProps } from 'react-hook-form';
import { Radio, RadioGroup, RadioGroupProps } from '@heroui/react';

type RadioItemsType = {
  label: string;
  value: string;
  description?: string;
};

export function SimpleRadioGroup(props: UseControllerProps<any> & RadioGroupProps & { items: RadioItemsType[] }) {
  const { field, fieldState } = useController(props);

  return (
    <RadioGroup {...field} {...props} isInvalid={fieldState.invalid} errorMessage={fieldState.error?.message}>
      {props.items.map(item => (
        <Radio key={item.label} value={item.value} description={item.description}>
          {item.label}
        </Radio>
      ))}
    </RadioGroup>
  );
}
