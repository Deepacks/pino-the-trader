import { Controller, Get, Query, Redirect, Res } from '@nestjs/common';
import { Response } from 'express';
import { getEnvVar } from 'src/helpers/getEnvVar.helper';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('/oauth2')
  @Redirect()
  async oauth2() {
    return { url: getEnvVar('OAuth2Url') };
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
  }
}
