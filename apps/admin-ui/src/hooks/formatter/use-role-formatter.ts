'use client';

import { useTranslations } from 'next-intl';

import { RoleEnum } from '@/types/role';

export function useRoleFormatter() {
  const t = useTranslations('common.role');

  const roles = [
    { value: RoleEnum.SuperAdmin, label: t('superAdmin') },
    { value: RoleEnum.Admin, label: t('admin') },
  ];

  const getRole = (role: string) => {
    return roles.find(roleItem => roleItem.value === role);
  };

  const getRoleLabel = (role: string) => {
    const roleItem = getRole(role);
    return roleItem?.label ?? role;
  };

  return {
    roles,
    getRole,
    getRoleLabel,
  };
}
