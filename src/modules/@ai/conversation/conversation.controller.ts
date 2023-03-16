import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';

import { ConversationService } from './conversation.service';
import { GuardedRequest } from 'src/types/guardedRequest.type';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('openai/conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @UseGuards(JwtAuthGuard)
  @Get('marv')
  async getPinoConversation(
    @Req() req: GuardedRequest,
    @Query('prompt') prompt: string,
  ) {
    return this.conversationService.generateAnswer(
      { userId: req.user.userId },
      prompt,
    );
  }
}
