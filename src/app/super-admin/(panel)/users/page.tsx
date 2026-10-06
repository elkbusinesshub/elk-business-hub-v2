import type { Metadata } from 'next';
import { Suspense } from 'react';
import UsersView from '@/components/super-admin/UsersView';

export const metadata: Metadata = { title: 'Users' };

export default function UsersPage() {
  return (
    <Suspense>
      <UsersView />
    </Suspense>
  );
}
