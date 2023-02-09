import { Injectable } from '@nestjs/common';
import { Events } from 'discord.js';

import { OpenAiClientService } from '../clients/openai/openAiClient.service';
import { DiscordClientService } from '../clients/discord/discordClient.service';

@Injectable()
export class TextToImageService {
  constructor(
    private openAiClientService: OpenAiClientService,
    private discordClientService: DiscordClientService,
  ) {
    this.discordClientService.discordClient.on(
      Events.InteractionCreate,
      async (interaction) => {
        if (!interaction.isChatInputCommand()) return;

        if (interaction.commandName !== 'text-to-image') return;

        const prompt = interaction.options.getString('text');
        await interaction.reply(
          `Generating url for: ${prompt}, please wait...`,
        );

        try {
          const imageUrl = await this.promptToImageUrl(prompt);
          await interaction.editReply(imageUrl);
        } catch {
          await interaction.editReply('the image was not created');
        }
      },
    );
  }

  async promptToImageUrl(prompt: string) {
    const response = await this.openAiClientService.openAiClient.createImage({
      prompt: prompt,
      n: 1,
      size: '1024x1024',
    });
    const image_url = response.data.data[0].url;

    return image_url;
  }
}
