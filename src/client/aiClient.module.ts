import { Module } from '@nestjs/common'
import { AiClientService } from './aiClient.service'

@Module({
  providers: [AiClientService],
  exports: [AiClientService],
})
export class AiClientModule {}
