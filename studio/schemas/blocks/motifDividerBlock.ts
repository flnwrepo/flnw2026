import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'motifDividerBlock',
  title: 'Motif Divider',
  type: 'object',
  fields: [
    defineField({
      name: 'height',
      title: 'Height',
      type: 'string',
      options: {
        list: [
          { title: 'Small', value: 'small' },
          { title: 'Medium', value: 'medium' },
          { title: 'Large', value: 'large' },
        ],
        layout: 'radio',
      },
      initialValue: 'medium',
      description: 'Controls the amount of vertical space.',
    }),
    defineField({
      name: 'showBars',
      title: 'Show Three-Bar Motif',
      type: 'boolean',
      initialValue: true,
      description: 'Display the three ascending bars as a visual break.',
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
  ],
  preview: {
    prepare: () => ({
      title: 'Motif Divider',
      subtitle: 'Spacer / Visual Break',
    }),
  },
});
