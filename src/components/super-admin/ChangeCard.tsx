'use client';

import type { ReactNode } from 'react';
import { TERM_ROWS, when } from '@/lib/super-admin/format';
import type { ServiceChange } from '@/lib/super-admin/types';

const KIND_LABEL = {
  NEW_SERVICE: 'New service',
  PRICE_CHANGE: 'Price or duration change',
};

const STATUS_PILL = {
  PENDING: {
    label: 'Awaiting approval',
    className: 'bg-sa-amber-soft text-sa-amber-ink',
  },
  APPROVED: { label: 'Approved', className: 'bg-[#e3f4ee] text-sa-green' },
  REJECTED: { label: 'Rejected', className: 'bg-sa-red-soft text-sa-red' },
};

const who = (p: { name: string | null; phone: string | null }) =>
  p.name ?? p.phone ?? 'Admin';

/**
 * One request, as the super admin reviews it: what the app shows now beside
 * what the admin asked for, with the changed rows highlighted.
 */
export default function ChangeCard({
  change,
  footer,
}: {
  change: ServiceChange;
  footer?: ReactNode;
}) {
  const { current, requested } = change;
  const isNew = change.kind === 'NEW_SERVICE';
  const pill = STATUS_PILL[change.status];

  return (
    <article className="rounded-[12px] border border-sa-line bg-white">
      <header className="flex flex-wrap items-start justify-between gap-3 px-6 pt-5">
        <div>
          <h3 className="text-[1.1rem] font-bold">{requested.name}</h3>
          <p className="mt-0.5 text-[0.92rem] text-sa-muted">
            {KIND_LABEL[change.kind]}, requested by {who(change.requestedBy)},{' '}
            {when(change.requestedAt)}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-[0.85rem] font-bold ${pill.className}`}
        >
          {pill.label}
        </span>
      </header>

      <div className="mt-4 overflow-x-auto px-6">
        <table className="w-full min-w-[480px] text-left text-[0.95rem]">
          <thead>
            <tr className="border-b border-sa-line text-[0.85rem] text-sa-muted">
              <th className="py-3 pl-3 pr-4 font-normal">Field</th>
              {!isNew && <th className="py-3 pr-4 font-normal">In app now</th>}
              <th className="py-3 pr-3 font-normal">
                {isNew ? 'New service' : 'Requested'}
              </th>
            </tr>
          </thead>
          <tbody>
            {TERM_ROWS.map((row) => {
              const changed = change.changed.includes(row.key);
              return (
                <tr
                  key={row.key}
                  className={`border-b border-sa-line last:border-0 ${changed ? 'bg-sa-amber-soft' : ''}`}
                >
                  <td className="py-3 pl-3 pr-4">{row.label}</td>
                  {!isNew && (
                    <td className="py-3 pr-4">
                      {current ? row.show(current) : '—'}
                    </td>
                  )}
                  <td className="py-3 pr-3 font-bold">{row.show(requested)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {change.status !== 'PENDING' && (
        <p className="px-6 pt-4 text-[0.9rem] text-sa-muted">
          {change.status === 'APPROVED' ? 'Approved' : 'Rejected'} by{' '}
          {change.decidedBy ? who(change.decidedBy) : 'super admin'}
          {change.decidedAt && <>, {when(change.decidedAt)}</>}
          {change.note && (
            <>
              {' '}
              — <span className="text-ink">“{change.note}”</span>
            </>
          )}
        </p>
      )}

      {footer && <div className="px-6 pb-5 pt-4">{footer}</div>}
      {!footer && <div className="pb-5" />}
    </article>
  );
}
