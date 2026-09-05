import homepage from './homepage';
import siteSettings from './siteSettings';
import servicePage from './servicePage';
import practice from './practice';
import businessQuestion from './businessQuestion';
import operatingStage from './operatingStage';
import industry from './industry';
import outcome from './outcome';
import insight from './insight';

// Reusable object types (used by servicePage)
import capabilitySection from './objects/capabilitySection';
import processStep from './objects/processStep';
import engagementModel from './objects/engagementModel';
import faq from './objects/faq';

// Section block types
import heroBlock from './blocks/heroBlock';
import questionsBlock from './blocks/questionsBlock';
import practicesBlock from './blocks/practicesBlock';
import operatingModelBlock from './blocks/operatingModelBlock';
import industriesBlock from './blocks/industriesBlock';
import useCasesBlock from './blocks/useCasesBlock';
import outcomesBlock from './blocks/outcomesBlock';
import insightsBlock from './blocks/insightsBlock';
import ctaBlock from './blocks/ctaBlock';
import customTextBlock from './blocks/customTextBlock';
import splitContentBlock from './blocks/splitContentBlock';
import pullQuoteBlock from './blocks/pullQuoteBlock';
import motifDividerBlock from './blocks/motifDividerBlock';

export const schemaTypes = [
  homepage,
  siteSettings,
  servicePage,
  practice,
  businessQuestion,
  operatingStage,
  industry,
  outcome,
  insight,
  // Object types
  capabilitySection,
  processStep,
  engagementModel,
  faq,
  // Block types
  heroBlock,
  questionsBlock,
  practicesBlock,
  operatingModelBlock,
  industriesBlock,
  useCasesBlock,
  outcomesBlock,
  insightsBlock,
  ctaBlock,
  customTextBlock,
  splitContentBlock,
  pullQuoteBlock,
  motifDividerBlock,
];
