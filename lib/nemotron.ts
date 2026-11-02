export async function explainWork(question: string, context: string, lang: "en" | "ar" | "hi" = "en") {
  const isArabic = /[\u0600-\u06FF]/.test(question) || lang === "ar";
  const isHindi = /\b(kya|kaam|kaise|paisa|vetan|salary|chutti|visa|kitna|hoga|hai|milega|samjhao)\b/i.test(question) || lang === "hi";

  const fallbackEn = `Plain explanation: This is construction site work in Abu Dhabi. ${context} Duties, daily hours, safety gear, and official wages are confirmed in written documentation directly with SASHA General Contracting. Never pay any fee or recruitment charge to anyone.`;
  const fallbackAr = `توضيح مبسط: هذا عمل موقع بناء في أبوظبي. ${context} يتم تأكيد الواجبات وساعات العمل اليومية ومعدات السلامة والأجور الرسمية في وثائق خطية مباشرة مع شركة ساشا للمقاولات العامة. لا تدفع أي رسوم أو عمولات لأي شخص.`;
  const fallbackHi = `Aasaan bhasha mein: Yeh Abu Dhabi mein construction site ka kaam hai. ${context} Kaam ke ghante, safety equipment aur salary SASHA General Contracting ke written agreement se confirm hoti hai. Kisi ko bhi koi fees ya visa charges na dein.`;

  const fallback = isArabic ? fallbackAr : isHindi ? fallbackHi : fallbackEn;

  if (!process.env.NEMOTRON_API_KEY) return fallback;

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 6000);

    const response = await fetch(
      `${process.env.NEMOTRON_BASE_URL || "https://integrate.api.nvidia.com/v1"}/chat/completions`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.NEMOTRON_API_KEY}`,
        },
        signal: controller.signal,
        body: JSON.stringify({
          model: process.env.NEMOTRON_MODEL || "nvidia/llama-3.1-nemotron-70b-instruct",
          temperature: 0.2,
          max_tokens: 250,
          messages: [
            {
              role: "system",
              content:
                "You are an assistant for SASHA General Contracting (Abu Dhabi). Explain site work in plain, honest, reassuring language. Never give final salary or legal advice without written company terms. Reply in the same language as the user (English, Arabic, or Hinglish).",
            },
            {
              role: "user",
              content: `Context: ${context}\nQuestion: ${question}`,
            },
          ],
        }),
      }
    );
    clearTimeout(timeout);

    if (response.ok) {
      const data = await response.json();
      const content = data.choices?.[0]?.message?.content;
      if (content) return content.trim();
    }
  } catch {
    // Fall back gracefully
  }

  return fallback;
}

export type ParsedCommand = {
  kind: "job" | "record" | "offer" | "visa" | "contract" | "note";
  recordType: string;
  title: string;
  location: string;
  workType: string;
  description: string;
  requirements: string;
  amount: number | null;
  currency: string;
  note: string;
};

export async function parseOperationsCommand(command: string): Promise<ParsedCommand> {
  // First attempt NVIDIA LLM endpoint if configured
  if (process.env.NEMOTRON_API_KEY) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 6000);
      const response = await fetch(
        `${process.env.NEMOTRON_BASE_URL || "https://integrate.api.nvidia.com/v1"}/chat/completions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEMOTRON_API_KEY}`,
          },
          signal: controller.signal,
          body: JSON.stringify({
            model: process.env.NEMOTRON_MODEL || "nvidia/llama-3.1-nemotron-70b-instruct",
            temperature: 0.1,
            max_tokens: 350,
            messages: [
              {
                role: "system",
                content: `You are an automated operations parser for a UAE contracting company. Return JSON ONLY with schema:
{
  "kind": "job" | "record" | "offer" | "visa" | "contract" | "note",
  "recordType": string, // e.g. "Employment Offer", "Visa Commitment", "Subcontract Agreement", "Expense", "Invoice", "Site Job"
  "title": string,
  "location": string,
  "workType": string,
  "description": string,
  "requirements": string,
  "amount": number | null,
  "currency": "AED",
  "note": string
}`,
              },
              { role: "user", content: command },
            ],
          }),
        }
      );
      clearTimeout(timeout);

      if (response.ok) {
        const data = await response.json();
        const raw = data.choices?.[0]?.message?.content || "";
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          return {
            kind: parsed.kind || "record",
            recordType: parsed.recordType || "Operations update",
            title: parsed.title || command.slice(0, 80),
            location: parsed.location || "Abu Dhabi",
            workType: parsed.workType || "Site contracting",
            description: parsed.description || command,
            requirements: parsed.requirements || "Subject to final management verification.",
            amount: typeof parsed.amount === "number" ? parsed.amount : null,
            currency: parsed.currency || "AED",
            note: parsed.note || command,
          };
        }
      }
    } catch {
      // Continue to intelligent local parser
    }
  }

  // Intelligent local NLP parser for voice & spoken commands
  const lower = command.toLowerCase();

  // Extract monetary amounts (e.g. "5000 aed", "12,000 dhs", "aed 3500", "500 dirhams")
  const amountMatch = command.match(/(?:aed|dhs|dirhams?|inr|rs\.?|\$)\s*([\d,]+(?:\.\d+)?)|([\d,]+(?:\.\d+)?)\s*(?:aed|dhs|dirhams?|inr|rs\.?|\$)/i);
  let amount: number | null = null;
  if (amountMatch) {
    const rawVal = (amountMatch[1] || amountMatch[2]).replace(/,/g, "");
    amount = parseFloat(rawVal) || null;
  } else {
    const rawNum = command.match(/\b\d{3,7}\b/);
    if (rawNum) amount = parseFloat(rawNum[0]) || null;
  }

  // Check for Employment Offer
  if (lower.includes("offer") || lower.includes("employment") || lower.includes("hire") || lower.includes("joining") || lower.includes("appointment")) {
    return {
      kind: "offer",
      recordType: "Employment Offer",
      title: extractTitle(command, "Draft Employment Offer"),
      location: "Abu Dhabi",
      workType: "Workforce",
      description: `Draft offer for candidate based on spoken instruction: "${command}"`,
      requirements: "Verify passport copy, attested qualifications, medical clearance, and signed acceptance.",
      amount: amount,
      currency: "AED",
      note: command,
    };
  }

  // Check for Visa Commitment / Quota
  if (lower.includes("visa") || lower.includes("quota") || lower.includes("labour card") || lower.includes("immigration") || lower.includes("entry permit")) {
    return {
      kind: "visa",
      recordType: "Visa Commitment",
      title: extractTitle(command, "Visa Allocation & Processing Request"),
      location: "Abu Dhabi",
      workType: "Visa & HR Services",
      description: `Visa processing allocation: "${command}"`,
      requirements: "MOHRE quota approval, medical insurance, Emirates ID registration.",
      amount: amount,
      currency: "AED",
      note: command,
    };
  }

  // Check for Contract / Subcontract
  if (lower.includes("contract") || lower.includes("agreement") || lower.includes("subcontract") || lower.includes("scope") || lower.includes("tender")) {
    return {
      kind: "contract",
      recordType: "Contract Agreement",
      title: extractTitle(command, "Subcontract / Project Agreement"),
      location: "Abu Dhabi",
      workType: "Contracting Scope",
      description: `Contract commitment draft: "${command}"`,
      requirements: "Commercial terms, bill of quantities, payment schedule, and site insurance.",
      amount: amount,
      currency: "AED",
      note: command,
    };
  }

  // Check for Site Job Notice first (even if salary amount is mentioned)
  if (lower.includes("job") || lower.includes("vacancy") || lower.includes("opening") || lower.includes("hiring") || lower.includes("hire") || lower.includes("mason") || lower.includes("carpenter") || lower.includes("helper") || lower.includes("electrician") || lower.includes("plumber") || lower.includes("steel") || lower.includes("welder")) {
    return {
      kind: "job",
      recordType: "Site Work Notice",
      title: extractTitle(command, "Site Work Opportunity"),
      location: lower.includes("dubai") ? (lower.includes("abu dhabi") ? "Abu Dhabi" : "Dubai") : "Abu Dhabi",
      workType: lower.includes("mason") ? "Masonry" : lower.includes("steel") ? "Steel fixing" : lower.includes("carpenter") ? "Carpentry" : lower.includes("helper") ? "General site support" : "Site contracting",
      description: command,
      requirements: "Practical site experience and valid UAE entry/work authorization.",
      amount: amount,
      currency: "AED",
      note: command,
    };
  }

  // Check for Financial: Bill, Expense, Invoice, Payment
  if (lower.includes("bill") || lower.includes("expense") || lower.includes("invoice") || lower.includes("payment") || lower.includes("paid") || lower.includes("cost") || lower.includes("purchase") || amount !== null) {
    return {
      kind: "job",
      recordType: "Site Work Notice",
      title: extractTitle(command, "Site Work Opportunity"),
      location: "Abu Dhabi",
      workType: lower.includes("mason") ? "Masonry" : lower.includes("steel") ? "Steel fixing" : lower.includes("carpenter") ? "Carpentry" : lower.includes("helper") ? "General site support" : "Site contracting",
      description: command,
      requirements: "Practical site experience and valid UAE entry/work authorization.",
      amount: amount,
      currency: "AED",
      note: command,
    };
  }

  // Default to general operations note
  return {
    kind: "note",
    recordType: "Operations Note",
    title: extractTitle(command, "Spoken Operations Update"),
    location: "Abu Dhabi",
    workType: "General Management",
    description: command,
    requirements: "Recorded by Operations Voice Desk.",
    amount: null,
    currency: "AED",
    note: command,
  };
}

function extractTitle(text: string, defaultTitle: string): string {
  const clean = text.replace(/^(create|add|draft|new|log|please|make|record)\s+(an?|the)?\s*/i, "").trim();
  if (clean.length > 5) {
    const firstSentence = clean.split(/[.?!]/)[0];
    return firstSentence.charAt(0).toUpperCase() + firstSentence.slice(1, 80);
  }
  return defaultTitle;
}
