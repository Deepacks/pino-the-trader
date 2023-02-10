import { Module } from '@nestjs/common';

import { ConversationService } from './conversation.service';
import { OpenAiClientModule } from '../clients/openai/openAiClient.module';

@Module({
  imports: [OpenAiClientModule],
  providers: [ConversationService],
  exports: [ConversationService],
})
export class ConversationModule {}
