import { Module } from '@nestjs/common';

import { DiscordClientModule } from '../clients/discord/discordClient.module';
import { ListingController } from './listing.controller';
import { ListingService } from './listing.service';

@Module({
  imports: [DiscordClientModule],
  controllers: [ListingController],
  providers: [ListingService],
})
export class ListingModule {}
