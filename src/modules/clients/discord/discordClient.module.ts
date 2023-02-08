import { Module } from '@nestjs/common';

import { DiscordClientService } from './discordClient.service';

@Module({
  providers: [DiscordClientService],
  exports: [DiscordClientService],
})
export class DiscordClientModule {}
