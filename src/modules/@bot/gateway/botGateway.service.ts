import { Injectable } from '@nestjs/common';
import { InjectDiscordClient, On, Once } from '@discord-nestjs/core';
import { Client, Message, TextChannel } from 'discord.js';

import { ConversationService } from 'src/modules/@ai/conversation/conversation.service';

@Injectable()
export class BotGatewayService {
  constructor(
    @InjectDiscordClient()
    private readonly client: Client,
    private readonly conversationService: ConversationService,
  ) {}

  @Once('ready')
  onReady() {
    console.log(`Bot ${this.client.user.tag} was started!`);
  }

  @On('messageCreate')
  async onMessage(message: Message): Promise<void> {
    if (message.author.bot) return;

    const reference = message.reference;
    if (!reference) return;

    const channel = await this.client.channels.fetch(reference.channelId);
    if (!(channel instanceof TextChannel)) return;

    const replyStack = await this.getReferenceStack(
      reference.messageId,
      channel,
    );

    if (replyStack.length === 0) return;

    let prompt = '';
    replyStack.forEach((reply, i) => {
      if (i === 0) {
        prompt = reply.replace('Q: ', '').replace('A: ', 'Pino: ');
      } else if (i % 2 === 0) {
        prompt = `${prompt}\nPino: ${reply}`;
      } else {
        prompt = `${prompt}\nYou: ${reply}`;
      }
    });
    prompt = prompt = `${prompt}\nYou: ${message.content}`;

    const reply = await this.conversationService.generateAnswer(prompt);
    await message.reply(reply);
  }

  async getReferenceStack(
    messageId: string,
    channel: TextChannel,
    extendContentStack = [],
  ): Promise<string[]> {
    const referencedMessage = await channel.messages.fetch(messageId);
    if (extendContentStack.length === 0 && !referencedMessage.author.bot) {
      return [];
    }

    const contentStack = [...extendContentStack, referencedMessage.content];

    const reReference = referencedMessage.reference;
    if (!reReference) return contentStack.reverse();

    return this.getReferenceStack(reReference.messageId, channel, contentStack);
  }
}
