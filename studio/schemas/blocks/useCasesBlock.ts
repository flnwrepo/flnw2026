import { defineType, defineField, defineArrayMember } from 'sanity';

/**
 * useCasesBlock — "Where Frontline fits".
 *
 * Situation-led rather than service-led: each entry names a position a
 * prospect recognises themselves in, then points at the service that answers
 * it. Deliberately not numbered — these are not a sequence.
 */
export default defineType({
  name: 'useCasesBlock',
  title: 'Where Frontline Fits',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Eyebrow',
      type: 'string',
      initialValue: 'Where Frontline fits',
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'text',
      rows: 2,
      initialValue:
        'Too small for a full-time IT executive.\nToo dependent on technology to go without one.',
      description: 'Line breaks are preserved.',
    }),
    defineField({
      name: 'aside',
      title: 'Supporting Copy',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'useCases',
      title: 'Situations',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'useCase',
          fields: [
            defineField({
              name: 'title',
              title: 'Situation',
              type: 'string',
              description: 'Short and recognisable, e.g. "One person is carrying all of IT".',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 4,
              description:
                'Write in the second person. Name the situation, then what Frontline does about it.',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'ctaLabel',
              title: 'Link Label',
              type: 'string',
              description: 'Usually the service that answers this situation.',
            }),
            defineField({
              name: 'ctaLink',
              title: 'Link',
              type: 'string',
              initialValue: '/fractional-cio/',
            }),
          ],
          preview: { select: { title: 'title', subtitle: 'ctaLabel' } },
        }),
      ],
    }),
  ],
  preview: {
    select: { title: 'title', cases: 'useCases' },
    prepare({ title, cases }: { title?: string; cases?: unknown[] }) {
      return {
        title: 'Where Frontline Fits',
        subtitle: `${cases?.length ?? 0} situations — ${(title || '').split('\n')[0]}`,
      };
    },
  },
});
