'use client';

import Image from 'next/image';
import dynamic from 'next/dynamic';
import { useEffect, useMemo, useRef, useState } from 'react';

import type { AdContact } from '@/components/ui/AdContactModal';

const AdContactModal = dynamic(() => import('@/components/ui/AdContactModal'), { ssr: false });
const ServiceModal = dynamic(() => import('@/components/ui/ServiceModal'), { ssr: false });
const ListingEnquiryModal = dynamic(() => import('@/components/ui/ListingEnquiryModal'), {
  ssr: false,
});

const CATEGORY_BADGE: Record<string, string> = {
  Cars: '🚗',
  Bikes: '🏍️',
  Properties: '🏠',
  Helicopter: '🚁',
  Painting: '🎨',
  Services: '🛠️',
};

export interface RentalItem {
  ad_id: string;
  title: string;
  category: string;
  imgUrl: string | null;
  images?: string[];
  price: string;
  loc: string;
  phone: string | null;
  description: string | null;
}

const CAROUSEL_INTERVAL = 3000;

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), CAROUSEL_INTERVAL);
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          priority={i === 0}
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`rental-card-img object-cover transition-opacity duration-700 ${
            i === idx ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
          {images.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/50'
              }`}
            />
          ))}
        </div>
      )}
    </>
  );
}

const ROTATE_INTERVAL = 6000;
const PAGE_SIZE = 4;

export default function RentalsGrid({
  rentals,
  pinnedId,
}: {
  rentals: RentalItem[];
  pinnedId?: string;
}) {
  const [active, setActive] = useState<AdContact | null>(null);
  const [service, setService] = useState<{ icon: string; name: string } | null>(null);
  const [enquiryOpen, setEnquiryOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [fading, setFading] = useState(false);
  const [highlightPin, setHighlightPin] = useState(false);
  const pinnedRef = useRef<HTMLButtonElement>(null);

  const pinned = useMemo(
    () => (pinnedId ? rentals.find((r) => r.ad_id === pinnedId) ?? null : null),
    [rentals, pinnedId]
  );

  // When a card is pinned, it occupies the first slot and the remaining 3
  // slots rotate through everything else.
  const pageSize = pinned ? PAGE_SIZE - 1 : PAGE_SIZE;

  const chunks = useMemo(() => {
    const rest = pinned ? rentals.filter((r) => r.ad_id !== pinnedId) : rentals;
    if (rest.length === 0) return [];
    const pages = Math.ceil(rest.length / pageSize);
    const out: RentalItem[][] = [];
    for (let p = 0; p < pages; p++) {
      // Always emit a full page; wrap around to the start to fill the
      // last page instead of leaving it short.
      const page: RentalItem[] = [];
      for (let j = 0; j < pageSize; j++) {
        page.push(rest[(p * pageSize + j) % rest.length]);
      }
      out.push(page);
    }
    return out;
  }, [rentals, pinned, pinnedId, pageSize]);

  useEffect(() => {
    if (chunks.length <= 1) return;
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setPage((p) => (p + 1) % chunks.length);
        setFading(false);
      }, 300);
    }, ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [chunks.length]);

  const visible = pinned ? [pinned, ...(chunks[page] ?? [])] : chunks[page] ?? [];

  // First-view glow on the pinned card (once per session).
  useEffect(() => {
    const el = pinnedRef.current;
    if (!el || sessionStorage.getItem('elk-pin-highlight-shown')) return;

    let timer: ReturnType<typeof setTimeout> | null = null;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sessionStorage.setItem('elk-pin-highlight-shown', 'true');
          setHighlightPin(true);
          timer = setTimeout(() => setHighlightPin(false), 3000);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    if (sessionStorage.getItem('elk-listing-enquiry-shown')) return;

    const section = document.getElementById('rentals');
    if (!section) return;

    let timer: ReturnType<typeof setTimeout> | null = null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !timer) {
          timer = setTimeout(() => {
            setEnquiryOpen(true);
            sessionStorage.setItem('elk-listing-enquiry-shown', 'true');
          }, 8000);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: '-45% 0px -45% 0px' }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (timer) clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {visible.map((r) => {
          const badge = CATEGORY_BADGE[r.category] ?? '📦';
          const isPinned = r.ad_id === pinnedId;

          return (
            <button
              key={r.ad_id}
              ref={isPinned ? pinnedRef : undefined}
              onClick={() =>
                isPinned
                  ? setActive({
                      title: r.title,
                      category: r.category,
                      badge,
                      phone: r.phone,
                      images: r.images?.length ? r.images : r.imgUrl ? [r.imgUrl] : [],
                      location: r.loc,
                      description: r.description,
                    })
                  : setService({ icon: badge, name: r.title })
              }
              className={`rental-card bg-white rounded-[18px] overflow-hidden transition-all shadow-[var(--shadow-soft)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal flex flex-col ${
                fading && !isPinned ? 'opacity-0' : 'opacity-100'
              } ${isPinned && highlightPin ? 'pin-highlight' : ''}`}
            >
              {/* Image */}
              <div
                className="h-[180px] shrink-0 relative overflow-hidden bg-beige-mid"
                style={{ transform: 'translateZ(0)' }}
              >
                {isPinned && r.images && r.images.length > 1 ? (
                  <ImageCarousel images={r.images} alt={r.title} />
                ) : r.imgUrl ? (
                  <Image
                    src={r.imgUrl}
                    alt={r.title}
                    fill
                    className="rental-card-img object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    {badge}
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/45 to-transparent z-10" />
                <span className="relative z-20 m-2.5 inline-block bg-white/18 backdrop-blur-[8px] border border-white/35 text-white text-[0.6rem] font-bold uppercase tracking-[0.07em] px-2.5 py-0.5 rounded-full">
                  {badge} {r.category}
                </span>
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <span className="inline-block self-start bg-teal-light text-teal text-[0.65rem] font-bold uppercase px-2.5 py-0.5 rounded-full tracking-[0.06em] mb-2">
                  {r.category}
                </span>
                <div className="font-bold text-[0.9rem] text-ink mb-1 leading-tight line-clamp-2 min-h-[2.4em]">
                  {r.title}
                </div>
                <div className="text-[0.75rem] text-ink-soft min-h-[1.3em]">
                  {r.loc ? `📍 ${r.loc}` : ' '}
                </div>
                <div className="font-bold text-[0.85rem] text-teal mt-1.5 min-h-[1.3em]">
                  {r.price || ' '}
                </div>
                {isPinned && (
                  <div className="mt-auto pt-2 flex items-center gap-1.5 flex-wrap">
                    <span className="inline-flex items-center gap-1 bg-[#1D9BF0] text-white text-[0.55rem] font-bold uppercase tracking-[0.05em] px-1.5 py-0.5 rounded-full shrink-0">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 2l2.4 1.8 3-.3 1.2 2.7 2.7 1.2-.3 3L23 12l-1.8 2.4.3 3-2.7 1.2-1.2 2.7-3-.3L12 22l-2.4-1.8-3 .3-1.2-2.7L2.7 16.4l.3-3L1 12l1.8-2.4-.3-3 2.7-1.2L6.4 2.7l3 .3L12 2zm-1.2 13.2l5.3-5.3-1.4-1.4-3.9 3.9-1.8-1.8-1.4 1.4 3.2 3.2z" />
                      </svg>
                      Verified
                    </span>
                    <span className="text-[0.65rem] italic text-ink-soft/60">
                      No broker. Premium customer
                    </span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <AdContactModal ad={active} onClose={() => setActive(null)} />
      <ServiceModal service={service} onClose={() => setService(null)} />
      <ListingEnquiryModal open={enquiryOpen} onClose={() => setEnquiryOpen(false)} />
    </>
  );
}
