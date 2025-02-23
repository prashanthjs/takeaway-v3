'use client';

import { useTranslations } from 'next-intl';

export function useFormValidationMessages() {
  const t = useTranslations();

  const getRequiredMessage = (control: string) => t(`common.form.messages.required`, { control });
  const getMinMessage = (control: string, value: number) => t(`common.form.messages.min`, { control, value });
  const getMaxMessage = (control: string, value: number) => t(`common.form.messages.max`, { control, value });
  const getIntMessage = (control: string) => t(`common.form.messages.int`, { control });
  const getIdMessage = (control: string) => t(`common.form.messages.idRegex`, { control });
  const getSelectOneMessage = (control: string) => t(`common.form.messages.selectOne`, { control });
  const getEmailMessage = (control: string) => t(`common.form.messages.email`, { control });

  return {
    getRequiredMessage,
    getMinMessage,
    getMaxMessage,
    getIntMessage,
    getIdMessage,
    getSelectOneMessage,
    getEmailMessage,
  };
}
