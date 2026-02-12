import { CourseStatus } from 'src/database/entities/course.entity';

export interface CourseSeed {
  name: string;
  description: string;
  year: number;
  status: CourseStatus;
  category_id?: number;
}

export interface CategorySeed {
  name: string;
  courses: CourseSeed[];
}

export const categorySeeds: CategorySeed[] = [
  {
    name: 'Programming',
    courses: [
      {
        name: 'NestJS Fundamentals',
        description:
          'REST API, modules, providers, guards, and TypeORM basics.',
        year: 2024,
        status: CourseStatus.OPEN,
      },
      {
        name: 'Advanced TypeScript',
        description:
          'Generics, decorators, utility types, and patterns for large codebases.',
        year: 2023,
        status: CourseStatus.OPEN,
      },
      {
        name: 'Node.js Patterns',
        description:
          'Event loop, clustering, worker threads, and production patterns.',
        year: 2023,
        status: CourseStatus.OPEN,
      },
      {
        name: 'GraphQL Basics',
        description:
          'Schemas, resolvers, dataloaders, and schema-first vs code-first.',
        year: 2022,
        status: CourseStatus.CLOSED,
      },
      {
        name: 'Testing with Jest',
        description:
          'Unit, integration, mocking, snapshots, and coverage workflows.',
        year: 2024,
        status: CourseStatus.OPEN,
      },
    ],
  },
  {
    name: 'Design',
    courses: [
      {
        name: 'React for Designers',
        description:
          'Component thinking, props/state, and design handoff to engineers.',
        year: 2023,
        status: CourseStatus.OPEN,
      },
      {
        name: 'UI Systems',
        description:
          'Design tokens, theming, accessibility, and design system governance.',
        year: 2024,
        status: CourseStatus.OPEN,
      },
      {
        name: 'Figma Prototyping',
        description:
          'Advanced prototyping, variables, autolayout, and components.',
        year: 2024,
        status: CourseStatus.OPEN,
      },
      {
        name: 'Design Tokens',
        description:
          'Token structure, tooling, sync to code, and multi-brand theming.',
        year: 2022,
        status: CourseStatus.CLOSED,
      },
      {
        name: 'Microinteractions',
        description:
          'Timing, easing, motion principles, and delight without overload.',
        year: 2023,
        status: CourseStatus.OPEN,
      },
    ],
  },
  {
    name: 'Marketing',
    courses: [
      {
        name: 'SEO Basics',
        description:
          'On-page SEO, technical checks, sitemaps, and Core Web Vitals.',
        year: 2022,
        status: CourseStatus.CLOSED,
      },
      {
        name: 'Content Strategy',
        description:
          'Topic clusters, editorial calendars, and tone of voice guides.',
        year: 2023,
        status: CourseStatus.OPEN,
      },
      {
        name: 'Email Automation',
        description:
          'Lifecycle emails, segmentation, and deliverability best practices.',
        year: 2023,
        status: CourseStatus.OPEN,
      },
      {
        name: 'Ads Optimization',
        description:
          'CPC/CPA optimization, creatives testing, and attribution pitfalls.',
        year: 2024,
        status: CourseStatus.OPEN,
      },
      {
        name: 'Analytics 101',
        description:
          'Event design, funnels, retention, and dashboards that matter.',
        year: 2024,
        status: CourseStatus.OPEN,
      },
    ],
  },
  {
    name: 'Business',
    courses: [
      {
        name: 'Product Discovery',
        description: 'Problem/solution fit, interviews, and experiment design.',
        year: 2024,
        status: CourseStatus.OPEN,
      },
      {
        name: 'OKR Essentials',
        description: 'Writing good OKRs, alignment, and cadence for outcomes.',
        year: 2023,
        status: CourseStatus.OPEN,
      },
      {
        name: 'Pricing Strategy',
        description: 'Packaging, willingness-to-pay tests, and value metrics.',
        year: 2023,
        status: CourseStatus.OPEN,
      },
      {
        name: 'Pitching Skills',
        description:
          'Narratives, decks, and delivery for investors and customers.',
        year: 2022,
        status: CourseStatus.CLOSED,
      },
      {
        name: 'Growth Loops',
        description:
          'Acquisition loops, retention loops, and measuring compounding effects.',
        year: 2024,
        status: CourseStatus.OPEN,
      },
    ],
  },
];
