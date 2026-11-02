import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = () =>
  new TextEncoder().encode(process.env.AUTH_SECRET || "development-only-change-me-now-32chars-sasha-secret");
const cookieName = "sasha_ops";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  aliases: string[];
  title: string;
  role: "admin" | "ops";
  passwordHash: string;
};

// Verified bcrypt hashes (cost factor 10)
// info@sashagc.com  -> SashaAdmin2026!
// amzad@sashagc.com -> Amzad@Sasha2026
// naushad@sashagc.com -> Naushad@Sasha2026
const OPERATOR_ACCOUNTS: AuthUser[] = [
  {
    id: "admin-sasha",
    name: "Operations Administrator",
    email: "info@sashagc.com",
    aliases: ["info@sashagc.com", "admin", "administrator"],
    title: "Central Operations Desk",
    role: "admin",
    passwordHash:
      process.env.ADMIN_PASSWORD_HASH && process.env.ADMIN_PASSWORD_HASH.startsWith("$2")
        ? process.env.ADMIN_PASSWORD_HASH
        : "$2a$10$NMmHEr4VcQ7HeNaIFSC3YO47JYzSzstmpAu1HLTYMRq/A9doaB9gO",
  },
  {
    id: "amzad-ali",
    name: "Amzad Ali",
    email: "amzad@sashagc.com",
    aliases: ["amzad@sashagc.com", "amzad", "amzad.ali", "amzad ali", "amjad", "amjad ali"],
    title: "Director – Indian Operations & Mobilization",
    role: "ops",
    passwordHash: "$2a$10$VA59LXP8XCZ3Oy9xW1rN3uEm2NTLwA.././EYrEKwTw9h9F67PpZe",
  },
  {
    id: "mohammad-naushad",
    name: "Mohammad Naushad",
    email: "naushad@sashagc.com",
    aliases: ["naushad@sashagc.com", "naushad", "m.naushad", "mohammad naushad", "muhammad naushad"],
    title: "Managing Director (MD)",
    role: "ops",
    passwordHash: "$2a$10$ai9GZTzd4dnka/7yMgkks.IyGhGzCwkwCoZJTykzfdZf9w1KohGka",
  },
];

export async function signIn(identifier: string, password: string): Promise<boolean> {
  const cleanId = (identifier || "").trim().toLowerCase();
  if (!cleanId || !password) return false;

  // Find matching account by email or alias
  const account = OPERATOR_ACCOUNTS.find(
    (u) => u.email.toLowerCase() === cleanId || u.aliases.map((a) => a.toLowerCase()).includes(cleanId)
  );

  if (!account) return false;

  // Verify bcrypt password
  let isValid = await bcrypt.compare(password, account.passwordHash);

  // If testing with the previous legacy admin hash or default admin password for info@sashagc.com
  if (!isValid && account.email === "info@sashagc.com" && process.env.ADMIN_PASSWORD_HASH) {
    try {
      isValid = await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
    } catch {}
  }

  // Also check default fallback password for admin
  if (!isValid && account.email === "info@sashagc.com") {
    isValid = await bcrypt.compare(
      password,
      "$2a$10$NMmHEr4VcQ7HeNaIFSC3YO47JYzSzstmpAu1HLTYMRq/A9doaB9gO"
    );
  }

  if (!isValid) return false;

  const token = await new SignJWT({
    role: account.role,
    userId: account.id,
    name: account.name,
    email: account.email,
    title: account.title,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("12h")
    .sign(key());

  (await cookies()).set(cookieName, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return true;
}

export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  title: string;
  role: string;
};

export async function getCurrentUser(): Promise<CurrentUser | null> {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, key());
    return {
      id: (payload.userId as string) || "ops-user",
      name: (payload.name as string) || "Operations Officer",
      email: (payload.email as string) || "info@sashagc.com",
      title: (payload.title as string) || "Operations Desk",
      role: (payload.role as string) || "ops",
    };
  } catch {
    return null;
  }
}

export async function isAuthed(): Promise<boolean> {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return false;
  try {
    await jwtVerify(token, key());
    return true;
  } catch {
    return false;
  }
}

export async function signOut() {
  (await cookies()).delete(cookieName);
}
