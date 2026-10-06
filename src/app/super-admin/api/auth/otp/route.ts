import { callApi } from '@/lib/super-admin/server/api';
import { relay } from '@/lib/super-admin/server/relay';

/** Sends the one-time passcode. Body: { phone } in E.164. */
export async function POST(request: Request) {
  const { phone } = await request.json();
  return relay(
    await callApi('auth/otp/request', {
      method: 'POST',
      body: JSON.stringify({ phone }),
    })
  );
}
