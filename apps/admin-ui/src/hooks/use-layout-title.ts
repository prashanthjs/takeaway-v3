'use client';

import { useEffect } from 'react';

import { create } from 'zustand';

type LayoutTitleState = {
  title?: string;
  setTitle: (title?: string) => void;
};

const useStore = create<LayoutTitleState>(set => ({
  title: undefined,
  setTitle: (title?: string) => {
    set(() => ({
      title,
    }));
  },
}));

export function useLayoutTitle() {
  const { title, setTitle } = useStore();
  useEffect(() => {
    return () => {
      setTitle(undefined);
    };
  }, [setTitle]);
  return {
    title,
    setTitle,
  };
}
