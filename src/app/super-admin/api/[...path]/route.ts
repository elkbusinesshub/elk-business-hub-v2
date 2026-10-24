import type { NextRequest } from 'next/server';
import { callAsSuperAdmin } from '@/lib/super-admin/server/api';
import { relay } from '@/lib/super-admin/server/relay';

/**
 * Forwards the panel's calls to the ELK API with the session's token. Only
 * the super admin's own endpoints pass; anything else is refused here.
 */
const ALLOWED: { method: string; pattern: RegExp }[] = [
  { method: 'GET', pattern: /^users\/me$/ },
  { method: 'GET', pattern: /^admin\/approvals(\/summary)?$/ },
  { method: 'POST', pattern: /^admin\/approvals\/[\w-]+\/(approve|reject)$/ },
  { method: 'GET', pattern: /^admin\/users(\/stats)?$/ },
  { method: 'PATCH', pattern: /^admin\/users\/[\w-]+\/role$/ },
];

async function forward(
  request: NextRequest,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const path = (await params).path.join('/');
  const allowed = ALLOWED.some(
    (a) => a.method === request.method && a.pattern.test(path)
  );
  if (!allowed) {
    return Response.json(
      { success: false, message: 'Not found', error: 'NOT_FOUND' },
      { status: 404 }
    );
  }
  const body = request.method === 'GET' ? undefined : await request.text();
  return relay(
    await callAsSuperAdmin(`${path}${request.nextUrl.search}`, {
      method: request.method,
      body: body || undefined,
    })
  );
}

export { forward as GET, forward as POST, forward as PATCH };
