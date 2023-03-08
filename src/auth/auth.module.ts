import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AnalyticsModule } from 'src/modules/analytics/analytics.module';
import { UserModule } from 'src/modules/user/user.module';
import { DiscordTokenModule } from 'src/modules/discordToken/discordToken.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { getEnvVar } from 'src/helpers/getEnvVar.helper';
import { GoogleStrategy } from './strategies/google.strategy';

@Module({
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
      property: 'user',
      session: false,
    }),
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: getEnvVar('jwt_secret'),
        signOptions: { expiresIn: '7d' },
      }),
    }),
    AnalyticsModule,
    UserModule,
    DiscordTokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, GoogleStrategy],
})
export class AuthModule {}
