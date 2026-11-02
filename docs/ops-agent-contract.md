# Voice operations contract

`POST /api/ops/command` requires the authenticated operations session.

Input: `{ "command": "spoken update" }` where `command` is 4-1,500 characters.

The server sends the command to the configured NVIDIA endpoint and accepts only a constrained JSON draft. It may create a `DRAFT` work notice or financial/operations record. It returns `{ status: "saved" | "review", message: string }`.

Any request to make an employment offer, visa commitment, contract, payment approval, or other legal commitment returns `review` and creates no final action. NVIDIA credentials are server-only and never return to the browser.
