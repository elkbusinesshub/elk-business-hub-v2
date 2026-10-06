'use client';

import { useApprovals } from '@/lib/super-admin/queries';
import ChangeCard from './ChangeCard';
import {
  EmptyState,
  ErrorState,
  PageIntro,
  Pagination,
  Panel,
  Skeleton,
  usePageParam,
} from './ui';

export default function HistoryView() {
  const [page, setPage] = usePageParam();
  const list = useApprovals('decided', page);

  return (
    <>
      <PageIntro title="Decision history">
        Every request you have approved or rejected, newest first, with the
        values as they were when you decided.
      </PageIntro>
      <Panel>
        {list.isPending ? (
          <Skeleton />
        ) : list.isError ? (
          <ErrorState error={list.error} onRetry={() => list.refetch()} />
        ) : list.data.items.length === 0 ? (
          <EmptyState title="No decisions yet">
            Requests you approve or reject will appear here.
          </EmptyState>
        ) : (
          <div className="space-y-5 p-6">
            {list.data.items.map((c) => (
              <ChangeCard key={c.id} change={c} />
            ))}
          </div>
        )}
        {list.data && (
          <Pagination
            meta={list.data.meta}
            onPage={setPage}
            busy={list.isFetching}
          />
        )}
      </Panel>
    </>
  );
}
