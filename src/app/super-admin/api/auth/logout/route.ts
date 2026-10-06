import { cookies } from 'next/headers';
import { callApi } from '@/lib/super-admin/server/api';
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  clearTokens,
} from '@/lib/super-admin/server/session';

/** Ends the session on the API (best effort) and clears the cookies. */
export async function POST() {
  const store = await cookies();
  const access = store.get(ACCESS_COOKIE)?.value;
  const refresh = store.get(REFRESH_COOKIE)?.value;
  if (access && refresh) {
    await callApi(
      'auth/logout',
      { method: 'POST', body: JSON.stringify({ refreshToken: refresh }) },
      access
    ).catch(() => undefined);
  }
  clearTokens(store);
  return Response.json({ success: true, message: 'Signed out', data: null });
}
