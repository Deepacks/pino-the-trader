import {
  Command,
  EventParams,
  Handler,
  InteractionEvent,
} from '@discord-nestjs/core';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { ClientEvents } from 'discord.js';

import { commandsData } from '../../data/commands.data';
import { AskDto } from 'src/modules/@ai/conversation/dto/ask.dto';
import { ConversationService } from 'src/modules/@ai/conversation/conversation.service';

@Command({
  name: commandsData.ask.name,
  description: commandsData.ask.description,
})
export class AskCommand {
  constructor(private conversationService: ConversationService) {}

  @Handler()
  async onAsk(
    @InteractionEvent(SlashCommandPipe) { text }: AskDto,
    @EventParams() [interaction]: ClientEvents['interactionCreate'],
  ) {
    if (!interaction.isRepliable()) return 'Bad request';
    interaction.reply("I'm thinking...");

    const answer = await this.conversationService.generateAnswer(
      { discordId: interaction.user.id },
      text,
    );
    interaction.editReply(`Q: ${text}\nA:${answer}`);
  }
}
