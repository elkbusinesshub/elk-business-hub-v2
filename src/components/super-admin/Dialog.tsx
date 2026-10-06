'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/** A centred modal on the native <dialog>, so Esc and focus work by default. */
export default function Dialog({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      className="m-auto w-[calc(100%-2rem)] max-w-[440px] rounded-[14px] p-0 backdrop:bg-black/40"
    >
      <div className="p-6">
        <h2 className="text-[1.15rem] font-bold">{title}</h2>
        <div className="mt-3">{children}</div>
      </div>
    </dialog>
  );
}
