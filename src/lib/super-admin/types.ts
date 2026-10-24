/** Shapes returned by the ELK API's super admin endpoints. */

export type Role = 'USER' | 'ADMIN' | 'SUPER_ADMIN';

export const ROLES: Role[] = ['USER', 'ADMIN', 'SUPER_ADMIN'];

/** GET admin/users/stats. Deleted accounts and listings are not counted. */
export type AdminStats = {
  users: {
    customers: number;
    admins: number;
    superAdmins: number;
    total: number;
  };
  /** Sellers' marketplace listings, every category. */
  listings: {
    active: number;
    paused: number;
    draft: number;
    total: number;
  };
  /** ELK's own services that admins run, including ones awaiting approval. */
  providerListings: {
    cleaning: number;
    repair: number;
    total: number;
  };
};

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
