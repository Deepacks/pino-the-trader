import { Request } from 'express';
import { GoogleUserDTO } from 'src/auth/dto/googleUser-dto.type';

export interface GuardedRequest extends Request {
  user: { userId: string; admin: boolean };
}

export interface GuardedGoogleRequest extends Request {
  user?: GoogleUserDTO;
}
