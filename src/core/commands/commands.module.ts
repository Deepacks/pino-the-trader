import { DiscordModule } from '@discord-nestjs/core'
import { Module } from '@nestjs/common'

import { AiClientModule } from 'src/client/aiClient.module'
import { AskCommand } from './@slash/ask.command'

@Module({
  imports: [DiscordModule.forFeature(), AiClientModule],
  providers: [AskCommand],
})
export class CommandsModule {}
