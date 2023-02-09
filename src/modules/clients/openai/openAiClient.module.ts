import { Module } from '@nestjs/common';

import { OpenAiClientService } from './openAiClient.service';

@Module({
  providers: [OpenAiClientService],
  exports: [OpenAiClientService],
})
export class OpenAiClientModule {}
