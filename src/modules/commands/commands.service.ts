import { Injectable } from '@nestjs/common';
import { Events, REST, Routes } from 'discord.js';
import { getEnvVar } from 'src/helpers/getEnvVar.helper';

import sale from '../../commands/sale';
import textToImage from '../../commands/textToImage';
import ask from '../../commands/ask';
import { DiscordClientService } from '../clients/discord/discordClient.service';
import { ConversationService } from '../conversation/conversation.service';

@Injectable()
export class CommandsService {
  rest: REST;

  constructor(
    private discordClientService: DiscordClientService,
    private conversationService: ConversationService,
  ) {
    this.rest = new REST({ version: '10' }).setToken(getEnvVar('token'));

    // ----- listen for commands -----
    this.discordClientService.discordClient.on(
      Events.InteractionCreate,
      async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName === 'ask') {
          this.conversationService.handleConversation(interaction);
        }
      },
    );
  }

  async registerCommand() {
    const commands = [sale.toJSON(), textToImage.toJSON(), ask.toJSON()];

    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    await this.rest.put(
      Routes.applicationGuildCommands(
        getEnvVar('clientId'),
        getEnvVar('guildId'),
      ),
      { body: commands },
    );

    console.log('Commands updated');

    return 'command registered';
  }
}
