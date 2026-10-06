/** Shapes returned by the ELK API's super admin endpoints. */

export type Role =
  | 'USER'
  | 'PROVIDER'
  | 'ADMIN'
  | 'PROFESSIONAL'
  | 'SUPER_ADMIN';

export const ROLES: Role[] = [
  'USER',
  'PROVIDER',
  'ADMIN',
  'PROFESSIONAL',
  'SUPER_ADMIN',
];

export type PageMeta = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type Paged<T> = { items: T[]; meta: PageMeta };

export type Person = { id: string; name: string | null; phone: string | null };

export type ServiceTerms = {
  name: string;
  vertical: 'CLEANING' | 'REPAIR';
  category: string;
  minHours: number;
  hourlyRate: number;
  extraProRate: number;
  materialsFee: number;
  startingPrice: number;
};

export type ServiceChange = {
  id: string;
  kind: 'NEW_SERVICE' | 'PRICE_CHANGE';
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  serviceId: string | null;
  current: ServiceTerms | null;
  requested: ServiceTerms;
  changed: string[];
  requestedBy: Person;
  requestedAt: string;
  decidedBy: Person | null;
  decidedAt: string | null;
  note: string;
};

export type ApprovalsSummary = {
  waiting: number;
  newServices: number;
  priceChanges: number;
};

export type AdminModule = 'CLEAN' | 'REPAIR' | 'RENTAL';

export const ADMIN_MODULES: AdminModule[] = ['CLEAN', 'REPAIR', 'RENTAL'];

export type AppUser = {
  id: string;
  name: string | null;
  phone: string | null;
  role: Role;
  /** What an admin runs; empty for other roles. */
  modules: AdminModule[];
  joinedAt: string;
};

export type Me = { id: string; name: string | null; phone: string | null };
