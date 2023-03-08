import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Analytics, AnalyticsSchema } from 'src/schemas/analytics.schema';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Analytics.name, schema: AnalyticsSchema },
    ]),
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}
