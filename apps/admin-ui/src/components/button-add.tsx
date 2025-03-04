'use client';

import { Button } from '@heroui/react';
import { Plus } from 'lucide-react';
import { useSearchParams } from '@admin-ui/hooks/use-search-params';
import { FormActionEnum } from '@admin-ui/types/form-action';

interface Props {
  title: string;
}

export function ButtonAdd({ title }: Props) {
  const { updateSearchParam } = useSearchParams();

  const handleOnPress = () => {
    updateSearchParam('action', FormActionEnum.Add);
  };

  return (
    <Button color="primary" onPress={handleOnPress} startContent={<Plus />}>
      {title}
    </Button>
  );
}
