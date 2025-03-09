'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Avatar, Divider, Tooltip } from '@heroui/react';
import { motion } from 'framer-motion';
import { LogOutIcon, LucideIcon } from 'lucide-react';
import { ActiveLink } from '@/components/active-link';
import { Logo } from '@/components/logo';
import { useRoleFormatter } from '@/hooks/formatter/use-role-formatter';
import { useLayout } from '@/hooks/use-layout';
import { useNavigation } from '@/hooks/use-navigation';
import { useUser } from '@/hooks/use-user';
import { cn, getInitials } from '@/utils/common';

export function Sidebar() {
  const { user } = useUser();
  const { getRoleLabel } = useRoleFormatter();
  const { menuItems, homePageLink } = useNavigation();
  const t = useTranslations('common');
  const { isSidebarCollapsed } = useLayout();

  function getMenuItem(Icon: LucideIcon, title: string) {
    if (isSidebarCollapsed) {
      return (
        <Tooltip content={title} placement="right" offset={24} showArrow>
          <Icon size={24} aria-label={title} />
        </Tooltip>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          <Icon size={16} aria-label={title} />
          <span>{title}</span>
        </div>
      );
    }
  }

  return (
    <motion.nav
      className={cn('relative flex  flex-col bg-content1 px-5 text-sm text-default-500')}
      initial={{ width: 256 }}
      animate={{ width: isSidebarCollapsed ? 100 : 256 }}
    >
      <div className="mt-4 flex h-16 max-h-24 flex-col items-center justify-center">
        <Link href={homePageLink}>
          <Logo isIconOnly={isSidebarCollapsed} />
        </Link>
      </div>
      <div className="mb-5 mt-10 flex flex-col items-center gap-3 ">
        <Avatar size="lg" src={user?.profileImage} name={getInitials(user?.name || '')} className={'border-1'} />
        {!isSidebarCollapsed && (
          <div className="flex flex-col items-center gap-1 ">
            <p>{user?.name}</p>
            <p className="text-xs">{getRoleLabel(user?.role || '')}</p>
          </div>
        )}
      </div>
      {isSidebarCollapsed && <Divider className={'my-3'} />}
      <ul className={cn('my-3 flex flex-col ', isSidebarCollapsed ? 'gap-3' : 'gap-1')}>
        {!isSidebarCollapsed && <li className={'mb-2 font-semibold text-default-400'}>{t('navigation')}</li>}

        {menuItems.map(function (item) {
          return (
            <li key={item.name}>
              <ActiveLink
                href={item.href}
                activeClassName={'bg-content2 text-foreground rounded-md font-semibold'}
                className={cn(
                  'flex flex-row items-center gap-3 px-2 py-2 text-sm hover:rounded-md hover:bg-content2 hover:font-semibold hover:text-foreground',
                  isSidebarCollapsed ? 'justify-center' : '',
                )}
              >
                {getMenuItem(item.icon, item.title)}
              </ActiveLink>
            </li>
          );
        })}
      </ul>
      <Divider className={'my-3'} />
      <ul className="my-3">
        <li>
          <ActiveLink
            activeClassName={'bg-content2 text-foreground rounded-md'}
            className={cn(
              'flex flex-row items-center gap-3 px-2 py-2 text-sm hover:rounded-md hover:bg-content2 hover:font-semibold hover:text-foreground',
              isSidebarCollapsed ? 'justify-center' : '',
            )}
            href={'/logout'}
          >
            {getMenuItem(LogOutIcon, t('logout'))}
          </ActiveLink>
        </li>
      </ul>
    </motion.nav>
  );
}
