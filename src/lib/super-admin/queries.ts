'use client';

import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { request } from './client';
import type {
  AdminModule,
  AppUser,
  ApprovalsSummary,
  Me,
  Paged,
  Role,
  ServiceChange,
} from './types';

export const PAGE_SIZE = 20;

export const keys = {
  me: ['me'] as const,
  summary: ['approvals', 'summary'] as const,
  approvals: (view: 'pending' | 'decided', page: number) =>
    ['approvals', view, page] as const,
  users: (search: string, page: number) => ['users', search, page] as const,
};

async function paged<T>(path: string): Promise<Paged<T>> {
  const { data, meta } = await request<T[]>(path);
  return {
    items: data,
    meta: meta ?? {
      page: 1,
      limit: PAGE_SIZE,
      total: data.length,
      totalPages: 1,
    },
  };
}

export function useMe() {
  return useQuery({
    queryKey: keys.me,
    queryFn: async () => (await request<Me>('users/me')).data,
    staleTime: Infinity,
  });
}

/** The waiting counts; polled so new requests from admins show up on their own. */
export function useApprovalsSummary() {
  return useQuery({
    queryKey: keys.summary,
    queryFn: async () =>
      (await request<ApprovalsSummary>('admin/approvals/summary')).data,
    refetchInterval: 60_000,
  });
}

export function useApprovals(view: 'pending' | 'decided', page: number) {
  return useQuery({
    queryKey: keys.approvals(view, page),
    queryFn: () =>
      paged<ServiceChange>(
        `admin/approvals?view=${view}&page=${page}&limit=${PAGE_SIZE}`
      ),
    placeholderData: keepPreviousData,
    refetchInterval: view === 'pending' ? 60_000 : false,
  });
}

/**
 * Approves or rejects. The card leaves the waiting list at once; the counts,
 * the list and the history then reload from the API.
 */
export function useDecide() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      approve,
      note,
    }: {
      id: string;
      approve: boolean;
      note?: string;
    }) =>
      request<ServiceChange>(
        `admin/approvals/${id}/${approve ? 'approve' : 'reject'}`,
        {
          method: 'POST',
          body: approve ? undefined : JSON.stringify({ note }),
        }
      ),
    onMutate: async ({ id }) => {
      await qc.cancelQueries({ queryKey: ['approvals', 'pending'] });
      const before = qc.getQueriesData<Paged<ServiceChange>>({
        queryKey: ['approvals', 'pending'],
      });
      qc.setQueriesData<Paged<ServiceChange>>(
        { queryKey: ['approvals', 'pending'] },
        (old) =>
          old && {
            items: old.items.filter((c) => c.id !== id),
            meta: { ...old.meta, total: Math.max(0, old.meta.total - 1) },
          }
      );
      return { before };
    },
    onError: (_e, _v, ctx) => {
      ctx?.before.forEach(([key, data]) => qc.setQueryData(key, data));
    },
    onSettled: () => qc.invalidateQueries({ queryKey: ['approvals'] }),
  });
}

export function useUsers(search: string, page: number) {
  return useQuery({
    queryKey: keys.users(search, page),
    queryFn: () =>
      paged<AppUser>(
        `admin/users?page=${page}&limit=${PAGE_SIZE}${
          search ? `&search=${encodeURIComponent(search)}` : ''
        }`
      ),
    placeholderData: keepPreviousData,
  });
}

export function useSetRole() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      role,
      modules,
    }: {
      id: string;
      role: Role;
      modules?: AdminModule[];
    }) =>
      request<AppUser>(`admin/users/${id}/role`, {
        method: 'PATCH',
        body: JSON.stringify({ role, modules }),
      }),
    onSuccess: ({ data }) => {
      qc.setQueriesData<Paged<AppUser>>(
        { queryKey: ['users'] },
        (old) =>
          old && {
            ...old,
            items: old.items.map((u) => (u.id === data.id ? data : u)),
          }
      );
    },
  });
}
