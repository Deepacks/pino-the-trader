import { Module } from '@nestjs/common';

import { AnalyticsModule } from 'src/modules/analytics/analytics.module';
import { ConversationController } from './conversation.controller';
import { ConversationService } from './conversation.service';

@Module({
  imports: [AnalyticsModule],
  controllers: [ConversationController],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
