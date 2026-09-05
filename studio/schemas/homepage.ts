import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Frontline Homepage',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sections',
      title: 'Sections',
      type: 'array',
      description: 'Drag to reorder. Add or remove sections to change the page structure.',
      of: [
        { type: 'heroBlock', title: 'Hero' },
        { type: 'questionsBlock', title: 'Business Questions' },
        { type: 'practicesBlock', title: 'Practice Areas' },
        { type: 'operatingModelBlock', title: 'Operating Model' },
        { type: 'useCasesBlock', title: 'Where Frontline Fits' },
        { type: 'industriesBlock', title: 'Industries' },
        { type: 'outcomesBlock', title: 'Outcomes' },
        { type: 'insightsBlock', title: 'Insights' },
        { type: 'ctaBlock', title: 'CTA' },
        { type: 'customTextBlock', title: 'Custom Text Section' },
        { type: 'splitContentBlock', title: 'Split Content' },
        { type: 'pullQuoteBlock', title: 'Pull Quote' },
        { type: 'motifDividerBlock', title: 'Motif Divider' },
      ],
      options: {
        layout: 'list',
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
});
