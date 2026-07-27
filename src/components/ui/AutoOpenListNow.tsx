'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const ListingEnquiryModal = dynamic(() => import('@/components/ui/ListingEnquiryModal'), {
  ssr: false,
});

interface Props {
  targetId: string;
}

export default function AutoOpenListNow({ targetId }: Props) {
  const [open, setOpen] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          setOpen(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetId]);

  return <ListingEnquiryModal open={open} onClose={() => setOpen(false)} />;
}
