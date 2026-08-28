import { defineType, defineField, defineArrayMember } from 'sanity';

export default defineType({
  name: 'heroBlock',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'FRONTLINE',
    }),
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'text',
      rows: 4,
      initialValue: 'Technology\nLeadership.\nCybersecurity.\nGovernance.',
      description: 'Use line breaks to control the headline structure.',
    }),
    defineField({
      name: 'supportingCopy',
      title: 'Supporting Copy',
      type: 'text',
      rows: 3,
      initialValue:
        'Frontline helps small and midsized organizations make better technology decisions, reduce risk, and build IT operations that support where the business is going.',
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'string',
      initialValue: 'Start a Conversation',
    }),
    defineField({
      name: 'primaryCtaLink',
      title: 'Primary CTA Link',
      type: 'string',
      initialValue: '#contact',
    }),
    defineField({
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'string',
      initialValue: 'Explore Our Approach',
    }),
    defineField({
      name: 'secondaryCtaLink',
      title: 'Secondary CTA Link',
      type: 'string',
      initialValue: '#approach',
    }),
  ],
  preview: {
    select: {
      title: 'headline',
      subtitle: 'eyebrow',
    },
    prepare: ({ title, subtitle }) => ({
      title: title ? title.split('\n')[0] : 'Hero',
      subtitle: 'Hero Block',
    }),
  },
});
