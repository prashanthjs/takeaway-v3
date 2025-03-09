import { CompanyCreateType, CompanyUpdateType } from '@takeaway/common';
import { FormActionEnum } from '@/types/form-action';
import { getCompanyAction } from '../_action';
import { CompanyForm } from './company-form';

const initialValues: CompanyCreateType & { _id: string | null } = {
  _id: null,
  name: '',
  title: '',
  isActive: false,
  description: '',
};

type Props = {
  action: string | undefined;
  editId: string | undefined;
};

export async function CompanyFormLoader({ action, editId }: Props) {
  const isOpen = action === FormActionEnum.Add || (action === FormActionEnum.Edit && !!editId);
  let companyValues = initialValues;
  if (editId) {
    const result = await getCompanyAction({ editId });
    if (result?.serverError) {
      throw new Error(result?.serverError);
    }
    companyValues = (result?.data as CompanyUpdateType) ?? initialValues;
  }

  return <CompanyForm defaultValues={companyValues} isOpen={isOpen} />;
}
