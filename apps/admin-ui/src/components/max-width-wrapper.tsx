import type { ReactNode } from 'react';
import { cn } from '@/utils/common';

export function MaxWidthWrapper({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('relative mx-auto w-full px-8 py-4', className)}>{children}</div>;
}
