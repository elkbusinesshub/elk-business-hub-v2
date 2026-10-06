'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, type ReactNode } from 'react';
import { request } from '@/lib/super-admin/client';
import { initials } from '@/lib/super-admin/format';
import { useApprovalsSummary, useMe } from '@/lib/super-admin/queries';

const NAV = [
  { href: '/super-admin/approvals', label: 'Approvals', badge: true },
  { href: '/super-admin/history', label: 'Decision history', badge: false },
  { href: '/super-admin/users', label: 'Users', badge: false },
];

export default function PanelShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: summary } = useApprovalsSummary();
  const { data: me } = useMe();
  const title = NAV.find((n) => pathname.startsWith(n.href))?.label ?? '';

  async function signOut() {
    await request('auth/logout', { method: 'POST' }).catch(() => undefined);
    window.location.assign('/super-admin/login');
  }

  const sidebar = (
    <nav className="flex h-full flex-col bg-sa-sidebar text-white">
      <div className="border-b border-white/10 px-7 py-7">
        <Image
          src="/brand/elk-logo.png"
          alt="ELK"
          width={96}
          height={25}
          priority
        />
        <p className="mt-3 text-[0.88rem] text-white/70">Super admin, Kerala</p>
      </div>
      <ul className="flex-1 space-y-1 px-3 py-4">
        {NAV.map((n) => {
          const active = pathname.startsWith(n.href);
          return (
            <li key={n.href}>
              <Link
                href={n.href}
                onClick={() => setMenuOpen(false)}
                className={`flex items-center justify-between rounded-[10px] border-l-[3px] px-4 py-3 text-[0.98rem] transition-colors ${
                  active
                    ? 'border-teal bg-sa-sidebar-hover font-bold'
                    : 'border-transparent text-white/85 hover:bg-sa-sidebar-hover'
                }`}
              >
                {n.label}
                {n.badge && !!summary?.waiting && (
                  <span className="min-w-[26px] rounded-full bg-sa-amber px-2 py-0.5 text-center text-[0.78rem] font-bold text-sa-sidebar">
                    {summary.waiting}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
      <button
        type="button"
        onClick={signOut}
        className="mx-3 mb-5 rounded-[10px] px-4 py-3 text-left text-[0.92rem] text-white/70 hover:bg-sa-sidebar-hover hover:text-white"
      >
        Sign out
      </button>
    </nav>
  );

  return (
    <div className="lg:pl-[280px]">
      <aside className="fixed inset-y-0 left-0 hidden w-[280px] lg:block">
        {sidebar}
      </aside>

      {menuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            className="absolute inset-0 bg-black/40"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 w-[280px] max-w-[85vw]">
            {sidebar}
          </aside>
        </div>
      )}

      <header className="sticky top-0 z-30 flex items-center justify-between gap-4 border-b border-sa-line bg-white px-4 py-3 sm:px-8">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Open menu"
            className="rounded-lg p-2 text-ink lg:hidden"
            onClick={() => setMenuOpen(true)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden
            >
              <path
                d="M4 6h16M4 12h16M4 18h16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
          <h1 className="text-[1.15rem] font-bold">{title}</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-sa-green text-[0.9rem] font-bold text-white">
            {initials(me?.name)}
          </span>
          <div className="hidden leading-tight sm:block">
            <p className="text-[0.92rem] font-bold">
              {me?.name ?? 'Super admin'}
            </p>
            <p className="text-[0.8rem] text-sa-muted">Approvals &amp; users</p>
          </div>
        </div>
      </header>

      <main className="px-4 py-6 sm:px-8 sm:py-8">{children}</main>
    </div>
  );
}
