"use server";

import { db } from "@/lib/db";
import { isAuthed, signOut } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

async function guard() {
  if (!(await isAuthed())) redirect("/ops/login");
}

export async function createJob(f: FormData) {
  await guard();
  const title = String(f.get("title") || "").trim();
  if (!title) return;

  await db.job.create({
    data: {
      title,
      companyName: String(f.get("companyName") || "SASHA General Contracting").trim(),
      companyLogo: String(f.get("companyLogo") || "/sasha-mark.svg").trim(),
      location: String(f.get("location") || "Abu Dhabi").trim(),
      salaryText: String(f.get("salaryText") || "Standard UAE Site Wages").trim(),
      experience: String(f.get("experience") || "2+ Years UAE/Gulf Site Experience").trim(),
      workType: String(f.get("workType") || "Site contracting").trim(),
      description: String(f.get("description") || `Active site recruitment for ${title} in Abu Dhabi.`).trim(),
      requirements: String(f.get("requirements") || "Valid passport and UAE entry/work authorization.").trim(),
      status: "OPEN",
    },
  });
  revalidatePath("/");
  revalidatePath("/ops");
}

export async function closeJob(id: string) {
  await guard();
  await db.job.update({ where: { id }, data: { status: "CLOSED" } });
  revalidatePath("/");
  revalidatePath("/ops");
}

export async function openJob(id: string) {
  await guard();
  await db.job.update({ where: { id }, data: { status: "OPEN" } });
  revalidatePath("/");
  revalidatePath("/ops");
}

export async function deleteJob(id: string) {
  await guard();
  await db.job.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/ops");
}

export async function createRecord(f: FormData) {
  await guard();
  const rawAmount = String(f.get("amount") || "");
  const amount = rawAmount ? Math.round(Number(rawAmount) * 100) : null;
  await db.record.create({
    data: {
      type: String(f.get("type") || "Operations note"),
      title: String(f.get("title")),
      amount,
      currency: String(f.get("currency") || "AED"),
      note: String(f.get("note") || ""),
      status: "DRAFT",
    },
  });
  revalidatePath("/ops");
}

export async function approveRecord(id: string) {
  await guard();
  await db.record.update({ where: { id }, data: { status: "APPROVED" } });
  revalidatePath("/ops");
}

export async function deleteRecord(id: string) {
  await guard();
  await db.record.delete({ where: { id } });
  revalidatePath("/ops");
}

export async function deleteEnquiry(id: string) {
  await guard();
  await db.enquiry.delete({ where: { id } });
  revalidatePath("/ops");
}

export async function logout() {
  await signOut();
  redirect("/ops/login");
}
