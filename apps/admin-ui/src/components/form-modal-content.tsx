import type { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import { Button, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react';

export type FormModalContentProps = {
  children: ReactNode;
  title?: string;
  onSubmit: () => void;
  onClose: () => void;
  isPending?: boolean;
  isDisabled?: boolean;
};

export function FormModalContent({ children, title, onSubmit, onClose, isPending, isDisabled }: FormModalContentProps) {
  const t = useTranslations('common');
  return (
    <ModalContent>
      {title && <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>}
      <ModalBody>{children}</ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onClose} isDisabled={isDisabled}>
          {t('formModal.actions.cancel')}
        </Button>
        <Button color="primary" onPress={onSubmit} isLoading={isPending} isDisabled={isDisabled}>
          {t('formModal.actions.submit')}
        </Button>
      </ModalFooter>
    </ModalContent>
  );
}
