import { DiscordModule } from '@discord-nestjs/core'
import { Module } from '@nestjs/common'

import { AiClientModule } from 'src/client/aiClient.module'
import { AskCommand } from './@slash/ask.command'
import { TextToImageCommand } from './@slash/textToImage.command'

@Module({
  imports: [DiscordModule.forFeature(), AiClientModule],
  providers: [AskCommand, TextToImageCommand],
})
export class CommandsModule {}
