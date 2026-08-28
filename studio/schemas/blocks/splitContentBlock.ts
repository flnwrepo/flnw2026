import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'splitContentBlock',
  title: 'Split Content',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
    }),
    defineField({
      name: 'leftTitle',
      title: 'Left — Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'leftBody',
      title: 'Left — Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'rightTitle',
      title: 'Right — Title',
      type: 'string',
    }),
    defineField({
      name: 'rightBody',
      title: 'Right — Body',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'sectionNumber',
      title: 'Section Number',
      type: 'string',
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
  ],
  preview: {
    select: { title: 'leftTitle' },
    prepare: ({ title }) => ({
      title: title || 'Split Content',
      subtitle: 'Split Content Block',
    }),
  },
});
