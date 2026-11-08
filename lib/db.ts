import { PrismaClient } from "@prisma/client";

// If DATABASE_URL was copied from .env as file:./sasha.db, auto-fallback to Vercel Postgres storage env vars
const resolvedDbUrl =
  process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith("file:")
    ? process.env.DATABASE_URL
    : process.env.sasha_DATABASE_URL ||
      process.env.sasha_DATABASE_URL_POOLED ||
      process.env.sasha_POSTGRES_URL ||
      process.env.sasha_PRISMA_DATABASE_URL ||
      process.env.DATABASE_URL_POOLED ||
      process.env.POSTGRES_PRISMA_URL ||
      process.env.POSTGRES_URL ||
      process.env.PRISMA_DATABASE_URL ||
      process.env.DATABASE_URL;

// Prisma's "postgresql" datasource only accepts these protocols.
const POSTGRES_URL = /^(postgres|postgresql|prisma|prisma\+postgres):\/\//;

/** False when no usable PostgreSQL connection string is set (e.g. a local .env left on "file:./sasha.db"). */
export const isDatabaseConfigured = Boolean(resolvedDbUrl && POSTGRES_URL.test(resolvedDbUrl));

if (isDatabaseConfigured) {
  process.env.DATABASE_URL = resolvedDbUrl;
}

export class DatabaseNotConfiguredError extends Error {
  constructor() {
    super("The database is not configured. Set DATABASE_URL to a PostgreSQL connection string.");
    this.name = "DatabaseNotConfiguredError";
  }
}

// Stored on globalThis: in dev each route bundle evaluates this module separately.
const warnState = globalThis as unknown as { __sashaDbWarned?: boolean };

/** Reads degrade to empty results without a database, with one clear warning instead of a crash. */
function noDatabaseForRead(): boolean {
  if (isDatabaseConfigured) return false;
  if (!warnState.__sashaDbWarned) {
    warnState.__sashaDbWarned = true;
    const protocol = resolvedDbUrl ? `"${resolvedDbUrl.split(":")[0]}:"` : "nothing";
    console.warn(
      `[db] DATABASE_URL is not a PostgreSQL connection string (found ${protocol}). ` +
        "Pages will show no jobs and forms cannot be saved. " +
        'Set DATABASE_URL in .env.local to a "postgresql://…" URL — on Vercel: Project → Storage → your database → .env.local.',
    );
  }
  return true;
}

/** Writes must not silently succeed without a database. */
function requireDatabase(): void {
  if (!isDatabaseConfigured) throw new DatabaseNotConfiguredError();
}

export type Job = {
  id: string;
  title: string;
  companyName: string;
  companyLogo: string | null;
  location: string;
  salaryText: string | null;
  experience: string;
  workType: string;
  description: string;
  requirements: string;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type Enquiry = {
  id: string;
  kind: string;
  name: string;
  phone: string;
  email: string | null;
  companyName?: string | null;
  projectLocation?: string | null;
  workersCount?: string | null;
  tradePosition?: string | null;
  experience?: string | null;
  remarks?: string | null;
  message: string;
  createdAt: string | Date;
};

export type RecordItem = {
  id: string;
  type: string;
  title: string;
  amount: number | null;
  currency: string;
  dueDate: string | Date | null;
  note: string | null;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
};

export type CreateJobData = {
  title: string;
  companyName?: string;
  companyLogo?: string | null;
  location: string;
  salaryText?: string | null;
  experience?: string;
  workType: string;
  description: string;
  requirements: string;
  status?: string;
};

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const db = {
  job: {
    findMany: async ({
      where,
      orderBy,
    }: {
      where?: { status?: string };
      orderBy?: unknown;
    } = {}) => {
      if (noDatabaseForRead()) return [] as Job[];
      return (await prisma.job.findMany({
        where: where?.status ? { status: where.status } : undefined,
        orderBy: (orderBy as any) ?? { updatedAt: "desc" },
      })) as unknown as Job[];
    },
    findById: async (id: string) => {
      if (noDatabaseForRead()) return null;
      return (await prisma.job.findUnique({ where: { id } })) as unknown as Job | null;
    },
    create: async ({ data }: { data: CreateJobData }) => {
      requireDatabase();
      return (await prisma.job.create({
        data: {
          title: data.title,
          companyName: data.companyName || "SASHA General Contracting",
          companyLogo: data.companyLogo || "/sasha-mark.svg",
          location: data.location,
          salaryText: data.salaryText || null,
          experience: data.experience || "1-2 Years UAE Site Experience",
          workType: data.workType,
          description: data.description,
          requirements: data.requirements,
          status: data.status || "OPEN",
        },
      })) as unknown as Job;
    },
    update: async ({
      where,
      data,
    }: {
      where: { id: string };
      data: Partial<Job>;
    }) => {
      requireDatabase();
      return (await prisma.job.update({
        where: { id: where.id },
        data: {
          ...(data.status !== undefined && { status: data.status }),
          ...(data.title !== undefined && { title: data.title }),
          ...(data.companyName !== undefined && { companyName: data.companyName }),
          ...(data.companyLogo !== undefined && { companyLogo: data.companyLogo }),
          ...(data.location !== undefined && { location: data.location }),
          ...(data.salaryText !== undefined && { salaryText: data.salaryText }),
          ...(data.experience !== undefined && { experience: data.experience }),
          ...(data.workType !== undefined && { workType: data.workType }),
          ...(data.description !== undefined && { description: data.description }),
          ...(data.requirements !== undefined && { requirements: data.requirements }),
        },
      })) as unknown as Job;
    },
    delete: async ({ where }: { where: { id: string } }) => {
      requireDatabase();
      return await prisma.job.delete({ where: { id: where.id } });
    },
  },
  enquiry: {
    findMany: async ({
      take,
      orderBy,
    }: {
      take?: number;
      orderBy?: unknown;
    } = {}) => {
      if (noDatabaseForRead()) return [] as Enquiry[];
      return (await prisma.enquiry.findMany({
        take,
        orderBy: (orderBy as any) ?? { createdAt: "desc" },
      })) as unknown as Enquiry[];
    },
    create: async ({
      data,
    }: {
      data: Omit<Enquiry, "id" | "createdAt">;
    }) => {
      requireDatabase();
      return (await prisma.enquiry.create({
        data: {
          kind: data.kind,
          name: data.name,
          phone: data.phone,
          email: data.email || null,
          companyName: data.companyName || null,
          projectLocation: data.projectLocation || null,
          workersCount: data.workersCount || null,
          tradePosition: data.tradePosition || null,
          experience: data.experience || null,
          remarks: data.remarks || null,
          message: data.message,
        },
      })) as unknown as Enquiry;
    },
    delete: async ({ where }: { where: { id: string } }) => {
      requireDatabase();
      return await prisma.enquiry.delete({ where: { id: where.id } });
    },
  },
  record: {
    findMany: async ({
      take,
      orderBy,
    }: {
      take?: number;
      orderBy?: unknown;
    } = {}) => {
      if (noDatabaseForRead()) return [] as RecordItem[];
      return (await prisma.record.findMany({
        take,
        orderBy: (orderBy as any) ?? { updatedAt: "desc" },
      })) as unknown as RecordItem[];
    },
    create: async ({
      data,
    }: {
      data: Omit<RecordItem, "id" | "createdAt" | "updatedAt" | "dueDate"> & {
        dueDate?: Date | null;
      };
    }) => {
      requireDatabase();
      return (await prisma.record.create({
        data: {
          type: data.type,
          title: data.title,
          amount: data.amount ?? null,
          currency: data.currency || "AED",
          dueDate: data.dueDate ?? null,
          note: data.note ?? null,
          status: data.status || "DRAFT",
        },
      })) as unknown as RecordItem;
    },
    update: async ({
      where,
      data,
    }: {
      where: { id: string };
      data: Partial<RecordItem>;
    }) => {
      requireDatabase();
      return (await prisma.record.update({
        where: { id: where.id },
        data: {
          ...(data.status !== undefined && { status: data.status }),
          ...(data.note !== undefined && { note: data.note }),
          ...(data.title !== undefined && { title: data.title }),
          ...(data.amount !== undefined && { amount: data.amount }),
          ...(data.currency !== undefined && { currency: data.currency }),
          ...(data.dueDate !== undefined && { dueDate: data.dueDate as any }),
        },
      })) as unknown as RecordItem;
    },
    delete: async ({ where }: { where: { id: string } }) => {
      requireDatabase();
      return await prisma.record.delete({ where: { id: where.id } });
    },
  },
};
