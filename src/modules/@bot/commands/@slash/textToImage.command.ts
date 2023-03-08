import { SlashCommandPipe } from '@discord-nestjs/common';
import {
  Command,
  EventParams,
  Handler,
  InteractionEvent,
} from '@discord-nestjs/core';
import { ClientEvents } from 'discord.js';

import { commandsData } from '../../data/commands.data';
import { TextToImageDto } from 'src/modules/@ai/image/dto/textToImage.dto';
import { ImageService } from 'src/modules/@ai/image/image.service';

@Command({
  name: commandsData.textToImage.name,
  description: commandsData.textToImage.description,
})
export class TextToImageCommand {
  constructor(private imageService: ImageService) {}

  @Handler()
  async onTextToImage(
    @InteractionEvent(SlashCommandPipe) { text }: TextToImageDto,
    @EventParams() [interaction]: ClientEvents['interactionCreate'],
  ) {
    if (!interaction.isRepliable()) return 'Bad request';
    await interaction.reply(`Generating image for: ${text}`);

    const imageUrl = await this.imageService.generateImage(
      { discordId: interaction.user.id },
      text,
    );
    await interaction.editReply(imageUrl);
  }
}
