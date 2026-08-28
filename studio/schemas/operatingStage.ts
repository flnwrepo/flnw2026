import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'operatingStage',
  title: 'Operating Model Stage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Stage Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'e.g. Assess, Standardize, Secure, Govern, Lead.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'barHeight',
      title: 'Bar Height (%)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(100),
      description: 'Height of the motif bar for this stage (1–100). Controls the ascending bar diagram.',
      initialValue: 50,
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
      title: 'title',
      subtitle: 'description',
    },
  },
});
