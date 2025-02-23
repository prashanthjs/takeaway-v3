'use client';

import { formatDistanceToNow } from 'date-fns';
import { enGB } from 'date-fns/locale';

export function useDateFormatter() {
  const formatRelative = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), {
      locale: enGB,
      addSuffix: true,
    });
  };

  return {
    formatRelative,
  };
}
