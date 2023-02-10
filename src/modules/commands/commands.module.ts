import { Module } from '@nestjs/common';
import { CommandsController } from './commands.controller';
import { CommandsService } from './commands.service';
import { DiscordClientModule } from '../clients/discord/discordClient.module';
import { ConversationModule } from '../conversation/conversation.module';

@Module({
  imports: [DiscordClientModule, ConversationModule],
  controllers: [CommandsController],
  providers: [CommandsService],
})
export class CommandsModule {}
