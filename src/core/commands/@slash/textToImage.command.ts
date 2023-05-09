import {
  Command,
  EventParams,
  Handler,
  InteractionEvent,
} from '@discord-nestjs/core'
import { SlashCommandPipe } from '@discord-nestjs/common'
import { ClientEvents } from 'discord.js'

import { commandsData } from '../data/commands.data'
import { AiClientService } from 'src/client/aiClient.service'
import { TextToImageDto } from '../dto/textToImage-dto.type'

@Command({
  name: commandsData.textToImage.name,
  description: commandsData.textToImage.description,
})
export class TextToImageCommand {
  constructor(private readonly aiClientService: AiClientService) {}

  @Handler()
  async onTextToImage(
    @InteractionEvent(SlashCommandPipe) { text }: TextToImageDto,
    @EventParams() [interaction]: ClientEvents['interactionCreate'],
  ) {
    if (!interaction.isRepliable()) return 'Bad request'
    await interaction.reply(`I'm drawing **${text}** for you...`)

    const imageUrl = await this.aiClientService.getImageCreation(text)
    interaction.editReply({
      embeds: [
        {
          color: 15277667,
          title: `${text.slice(0, 1).toUpperCase()}${text.slice(1)}`,
          image: { url: imageUrl },
        },
      ],
    })
  }
}
