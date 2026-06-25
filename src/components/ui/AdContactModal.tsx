'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface AdContact {
  title: string;
  category: string;
  badge: string;
  phone: string | null;
  images: string[];
  location: string;
  description: string | null;
}

interface AdContactModalProps {
  ad: AdContact | null;
  onClose: () => void;
}

const CAROUSEL_INTERVAL = 3000;

export default function AdContactModal({ ad, onClose }: AdContactModalProps) {
  const [idx, setIdx] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    setIdx(0);
    setExpanded(false);
    setPreview(false);
  }, [ad]);

  useEffect(() => {
    const count = ad?.images.length ?? 0;
    if (count <= 1 || preview) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % count), CAROUSEL_INTERVAL);
    return () => clearInterval(t);
  }, [ad, preview]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (preview) setPreview(false);
        else onClose();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose, preview]);

  useEffect(() => {
    document.body.style.overflow = ad ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [ad]);

  if (!ad) return null;

  const digits = ad.phone ? ad.phone.replace(/[^\d]/g, '') : '';
  const telHref = ad.phone ? `tel:${ad.phone.replace(/\s+/g, '')}` : '';
  const waText = encodeURIComponent(
    `Hi, I'm interested in your listing "${ad.title}" on ELK Business Hub.`
  );
  const waHref = digits ? `https://wa.me/${digits}?text=${waText}` : '';

  const count = ad.images.length;
  const showPrev = () => setIdx((i) => (i - 1 + count) % count);
  const showNext = () => setIdx((i) => (i + 1) % count);

  return (
    <>
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      style={{ background: 'rgba(26,26,26,0.55)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[24px] w-full max-w-[420px] shadow-[0_24px_60px_rgba(0,0,0,0.2)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center text-white bg-black/40 hover:bg-black/60 transition-all text-lg z-30"
        >
          ✕
        </button>

        {/* Image area */}
        <div
          className={`relative h-[260px] bg-beige-mid overflow-hidden ${
            count > 0 ? 'cursor-zoom-in' : ''
          }`}
          onClick={() => count > 0 && setPreview(true)}
        >
          {count > 0 ? (
            ad.images.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={ad.title}
                fill
                priority={i === 0}
                sizes="420px"
                className={`object-cover transition-opacity duration-700 ${
                  i === idx ? 'opacity-100' : 'opacity-0'
                }`}
              />
            ))
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              {ad.badge}
            </div>
          )}

          {/* Carousel dots */}
          {ad.images.length > 1 && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
              {ad.images.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="px-6 pt-5 pb-6 flex flex-col gap-3">
          <div>
            <span className="inline-block bg-teal-light text-teal text-[0.65rem] font-bold uppercase px-2.5 py-0.5 rounded-full tracking-[0.06em] mb-2">
              {ad.badge} {ad.category}
            </span>
            <h2 className="font-bold text-[1.15rem] text-ink leading-tight">{ad.title}</h2>
            {ad.location && (
              <p className="text-[0.82rem] text-ink-soft mt-1">📍 {ad.location}</p>
            )}
          </div>

          {ad.description && (
            <div>
              <p
                className={`text-[0.85rem] text-ink-soft leading-[1.6] whitespace-pre-line ${
                  expanded ? '' : 'line-clamp-3'
                }`}
              >
                {ad.description}
              </p>
              {ad.description.length > 140 && (
                <button
                  onClick={() => setExpanded((v) => !v)}
                  className="mt-1 text-[0.8rem] font-bold text-teal hover:text-teal-dark transition-colors"
                >
                  {expanded ? 'Read less' : 'Read more'}
                </button>
              )}
            </div>
          )}

          {/* Contact row */}
          {ad.phone && (
            <>
              <div className="h-px bg-beige-mid" />
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[0.7rem] uppercase tracking-[0.08em] text-ink-soft font-bold">
                    Contact owner
                  </p>
                  <p className="text-[0.9rem] font-semibold text-ink truncate">{ad.phone}</p>
                </div>
                <div className="flex gap-2.5 shrink-0">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Chat on WhatsApp"
                    className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M.057 24l1.687-6.163a11.867 11.867 0 0 1-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 0 1 8.413 3.488 11.824 11.824 0 0 1 3.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 0 1-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 0 0 1.51 5.26l-.999 3.648 3.978-1.052zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </a>
                  <a
                    href={telHref}
                    aria-label="Call the owner"
                    className="w-11 h-11 rounded-full bg-teal text-white flex items-center justify-center shadow-md transition-transform hover:scale-110 active:scale-95"
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2a1 1 0 0 1 1.02-.24c1.12.37 2.33.57 3.57.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1C10.07 21 3 13.93 3 5a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1.02l-2.2 2.2z" />
                    </svg>
                  </a>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>

    {/* Full-screen image preview */}
    {preview && count > 0 && (
      <div
        className="fixed inset-0 z-[2100] flex items-center justify-center bg-black/95"
        onClick={() => setPreview(false)}
      >
        <button
          onClick={() => setPreview(false)}
          aria-label="Close preview"
          className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-all text-xl z-10"
        >
          ✕
        </button>

        <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
          <Image
            key={ad.images[idx]}
            src={ad.images[idx]}
            alt={ad.title}
            fill
            sizes="100vw"
            className="object-contain"
          />
        </div>

        {count > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-all text-2xl z-10"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
              aria-label="Next image"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center text-white bg-white/10 hover:bg-white/20 transition-all text-2xl z-10"
            >
              ›
            </button>
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-white text-[0.85rem] font-medium bg-white/10 px-3 py-1 rounded-full z-10">
              {idx + 1} / {count}
            </div>
          </>
        )}
      </div>
    )}
    </>
  );
}
