'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  MODULE_LABELS,
  ROLE_LABELS,
  joinedOn,
  phoneLabel,
} from '@/lib/super-admin/format';
import { useMe, useSetRole, useUsers } from '@/lib/super-admin/queries';
import {
  ADMIN_MODULES,
  ROLES,
  type AdminModule,
  type AppUser,
  type Role,
} from '@/lib/super-admin/types';
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

/** Search text kept in ?search=, updated 300 ms after typing stops. */
function useSearchParam(): [string, string, (v: string) => void] {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const applied = params.get('search') ?? '';
  const [text, setText] = useState(applied);

  useEffect(() => {
    const value = text.trim();
    if (value === applied) return;
    const t = setTimeout(() => {
      const next = new URLSearchParams(params);
      if (value) next.set('search', value);
      else next.delete('search');
      next.delete('page');
      const qs = next.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    }, 300);
    return () => clearTimeout(t);
  }, [text, applied, params, pathname, router]);

  return [text, applied, setText];
}

export default function UsersView() {
  const [text, search, setText] = useSearchParam();
  const [page, setPage] = usePageParam();
  const list = useUsers(search, page);
  const { data: me } = useMe();
  const setRole = useSetRole();
  const [pending, setPending] = useState<{ user: AppUser; role: Role } | null>(
    null
  );
  const [modules, setModules] = useState<AdminModule[]>([]);
  const [error, setError] = useState<string | null>(null);

  const makingAdmin = pending?.role === 'ADMIN';
  const editingModules = makingAdmin && pending?.user.role === 'ADMIN';

  /** Opens the dialog; an admin starts from the modules they already hold. */
  function open(user: AppUser, role: Role) {
    setModules(user.role === 'ADMIN' ? user.modules : []);
    setPending({ user, role });
  }

  function toggle(m: AdminModule) {
    setModules((cur) =>
      cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m]
    );
  }

  function confirm() {
    if (!pending || (makingAdmin && modules.length === 0)) return;
    const { user, role } = pending;
    setPending(null);
    setError(null);
    setRole.mutate(
      { id: user.id, role, modules: role === 'ADMIN' ? modules : undefined },
      {
        onError: (e) =>
          setError(`${user.name ?? phoneLabel(user.phone)}: ${e.message}`),
      }
    );
  }

  return (
    <>
      <PageIntro title="Users">
        Everyone with an ELK app account. A role change reaches the person’s app
        within 15 minutes.
      </PageIntro>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 pt-6">
          <input
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Search by name or phone"
            aria-label="Search users by name or phone"
            maxLength={50}
            className="w-full max-w-[360px] rounded-[10px] border border-sa-line px-4 py-2.5 text-[0.95rem] outline-none focus:border-sa-green focus:ring-2 focus:ring-sa-green/15"
          />
          {list.data && (
            <p className="text-[0.92rem] text-sa-muted">
              {list.data.meta.total}{' '}
              {list.data.meta.total === 1 ? 'user' : 'users'}
            </p>
          )}
        </div>

        {error && (
          <p className="mx-6 mt-4 rounded-[10px] bg-sa-red-soft px-4 py-3 text-[0.9rem] text-sa-red">
            {error}
          </p>
        )}

        {list.isPending ? (
          <Skeleton rows={5} />
        ) : list.isError ? (
          <ErrorState error={list.error} onRetry={() => list.refetch()} />
        ) : list.data.items.length === 0 ? (
          <EmptyState
            title={search ? `No users match “${search}”` : 'No users yet'}
          />
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-[0.95rem]">
              <thead>
                <tr className="border-y border-sa-line text-[0.85rem] text-sa-muted">
                  <th className="px-6 py-3 font-normal">Name</th>
                  <th className="py-3 pr-4 font-normal">Phone</th>
                  <th className="py-3 pr-4 font-normal">Joined</th>
                  <th className="py-3 pr-6 font-normal">Role</th>
                </tr>
              </thead>
              <tbody className={list.isFetching ? 'opacity-60' : ''}>
                {list.data.items.map((u) => {
                  const self = u.id === me?.id;
                  return (
                    <tr
                      key={u.id}
                      className="border-b border-sa-line last:border-0"
                    >
                      <td className="px-6 py-3 font-bold">
                        {u.name ?? (
                          <span className="font-normal text-sa-muted">
                            No name
                          </span>
                        )}
                        {self && (
                          <span className="ml-2 text-[0.8rem] text-sa-muted">
                            (you)
                          </span>
                        )}
                      </td>
                      <td className="py-3 pr-4 whitespace-nowrap">
                        {phoneLabel(u.phone)}
                      </td>
                      <td className="py-3 pr-4 whitespace-nowrap">
                        {joinedOn(u.joinedAt)}
                      </td>
                      <td className="py-3 pr-6">
                        <select
                          value={u.role}
                          disabled={self || setRole.isPending}
                          title={
                            self ? 'You cannot change your own role' : undefined
                          }
                          aria-label={`Role of ${u.name ?? phoneLabel(u.phone)}`}
                          onChange={(e) => open(u, e.target.value as Role)}
                          className="rounded-[8px] border border-sa-line bg-white px-3 py-1.5 text-[0.9rem] outline-none focus:border-sa-green disabled:opacity-60"
                        >
                          {ROLES.map((r) => (
                            <option key={r} value={r}>
                              {ROLE_LABELS[r]}
                            </option>
                          ))}
                        </select>
                        {u.role === 'ADMIN' && (
                          <div className="mt-2 flex flex-wrap items-center gap-1.5">
                            {u.modules.map((m) => (
                              <span
                                key={m}
                                className="rounded-full bg-sa-bg px-2.5 py-0.5 text-[0.78rem] font-bold text-sa-green"
                              >
                                {MODULE_LABELS[m]}
                              </span>
                            ))}
                            {!self && (
                              <button
                                type="button"
                                onClick={() => open(u, 'ADMIN')}
                                disabled={setRole.isPending}
                                className="text-[0.8rem] font-bold text-sa-green underline-offset-2 hover:underline"
                              >
                                Edit modules
                              </button>
                            )}
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
        open={!!pending}
        onClose={() => setPending(null)}
        title={editingModules ? 'Admin modules' : 'Change role?'}
      >
        {pending &&
          (editingModules ? (
            <p className="text-[0.95rem]">
              Choose what{' '}
              <b>{pending.user.name ?? phoneLabel(pending.user.phone)}</b> can
              manage.
            </p>
          ) : (
            <p className="text-[0.95rem]">
              Make <b>{pending.user.name ?? phoneLabel(pending.user.phone)}</b>{' '}
              {pending.role === 'ADMIN' ? 'an' : 'a'}{' '}
              <b>{ROLE_LABELS[pending.role]}</b> instead of{' '}
              {ROLE_LABELS[pending.user.role]}?
            </p>
          ))}
        {makingAdmin && (
          <fieldset className="mt-4">
            <legend className="text-[0.85rem] font-bold">
              Modules (choose at least one)
            </legend>
            <div className="mt-2 grid gap-2">
              {ADMIN_MODULES.map((m) => (
                <label
                  key={m}
                  htmlFor={`module-${m}`}
                  className="flex cursor-pointer items-center gap-3 rounded-[10px] border border-sa-line px-4 py-2.5 text-[0.95rem] has-[:checked]:border-sa-green has-[:checked]:bg-sa-bg"
                >
                  <input
                    id={`module-${m}`}
                    type="checkbox"
                    checked={modules.includes(m)}
                    onChange={() => toggle(m)}
                    className="h-4 w-4 accent-sa-green"
                  />
                  {MODULE_LABELS[m]}
                </label>
              ))}
            </div>
          </fieldset>
        )}
        <div className="mt-5 flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setPending(null)}
            className="rounded-[10px] border border-sa-line px-5 py-2 text-[0.92rem] font-bold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={confirm}
            disabled={makingAdmin && modules.length === 0}
            className="rounded-[10px] bg-sa-green px-5 py-2 text-[0.92rem] font-bold text-white hover:bg-sa-green-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {editingModules ? 'Save modules' : 'Change role'}
          </button>
        </div>
      </Dialog>
    </>
  );
}
