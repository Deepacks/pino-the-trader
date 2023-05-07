import { Module } from '@nestjs/common'

import { CommandsModule } from './commands/commands.module'
import { GatewayModule } from './gateway/gateway.module'

@Module({
  imports: [CommandsModule, GatewayModule],
})
export class CoreModule {}
