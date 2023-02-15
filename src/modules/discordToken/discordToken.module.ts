import { Module } from '@nestjs/common';

import { DiscordTokenService } from './discordToken.service';

@Module({
  providers: [DiscordTokenService],
  exports: [DiscordTokenService],
})
export class DiscordTokenModule {}
