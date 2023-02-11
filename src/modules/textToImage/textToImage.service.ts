import { Injectable } from '@nestjs/common';
import { CacheType, ChatInputCommandInteraction } from 'discord.js';

import { OpenAiClientService } from '../clients/openai/openAiClient.service';

@Injectable()
export class TextToImageService {
  constructor(private openAiClientService: OpenAiClientService) {}

  async handleTextToImage(interaction: ChatInputCommandInteraction<CacheType>) {
    const prompt = interaction.options.getString('text');
    await interaction.reply(`Generating url for: ${prompt}, please wait...`);

    try {
      console.log('> image generation', prompt);
      const imageUrl = await this.promptToImageUrl(prompt);

      await interaction.editReply(imageUrl);
    } catch (e) {
      console.log(e);

      await interaction.editReply('the image was not created');
    }
  }

  async promptToImageUrl(prompt: string) {
    const response = await this.openAiClientService.openAiClient.createImage({
      prompt: prompt,
      n: 1,
      size: '256x256',
    });

    const image_url = response.data.data[0].url;

    return image_url;
  }
}
