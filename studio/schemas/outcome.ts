import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'outcome',
  title: 'Outcome',
  type: 'document',
  description:
    'Only publish outcomes based on a real, documented Frontline engagement that can be substantiated. Do not use illustrative or estimated figures.',
  fields: [
    defineField({
      name: 'figure',
      title: 'Figure',
      type: 'string',
      validation: (Rule) => Rule.required(),
      description: 'The large display figure, e.g. "CMMC", "24", "-38".',
    }),
    defineField({
      name: 'figureSuffix',
      title: 'Figure Suffix',
      type: 'string',
      description: 'Small unit shown after the figure, e.g. "L2", "mo", "%".',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Featured (larger display)',
      type: 'boolean',
      initialValue: false,
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
      subtitle: 'figure',
    },
  },
});
