'use client';

import { create } from 'zustand';

type LayoutState = {
  isSidebarCollapsed: boolean;
  toggleSidebar: () => void;
};

const useStore = create<LayoutState>(set => ({
  isSidebarCollapsed: false,
  toggleSidebar: () => {
    set(state => ({
      isSidebarCollapsed: !state.isSidebarCollapsed,
    }));
  },
}));

export function useLayout() {
  const { isSidebarCollapsed, toggleSidebar } = useStore();

  return {
    isSidebarCollapsed,
    toggleSidebar,
  };
}
