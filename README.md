# Fee The Developer (FTD) Site

## Overview

Marketing site for **Fee The Developer** — consultation-first web development services.

- Homepage with animated launch splash
- `/special` page explaining the consultation-first approach
- All CTAs drive visitors to book a consultation via the contact form

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS 3 |
| Runtime | Node 20+ |
| Hosting | Vercel |

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Production build check:

```bash
npm run build && npm start
```

---

## Project Structure (key files)

```
app/
  layout.tsx          # Root layout
  page.tsx            # Homepage
  special/page.tsx    # Consultation‑First Services page
  api/                # API routes (chat, contact, health)
components/
  LaunchSplash.tsx    # Animated splash (once per session)
  PricingSection.tsx  # Three consultation-driven pricing tiers
  ContactSection.tsx  # Contact / consultation booking form
  ...
lib/
  content.ts          # All site copy & pricing data
public/
  brand/logos/        # Brand assets
vercel.json           # Vercel framework hint
```

---

## Pricing Model

Packages are consultation-driven and scope-dependent:

| Tier | Starting Price | Description |
|------|---------------|-------------|
| Starter Site | From $150 | 1–3 page landing page or microsite |
| Growth Site | From $500 | Up to 5 pages with basic CMS |
| Premium Web Package | From $2,500 | Unlimited pages & advanced integrations |

All CTAs link to `#contact` to book a consultation.

---

## Deploying to Vercel

### Prerequisites

- A [Vercel](https://vercel.com) account (free tier works)
- This repo pushed to GitHub (or GitLab / Bitbucket)

### Step-by-Step

1. **Import project** — Go to [vercel.com/new](https://vercel.com/new) → Import this GitHub repository.
2. **Framework preset** — Vercel auto-detects **Next.js**. No changes needed.
3. **Project settings** — Confirm or set the following:

   | Setting | Value |
   |---------|-------|
   | Framework Preset | **Next.js** (auto-detected) |
   | Root Directory | `.` (repo root) |
   | Build Command | `npm run build` |
   | Output Directory | `.next` (default) |
   | Install Command | `npm install` |
   | Node.js Version | **20.x** |

4. **Environment variables** (optional) — Only needed if you use the chat or contact API routes:

   | Variable | Purpose |
   |----------|---------|
   | `OPENAI_API_KEY` | Powers the AI chat widget |
   | `POWER_AUTOMATE_LEAD_WEBHOOK_URL` | Sends contact form submissions to Power Automate |

5. **Deploy** — Click **Deploy** and wait ~1-2 minutes for the build.
6. **Custom domain** (optional) — In **Settings → Domains**, add your domain and update DNS as directed.

### Redeployments

Every push to the `main` branch triggers an automatic production deployment. Preview deployments are created for pull requests.

---

## Smoke Test Checklist

After each deployment, verify:

- [ ] Homepage loads at your Vercel URL
- [ ] Launch splash animates once, then never blocks clicks
- [ ] Header with logo and navigation renders
- [ ] Scrolling to each section works (Capabilities, Pricing, FAQ, Contact)
- [ ] `/special` page loads with "Consultation‑First Services" content
- [ ] All **"Book Consultation"** buttons scroll to / link to the contact form
- [ ] Contact form submits without errors (if webhook is configured)

---

## Support

Questions? Contact [fee@feethedeveloper.com](mailto:fee@feethedeveloper.com)
