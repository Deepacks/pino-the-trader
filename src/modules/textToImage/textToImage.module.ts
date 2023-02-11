import { Module } from '@nestjs/common';

import { TextToImageService } from './textToImage.service';
import { OpenAiClientModule } from '../clients/openai/openAiClient.module';

@Module({
  imports: [OpenAiClientModule],
  providers: [TextToImageService],
  exports: [TextToImageService],
})
export class TextToImageModule {}
