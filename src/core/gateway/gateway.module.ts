import { Module } from '@nestjs/common'
import { DiscordModule } from '@discord-nestjs/core'

import { GatewayService } from './gateway.service'
import { AiClientModule } from 'src/client/aiClient.module'
import { GatewayController } from './gateway.controller'

@Module({
  imports: [DiscordModule.forFeature(), AiClientModule],
  providers: [GatewayService],
  controllers: [GatewayController],
})
export class GatewayModule {}
