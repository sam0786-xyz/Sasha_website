import { db } from "@/lib/db";
export async function GET(){return Response.json(await db.job.findMany({where:{status:"OPEN"},orderBy:{updatedAt:"desc"}}),{headers:{"Cache-Control":"no-store"}})}
