'use client';

import Image from 'next/image';
import { useState } from 'react';
import ServiceModal from '@/components/ui/ServiceModal';

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
  price: string;
  loc: string;
}

export default function RentalsGrid({ rentals }: { rentals: RentalItem[] }) {
  const [active, setActive] = useState<{ icon: string; name: string } | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {rentals.map((r) => {
          const badge = CATEGORY_BADGE[r.category] ?? '📦';

          return (
            <button
              key={r.ad_id}
              onClick={() => setActive({ icon: badge, name: r.title })}
              className="rental-card bg-white rounded-[18px] overflow-hidden transition-all shadow-[var(--shadow-soft)] hover:-translate-y-1.5 hover:shadow-[var(--shadow-card)] text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-teal flex flex-col"
            >
              {/* Image */}
              <div
                className="h-[180px] shrink-0 relative overflow-hidden bg-beige-mid"
                style={{ transform: 'translateZ(0)' }}
              >
                {r.imgUrl ? (
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
              </div>
            </button>
          );
        })}
      </div>

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </>
  );
}
