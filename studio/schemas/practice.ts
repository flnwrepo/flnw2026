import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'practice',
  title: 'Practice',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lede',
      title: 'Lede',
      type: 'string',
      description: 'One-line positioning statement, e.g. "Technology leadership that turns priorities into action."',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Label',
      type: 'string',
      description: 'Contextual action label, e.g. "Explore Fractional CIO".',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
      description: 'URL or anchor, e.g. "#contact" or "/practices/fractional-cio".',
      initialValue: '#contact',
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured (navy panel)',
      type: 'boolean',
      initialValue: false,
      description: 'Renders this practice as the dark navy panel. Use for GRC.',
    }),
    defineField({
      name: 'grcTags',
      title: 'Compliance Tags',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Framework badges shown on the featured practice (e.g. CMMC Level 2, NIST 800-171, HIPAA).',
      options: {
        layout: 'tags',
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'navLabel',
      title: 'Navigation Label',
      type: 'string',
      description: 'Short label for the header nav (e.g. "GRC"). Leave blank to use title.',
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
    select: {
      title: 'title',
      subtitle: 'description',
    },
  },
});
