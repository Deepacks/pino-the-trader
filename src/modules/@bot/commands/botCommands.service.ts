import { Injectable } from '@nestjs/common';
import { REST, Routes } from 'discord.js';

import { getEnvVar } from 'src/helpers/getEnvVar.helper';
import { commandsData } from '../data/commands.data';

@Injectable()
export class BotCommandsService {
  rest: REST;

  constructor() {
    this.rest = new REST({ version: '10' }).setToken(getEnvVar('token'));
  }

  async registerCommands() {
    const commands = Object.values(commandsData).map((command) =>
      command.data.toJSON(),
    );

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

    let message = 'Commands registered: ';
    commands.forEach(({ name }, i) => {
      message = `${message}${name}${i < commands.length - 1 ? ', ' : ''}`;
    });

    console.log(message);

    return 'commands registered';
  }
}
