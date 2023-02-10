import { Injectable } from '@nestjs/common';
import { Collection, TextChannel } from 'discord.js';

import { DiscordClientService } from '../clients/discord/discordClient.service';
import { MessageDto } from './dto/message-dto.type';

@Injectable()
export class MessageService {
  constructor(private discordClientService: DiscordClientService) {}

  async sendMessage(
    messageDto: MessageDto,
  ): Promise<{ isSuccessful: boolean; message: string }> {
    if (!messageDto.content || messageDto.content.length < 0) {
      return { isSuccessful: false, message: 'Invalid content' };
    }

    const textChannels =
      this.discordClientService.discordClient.channels.cache.filter(
        (ch) => ch instanceof TextChannel,
      ) as Collection<string, TextChannel>;

    const requestedChannel = textChannels.find(
      (ch) => ch.name === messageDto.channelName,
    );

    if (!requestedChannel) {
      return { isSuccessful: false, message: 'Channel not found' };
    }

    await requestedChannel.send(messageDto.content);

    return { isSuccessful: true, message: '' };
  }
}
