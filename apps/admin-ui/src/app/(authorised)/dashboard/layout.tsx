import type { ReactNode } from 'react';
import { Layout } from '@admin-ui/components/layout/layout';

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <Layout>{children}</Layout>;
}
