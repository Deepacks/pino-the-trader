import { Injectable } from '@nestjs/common';
import {
  CacheType,
  ChatInputCommandInteraction,
  EmbedBuilder,
  Events,
  TextChannel,
} from 'discord.js';

import { ClientService } from '../client/client.service';
import { ListingDto } from './dto/listing-dto.type';

@Injectable()
export class ListingService {
  constructor(private clientService: ClientService) {
    // ----- add command event handler -----
    this.clientService.discordClient.on(
      Events.InteractionCreate,
      async (interaction) => {
        console.log('interaction', interaction);

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
      },
    );
  }

  async createListing(listingDto: ListingDto) {
    const { author, title, price, description, url, image, condition } =
      listingDto;

    const exampleListing = new EmbedBuilder()
      .setColor(0x0099ff)
      .setAuthor({ name: `${price}€ - ${author}` })
      .setTitle(title)
      .setURL(url)
      .setDescription(description)
      .setImage(image)
      .setTimestamp()
      .setFooter({
        text: condition,
        iconURL: 'https://cdn-icons-png.flaticon.com/512/179/179452.png',
      });

    const marketplaceChannel = this.clientService.discordClient.channels.cache
      .filter((ch) => ch instanceof TextChannel)
      .find((ch) => (ch as TextChannel).name === 'marketplace') as TextChannel;

    marketplaceChannel.send({ embeds: [exampleListing] });

    return 'create embed api';
  }
}
