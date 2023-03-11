import { Controller, Get, Query, Req } from '@nestjs/common';
import { ConversationService } from './conversation.service';
import { GuardedRequest } from 'src/types/guardedRequest.type';

@Controller('openai/conversation')
export class ConversationController {
  constructor(private readonly conversationService: ConversationService) {}

  @Get('pino')
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
