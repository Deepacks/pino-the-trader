import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';

import { AnalyticsService } from './analytics.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { GuardedRequest } from 'src/types/guardedRequest.type';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @UseGuards(JwtAuthGuard)
  @Get('data')
  async get(@Req() req: GuardedRequest, @Query('user') requestedUser?: string) {
    return this.analyticsService.getUserAnalyticsData(
      req.user.userId,
      req.user.admin,
      requestedUser,
    );
  }
}
