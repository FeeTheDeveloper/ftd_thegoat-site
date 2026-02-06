# Fee The Developer (FTD) Site

Executive product engineering portfolio and client engagement site. Features a **$150 Website Special** promotional page at `/special`.

---

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**

---

## Local Development

**Requirements:** Node 20+

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

| Name | Required | Description |
|------|----------|-------------|
| `OPENAI_API_KEY` | Optional | OpenAI API key for the chat widget |
| `POWER_AUTOMATE_LEAD_WEBHOOK_URL` | Optional | Power Automate webhook for contact form submissions |

The site runs without these variables—features gracefully degrade when not configured.

---

## Content + Payment Link

All site content is centralized in `lib/content.ts`.

**Current payment link:** `https://square.link/u/i9Hg5rEc`

This URL powers:
- Footer "Pay Now – $150" link (`footer.links`)
- Special offer CTA button (`specialOffer.payUrl`)

To update the payment link, modify both locations in `lib/content.ts`.

---

## Branding / Logo

| Asset | Path |
|-------|------|
| Logo PNG | `public/brand/logos/ftd-logo.png` |
| Logo SVG | `public/brand/logos/ftd-logo.svg` |

The `BrandLogo` component (`components/BrandLogo.tsx`) renders the logo and is used in:
- `StickyHeader` (header logo)
- `HeroSection` (splash logo with fade-in animation)

---

## Deployment (Vercel)

### New Project Setup

1. Import this GitHub repository in Vercel
2. Configure the following settings:

| Setting | Value |
|---------|-------|
| Framework Preset | Next.js |
| Root Directory | `.` (repo root) |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Install Command | `npm install` |
| Node.js Version | 20.x |

3. Add environment variables from `.env.example` in the Vercel dashboard
4. Deploy

---

## Quality Checks

Before deploying, verify:

- [ ] `npm run build` completes without errors
- [ ] `npm run lint` passes
- [ ] Old payment link removed (search for `U8SKZ6Gr` returns 0 results)

```bash
npm run build
npm run lint
grep -r "U8SKZ6Gr" . --include="*.ts" --include="*.tsx"
```
