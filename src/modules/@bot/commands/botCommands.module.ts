import { DiscordModule } from '@discord-nestjs/core';
import { Module } from '@nestjs/common';

import { ImageModule } from 'src/modules/@ai/image/image.module';
import { ConversationModule } from 'src/modules/@ai/conversation/conversation.module';
import { CommandsController } from './botCommands.controller';
import { BotCommandsService } from './botCommands.service';
import { TextToImageCommand } from './@slash/textToImage.command';
import { AskCommand } from './@slash/ask.command';

@Module({
  imports: [DiscordModule.forFeature(), ImageModule, ConversationModule],
  controllers: [CommandsController],
  providers: [BotCommandsService, TextToImageCommand, AskCommand],
})
export class BotCommandsModule {}
