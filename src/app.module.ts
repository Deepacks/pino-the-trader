import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { configureEnvModule } from './configs/environment.configuration';
import { configureMongooseModule } from './configs/mongoose.configuration';
import { HttpLoggerMiddleware } from './middlewares/logger.middleware';
import { ClientModule } from './modules/client/client.module';
import { CommandsModule } from './modules/commands/commands.module';
import { ListingModule } from './modules/listing/listing.module';

@Module({
  imports: [
    configureEnvModule(),
    configureMongooseModule(),
    AuthModule,
    ClientModule,
    ListingModule,
    CommandsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
