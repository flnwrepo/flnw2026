import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pullQuoteBlock',
  title: 'Pull Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: 'e.g. "Frontline Principal" or a client name. Leave blank to hide.',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Dark (Navy)', value: 'dark' },
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'Tall', value: 'tall' },
          { title: 'Normal', value: 'normal' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
  ],
  preview: {
    select: { title: 'quote' },
    prepare: ({ title }) => ({
      title: title ? title.substring(0, 60) : 'Pull Quote',
      subtitle: 'Pull Quote Block',
    }),
  },
});
