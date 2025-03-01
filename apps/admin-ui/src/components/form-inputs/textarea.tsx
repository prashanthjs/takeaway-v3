'use client';

import { useController, UseControllerProps } from 'react-hook-form';
import { Textarea as BaseTextarea, TextAreaProps } from '@heroui/react';

export function Textarea(props: UseControllerProps<any> & TextAreaProps) {
  const { field, fieldState } = useController(props);

  return <BaseTextarea {...field} {...props} isInvalid={fieldState.invalid} errorMessage={fieldState.error?.message} />;
}
