import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'outcomesBlock',
  title: 'Outcomes',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Selected outcomes',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'text',
      rows: 2,
      initialValue: 'What disciplined technology work looks like in practice.',
    }),
    defineField({
      name: 'sectionNumber',
      title: 'Section Number',
      type: 'string',
      initialValue: '05',
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
    }),
    defineField({
      name: 'outcomes',
      title: 'Outcomes',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'outcome' }] }],
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title ? title.split('\n')[0] : 'Outcomes',
      subtitle: 'Outcomes Block',
    }),
  },
});
