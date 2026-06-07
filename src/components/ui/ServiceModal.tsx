'use client';

import { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';

const APP_STORE_URL = 'https://apps.apple.com/in/app/elk-business-hub/id6747287788';
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.elkbusinesshub.elk';

interface ServiceModalProps {
  service: { icon: string; name: string } | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleQrClick = () => {
    const ua = navigator.userAgent;
    if (/android/i.test(ua)) {
      window.location.href = PLAY_STORE_URL;
    } else if (/iPad|iPhone|iPod/.test(ua)) {
      window.location.href = APP_STORE_URL;
    }
    // Desktop: no redirect — let the user scan the QR with their phone
  };

  useEffect(() => {
    const base =
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin;
    setDownloadUrl(`${base}/download`);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = service ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [service]);

  if (!service) return null;

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      style={{ background: 'rgba(26,26,26,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[24px] w-full max-w-[360px] shadow-[0_24px_60px_rgba(0,0,0,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-ink-soft hover:text-ink hover:bg-beige transition-all text-lg z-10"
        >
          ✕
        </button>

        {/* Teal accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-teal to-teal-dark" />

        <div className="px-7 pt-7 pb-8 flex flex-col items-center text-center gap-5">
          {/* Service identity */}
          <div className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-[16px] bg-teal-light flex items-center justify-center text-3xl">
              {service.icon}
            </div>
            <div>
              <h2 className="font-bold text-[1.15rem] text-ink leading-tight">
                {service.name}
              </h2>
              <p className="text-[0.78rem] text-ink-soft mt-0.5">
                Available on ELK Business Hub app
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-beige-mid" />

          {/* QR code */}
          <div className="flex flex-col items-center gap-3">
            <p className="text-[0.82rem] text-ink-soft">
              <span className="md:hidden">Tap the code to open the app on your store</span>
              <span className="hidden md:inline">Scan with your phone camera to download</span>
            </p>

            <div
              onClick={handleQrClick}
              className="p-3 rounded-[16px] border-2 border-beige-mid bg-white cursor-pointer md:cursor-default transition-transform active:scale-95"
            >
              {downloadUrl ? (
                <QRCodeSVG
                  value={downloadUrl}
                  size={160}
                  fgColor="#1BBFBF"
                  bgColor="#FFFFFF"
                  level="M"
                />
              ) : (
                <div
                  className="bg-beige-mid rounded-lg animate-pulse"
                  style={{ width: 160, height: 160 }}
                />
              )}
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
