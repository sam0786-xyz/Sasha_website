import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(5).max(40),
  email: z.string().email().optional().or(z.literal("")),
  kind: z.string().max(80).default("Employer Project Requirement"),
  companyName: z.string().trim().max(120).optional().or(z.literal("")),
  projectLocation: z.string().trim().max(120).optional().or(z.literal("")),
  workersCount: z.string().trim().max(50).optional().or(z.literal("")),
  tradePosition: z.string().trim().max(100).optional().or(z.literal("")),
  experience: z.string().trim().max(100).optional().or(z.literal("")),
  remarks: z.string().trim().max(2500).optional().or(z.literal("")),
  message: z.string().trim().min(5).max(4000),
});

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const data = schema.parse(raw);

    await db.enquiry.create({
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
    });

    return Response.json({ ok: true }, { status: 201 });
  } catch (err: any) {
    return Response.json(
      { error: err?.message || "Please check the information and try again." },
      { status: 400 }
    );
  }
}
