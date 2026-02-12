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
  expiredAt: string | Date;
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
      throw new UnauthorizedException('No token provided');
    }
    try {
      // check access token
      const accessPayload = (await this.authService.validateToken(
        token,
      )) as JwtPayload | null;
      if (!accessPayload) {
        throw new UnauthorizedException('Expired access token');
      }

      const accessExpiry = new Date(accessPayload.expiredAt);

      if (Number.isNaN(accessExpiry.getTime())) {
        throw new UnauthorizedException('Invalid token expiry');
      }

      // using refresh token
      if (accessExpiry < new Date()) {
        const userAuth = await this.authService.getUserAuthByUserId(
          accessPayload.userId,
        );

        const storedRefresh = userAuth?.[0]?.refresh_token;
        if (!storedRefresh) {
          throw new UnauthorizedException(
            'No refresh token, please login again',
          );
        }

        const refreshToken = (await this.authService.validateToken(
          storedRefresh,
        )) as JwtPayload | null;

        if (!refreshToken) {
          throw new UnauthorizedException('Invalid refresh token');
        }

        const refreshExpiry = new Date(refreshToken.expiredAt);

        if (
          Number.isNaN(refreshExpiry.getTime()) ||
          refreshExpiry < new Date()
        ) {
          throw new UnauthorizedException(
            'Refresh token expired, please login again',
          );
        }

        const newAccess =
          (await this.authService.createAccessTokenByRefreshToken(
            storedRefresh,
          )) as AccessTokenResult;
        accessToken = newAccess.access_token;
      } else {
        accessToken = token;
      }

      if (!accessToken) {
        throw new UnauthorizedException('Invalid access token');
      }

      const validUser = (await this.authService.validateToken(
        accessToken,
      )) as JwtPayload;

      (request as Request & { user?: JwtPayload }).user = validUser;
      request['name'] = validUser.name;
      request['userId'] = validUser.userId;
      request['email'] = validUser.email;
      request['role'] = validUser.role;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
