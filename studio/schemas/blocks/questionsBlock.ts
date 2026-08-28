import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'questionsBlock',
  title: 'Business Questions',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Section Label',
      type: 'string',
      initialValue: 'Questions we hear',
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'text',
      rows: 2,
      initialValue: 'The conversations that should be happening in the executive room.',
    }),
    defineField({
      name: 'sectionNumber',
      title: 'Section Number',
      type: 'string',
      initialValue: '01',
      description: 'Large background number for the section.',
    }),
    defineField({
      name: 'questions',
      title: 'Questions',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'text',
              title: 'Question Text',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'emphasisWords',
              title: 'Emphasis Words',
              type: 'array',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
              description: 'Words to render in italic blue.',
            },
          ],
          preview: {
            select: { title: 'text' },
          },
        },
      ],
      description: 'Add, remove, or reorder questions.',
    }),
    defineField({
      name: 'closingLine',
      title: 'Closing Line',
      type: 'string',
      initialValue: 'These are the questions Frontline is built to answer.',
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare: ({ title }) => ({
      title: title ? title.split('\n')[0] : 'Questions',
      subtitle: 'Business Questions Block',
    }),
  },
});
