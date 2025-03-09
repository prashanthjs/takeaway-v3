'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from '@heroui/react';
import { cn } from '@/utils/common';

type Props = {
  title?: string;
  children: ReactNode;
  isOpen: boolean;
  className?: string;
  onSubmit: () => void;
  onClose: () => void;
  isPending?: boolean;
  isDisabled?: boolean;
  isCompact?: boolean;
};

export function FormModal({
  title,
  children,
  isOpen,
  className,
  onSubmit,
  onClose,
  isPending,
  isDisabled,
  isCompact = false,
}: Props) {
  const t = useTranslations('common');
  const modalRef = useRef<HTMLElement | null>(null);
  const { isOpen: isModalOpen, onClose: handleClose } = useDisclosure({ isOpen });

  useEffect(
    function () {
      if (isOpen !== isModalOpen) {
        handleClose();
      }
    },
    [isOpen, isModalOpen, handleClose],
  );

  useEffect(
    function () {
      if (isOpen && modalRef.current) {
        const modalHeight = modalRef.current.offsetHeight;
      }
    },
    [isOpen, modalRef],
  );

  return (
    <Modal
      isOpen={isOpen}
      className={cn(
        ' fixed inset-y-0 right-0 overflow-auto',
        isCompact ? ' max-w-[500px]' : ' max-w-[800px]',
        className,
      )}
      isDismissable={false}
      hideCloseButton={false}
      onClose={onClose}
      ref={modalRef}
    >
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
    </Modal>
  );
}
