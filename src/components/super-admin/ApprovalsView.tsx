'use client';

import { useState } from 'react';
import {
  useApprovals,
  useApprovalsSummary,
  useDecide,
} from '@/lib/super-admin/queries';
import type { ServiceChange } from '@/lib/super-admin/types';
import ChangeCard from './ChangeCard';
import Dialog from './Dialog';
import {
  EmptyState,
  ErrorState,
  PageIntro,
  Pagination,
  Panel,
  Skeleton,
  usePageParam,
} from './ui';

export default function ApprovalsView() {
  const [page, setPage] = usePageParam();
  const summary = useApprovalsSummary();
  const list = useApprovals('pending', page);
  const decide = useDecide();
  const [rejecting, setRejecting] = useState<ServiceChange | null>(null);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  function approve(c: ServiceChange) {
    setError(null);
    decide.mutate(
      { id: c.id, approve: true },
      { onError: (e) => setError(`${c.requested.name}: ${e.message}`) }
    );
  }

  function reject() {
    if (!rejecting) return;
    const c = rejecting;
    setError(null);
    setRejecting(null);
    decide.mutate(
      { id: c.id, approve: false, note: note.trim() || undefined },
      { onError: (e) => setError(`${c.requested.name}: ${e.message}`) }
    );
    setNote('');
  }

  const cards = [
    {
      label: 'Waiting for review',
      value: summary.data?.waiting,
      hint: 'All requests',
      accent: true,
    },
    {
      label: 'New services',
      value: summary.data?.newServices,
      hint: 'Hidden until approved',
    },
    {
      label: 'Price or duration changes',
      value: summary.data?.priceChanges,
      hint: 'App keeps current price',
    },
  ];

  return (
    <>
      <PageIntro title="Approvals">
        New services and price or duration changes submitted by admins. Nothing
        reaches the customer app until you approve it.
      </PageIntro>

      <Panel className="mb-6 grid grid-cols-1 divide-y divide-sa-line sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {cards.map((c) => (
          <div key={c.label} className="px-6 py-6">
            <p className="text-[0.92rem] text-sa-muted">{c.label}</p>
            <p
              className={`mt-2 text-[1.9rem] font-bold leading-none ${c.accent ? 'text-sa-amber-ink' : ''}`}
            >
              {c.value ?? '–'}
            </p>
            <p className="mt-3 text-[0.88rem] text-sa-muted">{c.hint}</p>
          </div>
        ))}
      </Panel>

      <Panel>
        <div className="flex items-center justify-between px-6 pb-2 pt-6">
          <h3 className="text-[1.15rem] font-bold">Waiting for review</h3>
          {list.data && (
            <p className="text-[0.92rem] text-sa-muted">
              {list.data.meta.total}{' '}
              {list.data.meta.total === 1 ? 'request' : 'requests'}
            </p>
          )}
        </div>

        {error && (
          <p className="mx-6 mt-3 rounded-[10px] bg-sa-red-soft px-4 py-3 text-[0.9rem] text-sa-red">
            {error}
          </p>
        )}

        {list.isPending ? (
          <Skeleton />
        ) : list.isError ? (
          <ErrorState error={list.error} onRetry={() => list.refetch()} />
        ) : list.data.items.length === 0 ? (
          <EmptyState title="Nothing waiting for review">
            New requests from admins will appear here.
          </EmptyState>
        ) : (
          <div className="space-y-5 p-6">
            {list.data.items.map((c) => (
              <ChangeCard
                key={c.id}
                change={c}
                footer={
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-sa-line pt-4">
                    <p className="text-[0.88rem] text-sa-muted">
                      {c.kind === 'NEW_SERVICE'
                        ? 'Shows in the app once approved.'
                        : 'App updates to the requested values when approved.'}
                    </p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setNote('');
                          setRejecting(c);
                        }}
                        className="rounded-[10px] border border-sa-line px-5 py-2 text-[0.92rem] font-bold text-sa-red hover:border-sa-red"
                      >
                        Reject
                      </button>
                      <button
                        type="button"
                        onClick={() => approve(c)}
                        className="rounded-[10px] bg-sa-green px-5 py-2 text-[0.92rem] font-bold text-white hover:bg-sa-green-dark"
                      >
                        Approve
                      </button>
                    </div>
                  </div>
                }
              />
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

      <Dialog
        open={!!rejecting}
        onClose={() => setRejecting(null)}
        title={`Reject ${rejecting?.requested.name ?? ''}?`}
      >
        <p className="text-[0.92rem] text-sa-muted">
          {rejecting?.kind === 'NEW_SERVICE'
            ? 'The new service will be removed.'
            : 'The app keeps its current price.'}{' '}
          Add a note for the admin (optional).
        </p>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          maxLength={500}
          rows={3}
          placeholder="e.g. Too high for this area"
          className="mt-3 w-full rounded-[10px] border border-sa-line p-3 text-[0.95rem] outline-none focus:border-sa-green"
        />
        <div className="mt-4 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setRejecting(null)}
            className="rounded-[10px] border border-sa-line px-5 py-2 text-[0.92rem] font-bold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={reject}
            className="rounded-[10px] bg-sa-red px-5 py-2 text-[0.92rem] font-bold text-white hover:opacity-90"
          >
            Reject
          </button>
        </div>
      </Dialog>
    </>
  );
}
