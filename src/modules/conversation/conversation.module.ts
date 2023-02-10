import { Module } from '@nestjs/common';

import { ConversationService } from './conversation.service';
import { DiscordClientModule } from '../clients/discord/discordClient.module';
import { OpenAiClientModule } from '../clients/openai/openAiClient.module';

@Module({
  imports: [DiscordClientModule, OpenAiClientModule],
  providers: [ConversationService],
})
export class ConversationModule {}
