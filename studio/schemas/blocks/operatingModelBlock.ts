import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'operatingModelBlock',
  title: 'Operating Model',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'The Frontline operating model',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'From ad-hoc IT to technology leadership.',
    }),
    defineField({
      name: 'aside',
      title: 'Aside',
      type: 'text',
      rows: 2,
      initialValue:
        'A disciplined path most organizations can move through — one stage building on the last.',
    }),
    defineField({
      name: 'sectionNumber',
      title: 'Section Number',
      type: 'string',
      initialValue: '03',
    }),
    defineField({
      name: 'spacing',
      title: 'Spacing',
      type: 'string',
      options: {
        list: [
          { title: 'Tall (extra breathing room)', value: 'tall' },
          { title: 'Normal', value: 'normal' },
          { title: 'Compact', value: 'compact' },
        ],
        layout: 'radio',
      },
      initialValue: 'tall',
    }),
    defineField({
      name: 'stages',
      title: 'Stages',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'operatingStage' }] }],
      description: 'Select and order stages. Bar height is set on each stage document.',
    }),
    defineField({
      name: 'marginNote',
      title: 'Margin Note',
      type: 'string',
      initialValue: 'Most organizations are stuck between Standardize and Secure',
      description: 'Small italic annotation in the margin. Leave blank to hide.',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title || 'Operating Model',
      subtitle: 'Operating Model Block',
    }),
  },
});
