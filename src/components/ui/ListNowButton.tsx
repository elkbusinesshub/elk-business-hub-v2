'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const ListingEnquiryModal = dynamic(() => import('@/components/ui/ListingEnquiryModal'), {
  ssr: false,
});

export default function ListNowButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="bg-transparent text-ink px-8 py-3.5 rounded-full font-bold text-[0.95rem] border-2 border-beige-dark inline-flex items-center gap-2 transition-all hover:border-teal hover:text-teal hover:-translate-y-0.5"
      >
        📋 List Now
      </button>
      <ListingEnquiryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
