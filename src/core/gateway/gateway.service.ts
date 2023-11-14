import { createReadStream } from 'fs'
import { Injectable } from '@nestjs/common'
import { InjectDiscordClient } from '@discord-nestjs/core'
import { Client, Message, TextChannel, VoiceState } from 'discord.js'
import {
  VoiceConnection,
  createAudioPlayer,
  createAudioResource,
  getVoiceConnection,
  joinVoiceChannel,
} from '@discordjs/voice'

import { ChatCompletionRequestMessage } from 'src/client/types/openAi.types'
import { AiClientService } from 'src/client/aiClient.service'

// const VOICE_STATE_UPDATE_TARGET = '🗣COUNSIL🗣'
const VOICE_STATE_UPDATE_TARGET = '🎮GAMING CHANNEL🎮'
const BOT_DISCORD_USER_ID = '1051605193109799035'

@Injectable()
export class GatewayService {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly aiClientService: AiClientService,
  ) {}

  onReady() {
    console.log(`Bot ${this.client.user.tag} was started!`)
  }

  async onMessageCreate(message: Message): Promise<void> {
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

  async onVoiceStateUpdate(
    oldVoiceState: VoiceState,
    newVoiceState: VoiceState,
  ): Promise<void> {
    const userId = newVoiceState?.id ?? oldVoiceState?.id

    if (userId === BOT_DISCORD_USER_ID) return

    const currentChannel = newVoiceState.channel
    const previousChannel = oldVoiceState.channel

    if (
      !currentChannel ||
      (currentChannel && currentChannel.name !== VOICE_STATE_UPDATE_TARGET)
    ) {
      if (previousChannel?.name !== VOICE_STATE_UPDATE_TARGET) return

      const previousChannelHumanMembers = previousChannel.members.filter(
        (channelMember) => {
          return !channelMember.user.bot
        },
      )

      if (previousChannelHumanMembers.size === 0) {
        const connection = getVoiceConnection(previousChannel.guild.id)

        if (connection) connection.disconnect()
      }
    } else {
      if (currentChannel.name !== VOICE_STATE_UPDATE_TARGET) return

      const isBotPresent = !!currentChannel.members.find(
        (member) => member.user.id === BOT_DISCORD_USER_ID,
      )

      let connection: VoiceConnection

      if (!isBotPresent) {
        connection = joinVoiceChannel({
          channelId: currentChannel.id,
          guildId: currentChannel.guild.id,
          adapterCreator: currentChannel.guild.voiceAdapterCreator,
        })
      } else {
        connection = getVoiceConnection(currentChannel.guild.id)
      }

      const player = createAudioPlayer()

      let filePath: string

      if (process.env.NODE_ENV === 'development') {
        filePath = `${__dirname.slice(
          0,
          __dirname.length - 18,
        )}/src/data/audio/baby-welcome-to-the-party.mp3`
      } else {
        filePath = `${__dirname.slice(
          0,
          __dirname.length - 13,
        )}/data/audio/baby-welcome-to-the-party.mp3`
      }

      const stream = createReadStream(filePath)
      const resource = createAudioResource(stream)

      player.play(resource)

      connection.subscribe(player)
    }
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
