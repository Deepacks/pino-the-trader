import { Module } from '@nestjs/common';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [ClientModule],
  controllers: [ListingController],
  providers: [ListingService],
})
export class ListingModule {}
