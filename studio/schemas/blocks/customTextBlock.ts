import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'customTextBlock',
  title: 'Custom Text Section',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      description: 'Small mono label above the title. Leave blank to hide.',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Rich text body content.',
    }),
    defineField({
      name: 'sectionNumber',
      title: 'Section Number',
      type: 'string',
      description: 'Large background number. Leave blank to hide.',
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
          { title: 'Compact', value: 'compact' },
        ],
        layout: 'radio',
      },
      initialValue: 'normal',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Optional CTA Label',
      type: 'string',
      description: 'Leave blank to hide.',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Optional CTA Link',
      type: 'string',
      initialValue: '#contact',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title || 'Custom Text',
      subtitle: 'Custom Text Block',
    }),
  },
});
