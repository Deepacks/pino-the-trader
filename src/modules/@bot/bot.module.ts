import { Module } from '@nestjs/common';

import { BotCommandsModule } from './commands/botCommands.module';
import { BotGatewayModule } from './gateway/botGateway.module';

@Module({
  imports: [BotCommandsModule, BotGatewayModule],
})
export class BotModule {}
