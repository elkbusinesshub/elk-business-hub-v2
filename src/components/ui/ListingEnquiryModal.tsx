'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useForm, Controller, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Button from '@/components/ui/Button';
import Select from '@/components/ui/Select';

type Lang = 'ml' | 'en';

const CATEGORIES = [
  'Properties',
  'Cars',
  'Bikes',
  'Helicopter',
  'Painting',
  'Services',
  'Other',
];

const CATEGORY_LABELS: Record<Lang, Record<string, string>> = {
  en: {
    Properties: 'Properties',
    Cars: 'Cars',
    Bikes: 'Bikes',
    Helicopter: 'Helicopter',
    Painting: 'Painting',
    Services: 'Services',
    Other: 'Other',
  },
  ml: {
    Properties: 'പ്രോപ്പർട്ടികൾ',
    Cars: 'കാറുകൾ',
    Bikes: 'ബൈക്കുകൾ',
    Helicopter: 'ഹെലികോപ്റ്റർ',
    Painting: 'പെയിന്റിംഗ്',
    Services: 'സർവീസുകൾ',
    Other: 'മറ്റുള്ളവ',
  },
};

const T = {
  en: {
    toggleLabel: 'മലയാളം',
    title: 'Got Something to Rent or Sell?',
    subtitle: "Tell us what you have — we'll help you list it",
    nameLabel: 'Full Name',
    namePlaceholder: 'e.g. Rahul Menon',
    phoneLabel: 'Phone Number',
    categoryLabel: 'What Are You Looking For?',
    categoryPlaceholder: 'Select a category…',
    locationLabel: 'Preferred Location',
    locationPlaceholder: 'e.g. Kannur, Kerala',
    submit: 'Notify Me →',
    sending: 'Sending…',
    footer: "We'll never share your details with third parties.",
    errorMessage: 'Something went wrong. Please try again.',
    successTitle: 'Got It!',
    successMessage: "Thanks! We'll contact you soon.",
    done: 'Done',
    errors: {
      name: 'Name must be at least 2 characters',
      phone: 'Enter a valid 10-digit phone number',
      category: 'Please select a category',
      location: 'Please enter your preferred location',
    },
  },
  ml: {
    toggleLabel: 'English',
    title: 'വാടകയ്ക്കോ വിൽപ്പനയ്ക്കോ എന്തെങ്കിലും ഉണ്ടോ?',
    subtitle: 'നിങ്ങൾക്ക് എന്തുണ്ടെന്ന് പറയൂ — ലിസ്റ്റ് ചെയ്യാൻ ഞങ്ങൾ സഹായിക്കാം',
    nameLabel: 'പൂർണ്ണമായ പേര്',
    namePlaceholder: 'ഉദാ. രാഹുൽ മേനോൻ',
    phoneLabel: 'ഫോൺ നമ്പർ',
    categoryLabel: 'നിങ്ങൾ എന്താണ് അന്വേഷിക്കുന്നത്?',
    categoryPlaceholder: 'ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുക…',
    locationLabel: 'ഇഷ്ടപ്പെട്ട സ്ഥലം',
    locationPlaceholder: 'ഉദാ. കണ്ണൂർ, കേരളം',
    submit: 'അറിയിക്കുക →',
    sending: 'അയയ്ക്കുന്നു…',
    footer: 'നിങ്ങളുടെ വിവരങ്ങൾ ഞങ്ങൾ മൂന്നാം കക്ഷികളുമായി ഒരിക്കലും പങ്കിടില്ല.',
    errorMessage: 'എന്തോ പ്രശ്നം സംഭവിച്ചു. വീണ്ടും ശ്രമിക്കുക.',
    successTitle: 'ലഭിച്ചു!',
    successMessage: 'നന്ദി! ഞങ്ങൾ ഉടൻ നിങ്ങളെ ബന്ധപ്പെടും.',
    done: 'ശരി',
    errors: {
      name: 'പേരിന് കുറഞ്ഞത് 2 അക്ഷരങ്ങൾ വേണം',
      phone: 'സാധുവായ 10 അക്ക ഫോൺ നമ്പർ നൽകുക',
      category: 'ഒരു വിഭാഗം തിരഞ്ഞെടുക്കുക',
      location: 'നിങ്ങളുടെ ഇഷ്ടപ്പെട്ട സ്ഥലം നൽകുക',
    },
  },
} as const;

const getSchema = (lang: Lang) => z.object({
  name: z.string().min(2, T[lang].errors.name),
  phone: z.string().regex(/^\d{10}$/, T[lang].errors.phone),
  category: z.string().min(1, T[lang].errors.category),
  location: z.string().min(2, T[lang].errors.location),
});

type FormData = z.infer<ReturnType<typeof getSchema>>;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ListingEnquiryModal({ open, onClose }: Props) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [lang, setLang] = useState<Lang>('en');
  const [successLang, setSuccessLang] = useState<Lang>('en');
  const langRef = useRef<Lang>(lang);
  langRef.current = lang;

  const resolver = useMemo<Resolver<FormData>>(
    () => (values, context, options) => zodResolver(getSchema(langRef.current))(values, context, options),
    []
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver,
    defaultValues: { name: '', phone: '', category: 'Properties', location: '' },
  });

  useEffect(() => {
    if (open) { reset(); setSubmitStatus('idle'); setLang('en'); }
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

  const t = T[lang];

  const onSubmit = async (data: FormData) => {
    setSubmitStatus('loading');
    setSuccessLang(lang);
    try {
      const res = await fetch('/api/listing-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setSubmitStatus(res.ok ? 'done' : 'error');
    } catch {
      setSubmitStatus('error');
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      style={{ background: 'rgba(26,26,26,0.6)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[22px] w-full max-w-[440px] shadow-[0_24px_60px_rgba(0,0,0,0.22)] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Language toggle */}
        {submitStatus !== 'done' && (
          <button
            type="button"
            onClick={() => setLang((l) => (l === 'ml' ? 'en' : 'ml'))}
            className="absolute top-4 left-4 z-10 flex items-center gap-1 bg-beige border border-beige-dark rounded-full px-3 py-1.5 text-[0.72rem] font-bold text-ink hover:border-teal hover:text-teal transition-colors"
          >
            🌐 {t.toggleLabel}
          </button>
        )}

        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-ink-soft hover:text-ink hover:bg-beige transition-all z-10"
        >
          ✕
        </button>

        {/* Teal accent bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-teal to-teal-dark" />

        <div className="px-7 pt-7 pb-8">
          {submitStatus === 'done' ? (
            <div className="text-center py-6">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="font-bold text-[1.1rem] text-ink mb-2">{T[successLang].successTitle}</h3>
              <p className="text-ink-soft text-[0.88rem] leading-[1.6]">
                {T[successLang].successMessage}
              </p>
              <Button size="sm" onClick={onClose} className="mt-6">
                {T[successLang].done}
              </Button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex flex-col items-center text-center gap-2 mb-5 mt-6">
                <div>
                  <h2 className="font-bold text-[1.15rem] text-ink leading-tight">
                    {t.title}
                  </h2>
                  <p className="text-[0.78rem] text-ink-soft mt-0.5">
                    {t.subtitle}
                  </p>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
                {/* Name */}
                <Field label={t.nameLabel} error={errors.name?.message}>
                  <input
                    {...register('name')}
                    type="text"
                    placeholder={t.namePlaceholder}
                    autoFocus
                    className={inputCls(!!errors.name)}
                  />
                </Field>

                {/* Phone */}
                <Field label={t.phoneLabel} error={errors.phone?.message}>
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
                          placeholder="98765 43210"
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

                {/* Category */}
                <Field label={t.categoryLabel} error={errors.category?.message}>
                  <Controller
                    name="category"
                    control={control}
                    defaultValue="Properties"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onChange={field.onChange}
                        onBlur={field.onBlur}
                        hasError={!!errors.category}
                        placeholder={t.categoryPlaceholder}
                        options={CATEGORIES.map((c) => ({
                          value: c,
                          label: CATEGORY_LABELS[lang][c],
                        }))}
                      />
                    )}
                  />
                </Field>

                {/* Location */}
                <Field label={t.locationLabel} error={errors.location?.message}>
                  <input
                    {...register('location')}
                    type="text"
                    placeholder={t.locationPlaceholder}
                    className={inputCls(!!errors.location)}
                  />
                </Field>

                {submitStatus === 'error' && (
                  <p className="text-[0.8rem] text-red-500 text-center">
                    {t.errorMessage}
                  </p>
                )}

                <Button
                  type="submit"
                  fullWidth
                  disabled={submitStatus === 'loading'}
                  className="mt-1"
                >
                  {submitStatus === 'loading' ? t.sending : t.submit}
                </Button>
                <p className="text-center text-[0.73rem] text-ink-soft">
                  {t.footer}
                </p>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.body
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
