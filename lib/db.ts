import Database from "better-sqlite3";
import path from "path";
import crypto from "crypto";

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
  createdAt: string;
  updatedAt: string;
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
  createdAt: string;
};

export type RecordItem = {
  id: string;
  type: string;
  title: string;
  amount: number | null;
  currency: string;
  dueDate: string | null;
  note: string | null;
  status: string;
  createdAt: string;
  updatedAt: string;
};

const globalDb = globalThis as unknown as { sashaDb?: Database.Database };
const dbFile = process.env.DATABASE_URL?.replace("file:", "") || "./sasha.db";
const sqlite = globalDb.sashaDb ?? new Database(path.resolve(process.cwd(), dbFile));
if (process.env.NODE_ENV !== "production") globalDb.sashaDb = sqlite;

sqlite.pragma("journal_mode = WAL");
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS jobs (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    companyName TEXT NOT NULL DEFAULT 'SASHA General Contracting',
    companyLogo TEXT,
    location TEXT NOT NULL,
    salaryText TEXT,
    experience TEXT NOT NULL DEFAULT '1-2 Years UAE Site Experience',
    workType TEXT NOT NULL,
    description TEXT NOT NULL,
    requirements TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'OPEN',
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS enquiries (
    id TEXT PRIMARY KEY,
    kind TEXT NOT NULL,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    email TEXT,
    companyName TEXT,
    projectLocation TEXT,
    workersCount TEXT,
    tradePosition TEXT,
    experience TEXT,
    remarks TEXT,
    message TEXT NOT NULL,
    createdAt TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS records (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    amount INTEGER,
    currency TEXT NOT NULL,
    dueDate TEXT,
    note TEXT,
    status TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    updatedAt TEXT NOT NULL
  );
`);

// Safe column migrations for existing SQLite tables
function safeAddCol(table: string, colDef: string) {
  try {
    sqlite.exec(`ALTER TABLE ${table} ADD COLUMN ${colDef}`);
  } catch {}
}

safeAddCol("jobs", "companyName TEXT NOT NULL DEFAULT 'SASHA General Contracting'");
safeAddCol("jobs", "companyLogo TEXT");
safeAddCol("jobs", "experience TEXT NOT NULL DEFAULT '1-2 Years UAE Site Experience'");
safeAddCol("enquiries", "companyName TEXT");
safeAddCol("enquiries", "projectLocation TEXT");
safeAddCol("enquiries", "workersCount TEXT");
safeAddCol("enquiries", "tradePosition TEXT");
safeAddCol("enquiries", "experience TEXT");
safeAddCol("enquiries", "remarks TEXT");

const id = () => crypto.randomUUID();
const now = () => new Date().toISOString();

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

export const db = {
  job: {
    findMany: ({ where }: { where?: { status?: string }; orderBy?: unknown } = {}) =>
      sqlite
        .prepare(
          `SELECT * FROM jobs ${where?.status ? "WHERE status=?" : ""} ORDER BY updatedAt DESC`
        )
        .all(...(where?.status ? [where.status] : [])) as Job[],
    create: ({ data }: { data: CreateJobData }) => {
      const time = now();
      const row = {
        id: id(),
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
        createdAt: time,
        updatedAt: time,
      };
      sqlite
        .prepare(
          `INSERT INTO jobs (id, title, companyName, companyLogo, location, salaryText, experience, workType, description, requirements, status, createdAt, updatedAt)
           VALUES (@id, @title, @companyName, @companyLogo, @location, @salaryText, @experience, @workType, @description, @requirements, @status, @createdAt, @updatedAt)`
        )
        .run(row);
      return row as Job;
    },
    update: ({ where, data }: { where: { id: string }; data: Partial<Job> }) =>
      sqlite
        .prepare(
          `UPDATE jobs SET 
            status=COALESCE(@status, status),
            title=COALESCE(@title, title),
            companyName=COALESCE(@companyName, companyName),
            companyLogo=COALESCE(@companyLogo, companyLogo),
            location=COALESCE(@location, location),
            salaryText=COALESCE(@salaryText, salaryText),
            experience=COALESCE(@experience, experience),
            workType=COALESCE(@workType, workType),
            description=COALESCE(@description, description),
            requirements=COALESCE(@requirements, requirements),
            updatedAt=@updatedAt 
          WHERE id=@id`
        )
        .run({
          id: where.id,
          status: data.status || null,
          title: data.title || null,
          companyName: data.companyName || null,
          companyLogo: data.companyLogo || null,
          location: data.location || null,
          salaryText: data.salaryText || null,
          experience: data.experience || null,
          workType: data.workType || null,
          description: data.description || null,
          requirements: data.requirements || null,
          updatedAt: now(),
        }),
    delete: ({ where }: { where: { id: string } }) =>
      sqlite.prepare("DELETE FROM jobs WHERE id=?").run(where.id),
  },
  enquiry: {
    findMany: ({ take }: { take?: number; orderBy?: unknown } = {}) =>
      sqlite
        .prepare(`SELECT * FROM enquiries ORDER BY createdAt DESC ${take ? "LIMIT ?" : ""}`)
        .all(...(take ? [take] : [])) as Enquiry[],
    create: ({ data }: { data: Omit<Enquiry, "id" | "createdAt"> }) => {
      const row = {
        id: id(),
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
        createdAt: now(),
      };
      sqlite
        .prepare(
          `INSERT INTO enquiries (id, kind, name, phone, email, companyName, projectLocation, workersCount, tradePosition, experience, remarks, message, createdAt)
           VALUES (@id, @kind, @name, @phone, @email, @companyName, @projectLocation, @workersCount, @tradePosition, @experience, @remarks, @message, @createdAt)`
        )
        .run(row);
      return row;
    },
    delete: ({ where }: { where: { id: string } }) =>
      sqlite.prepare("DELETE FROM enquiries WHERE id=?").run(where.id),
  },
  record: {
    findMany: ({ take }: { take?: number; orderBy?: unknown } = {}) =>
      sqlite
        .prepare(`SELECT * FROM records ORDER BY updatedAt DESC ${take ? "LIMIT ?" : ""}`)
        .all(...(take ? [take] : [])) as RecordItem[],
    create: ({
      data,
    }: {
      data: Omit<RecordItem, "id" | "createdAt" | "updatedAt" | "dueDate">;
    }) => {
      const time = now();
      const row = { ...data, id: id(), dueDate: null, createdAt: time, updatedAt: time };
      sqlite
        .prepare(
          "INSERT INTO records VALUES (@id,@type,@title,@amount,@currency,@dueDate,@note,@status,@createdAt,@updatedAt)"
        )
        .run(row);
      return row;
    },
    update: ({ where, data }: { where: { id: string }; data: Partial<RecordItem> }) =>
      sqlite
        .prepare(
          "UPDATE records SET status=COALESCE(@status,status),note=COALESCE(@note,note),updatedAt=@updatedAt WHERE id=@id"
        )
        .run({
          id: where.id,
          status: data.status || null,
          note: data.note || null,
          updatedAt: now(),
        }),
    delete: ({ where }: { where: { id: string } }) =>
      sqlite.prepare("DELETE FROM records WHERE id=?").run(where.id),
  },
};
