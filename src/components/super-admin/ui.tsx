'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import type { ReactNode } from 'react';
import type { PageMeta } from '@/lib/super-admin/types';

export function PageIntro({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-7">
      <h2 className="text-[1.9rem] font-bold leading-tight">{title}</h2>
      <p className="mt-2 max-w-[680px] text-[1rem] text-sa-muted">{children}</p>
    </div>
  );
}

export function Panel({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={`rounded-[14px] border border-sa-line bg-white ${className}`}
    >
      {children}
    </section>
  );
}

export function EmptyState({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="px-6 py-14 text-center">
      <p className="text-[1.05rem] font-bold">{title}</p>
      {children && (
        <p className="mt-1 text-[0.92rem] text-sa-muted">{children}</p>
      )}
    </div>
  );
}

export function ErrorState({
  error,
  onRetry,
}: {
  error: Error;
  onRetry: () => void;
}) {
  return (
    <div className="px-6 py-14 text-center">
      <p className="font-bold text-sa-red">{error.message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="mt-3 rounded-[10px] border border-sa-line px-4 py-2 text-[0.9rem] font-bold hover:border-sa-green hover:text-sa-green"
      >
        Try again
      </button>
    </div>
  );
}

export function Skeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-4 p-6" aria-busy>
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="h-24 animate-pulse rounded-[10px] bg-sa-bg" />
      ))}
    </div>
  );
}

/** The current ?page= (1 or more), and a setter that keeps the other params. */
export function usePageParam(): [number, (page: number) => void] {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const page = Math.max(1, Number(params.get('page')) || 1);
  const setPage = (p: number) => {
    const next = new URLSearchParams(params);
    if (p <= 1) next.delete('page');
    else next.set('page', String(p));
    const qs = next.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: true });
  };
  return [page, setPage];
}

export function Pagination({
  meta,
  onPage,
  busy,
}: {
  meta: PageMeta;
  onPage: (page: number) => void;
  busy?: boolean;
}) {
  if (meta.totalPages <= 1) return null;
  const btn =
    'rounded-[10px] border border-sa-line px-4 py-2 text-[0.9rem] font-bold hover:border-sa-green hover:text-sa-green disabled:opacity-40 disabled:hover:border-sa-line disabled:hover:text-ink';
  return (
    <div className="flex items-center justify-between gap-3 border-t border-sa-line px-6 py-4">
      <p className="text-[0.88rem] text-sa-muted">
        Page {meta.page} of {meta.totalPages}
      </p>
      <div className="flex gap-2">
        <button
          type="button"
          className={btn}
          disabled={busy || meta.page <= 1}
          onClick={() => onPage(meta.page - 1)}
        >
          Previous
        </button>
        <button
          type="button"
          className={btn}
          disabled={busy || meta.page >= meta.totalPages}
          onClick={() => onPage(meta.page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
