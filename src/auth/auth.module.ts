import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { DiscordTokenModule } from 'src/modules/discordToken/discordToken.module';
import { UserModule } from 'src/modules/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { getEnvVar } from 'src/helpers/getEnvVar.helper';

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
    UserModule,
    DiscordTokenModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
