import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtGuard } from './guard/jwt.guard';
import type { RequestWithUser } from 'src/common/dto/request-with-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginRequest: LoginUserDto) {
    const result = await this.authService.Login(loginRequest);

    return {
      message: 'Login successful',
      data: result,
    };
  }

  @Post('register')
  async register(@Body() userRequest: RegisterUserDto) {
    const result = await this.authService.Register(userRequest);

    return {
      message: 'Registration successful',
      data: result,
    };
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Req() req: RequestWithUser) {
    const result = await this.authService.GetLoggedUser(req.user.userId);

    return {
      message: 'Successfully retrieved user data',
      data: result,
    };
  }

  @Post('renew-token')
  async renewAccessToken(@Body() body: { refresh_token: string }) {
    const token = await this.authService.createAccessTokenByRefreshToken(
      body.refresh_token,
    );

    return {
      message: 'Access token renewed successfully',
      data: token,
    };
  }

  @UseGuards(JwtGuard)
  @Get('logout')
  async logout(@Req() req: RequestWithUser) {
    await this.authService.Logout(req.user.userId);

    return {
      message: 'Logged out successfully',
    };
  }
}
