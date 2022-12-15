import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions } from 'express';

import { isDev } from 'src/helpers/isDev.helper';
import { UserService } from 'src/modules/user/user.service';
import { DiscordTokenService } from 'src/modules/discordToken/discordToken.service';
import { DiscordUserDTO } from './dto/discordUser-dto.type';
import { TokenDTO } from './dto/token-dto.type';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private discordTokenService: DiscordTokenService,
  ) {}

  async signJwt(userId: string): Promise<string> {
    return this.jwtService.sign({ userId });
  }

  async validateUser(tokenDto: TokenDTO) {
    const { userId } = tokenDto;

    const user = await this.userService.findById(userId);
    if (!user) {
      throw new HttpException('Invalid token', HttpStatus.UNAUTHORIZED);
    }
  }

  async authenticateUser(
    discordUser: DiscordUserDTO & { refreshToken: string },
  ): Promise<string> {
    const user = await this.userService.findByDiscordId(discordUser.id);

    if (user) return user._id;

    const newUser = await this.userService.registerUser(discordUser);
    return newUser._id;
  }

  async authCallback({
    error,
    code,
  }: {
    error: string;
    code: string;
  }): Promise<{
    jwt: { token: string; options: CookieOptions } | null;
    error: string | null;
  }> {
    if (error) return { jwt: null, error };

    const oauthData = await this.discordTokenService.exchangeToken(code);

    const discordUser = await this.discordTokenService.getDiscordUser(
      oauthData.token_type,
      oauthData.access_token,
    );

    const userId = await this.authenticateUser({
      ...discordUser,
      refreshToken: oauthData.refresh_token,
    });
    const jwt = await this.signJwt(userId);

    return {
      jwt: {
        token: jwt,
        options: {
          maxAge: oauthData.expires_in * 6 * 24 * 360,
          httpOnly: true,
          secure: !isDev(),
        },
      },
      error: null,
    };
  }
}
