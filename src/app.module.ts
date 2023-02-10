import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';

import { configureEnvModule } from './configs/environment.configuration';
import { configureMongooseModule } from './configs/mongoose.configuration';
import { HttpLoggerMiddleware } from './middlewares/logger.middleware';
import { DiscordClientModule } from './modules/clients/discord/discordClient.module';
import { OpenAiClientModule } from './modules/clients/openai/openAiClient.module';
import { CommandsModule } from './modules/commands/commands.module';
import { MessageModule } from './modules/message/message.module';
import { TextToImageModule } from './modules/textToImage/textToImage.module';
import { ListingModule } from './modules/listing/listing.module';

@Module({
  imports: [
    configureEnvModule(),
    configureMongooseModule(),
    AuthModule,
    DiscordClientModule,
    OpenAiClientModule,
    CommandsModule,
    MessageModule,
    TextToImageModule,
    ListingModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
