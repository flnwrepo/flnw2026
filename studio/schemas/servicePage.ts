import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * servicePage — one of the five Frontline service breakout pages.
 *
 * Editors populate a defined set of components. Layout stays in code
 * (ServiceHero, IntroSplit, CapabilityGrid, ProcessFlow, EngagementModels,
 * FrameworkStrip, RelatedServices, FinalCTA) so the pages stay a visual family.
 */
export default defineType({
  name: 'servicePage',
  title: 'Service Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'content', title: 'Content' },
    { name: 'engage', title: 'Engagement & CTA' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'hero',
      description: 'Service name, e.g. "Fractional CIO".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'hero',
      options: { source: 'title' },
      description: 'URL path, e.g. "fractional-cio" → /fractional-cio',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      group: 'hero',
      description: 'Small label above the headline. Sentence case, not all-caps.',
    }),
    defineField({
      name: 'headline',
      title: 'Headline (H1)',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'string',
      group: 'hero',
      description: 'One-line positioning statement under the H1.',
    }),
    defineField({
      name: 'intro',
      title: 'Intro',
      type: 'array',
      group: 'hero',
      of: [{ type: 'block' }],
      description: 'Two or three short paragraphs in the hero.',
    }),
    defineField({
      name: 'heroCtaLabel',
      title: 'Hero CTA Label',
      type: 'string',
      group: 'hero',
      initialValue: 'Start a Conversation',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Hero CTA Link',
      type: 'string',
      group: 'hero',
      initialValue: '/#contact',
    }),

    defineField({
      name: 'leadStatement',
      title: 'Lead Statement',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Large standalone statement directly beneath the hero.',
    }),
    defineField({
      name: 'problems',
      title: 'Problems',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description:
        'The situation this service addresses. Rendered as an executive question set or intro list.',
    }),
    defineField({
      name: 'capabilitySections',
      title: 'Capabilities',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'capabilitySection' })],
      description:
        'Each section renders as a side heading plus a capability grid. Keep list items short.',
    }),
    defineField({
      name: 'process',
      title: 'Process',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({ type: 'processStep' })],
      description: 'Sequential steps, e.g. Assess → Document → Prioritize → Remediate.',
    }),
    defineField({
      name: 'processNote',
      title: 'Process Note',
      type: 'string',
      group: 'content',
      description: 'Short line under the process flow, e.g. "The cycle repeats."',
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      description: 'What the client actually receives.',
    }),
    defineField({
      name: 'frameworks',
      title: 'Frameworks',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      description:
        'Framework strip, e.g. CMMC Level 2, NIST SP 800-171, HIPAA Security. Readiness and alignment only — Frontline does not certify.',
    }),

    defineField({
      name: 'engagementModels',
      title: 'Engagement Models',
      type: 'array',
      group: 'engage',
      of: [defineArrayMember({ type: 'engagementModel' })],
      description: 'Ways to engage Frontline for this service. Usually four.',
    }),
    defineField({
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      group: 'engage',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{ type: 'servicePage' }],
        }),
      ],
      validation: (Rule) => Rule.max(4),
      description: 'Up to four other service pages to link at the foot of this page.',
    }),
    defineField({
      name: 'faq',
      title: 'FAQ',
      type: 'array',
      group: 'engage',
      of: [defineArrayMember({ type: 'faq' })],
    }),
    defineField({
      name: 'finalCtaTitle',
      title: 'Final CTA — Title',
      type: 'text',
      rows: 2,
      group: 'engage',
    }),
    defineField({
      name: 'finalCtaLede',
      title: 'Final CTA — Supporting Copy',
      type: 'text',
      rows: 3,
      group: 'engage',
    }),
    defineField({
      name: 'finalCtaLabel',
      title: 'Final CTA — Button Label',
      type: 'string',
      group: 'engage',
      initialValue: 'Start a Conversation',
    }),

    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
      validation: (Rule) => Rule.max(70).warning('Keep under about 70 characters.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      group: 'seo',
      validation: (Rule) => Rule.max(165).warning('Keep under about 165 characters.'),
    }),

    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Order in navigation and on the homepage. Lower numbers appear first.',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'lede' },
  },
});
