import { Injectable } from '@nestjs/common';
import { REST, Routes } from 'discord.js';
import { getEnvVar } from 'src/helpers/getEnvVar.helper';

import sale from '../../commands/sale';
import textToImage from '../../commands/textToImage';
import ask from '../../commands/ask';

@Injectable()
export class CommandsService {
  rest: REST;

  constructor() {
    this.rest = new REST({ version: '10' }).setToken(getEnvVar('token'));
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
