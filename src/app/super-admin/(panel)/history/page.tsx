import type { Metadata } from 'next';
import { Suspense } from 'react';
import HistoryView from '@/components/super-admin/HistoryView';

export const metadata: Metadata = { title: 'Decision history' };

export default function HistoryPage() {
  return (
    <Suspense>
      <HistoryView />
    </Suspense>
  );
}
