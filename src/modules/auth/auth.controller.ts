import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { RegisterUserDto } from './dto/registerUser.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/loginUser.dto';
import { JwtGuard } from './guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: AuthService,
  ) {}

  @Post('login')
  async login(@Body() loginRequest: LoginUserDto) {
    return this.authService.Login(loginRequest);
  }

  @Post('register')
  async register(@Body() userRequest: RegisterUserDto) {
    return this.authService.Register(userRequest);
  }

  @UseGuards(JwtGuard)
  @Get('me')
  getMe(@Req() req: Request & { user: { userId: number } }) {
    return this.authService.GetLoggedUser(req.user.userId);
  }

  @Get('renew-token')
  renewAccessToken() {
    return 'Renew token endpoint';
  }

  @Get('logout')
  logout() {
    return 'Logout endpoint';
  }
}
