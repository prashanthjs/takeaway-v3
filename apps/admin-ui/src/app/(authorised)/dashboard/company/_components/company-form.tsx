'use client';

import { useTranslations } from 'next-intl';
import { z } from 'zod';
import { Input } from '@admin-ui/components/form-inputs/input';
import { YesNoRadioGroup } from '@admin-ui/components/form-inputs/yes-no-radio-group';
import { SectionFormModal } from '@admin-ui/components/section-form-modal';
import { useSearchParams } from '@admin-ui/hooks/use-search-params';
import { FormActionEnum } from '@admin-ui/types/form-action';
import { companyCreateSchema } from '@takeaway/common';
import { createCompany } from '../_action';

export const createCompanyFormSchema = companyCreateSchema.extend({
  isActive: z.string().transform((value: string) => value === '1'),
});

export function CompanyForm() {
  const t = useTranslations('company.form');
  const { getSearchParam, updateSearchParams } = useSearchParams();
  const action = getSearchParam('action');
  const editId = getSearchParam('editId');

  const handleClose = () => {
    updateSearchParams({
      action: undefined,
      editId: undefined,
    });
  };

  const onSave = (data: any) => {
    updateSearchParams({
      action: undefined,
      editId: undefined,
    });
  };

  const isOpen = action === FormActionEnum.Add || (action === FormActionEnum.Edit && !!editId);
  const isEdit = action === FormActionEnum.Edit;

  return (
    <SectionFormModal
      title={isEdit ? t('titles.edit') : t('titles.add')}
      isOpen={isOpen}
      onClose={handleClose}
      serverAction={createCompany}
      action={action as FormActionEnum}
      defaultValues={{}}
      schema={createCompanyFormSchema}
      onSave={onSave}
    >
      {(methods, isPending) => (
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
            <YesNoRadioGroup
              control={methods.control}
              name="isActive"
              label={t('controls.isActive.label')}
              disabled={isPending}
            />
          </div>
        </div>
      )}
    </SectionFormModal>
  );
}
