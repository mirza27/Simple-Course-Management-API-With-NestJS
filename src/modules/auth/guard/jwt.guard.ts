import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from '../auth.service';

interface JwtPayload {
  userId: number;
  name: string;
  email: string;
  role: string;
  expiredAt: Date;
}

interface AccessTokenResult {
  access_token: string;
}

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    let accessToken: string | null = token ?? null;

    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      // check access token
      const accessPayload = (await this.authService.validateToken(
        token,
      )) as JwtPayload | null;
      if (!accessPayload) {
        throw new UnauthorizedException();
      }

      if (accessPayload.expiredAt < new Date()) {
        const userAuth = await this.authService.getUserAuthByUserId(
          accessPayload.userId,
        );
        const refreshToken = (await this.authService.validateToken(
          userAuth[0].refresh_token,
        )) as JwtPayload | null;

        if (!refreshToken || refreshToken.expiredAt < new Date()) {
          throw new UnauthorizedException();
        }

        const newAccess =
          (await this.authService.createAccessTokenByRefreshToken(
            userAuth[0].refresh_token,
          )) as AccessTokenResult;
        accessToken = newAccess.access_token;
      } else {
        accessToken = token;
      }

      if (!accessToken) {
        throw new UnauthorizedException();
      }

      const validUser = (await this.authService.validateToken(
        accessToken,
      )) as JwtPayload;

      (request as Request & { user?: JwtPayload }).user = validUser;
      request['name'] = validUser.name;
      request['userId'] = validUser.userId;
      request['email'] = validUser.email;
      request['role'] = validUser.role;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
