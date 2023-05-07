import { Module } from '@nestjs/common'
import { DiscordModule } from '@discord-nestjs/core'

import { GatewayService } from './gateway.service'
import { AiClientModule } from 'src/client/aiClient.module'

@Module({
  imports: [DiscordModule.forFeature(), AiClientModule],
  providers: [GatewayService],
})
export class GatewayModule {}
