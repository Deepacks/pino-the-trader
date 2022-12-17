import { Injectable } from '@nestjs/common';
import { request } from 'undici';

import { getEnvVar } from 'src/helpers/getEnvVar.helper';
import { DiscordTokenDTO } from 'src/auth/dto/discordToken-dto.type';
import { DiscordUserDTO } from 'src/auth/dto/discordUser-dto.type';

@Injectable()
export class DiscordTokenService {
  async exchangeToken(code: string): Promise<DiscordTokenDTO> {
    console.log(getEnvVar('redirectUri'));

    const tokenResponseData = await request(
      'https://discord.com/api/oauth2/token',
      {
        method: 'POST',
        body: new URLSearchParams({
          client_id: getEnvVar('clientId'),
          client_secret: getEnvVar('secret'),
          code,
          grant_type: 'authorization_code',
          redirect_uri: getEnvVar('redirectUri'),
          scope: 'identify email',
        }).toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return tokenResponseData.body.json();
  }

  async getDiscordUser(
    tokenType: string,
    access_token: string,
  ): Promise<DiscordUserDTO> {
    const userResult = await request('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${tokenType} ${access_token}`,
      },
    });

    return userResult.body.json();
  }
}
