import { Controller, Get, Req, UseGuards } from '@nestjs/common';

import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GuardedRequest } from 'src/types/guardedRequest.type';

@Controller('test/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('')
  async get(@Req() req: GuardedRequest) {
    return req.user.userId;
  }
}
