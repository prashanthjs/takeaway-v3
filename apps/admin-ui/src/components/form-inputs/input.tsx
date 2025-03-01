'use client';

import { useController, UseControllerProps } from 'react-hook-form';
import { Input as BaseInput, InputProps } from '@heroui/react';

export function Input(props: UseControllerProps<any> & InputProps) {
  const { field, fieldState } = useController(props);

  return <BaseInput {...field} {...props} isInvalid={fieldState.invalid} errorMessage={fieldState.error?.message} />;
}
