import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-google-oauth20';

import { getEnvVar } from 'src/helpers/getEnvVar.helper';
import { isDev } from 'src/helpers/isDev.helper';
import { GoogleUserDTO } from '../dto/googleUser-dto.type';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: getEnvVar('google_id'),
      clientSecret: getEnvVar('google_secret'),
      callbackURL: isDev()
        ? 'http://localhost:3002/discord/api/auth/google/redirect'
        : 'https://vlad-hub.com/discord/api/auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  public async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
    const { id, emails, name } = profile;

    const user: GoogleUserDTO = {
      googleId: id,
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      googleAccessToken: accessToken,
      googleRefreshToken: refreshToken,
    };

    return user;
  }
}
