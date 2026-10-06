import { cookies } from 'next/headers';
import { callApi } from '@/lib/super-admin/server/api';
import { relay } from '@/lib/super-admin/server/relay';
import { saveTokens, type TokenPair } from '@/lib/super-admin/server/session';

/**
 * Verifies the passcode and starts a session, but only for a SUPER_ADMIN:
 * any other account's new session is revoked straight away.
 */
export async function POST(request: Request) {
  const { phone, otp } = await request.json();
  const res = await callApi('auth/otp/verify', {
    method: 'POST',
    body: JSON.stringify({ phone, otp }),
  });
  if (!res.ok) return relay(res);

  const pair = (await res.json()).data as TokenPair;
  const me = await callApi('auth/me', {}, pair.accessToken);
  const role = me.ok ? (await me.json()).data?.role : undefined;

  if (role !== 'SUPER_ADMIN') {
    await callApi(
      'auth/logout',
      {
        method: 'POST',
        body: JSON.stringify({ refreshToken: pair.refreshToken }),
      },
      pair.accessToken
    ).catch(() => undefined);
    return Response.json(
      {
        success: false,
        message: 'This number does not have super admin access.',
        error: 'NOT_SUPER_ADMIN',
      },
      { status: 403 }
    );
  }

  saveTokens(await cookies(), pair);
  return Response.json({ success: true, message: 'Signed in', data: null });
}
