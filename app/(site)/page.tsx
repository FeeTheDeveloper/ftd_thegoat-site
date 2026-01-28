export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col gap-6 px-6 py-20">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
          Next.js App Router
        </p>
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
          FTD TheGoat is ready for Vercel.
        </h1>
        <p className="text-lg text-slate-600">
          This foundation includes TypeScript, Tailwind CSS, and a clean folder
          structure for rapid iteration.
        </p>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <h2 className="text-lg font-semibold text-slate-900">What’s included</h2>
        <ul className="mt-3 space-y-2 text-slate-600">
          <li>• App Router with a scoped route group for site pages</li>
          <li>• Ready-to-expand components, lib, motion, and styles folders</li>
          <li>• API health check at /api/health</li>
        </ul>
      </section>
    </main>
  );
}
