'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';
import Button from '@/components/ui/Button';

const ListingEnquiryModal = dynamic(() => import('@/components/ui/ListingEnquiryModal'), {
  ssr: false,
});

export default function ListNowButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="button" variant="secondary" onClick={() => setOpen(true)}>
        📋 List Now
      </Button>
      <ListingEnquiryModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
