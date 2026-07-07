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
    addBusinessLink: '+ Add a Business',
    removeBusinessLink: '− Remove Business Details',
    businessTitleLabel: 'Business Title',
    businessTitlePlaceholder: "e.g. Rahul's Bakery",
    businessDescriptionLabel: 'Description',
    businessDescriptionPlaceholder: 'Tell us about your business…',
    imagesLabel: 'Upload Images (up to 3)',
    imagesHint: 'Tap to upload — JPG, PNG or WEBP, up to 5MB each',
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
      businessTitle: 'Business title must be at least 2 characters',
      businessDescription: 'Please add a short description (min 10 characters)',
      imageType: 'Only JPG, PNG or WEBP images are allowed',
      imageSize: 'Each image must be under 5MB',
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
    addBusinessLink: '+ ഒരു ബിസിനസ് ചേർക്കുക',
    removeBusinessLink: '− ബിസിനസ് വിവരങ്ങൾ നീക്കം ചെയ്യുക',
    businessTitleLabel: 'ബിസിനസിന്റെ പേര്',
    businessTitlePlaceholder: 'ഉദാ. രാഹുലിന്റെ ബേക്കറി',
    businessDescriptionLabel: 'വിവരണം',
    businessDescriptionPlaceholder: 'നിങ്ങളുടെ ബിസിനസിനെക്കുറിച്ച് പറയൂ…',
    imagesLabel: 'ചിത്രങ്ങൾ അപ്‌ലോഡ് ചെയ്യുക (പരമാവധി 3)',
    imagesHint: 'അപ്‌ലോഡ് ചെയ്യാൻ ടാപ്പ് ചെയ്യുക — JPG, PNG അല്ലെങ്കിൽ WEBP, ഓരോന്നും 5MB വരെ',
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
      businessTitle: 'ബിസിനസിന്റെ പേരിന് കുറഞ്ഞത് 2 അക്ഷരങ്ങൾ വേണം',
      businessDescription: 'ദയവായി ഒരു ചെറിയ വിവരണം നൽകുക (കുറഞ്ഞത് 10 അക്ഷരങ്ങൾ)',
      imageType: 'JPG, PNG അല്ലെങ്കിൽ WEBP ചിത്രങ്ങൾ മാത്രം അനുവദനീയം',
      imageSize: 'ഓരോ ചിത്രവും 5MB-ൽ താഴെ ആയിരിക്കണം',
    },
  },
} as const;

const getSchema = (lang: Lang) => z.object({
  name: z.string().min(2, T[lang].errors.name),
  phone: z.string().regex(/^\d{10}$/, T[lang].errors.phone),
  category: z.string().min(1, T[lang].errors.category),
  location: z.string().min(2, T[lang].errors.location),
  isBusiness: z.boolean(),
  businessTitle: z.string().optional(),
  businessDescription: z.string().optional(),
}).superRefine((data, ctx) => {
  if (!data.isBusiness) return;
  if (!data.businessTitle || data.businessTitle.trim().length < 2) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: T[lang].errors.businessTitle, path: ['businessTitle'] });
  }
  if (!data.businessDescription || data.businessDescription.trim().length < 10) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: T[lang].errors.businessDescription, path: ['businessDescription'] });
  }
});

type EnquiryFormData = z.infer<ReturnType<typeof getSchema>>;

const MAX_IMAGES = 3;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function ListingEnquiryModal({ open, onClose }: Props) {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');
  const [lang, setLang] = useState<Lang>('en');
  const [successLang, setSuccessLang] = useState<Lang>('en');
  const [showBusiness, setShowBusiness] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imageError, setImageError] = useState('');
  const imageInputRef = useRef<HTMLInputElement>(null);
  const nameInputRef = useRef<HTMLInputElement | null>(null);
  const langRef = useRef<Lang>(lang);
  langRef.current = lang;

  const resolver = useMemo<Resolver<EnquiryFormData>>(
    () => (values, context, options) => zodResolver(getSchema(langRef.current))(values, context, options),
    []
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors },
  } = useForm<EnquiryFormData>({
    resolver,
    defaultValues: {
      name: '', phone: '', category: 'Properties', location: '',
      isBusiness: false, businessTitle: '', businessDescription: '',
    },
  });

  const previews = useMemo(() => images.map((file) => URL.createObjectURL(file)), [images]);
  useEffect(() => () => { previews.forEach((url) => URL.revokeObjectURL(url)); }, [previews]);

  const nameField = register('name');
  const t = T[lang];

  const toggleBusiness = () => {
    setShowBusiness((prev) => {
      const next = !prev;
      setValue('isBusiness', next);
      if (!next) {
        setValue('businessTitle', '');
        setValue('businessDescription', '');
        setImages([]);
        setImageError('');
      }
      return next;
    });
  };

  const handleImages = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length === 0) return;
    setImageError('');
    const accepted: File[] = [];
    for (const file of files) {
      if (!ALLOWED_IMAGE_TYPES.includes(file.type)) { setImageError(t.errors.imageType); continue; }
      if (file.size > MAX_IMAGE_SIZE) { setImageError(t.errors.imageSize); continue; }
      accepted.push(file);
    }
    setImages((prev) => [...prev, ...accepted].slice(0, MAX_IMAGES));
    if (imageInputRef.current) imageInputRef.current.value = '';
  };

  const removeImage = (index: number) => setImages((prev) => prev.filter((_, i) => i !== index));

  useEffect(() => {
    if (open) {
      reset();
      setSubmitStatus('idle');
      setLang('en');
      setShowBusiness(false);
      setImages([]);
      setImageError('');
      nameInputRef.current?.focus({ preventScroll: true });
    }
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

  const onSubmit = async (data: EnquiryFormData) => {
    setSubmitStatus('loading');
    setSuccessLang(lang);
    try {
      const fd = new FormData();
      fd.append('name', data.name);
      fd.append('phone', data.phone);
      fd.append('category', data.category);
      fd.append('location', data.location);
      fd.append('isBusiness', String(showBusiness));
      if (showBusiness) {
        fd.append('businessTitle', data.businessTitle ?? '');
        fd.append('businessDescription', data.businessDescription ?? '');
        images.forEach((file) => fd.append('images', file));
      }
      const res = await fetch('/api/listing-enquiry', { method: 'POST', body: fd });
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
        className="relative bg-white rounded-[22px] w-full max-w-[440px] shadow-[0_24px_60px_rgba(0,0,0,0.22)] overflow-hidden flex flex-col max-h-[85vh]"
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
        <div className="h-1.5 w-full bg-gradient-to-r from-teal to-teal-dark shrink-0" />

        {submitStatus === 'done' ? (
          <div className="px-7 pt-7 pb-8 text-center py-6">
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
            {/* Header — stays fixed, doesn't scroll with the form */}
            <div className="px-7 pt-7 shrink-0 flex flex-col items-center text-center gap-2 mb-5 mt-6">
              <div>
                <h2 className="font-bold text-[1.15rem] text-ink leading-tight">
                  {t.title}
                </h2>
                <p className="text-[0.78rem] text-ink-soft mt-0.5">
                  {t.subtitle}
                </p>
              </div>
            </div>

            <div className="px-7 pb-8 overflow-y-auto overscroll-contain">
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" noValidate>
                {/* Name */}
                <Field label={t.nameLabel} error={errors.name?.message}>
                  <input
                    {...nameField}
                    ref={(el) => { nameField.ref(el); nameInputRef.current = el; }}
                    type="text"
                    placeholder={t.namePlaceholder}
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

                {/* Add Business toggle */}
                <button
                  type="button"
                  onClick={toggleBusiness}
                  className="self-start text-[0.8rem] font-bold text-teal hover:text-teal-dark transition-colors -mt-1"
                >
                  {showBusiness ? t.removeBusinessLink : t.addBusinessLink}
                </button>

                {showBusiness && (
                  <>
                    {/* Business Title */}
                    <Field label={t.businessTitleLabel} error={errors.businessTitle?.message}>
                      <input
                        {...register('businessTitle')}
                        type="text"
                        placeholder={t.businessTitlePlaceholder}
                        className={inputCls(!!errors.businessTitle)}
                      />
                    </Field>

                    {/* Business Description */}
                    <Field label={t.businessDescriptionLabel} error={errors.businessDescription?.message}>
                      <textarea
                        {...register('businessDescription')}
                        rows={3}
                        placeholder={t.businessDescriptionPlaceholder}
                        className={inputCls(!!errors.businessDescription) + ' resize-none'}
                      />
                    </Field>

                    {/* Images */}
                    <div>
                      <label className="block text-[0.8rem] font-bold text-ink mb-1.5">{t.imagesLabel}</label>
                      <div
                        onClick={() => images.length < MAX_IMAGES && imageInputRef.current?.click()}
                        className={`border-2 border-dashed rounded-[12px] p-4 text-center transition-colors ${
                          images.length >= MAX_IMAGES ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:border-teal'
                        } ${imageError ? 'border-red-400 bg-red-50' : 'border-beige-dark bg-beige'}`}
                      >
                        {images.length === 0 ? (
                          <p className="text-[0.78rem] text-ink-soft">📷 {t.imagesHint}</p>
                        ) : (
                          <div className="flex gap-2 justify-center flex-wrap">
                            {previews.map((url, i) => (
                              <div key={i} className="relative w-16 h-16 rounded-[8px] overflow-hidden border border-beige-dark">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={url} alt="" className="w-full h-full object-cover" />
                                <button
                                  type="button"
                                  onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                                  className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/60 text-white text-[10px] flex items-center justify-center"
                                >
                                  ✕
                                </button>
                              </div>
                            ))}
                            {images.length < MAX_IMAGES && (
                              <div className="w-16 h-16 rounded-[8px] border border-dashed border-beige-dark flex items-center justify-center text-ink-soft text-lg">
                                +
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                      <input
                        ref={imageInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        multiple
                        onChange={handleImages}
                        className="hidden"
                      />
                      {imageError && <p className="text-[0.75rem] text-red-500 mt-1">{imageError}</p>}
                    </div>
                  </>
                )}

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
            </div>
          </>
        )}
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
