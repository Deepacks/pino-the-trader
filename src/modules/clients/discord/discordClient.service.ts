import { Injectable } from '@nestjs/common';
import { Client, Events, Collection, GatewayIntentBits } from 'discord.js';

import { getEnvVar } from 'src/helpers/getEnvVar.helper';
import {
  data as SaleCmdData,
  execute as SaleCmdExecute,
} from '../../../commands/sale';

@Injectable()
export class DiscordClientService {
  discordClient: Client<boolean>;

  constructor() {
    this.discordClient = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildIntegrations,
      ],
    });

    // ----- add commands -----
    const commands = new Collection<string, object>();
    commands.set(SaleCmdData.name, {
      data: SaleCmdData,
      execute: SaleCmdExecute,
    });
    this.discordClient['commands'] = commands;

    // ----- login -----
    this.discordClient.once(Events.ClientReady, (c) => {
      console.log(`Ready! Logged in as ${c.user.tag}`);
    });
    this.discordClient.login(getEnvVar('token'));
  }
}
