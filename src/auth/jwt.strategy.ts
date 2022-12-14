import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { AuthService } from './auth.service';
import { getEnvVar } from 'src/helpers/getEnvVar.helper';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJwt]),
      secretOrKey: getEnvVar('jwt_secret'),
    });
  }

  //   public async validate(tokenDto: TokenDto): Promise<{ userId: string }> {

  //   }

  public static extractJwt(req: Request): string | null {
    if (req.signedCookies && 'Bearer' in req.signedCookies) {
      return req.signedCookies.Bearer;
    }
    return null;
  }
}
