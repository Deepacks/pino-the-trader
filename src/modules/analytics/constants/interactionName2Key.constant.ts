import { AnalyticInteraction } from '../types/analyticInteraction.types';

export const INTERACTION_NAME2KEY = new Map<AnalyticInteraction, string>([
  ['text-to-image', 'textToImageInteractions'],
  ['ask', 'askInteraction'],
]);
