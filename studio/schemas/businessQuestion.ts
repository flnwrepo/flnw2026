import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'businessQuestion',
  title: 'Business Question',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
      description: 'Use *asterisks* for italic emphasis on key words.',
    }),
    defineField({
      name: 'emphasisWords',
      title: 'Emphasis Words',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Words to render in italic blue (e.g. AI, CMMC, actually).',
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
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
      title: 'question',
    },
  },
});
