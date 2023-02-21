import { Request } from 'express';
import { GoogleUserDTO } from 'src/auth/dto/googleUser-dto.type';

export interface GuardedRequest extends Request {
  user: { userId: string };
}

export interface GuardedGoogleRequest extends Request {
  user?: GoogleUserDTO;
}
