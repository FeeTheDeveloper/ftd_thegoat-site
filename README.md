# Fee The Developer (FTD) Site

## Overview

Marketing site for Fee The Developer — executive product engineering services.

- Homepage with animated launch splash
- `/special` page for the $150 Website Special offer
- Square embedded checkout button (opens in popup)

---

## Tech

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Node 20+**

---

## Local Run (Codespace)

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Build check:

```bash
npm run build
```

---

## Assets

| Asset | Location |
|-------|----------|
| Logo PNG | `public/brand/logos/ftd-logo.png` |

The `LaunchSplash` component uses `BrandLogo` to display a full-screen animated logo on first page load (once per session).

---

## Payment Checkout

Payment is handled by the `SquarePayButton` component (`components/SquarePayButton.tsx`).

- Opens Square checkout in a centered popup window
- No backend or API required

**Checkout URL:**

```
https://square.link/u/5dvy3O3D?src=embed
```

---

## Vercel Deployment (New Project)

### Step-by-Step Checklist

1. [ ] Go to [vercel.com](https://vercel.com) and sign in
2. [ ] Click **Add New → Project**
3. [ ] Import this GitHub repository
4. [ ] Configure project settings:

| Setting | Value |
|---------|-------|
| Framework Preset | **Next.js** |
| Root Directory | `.` (repo root) |
| Install Command | `npm install` |
| Build Command | `npm run build` |
| Output Directory | `.next` |
| Node.js Version | **20.x** |

5. [ ] (Optional) Add environment variables if using chat/contact features:
   - `OPENAI_API_KEY`
   - `POWER_AUTOMATE_LEAD_WEBHOOK_URL`
6. [ ] Click **Deploy**
7. [ ] Wait for build to complete (~1-2 minutes)

---

## Smoke Test Checklist

After deployment, verify:

- [ ] Homepage loads at your Vercel URL
- [ ] Launch splash appears once (then not again in same session)
- [ ] Header with logo and navigation renders
- [ ] `/special` page opens and displays the offer
- [ ] "Pay Now – $150" button opens Square checkout popup

---

## Support

Questions? Contact [fee@feethedeveloper.com](mailto:fee@feethedeveloper.com)
