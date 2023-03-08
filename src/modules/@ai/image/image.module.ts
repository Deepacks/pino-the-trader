import { Module } from '@nestjs/common';

import { AnalyticsModule } from 'src/modules/analytics/analytics.module';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [AnalyticsModule],
  controllers: [ImageController],
  providers: [ImageService],
  exports: [ImageService],
})
export class ImageModule {}
