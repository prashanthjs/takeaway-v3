'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useNavigation } from '@admin-ui/hooks/use-navigation';

export default function IndexPage() {
  const router = useRouter();
  const { homePageLink } = useNavigation();
  const isAccessTokenValid = true;

  useEffect(() => {
    if (isAccessTokenValid) {
      router.replace(homePageLink);
    } else {
      router.replace('/login');
    }
  }, [router, isAccessTokenValid]);

  return null;
}
