import { cookies } from 'next/headers';

/**
 * The super admin's API tokens, kept in httpOnly cookies so page scripts can
 * never read them. Only the Next server sends them on to the ELK API.
 */
export const ACCESS_COOKIE = 'elk_sa_at';
export const REFRESH_COOKIE = 'elk_sa_rt';

const COOKIE_PATH = '/super-admin';
const REFRESH_MAX_AGE = 30 * 24 * 60 * 60; // matches the API's 30-day refresh token

export type TokenPair = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

type CookieStore = Awaited<ReturnType<typeof cookies>>;

const base = {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: COOKIE_PATH,
};

export function saveTokens(store: CookieStore, pair: TokenPair): void {
  store.set(ACCESS_COOKIE, pair.accessToken, {
    ...base,
    maxAge: pair.expiresIn,
  });
  store.set(REFRESH_COOKIE, pair.refreshToken, {
    ...base,
    maxAge: REFRESH_MAX_AGE,
  });
}

export function clearTokens(store: CookieStore): void {
  store.set(ACCESS_COOKIE, '', { ...base, maxAge: 0 });
  store.set(REFRESH_COOKIE, '', { ...base, maxAge: 0 });
}
