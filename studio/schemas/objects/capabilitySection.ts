import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'capabilitySection',
  title: 'Capability Section',
  type: 'object',
  fields: [
    defineField({ name: 'label', title: 'Eyebrow', type: 'string' }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: 'aside', title: 'Supporting Copy', type: 'text', rows: 3 }),
    defineField({
      name: 'listIntro',
      title: 'List Intro',
      type: 'string',
      description: 'Short line above the list, e.g. "Frontline can perform:".',
    }),
    defineField({
      name: 'items',
      title: 'Capabilities',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
      options: {
        list: [
          { title: 'Light', value: 'light' },
          { title: 'Navy', value: 'dark' },
          { title: 'Off-white', value: 'soft' },
        ],
        layout: 'radio',
      },
      initialValue: 'light',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'label' },
  },
});
