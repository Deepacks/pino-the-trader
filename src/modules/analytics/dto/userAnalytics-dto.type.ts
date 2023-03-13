export interface UserAnalyticsDto {
  lastLogin: Date;
  openAiData: { textToImageInteractions: number; askInteraction: number };
}
