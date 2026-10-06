import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Providers from './providers';

export const metadata: Metadata = {
  title: { template: '%s · ELK Super admin', default: 'ELK Super admin' },
  robots: { index: false, follow: false },
};

export default function SuperAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-sa-bg text-ink">
      <Providers>{children}</Providers>
    </div>
  );
}
