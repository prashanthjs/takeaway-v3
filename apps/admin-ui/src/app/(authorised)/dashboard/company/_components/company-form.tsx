'use client';

import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { useAction } from 'next-safe-action/hooks';
import { zodResolver } from '@hookform/resolvers/zod';
import { CompanyCreateType, CompanyUpdateType, companyCreateSchema, companyUpdateSchema } from '@takeaway/common';
import { FormErrorMessage } from '@/components/form-error-message';
import { Input } from '@/components/form-inputs/input';
import { Textarea } from '@/components/form-inputs/textarea';
import { YesNoRadioGroup } from '@/components/form-inputs/yes-no-radio-group';
import { FormModal } from '@/components/form-modal';
import { FormSuccessMessage } from '@/components/form-success-message';
import { useSearchParams } from '@/hooks/use-search-params';
import { saveCompanyAction, updateCompanyAction } from '../_action';

type FormType = CompanyCreateType | CompanyUpdateType;

type Props = {
  defaultValues: FormType;
  isOpen: boolean;
};

export function CompanyForm({ defaultValues, isOpen }: Props) {
  const t = useTranslations('company.form');
  const { updateSearchParams } = useSearchParams();
  const isEdit = !!(defaultValues as CompanyUpdateType)?._id;
  const schemaToUse = isEdit ? companyUpdateSchema : companyCreateSchema;

  const {
    execute: executeSave,
    result,
    isPending,
    reset: resetSaveAction,
  } = useAction(isEdit ? updateCompanyAction : saveCompanyAction, { onSuccess: closeModal });
  const saveResult = result?.data;

  const methods = useForm<FormType>({
    mode: 'onBlur',
    resolver: zodResolver(schemaToUse as never),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    if (isOpen) {
      resetSaveAction();
      methods.reset({ ...defaultValues });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, defaultValues]);

  function closeModal() {
    updateSearchParams({
      action: undefined,
      editId: undefined,
    });
  }

  async function onSubmit(data: FormType) {
    await executeSave({
      ...defaultValues,
      ...data,
    });
  }

  return (
    <FormModal
      title={isEdit ? t('titles.edit') : t('titles.add')}
      isOpen={isOpen}
      onClose={closeModal}
      onSubmit={methods.handleSubmit(onSubmit)}
      isPending={isPending}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <FormSuccessMessage isDisplayed={!!saveResult?._id} message={t('messages.success')} className="mb-4" />
          <FormErrorMessage
            serverError={result?.serverError}
            validationErrors={result?.validationErrors}
            className="mb-4"
          />
          <div className={'flex flex-col gap-8'}>
            <div className="flex flex-row gap-4">
              <Input
                control={methods.control}
                name="name"
                label={t('controls.name.label')}
                placeholder={t('controls.name.placeholder')}
                disabled={isPending || isEdit}
              />
            </div>
            <div className="flex flex-row gap-4">
              <Input
                control={methods.control}
                name="title"
                label={t('controls.title.label')}
                placeholder={t('controls.title.placeholder')}
                disabled={isPending}
              />
            </div>
            <div className="flex flex-row gap-4">
              <Textarea
                control={methods.control}
                name="description"
                label={t('controls.description.label')}
                placeholder={t('controls.description.placeholder')}
                disabled={isPending}
              />
            </div>
            <div className="flex flex-row gap-4">
              <YesNoRadioGroup
                control={methods.control}
                name="isActive"
                label={t('controls.isActive.label')}
                disabled={isPending}
              />
            </div>
          </div>
        </form>
      </FormProvider>
    </FormModal>
  );
}
