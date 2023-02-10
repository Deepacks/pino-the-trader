import { Injectable } from '@nestjs/common';
import { EmbedBuilder, Events, TextChannel } from 'discord.js';

import { DiscordClientService } from '../clients/discord/discordClient.service';
import { ListingDto } from './dto/listing-dto.type';

@Injectable()
export class ListingService {
  constructor(private discordClientService: DiscordClientService) {
    this.discordClientService.discordClient.on(
      Events.InteractionCreate,
      async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName !== 'sale') return;

        try {
          console.log('> sale listing');
          const embed = await this.createListing(
            {
              author: 'SkilledSoda',
              title: 'Trust GXT 711 Dominus',
              description:
                'Tavolo da gaming 4k 60fps hdr1000 no-flicker g-sync a 3 livelli di potenza, con manopole riscaldate. Set di batterie non incluso',
              image:
                'https://m.media-amazon.com/images/I/81Jk1clmhlL._AC_SX679_.jpg',
              price: '80',
              url: 'https://www.amazon.it/Trust-Scrivania-Gaming-Ottimali-Prestazioni/dp/B07H7VX718/ref=sr_1_9?__mk_it_IT=%C3%85M%C3%85%C5%BD%C3%95%C3%91&crid=3UVJPQSQT27TC&keywords=scrivania+gaming&qid=1670791693&sprefi',
              condition: 'Come nuovo',
            },
            true,
          );

          interaction.reply({ embeds: [embed] });
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

  async createListing(listingDto: ListingDto, isCommand = false) {
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

    if (!isCommand) {
      const marketplaceChannel =
        this.discordClientService.discordClient.channels.cache
          .filter((ch) => ch instanceof TextChannel)
          .find(
            (ch) => (ch as TextChannel).name === 'marketplace',
          ) as TextChannel;

      marketplaceChannel.send({ embeds: [exampleListing] });
    }

    return exampleListing;
  }
}
