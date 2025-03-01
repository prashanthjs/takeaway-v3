'use client';

import { useController, UseControllerProps } from 'react-hook-form';
import { Checkbox as BaseInput, CheckboxProps } from '@heroui/react';

export function CheckboxInput(props: UseControllerProps<any> & CheckboxProps) {
  const { field, fieldState } = useController(props);
  return (
    <BaseInput
      {...props}
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
      isSelected={field.value}
      onValueChange={value => {
        field.onChange(value);
      }}
    />
  );
}
