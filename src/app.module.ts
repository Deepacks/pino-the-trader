import { MiddlewareConsumer, Module } from '@nestjs/common';

import { configureEnvModule } from './configs/environment.configuration';
import { HttpLoggerMiddleware } from './middlewares/logger.middleware';
import { ClientModule } from './modules/client/client.module';

@Module({
  imports: [configureEnvModule(), ClientModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
