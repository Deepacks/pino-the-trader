import { Module } from '@nestjs/common';
import { CommandsController } from './commands.controller';
import { CommandsService } from './commands.service';
import { DiscordClientModule } from '../clients/discord/discordClient.module';
import { ConversationModule } from '../conversation/conversation.module';
import { TextToImageModule } from '../textToImage/textToImage.module';
import { ListingModule } from '../listing/listing.module';

@Module({
  imports: [
    DiscordClientModule,
    TextToImageModule,
    ConversationModule,
    ListingModule,
  ],
  controllers: [CommandsController],
  providers: [CommandsService],
})
export class CommandsModule {}
