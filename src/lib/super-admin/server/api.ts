import { cookies } from 'next/headers';
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  clearTokens,
  saveTokens,
  type TokenPair,
} from './session';

const API_URL = (process.env.ELK_API_URL ?? 'http://localhost:3000').replace(
  /\/$/,
  ''
);

/** Calls the ELK API (paths are relative to /api/v1). */
export function callApi(
  path: string,
  init: RequestInit = {},
  accessToken?: string
): Promise<Response> {
  const headers = new Headers(init.headers);
  if (init.body) headers.set('Content-Type', 'application/json');
  if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
  return fetch(`${API_URL}/api/v1/${path}`, {
    ...init,
    headers,
    cache: 'no-store',
  });
}

/**
 * The API rotates refresh tokens and treats a second use of the same one as
 * theft, signing the user out everywhere. The panel loads several lists at
 * once, so requests that find the access token expired together share one
 * refresh, and its result is kept briefly for any that arrive just after.
 */
const refreshing = new Map<string, Promise<TokenPair | null>>();

function refreshOnce(refreshToken: string): Promise<TokenPair | null> {
  let pending = refreshing.get(refreshToken);
  if (!pending) {
    pending = callApi('auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ refreshToken }),
    })
      .then(async (res) =>
        res.ok ? ((await res.json()).data as TokenPair) : null
      )
      .catch(() => null);
    refreshing.set(refreshToken, pending);
    setTimeout(() => refreshing.delete(refreshToken), 30_000);
  }
  return pending;
}

/**
 * Calls the API as the signed-in super admin, refreshing the access token
 * once if it has expired. Signs the session out when that fails too.
 */
export async function callAsSuperAdmin(
  path: string,
  init: RequestInit = {}
): Promise<Response> {
  const store = await cookies();
  const access = store.get(ACCESS_COOKIE)?.value;
  const refresh = store.get(REFRESH_COOKIE)?.value;

  if (access) {
    const res = await callApi(path, init, access);
    if (res.status !== 401) return res;
  }
  const pair = refresh ? await refreshOnce(refresh) : null;
  if (!pair) {
    clearTokens(store);
    return Response.json(
      {
        success: false,
        message: 'Your session has ended. Sign in again.',
        error: 'UNAUTHENTICATED',
      },
      { status: 401 }
    );
  }
  saveTokens(store, pair);
  return callApi(path, init, pair.accessToken);
}
