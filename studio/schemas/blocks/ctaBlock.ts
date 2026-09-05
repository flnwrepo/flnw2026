import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'ctaBlock',
  title: 'CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Start a conversation',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 2,
      initialValue:
        'Tell us where the business is going. We\'ll talk about how technology gets there.',
    }),
    defineField({
      name: 'lede',
      title: 'Supporting Copy',
      type: 'text',
      rows: 3,
      initialValue:
        'A 30-minute conversation with a Frontline principal. No pitch deck, no scope, just a clear read on where you stand and what to do next.',
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      initialValue: 'Start a Conversation',
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
      initialValue: 'info@flnw.com',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
      initialValue: '805.880.2251',
    }),
    defineField({
      name: 'sectionNumber',
      title: 'Section Number',
      type: 'string',
      initialValue: '07',
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
      initialValue: 'tall',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title ? title.split('\n')[0] : 'CTA',
      subtitle: 'CTA Block',
    }),
  },
});
