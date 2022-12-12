import { Injectable } from '@nestjs/common';
import { REST, Routes } from 'discord.js';

import * as sale from '../../commands/sale';

@Injectable()
export class CommandsService {
  rest: REST;

  constructor() {
    this.rest = new REST({ version: '10' }).setToken(process.env['token']);
  }

  async registerCommand() {
    const commands = [sale.data.toJSON()];

    console.log(
      `Started refreshing ${commands.length} application (/) commands.`,
    );

    await this.rest.put(
      Routes.applicationGuildCommands(
        process.env['clientId'],
        process.env['guildId'],
      ),
      { body: commands },
    );

    console.log('Commands updated');

    return 'command registered';
  }
}
