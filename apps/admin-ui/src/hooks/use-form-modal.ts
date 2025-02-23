'use client';

import { create } from 'zustand';

type FormModalState = {
  id?: string | null;
  isOpen?: boolean;
  additionalData?: Record<string, any>;
};

interface FormModal {
  modalStates: Record<string, FormModalState>;
  setId: (key: string, id?: string | null) => void;
  setAdditionalData: (key: string, additionalData?: Record<string, any>) => void;
  openModal: (key: string, id?: string | null, additionalData?: Record<string, any>) => void;
  closeModal: (key: string) => void;
  reset: (key: string) => void;
}

const useStore = create<FormModal>(set => ({
  modalStates: {},
  setId: (key: string, id?: string | null) => {
    set(state => ({
      modalStates: {
        ...state.modalStates,
        [key]: {
          ...state.modalStates[key],
          id,
        },
      },
    }));
  },
  setAdditionalData: (key: string, additionalData?: Record<string, any>) => {
    set(state => ({
      modalStates: {
        ...state.modalStates,
        [key]: {
          ...state.modalStates[key],
          additionalData,
        },
      },
    }));
  },
  openModal: (key: string, id?: string | null, additionalData?: Record<string, any>) => {
    set(state => ({
      modalStates: {
        ...state.modalStates,
        [key]: {
          id,
          additionalData,
          isOpen: true,
        },
      },
    }));
  },
  closeModal: (key: string) => {
    set(state => ({
      modalStates: {
        ...state.modalStates,
        [key]: {
          ...state.modalStates[key],
          id: null,
          additionalData: undefined,
          isOpen: false,
        },
      },
    }));
  },
  reset: (key: string) => {
    set(state => ({
      modalStates: {
        ...state.modalStates,
        [key]: {
          id: null,
          additionalData: undefined,
          isOpen: false,
        },
      },
    }));
  },
}));

export function useFormModal(key: string) {
  const { modalStates, setId, setAdditionalData, openModal, closeModal, reset } = useStore(state => state);
  const { id, isOpen, additionalData } = modalStates[key] || {};

  return {
    id,
    isOpen: !!isOpen,
    additionalData,
    setId: (id?: string | null) => setId(key, id),
    setAdditionalData: (additionalData?: Record<string, any>) => setAdditionalData(key, additionalData),
    openModal: (id?: string | null, additionalData?: Record<string, any>) => openModal(key, id, additionalData),
    closeModal: () => closeModal(key),
    reset: () => reset(key),
  };
}
