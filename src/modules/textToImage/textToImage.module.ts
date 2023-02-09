import { Module } from '@nestjs/common';

import { TextToImageService } from './textToImage.service';
import { OpenAiClientModule } from '../clients/openai/openAiClient.module';
import { DiscordClientModule } from '../clients/discord/discordClient.module';

@Module({
  imports: [OpenAiClientModule, DiscordClientModule],
  providers: [TextToImageService],
  exports: [TextToImageService],
})
export class TextToImageModule {}
