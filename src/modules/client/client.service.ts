import { Injectable } from '@nestjs/common';
import {
  Client,
  Events,
  Collection,
  GatewayIntentBits,
  ChatInputCommandInteraction,
  CacheType,
  TextChannel,
  EmbedBuilder,
} from 'discord.js';
import { getEnvVar } from 'src/helpers/getEnvVar.helper';

import * as sale from '../../commands/sale';

@Injectable()
export class ClientService {
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

    // ----- commands -----
    const commands = new Collection<string, object>();
    commands.set(sale.data.name, sale);

    this.discordClient['commands'] = commands;

    this.discordClient.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isChatInputCommand()) return;

      const command = interaction.client['commands'].get(
        interaction.commandName,
      ) as {
        data: any;
        execute: (
          interaction: ChatInputCommandInteraction<CacheType>,
        ) => Promise<void>;
      };

      if (!command) {
        console.error(
          `No command matching ${interaction.commandName} was found.`,
        );
        return;
      }

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: 'There was an error while executing this command!',
          ephemeral: true,
        });
      }
    });

    // ----- login -----
    this.discordClient.once(Events.ClientReady, (c) => {
      console.log(`Ready! Logged in as ${c.user.tag}`);
    });
    this.discordClient.login(getEnvVar('token'));
  }

  async createEmbed() {
    const exampleEmbed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setAuthor({ name: `50€ - CREATE VIA EMBED API` })
      .setTitle('Trust GXT 711 Dominus')
      .setURL(
        'https://www.amazon.it/Trust-Scrivania-Gaming-Ottimali-Prestazioni/dp/B07H7VX718/ref=sr_1_9?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3UVJPQSQT27TC&keywords=scrivania+gaming&qid=1670791693&sprefi',
      )
      .setDescription(
        'Tavolo da gaming 4k 60fps hdr1000 no-flicker g-sync a 3 livelli di potenza, con manopole riscaldate. Set di batterie non incluso',
      )
      .setImage(
        'https://m.media-amazon.com/images/I/81Jk1clmhlL._AC_SX679_.jpg',
      )
      .setTimestamp()
      .setFooter({
        text: 'Come nuovo',
        iconURL: 'https://cdn-icons-png.flaticon.com/512/179/179452.png',
      });

    const marketplaceChannel = this.discordClient.channels.cache
      .filter((ch) => ch instanceof TextChannel)
      .find((ch) => (ch as TextChannel).name === 'marketplace') as TextChannel;

    marketplaceChannel.send({ embeds: [exampleEmbed] });

    return 'create embed api';
  }
}
