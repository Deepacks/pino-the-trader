import {
  Command,
  EventParams,
  Handler,
  InteractionEvent,
} from '@discord-nestjs/core';
import { ChatCompletionRequestMessage } from 'openai';
import { SlashCommandPipe } from '@discord-nestjs/common';
import { ClientEvents } from 'discord.js';

import { commandsData } from '../../data/commands.data';
import { AskDto } from 'src/modules/@ai/conversation/dto/ask.dto';
import { ClientService } from 'src/modules/@client/client.service';

@Command({
  name: commandsData.ask.name,
  description: commandsData.ask.description,
})
export class AskCommand {
  constructor(private readonly clientService: ClientService) {}

  @Handler()
  async onAsk(
    @InteractionEvent(SlashCommandPipe) { text }: AskDto,
    @EventParams() [interaction]: ClientEvents['interactionCreate'],
  ) {
    if (!interaction.isRepliable()) return 'Bad request';

    await interaction.reply("I'm thinking...");

    const message: ChatCompletionRequestMessage = {
      role: 'user',
      content: text,
    };

    const response = await this.clientService.undiciClient.request({
      path: `${ClientService.basePath}/text/chat/marv`,
      headers: ClientService.headers,
      method: 'POST',
      body: JSON.stringify(message),
    });
    const answer = await response.body.text();

    interaction.editReply(answer);
  }
}
