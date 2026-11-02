import { explainWork } from "@/lib/nemotron";
import { z } from "zod";

const schema = z.object({
  question: z.string().trim().min(2).max(1000),
  lang: z.enum(["en", "ar", "hi"]).default("en"),
});

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const { question, lang } = schema.parse(json);
    const answer = await explainWork(
      question,
      "The work is a registered building-project contracting opportunity in Abu Dhabi.",
      lang
    );
    return Response.json({ answer });
  } catch (err: any) {
    return Response.json(
      {
        answer:
          "Please verify all work terms, salary, and site location directly with the SASHA General Contracting operations office in Abu Dhabi before accepting any offer.",
      },
      { status: 200 } // Return 200 with friendly fallback rather than 400 error!
    );
  }
}
