'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Avatar, Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { ChevronDownIcon, LogOutIcon } from 'lucide-react';
import { MaxWidthWrapper } from '@admin-ui/components/max-width-wrapper';
import { useRoleFormatter } from '@admin-ui/hooks/formatter/use-role-formatter';
import { useLayout } from '@admin-ui/hooks/use-layout';
import { useLayoutTitle } from '@admin-ui/hooks/use-layout-title';
import { useUser } from '@admin-ui/hooks/use-user';
import { getInitials } from '@admin-ui/lib/utils';

export function Header() {
  const { title } = useLayoutTitle();
  const { user } = useUser();
  const { getRoleLabel } = useRoleFormatter();
  const { toggleSidebar } = useLayout();
  const router = useRouter();
  const t = useTranslations('common');

  function handleLogout() {
    router.push('/login');
  }

  function handleSidebarToggle() {
    toggleSidebar();
  }

  return (
    <header className="sticky inset-x-0 top-0 z-50 ">
      <MaxWidthWrapper className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            aria-label="Like"
            className="bg-background/0 text-default-400"
            isIconOnly
            size="sm"
            onPress={handleSidebarToggle}
          >
            <Bars3Icon className="h-7" />
          </Button>
          <h1 className="text-md text-default-500">{title}</h1>
        </div>
        <div className="flex items-center gap-4">
          <Dropdown>
            <DropdownTrigger>
              <div className="flex cursor-pointer items-center gap-3">
                <div className={'flex flex-col'}>
                  <p className="text-xs font-semibold text-default-500">{user?.name}</p>
                  <p className="text-xs text-default-500 ">{getRoleLabel(user?.role || '')}</p>
                </div>
                <Avatar
                  size="sm"
                  src={user?.profileImage}
                  name={getInitials(user?.name || '')}
                  className={'border-1'}
                />

                <ChevronDownIcon size={12} className={'text-default-500'} />
              </div>
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Menu" variant={'flat'}>
              <DropdownItem key="profile" className="h-14 cursor-default gap-2">
                <p className="font-semibold">{t('signedInAs')}</p>
                <p className="font-semibold">{user?.email}</p>
              </DropdownItem>
              <DropdownItem key="logout" onPress={handleLogout} startContent={<LogOutIcon size={16} />}>
                {t('logout')}
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </MaxWidthWrapper>
    </header>
  );
}
