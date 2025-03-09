'use client';

import { useController, UseControllerProps } from 'react-hook-form';
import { Input as BaseInput, InputProps } from '@heroui/react';
import { useNumberFormatter } from '@/hooks/formatter/use-number-formatter';

export function CurrencyInput(props: UseControllerProps<any> & InputProps) {
  const { currencySymbol } = useNumberFormatter();
  const { field, fieldState } = useController(props);

  return (
    <BaseInput
      {...field}
      {...props}
      type="number"
      startContent={
        <div className="pointer-events-none flex items-center">
          <span className="text-small text-foreground">{currencySymbol}</span>
        </div>
      }
      isInvalid={fieldState.invalid}
      errorMessage={fieldState.error?.message}
    />
  );
}
