import { Controller, Get, Query, Req, Res, UseGuards } from '@nestjs/common';
import { Response } from 'express';

import { getEnvVar } from 'src/helpers/getEnvVar.helper';
import { AuthService } from './auth.service';
import { isDev } from 'src/helpers/isDev.helper';
import { AuthGuard } from '@nestjs/passport';
import { GuardedGoogleRequest } from 'src/types/guardedRequest.type';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/oauth2')
  async oauth2() {
    return getEnvVar('OAuth2Url');
  }

  @Get('/callback')
  async authCallback(
    @Query('error') error: string,
    @Query('code') code: string,
    @Query('state') state: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.authCallback({ error, code });

    if (result.error) {
      res.status(401);
      return result.error;
    }

    let requestedRoute = '';
    if (state) requestedRoute = Buffer.from(state, 'base64').toString('ascii');

    const { token, options } = result.jwt;

    res.cookie('Bearer', token, options);
    res.redirect(
      isDev()
        ? `http://localhost:3000/discord/webapp${requestedRoute}`
        : `https://vlad-hub.com/discord/webapp${requestedRoute}`,
    );
  }

  @Get('/google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    return;
  }

  @Get('/google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleRedirect(
    @Req() req: GuardedGoogleRequest,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.googleRedirect(req.user);

    const { token, options } = result;

    res.cookie('Bearer', token, options);
    res.redirect(
      isDev()
        ? `http://localhost:3000/discord/webapp/auth/google`
        : `https://vlad-hub.com/discord/webapp/auth/google`,
    );
  }
}
