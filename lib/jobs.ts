import type { Job } from "@/lib/db";
import type { JobLite } from "@/components/site/Forms";

/** Plain, serialisable job shape for client components. */
export function toJobLite(j: Job): JobLite {
  return {
    id: j.id,
    title: j.title,
    companyName: j.companyName,
    location: j.location,
    salaryText: j.salaryText,
    experience: j.experience,
    workType: j.workType,
    description: j.description,
    requirements: j.requirements,
    createdAt: new Date(j.createdAt).toISOString(),
  };
}
