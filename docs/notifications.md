# New enquiry alerts (email and WhatsApp)

Every time someone sends the contractor requirement form, the worker application form, or applies to a
specific job:

1. the enquiry is saved to the database as before (you still see it in `/ops`),
2. an **email** alert is sent to you (once the settings below are added), and
3. the visitor is handed to **WhatsApp** with a message to the company number already written,
   so they only have to tap **Send** (no setup and no cost — see below).

Email turns on once its settings are added in Vercel
(**Project → Settings → Environment Variables**, then **redeploy**). If it is misconfigured, the enquiry
is still saved and the error appears in Vercel's logs as `[notify] email alert failed: …`.

---

## Email (about 10 minutes)

Your domain already uses Google Workspace, so the simplest route is to send from `info@sashagc.com`
using an **App Password**.

1. Sign in to the Google account for `info@sashagc.com`.
2. Turn on **2-Step Verification** (Google Account → Security), if it is not on already.
3. Go to **Google Account → Security → App passwords**, create one called "Website", and copy the
   16-character password.
   (If App passwords is missing, a Workspace admin must allow it under
   Admin console → Security → Less secure apps / App passwords.)
4. Add these variables in Vercel:

   | Name | Value |
   |---|---|
   | `SMTP_HOST` | `smtp.gmail.com` |
   | `SMTP_PORT` | `465` |
   | `SMTP_USER` | `info@sashagc.com` |
   | `SMTP_PASS` | the 16-character App Password |
   | `NOTIFY_EMAIL_TO` | where alerts should go, comma-separated |

5. Redeploy, then send a test enquiry from the website.

The email shows every detail of the enquiry, with buttons to **call**, **WhatsApp** or **email** the
person, and a link to the operations desk. Replying to the email replies to the person's email
address when they gave one.

Any other SMTP provider works the same way (for example Zoho Mail, or Resend with
`SMTP_HOST=smtp.resend.com`, `SMTP_USER=resend`, `SMTP_PASS=<API key>` after verifying the domain).

---

## WhatsApp (no setup)

After a successful submission, the confirmation shows a **Send on WhatsApp** button. It opens a chat
with the company number (`COMPANY_PHONE`, or +971 56 237 1853 by default) with the visitor's details
already typed, in the language they used on the site.

- On **phones**, WhatsApp opens automatically about a second after the confirmation appears; the visitor
  taps **Send**.
- On **computers**, the visitor clicks the button (WhatsApp Web or the desktop app opens).

The message only reaches you if the visitor sends it, which is why the email alert and `/ops` record
exist as well. When it does arrive, it comes from the visitor's own WhatsApp, so you can reply straight away.

---

## Spam protection

Both forms include a hidden field that people never see. Automated bots tend to fill it in; those
submissions are accepted silently but are not saved and do not trigger any alert.
