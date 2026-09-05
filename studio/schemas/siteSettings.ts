import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero Eyebrow',
      type: 'string',
      initialValue: 'Frontline',
      description: 'Small label above the hero headline.',
    }),
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'text',
      rows: 3,
      initialValue: 'Technology Leadership.\nCybersecurity.\nGovernance.',
      description: 'Use line breaks to control the headline structure.',
    }),
    defineField({
      name: 'heroSupporting',
      title: 'Hero Supporting Copy',
      type: 'text',
      rows: 3,
      initialValue:
        'Frontline helps small and midsized organizations plan, secure, govern, and improve their technology environments. We combine experienced technology leadership with cybersecurity, compliance, engineering, and managed services so strategy can move directly into execution.',
    }),
    defineField({
      name: 'heroPrimaryCta',
      title: 'Hero Primary CTA',
      type: 'string',
      initialValue: 'Start a Conversation',
    }),
    defineField({
      name: 'heroSecondaryCta',
      title: 'Hero Secondary CTA',
      type: 'string',
      initialValue: 'Explore Our Services',
    }),
    defineField({
      name: 'questionsIntro',
      title: 'Questions Section — Intro Title',
      type: 'text',
      rows: 2,
      initialValue:
        'The conversations that belong in the executive room.',
    }),
    defineField({
      name: 'questionsClose',
      title: 'Questions Section — Closing Line',
      type: 'string',
      initialValue: 'These are the questions Frontline is built to answer.',
    }),
    defineField({
      name: 'practicesTitle',
      title: 'Practices Section — Title',
      type: 'string',
      initialValue: 'Five service areas. One partner.',
    }),
    defineField({
      name: 'practicesAside',
      title: 'Practices Section — Aside',
      type: 'text',
      rows: 3,
      initialValue:
        'Frontline can help identify the problem, develop the strategy, establish governance, and then provide the technical resources required to execute the plan.',
    }),
    defineField({
      name: 'modelTitle',
      title: 'Operating Model — Title',
      type: 'string',
      initialValue: 'Assess → Standardize → Secure → Govern → Lead',
    }),
    defineField({
      name: 'modelAside',
      title: 'Operating Model — Aside',
      type: 'text',
      rows: 2,
      initialValue:
        'A disciplined path, one stage building on the last. Frontline can enter at any point — most organizations do not start at the beginning.',
    }),
    defineField({
      name: 'industriesTitle',
      title: 'Industries Section — Title',
      type: 'string',
      initialValue: 'Industries & environments.',
    }),
    defineField({
      name: 'industriesNote',
      title: 'Industries Section — Note',
      type: 'text',
      rows: 2,
      initialValue:
        'Small and midsized organizations — headquartered in Ventura, CA, serving Southern California and available nationwide.',
    }),
    defineField({
      name: 'outcomesTitle',
      title: 'Outcomes Section — Title',
      description:
        'Only used if the Outcomes block is on the page. Publish outcomes only when they reflect a real, documented engagement.',
      type: 'text',
      rows: 2,
      initialValue: 'What disciplined technology work looks like in practice.',
    }),
    defineField({
      name: 'insightsTitle',
      title: 'Insights Section — Title',
      type: 'string',
      initialValue: 'Notes from the field.',
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA — Title',
      type: 'text',
      rows: 2,
      initialValue:
        'Tell us where the business is going. We\'ll talk about how technology gets there.',
    }),
    defineField({
      name: 'ctaLede',
      title: 'CTA — Supporting Copy',
      type: 'text',
      rows: 3,
      initialValue:
        'Start with a conversation about where you are today, where the business is headed, and where technology, cybersecurity, or governance may be getting in the way.',
    }),
    defineField({
      name: 'ctaButtonLabel',
      title: 'CTA — Button Label',
      type: 'string',
      initialValue: 'Start a Conversation',
    }),
    defineField({
      name: 'ctaEmail',
      title: 'CTA — Contact Email',
      type: 'string',
      initialValue: 'info@frontlinecio.com',
    }),
    defineField({
      name: 'ctaPhone',
      title: 'CTA — Contact Phone',
      type: 'string',
      initialValue: '805.880.2251',
      description: 'Display format. The tel: link will strip non-digits automatically.',
    }),
    defineField({
      name: 'footerTagline',
      title: 'Footer — Tagline',
      type: 'string',
      initialValue: 'Technology Leadership. Cybersecurity. Governance.',
    }),
    defineField({
      name: 'footerLocation',
      title: 'Footer — Location',
      type: 'string',
      initialValue: 'Headquartered in Ventura, CA',
    }),
    defineField({
      name: 'footerServes',
      title: 'Footer — Service Area',
      type: 'string',
      initialValue: 'Serving Southern California · Available nationwide',
    }),
  ],
  preview: {
    select: {
      title: 'heroEyebrow',
    },
  },
});
