export const siteContent = {
  site: {
    name: 'Fee The Developer',
    title: 'Fee The Developer | Developer for Hire',
    description:
      'Fee The Developer helps product teams ship reliable web experiences, automation, and AI-powered workflows with clear communication and predictable delivery.',
    primaryCta: {
      label: 'Hire Me',
      href: '#contact',
    },
    secondaryCta: {
      label: 'View Work',
      href: '#portfolio',
    },
    nav: [
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'Portfolio', href: '#portfolio' },
      { label: 'Pricing', href: '#pricing' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  hero: {
    eyebrow: 'Developer for hire',
    heading: 'Build calm, scalable web experiences with Fee The Developer.',
    subheading:
      'Senior frontend engineering for startups and product teams that need a reliable partner for web apps, APIs, automation, motion, and AI workflows.',
    highlights: [
      'Product-minded delivery with clear weekly updates',
      'Modern stacks: Next.js, TypeScript, Tailwind, Node',
      'Launch-ready handoff with documentation and support',
    ],
  },
  services: {
    title: 'Services that remove delivery risk',
    subtitle:
      'From rapid MVPs to long-term product growth, every engagement is scoped to protect quality and timelines.',
    items: [
      {
        title: 'Web Development',
        description:
          'Responsive, accessible web apps that convert. Built with maintainable design systems and production-ready code.',
      },
      {
        title: 'APIs & Integrations',
        description:
          'Reliable backend endpoints, third-party integrations, and secure data flows that power your product.',
      },
      {
        title: 'Automation',
        description:
          'Workflow automation that saves your team hours each week, from dashboards to internal tools.',
      },
      {
        title: 'Motion & Interaction',
        description:
          'Subtle, professional motion design that improves clarity without overwhelming the user experience.',
      },
      {
        title: 'Applied AI',
        description:
          'Practical AI features like summarization, search, and workflow assistants that ship responsibly.',
      },
    ],
  },
  process: {
    title: 'A transparent delivery process',
    subtitle:
      'You always know what is happening, what is next, and how each milestone ladders to business results.',
    stepLabel: 'Step',
    steps: [
      {
        title: 'Discovery',
        description:
          'Clarify goals, assess the current stack, and map the highest-impact deliverables with realistic timelines.',
      },
      {
        title: 'Build',
        description:
          'Execute in focused sprints with weekly demos, shared documentation, and quality checks built in.',
      },
      {
        title: 'Deploy',
        description:
          'Launch with confidence, monitoring, and a handoff plan so your team is never left guessing.',
      },
    ],
  },
  portfolio: {
    title: 'Proof of work',
    subtitle:
      'Recent engagements and outcomes. Detailed case studies available on request.',
    items: [
      {
        title: 'SaaS onboarding redesign',
        description:
          'Reduced onboarding time by 35% through a streamlined UX and guided product tour.',
        tags: ['Next.js', 'Product UX', 'Conversion'],
      },
      {
        title: 'Internal operations dashboard',
        description:
          'Automated reporting for a logistics team, saving 12+ hours per week.',
        tags: ['Automation', 'APIs', 'Data'],
      },
      {
        title: 'AI content workflow',
        description:
          'Implemented a safe AI pipeline for content review and approval with human oversight.',
        tags: ['AI', 'Workflow', 'Governance'],
      },
    ],
  },
  pricing: {
    title: 'Flexible pricing for every stage',
    subtitle:
      'Clear scope, transparent rates, and predictable delivery. Custom retainers available.',
    tiers: [
      {
        name: 'Starter',
        price: '$3,500',
        cadence: 'per project',
        description: 'Best for landing pages, MVPs, and small updates.',
        features: [
          '2-week delivery window',
          'Focused scope with rapid iteration',
          'Email support and handoff docs',
        ],
        cta: { label: 'Start a project', href: '#contact' },
      },
      {
        name: 'Growth',
        price: '$6,500',
        cadence: 'per month',
        description: 'For teams that need ongoing product development.',
        features: [
          'Dedicated sprint planning',
          'Weekly demos and reporting',
          'Priority bug fixes and improvements',
        ],
        cta: { label: 'Book a call', href: '#contact' },
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        cadence: 'retainer',
        description: 'Flexible support for larger teams and complex systems.',
        features: [
          'Multi-team collaboration',
          'Security and compliance alignment',
          'Custom SLAs and rollout planning',
        ],
        cta: { label: 'Request a proposal', href: '#contact' },
      },
    ],
  },
  faq: {
    title: 'FAQ',
    items: [
      {
        question: 'How quickly can we start?',
        answer:
          'Most engagements kick off within two weeks after scope approval and contract signature.',
      },
      {
        question: 'Do you work with existing teams?',
        answer:
          'Yes. I regularly embed with product, design, and engineering teams to deliver alongside them.',
      },
      {
        question: 'What do you need from us?',
        answer:
          'Access to current assets, a point of contact, and clear outcomes. I handle the rest.',
      },
    ],
  },
  contact: {
    title: 'Ready to build with Fee The Developer?',
    subtitle:
      'Share your goals and timeline. You will receive a response within two business days.',
    methods: [
      {
        label: 'Email',
        value: 'hello@feethedeveloper.com',
        href: 'mailto:hello@feethedeveloper.com',
      },
      {
        label: 'Discovery call',
        value: 'Schedule a 30-minute intro',
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
      'Fee The Developer partners with modern product teams to deliver calm, reliable software.',
    links: [
      { label: 'LinkedIn', href: '#' },
      { label: 'GitHub', href: '#' },
      { label: 'Calendly', href: '#' },
    ],
    copyright: '© 2024 Fee The Developer. All rights reserved.',
  },
};

export type SiteContent = typeof siteContent;
