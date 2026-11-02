import { isAuthed } from "@/lib/auth";
import { db } from "@/lib/db";
import { parseOperationsCommand } from "@/lib/nemotron";
import { z } from "zod";

const commandSchema = z.object({
  command: z.string().trim().min(2).max(2500),
});

export async function POST(req: Request) {
  if (!(await isAuthed())) {
    return Response.json({ error: "Authentication required to access operations desk." }, { status: 401 });
  }

  try {
    const json = await req.json();
    const { command } = commandSchema.parse(json);
    const task = await parseOperationsCommand(command);

    // If it's a job notice
    if (task.kind === "job") {
      const created = db.job.create({
        data: {
          title: task.title || "Site Work Opportunity",
          companyName: "SASHA General Contracting",
          companyLogo: "/sasha-mark.svg",
          location: task.location || "Abu Dhabi",
          salaryText: task.amount ? `${task.amount} ${task.currency}/month` : "Standard UAE site wages",
          experience: "2+ Years UAE / Gulf Site Experience",
          workType: task.workType || "Site contracting",
          description: task.description || command,
          requirements: task.requirements || "Verified documentation required before deployment.",
          status: "OPEN", // Auto-publish so it appears immediately on the public site, as requested!
        },
      });
      return Response.json({
        status: "saved",
        message: `✓ Job notice created & published: "${created.title}". It is now live on the public site.`,
        item: created,
      });
    }

    // For all records: Employment Offers, Visa Commitments, Contracts, Invoices, Bills, Expenses
    const amountInCents = task.amount !== null ? Math.round(task.amount * 100) : null;
    const created = db.record.create({
      data: {
        type: task.recordType,
        title: task.title || `${task.recordType} Draft`,
        amount: amountInCents,
        currency: task.currency || "AED",
        note: task.note || command,
        status: "DRAFT",
      },
    });

    return Response.json({
      status: "saved",
      message: `✓ ${task.recordType} created: "${created.title}" (${task.amount ? `${task.amount} ${task.currency}` : "Recorded"}). Saved in operations queue for review.`,
      item: created,
    });
  } catch (err: any) {
    return Response.json(
      { error: err?.message || "Could not process operations command. Please try again." },
      { status: 400 }
    );
  }
}
