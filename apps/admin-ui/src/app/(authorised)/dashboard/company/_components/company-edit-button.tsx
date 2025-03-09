'use client';

import { CardEditButton } from '@/components/card-edit-button';
import { useSearchParams } from '@/hooks/use-search-params';

type Props = {
  companyId: string;
};

export function CompanyEditButton({ companyId }: Props) {
  const {updateSearchParams} = useSearchParams();
  const onEdit = (id: string) => {
    updateSearchParams({
      action: 'edit',
      editId: id,
    });
  };

  return <CardEditButton onPress={() => onEdit(companyId)} />;
}
