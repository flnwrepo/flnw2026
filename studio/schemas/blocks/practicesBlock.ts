import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'practicesBlock',
  title: 'Practice Areas',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Practice areas',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Five practices. One operating model.',
    }),
    defineField({
      name: 'aside',
      title: 'Aside',
      type: 'text',
      rows: 3,
      initialValue:
        'Frontline works as a single advisory partner across strategy, governance, security, operations, and transformation, so technology decisions stay connected to the business.',
    }),
    defineField({
      name: 'sectionNumber',
      title: 'Section Number',
      type: 'string',
      initialValue: '02',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Dark (Navy)', value: 'dark' },
          { title: 'Light', value: 'light' },
        ],
        layout: 'radio',
      },
      initialValue: 'dark',
      description: 'Dark = full-bleed navy background. Light = white background.',
    }),
    defineField({
      name: 'practices',
      title: 'Practices',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'practice' }],
        },
      ],
      description: 'Select and order practices. Mark practices as "Featured" in the practice document.',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title || 'Practices',
      subtitle: 'Practice Areas Block',
    }),
  },
});
