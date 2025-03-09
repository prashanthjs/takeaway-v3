'use client';

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/common';

type ActiveLinkProps = LinkProps & {
  children: ReactNode;
  activeClassName: string;
  href: string;
  className?: string;
};

export function ActiveLink({ children, activeClassName, href, className, ...rest }: ActiveLinkProps) {
  const pathname = usePathname();
  const isActive = useMemo(() => pathname === href, [pathname, href]);
  return (
    <Link className={cn(className, isActive ? activeClassName : '')} href={href} {...rest}>
      {children}
    </Link>
  );
}
