# Fee The Developer (FTD) Site

## Overview

Marketing site for **Fee The Developer** — consultation-first web development services.

- Dark theme with battle-red (`#c1121f`) accent palette
- Homepage with animated launch splash
- `/special` page explaining the consultation-first approach
- All CTAs drive visitors to book a consultation via the contact form
- AI-powered concierge chat widget

---

## Tech Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS 3 + CSS custom properties |
| Runtime | Node 20+ |
| Hosting | Vercel |

---

## Design System

The site uses CSS custom properties defined in `styles/globals.css` and mapped to Tailwind utilities in `tailwind.config.ts`:

| Token | Value | Usage |
|-------|-------|-------|
| `--bg` | `#0b0b0c` | Deep charcoal page background |
| `--panel` | `#1c1c1e` | Dark graphite cards / panels |
| `--primary` | `#c1121f` | Battle-red buttons & accents |
| `--text` | `#f5f5f5` | Off-white primary text |
| `--muted` | `#a0a0a0` | Gray secondary text |
| `--border` | `#333333` | Medium gray borders |

Brand logo: `public/brand/logos/ftd-badge-red.png`

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
  layout.tsx          # Root layout (dark bg)
  page.tsx            # Homepage
  special/page.tsx    # Consultation‑First Services page
  api/                # API routes (chat, contact, health)
components/
  BrandLogo.tsx       # Logo component (ftd-badge-red.png)
  LaunchSplash.tsx    # Animated splash (once per session)
  StickyHeader.tsx    # Dark header with red CTA
  PricingSection.tsx  # Three consultation-driven pricing tiers
  ContactSection.tsx  # Contact / consultation booking form
  ChatWidget.tsx      # AI concierge chat widget
  ...
lib/
  content.ts          # All site copy, pricing data & contact info
styles/
  globals.css         # CSS custom properties & Tailwind directives
public/
  brand/logos/        # Brand assets (ftd-badge-red.png)
tailwind.config.ts    # Custom color tokens
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

- [ ] Homepage loads with dark background (`#0b0b0c`) at your Vercel URL
- [ ] Red badge logo displays in header and splash screen
- [ ] Launch splash animates once, then never blocks clicks
- [ ] Header with logo and navigation renders (dark panel with red CTA)
- [ ] Scrolling to each section works (Capabilities, Pricing, FAQ, Contact)
- [ ] `/special` page loads with "Consultation‑First Services" content
- [ ] All **"Book Consultation"** buttons (red) scroll to / link to the contact form
- [ ] Contact form submits without errors (if webhook is configured)
- [ ] Chat widget opens and responds with dark-themed UI

---

## Support

Questions? Contact [contact@feethedeveloper.com](mailto:contact@feethedeveloper.com)
