import { Module } from '@nestjs/common';

import { OpenAiClientService } from './openaiClient.service';

@Module({
  providers: [OpenAiClientService],
  exports: [OpenAiClientService],
})
export class OpenAiClientModule {}
