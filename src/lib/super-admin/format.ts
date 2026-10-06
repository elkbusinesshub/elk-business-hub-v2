import type { AdminModule, Role, ServiceTerms } from './types';

/** The app's own tile names (from the customer app). */
const CATEGORIES: Record<string, string> = {
  cln: 'Home Cleaning',
  deep: 'Deep Cleaning',
  tnk: 'Water Tank',
  sof: 'Sofa & Upholstery',
  crp: 'Carpet & Rug',
  kit: 'Kitchen Clean',
  bth: 'Bathroom Clean',
  lndr: 'Laundry & Iron',
  ac: 'AC & Cooling',
  plm: 'Plumbing',
  elc: 'Electrical',
  cpt: 'Carpentry',
  pnt: 'Painting',
  gen: 'Handyman',
};

export const categoryLabel = (slug: string) => CATEGORIES[slug] ?? slug;

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2,
  minimumFractionDigits: 0,
});

export const rupees = (n: number) => inr.format(n);

/** The rows of the comparison table, in the mockup's order. */
export const TERM_ROWS: {
  key: keyof ServiceTerms;
  label: string;
  show: (t: ServiceTerms) => string;
}[] = [
  { key: 'name', label: 'Name', show: (t) => t.name },
  {
    key: 'category',
    label: 'Category',
    show: (t) => categoryLabel(t.category),
  },
  { key: 'minHours', label: 'Duration', show: (t) => `${t.minHours} hrs` },
  {
    key: 'hourlyRate',
    label: 'Rate per hour',
    show: (t) => rupees(t.hourlyRate),
  },
  {
    key: 'extraProRate',
    label: 'Extra professional',
    show: (t) => `${rupees(t.extraProRate)}/hr`,
  },
  {
    key: 'materialsFee',
    label: 'Materials',
    show: (t) => rupees(t.materialsFee),
  },
  {
    key: 'startingPrice',
    label: 'Starting price',
    show: (t) => rupees(t.startingPrice),
  },
];

const IST = 'Asia/Kolkata';

/** "Today, 9:40 am", "Yesterday, 6:05 pm" or "2 Oct 2026, 11:00 am", in India time. */
export function when(iso: string): string {
  const d = new Date(iso);
  const time = d
    .toLocaleTimeString('en-IN', {
      timeZone: IST,
      hour: 'numeric',
      minute: '2-digit',
    })
    .toLowerCase();
  const day = (x: Date) => x.toLocaleDateString('en-CA', { timeZone: IST });
  const today = new Date();
  const yesterday = new Date(today.getTime() - 86_400_000);
  if (day(d) === day(today)) return `Today, ${time}`;
  if (day(d) === day(yesterday)) return `Yesterday, ${time}`;
  const date = d.toLocaleDateString('en-IN', {
    timeZone: IST,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
  return `${date}, ${time}`;
}

export function joinedOn(iso: string): string {
  return new Date(iso).toLocaleDateString('en-IN', {
    timeZone: IST,
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export const MODULE_LABELS: Record<AdminModule, string> = {
  CLEAN: 'ELK Clean',
  REPAIR: 'ELK Repair',
  RENTAL: 'ELK Rental',
};

export const ROLE_LABELS: Record<Role, string> = {
  USER: 'Customer',
  PROVIDER: 'Provider',
  ADMIN: 'Admin',
  PROFESSIONAL: 'Professional',
  SUPER_ADMIN: 'Super admin',
};

/** "+91 98765 43210" from "+919876543210"; other numbers unchanged. */
export function phoneLabel(phone: string | null): string {
  if (!phone) return '—';
  const m = /^\+91(\d{5})(\d{5})$/.exec(phone);
  return m ? `+91 ${m[1]} ${m[2]}` : phone;
}

export function initials(name: string | null | undefined): string {
  const parts = (name ?? '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return 'SA';
  return (parts[0][0] + (parts[1]?.[0] ?? '')).toUpperCase();
}
