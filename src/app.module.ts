import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DiscordModule } from '@discord-nestjs/core';
import { GatewayIntentBits } from 'discord.js';

import { getEnvVar } from './helpers/getEnvVar.helper';
import { OpenAiModule } from './modules/@ai/OpenAi.module';
import { AuthModule } from './auth/auth.module';
import { BotModule } from './modules/@bot/bot.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => {
        console.log(getEnvVar('mongo_host'), getEnvVar('mongo_user'));

        return {
          uri: `mongodb://${getEnvVar('mongo_host')}:27017/discord`,
          authSource: 'discord',
          user: getEnvVar('mongo_user'),
          pass: getEnvVar('mongo_pass'),
        };
      },
    }),

    DiscordModule.forRootAsync({
      useFactory: () => {
        return {
          token: getEnvVar('token'),
          discordClientOptions: {
            intents: [
              GatewayIntentBits.Guilds,
              GatewayIntentBits.GuildMessages,
              GatewayIntentBits.DirectMessages,
              GatewayIntentBits.MessageContent,
              GatewayIntentBits.GuildIntegrations,
            ],
          },
          registerCommandOptions: [
            {
              forGuild: getEnvVar('guildId'),
              allowFactory: () => false,
            },
          ],
          failOnLogin: true,
        };
      },
    }),

    OpenAiModule.create({ apiKey: getEnvVar('openAiApiKey') }),

    AuthModule,
    BotModule,
  ],
})
export class AppModule {}
