import { Injectable } from '@nestjs/common';
import { Client, Events, GatewayIntentBits } from 'discord.js';

@Injectable()
export class ClientService {
  discordClient: Client<boolean>;

  constructor() {
    this.discordClient = new Client({ intents: [GatewayIntentBits.Guilds] });

    this.discordClient.once(Events.ClientReady, (c) => {
      console.log(`Ready! Logged in as ${c.user.tag}`);
    });

    this.discordClient.login(process.env['token']);
  }

  async createEmbed() {
    return 'create embed api';
  }
}
