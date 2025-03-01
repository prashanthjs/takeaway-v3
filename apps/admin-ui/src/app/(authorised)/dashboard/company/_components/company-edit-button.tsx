'use client';

import { CardEditButton } from '@admin-ui/components/card-edit-button';

type Props = {
  companyId: string;
};

export function CompanyEditButton({ companyId }: Props) {
  const onEdit = (id: string) => {};

  return <CardEditButton onPress={() => onEdit(companyId)} />;
}
