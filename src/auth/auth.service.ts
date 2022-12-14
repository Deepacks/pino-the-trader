import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { getEnvVar } from 'src/helpers/getEnvVar.helper';
import { User, UserDocument } from 'src/schemas/user.schema';
import { request } from 'undici';
import { URLSearchParams } from 'url';
import { DiscordTokenDTO } from './dto/discordToken-dto.type';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signJwt(userId: string): Promise<string> {
    return this.jwtService.sign({ userId });
  }

  // async authenticateUser()

  async authCallback({
    error,
    code,
  }: {
    error: string;
    code: string;
  }): Promise<{ isSuccesful: boolean; token: string; error: string }> {
    if (error) return { isSuccesful: false, token: '', error: error };

    const oauthData = await this.exchangeToken(code);

    const userData = await this.getDiscordUser(
      oauthData.token_type,
      oauthData.access_token,
    );

    console.log(userData);

    return { isSuccesful: true, token: '', error: '' };
  }

  async exchangeToken(code: string): Promise<DiscordTokenDTO> {
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

  async getDiscordUser(tokenType: string, access_token: string) {
    const userResult = await request('https://discord.com/api/users/@me', {
      headers: {
        authorization: `${tokenType} ${access_token}`,
      },
    });

    return userResult.body.json();
  }
}
