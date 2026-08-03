'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const FloodReliefModal = dynamic(() => import('@/components/ui/FloodReliefModal'), {
  ssr: false,
});

export default function AutoOpenFloodRelief() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 600);
    return () => clearTimeout(timer);
  }, []);

  return <FloodReliefModal open={open} onClose={() => setOpen(false)} />;
}
