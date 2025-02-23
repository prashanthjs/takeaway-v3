'use client';

import { useEffect } from 'react';
import { useLayoutTitle } from '@admin-ui/hooks/use-layout-title';

type LayoutTitleProps = {
  title: string;
};

export function LayoutTitle({ title }: LayoutTitleProps) {
  const { setTitle } = useLayoutTitle();

  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);

  useEffect(() => {
    return () => {
      setTitle('');
    };
  }, [setTitle]);

  return null;
}
