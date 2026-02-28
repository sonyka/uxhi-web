# Mailchimp Integration for Form Submissions

## Current State

All 3 forms currently save to:
- **Sanity CMS** — full document with all fields
- **Slack** — notification with key details

| Form | Server Action | Collects Email |
|------|--------------|----------------|
| Directory Submission (`/find-ux-pro`) | `lib/actions/directory-submit.ts` | No |
| Membership (`/join`) | `lib/actions/membership.ts` | Yes |
| Inquiry (`/about#contact`) | `lib/actions/inquiry.ts` | Yes |

## Why Mailchimp API Direct (not Google Sheets)

- **Sanity → Google Sheets** requires either a Google Cloud service account or a paid service like Zapier ($20+/mo)
- **Mailchimp API** is a simple REST endpoint — no extra dependencies, no additional accounts beyond Mailchimp itself
- Subscribers are tagged by source form for segmentation in Mailchimp

## Setup Steps

### 1. Get Mailchimp API Key

- Log into Mailchimp → Account & Billing → Extras → **API keys**
- Create a new key, copy it (looks like `abc123def456-us21`)
- The suffix (e.g., `us21`) is your data center

### 2. Get Audience (List) ID

- Go to Audience → Settings → Audience name and defaults
- Copy the **Audience ID** (looks like `a1b2c3d4e5`)

### 3. Add Environment Variables

Add to Vercel project settings (and `.env.local` for local dev):

```
MAILCHIMP_API_KEY=your-api-key-us21
MAILCHIMP_AUDIENCE_ID=a1b2c3d4e5
MAILCHIMP_SERVER=us21
```

### 4. Code Changes

- Add `web/src/lib/mailchimp.ts` — helper that calls Mailchimp Marketing API to add/update subscribers
- Update **Membership** and **Inquiry** server actions to call it after Sanity save (these forms collect email; Directory does not)
- Tag subscribers by source form (`membership`, `inquiry`) for segmentation
- Use "pending" status for double opt-in, or "subscribed" for direct add
- No npm package needed — Mailchimp API is simple `fetch()` calls

### 5. API Endpoint Reference

```
PUT https://{server}.api.mailchimp.com/3.0/lists/{audience_id}/members/{subscriber_hash}
```

- `subscriber_hash` = MD5 hash of lowercase email
- Auth: Basic auth with `apikey:{api_key}`
- Using PUT (add or update) prevents duplicate subscriber errors

### Example Payload

```json
{
  "email_address": "user@example.com",
  "status_if_new": "pending",
  "merge_fields": {
    "FNAME": "First",
    "LNAME": "Last"
  },
  "tags": ["membership"]
}
```

---

## Alternative: Sanity → Google Sheets (Manual Export)

A manual pipeline for exporting form submissions from Sanity to Google Sheets. No Google Cloud account or paid services required — just Sanity Vision and copy/paste.

### How It Works

Sanity Studio includes **Vision** (a GROQ query tool) at `/studio/vision`. You can run queries to pull all submissions, then copy the results into a spreadsheet.

### GROQ Queries

**Membership applications:**
```groq
*[_type == "membershipApplication"] | order(_createdAt desc) {
  firstName,
  lastName,
  email,
  linkedinOrWebsite,
  experienceLevel,
  hopes,
  contributions,
  heardAboutUs,
  status,
  _createdAt
}
```

**Contact inquiries:**
```groq
*[_type == "submission"] | order(_createdAt desc) {
  firstName,
  lastName,
  email,
  role,
  companyName,
  interestType,
  message,
  status,
  _createdAt
}
```

**Directory submissions:**
```groq
*[_type == "directoryMember"] | order(_createdAt desc) {
  firstName,
  lastName,
  jobTitle,
  location,
  experienceLevel,
  focus,
  industries,
  linkedinUrl,
  portfolioUrl,
  openToWork,
  _createdAt
}
```

### Export Steps

1. Open Sanity Studio → Vision (`/studio/vision`)
2. Run the GROQ query for the form type you need
3. Copy the JSON results
4. Go to Google Sheets → paste into a new sheet, or use a [JSON to CSV converter](https://csvjson.com/json2csv) first
5. Import the CSV into Google Sheets

### Automating with a Script (Optional)

A Node script can be added to the project to export directly to CSV:

```bash
# From /web directory
npx sanity documents query '*[_type == "membershipApplication"]{firstName,lastName,email,_createdAt}' --dataset production
```

This outputs JSON to stdout which can be piped to a file or CSV converter.

### Limitations

- **Manual process** — must be run each time you want fresh data
- **No real-time sync** — new submissions won't appear until the next export
- **No deduplication** — exporting twice will include previously exported rows
- For automated sync, consider Zapier ($20+/mo) or setting up a Google Cloud service account

## Notes

- Directory form does not collect email — only Membership and Inquiry forms will sync to Mailchimp
- Mailchimp integration should fail silently (like Slack) so form submission still succeeds if Mailchimp is down
- Rate limiting already exists on all forms (1 submission per email per hour)
