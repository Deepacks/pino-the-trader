import { Module } from '@nestjs/common';
import { DiscordModule } from '@discord-nestjs/core';

import { BotGatewayService } from './botGateway.service';
import { ConversationModule } from 'src/modules/@ai/conversation/conversation.module';

@Module({
  imports: [DiscordModule.forFeature(), ConversationModule],
  providers: [BotGatewayService],
})
export class BotGatewayModule {}
