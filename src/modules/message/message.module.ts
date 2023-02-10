import { Module } from '@nestjs/common';

import { DiscordClientModule } from '../clients/discord/discordClient.module';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

@Module({
  imports: [DiscordClientModule],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule {}
