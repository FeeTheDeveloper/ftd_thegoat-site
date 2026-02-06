/**
 * PAYMENT URL VERIFICATION CHECKLIST:
 * - [x] SquarePayButton component uses https://square.link/u/i9Hg5rEc?src=embed
 * - [x] footer "Pay Now – $150" link matches https://square.link/u/i9Hg5rEc
 */

export const siteContent = {
  brand: {
    logos: {
      png: '/brand/logos/ftd-logo.png',
      svg: '/brand/logos/ftd-logo.svg',
    },
  },
  site: {
    name: 'Fee The Developer',
    title: 'Fee The Developer | Executive Product Engineering',
    description:
      'Fee The Developer delivers executive-level product engineering, automation, and AI systems for teams that want inevitability, not noise.',
    primaryCta: {
      label: 'Request Access',
      href: '#contact',
    },
    nav: [
      { label: 'Capabilities', href: '#services' },
      { label: 'Operating System', href: '#process' },
      { label: 'Proof', href: '#portfolio' },
      { label: 'Engagements', href: '#pricing' },
      { label: 'Standards', href: '#faq' },
      { label: 'Contact', href: '#contact' },
      { label: '$150 Website Special', href: '/special' },
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
    title: 'Engagement models',
    subtitle:
      'Structured engagement paths designed for decisive execution.',
    tiers: [
      {
        name: 'Strategic Sprint',
        price: 'From $5,000',
        cadence: 'per engagement',
        description: 'Focused delivery for a single high-impact outcome.',
        features: [
          '1-2 week execution window',
          'Executive updates and decision logs',
          'Launch-ready handoff package',
        ],
        cta: { label: 'Start an Engagement', href: '#contact' },
      },
      {
        name: 'Operating Partner',
        price: 'From $9,000',
        cadence: 'per month',
        description: 'Embedded execution for teams shipping continuous value.',
        features: [
          'Dedicated sprint cadence',
          'Weekly executive briefings',
          'Priority delivery and stability work',
        ],
        cta: { label: 'Engage', href: '#contact' },
      },
      {
        name: 'Transformation',
        price: 'Custom',
        cadence: 'retainer',
        description: 'Multi-team initiatives and platform-level modernization.',
        features: [
          'Cross-functional alignment',
          'Security, compliance, and governance',
          'Custom SLAs and rollout plans',
        ],
        cta: { label: 'Request Access', href: '#contact' },
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
    title: 'Engagement request',
    subtitle:
      'Share the outcome you need. Responses are typically delivered within two business days.',
    form: {
      title: 'Request access',
      description:
        'Provide the essentials. A short response with next steps will follow.',
      buttonLabel: 'Request Access',
    },
    methods: [
      {
        label: 'Direct line',
        value: 'fee@feethedeveloper.com',
        href: 'mailto:fee@feethedeveloper.com',
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
      { label: 'Pay Now – $150', href: 'https://square.link/u/i9Hg5rEc' },
    ],
    copyright: '© 2024 Fee The Developer. All rights reserved.',
  },
  specialOffer: {
    title: '$150 Website Special',
    subtitle: 'Top 10 Yelp Dallas Celebration',
    description:
      'Complete website design, 2‑year hosting, and domain registration for a single $150 fee. Limited-time offer.',
    bulletPoints: [
      'Custom website design (1–3 pages)',
      '2 years of hosting included',
      '2 years of domain registration included',
      'Mobile responsive & optimized',
    ],
    payButtonLabel: 'Pay Now – $150',
  },
};

export type SiteContent = typeof siteContent;
