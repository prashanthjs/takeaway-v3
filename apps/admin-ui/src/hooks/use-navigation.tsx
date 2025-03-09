'use client';

import { useTranslations } from 'next-intl';
import { BarcodeIcon, BoxesIcon, HomeIcon, MessageSquareIcon, ShoppingBagIcon, UsersIcon } from 'lucide-react';

export function useNavigation() {
  const t = useTranslations('menu');
  const homePageLink = '/dashboard';
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const storeId = process.env.NEXT_PUBLIC_STORE_ID;

  const menuItems = [
    {
      name: 'dashboard',
      title: t('dashboard'),
      icon: HomeIcon,
      href: '/dashboard',
    },
    {
      name: 'companies',
      title: t('companies'),
      icon: BoxesIcon,
      href: '/dashboard/company',
    },
    {
      name: 'categories',
      title: t('categories'),
      icon: BoxesIcon,
      href: '/dashboard/categories',
    },
    {
      name: 'products',
      title: t('products'),
      icon: BarcodeIcon,
      href: '/dashboard/products',
    },
    {
      name: 'orders',
      title: t('orders'),
      icon: ShoppingBagIcon,
      href: '/dashboard/orders',
    },
    {
      name: 'users',
      title: t('users'),
      icon: UsersIcon,
      href: '/dashboard/users',
    },
    {
      name: 'chat',
      title: t('chat'),
      icon: MessageSquareIcon,
      href: '/dashboard/chat',
    },
  ];

  return {
    menuItems,
    homePageLink,
    frontendUrl,
    apiUrl,
    storeId,
  };
}
