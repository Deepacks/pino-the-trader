import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Types } from 'mongoose';

import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GuardedRequest } from 'src/types/guardedRequest.type';

@Controller('test/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('create')
  async testAnalyticsCreate(@Req() req: GuardedRequest) {
    // FIXME: if testing, add discordId
    await this.analyticsService.createAnalytics(
      new Types.ObjectId(req.user.userId),
      '',
    );
  }
}
