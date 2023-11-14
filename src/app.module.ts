import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { DiscordModule } from '@discord-nestjs/core'
import { GatewayIntentBits } from 'discord.js'

import { getEnvVar } from './helpers/getEnvVar.helper'
import { CoreModule } from './core/core.module'
import { AiClientModule } from './client/aiClient.module'

@Module({
  imports: [
    ConfigModule.forRoot(),
    DiscordModule.forRootAsync({
      useFactory: () => {
        return {
          token: getEnvVar('TOKEN'),
          discordClientOptions: {
            intents: [
              GatewayIntentBits.Guilds,
              GatewayIntentBits.GuildMessages,
              GatewayIntentBits.GuildVoiceStates,
              GatewayIntentBits.GuildIntegrations,
              GatewayIntentBits.DirectMessages,
              GatewayIntentBits.MessageContent,
            ],
          },
          registerCommandOptions: [
            {
              forGuild: getEnvVar('GUILD_ID'),
              removeCommandsBefore: true,
            },
          ],
          failOnLogin: true,
        }
      },
    }),
    AiClientModule,
    CoreModule,
  ],
})
export class AppModule {}
