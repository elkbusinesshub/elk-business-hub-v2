import { NextRequest, NextResponse } from 'next/server';

const PLAY_STORE = 'https://play.google.com/store/apps/details?id=com.elkbusinesshub.elk';
const APP_STORE = 'https://apps.apple.com/in/app/elk-business-hub/id6747287788';

export function GET(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? '';

  if (/android/i.test(ua)) {
    return NextResponse.redirect(PLAY_STORE, { status: 307 });
  }

  if (/iPad|iPhone|iPod/.test(ua)) {
    return NextResponse.redirect(APP_STORE, { status: 307 });
  }

  // Desktop fallback — show Play Store (India is majority Android)
  return NextResponse.redirect(PLAY_STORE, { status: 307 });
}
