import { Request } from 'express';

export interface GuardedRequest extends Request {
  user: { userId: string };
}
