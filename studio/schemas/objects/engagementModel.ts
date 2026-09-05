import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'engagementModel',
  title: 'Engagement Model',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Model',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: { select: { title: 'title', subtitle: 'description' } },
});
