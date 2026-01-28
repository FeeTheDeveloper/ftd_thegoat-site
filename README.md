# FTD TheGoat Site

A clean Next.js App Router foundation using TypeScript, Tailwind CSS, and Node.js 20.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

1. Copy the example file:

```bash
cp .env.example .env.local
```

2. Fill in values as needed. The repo ships with no secrets committed.

## Vercel deployment notes

- Ensure the project uses Node.js 20 (configured in `package.json`).
- Set environment variables in the Vercel dashboard using the same keys as `.env.example`.
- Deploy with the default Next.js build settings (`npm run build`).
