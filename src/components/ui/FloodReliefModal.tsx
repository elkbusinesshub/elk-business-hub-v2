'use client';

import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { QRCodeSVG } from 'qrcode.react';

const APP_STORE_URL = 'https://apps.apple.com/in/app/elk-business-hub/id6747287788';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.elkbusinesshub.elk';

const VOLUNTEER_BG = '#16352C';

type Side = 'support' | 'volunteer';

const SIDES: Record<Side, { en: string; ml: string }> = {
  support: { en: 'I need support', ml: 'എനിക്ക് സഹായം വേണം' },
  volunteer: { en: 'I can volunteer', ml: 'എനിക്ക് സഹായിക്കാം' },
};

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function FloodReliefModal({ open, onClose }: Props) {
  const [side, setSide] = useState<Side | null>(null);
  // Client-only component (dynamic ssr:false), so window is safe at first render.
  const [downloadUrl] = useState(
    () => `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/download`
  );

  const close = useCallback(() => {
    setSide(null);
    onClose();
  }, [onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [close]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const handleQrClick = () => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      window.location.href = PLAY_STORE_URL;
    } else if (/iPad|iPhone|iPod/.test(ua)) {
      window.location.href = APP_STORE_URL;
    }
    // Desktop: no redirect — let the user scan the QR with their phone
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      style={{ background: 'rgba(26,26,26,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={close}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Kerala community flood relief"
        className="relative bg-beige rounded-[22px] w-full max-w-[460px] max-h-[90vh] overflow-y-auto overscroll-contain shadow-[0_24px_60px_rgba(0,0,0,0.22)] animate-[fade-up_0.4s_ease_both]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Teal header */}
        <div
          className="relative px-8 pt-7 pb-8 text-white border-b-4 border-yellow"
          style={{ background: 'linear-gradient(135deg, #1BBFBF 0%, #0fa0a0 100%)' }}
        >
          <RulerMark />

          <button
            onClick={close}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/15 transition-all text-lg"
          >
            ✕
          </button>

          <div className="pl-8">
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-white/80">
              Community Relief · Kerala
            </p>

            {side ? (
              <>
                <h2 className="font-black text-[1.5rem] leading-tight mt-3">
                  {SIDES[side].en}
                </h2>
                <p className="font-bold text-[0.95rem] text-white/90 mt-1">
                  {SIDES[side].ml}
                </p>
              </>
            ) : (
              <>
                <h2 className="font-black text-[clamp(1.7rem,5vw,2.1rem)] leading-[1.15] mt-3">
                  Rebuild homes,
                  <br />
                  restore lives.
                </h2>
                <p className="font-bold text-[1.05rem] text-white/90 mt-2">
                  ഒരുമിച്ച് പുനർനിർമ്മിക്കാം
                </p>
              </>
            )}
          </div>
        </div>

        {/* Body */}
        {side ? (
          <div className="px-8 pt-7 pb-8 flex flex-col items-center text-center gap-4">
            <p className="text-[0.9rem] text-ink-soft leading-[1.7]">
              Everything happens inside the ELK Business Hub — get it to connect with your
              nearest volunteers and coordinators.
            </p>

            <div
              onClick={handleQrClick}
              className="p-3 rounded-[16px] border-2 border-beige-dark bg-white cursor-pointer md:cursor-default transition-transform active:scale-95"
            >
              <QRCodeSVG
                value={downloadUrl}
                size={170}
                fgColor="#1BBFBF"
                bgColor="#FFFFFF"
                level="M"
              />
            </div>

            <p className="text-[0.82rem] text-ink-soft">
              <span className="md:hidden">Tap the code to open your app store</span>
              <span className="hidden md:inline">Scan with your phone camera to download</span>
            </p>

            <button
              type="button"
              onClick={() => setSide(null)}
              className="mt-1 text-[0.82rem] font-bold text-ink-soft hover:text-teal transition-colors"
            >
              ← Back
            </button>
          </div>
        ) : (
          <div className="px-8 pt-7 pb-8">
            <p className="text-[0.95rem] text-ink-soft leading-[1.75]">
              Local plumbers, electricians, cleaners, carpenters and builders are volunteering
              their skills to flood-hit families — <strong className="font-bold text-ink">free of cost</strong>.
              Tell us which side you&apos;re on and we&apos;ll connect you today.
            </p>

            <div className="flex flex-col gap-3 mt-6">
              <SideButton
                side="support"
                onClick={() => setSide('support')}
                className="bg-teal hover:bg-teal-dark"
              />
              <SideButton
                side="volunteer"
                onClick={() => setSide('volunteer')}
                style={{ background: VOLUNTEER_BG }}
                className="hover:opacity-90"
              />
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
}

function SideButton({
  side,
  onClick,
  className = '',
  style,
}: {
  side: Side;
  onClick: () => void;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={`group w-full flex items-center justify-between gap-4 rounded-[10px] px-5 py-3.5 text-left text-white transition-all focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-yellow ${className}`}
    >
      <span>
        <span className="block font-bold text-[1rem] leading-tight">{SIDES[side].en}</span>
        <span className="block text-[0.82rem] text-white/85 mt-0.5">{SIDES[side].ml}</span>
      </span>
      <span className="text-lg shrink-0 transition-transform group-hover:translate-x-1">→</span>
    </button>
  );
}

/* Decorative ruler down the left edge of the header */
function RulerMark() {
  const ticks = Array.from({ length: 17 }, (_, i) => i);
  return (
    <svg
      aria-hidden="true"
      className="absolute left-6 top-6 w-9 h-[200px] text-white/45"
      viewBox="0 0 36 200"
    >
      <line x1="1" y1="0" x2="1" y2="200" stroke="currentColor" strokeWidth="1.5" />
      {ticks.map((i) => {
        const y = i * 12 + 4;
        const long = i % 4 === 0;
        return (
          <line
            key={i}
            x1="1"
            y1={y}
            x2={long ? 13 : 8}
            y2={y}
            stroke="currentColor"
            strokeWidth="1.5"
          />
        );
      })}
      <text x="4" y="0" dy="8" fill="currentColor" fontSize="9" fontWeight="700">M</text>
      <text x="17" y="52" fill="currentColor" fontSize="9" fontWeight="700">1</text>
      <text x="17" y="100" fill="currentColor" fontSize="9" fontWeight="700">2</text>
      <text x="17" y="148" fill="currentColor" fontSize="9" fontWeight="700">3</text>
    </svg>
  );
}
