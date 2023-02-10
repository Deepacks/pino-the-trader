import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { MessageService } from './message.service';
import { MessageDto } from './dto/message-dto.type';

@Controller('message')
export class MessageController {
  constructor(private messageService: MessageService) {}

  @Post()
  async sendMessage(
    @Res({ passthrough: true }) response: Response,
    @Body() messageDto: MessageDto,
  ) {
    const result = await this.messageService.sendMessage(messageDto);

    if (!result.isSuccessful) {
      response.status(400);
      return result.message;
    }
  }
}
