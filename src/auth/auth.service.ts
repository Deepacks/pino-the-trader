import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions } from 'express';

import { isDev } from 'src/helpers/isDev.helper';
import { UserService } from 'src/modules/user/user.service';
import { DiscordTokenService } from 'src/modules/discordToken/discordToken.service';
import { DiscordUserDTO } from './dto/discordUser-dto.type';
import { TokenDTO } from './dto/token-dto.type';
import { GoogleUserDTO } from './dto/googleUser-dto.type';
import { AnalyticsService } from 'src/modules/analytics/analytics.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly analyticsService: AnalyticsService,
    private readonly userService: UserService,
    private readonly discordTokenService: DiscordTokenService,
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

  // ----- DISCORD -----

  async authenticateDiscordUser(
    discordUser: DiscordUserDTO & { discordRefreshToken: string },
  ): Promise<string> {
    const user = await this.userService.findByEmail(discordUser.email);

    const {
      id: discordId,
      username: discordUsername,
      discordRefreshToken,
    } = discordUser;

    if (user) {
      await this.analyticsService.updateDiscordId(user._id, discordId);

      if (!user.discordId) {
        await this.userService.updateUser(user._id, {
          discordId,
          discordUsername,
          discordRefreshToken,
        });
      }

      return user._id;
    }

    const newUser = await this.userService.registerUserFromDiscord(discordUser);
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

    const userId = await this.authenticateDiscordUser({
      ...discordUser,
      discordRefreshToken: oauthData.refresh_token,
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

  // ----- GOOGLE -----

  async authenticateGoogleUser(googleUser: GoogleUserDTO): Promise<string> {
    const user = await this.userService.findByEmail(googleUser.email);

    if (user) {
      await this.analyticsService.updateLastLogin(user._id);

      if (!user.googleId) {
        const {
          googleId,
          firstName,
          lastName,
          googleAccessToken,
          googleRefreshToken,
        } = googleUser;

        await this.userService.updateUser(user._id, {
          googleId,
          firstName,
          lastName,
          googleAccessToken,
          googleRefreshToken,
        });
      }

      return user._id;
    }

    const newUser = await this.userService.registerUserFromGoogle(googleUser);
    return newUser._id;
  }

  async googleRedirect(googleUserDTO: GoogleUserDTO | undefined): Promise<{
    token: string;
    options: CookieOptions | null;
  }> {
    const userId = await this.authenticateGoogleUser(googleUserDTO);

    const jwt = await this.signJwt(userId);

    return {
      token: jwt,
      options: {
        maxAge: 604800 * 6 * 24 * 360,
        httpOnly: true,
        secure: !isDev(),
      },
    };
  }
}
