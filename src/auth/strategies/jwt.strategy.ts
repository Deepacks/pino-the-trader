import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';

import { getEnvVar } from 'src/helpers/getEnvVar.helper';
import { AuthService } from '../auth.service';
import { TokenDTO } from '../dto/token-dto.type';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJwt]),
      secretOrKey: getEnvVar('jwt_secret'),
    });
  }

  public async validate(
    tokenDto: TokenDTO,
  ): Promise<{ userId: string; admin: boolean }> {
    const user = await this.authService.validateUser(tokenDto);

    return {
      userId: tokenDto.userId,
      admin: user.admin,
    };
  }

  public static extractJwt(req: Request): string | null {
    if (req.cookies && 'Bearer' in req.cookies) {
      return req.cookies.Bearer;
    }
    return null;
  }
}