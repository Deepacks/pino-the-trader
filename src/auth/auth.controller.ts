import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';

import { getEnvVar } from 'src/helpers/getEnvVar.helper';
import { AuthService } from './auth.service';
import { isDev } from 'src/helpers/isDev.helper';

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
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.authCallback({ error, code });

    if (result.error) {
      res.status(401);
      return result.error;
    }

    const { token, options } = result.jwt;

    res.cookie('Bearer', token, options);
    res.redirect(
      isDev()
        ? 'http://localhost:3000/discord/webapp'
        : 'https://vlad-hub.com/discord/webapp',
    );
  }
}
