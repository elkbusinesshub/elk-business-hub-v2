'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import ELKLogo from '@/components/ui/ELKLogo';

const POSITIONS = [
  'Software Developer',
  'UI / UX Designer',
  'Marketing Executive',
  'Sales Executive',
  'Business Development',
  'Customer Support',
  'Operations',
  'Other',
];

const schema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  email:    z.string().email('Enter a valid email address'),
  phone:    z.string().regex(/^\d{10}$/, 'Enter a valid 10-digit phone number'),
  position: z.string().min(1, 'Please select a position'),
  message:  z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const perks = [
  { icon: '🚀', title: 'Fast Growth',    desc: 'Work on a product used by thousands across India.' },
  { icon: '🏡', title: 'Flexible Work',  desc: 'Hybrid-friendly culture with focus on outcomes.' },
  { icon: '🌟', title: 'Ownership',      desc: 'Own your work. Drive decisions that matter.' },
  { icon: '💡', title: 'Learning First', desc: 'Workshops, courses, and a curious team around you.' },
];

/* ── Custom position dropdown ─────────────────────────────────────── */
function PositionDropdown({
  value, onChange, onBlur, hasError,
}: {
  value: string; onChange: (v: string) => void; onBlur: () => void; hasError: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        onBlur();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onBlur]);

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
        <span className={value ? 'text-ink' : 'text-ink-soft/50'}>
          {value || 'Select a role…'}
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
        <div className="absolute z-50 left-0 right-0 mt-2 bg-white rounded-[14px] shadow-[0_12px_40px_rgba(0,0,0,0.14)] border border-beige-mid overflow-hidden">
          {POSITIONS.map((p) => {
            const isActive = p === value;
            return (
              <button
                key={p}
                type="button"
                onClick={() => { onChange(p); setOpen(false); }}
                className={`w-full flex items-center justify-between px-4 py-3 text-left text-[0.88rem] transition-colors ${
                  isActive ? 'bg-teal-light text-teal font-bold' : 'text-ink hover:bg-beige'
                }`}
              >
                <span>{p}</span>
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

/* ── Page ─────────────────────────────────────────────────────────── */
export default function CareersPage() {
  const [cv, setCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const fileRef = useRef<HTMLInputElement>(null);

  const { register, handleSubmit, control, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCvError('');
    if (!file) return;
    const allowed = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) { setCvError('Only PDF or Word documents allowed.'); return; }
    if (file.size > 5 * 1024 * 1024) { setCvError('File must be under 5 MB.'); return; }
    setCv(file);
  };

  const onSubmit = async (data: FormData) => {
    if (!cv) { setCvError('Please upload your CV.'); return; }
    setStatus('loading');
    const fd = new FormData();
    Object.entries(data).forEach(([k, v]) => v && fd.append(k, v));
    fd.append('cv', cv);
    try {
      const res = await fetch('/api/careers', { method: 'POST', body: fd });
      setStatus(res.ok ? 'done' : 'error');
    } catch { setStatus('error'); }
  };

  return (
    <div className="min-h-screen bg-beige">
      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-beige-mid px-[5%] py-4 flex items-center justify-between">
        <Link href="/" aria-label="ELK Business Hub – Home"><ELKLogo height={28} /></Link>
        <Link href="/" className="text-[0.85rem] font-bold text-ink-soft hover:text-teal transition-colors no-underline">
          ← Back to Home
        </Link>
      </header>

      {/* Hero */}
      <section className="relative py-20 px-[5%] overflow-hidden" style={{ background: 'linear-gradient(135deg,#1A1A1A 0%,#2a2a2a 100%)', color: 'white' }}>
        <div className="absolute rounded-full pointer-events-none" style={{ width: 400, height: 400, top: -100, right: -80, background: 'radial-gradient(circle,#1BBFBF 0%,transparent 70%)', filter: 'blur(80px)', opacity: 0.12 }} />
        <div className="max-w-[700px]">
          <div className="inline-flex items-center text-[0.75rem] font-bold uppercase tracking-[0.12em] text-teal mb-4">
            — Join Our Team
          </div>
          <h1 className="font-serif font-black text-[clamp(2rem,4vw,3.2rem)] leading-[1.1] mb-5">
            Build the Future of<br />
            <span className="text-teal">Local Commerce</span> with ELK
          </h1>
          <p className="text-[1.05rem] leading-[1.7] max-w-[520px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            We&apos;re a fast-growing startup connecting businesses and customers across India.
            If you love building things that matter, you&apos;ll fit right in.
          </p>
        </div>
      </section>

      {/* Perks */}
      <section className="py-16 px-[5%] bg-white">
        <div className="max-w-[900px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {perks.map((p) => (
            <div key={p.title} className="text-center">
              <div className="text-3xl mb-3">{p.icon}</div>
              <div className="font-bold text-[0.95rem] text-ink mb-1">{p.title}</div>
              <div className="text-[0.8rem] text-ink-soft leading-[1.5]">{p.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 px-[5%]">
        <div className="max-w-[600px] mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center text-[0.75rem] font-bold uppercase tracking-[0.12em] text-teal mb-3">
              — Apply Now
            </div>
            <h2 className="font-serif font-black text-[clamp(1.6rem,3vw,2.2rem)] text-ink">
              Send Your Application
            </h2>
            <p className="text-ink-soft text-[0.9rem] mt-2">
              We review every application and respond within 5 business days.
            </p>
          </div>

          {status === 'done' ? (
            <div className="bg-white rounded-[22px] p-12 text-center shadow-[var(--shadow-card)]">
              <div className="text-5xl mb-4">🎉</div>
              <h3 className="font-bold text-[1.2rem] text-ink mb-2">Application Received!</h3>
              <p className="text-ink-soft text-[0.9rem] leading-[1.7] max-w-[360px] mx-auto">
                Thanks for applying to ELK. Our team will review your details and reach out.
              </p>
              <Link href="/" className="mt-7 inline-block bg-teal text-white px-8 py-3 rounded-full font-bold text-[0.9rem] hover:bg-teal-dark transition-colors no-underline">
                Back to Home
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-[22px] p-8 shadow-[var(--shadow-card)] flex flex-col gap-5" noValidate>

              <Field label="Full Name" error={errors.name?.message}>
                <input {...register('name')} type="text" placeholder="e.g. Anjali Krishnan" autoFocus className={inputCls(!!errors.name)} />
              </Field>

              <Field label="Email Address" error={errors.email?.message}>
                <input {...register('email')} type="email" placeholder="you@example.com" className={inputCls(!!errors.email)} />
              </Field>

              <Field label="Phone Number" error={errors.phone?.message}>
                <Controller
                  name="phone" control={control} defaultValue=""
                  render={({ field }) => (
                    <div className={`flex items-center rounded-[10px] overflow-hidden border transition-colors ${errors.phone ? 'border-red-400 bg-red-50' : 'border-beige-dark bg-beige focus-within:border-teal focus-within:bg-white'}`}>
                      <span className="px-3 py-2.5 text-[0.9rem] font-bold text-ink-soft border-r border-beige-dark bg-beige-mid select-none">+91</span>
                      <input
                        type="tel" inputMode="numeric" placeholder="98765 43210" maxLength={10}
                        value={field.value}
                        onChange={(e) => field.onChange(e.target.value.replace(/\D/g, '').slice(0, 10))}
                        onBlur={field.onBlur}
                        className="flex-1 px-3 py-2.5 text-[0.9rem] text-ink bg-transparent outline-none placeholder:text-ink-soft/50"
                      />
                    </div>
                  )}
                />
              </Field>

              {/* Custom position dropdown */}
              <Field label="Position Applying For" error={errors.position?.message}>
                <Controller
                  name="position" control={control} defaultValue=""
                  render={({ field }) => (
                    <PositionDropdown
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                      hasError={!!errors.position}
                    />
                  )}
                />
              </Field>

              <div>
                <label className="block text-[0.8rem] font-bold text-ink mb-1.5">
                  Cover Note <span className="font-normal text-ink-soft">(optional)</span>
                </label>
                <textarea
                  {...register('message')} rows={4}
                  placeholder="Tell us a little about yourself and why you'd like to join ELK…"
                  className="w-full border border-beige-dark rounded-[10px] px-4 py-2.5 text-[0.9rem] text-ink bg-beige outline-none focus:border-teal focus:bg-white transition-colors placeholder:text-ink-soft/50 resize-none"
                />
              </div>

              {/* CV Upload */}
              <div>
                <label className="block text-[0.8rem] font-bold text-ink mb-1.5">
                  Upload CV <span className="font-normal text-ink-soft">(PDF or Word · max 5 MB)</span>
                </label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className={`border-2 border-dashed rounded-[12px] p-5 text-center cursor-pointer transition-colors ${cvError ? 'border-red-400 bg-red-50' : cv ? 'border-teal bg-teal-light/30' : 'border-beige-dark bg-beige hover:border-teal'}`}
                >
                  {cv ? (
                    <div className="flex items-center justify-center gap-2 text-teal font-bold text-[0.9rem]">
                      <span>📄</span> {cv.name}
                      <button type="button" onClick={(e) => { e.stopPropagation(); setCv(null); if (fileRef.current) fileRef.current.value = ''; }} className="ml-2 text-ink-soft hover:text-red-500 text-xs">✕</button>
                    </div>
                  ) : (
                    <div>
                      <div className="text-2xl mb-1">📎</div>
                      <p className="text-[0.85rem] text-ink-soft">Click to browse or drag &amp; drop your CV</p>
                    </div>
                  )}
                </div>
                <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
                {cvError && <p className="text-[0.75rem] text-red-500 mt-1">{cvError}</p>}
              </div>

              {status === 'error' && (
                <p className="text-[0.8rem] text-red-500 text-center">Something went wrong. Please try again.</p>
              )}

              <button
                type="submit" disabled={status === 'loading'}
                className="w-full bg-teal text-white py-3.5 rounded-full font-bold text-[0.95rem] hover:bg-teal-dark transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(27,191,191,0.35)] disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {status === 'loading' ? 'Submitting…' : 'Submit Application →'}
              </button>
              <p className="text-center text-[0.73rem] text-ink-soft">Your details are kept confidential.</p>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function inputCls(hasError: boolean) {
  return `w-full border rounded-[10px] px-4 py-2.5 text-[0.9rem] text-ink outline-none transition-colors placeholder:text-ink-soft/50 bg-beige ${
    hasError ? 'border-red-400 bg-red-50' : 'border-beige-dark focus:border-teal focus:bg-white'
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


