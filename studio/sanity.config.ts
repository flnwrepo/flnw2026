import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'frontline-studio',
  title: 'Frontline',
  projectId: process.env.SANITY_PROJECT_ID || 'REPLACE_WITH_PROJECT_ID',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Homepage')
              .child(
                S.document()
                  .schemaType('homepage')
                  .documentId('homepage')
                  .title('Homepage')
              ),
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            S.listItem()
              .title('Practices')
              .child(S.documentTypeList('practice').title('Practices')),
            S.listItem()
              .title('Business Questions')
              .child(S.documentTypeList('businessQuestion').title('Business Questions')),
            S.listItem()
              .title('Operating Model Stages')
              .child(S.documentTypeList('operatingStage').title('Operating Model Stages')),
            S.listItem()
              .title('Industries')
              .child(S.documentTypeList('industry').title('Industries')),
            S.listItem()
              .title('Outcomes')
              .child(S.documentTypeList('outcome').title('Outcomes')),
            S.listItem()
              .title('Insights')
              .child(S.documentTypeList('insight').title('Insights')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
