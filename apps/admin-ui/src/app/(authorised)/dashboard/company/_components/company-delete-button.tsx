'use client';

import { CardDeleteButton } from '@admin-ui/components/card-delete-button';

type Props = {
  companyId: string;
};

export function CompanyDeleteButton({ companyId }: Props) {
  const onDelete = (id: string) => {};

  return <CardDeleteButton onPress={() => onDelete(companyId)}>Do you want to delete this company?</CardDeleteButton>;
}
