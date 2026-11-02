import { db } from "../lib/db";
async function main() {
  if (db.job.findMany().length) return;
  db.job.create({
    data: {
      title: "Construction helper",
      companyName: "SASHA General Contracting",
      companyLogo: "/sasha-mark.svg",
      location: "Abu Dhabi",
      salaryText: "1,600 AED/month + OT",
      experience: "1+ Year General Site Experience",
      workType: "Site support",
      description: "Support the site team with general material handling and clean-up.",
      requirements: "Fit for physical site work. Valid documents. Final terms confirmed on official contract.",
      status: "OPEN",
    },
  });
  db.job.create({
    data: {
      title: "Mason",
      companyName: "SASHA General Contracting",
      companyLogo: "/sasha-mark.svg",
      location: "Abu Dhabi",
      salaryText: "2,200 AED/month",
      experience: "2+ Years GCC Construction",
      workType: "Finishing work",
      description: "Assist with blockwork, plaster, and related site tasks under a supervisor.",
      requirements: "Relevant practical experience. Blueprint comprehension. Final terms confirmed on official contract.",
      status: "OPEN",
    },
  });
}
main();
