import { MiddlewareConsumer, Module } from '@nestjs/common';

import { configureEnvModule } from './configs/environment.configuration';
import { HttpLoggerMiddleware } from './middlewares/logger.middleware';
import { ClientModule } from './modules/client/client.module';
import { CommandsModule } from './modules/commands/commands.module';

@Module({
  imports: [configureEnvModule(), ClientModule, CommandsModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
