import {
  Command,
  EventParams,
  Handler,
  InteractionEvent,
} from '@discord-nestjs/core'
import { SlashCommandPipe } from '@discord-nestjs/common'
import { ClientEvents } from 'discord.js'
import { ChatCompletionRequestMessage } from 'src/client/types/openAi.types'

import { commandsData } from '../data/commands.data'
import { AskDto } from '../dto/ask-dto.types'
import { AiClientService } from 'src/client/aiClient.service'

@Command({
  name: commandsData.ask.name,
  description: commandsData.ask.description,
})
export class AskCommand {
  constructor(private readonly aiClientService: AiClientService) {}

  @Handler()
  async onAsk(
    @InteractionEvent(SlashCommandPipe) askDto: AskDto,
    @EventParams() [interaction]: ClientEvents['interactionCreate'],
  ) {
    if (!interaction.isRepliable()) return 'Bad request'

    await interaction.reply("I'm thinking...")

    const message: ChatCompletionRequestMessage = {
      role: 'user',
      content: askDto.text,
    }

    const answer = await this.aiClientService.getMarvResponse([message])

    interaction.editReply(`Q: ${askDto.text}\n A: ${answer}`)
  }
}
