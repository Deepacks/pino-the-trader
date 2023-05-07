import { Injectable } from '@nestjs/common'
import { InjectDiscordClient, On, Once } from '@discord-nestjs/core'
import { Client, Message, TextChannel } from 'discord.js'

import { ChatCompletionRequestMessage } from 'src/client/types/openAi.types'
import { AiClientService } from 'src/client/aiClient.service'

@Injectable()
export class GatewayService {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly aiClientService: AiClientService,
  ) {}

  @Once('ready')
  onReady() {
    console.log(`Bot ${this.client.user.tag} was started!`)
  }

  @On('messageCreate')
  async onMessage(message: Message): Promise<void> {
    if (message.author.bot) return

    const reference = message.reference
    if (!reference) return

    const channel = await this.client.channels.fetch(reference.channelId)
    if (!(channel instanceof TextChannel)) return

    const replyStack = await this._getReferenceStack(
      reference.messageId,
      channel,
    )

    if (replyStack.length === 0) return

    const messages: ChatCompletionRequestMessage[] = []
    replyStack.forEach((reply, i) => {
      if (i === 0) {
        messages.push({
          role: 'user',
          content: reply.split('Q: ')[1].split('\n')[0],
        })
        messages.push({ role: 'assistant', content: reply.split('A: ')[1] })
      } else if (i % 2 === 0) {
        messages.push({ role: 'assistant', content: reply })
      } else {
        messages.push({ role: 'user', content: reply })
      }
    })
    messages.push({ role: 'user', content: message.content })

    const reply = await this.aiClientService.getMarvResponse(messages)
    await message.reply(reply)
  }

  private async _getReferenceStack(
    messageId: string,
    channel: TextChannel,
    extendContentStack = [],
  ): Promise<string[]> {
    const referencedMessage = await channel.messages.fetch(messageId)
    if (extendContentStack.length === 0 && !referencedMessage.author.bot) {
      return []
    }

    const contentStack = [...extendContentStack, referencedMessage.content]

    const reReference = referencedMessage.reference
    if (!reReference) return contentStack.reverse()

    return this._getReferenceStack(reReference.messageId, channel, contentStack)
  }
}
