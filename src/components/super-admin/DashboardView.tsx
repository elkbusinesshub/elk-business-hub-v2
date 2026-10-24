'use client';

import { useStats } from '@/lib/super-admin/queries';
import { ErrorState, PageIntro, Panel, Skeleton } from './ui';

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-[10px] border border-sa-line px-5 py-4">
      <p className="text-[0.88rem] text-sa-muted">{label}</p>
      <p className="mt-1 text-[1.9rem] font-bold leading-tight">
        {value.toLocaleString('en-IN')}
      </p>
    </div>
  );
}

export default function DashboardView() {
  const stats = useStats();

  return (
    <>
      <PageIntro title="Dashboard">
        Accounts and marketplace listings across ELK. Deleted accounts and
        listings are not counted.
      </PageIntro>

      {stats.isPending ? (
        <Panel>
          <Skeleton rows={2} />
        </Panel>
      ) : stats.isError ? (
        <Panel>
          <ErrorState error={stats.error} onRetry={() => stats.refetch()} />
        </Panel>
      ) : (
        <div className="space-y-6">
          <Panel className="p-6">
            <h3 className="mb-4 text-[1.1rem] font-bold">Users</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Stat label="Customers" value={stats.data.users.customers} />
              <Stat label="Admins" value={stats.data.users.admins} />
              <Stat label="Super admins" value={stats.data.users.superAdmins} />
              <Stat
                label="Total (incl. admins)"
                value={stats.data.users.total}
              />
            </div>
          </Panel>

          <Panel className="p-6">
            <h3 className="mb-4 text-[1.1rem] font-bold">Listings</h3>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Stat label="Total listings" value={stats.data.listings.total} />
              <Stat label="Active" value={stats.data.listings.active} />
              <Stat label="Paused" value={stats.data.listings.paused} />
              <Stat label="Draft" value={stats.data.listings.draft} />
            </div>
          </Panel>

          <Panel className="p-6">
            <h3 className="text-[1.1rem] font-bold">Provider listings</h3>
            <p className="mb-4 mt-1 text-[0.92rem] text-sa-muted">
              ELK’s own services run by admins, including ones awaiting
              approval.
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <Stat label="Total" value={stats.data.providerListings.total} />
              <Stat
                label="Cleaning"
                value={stats.data.providerListings.cleaning}
              />
              <Stat label="Repair" value={stats.data.providerListings.repair} />
            </div>
          </Panel>
        </div>
      )}
    </>
  );
}
