'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
  email: z.string().email('Enter a valid email address'),
  location: z.string().min(2, 'Please enter your business location'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function AdvertiseModal({ open, onClose }: Props) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (open) { reset(); setSubmitStatus('idle'); }
  }, [open, reset]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('loading');
    try {
      const res = await fetch('/api/advertise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitStatus(res.ok ? 'done' : 'error');
    } catch {
      setSubmitStatus('error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      style={{ background: 'rgba(26,26,26,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[22px] w-full max-w-[440px] shadow-[0_24px_60px_rgba(0,0,0,0.22)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {/* <div className="bg-gradient-to-br from-teal to-teal-dark px-7 pt-7 pb-6 text-white"> */}
        <div className='pt-5'>
          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center  transition-all"
          >
          
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="px-7 py-6">
          {submitStatus === 'done' ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-bold text-[1.1rem] text-ink mb-2">Enquiry Sent!</h3>
              <p className="text-ink-soft text-[0.88rem] leading-[1.6]">
                We&apos;ve received your details and will contact you shortly.
              </p>
              <Button size="sm" onClick={onClose} className="mt-6">
                Done
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>

              {/* Name */}
              <Field label="Full Name" error={errors.name?.message}>
                <input
                  {...register('name')}
                  type="text"
                  placeholder="e.g. Rahul Menon"
                  autoFocus
                  className={inputCls(!!errors.name)}
                />
              </Field>

              {/* Phone — Controller keeps it registered with RHF */}
              <Field label="Phone Number" error={errors.phone?.message}>
                <Controller
                  name="phone"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className={`flex items-center rounded-[10px] overflow-hidden border transition-colors ${errors.phone ? 'border-red-400 bg-red-50' : 'border-beige-dark bg-beige focus-within:border-teal focus-within:bg-white'}`}>
                      <span className="px-3 py-2.5 text-[0.9rem] font-bold text-ink-soft border-r border-beige-dark bg-beige-mid select-none">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        placeholder="XXXXXXXXXX"
                        maxLength={10}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        onBlur={field.onBlur}
                        className="flex-1 px-3 py-2.5 text-[0.9rem] text-ink bg-transparent outline-none placeholder:text-ink-soft/50"
                      />
                    </div>
                  )}
                />
              </Field>

              {/* Email */}
              <Field label="Email Address" error={errors.email?.message}>
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className={inputCls(!!errors.email)}
                />
              </Field>

              {/* Location */}
              <Field label="Business Location" error={errors.location?.message}>
                <input
                  {...register('location')}
                  type="text"
                  placeholder="e.g. Kochi, Kerala"
                  className={inputCls(!!errors.location)}
                />
              </Field>

              {submitStatus === 'error' && (
                <p className="text-[0.8rem] text-red-500 text-center">
                  Something went wrong. Please try again.
                </p>
              )}

              <Button
                type="submit"
                fullWidth
                disabled={submitStatus === 'loading'}
                className="mt-1"
              >
                {submitStatus === 'loading' ? 'Sending…' : 'Submit Enquiry →'}
              </Button>
              <p className="text-center text-[0.73rem] text-ink-soft">
                We&apos;ll never share your details with third parties.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full border rounded-[10px] px-4 py-2.5 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink-soft/50 ${
    hasError
      ? 'border-red-400 bg-red-50 focus:border-red-400'
      : 'border-beige-dark bg-beige focus:border-teal focus:bg-white'
  }`;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[0.8rem] font-bold text-ink mb-1.5">{label}</label>
      {children}
      {error && <p className="text-[0.75rem] text-red-500 mt-1">{error}</p>}
    </div>
  );
}
