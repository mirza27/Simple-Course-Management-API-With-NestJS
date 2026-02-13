import { Request } from 'express';
import { JwtPayload } from './jwtPayload.dto';

export interface RequestWithUser extends Request {
  user: JwtPayload;
}
