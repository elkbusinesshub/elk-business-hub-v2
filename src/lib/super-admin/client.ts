import type { PageMeta } from './types';

/** An error from the ELK API, with its machine-readable code (e.g. OWN_ROLE). */
export class ApiError extends Error {
  constructor(
    message: string,
    readonly code: string,
    readonly status: number
  ) {
    super(message);
  }
}

type Envelope<T> = {
  success: boolean;
  message: string;
  data?: T;
  meta?: PageMeta;
  error?: string;
  details?: { field: string; message: string }[];
};

/**
 * Calls the panel's own API routes (/super-admin/api/...), which add the
 * session's token on the server. A lost session goes back to the login page.
 */
export async function request<T>(
  path: string,
  init: RequestInit = {}
): Promise<{ data: T; meta?: PageMeta }> {
  const res = await fetch(`/super-admin/api/${path}`, {
    ...init,
    headers: init.body ? { 'Content-Type': 'application/json' } : undefined,
  });
  const body = (await res.json().catch(() => null)) as Envelope<T> | null;

  if (res.status === 401 && !path.startsWith('auth/')) {
    window.location.assign('/super-admin/login');
  }
  if (!res.ok || !body?.success) {
    const message =
      body?.details?.[0]?.message ??
      body?.message ??
      'Something went wrong. Please try again.';
    throw new ApiError(message, body?.error ?? 'UNKNOWN', res.status);
  }
  return { data: body.data as T, meta: body.meta };
}
