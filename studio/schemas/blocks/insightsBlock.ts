import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'insightsBlock',
  title: 'Insights',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Insights',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Notes from the field.',
    }),
    defineField({
      name: 'sectionNumber',
      title: 'Section Number',
      type: 'string',
      initialValue: '06',
    }),
    defineField({
      name: 'insights',
      title: 'Insights',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'insight' }] }],
      description: 'Select and order insights to feature.',
    }),
    defineField({
      name: 'maxDisplay',
      title: 'Max Display',
      type: 'number',
      initialValue: 3,
      description: 'Maximum number of insights to show. 0 = show all.',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title || 'Insights',
      subtitle: 'Insights Block',
    }),
  },
});
