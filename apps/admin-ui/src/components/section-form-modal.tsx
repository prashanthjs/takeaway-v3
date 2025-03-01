'use client';

import type { ReactNode } from 'react';
import { startTransition, useActionState, useEffect, useRef } from 'react';
import { FieldValues, FormProvider, useForm, UseFormReturn } from 'react-hook-form';
import { Alert } from '@heroui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { FormModal } from '@admin-ui/components/form-modal';
import { FormActionEnum, RequestState } from '@admin-ui/types/form-action';

type Props = {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  schema: z.ZodObject<any>;
  serverAction: (state: RequestState | null, payload: FieldValues) => void;
  action?: FormActionEnum;
  defaultValues?: FieldValues;
  children: (formMethods: UseFormReturn, isPending: boolean) => ReactNode;
};

export function SectionFormModal({
  title,
  isOpen,
  onClose,
  onSave,
  schema,
  serverAction,
  action,
  defaultValues,
  children,
}: Props) {
  const formRef = useRef(null);
  const methods = useForm({
    resolver: zodResolver(schema),
    defaultValues: defaultValues ?? {},
  });

  const [state, formAction, isPending] = useActionState<any, any>(serverAction, null);
  function onSubmit(data: FieldValues) {
    startTransition(() => {
      formAction(data);
    });
  }

  const isSuccess = state?.isSuccess;

  const handleClose = () => {
    methods.reset({});
    onClose();
  };

  useEffect(() => {
    if (isSuccess) {
      onSave(state?.data);
      methods.reset({});
    }
  }, [isSuccess]);

  console.log('state', state);
  console.log('isPending', isPending);
  console.log('action', action);

  return (
    <FormModal
      title={title}
      isOpen={isOpen}
      onClose={handleClose}
      onSubmit={methods.handleSubmit(onSubmit)}
      isPending={isPending}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
          {isSuccess && <Alert color="success">Success</Alert>}
          {isSuccess === false && state?.message && (
            <Alert color="danger" description={state.message} className="mb-4" />
          )}
          {children(methods, isPending)}
        </form>
      </FormProvider>
    </FormModal>
  );
}
