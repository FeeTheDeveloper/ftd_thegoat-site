export const siteContent = {
  brand: {
    name: 'Fee The Developer',
    logos: {
      png: '/brand/logos/ftd-badge-red.png',
      svg: '/brand/logos/ftd-badge-red.png',
    },
  },
  site: {
    name: 'Fee The Developer',
    title: 'Fee The Developer | Executive Product Engineering',
    description:
      'Fee The Developer delivers executive-level product engineering, automation, and AI systems for teams that want inevitability, not noise.',
    primaryCta: {
      label: 'Book Consultation',
      href: '#contact',
    },
    nav: [
      { label: 'Capabilities', href: '#services' },
      { label: 'Operating System', href: '#process' },
      { label: 'Proof', href: '#portfolio' },
      { label: 'Engagements', href: '#pricing' },
      { label: 'Standards', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  hero: {
    eyebrow: 'Executive product engineering',
    heading: 'Operate with inevitability. Ship with precision.',
    subheading:
      'Fee The Developer is a senior product engineering partner for teams that need decisive execution across web platforms, automation, and AI systems.',
    highlights: [
      'High-stakes delivery with executive clarity',
      'Modern product systems built to scale quietly',
      'Measured rollouts with airtight handoff',
    ],
  },
  services: {
    title: 'Capabilities that make progress inevitable',
    subtitle:
      'Precision execution across critical product systems, engineered for speed, stability, and leverage.',
    items: [
      {
        title: 'Product Platforms',
        description:
          'High-performance web experiences with resilient architecture, design systems, and conversion discipline.',
      },
      {
        title: 'Systems & Integrations',
        description:
          'API layers, data flows, and partner integrations that keep revenue and operations stable.',
      },
      {
        title: 'Operational Automation',
        description:
          'Workflow automation and internal tooling that compress cycles and remove coordination drag.',
      },
      {
        title: 'Experience Engineering',
        description:
          'Interaction systems and motion polish that make complex products feel inevitable.',
      },
      {
        title: 'Applied AI',
        description:
          'Human-in-the-loop AI features, governance, and automation that ship responsibly.',
      },
    ],
  },
  process: {
    title: 'The operating system',
    subtitle:
      'An execution cadence built for clarity, velocity, and compound results.',
    stepLabel: 'Layer',
    steps: [
      {
        title: 'Signal',
        description:
          'Diagnose constraints, define the target state, and lock on to the leverage points.',
      },
      {
        title: 'System',
        description:
          'Build the core system with tight sprints, executive updates, and quality gates.',
      },
      {
        title: 'Scale',
        description:
          'Release with instrumentation, stability playbooks, and a clean operational handoff.',
      },
    ],
  },
  portfolio: {
    title: 'Proof of outcomes',
    subtitle:
      'Results backed by standards: speed, stability, security, and executive-grade communication.',
    items: [
      {
        title: 'Revenue onboarding acceleration',
        description:
          'Cut activation time by 35% while increasing trial-to-paid conversion through systemized onboarding.',
        tags: ['Activation', 'Lifecycle', 'Conversion'],
      },
      {
        title: 'Operational visibility layer',
        description:
          'Automated reporting and QA workflows that saved 12+ hours weekly and eliminated data drift.',
        tags: ['Operations', 'Automation', 'Data'],
      },
      {
        title: 'AI governance pipeline',
        description:
          'Implemented human-in-the-loop AI review with audit trails and policy-grade guardrails.',
        tags: ['AI', 'Governance', 'Reliability'],
      },
    ],
  },
  pricing: {
    title: 'Custom packages built around your goals',
    subtitle:
      'Every site begins with a consultation. Pricing below reflects starting points, including hosting and domain.',
    tiers: [
      {
        name: 'Starter Site',
        price: 'From $150',
        cadence: 'one-time',
        description: 'Basic landing page or microsite. Perfect for event pages, portfolios, and single-product pages.',
        features: [
          '1–3 pages custom design',
          '1 year of hosting & domain included',
          'Responsive on mobile & desktop',
        ],
        cta: { label: 'Book Consultation', href: '#contact' },
      },
      {
        name: 'Growth Site',
        price: 'From $500',
        cadence: 'one-time',
        description: 'A small business website with up to 5 pages, light CMS integration, and extended hosting.',
        features: [
          'Up to 5 pages and basic CMS',
          '2 years of hosting & domain included',
          'Newsletter signup or contact form',
        ],
        cta: { label: 'Book Consultation', href: '#contact' },
      },
      {
        name: 'Premium Web Package',
        price: 'From $2,500',
        cadence: 'one-time',
        description: 'High‑end custom site with advanced integrations. Best for larger businesses or projects needing extra polish.',
        features: [
          'Unlimited pages & advanced integrations',
          'Bespoke design system & animations',
          'Priority support & strategy sessions',
        ],
        cta: { label: 'Book Consultation', href: '#contact' },
      },
    ],
  },
  faq: {
    title: 'Standards',
    items: [
      {
        question: 'How quickly can we start?',
        answer:
          'Most engagements begin within two weeks once scope and access are confirmed.',
      },
      {
        question: 'Do you work with existing teams?',
        answer:
          'Yes. I embed with product, design, and engineering teams while owning outcomes.',
      },
      {
        question: 'What do you need from us?',
        answer:
          'Access to current systems, a single decision-maker, and clear outcomes.',
      },
    ],
  },
  contact: {
    title: 'Book a consultation',
    subtitle:
      'Share the outcome you need. Responses are typically delivered within two business days.',
    form: {
      title: 'Book a consultation',
      description:
        'Provide the essentials. A short response with next steps will follow.',
      buttonLabel: 'Book Consultation',
    },
    methods: [
      {
        label: 'Direct line',
        value: 'contact@feethedeveloper.com',
        href: 'mailto:contact@feethedeveloper.com',
      },
      {
        label: 'Engagement window',
        value: 'Next opening in 2 weeks',
        href: '#',
      },
      {
        label: 'Location',
        value: 'Remote · North America',
      },
    ],
  },
  footer: {
    summary:
      'Fee The Developer partners with modern product teams to deliver inevitable software outcomes.',
    links: [
      { label: 'LinkedIn', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Calendly', href: '#' },
    ],
    copyright: '© 2024 Fee The Developer. All rights reserved.',
  },
};

export type SiteContent = typeof siteContent;
