'use client';

import { useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';

export interface SelectOption {
  value: string;
  label: ReactNode;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  hasError?: boolean;
}

export default function Select({
  options,
  value,
  onChange,
  onBlur,
  placeholder = 'Select…',
  hasError = false,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onBlur]);

  const selected = options.find((o) => o.value === value);

  return (
    <div ref={ref} className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-[10px] border text-[0.9rem] transition-all ${
          hasError
            ? 'border-red-400 bg-red-50 text-red-400'
            : open
            ? 'border-teal bg-white text-ink'
            : 'border-beige-dark bg-beige text-ink hover:border-teal'
        }`}
      >
        <span className={selected ? 'text-ink' : 'text-ink-soft/50'}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={`transition-transform duration-200 text-ink-soft ${open ? 'rotate-180' : ''}`}
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dropdown panel */}
      {open && (
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-[14px] shadow-[0_12px_40px_rgba(0,0,0,0.14)] border border-beige-mid overflow-y-auto max-h-[200px]">
          {options.map((o) => {
            const isActive = o.value === value;
            return (
              <button
                key={o.value}
                type="button"
                onClick={() => { onChange(o.value); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left text-[0.88rem] transition-colors ${
                  isActive ? 'bg-teal-light text-teal font-bold' : 'text-ink hover:bg-beige'
                }`}
              >
                <span>{o.label}</span>
                {isActive && (
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M2 7l3.5 3.5L12 3.5" stroke="#1BBFBF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
